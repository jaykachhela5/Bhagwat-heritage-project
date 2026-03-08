import { memo, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { kundliRequestsApi } from "../../services/api/kundli";

type Gender = "Male" | "Female";
type Language = "English" | "Hindi" | "Marathi" | "Gujarati";
type PaymentMethod = "UPI" | "Razorpay" | "Stripe";

type KundliService = {
  title: string;
  pages: number;
  price: number;
};

const KUNDLI_SERVICES: KundliService[] = [
  { title: "Sampurna Vistrut Kundli", pages: 100, price: 1501 },
  { title: "Vishesh Vistrut Kundli", pages: 40, price: 701 },
  { title: "Janam Kundli + Falit + Varshfal", pages: 30, price: 501 },
  { title: "Janam Kundli + Falit", pages: 30, price: 351 },
  { title: "Computer Printed Kundli", pages: 20, price: 351 },
  { title: "Vivahik Gun Milan", pages: 7, price: 301 },
  { title: "Varshik Kundli + Varshfal", pages: 8, price: 200 },
  { title: "Naamkaran Kundli", pages: 4, price: 151 },
  { title: "Janm Tippan", pages: 1, price: 101 },
];

const PROCESS = [
  "Step 1 - Fill the kundli order form",
  "Step 2 - Select one or more kundli services",
  "Step 3 - Review the automatic total and proceed to payment",
  "Step 4 - After payment success, the order is submitted for kundli preparation",
];

const INITIAL_FORM = {
  fullName: "",
  gender: "Male" as Gender,
  orderDate: new Date().toISOString().slice(0, 10),
  signature: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
  district: "",
  state: "",
  country: "",
  preferredLanguage: "English" as Language,
  mobileNumber: "",
  email: "",
  address: "",
};

export default memo(function KundliPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successInfo, setSuccessInfo] = useState<{
    orderId: string;
    invoiceNumber: string;
    paymentStatus: string;
    estimatedDeliveryTime: string;
    services: KundliService[];
    totalAmount: number;
  } | null>(null);

  usePageMeta(
    "Kundli Order Form",
    "Book a Kundli online from Bhagwat Heritage Service Foundation Trust with priced kundli options, language selection, payment confirmation, and order tracking.",
  );

  const chosenServices = useMemo(
    () => KUNDLI_SERVICES.filter((service) => selectedServices.includes(service.title)),
    [selectedServices],
  );
  const totalAmount = useMemo(
    () => chosenServices.reduce((sum, item) => sum + item.price, 0),
    [chosenServices],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleService = (serviceTitle: string) => {
    setSelectedServices((current) =>
      current.includes(serviceTitle) ? current.filter((item) => item !== serviceTitle) : [...current, serviceTitle],
    );
  };

  const validateBeforePayment = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setErrorMessage("");

    const required = [
      form.fullName,
      form.orderDate,
      form.dateOfBirth,
      form.timeOfBirth,
      form.placeOfBirth,
      form.district,
      form.state,
      form.country,
      form.mobileNumber,
      form.email,
    ];

    if (required.some((value) => value.trim().length === 0)) {
      setErrorMessage("Please complete all required fields before payment.");
      return false;
    }

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one Kundli service.");
      return false;
    }

    return true;
  };

  const handleOpenPayment = (event: FormEvent<HTMLFormElement>) => {
    if (!validateBeforePayment(event)) return;
    setPaymentOpen(true);
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const paymentReference = `PAY-${Date.now()}`;
      const response = await kundliRequestsApi.create({
        ...form,
        selectedServices: chosenServices,
        totalAmount,
        paymentMethod,
        paymentStatus: "Paid",
        paymentReference,
      });

      setSuccessInfo({
        orderId: response.data.orderId,
        invoiceNumber: response.data.invoiceNumber,
        paymentStatus: response.data.paymentStatus,
        estimatedDeliveryTime: response.data.estimatedDeliveryTime,
        services: chosenServices,
        totalAmount,
      });
      setForm({ ...INITIAL_FORM, orderDate: new Date().toISOString().slice(0, 10) });
      setSelectedServices([]);
      setPaymentOpen(false);
    } catch (error) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message ?? "Unable to process the order."
          : "Unable to process the order. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    if (!successInfo) return;

    const content = [
      "Bhagwat Heritage Service Foundation Trust",
      "Kundli Invoice",
      `Order ID: ${successInfo.orderId}`,
      `Invoice Number: ${successInfo.invoiceNumber}`,
      `Payment Status: ${successInfo.paymentStatus}`,
      `Estimated Delivery: ${successInfo.estimatedDeliveryTime}`,
      "",
      "Selected Services:",
      ...successInfo.services.map((service) => `- ${service.title} | ${service.pages} Pages | INR ${service.price}`),
      "",
      `Total Amount: INR ${successInfo.totalAmount}`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${successInfo.invoiceNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fff7ef] pb-16 text-[#5a2a08]">
      <section className="px-4 pt-8 md:pt-10">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#f1c899] bg-cover bg-center shadow-[0_18px_45px_rgba(120,41,0,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(122,54,4,0.92) 0%, rgba(169,57,7,0.78) 46%, rgba(245,158,11,0.24) 100%), url('/images/maharaj%20ji/astrologo.webp')",
          }}
        >
          <div className="relative z-10 px-5 py-12 text-white md:px-10 md:py-16 lg:px-14">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/85">
                <li><Link to={ROUTES.home} className="hover:text-[#ffe0b2]">Home</Link></li>
                <li>&gt;</li>
                <li><Link to={ROUTES.digital.index} className="hover:text-[#ffe0b2]">Digital Services</Link></li>
                <li>&gt;</li>
                <li aria-current="page" className="font-semibold text-[#ffe0b2]">Kundli</li>
              </ol>
            </nav>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em]">ॐ Kundli Booking</p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Kundli Order Form</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/90 md:text-xl">
              Fill the booking form, select your Kundli services, complete payment, and submit your order for preparation.
            </p>
            <a href="#kundli-order-form" className="mt-8 inline-flex rounded-xl bg-[#f59e0b] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#dd8f0a]">
              Create Your Kundli Order
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <form id="kundli-order-form" onSubmit={handleOpenPayment} className="rounded-[32px] border border-[#efc89b] bg-white p-6 shadow-[0_16px_34px_rgba(177,96,23,0.12)] md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b94a0f]">Traditional Booking Form</p>
                <h2 className="mt-2 text-3xl font-black text-[#7a3604] md:text-5xl">Complete Kundli Booking Details</h2>
              </div>
              <div className="rounded-2xl border border-[#f1d4b4] bg-[#fff6ea] px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-wide text-[#9a5b1d]">Automatic Total</p>
                <p className="mt-1 text-2xl font-black text-[#a63d07]">INR {totalAmount.toLocaleString()}</p>
              </div>
            </div>

            {successInfo ? (
              <div className="mt-6 rounded-[24px] border border-[#86c79b] bg-[#f0fff4] p-5 text-[#245a33]">
                <p className="text-lg font-bold text-[#245a33]">Your Kundli request has been successfully submitted. Our astrologer will prepare your Kundli and send the report to your email.</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#d7eadb] bg-white p-4"><p className="text-xs uppercase tracking-wide text-[#4f7b58]">Order ID</p><p className="mt-1 text-xl font-black">{successInfo.orderId}</p></div>
                  <div className="rounded-2xl border border-[#d7eadb] bg-white p-4"><p className="text-xs uppercase tracking-wide text-[#4f7b58]">Payment Status</p><p className="mt-1 text-xl font-black">{successInfo.paymentStatus}</p></div>
                  <div className="rounded-2xl border border-[#d7eadb] bg-white p-4"><p className="text-xs uppercase tracking-wide text-[#4f7b58]">Selected Kundli Type</p><p className="mt-1 font-bold">{successInfo.services.map((item) => item.title).join(", ")}</p></div>
                  <div className="rounded-2xl border border-[#d7eadb] bg-white p-4"><p className="text-xs uppercase tracking-wide text-[#4f7b58]">Estimated Delivery</p><p className="mt-1 font-bold">{successInfo.estimatedDeliveryTime}</p></div>
                </div>
                <button type="button" onClick={downloadInvoice} className="mt-4 rounded-xl bg-[#b94a0f] px-5 py-3 font-semibold text-white hover:bg-[#983707]">Download Invoice</button>
              </div>
            ) : null}

            {errorMessage ? <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div> : null}

            <div className="mt-8 space-y-6">
              <section className="rounded-[28px] border border-[#f1d4b4] bg-[#fffaf4] p-5">
                <h3 className="text-xl font-black text-[#7a3604]">1. Personal Information</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="orderDate" type="date" value={form.orderDate} onChange={handleChange} required className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <div className="rounded-xl border border-[#efcfb0] bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-[#7a3604]">Gender</p>
                    <div className="mt-2 flex gap-4">{(["Male", "Female"] as Gender[]).map((gender) => <label key={gender} className="inline-flex items-center gap-2 text-sm"><input type="radio" checked={form.gender === gender} onChange={() => setForm((current) => ({ ...current, gender }))} />{gender}</label>)}</div>
                  </div>
                  <input name="signature" value={form.signature} onChange={handleChange} placeholder="Signature (optional)" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                </div>
              </section>

              <section className="rounded-[28px] border border-[#f1d4b4] bg-[#fffaf4] p-5">
                <h3 className="text-xl font-black text-[#7a3604]">2. Birth Details</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="timeOfBirth" type="time" value={form.timeOfBirth} onChange={handleChange} required className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} required placeholder="Place of Birth" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="district" value={form.district} onChange={handleChange} required placeholder="District" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                </div>
              </section>

              <section className="rounded-[28px] border border-[#f1d4b4] bg-[#fffaf4] p-5">
                <h3 className="text-xl font-black text-[#7a3604]">3. Kundli Type Selection</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {KUNDLI_SERVICES.map((service, index) => (
                    <label key={service.title} className={`rounded-2xl border p-4 shadow-sm transition ${selectedServices.includes(service.title) ? "border-[#c46a1f] bg-[#fff1e2]" : "border-[#efcfb0] bg-white"}`}>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={selectedServices.includes(service.title)} onChange={() => toggleService(service.title)} className="mt-1" />
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-[0.2em] text-[#b94a0f]">{index < 5 ? "Basic" : "Additional"} Service</p>
                          <h4 className="mt-1 font-black text-[#7a3604]">{service.title}</h4>
                          <p className="mt-2 text-sm text-[#7b4a22]">{service.pages} Pages</p>
                          <p className="mt-1 text-lg font-black text-[#a63d07]">INR {service.price}</p>
                        </div>
                        <span className="text-xl text-[#c46a1f]">{index < 5 ? "ॐ" : "♈"}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-[#f1d4b4] bg-[#fffaf4] p-5">
                  <h3 className="text-xl font-black text-[#7a3604]">4. Preferred Language</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">{(["English", "Hindi", "Marathi", "Gujarati"] as Language[]).map((language) => <button key={language} type="button" onClick={() => setForm((current) => ({ ...current, preferredLanguage: language }))} className={`rounded-xl px-4 py-3 text-sm font-semibold ${form.preferredLanguage === language ? "bg-[#b94a0f] text-white" : "border border-[#efcfb0] bg-white text-[#7a3604]"}`}>{language}</button>)}</div>
                </div>

                <div className="rounded-[28px] border border-[#f1d4b4] bg-[#fffaf4] p-5">
                  <h3 className="text-xl font-black text-[#7a3604]">5. Contact Details</h3>
                  <div className="mt-4 grid gap-4">
                    <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required placeholder="Mobile Number" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                    <textarea name="address" value={form.address} onChange={handleChange} rows={3} placeholder="Address (optional)" className="rounded-xl border border-[#efcfb0] px-4 py-3 outline-none focus:border-[#c46a1f]" />
                  </div>
                </div>
              </section>

              <div className="rounded-[28px] border border-[#f1d4b4] bg-[linear-gradient(135deg,#fff1e2_0%,#fff8ef_100%)] p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b94a0f]">6. Payment System</p>
                    <p className="mt-2 text-lg font-bold text-[#7a3604]">Fill the form, review the total, and proceed to secure payment before order submission.</p>
                  </div>
                  <button type="submit" className="rounded-xl bg-[#b94a0f] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#983707]">Proceed to Payment</button>
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <section className="rounded-[32px] border border-[#efc89b] bg-white p-6 shadow-[0_16px_34px_rgba(177,96,23,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b94a0f]">How It Works</p>
              <h2 className="mt-2 text-3xl font-black text-[#7a3604]">Payment-First Kundli Workflow</h2>
              <div className="mt-5 space-y-3">{PROCESS.map((step, index) => <div key={step} className="flex gap-3 rounded-2xl border border-[#f1d4b4] bg-[#fffaf4] p-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b94a0f] font-black text-white">{index + 1}</div><p className="leading-7 text-[#7b4a22]">{step}</p></div>)}</div>
            </section>

            <section className="rounded-[32px] border border-[#efc89b] bg-white p-6 shadow-[0_16px_34px_rgba(177,96,23,0.12)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b94a0f]">Order Summary</p>
              <h2 className="mt-2 text-3xl font-black text-[#7a3604]">Selected Kundli Services</h2>
              <div className="mt-5 space-y-3">
                {chosenServices.length > 0 ? chosenServices.map((service) => <div key={service.title} className="rounded-2xl border border-[#f1d4b4] bg-[#fffaf4] p-4"><p className="font-black text-[#7a3604]">{service.title}</p><p className="mt-1 text-sm text-[#7b4a22]">{service.pages} Pages</p><p className="mt-1 text-sm font-semibold text-[#a63d07]">INR {service.price}</p></div>) : <div className="rounded-2xl border border-dashed border-[#f1d4b4] bg-[#fffaf4] p-4 text-sm text-[#7b4a22]">Select one or more services to see your order summary.</div>}
              </div>
              <div className="mt-5 rounded-2xl bg-[#b94a0f] px-4 py-4 text-white"><p className="text-sm uppercase tracking-[0.16em]">Total Price</p><p className="mt-1 text-3xl font-black">INR {totalAmount.toLocaleString()}</p></div>
            </section>
          </div>
        </div>
      </section>

      {paymentOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-[28px] border border-[#efc89b] bg-white p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b94a0f]">Secure Payment Gateway</p>
            <h2 className="mt-2 text-3xl font-black text-[#7a3604]">Complete Payment to Submit Order</h2>
            <p className="mt-3 text-[#7b4a22]">Choose a payment gateway, confirm the amount, and then the Kundli order will be submitted.</p>
            <div className="mt-5 grid grid-cols-3 gap-3">{(["UPI", "Razorpay", "Stripe"] as PaymentMethod[]).map((method) => <button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`rounded-xl px-4 py-3 text-sm font-semibold ${paymentMethod === method ? "bg-[#b94a0f] text-white" : "border border-[#efcfb0] bg-[#fffaf4] text-[#7a3604]"}`}>{method}</button>)}</div>
            <div className="mt-5 rounded-2xl border border-[#f1d4b4] bg-[#fffaf4] p-4">
              <p className="text-sm text-[#9a5b1d]">Payment Amount</p>
              <p className="mt-1 text-3xl font-black text-[#a63d07]">INR {totalAmount.toLocaleString()}</p>
              <p className="mt-2 text-sm text-[#7b4a22]">After successful payment the order will be recorded with paid status and an invoice number.</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setPaymentOpen(false)} className="rounded-xl border border-[#efcfb0] bg-white px-5 py-3 font-semibold text-[#7a3604]">Cancel</button>
              <button type="button" onClick={handleConfirmPayment} disabled={loading} className="rounded-xl bg-[#b94a0f] px-5 py-3 font-semibold text-white hover:bg-[#983707] disabled:opacity-70">
                {loading ? "Confirming Payment..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});
