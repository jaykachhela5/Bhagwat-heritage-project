import { memo, useMemo, useState, type FormEvent } from "react";
import { volunteersApi } from "../../services/api/volunteers";
import { FeatureHeroSlider } from "../../components/sections/FeatureHeroSlider";
import { StatStrip } from "../../components/sections/StatStrip";
import { FAQSection } from "../../components/sections/FAQSection";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { usePageMeta } from "../../hooks/usePageMeta";

type Availability = "Weekdays" | "Weekends" | "Flexible";

const SEVA_AREAS = [
  "Education",
  "Healthcare",
  "Cultural Events",
  "IT Support",
  "Administration",
  "Fundraising",
  "Community Outreach",
];

const IMPACT_METRICS = [
  { label: "Active Volunteers", value: "320+" },
  { label: "Monthly Seva Hours", value: "1,500+" },
  { label: "Events Managed", value: "80+" },
  { label: "Families Reached", value: "1,200+" },
];

const ONBOARDING = [
  { title: "Register", detail: "Submit form with your seva interest, skills, and availability." },
  { title: "Screening", detail: "Coordinator reviews and maps you to suitable seva roles." },
  { title: "Orientation", detail: "Attend onboarding call/session for role and process briefing." },
  { title: "Start Seva", detail: "Begin assigned volunteer duties with team guidance." },
];

const FAQS = [
  {
    q: "Can I volunteer part-time?",
    a: "Yes, part-time and weekend volunteer tracks are available.",
  },
  {
    q: "Do I need prior experience?",
    a: "No, beginner volunteers receive orientation and guided assignments.",
  },
  {
    q: "When will I get a response?",
    a: "Usually within 24-72 hours after application review.",
  },
];

const TOP_BANNER_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80",
    title: "Welcome to Our Website",
    subtitle: "Volunteer with Bhagwat Heritage Service Foundation Trust",
  },
  {
    image: "https://static.vecteezy.com/system/resources/thumbnails/028/151/501/small_2x/plexus-motion-background-animation-animated-background-free-video.jpg",
    title: "Serve with Purpose",
    subtitle: "Join temple seva, social work, and community upliftment initiatives",
  },
  {
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
    title: "Faith, Culture, Humanity",
    subtitle: "Be part of disciplined seva teams and spiritual service programs",
  },
];

