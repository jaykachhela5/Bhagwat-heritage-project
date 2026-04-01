import { memo, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { kundliRequestsApi } from "../../services/api/kundli";

type Gender = "Male" | "Female";
type PreferredLanguage = "English" | "Hindi" | "Marathi" | "Gujarati";
type DeliveryPreference = "Email" | "WhatsApp" | "Both";
type PaymentMethod = "UPI" | "Razorpay" | "Stripe";

type ServiceOption = {
  title: string;
  englishTitle: string;
  pages: number;
  price: number;
  detail: string;
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

const SERVICES: ServiceOption[] = [
  { title: "संपूर्ण विस्तृत कुंडली", englishTitle: "Complete Detailed Kundli", pages: 100, price: 1501, detail: "Full report with complete reading and guidance." },
  { title: "विशेष विस्तृत कुंडली", englishTitle: "Special Detailed Kundli", pages: 40, price: 701, detail: "Focused kundli guidance with refined insights." },
  { title: "जन्म कुंडली फलित एवं वर्षफल", englishTitle: "Birth Chart Analysis and Annual Forecast", pages: 30, price: 501, detail: "Birth chart reading with yearly forecast direction." },
  { title: "जन्म कुंडली फलित", englishTitle: "Birth Chart Analysis", pages: 30, price: 351, detail: "Practical interpretation of the birth chart." },
  { title: "कृष्णमूर्ति पद्धती कुंडली", englishTitle: "Krishnamurti Paddhati Kundli", pages: 20, price: 351, detail: "KP-based reading for precise timing and clarity." },
  { title: "वैवाहिक गुण मिलान", englishTitle: "Marriage Compatibility Analysis", pages: 7, price: 301, detail: "Compatibility analysis for marriage guidance." },
  { title: "वार्षिक कुंडली एवं वर्षफल", englishTitle: "Annual Kundli and Forecast", pages: 8, price: 200, detail: "Yearly reading with forecast points." },
  { title: "नामकरण कुंडली", englishTitle: "Naming Ceremony Kundli", pages: 4, price: 151, detail: "Kundli support for naming ceremony decisions." },
  { title: "जन्म टिप्पणी", englishTitle: "Birth Notes", pages: 1, price: 101, detail: "Quick birth note for concise reference." },
];

const LANGUAGE_OPTIONS: PreferredLanguage[] = ["English", "Hindi", "Marathi", "Gujarati"];
const DELIVERY_OPTIONS: DeliveryPreference[] = ["Email", "WhatsApp", "Both"];
const PAYMENT_OPTIONS: PaymentMethod[] = ["UPI", "Razorpay", "Stripe"];
const GENDER_OPTIONS: Gender[] = ["Male", "Female"];
const TODAY = new Date().toISOString().slice(0, 10);

const THEME = {
  page: "min-h-screen bg-[#0B2230] pb-16",
  heroWrap: "overflow-hidden rounded-[34px] border border-white/10 bg-[#0d6179] shadow-[0_20px_44px_rgba(0,0,0,0.22)]",
  heroIcon:
    "flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/10 bg-[#ef9a1e]/15 text-[2.75rem] font-black text-[#ef9a1e] shadow-[0_14px_30px_rgba(0,0,0,0.12)]",
  heroLabel: "text-[18px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  heroTitleLine: "mt-2 text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e] md:text-[28px]",
  heroTitle: "mt-3 text-4xl font-black leading-[0.95] text-white md:text-5xl",
  heroSubtitle: "mt-3 text-[18px] font-bold text-[#ef9a1e] md:text-[24px]",
  heroBody: "mt-6 max-w-2xl text-base leading-7 text-[#dce7ec] md:text-lg",
  heroPrimaryButton:
    "inline-flex items-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]",
  heroSecondaryButton:
    "inline-flex items-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]",
  sidePanel: "border-t border-white/10 bg-[#0c5871] p-6 md:p-8 lg:border-l lg:border-t-0",
  sideCard: "rounded-[24px] border border-white/10 bg-[#0c5871] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
  label: "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  heading: "mt-1 text-[14px] font-black text-white md:text-[20px]",
  note: "mt-2 text-sm leading-6 text-[#dce7ec]",
  summaryCard: "rounded-[26px] border border-white/10 bg-[#0d6179] p-4 text-white shadow-[0_16px_34px_rgba(0,0,0,0.20)]",
  summaryLabel: "text-[24px] uppercase tracking-[0.18em] text-[#ef9a1e]",
  summaryValue: "mt-1 text-[14px] font-black text-white md:text-[20px]",
  sectionHeader: "mb-6 text-center",
  sectionLabel: "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  sectionTitle: "mt-2 text-[14px] font-black text-white md:text-[20px]",
  sectionNote: "mt-2 text-sm text-[#dce7ec] md:text-base",
  serviceGrid: "space-y-4 rounded-[30px] border border-white/10 bg-[#0d6179] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.20)] md:p-6",
  serviceCard:
    "flex h-full flex-col rounded-[24px] border border-white/10 bg-[#0c5871] p-4 text-left shadow-sm transition hover:border-[#ef9a1e] hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]",
  serviceCardSelected:
    "flex h-full flex-col rounded-[24px] border border-[#ef9a1e] bg-[#123e55] p-4 text-left shadow-[0_14px_30px_rgba(0,0,0,0.24)]",
  serviceName: "text-[24px] uppercase tracking-[0.18em] text-[#ef9a1e]",
  serviceTitle: "mt-1 text-[16px] font-black text-white md:text-[20px]",
  serviceDetail: "mt-3 text-sm leading-6 text-[#dce7ec] md:text-[15px]",
  serviceMeta: "text-lg font-black text-white",
  formCard: "space-y-4 rounded-[30px] border border-white/10 bg-[#0d6179] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.20)] md:p-6",
  formSection: "rounded-[24px] border border-white/10 bg-[#0c5871] p-4",
  formLabel: "text-[24px] uppercase tracking-[0.18em] text-[#ef9a1e]",
  formHeading: "mt-1 text-[14px] font-black text-white md:text-[20px]",
  formNote: "mt-1 text-sm text-[#dce7ec]",
  formSummaryCard: "rounded-2xl border border-white/10 bg-[#0c5871] p-4",
  formSummaryText: "mt-1 text-[14px] font-black text-white md:text-[20px]",
  formSelectedItem:
    "flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d6179] px-4 py-3 text-sm text-[#dce7ec]",
  noticeSuccess: "rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700",
  noticeError: "rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700",
  submitButton:
    "inline-flex w-full items-center justify-center rounded-2xl bg-[#ef9a1e] px-6 py-4 text-base font-bold text-white shadow-[0_18px_34px_rgba(239,154,30,0.28)] transition hover:bg-[#de930a] disabled:cursor-not-allowed disabled:opacity-70",
  deliveryNote: "rounded-[24px] border border-dashed border-white/10 bg-[#0c5871] p-4",
  deliveryNoteLabel: "text-[24px] uppercase tracking-[0.18em] text-[#ef9a1e]",
  deliveryNoteText: "mt-2 text-sm leading-6 text-[#dce7ec]",
} as const;

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#17314a] outline-none transition placeholder:text-[#6b8091] focus:border-[#ef9a1e] focus:ring-2 focus:ring-[#efc06a]";

function formatAmount(amount: number) {
  return `INR ${amount.toLocaleString("en-IN")}`;
}

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

function chipClass(selected: boolean) {
  return `rounded-full px-4 py-2 text-sm font-semibold transition ${
    selected
      ? "border border-[#ef9a1e] bg-[#ef9a1e] text-white shadow-[0_10px_24px_rgba(239,154,30,0.24)]"
      : "border border-white/10 bg-[#0c5871] text-[#dce7ec]"
  }`;
}

export default memo(function KundliPage() {
  usePageMeta("Kundli Booking", "Book traditional computer janam kundli reports with email or WhatsApp delivery.");

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

  const scrollToForm = () => document.getElementById("kundli-booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

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
        text: `Order ${data.orderId} has been created. Your Kundli will be shared by ${deliverySummary} within ${data.estimatedDeliveryTime}.`,
      });
      setForm(createInitialForm());
    } catch {
      setNotice({
        type: "error",
        text: "Something went wrong while submitting the Kundli booking. Please review the form and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={THEME.page}>
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className={THEME.heroWrap}>
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-start gap-4">
                <div className={THEME.heroIcon}>
                  ॐ
                </div>
                <div className="min-w-0 flex-1">
                  <p className={THEME.heroLabel}>॥ स्वामी श्रीजी ॥</p>
                  <p className={THEME.heroTitleLine}>
                    श्री भगवत संस्कृती सेवा प्रतिष्ठान
                  </p>
                  <h1 className={THEME.heroTitle}>
                    कम्प्यूटर जन्म कुंडली
                  </h1>
                  <p className={THEME.heroSubtitle}>श्री स्वामीनारायण मंदिर, चंद्रपुर</p>
                </div>
              </div>

              <p className={THEME.heroBody}>
                Select the kundli type, enter birth details, and choose how you want the completed report delivered.
                The report can be sent through email or WhatsApp after preparation.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className={THEME.heroPrimaryButton}
                >
                  Book Kundli
                </button>
                <Link
                  to={ROUTES.contact}
                  className={THEME.heroSecondaryButton}
                >
                  Contact Us
                </Link>
                <Link
                  to={ROUTES.digital.index}
                  className={THEME.heroSecondaryButton}
                >
                  Digital Services
                </Link>
              </div>
            </div>

            <div className={THEME.sidePanel}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["Booking Mode", "Traditional Kundli Form", "Fill your birth details, select kundli types, and receive the prepared report by email or WhatsApp."],
                  ["Languages", "English, Hindi, Marathi, Gujarati", "Rates are for only one selected language."],
                  ["Delivery", "Email, WhatsApp, or Both", "The finished Kundli can be delivered by the channel you choose."],
                  ["Payment", "UPI, Razorpay, Stripe", "Choose the gateway that suits your booking flow."],
                ].map(([title, value, note]) => (
                  <article
                    key={title}
                    className={THEME.sideCard}
                  >
                    <p className={THEME.label}>{title}</p>
                    <p className={THEME.heading}>{value}</p>
                    <p className={THEME.note}>{note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kundli-booking-form" className="mx-auto mt-8 max-w-7xl px-4">
        <div className="mb-6 text-center">
          <p className={THEME.sectionLabel}>Kundli Types</p>
          <h2 className={THEME.sectionTitle}>Price List and Service Options</h2>
          <p className={THEME.sectionNote}>Rates are for one language only.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className={THEME.serviceGrid}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {SERVICES.map((service) => {
                const selected = form.selectedTitles.includes(service.title);

                return (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => toggleService(service.title)}
                    className={`flex h-full flex-col rounded-[24px] border p-4 text-left transition ${
                      selected
                        ? "border-[#ef9a1e] bg-[#123e55] shadow-[0_14px_30px_rgba(0,0,0,0.24)]"
                        : "border-white/10 bg-[#0c5871] hover:border-[#ef9a1e]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={THEME.label}>{service.englishTitle}</p>
                        <h3 className={THEME.serviceTitle}>{service.title}</h3>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                          selected
                            ? "border-[#ef9a1e] bg-[#ef9a1e] text-white"
                            : "border-white/10 bg-[#0d6179] text-[#dce7ec]"
                        }`}
                      >
                        {selected ? "Selected" : "Select"}
                      </span>
                    </div>

                    <p className={THEME.serviceDetail}>{service.detail}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/10 pt-3">
                      <span className={THEME.label}>
                        {service.pages} Pages
                      </span>
                      <span className="text-lg font-black text-white">{formatAmount(service.price)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={THEME.formCard}
          >
            <div>
              <p className={THEME.sectionLabel}>Traditional Booking Form</p>
              <h3 className={THEME.sectionTitle}>Complete Kundli Booking Details</h3>
            </div>

            <div className={THEME.formSection}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={THEME.label}>Selected Kundli Types</p>
                  <h4 className={THEME.heading}>Your report summary</h4>
                </div>
                <span className="rounded-full bg-[#ef9a1e] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ["Pages", `${totalPages} pages`],
                  ["Amount", formatAmount(totalAmount)],
                  ["Delivery", form.deliveryPreference],
                ].map(([label, value]) => (
                  <div key={label} className={THEME.formSummaryCard}>
                    <p className={THEME.label}>{label}</p>
                    <p className={THEME.heading}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-[#0d6179] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Selected items</p>
                {selectedServices.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {selectedServices.map((service) => (
                      <li
                        key={service.title}
                        className={THEME.formSelectedItem}
                      >
                        <span className="font-semibold text-white">{service.title}</span>
                        <span className="text-xs uppercase tracking-[0.18em] text-[#ef9a1e]">
                          {service.pages} Pages | {formatAmount(service.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={THEME.deliveryNoteText}>
                    No kundli type selected yet. Choose at least one report from the list.
                  </p>
                )}
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>1. Personal Information</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={(e) => setForm((current) => ({ ...current, fullName: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="date"
                  value={form.orderDate}
                  onChange={(e) => setForm((current) => ({ ...current, orderDate: e.target.value }))}
                  required
                  className={inputClass}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {GENDER_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, gender: item }))}
                    className={chipClass(form.gender === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>2. Birth Details</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => setForm((current) => ({ ...current, dateOfBirth: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="time"
                  value={form.timeOfBirth}
                  onChange={(e) => setForm((current) => ({ ...current, timeOfBirth: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Place of Birth"
                  value={form.placeOfBirth}
                  onChange={(e) => setForm((current) => ({ ...current, placeOfBirth: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="District"
                  value={form.district}
                  onChange={(e) => setForm((current) => ({ ...current, district: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm((current) => ({ ...current, state: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Signature / हस्ताक्षर (optional)"
                  value={form.signature}
                  onChange={(e) => setForm((current) => ({ ...current, signature: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>3. Preferred Language</p>
              <p className={THEME.formNote}>Rates are for only one selected language.</p>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                {LANGUAGE_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, preferredLanguage: item }))}
                    className={chipClass(form.preferredLanguage === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>4. Delivery Preference</p>
              <p className={THEME.formNote}>Choose how you want the completed Kundli to be shared.</p>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {DELIVERY_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, deliveryPreference: item }))}
                    className={chipClass(form.deliveryPreference === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>5. Contact Details</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={form.mobileNumber}
                  onChange={(e) => setForm((current) => ({ ...current, mobileNumber: e.target.value }))}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                  required
                  className={inputClass}
                />
                <textarea
                  placeholder="Address (optional)"
                  value={form.address}
                  onChange={(e) => setForm((current) => ({ ...current, address: e.target.value }))}
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>

            <div className={THEME.formSection}>
              <p className={THEME.label}>6. Payment System</p>
              <p className={THEME.formNote}>Choose your preferred gateway before submitting the booking.</p>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {PAYMENT_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, paymentMethod: item }))}
                    className={chipClass(form.paymentMethod === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className={THEME.deliveryNoteText}>Razorpay is included for secure online processing.</p>
            </div>

            <label className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-[#0c5871] p-4 text-sm text-[#dce7ec]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm((current) => ({ ...current, consent: e.target.checked }))}
                required
                className="mt-1 h-4 w-4 rounded border-[#ef9a1e] text-[#ef9a1e] focus:ring-[#ef9a1e]"
              />
              <span>I confirm the information above is accurate and I agree to the Kundli booking and payment process.</span>
            </label>

            {notice ? (
              <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${notice.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {notice.text}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className={THEME.submitButton}
            >
              {loading ? "Processing..." : `Proceed to Payment & Submit (${formatAmount(totalAmount || 0)})`}
            </button>

            <div className={THEME.deliveryNote}>
              <p className={THEME.label}>Delivery Note</p>
              <p className={THEME.deliveryNoteText}>
                The completed Kundli will be shared through {deliverySummary} using the contact details you provide.
              </p>
              <p className={THEME.deliveryNoteText}>
                Estimated delivery time is usually 3-5 working days after the booking is reviewed.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
});


