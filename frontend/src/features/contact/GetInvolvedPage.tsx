import { memo, useMemo, useState, type FormEvent } from "react";
import { involvedApi } from "../../services/api/misc";
import { FeatureHeroSlider } from "../../components/sections/FeatureHeroSlider";
import { InfoCardGrid } from "../../components/sections/InfoCardGrid";
import { StatStrip } from "../../components/sections/StatStrip";
import { FAQSection } from "../../components/sections/FAQSection";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { usePageMeta } from "../../hooks/usePageMeta";

type ContributionMode = "Volunteer" | "Donate" | "Both";
type JoinTimeline = "Immediately" | "Within 1 Month" | "Within 3 Months";

const INTERESTS = [
  "Volunteer Work",
  "Donation",
  "Jal Seva",
  "Ann Seva",
  "Both",
  "Cultural Events",
  "Spiritual Programs",
  "Education Support",
  "Healthcare Support",
];

const JAL_JOIN_HIGHLIGHTS = [
  {
    title: "Quick Contact",
    text: "Share your phone and email so the trust team can coordinate Jal Seva support without delay.",
  },
  {
    title: "City & Role",
    text: "Mention your location and whether you want to volunteer, organise, or lead relief support locally.",
  },
  {
    title: "Skills & Availability",
    text: "Add your preferred days and useful support details like field coordination, distribution, or logistics.",
  },
];

const ANN_JOIN_HIGHLIGHTS = [
  {
    title: "Quick Contact",
    text: "Share your phone and email so the trust team can coordinate Ann Seva support without delay.",
  },
  {
    title: "City & Role",
    text: "Mention your location and whether you want to volunteer, organise, or lead meal seva locally.",
  },
  {
    title: "Skills & Availability",
    text: "Add your preferred days and useful support details like distribution, packing, or local coordination.",
  },
];

const IMPACT_METRICS = [
  { label: "Active Volunteers", value: "320+" },
  { label: "Monthly Seva Hours", value: "1,500+" },
  { label: "Families Supported", value: "1,200+" },
  { label: "Annual Programs", value: "80+" },
];

const CONTRIBUTION_TRACKS = [
  {
    title: "Temple Seva",
    desc: "Darshan support, event management, crowd guidance, and daily assistance.",
  },
  {
    title: "Social Outreach",
    desc: "Food seva, healthcare camps, education drives, and relief support.",
  },
  {
    title: "Cultural & Spiritual",
    desc: "Katha organization, satsang coordination, and devotional program support.",
  },
];

const ONBOARDING_STEPS = [
  { title: "Apply", detail: "Submit your interest form with your availability and skills." },
  { title: "Verify", detail: "Our seva coordinator verifies details and preferred contribution mode." },
  { title: "Assign", detail: "You receive the best-fit seva role based on your profile and timeline." },
  { title: "Serve", detail: "Begin seva with orientation, team lead support, and monthly review." },
];

const SEVA_OPPORTUNITIES = [
  { title: "Festival Operations", detail: "Stage setup, queue support, prasad management, volunteer coordination." },
  { title: "Education Seva", detail: "Bal sanskar mentoring, tuition support, values workshops." },
  { title: "Healthcare & Camps", detail: "Medical camp desk help, registration, logistics and outreach." },
  { title: "Digital Seva", detail: "Photo/video documentation, social media, poster design." },
  { title: "Community Support", detail: "Food distribution, relief kits, and social outreach drives." },
  { title: "Temple Administration", detail: "Visitor desk, event records, trust documentation assistance." },
];

const VOLUNTEER_BENEFITS = [
  "Official Seva Participation Certificate",
  "Leadership and Coordination Opportunities",
  "Monthly Satsang Team Circle",
  "Skill-based Role Assignment",
  "Mentorship by Senior Coordinators",
  "Priority Seva Participation in Major Events",
];

const FAQS = [
  {
    q: "Can I join without prior volunteering experience?",
    a: "Yes. Beginners are onboarded through basic orientation and assigned guided roles first.",
  },
  {
    q: "Is donation mandatory for volunteer registration?",
    a: "No. Donation is optional. You can join purely as a volunteer.",
  },
  {
    q: "How soon will I get a response after applying?",
    a: "Usually within 24-72 hours, depending on ongoing temple schedules and events.",
  },
  {
    q: "Can students or working professionals join part-time?",
    a: "Yes. Part-time and weekend seva roles are available for both students and professionals.",
  },
];

const TOP_BANNER_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=1600&q=80",
    title: "Bhagwat Heritage Seva Network",
    subtitle: "Volunteer, donate, and create lasting social impact with spiritual values.",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772867442/faith_m7pkmr.png",
    title: "Faith in Action",
    subtitle: "Support temple activities, satsang events, and cultural outreach programs.",
  },
  {
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
    title: "Serve with Purpose",
    subtitle: "Join trusted seva teams for education, healthcare, and community welfare.",
  },
];