const THEME = {
  page: "min-h-screen bg-[#0B2230] pb-16",
  bannerWrap: "pt-8 md:pt-10",
  section: "max-w-6xl mx-auto px-4 pt-8",
  darkPanel: "rounded-[30px] border border-white/10 bg-[#0d6179] p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.20)]",
  darkCard: "rounded-[24px] border border-white/10 bg-[#0c5871] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
  label: "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  heading: "mt-2 text-[14px] font-black text-white md:text-[20px]",
  formNote: "text-sm leading-6 text-[#dce7ec]",
  formInput:
    "w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#17314a] outline-none transition placeholder:text-[#6b8091] focus:border-[#ef9a1e] focus:ring-2 focus:ring-[#efc06a]",
  filterChip: "rounded-full px-3 py-1.5 text-xs font-semibold transition",
  sliderWrap: "rounded-[24px] border border-white/10 bg-[#0c5871] p-4",
  sliderLabel: "mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  sliderValue: "mt-1 text-xs text-[#dce7ec]",
  progressLabel: "mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]",
  progressValue: "mt-1 text-xs text-[#dce7ec]",
  button:
    "mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#ef9a1e] px-6 py-4 text-base font-bold text-white shadow-[0_18px_34px_rgba(239,154,30,0.28)] transition hover:bg-[#de930a] disabled:cursor-not-allowed disabled:opacity-70",
} as const;

export default memo(function VolunteerFormPage() {
  usePageMeta("Volunteer Registration", "Join Bhagwat Heritage volunteer teams and serve with purpose.");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    sevaArea: "",
    skills: "",
    message: "",
    city: "",
    availability: "Flexible" as Availability,
    hoursPerWeek: "4",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const completion = useMemo(() => {
    const requiredValues = [form.fullName, form.email, form.phone, form.sevaArea];
    const filled = requiredValues.filter((v) => v.trim().length > 0).length;
    return Math.round((filled / requiredValues.length) * 100);
  }, [form.fullName, form.email, form.phone, form.sevaArea]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const composedMessage = [
        form.message,
        form.city ? `City: ${form.city}` : "",
        `Availability: ${form.availability}`,
        `Hours/Week: ${form.hoursPerWeek}`,
      ]
        .filter(Boolean)
        .join(" | ");

      await volunteersApi.create({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        sevaArea: form.sevaArea,
        skills: form.skills,
        message: composedMessage,
      });

      setMsg({ type: "success", text: "Application submitted! We will contact you soon." });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        sevaArea: "",
        skills: "",
        message: "",
        city: "",
        availability: "Flexible",
        hoursPerWeek: "4",
      });
    } catch {
      setMsg({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={THEME.page}>
      <PageSectionShell className={THEME.bannerWrap}>
        <FeatureHeroSlider slides={TOP_BANNER_SLIDES} variant="gauseva" />
      </PageSectionShell>

      <PageSectionShell className="pt-8">
        <StatStrip items={IMPACT_METRICS} variant="gauseva" />
      </PageSectionShell>

      <section className={THEME.section}>
        <div className={THEME.darkPanel}>
          <p className={THEME.label}>Volunteer Onboarding Journey</p>
          <h2 className={THEME.heading}>Register, Screen, Orient, and Start Seva</h2>
          <p className="mt-3 text-base leading-7 text-[#dce7ec] md:text-lg">
            Complete the steps below to begin guided volunteer onboarding with the trust team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {ONBOARDING.map((item, index) => (
              <article key={item.title} className={THEME.darkCard}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ef9a1e]">Step {index + 1}</p>
                <h3 className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#dce7ec]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className={THEME.darkPanel}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <p className={THEME.label}>Advanced Volunteer Application</p>
              <h2 className={THEME.heading}>Fill details for better role matching</h2>
              <p className={THEME.formNote}>Share your skills and availability so we can place you in the right seva track.</p>
            </div>
            <div className="min-w-[180px]">
              <p className={THEME.progressLabel}>Profile Completion</p>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-[#ef9a1e] transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className={THEME.progressValue}>{completion}% complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name (min 3 chars)"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="tel"
              placeholder="Indian Mobile (10 digits)"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              className={THEME.formInput}
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className={THEME.formInput}
            />
            <select
              value={form.sevaArea}
              onChange={(e) => setForm((f) => ({ ...f, sevaArea: e.target.value }))}
              required
              className={THEME.formInput}
            >
              <option value="">Select Seva Area</option>
              {SEVA_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Skills"
              value={form.skills}
              onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              className={THEME.formInput}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className={THEME.darkCard}>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Availability</p>
              <div className="flex flex-wrap gap-2">
                {(["Weekdays", "Weekends", "Flexible"] as Availability[]).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, availability: slot }))}
                    className={`${THEME.filterChip} ${
                      form.availability === slot
                        ? "bg-[#ef9a1e] text-white"
                        : "border border-white/10 bg-[#0d6179] text-[#dce7ec]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${THEME.darkCard} ${THEME.sliderWrap}`}>
              <p className={THEME.sliderLabel}>Hours Per Week</p>
              <input
                type="range"
                min={1}
                max={20}
                value={form.hoursPerWeek}
                onChange={(e) => setForm((f) => ({ ...f, hoursPerWeek: e.target.value }))}
                className="w-full"
              />
              <p className={THEME.sliderValue}>{form.hoursPerWeek} hours / week</p>
            </div>
          </div>

          <textarea
            placeholder="Why do you want to volunteer? (max 500 chars)"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
            maxLength={500}
            className={`${THEME.formInput} mt-4 w-full resize-none`}
          />

          {msg && (
            <p className={`mt-3 text-sm font-semibold ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
              {msg.text}
            </p>
          )}

          <button type="submit" disabled={loading} className={THEME.button}>
            {loading ? "Submitting..." : "Submit Advanced Application"}
          </button>
        </form>
      </section>

      <PageSectionShell className="pb-12">
        <div className="max-w-4xl mx-auto">
          <FAQSection title="Volunteer FAQs" items={FAQS} variant="gauseva" />
        </div>
      </PageSectionShell>
    </div>
  );
});

