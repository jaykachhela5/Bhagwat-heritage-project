import { memo, useMemo, useState, type FormEvent } from "react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { kundliRequestsApi } from "../../services/api/kundli";

type Gender = "Male" | "Female";
type PreferredLanguage = "English" | "Hindi" | "Marathi" | "Gujarati";
type DeliveryPreference = "Email" | "WhatsApp" | "Both";
type PaymentMethod = "UPI" | "Razorpay" | "Stripe";

type ServiceOption = {
  id: string;
  title: string;
  label: string;
  pages: number;
  price: number;
};

type KundliFormState = {
  fullName: string;
  gender: Gender;
  orderDate: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  district: string;
  state: string;
  signature: string;
  preferredLanguage: PreferredLanguage;
  deliveryPreference: DeliveryPreference;
  mobileNumber: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
  selectedTitles: string[];
  consent: boolean;
};

const SERVICES_LEFT: ServiceOption[] = [
  { id: "complete", title: "Complete Detailed Kundli", label: "संपूर्ण विस्तृत कुंडली", pages: 100, price: 1501 },
  { id: "special", title: "Special Detailed Kundli", label: "विशेष विस्तृत कुंडली", pages: 40, price: 701 },
  { id: "forecast", title: "Birth Chart Analysis and Annual Forecast", label: "जन्म कुंडली फलित एवं वर्षफल", pages: 30, price: 501 },
  { id: "analysis", title: "Birth Chart Analysis", label: "जन्म कुंडली फलित", pages: 30, price: 351 },
  { id: "kp", title: "Krishnamurti Paddhati Kundli", label: "कृष्णमूर्ति पद्धति कुंडली", pages: 20, price: 351 },
];

const SERVICES_RIGHT: ServiceOption[] = [
  { id: "match", title: "Marriage Compatibility Analysis", label: "वैवाहिक गुण मिलान", pages: 7, price: 301 },
  { id: "annual", title: "Annual Kundli and Forecast", label: "वार्षिक कुंडली एवं वर्षफल", pages: 8, price: 200 },
  { id: "naming", title: "Naming Ceremony Kundli", label: "नामकरण कुंडली", pages: 4, price: 151 },
  { id: "notes", title: "Birth Notes", label: "जन्म टिपण", pages: 1, price: 101 },
];

const SERVICES = [...SERVICES_LEFT, ...SERVICES_RIGHT];
const LANGUAGE_OPTIONS: PreferredLanguage[] = ["English", "Hindi", "Marathi", "Gujarati"];
const DELIVERY_OPTIONS: DeliveryPreference[] = ["Email", "WhatsApp", "Both"];
const PAYMENT_OPTIONS: PaymentMethod[] = ["UPI", "Razorpay", "Stripe"];
const GENDER_OPTIONS: Gender[] = ["Male", "Female"];
const TODAY = new Date().toISOString().slice(0, 10);

const pageClass = "min-h-screen bg-[radial-gradient(circle_at_top,#e9f7ff_0%,#d7eefb_45%,#bfdced_100%)] px-4 py-6 md:px-6 md:py-10";
const paperFrameClass = "mx-auto w-full max-w-6xl rounded-[28px] bg-[#e5f4fb] p-2 shadow-[0_18px_60px_rgba(21,83,122,0.16)] md:p-3";
const paperOuterClass = "rounded-[24px] border-[3px] border-[#1f7a8c] bg-[#fafdff] p-2 md:p-4";
const paperInnerClass = "rounded-[18px] border-2 border-[#6ec1e4] p-4 md:p-7";
const labelClass = "text-[15px] font-semibold text-[#1b5e7a] md:text-[18px]";
const fieldClass =
  "w-full border-b-2 border-[#6ec1e4] bg-transparent px-1 py-1 text-[15px] text-[#1b5e7a] outline-none placeholder:text-[#5e97af] md:text-[17px]";
