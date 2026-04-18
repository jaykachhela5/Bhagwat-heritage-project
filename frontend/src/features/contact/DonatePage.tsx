import { memo, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { donationCheckoutApi, type DonationPayload, type DonationVerifyPayload } from "../../services/api/donations";

type DonationForOption =
  | "Gau Seva"
  | "Annadan Seva"
  | "Jal Seva"
  | "Vidya Seva"
  | "Temple Seva"
  | "General Donation";

type DonationFrequency = "One Time" | "Monthly" | "Yearly";

type DonationFormState = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  email: string;
  mobile: string;
  donationFor: DonationForOption;
  donationFrequency: DonationFrequency;
  amount: string;
  panNumber: string;
  note: string;
  acceptedTerms: boolean;
};

type DonationErrors = Partial<Record<keyof DonationFormState, string>>;

const STATE_OPTIONS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
] as const;

const DONATION_FOR_OPTIONS: DonationForOption[] = [
  "Gau Seva",
  "Annadan Seva",
  "Jal Seva",
  "Vidya Seva",
  "Temple Seva",
  "General Donation",
];

const QUICK_AMOUNTS = [501, 1100, 2100, 5100, 11000] as const;

const TRUST_POINTS = [
  {
    title: "Secure Donation",
    detail: "Payments can continue through the protected Razorpay donation flow.",
  },
  {
    title: "Receipt Available",
    detail: "Accurate contact and PAN details help generate your acknowledgement receipt.",
  },
  {
    title: "Trusted Spiritual Service",
    detail: "Support seva, culture, and spiritual initiatives through Bhagwat Heritage.",
  },
] as const;

const INITIAL_FORM: DonationFormState = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pinCode: "",
  email: "",
  mobile: "",
  donationFor: "General Donation",
  donationFrequency: "One Time",
  amount: "",
  panNumber: "",
  note: "",
  acceptedTerms: false,
};

const panelClass =
  "rounded-[28px] border border-borderCard bg-bgSoft/95 p-6 shadow-[0_14px_30px_rgba(101,71,35,0.08)] md:p-8";
const sectionClass = "rounded-[24px] border border-borderCard bg-white/85 p-5 md:p-6";
const inputClass =
  "mt-2 w-full rounded-xl border border-borderCard bg-white px-4 py-3 text-base text-brown outline-none transition focus:border-gold focus:ring-2 focus:ring-[rgba(228,180,94,0.22)]";
const fieldLabelClass = "text-sm font-semibold text-tealDeep";
const errorClass = "mt-2 text-sm text-rust";

function mapDonationType(donationFor: DonationForOption): DonationPayload["donationType"] {
  if (donationFor === "Annadan Seva") return "Annadaan";
  if (donationFor === "Jal Seva") return "Jal Seva";
  return "Both";
}

function mapDonationMode(frequency: DonationFrequency): DonationPayload["donationMode"] {
  return frequency === "One Time" ? "One-Time" : "Monthly";
}

