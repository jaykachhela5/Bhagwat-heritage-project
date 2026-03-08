import { memo, useMemo, useState, type FormEvent } from "react";
import { donorApi } from "../../services/api/misc";
import { FeatureHeroSlider } from "../../components/sections/FeatureHeroSlider";
import { FAQSection } from "../../components/sections/FAQSection";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { usePageMeta } from "../../hooks/usePageMeta";

type DonationMode = "One-Time" | "Monthly";
type PaymentMethod = "UPI" | "Card" | "Net Banking" | "Razorpay";
type DonationCause = "Temple Seva" | "Education Support" | "Healthcare Support" | "Food Distribution" | "Festival Seva" | "General Fund";
type DonorType = "Individual" | "Family" | "Organization";
type ReceiptMode = "Email Receipt" | "WhatsApp Receipt" | "Both";

const DONATION_TIERS = [
  { label: "Basic Support", amount: 1001 },
  { label: "Silver Seva", amount: 5001 },
  { label: "Gold Seva", amount: 11000 },
  { label: "Platinum Seva", amount: 51000 },
];

const DONATE_BANNER_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80",
    title: "Make a Donation",
    subtitle: "Your contribution helps us serve thousands of lives",
  },
  {
    image: "https://static.vecteezy.com/system/resources/thumbnails/028/151/501/small_2x/plexus-motion-background-animation-animated-background-free-video.jpg",
    title: "Preserve Faith and Humanity",
    subtitle: "Support temple seva, cultural programs, and social welfare initiatives",
  },
  {
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
    title: "Donate for Divine Impact",
    subtitle: "Every offering powers education, healthcare, and community service",
  },
];

const DONATION_CAUSES: { cause: DonationCause; detail: string }[] = [
  { cause: "Temple Seva", detail: "Daily puja, darshan support, and mandir maintenance." },
  { cause: "Education Support", detail: "Books, mentorship, and values-based child education support." },
  { cause: "Healthcare Support", detail: "Medical camps and emergency health support programs." },
  { cause: "Food Distribution", detail: "Prasad and food seva for devotees and community welfare drives." },
  { cause: "Festival Seva", detail: "Katha, utsav, event arrangements, and devotional program support." },
  { cause: "General Fund", detail: "Flexible allocation where trust operations need immediate support." },
];

const TRANSPARENCY_POINTS = [
  "Verified trust-led donation management",
  "Cause-based fund allocation approach",
  "Regular review and program accountability",
  "Donor acknowledgement and support response",
];

const FAQS = [
  {
    q: "Can I donate monthly?",
    a: "Yes, you can choose Monthly mode and support ongoing seva programs.",
  },
  {
    q: "Can I donate anonymously?",
    a: "Yes, enable anonymous mode in the form before submitting.",
  },
  {
    q: "How will my donation be used?",
    a: "It is utilized for selected causes like temple, education, healthcare, and community seva.",
  },
];

function getImpactText(amount: number, cause: DonationCause): string {
  if (amount >= 51000) return `High-impact support for ${cause} programs at scale.`;
  if (amount >= 11000) return `Strong monthly/seasonal support for ${cause}.`;
  if (amount >= 5001) return `Meaningful contribution toward ${cause} activities.`;
  return `Every contribution supports ${cause} with direct impact.`;
}