const WHAT_WE_DO = [
  { title: "Our Mission", desc: "Promoting spirituality, culture, and seva through organized volunteer efforts." },
  { title: "Upcoming Events", desc: "Support major katha, utsav, and social service programs with on-ground coordination." },
  { title: "Temple Activities", desc: "Contribute to puja support, prasad distribution, and daily darshan operations." },
];

const THEME = {
  page: "min-h-screen bg-[var(--campaign-deep)] pb-16",
  section: "max-w-6xl mx-auto px-4 pt-8",
  banner: "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-5 md:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.20)]",
  bannerText: "text-[16px] leading-7 text-[var(--campaign-text)] md:text-[18px]",
  label: "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]",
  heading: "mt-2 text-[14px] font-black text-white md:text-[20px]",
  subheading: "mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg",
  trackCard: "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
  trackTitle: "text-[14px] font-black text-white md:text-[20px]",
  trackText: "mt-2 text-sm leading-6 text-[var(--campaign-text)]",
  darkPanel: "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.20)]",
  darkCard: "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
  goldCard: "rounded-[24px] border border-[var(--campaign-accent)]/30 bg-[#123e55] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
  formNote: "text-sm leading-6 text-[var(--campaign-text)]",
  formInput:
    "rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#17314a] outline-none transition placeholder:text-[#6b8091] focus:border-[var(--campaign-accent)] focus:ring-2 focus:ring-[#efc06a]",
  filterChip: "rounded-full px-3 py-1.5 text-xs font-semibold transition",
  mutedText: "text-sm text-[var(--campaign-text)]",
  faqIntro: "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]",
} as const;