const smallFieldClass =
  "w-full border-b-2 border-[#6ec1e4] bg-transparent px-1 py-1 text-sm text-[#1b5e7a] outline-none placeholder:text-[#5e97af] md:text-base";
const sectionHeadingClass = "text-center text-[24px] font-black text-[#1f7a8c] md:text-[34px]";
const sectionSubheadingClass = "text-center text-[17px] font-bold text-[#1f7a8c] md:text-[22px]";
const redBoxButtonBase =
  "inline-flex items-center justify-center rounded-md border-2 px-3 py-2 text-sm font-semibold transition md:text-base";

function createInitialForm(): KundliFormState {
  return {
    fullName: "",
    gender: "Male",
    orderDate: TODAY,
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    district: "",
    state: "",
    signature: "",
    preferredLanguage: "Hindi",
    deliveryPreference: "Email",
    mobileNumber: "",
    email: "",
    address: "",
    paymentMethod: "UPI",
    selectedTitles: [],
    consent: false,
  };
}

function formatAmount(amount: number) {
  return `INR ${amount.toLocaleString("en-IN")}`;
}

function squareChoiceClass(selected: boolean) {
  return `${redBoxButtonBase} ${
    selected ? "border-[#1f7a8c] bg-[#1f7a8c] text-white" : "border-[#6ec1e4] bg-transparent text-[#1f7a8c] hover:bg-[#eef9ff]"
  }`;
}