function validateDonationForm(form: DonationFormState): DonationErrors {
  const errors: DonationErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobilePattern = /^[6-9]\d{9}$/;
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.address.trim()) errors.address = "Address is required.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.state.trim()) errors.state = "Please select a state.";
  if (!form.country.trim()) errors.country = "Country is required.";
  if (!/^\d{6}$/.test(form.pinCode.trim())) errors.pinCode = "Enter a valid 6-digit pin code.";
  if (!emailPattern.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!mobilePattern.test(form.mobile.trim())) errors.mobile = "Enter a valid 10-digit mobile number.";

  const amount = Number(form.amount);
  if (!Number.isFinite(amount) || amount <= 0) errors.amount = "Enter a valid donation amount.";

  if (form.panNumber.trim() && !panPattern.test(form.panNumber.trim().toUpperCase())) {
    errors.panNumber = "Enter a valid PAN number.";
  }

  if (!form.acceptedTerms) {
    errors.acceptedTerms = "Please accept the terms of donation.";
  }

  return errors;
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default memo(function DonatePage() {
  usePageMeta("Donation System", "Support Bhagwat Heritage seva and spiritual initiatives through a trusted donation experience.");

  const [form, setForm] = useState<DonationFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<DonationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const handleFieldChange =
    (field: keyof DonationFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;

      setForm((current) => ({
        ...current,
        [field]:
          field === "panNumber"
            ? String(value).toUpperCase()
            : field === "mobile" || field === "pinCode"
              ? String(value).replace(/\D/g, "")
              : value,
      }));

      setErrors((current) => ({ ...current, [field]: undefined }));
      setStatusMessage(null);
    };

  const handleQuickAmount = (amount: number) => {
    setForm((current) => ({ ...current, amount: String(amount) }));
    setErrors((current) => ({ ...current, amount: undefined }));
    setStatusMessage(null);
  };

  const openFallbackLink = () => {
    window.open(EXTERNAL_RAZORPAY_DONATE_URL, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDonationForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusMessage({ type: "error", text: "Please correct the highlighted fields before continuing." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ type: "info", text: "Preparing your secure donation checkout..." });

    const payload: DonationPayload = {
      name: form.fullName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      donationType: mapDonationType(form.donationFor),
      donationMode: mapDonationMode(form.donationFrequency),
      amount: Number(form.amount),
      occasion: form.donationFor,
      message: [
        form.note.trim() ? `Sankalp: ${form.note.trim()}` : "",
        `Address: ${form.address.trim()}`,
        `City: ${form.city.trim()}`,
        `State: ${form.state.trim()}`,
        `Country: ${form.country.trim()}`,
        `Pin Code: ${form.pinCode.trim()}`,
        form.panNumber.trim() ? `PAN: ${form.panNumber.trim()}` : "",
        form.donationFrequency === "Yearly" ? "Frequency Preference: Yearly" : "",
      ]
        .filter(Boolean)
        .join(" | "),
      sponsorLabel: form.donationFor,
      campaignTitle: `Bhagwat Heritage - ${form.donationFor}`,
    };

    try {
      const razorpayReady = await loadRazorpayScript();
      const envKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayReady || !window.Razorpay) {
        setStatusMessage({
          type: "info",
          text: "Secure hosted payment will open in a new tab because direct checkout is not configured here yet.",
        });
        openFallbackLink();
        setIsSubmitting(false);
        return;
      }

      if (form.donationFrequency === "Yearly") {
        setStatusMessage({
          type: "info",
          text: "Yearly donations are being routed through the secure hosted donation link for now.",
        });
        openFallbackLink();
        setIsSubmitting(false);
        return;
      }

      if (form.donationFrequency === "One Time") {
        const orderResponse = await donationCheckoutApi.createOrder(payload);
        const order = orderResponse.data;
        const keyId = order.keyId ?? envKeyId;

        if (!keyId) {
          setStatusMessage({
            type: "info",
            text: "Direct checkout key is not configured yet, so the hosted donation link is opening instead.",
          });
          openFallbackLink();
          setIsSubmitting(false);
          return;
        }

        const razorpay = new window.Razorpay({
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Bhagwat Heritage",
          description: `${form.donationFor} Donation`,
          order_id: order.orderId,
          prefill: {
            name: form.fullName.trim(),
            email: form.email.trim(),
            contact: form.mobile.trim(),
          },
          notes: {
            donationFor: form.donationFor,
            donationFrequency: form.donationFrequency,
          },
          theme: {
            color: "#C46D1A",
          },
          modal: {
            ondismiss: () => {
              setStatusMessage({ type: "info", text: "Donation checkout was closed before completion." });
              setIsSubmitting(false);
            },
          },
          handler: async (response) => {
            const verifyPayload: DonationVerifyPayload = {
              flow: "order",
              donation: payload,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await donationCheckoutApi.verify(verifyPayload);
            setStatusMessage({ type: "success", text: "Donation completed successfully. Your receipt details will follow shortly." });
            setForm(INITIAL_FORM);
            setErrors({});
            setIsSubmitting(false);
          },
        });

        razorpay.open();
        return;
      }

      const subscriptionResponse = await donationCheckoutApi.createSubscription(payload);
      const subscription = subscriptionResponse.data;
      const keyId = subscription.keyId ?? envKeyId;

      if (!keyId) {
        setStatusMessage({
          type: "info",
          text: "Recurring checkout key is not configured yet, so the hosted donation link is opening instead.",
        });
        openFallbackLink();
        setIsSubmitting(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        subscription_id: subscription.subscriptionId,
        name: "Bhagwat Heritage",
        description: `${form.donationFor} Monthly Donation`,
        prefill: {
          name: form.fullName.trim(),
          email: form.email.trim(),
          contact: form.mobile.trim(),
        },
        notes: {
          donationFor: form.donationFor,
          donationFrequency: form.donationFrequency,
        },
        theme: {
          color: "#C46D1A",
        },
        modal: {
          ondismiss: () => {
            setStatusMessage({ type: "info", text: "Recurring donation setup was closed before completion." });
            setIsSubmitting(false);
          },
        },
        handler: async (response) => {
          const verifyPayload: DonationVerifyPayload = {
            flow: "subscription",
            donation: payload,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_subscription_id: response.razorpay_subscription_id,
          };

          await donationCheckoutApi.verify(verifyPayload);
          setStatusMessage({ type: "success", text: "Recurring donation setup completed successfully." });
          setForm(INITIAL_FORM);
          setErrors({});
          setIsSubmitting(false);
        },
      });

      razorpay.open();
    } catch {
      setStatusMessage({
        type: "error",
        text: "We could not start the donation checkout right now. You can continue through the secure hosted payment link below.",
      });
      openFallbackLink();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <section className="pt-6 pb-8 text-center">
        <h1 className="text-4xl font-black tracking-tight text-tealDeep md:text-5xl">Donate to Bhagwat Heritage</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-brownSoft md:text-lg">
          Support spiritual, cultural, and service initiatives with devotion.
        </p>
      </section>

      <form onSubmit={handleSubmit} className={panelClass} noValidate>
        <div className="space-y-6">
          <section className={sectionClass}>
            <h2 className="text-2xl font-bold text-tealDeep">Contact Information</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className={fieldLabelClass}>Full Name</span>
                <input value={form.fullName} onChange={handleFieldChange("fullName")} className={inputClass} />
                {errors.fullName ? <p className={errorClass}>{errors.fullName}</p> : null}
              </label>

              <label className="block md:col-span-2">
                <span className={fieldLabelClass}>Address</span>
                <textarea value={form.address} onChange={handleFieldChange("address")} rows={3} className={inputClass} />
                {errors.address ? <p className={errorClass}>{errors.address}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>City</span>
                <input value={form.city} onChange={handleFieldChange("city")} className={inputClass} />
                {errors.city ? <p className={errorClass}>{errors.city}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>State</span>
                <select value={form.state} onChange={handleFieldChange("state")} className={inputClass}>
                  <option value="">Select State</option>
                  {STATE_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.state ? <p className={errorClass}>{errors.state}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Country</span>
                <select value={form.country} onChange={handleFieldChange("country")} className={inputClass}>
                  <option value="India">India</option>
                </select>
                {errors.country ? <p className={errorClass}>{errors.country}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Pin Code</span>
                <input value={form.pinCode} onChange={handleFieldChange("pinCode")} maxLength={6} className={inputClass} />
                {errors.pinCode ? <p className={errorClass}>{errors.pinCode}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Email</span>
                <input type="email" value={form.email} onChange={handleFieldChange("email")} className={inputClass} />
                {errors.email ? <p className={errorClass}>{errors.email}</p> : null}
              </label>

              <label className="block">
                <span className={fieldLabelClass}>Mobile Number</span>
                <input value={form.mobile} onChange={handleFieldChange("mobile")} maxLength={10} className={inputClass} />
                {errors.mobile ? <p className={errorClass}>{errors.mobile}</p> : null}
              </label>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-bold text-tealDeep">Donation Information</h2>
            <div className="mt-6 grid grid-cols-1 gap-5">
              <label className="block">
                <span className={fieldLabelClass}>Donation For</span>
                <select value={form.donationFor} onChange={handleFieldChange("donationFor")} className={inputClass}>
                  {DONATION_FOR_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend className={fieldLabelClass}>Donation Type</legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(["One Time", "Monthly", "Yearly"] as DonationFrequency[]).map((item) => (
                    <label
                      key={item}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        form.donationFrequency === item
                          ? "border-gold bg-sand text-tealDeep"
                          : "border-borderCard bg-white text-brownSoft"
                      }`}
                    >
                      <input
                        type="radio"
                        name="donationFrequency"
                        value={item}
                        checked={form.donationFrequency === item}
                        onChange={handleFieldChange("donationFrequency")}
                        className="h-4 w-4"
                        style={{ accentColor: "#C46D1A" }}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <span className={fieldLabelClass}>Quick Amounts</span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {QUICK_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        form.amount === String(amount)
                          ? "border-gold bg-gold text-textDark"
                          : "border-borderCard bg-white text-brownSoft hover:border-gold hover:bg-sand"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setForm((current) => ({ ...current, amount: "" }));
                      setErrors((current) => ({ ...current, amount: undefined }));
                      setStatusMessage(null);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      !QUICK_AMOUNTS.includes(Number(form.amount) as (typeof QUICK_AMOUNTS)[number]) && form.amount
                        ? "border-gold bg-gold text-textDark"
                        : "border-borderCard bg-white text-brownSoft hover:border-gold hover:bg-sand"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="block">
                  <span className={fieldLabelClass}>Amount (₹)</span>
                  <input value={form.amount} onChange={handleFieldChange("amount")} className={inputClass} />
                  {errors.amount ? <p className={errorClass}>{errors.amount}</p> : null}
                </label>

                <label className="block">
                  <span className={fieldLabelClass}>PAN Number</span>
                  <input value={form.panNumber} onChange={handleFieldChange("panNumber")} maxLength={10} className={inputClass} />
                  {errors.panNumber ? <p className={errorClass}>{errors.panNumber}</p> : null}
                </label>
              </div>

              <label className="block">
                <span className={fieldLabelClass}>Note / Sankalp Message</span>
                <textarea
                  value={form.note}
                  onChange={handleFieldChange("note")}
                  rows={4}
                  className={inputClass}
                  placeholder="Share your sankalp, dedication, or any seva note."
                />
              </label>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-bold text-tealDeep">Terms of Donation</h2>
            <ol className="mt-5 space-y-3 pl-5 text-sm leading-7 text-brownSoft">
              <li>Donations are made voluntarily for spiritual, charitable, and service activities.</li>
              <li>Please ensure contact and PAN details are correct for receipt generation.</li>
              <li>Donation once processed may not be reversible unless legally required.</li>
              <li>Receipt will be shared after successful payment.</li>
              <li>For assistance, contact the official support team of Bhagwat Heritage.</li>
            </ol>

            <label className="mt-6 flex items-start gap-3 rounded-xl border border-borderCard bg-white/80 p-4">
              <input
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={handleFieldChange("acceptedTerms")}
                className="mt-1 h-4 w-4"
                style={{ accentColor: "#C46D1A" }}
              />
              <span className="text-sm leading-6 text-brown">
                I confirm that the information provided is correct and I agree to the terms of donation.
              </span>
            </label>
            {errors.acceptedTerms ? <p className={errorClass}>{errors.acceptedTerms}</p> : null}
          </section>

          {statusMessage ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                statusMessage.type === "success"
                  ? "border-borderAqua bg-bgSoft text-tealDeep"
                  : statusMessage.type === "error"
                    ? "border-[#e8c4b7] bg-[#fff7f1] text-rust"
                    : "border-borderCard bg-white text-brown"
              }`}
            >
              {statusMessage.text}
            </div>
          ) : null}

          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-saffron px-8 py-3.5 text-base font-semibold text-white transition hover:bg-goldHover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Preparing Donation..." : "Proceed to Donate"}
            </button>

            <button
              type="button"
              onClick={openFallbackLink}
              className="inline-flex items-center justify-center rounded-xl border border-saffron px-8 py-3 text-sm font-semibold text-saffron transition hover:bg-sand"
            >
              Open Secure Payment Link
            </button>
          </div>
        </div>
      </form>

      <section className="mt-8 grid grid-cols-1 gap-4 pb-8 md:grid-cols-3">
        {TRUST_POINTS.map((item) => (
          <article
            key={item.title}
            className="rounded-[24px] border border-borderCard bg-bgSoft px-5 py-5 text-center shadow-[0_10px_24px_rgba(101,71,35,0.06)]"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sand text-lg font-bold text-saffron">
              {item.title[0]}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-brownSoft">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="pb-10 text-center">
        <p className="text-sm leading-7 text-brownSoft">
          Need guidance before donating? You can also <Link to={ROUTES.contact} className="font-semibold text-saffron hover:text-goldHover">contact the trust support team</Link>.
        </p>
      </section>
    </div>
  );
});