export default memo(function DonatePage() {
  usePageMeta("Donation", "Support trust seva with transparent donation options.");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 1001,
    message: "",
    cause: "Temple Seva" as DonationCause,
    donationMode: "One-Time" as DonationMode,
    paymentMethod: "UPI" as PaymentMethod,
    anonymous: false,
    donorType: "Individual" as DonorType,
    receiptMode: "Email Receipt" as ReceiptMode,
    panNumber: "",
    addressLine: "",
    state: "",
    pincode: "",
    dedicateDonation: false,
    dedicationName: "",
    dedicationNote: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const impactText = useMemo(() => getImpactText(form.amount, form.cause), [form.amount, form.cause]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const composedMessage = [
        form.message,
        `Cause: ${form.cause}`,
        `Mode: ${form.donationMode}`,
        `Payment: ${form.paymentMethod}`,
        `Anonymous: ${form.anonymous ? "Yes" : "No"}`,
        `Donor Type: ${form.donorType}`,
        `Receipt: ${form.receiptMode}`,
        form.panNumber ? `PAN: ${form.panNumber}` : "",
        form.addressLine ? `Address: ${form.addressLine}, ${form.state}, ${form.pincode}` : "",
        form.dedicateDonation ? `Dedicated To: ${form.dedicationName}` : "",
        form.dedicationNote ? `Dedication Note: ${form.dedicationNote}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await donorApi.create({
        name: form.anonymous ? "Anonymous Donor" : form.name,
        email: form.email,
        phone: form.phone,
        amount: form.amount,
        message: composedMessage,
      });

      setMsg({ type: "success", text: "Thank you for your generous donation. May your seva bring blessings." });
      setForm({
        name: "",
        email: "",
        phone: "",
        amount: 1001,
        message: "",
        cause: "Temple Seva",
        donationMode: "One-Time",
        paymentMethod: "UPI",
        anonymous: false,
        donorType: "Individual",
        receiptMode: "Email Receipt",
        panNumber: "",
        addressLine: "",
        state: "",
        pincode: "",
        dedicateDonation: false,
        dedicationName: "",
        dedicationNote: "",
        consent: false,
      });
    } catch {
      setMsg({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageSectionShell className="pt-8 md:pt-10">
        <FeatureHeroSlider slides={DONATE_BANNER_SLIDES} />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#f1c899] bg-gradient-to-r from-[#fff8ee] via-[#fff5e8] to-[#ffefdc] p-5 md:p-7 shadow-[0_14px_30px_rgba(177,96,23,0.14)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="rounded-xl border border-[#efcfab] bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-[#8a5a2b] font-semibold">Selected Cause</p>
              <h3 className="text-xl font-black text-[#8a3f09] mt-1">{form.cause}</h3>
            </article>
            <article className="rounded-xl border border-[#efcfab] bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-[#8a5a2b] font-semibold">Donation Mode</p>
              <h3 className="text-xl font-black text-[#8a3f09] mt-1">{form.donationMode}</h3>
            </article>
            <article className="rounded-xl border border-[#efcfab] bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-[#8a5a2b] font-semibold">Impact Preview</p>
              <p className="text-sm text-[#7a5634] mt-1">{impactText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-10 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-black text-[#123753] text-center mb-5">Choose Donation Cause</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {DONATION_CAUSES.map((item) => (
            <button
              key={item.cause}
              type="button"
              onClick={() => setForm((f) => ({ ...f, cause: item.cause }))}
              className={`text-left rounded-2xl border p-4 shadow-sm hover:shadow-md transition ${
                form.cause === item.cause ? "border-[#c47508] bg-[#fff5e7]" : "border-[#dbe8f4] bg-white"
              }`}
            >
              <h3 className="text-lg font-black text-[#123753]">{item.cause}</h3>
              <p className="text-sm text-[#536777] mt-1">{item.detail}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="py-8 max-w-6xl mx-auto px-4">
        <h2 className="section-title">Seva Plans</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {DONATION_TIERS.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              onClick={() => setForm((f) => ({ ...f, amount: tier.amount }))}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                form.amount === tier.amount ? "border-[#0d3b66] bg-[#0d3b66] text-white" : "border-gray-200 hover:border-[#0d3b66]"
              }`}
            >
              <p className="font-bold">{tier.label}</p>
              <p className="text-lg">INR {tier.amount.toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#dce8f4] bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              {(["Individual", "Family", "Organization"] as DonorType[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, donorType: kind }))}
                  className={`rounded-lg py-2 text-xs md:text-sm font-semibold ${
                    form.donorType === kind ? "bg-[#163b63] text-white" : "bg-[#eef4fb] text-[#37506a]"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(["One-Time", "Monthly"] as DonationMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, donationMode: mode }))}
                  className={`rounded-lg py-2 text-sm font-semibold ${
                    form.donationMode === mode ? "bg-[#0d3b66] text-white" : "bg-[#eef4fb] text-[#37506a]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required={!form.anonymous}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="text"
              placeholder="PAN Number (optional for tax receipt)"
              value={form.panNumber}
              onChange={(e) => setForm((f) => ({ ...f, panNumber: e.target.value.toUpperCase() }))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold">INR</span>
              <input
                type="number"
                placeholder="Custom Amount"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
                min={1}
                required
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Address Line"
                value={form.addressLine}
                onChange={(e) => setForm((f) => ({ ...f, addressLine: e.target.value }))}
                className="md:col-span-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
              <input
                type="text"
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#123753] mb-2">Payment Method</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["UPI", "Card", "Net Banking", "Razorpay"] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, paymentMethod: method }))}
                    className={`rounded-lg py-2 text-xs md:text-sm font-semibold ${
                      form.paymentMethod === method ? "bg-[#c47508] text-white" : "bg-[#fff3df] text-[#8a5b23]"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#123753] mb-2">Receipt Preference</p>
              <div className="grid grid-cols-3 gap-2">
                {(["Email Receipt", "WhatsApp Receipt", "Both"] as ReceiptMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, receiptMode: mode }))}
                    className={`rounded-lg py-2 text-xs md:text-sm font-semibold ${
                      form.receiptMode === mode ? "bg-[#c47508] text-white" : "bg-[#fff3df] text-[#8a5b23]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[#4f6272]">
              <input
                type="checkbox"
                checked={form.anonymous}
                onChange={(e) => setForm((f) => ({ ...f, anonymous: e.target.checked }))}
              />
              Donate as Anonymous
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-[#4f6272]">
              <input
                type="checkbox"
                checked={form.dedicateDonation}
                onChange={(e) => setForm((f) => ({ ...f, dedicateDonation: e.target.checked }))}
              />
              Dedicate this donation in someone&apos;s honor
            </label>

            {form.dedicateDonation && (
              <div className="space-y-3 rounded-xl border border-[#e4edf7] bg-[#fbfdff] p-3">
                <input
                  type="text"
                  placeholder="Dedicated To (Name)"
                  value={form.dedicationName}
                  onChange={(e) => setForm((f) => ({ ...f, dedicationName: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
                />
                <textarea
                  placeholder="Dedication Note"
                  value={form.dedicationNote}
                  onChange={(e) => setForm((f) => ({ ...f, dedicationNote: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
                />
              </div>
            )}

            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
            />
            <div className="rounded-lg border border-[#e5edf8] bg-[#f8fbff] px-3 py-2 text-xs text-[#4f6272]">
              Donation Summary: <span className="font-semibold">{form.donationMode}</span> | <span className="font-semibold">{form.cause}</span> |
              <span className="font-semibold"> INR {form.amount.toLocaleString()}</span> | <span className="font-semibold">{form.paymentMethod}</span>
            </div>
            <label className="inline-flex items-start gap-2 text-sm text-[#4f6272]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                required
              />
              I confirm the donor information is accurate and I agree to trust donation processing policy.
            </label>
            {msg && <p className={`text-sm ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>{msg.text}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-lg">
              {loading ? "Processing..." : `Donate INR ${form.amount.toLocaleString()}`}
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-3xl border border-[#dbe8f4] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#123753] mb-3">Transparency and Trust</h2>
            <div className="space-y-2">
              {TRANSPARENCY_POINTS.map((item) => (
                <div key={item} className="rounded-lg border border-[#e4edf7] bg-[#fbfdff] px-3 py-2 text-sm text-[#4f6272]">
                  {item}
                </div>
              ))}
            </div>
          </article>
          <FAQSection title="Donation FAQs" items={FAQS} />
        </div>
      </section>
    </div>
  );
});