export default memo(function GetInvolvedPage() {
  usePageMeta("Get Involved", "Volunteer, donate, and support trust seva initiatives.");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    interest: "",
    message: "",
    availability: "",
    skills: "",
    contributionMode: "Volunteer" as ContributionMode,
    timeline: "Immediately" as JoinTimeline,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const completion = useMemo(() => {
    const requiredValues = [form.name, form.email, form.interest];
    const filled = requiredValues.filter((item) => item.trim().length > 0).length;
    return Math.round((filled / requiredValues.length) * 100);
  }, [form.name, form.email, form.interest]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const composedMessage = [
        form.message,
        form.availability ? `Availability: ${form.availability}` : "",
        form.skills ? `Skills: ${form.skills}` : "",
        `Contribution Mode: ${form.contributionMode}`,
        `Join Timeline: ${form.timeline}`,
      ]
        .filter(Boolean)
        .join(" | ");

      await involvedApi.join({
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        age: form.age ? Number(form.age) : undefined,
        interest: form.interest,
        message: composedMessage,
      });

      setMsg({
        type: "success",
        text: "Application submitted successfully! Our team will contact you shortly.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        age: "",
        interest: "",
        message: "",
        availability: "",
        skills: "",
        contributionMode: "Volunteer",
        timeline: "Immediately",
      });
    } catch {
      setMsg({
        type: "error",
        text: "Submission failed. Please check details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={THEME.page}>
      <PageSectionShell className="pt-6">
        <FeatureHeroSlider slides={TOP_BANNER_SLIDES} variant="gauseva" />
      </PageSectionShell>

      <PageSectionShell className="pt-8">
        <InfoCardGrid
          title="What We Do"
          variant="gauseva"
          items={WHAT_WE_DO.map((item) => ({ ...item, iconClass: "fas fa-hands-helping" }))}
        />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className={THEME.banner}>
          <p className={`${THEME.bannerText} text-center`}>
            Join hands with Bhagwat Heritage Service Foundation Trust to support temple seva, community outreach, and devotional programs with disciplined teamwork and transparent impact.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTRIBUTION_TRACKS.map((item) => (
            <article key={item.title} className={THEME.trackCard}>
              <h3 className={THEME.trackTitle}>{item.title}</h3>
              <p className={THEME.trackText}>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={THEME.darkPanel}>
          <p className={THEME.label}>How It Works</p>
          <h2 className={THEME.heading}>Simple seva onboarding</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {ONBOARDING_STEPS.map((item, index) => (
              <article key={item.title} className={THEME.darkCard}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Step {index + 1}</p>
                <h3 className={THEME.heading}>{item.title}</h3>
                <p className={THEME.trackText}>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className={THEME.darkPanel}>
            <p className={THEME.label}>Seva Opportunities</p>
            <div className="space-y-3">
              {SEVA_OPPORTUNITIES.map((item) => (
                <div key={item.title} className={THEME.darkCard}>
                  <h3 className={THEME.heading}>{item.title}</h3>
                  <p className={THEME.trackText}>{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className={THEME.darkPanel}>
            <p className={THEME.label}>Why Join Bhagwat Heritage?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VOLUNTEER_BENEFITS.map((benefit) => (
                <div key={benefit} className={THEME.darkCard}>
                  <p className={THEME.trackText}>{benefit}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-[#123e55] p-3">
              <p className={THEME.trackText}>
                <span className="font-bold">Trust Commitment:</span> Every volunteer is assigned with transparency, dignity, and meaningful contribution paths.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={THEME.darkPanel}>
          <div className="max-w-3xl">
            <p className={THEME.label}>Volunteer & Organizer Join</p>
            <h2 className={THEME.heading}>Start Jal Seva in Your City</h2>
            <p className={THEME.subheading}>
              If you want to begin water seva in your city or support relief coordination, the trust team can connect with you through this form.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <p className={THEME.label}>Important Details</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {JAL_JOIN_HIGHLIGHTS.map((item) => (
                <article key={item.title} className={THEME.darkCard}>
                  <p className={THEME.heading}>{item.title}</p>
                  <p className={THEME.trackText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={THEME.darkPanel}>
          <div className="max-w-3xl">
            <p className={THEME.label}>Volunteer & Organizer Join</p>
            <h2 className={THEME.heading}>Start Ann Seva in Your City</h2>
            <p className={THEME.subheading}>
              If you want to organise meal support in your city or help with food distribution, this form connects you with the trust team.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <p className={THEME.label}>Important Details</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {ANN_JOIN_HIGHLIGHTS.map((item) => (
                <article key={item.title} className={THEME.darkCard}>
                  <p className={THEME.heading}>{item.title}</p>
                  <p className={THEME.trackText}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className={THEME.darkPanel}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <p className={THEME.label}>Volunteer & Organizer Join</p>
              <h2 className={THEME.heading}>Join Seva with the Trust</h2>
              <p className={THEME.formNote}>Use this form to begin Ann Seva or Jal Seva in your city, or support trust coordination.</p>
            </div>
            <div className="min-w-[180px]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Profile Completion</p>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-[var(--campaign-accent)] transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-1 text-xs text-[var(--campaign-text)]">{completion}% complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="email"
              placeholder="Email for follow-up"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="text"
              placeholder="City or service location"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              required
              className={THEME.formInput}
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              className={THEME.formInput}
            />
            <select
              value={form.interest}
              onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
              required
              className={THEME.formInput}
            >
              <option value="">Select the seva area you want to support</option>
              {INTERESTS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Weekdays / Weekends / Flexible"
              value={form.availability}
              onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
              className={THEME.formInput}
            />
            <input
              type="text"
              placeholder="Meal packing, distribution, kitchen help, water support, logistics, local coordination"
              value={form.skills}
              onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              className={THEME.formInput}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className={THEME.darkCard}>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Contribution Mode</p>
              <div className="flex gap-2 flex-wrap">
                {(["Volunteer", "Donate", "Both"] as ContributionMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, contributionMode: mode }))}
                    className={`${THEME.filterChip} ${
                      form.contributionMode === mode
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-bg)] text-[var(--campaign-text)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className={THEME.darkCard}>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Join Timeline</p>
              <div className="flex gap-2 flex-wrap">
                {(["Immediately", "Within 1 Month", "Within 3 Months"] as JoinTimeline[]).map((timeline) => (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, timeline }))}
                    className={`${THEME.filterChip} ${
                      form.timeline === timeline
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-bg)] text-[var(--campaign-text)]"
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea
            placeholder="Share your city plans, preferred dates, group strength, or coordination notes"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
            className={`${THEME.formInput} mt-4 w-full resize-none`}
          />

          <p className="mt-4 text-sm leading-6 text-[var(--campaign-text)]">
            A valid phone number and clear location help the trust team connect with you faster for seva planning.
          </p>

          {msg && (
            <p className={`mt-3 text-sm font-semibold ${msg.type === "success" ? "text-green-300" : "text-red-300"}`}>
              {msg.text}
            </p>
          )}

          <button type="submit" disabled={loading} className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--campaign-accent)] px-6 py-4 text-base font-bold text-white shadow-[0_18px_34px_rgba(239,154,30,0.28)] transition hover:bg-[var(--campaign-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Submitting..." : "Join Seva"}
          </button>
        </form>
      </section>

      <PageSectionShell className="pb-12">
        <div className="max-w-4xl mx-auto">
          <FAQSection title="Frequently Asked Questions" items={FAQS} variant="gauseva" />
        </div>
      </PageSectionShell>
    </div>
  );
});