function ServiceRow({
  service,
  selected,
  onToggle,
}: {
  service: ServiceOption;
  selected: boolean;
  onToggle: (title: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-[#eef9ff]">
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-semibold leading-6 text-[#1b5e7a] md:text-[18px]">{service.label}</p>
        <p className="text-sm text-[#3d7c98] md:text-[15px]">{service.title}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[15px] font-bold text-[#1b5e7a] md:text-[17px]">({service.pages} Pages)</p>
        <p className="mt-1 text-[17px] font-black text-[#1b5e7a] md:text-[20px]">{service.price}/-</p>
      </div>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(service.title)}
        className="mt-1 h-5 w-5 shrink-0 rounded-none border-2 border-[#2a9d8f] accent-[#2a9d8f]"
      />
    </label>
  );
}

export default memo(function KundliPage() {
  usePageMeta("Computer Janam Kundli", "Paper-style online kundli booking form based on the trust's traditional format.");

  const [form, setForm] = useState<KundliFormState>(createInitialForm);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const selectedServices = useMemo(
    () => SERVICES.filter((service) => form.selectedTitles.includes(service.title)),
    [form.selectedTitles],
  );

  const totalAmount = useMemo(() => selectedServices.reduce((sum, service) => sum + service.price, 0), [selectedServices]);
  const totalPages = useMemo(() => selectedServices.reduce((sum, service) => sum + service.pages, 0), [selectedServices]);
  const deliverySummary = form.deliveryPreference === "Both" ? "email and WhatsApp" : form.deliveryPreference.toLowerCase();

  const updateForm = <K extends keyof KundliFormState>(key: K, value: KundliFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleService = (title: string) => {
    setForm((current) => ({
      ...current,
      selectedTitles: current.selectedTitles.includes(title)
        ? current.selectedTitles.filter((item) => item !== title)
        : [...current.selectedTitles, title],
    }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (selectedServices.length === 0) {
      setNotice({ type: "error", text: "Please select at least one kundli type." });
      return;
    }

    setLoading(true);
    setNotice(null);

    try {
      const paymentReference = `KND-${TODAY.replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

      const { data } = await kundliRequestsApi.create({
        fullName: form.fullName.trim(),
        gender: form.gender,
        orderDate: form.orderDate,
        signature: form.signature.trim() || undefined,
        dateOfBirth: form.dateOfBirth,
        timeOfBirth: form.timeOfBirth,
        placeOfBirth: form.placeOfBirth.trim(),
        district: form.district.trim(),
        state: form.state.trim(),
        country: "India",
        selectedServices: selectedServices.map(({ title, pages, price }) => ({ title, pages, price })),
        preferredLanguage: form.preferredLanguage,
        deliveryPreference: form.deliveryPreference,
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        address: form.address.trim() || undefined,
        totalAmount,
        paymentMethod: form.paymentMethod,
        paymentStatus: "Paid",
        paymentReference,
      });

      setNotice({
        type: "success",
        text: `Order ${data.orderId} created successfully. Your kundli will be shared by ${deliverySummary} within ${data.estimatedDeliveryTime}.`,
      });
      setForm(createInitialForm());
    } catch {
      setNotice({
        type: "error",
        text: "Something went wrong while submitting the kundli booking. Please review the form and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={pageClass}>
      <form onSubmit={handleSubmit} className={paperFrameClass}>
        <div className={paperOuterClass}>
          <div className={paperInnerClass}>
            <div className="grid gap-5 md:grid-cols-[180px_minmax(0,1fr)_140px] md:items-start">
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex h-[130px] w-[130px] items-center justify-center rounded-[18px] border-[3px] border-[#1f7a8c] bg-[#f3fbff] text-[64px] font-black leading-none text-[#1f7a8c]">
                  ॐ
                </div>
              </div>

              <div className="text-center">
                <p className="text-[18px] font-bold text-[#1f7a8c] md:text-[24px]">|| स्वामीश्रीजी ||</p>
                <p className="mt-1 text-[22px] font-black text-[#1f7a8c] md:text-[34px]">श्री भागवत संस्कृती सेवा प्रतिष्ठान</p>
                <h1 className="mt-2 text-[32px] font-black uppercase leading-none text-[#1f7a8c] md:text-[58px]">
                  कम्प्यूटर जन्म कुंडली
                </h1>
                <p className="mt-2 text-[20px] font-black text-[#1f7a8c] md:text-[32px]">श्री स्वामिनारायण मंदिर, चंद्रपुर</p>
                <p className="mt-2 text-sm font-semibold text-[#3d7c98] md:text-lg">
                  Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402
                </p>
              </div>

              <div className="space-y-3 md:pt-4">
                <div>
                  <p className="text-right text-[14px] font-black text-[#1f7a8c] md:text-[18px]">101</p>
                  <div className="mt-1">
                    <p className="mb-1 text-right text-sm font-semibold text-[#1f7a8c]">Date / तारीख</p>
                    <input
                      type="date"
                      value={form.orderDate}
                      onChange={(event) => updateForm("orderDate", event.target.value)}
                      className={smallFieldClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.35fr)_260px]">
              <label className="block">
                <span className={labelClass}>Name / नाम</span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => updateForm("fullName", event.target.value)}
                  required
                  placeholder="Enter full name"
                  className={fieldClass}
                />
              </label>

              <div>
                <span className={labelClass}>Sex / लिंग</span>
                <div className="mt-2 flex gap-2">
                  {GENDER_OPTIONS.map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => updateForm("gender", gender)}
                      className={squareChoiceClass(form.gender === gender)}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Date of Birth / जन्म तारीख</span>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(event) => updateForm("dateOfBirth", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Time of Birth / जन्म समय</span>
                <input
                  type="time"
                  value={form.timeOfBirth}
                  onChange={(event) => updateForm("timeOfBirth", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_0.7fr_0.7fr]">
              <label className="block">
                <span className={labelClass}>Place of Birth / जन्म स्थान</span>
                <input
                  type="text"
                  value={form.placeOfBirth}
                  onChange={(event) => updateForm("placeOfBirth", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Dist. / जिला</span>
                <input
                  type="text"
                  value={form.district}
                  onChange={(event) => updateForm("district", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>State / राज्य</span>
                <input
                  type="text"
                  value={form.state}
                  onChange={(event) => updateForm("state", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="mt-8 border-y-2 border-[#6ec1e4] py-4">
              <h2 className={sectionSubheadingClass}>कुंडलियों के प्रकार</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2 md:divide-x-2 md:divide-[#6ec1e4]">
                <div className="space-y-1 md:pr-4">
                  {SERVICES_LEFT.map((service) => (
                    <ServiceRow
                      key={service.id}
                      service={service}
                      selected={form.selectedTitles.includes(service.title)}
                      onToggle={toggleService}
                    />
                  ))}
                </div>

                <div className="space-y-1 md:pl-4">
                  {SERVICES_RIGHT.map((service) => (
                    <ServiceRow
                      key={service.id}
                      service={service}
                      selected={form.selectedTitles.includes(service.title)}
                      onToggle={toggleService}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <label className="block">
                <span className={labelClass}>Mobile / मोबाइल</span>
                <input
                  type="tel"
                  value={form.mobileNumber}
                  onChange={(event) => updateForm("mobileNumber", event.target.value)}
                  required
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Sign / हस्ताक्षर</span>
                <input
                  type="text"
                  value={form.signature}
                  onChange={(event) => updateForm("signature", event.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>

            <div className="mt-6 border-t-2 border-[#6ec1e4] pt-4">
              <p className="text-center text-[15px] font-bold text-[#1f7a8c] md:text-[18px]">
                Note : Rates are for only one language / किसी भी एक भाषा के लिये
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div>
                  <p className={labelClass}>Languages Preferred / भाषा चयन</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {LANGUAGE_OPTIONS.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => updateForm("preferredLanguage", language)}
                        className={squareChoiceClass(form.preferredLanguage === language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Delivery / डिलीवरी</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {DELIVERY_OPTIONS.map((delivery) => (
                      <button
                        key={delivery}
                        type="button"
                        onClick={() => updateForm("deliveryPreference", delivery)}
                        className={squareChoiceClass(form.deliveryPreference === delivery)}
                      >
                        {delivery}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[18px] border-2 border-dashed border-[#6ec1e4] bg-[#f3fbff] p-4 md:p-5">
              <h2 className={sectionSubheadingClass}>Online Delivery Details</h2>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    required
                    className={fieldClass}
                  />
                </label>

                <div>
                  <span className={labelClass}>Payment Method</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PAYMENT_OPTIONS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => updateForm("paymentMethod", method)}
                        className={squareChoiceClass(form.paymentMethod === method)}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block md:col-span-2">
                  <span className={labelClass}>Address / पता</span>
                  <textarea
                    value={form.address}
                    onChange={(event) => updateForm("address", event.target.value)}
                    rows={3}
                    className={`${fieldClass} resize-none border-2 px-3 py-3`}
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-[18px] border border-[#6ec1e4] bg-[#f3fbff] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1f7a8c]">Selected Summary</p>
                <p className="mt-1 text-lg font-black text-[#1f7a8c]">
                  {selectedServices.length} Kundli Selected | {totalPages} Pages | {formatAmount(totalAmount)}
                </p>
              </div>
              <label className="flex items-start gap-3 text-sm font-semibold text-[#1b5e7a]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => updateForm("consent", event.target.checked)}
                  required
                  className="mt-1 h-5 w-5 rounded-none border-2 border-[#2a9d8f] accent-[#2a9d8f]"
                />
                <span>I confirm the information is correct and I agree to the kundli booking process.</span>
              </label>
            </div>

            {notice ? (
              <div
                className={`mt-4 rounded-[18px] border px-4 py-3 text-sm font-semibold ${
                  notice.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {notice.text}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-[#1b5e7a]">
                Completed kundli will be shared by {deliverySummary} after review and confirmation.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-[#1f7a8c] px-6 py-3 text-base font-bold text-white shadow-[0_14px_30px_rgba(31,122,140,0.22)] transition hover:bg-[#1b5e7a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Processing..." : `Submit Kundli Booking (${formatAmount(totalAmount || 0)})`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
