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
  "Cultural Events",
  "Spiritual Programs",
  "Education Support",
  "Healthcare Support",
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
    <div>
      <PageSectionShell className="pt-6">
        <FeatureHeroSlider slides={TOP_BANNER_SLIDES} />
      </PageSectionShell>

      <PageSectionShell className="pt-8">
        <InfoCardGrid title="What We Do" items={WHAT_WE_DO.map((item) => ({ ...item, iconClass: "fas fa-hands-helping" }))} />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="rounded-3xl border border-[#f1c899] bg-gradient-to-r from-[#fff7eb] via-[#fff2e3] to-[#ffe8cf] p-5 md:p-6 shadow-[0_12px_26px_rgba(177,96,23,0.14)]">
          <p className="text-sm md:text-base font-medium text-[#7a4f1f] text-center">
            Join hands with Bhagwat Heritage Service Foundation Trust to support temple seva, community outreach, and devotional programs with disciplined teamwork and transparent impact.
          </p>
        </div>
      </section>

      <PageSectionShell className="pt-8">
        <StatStrip items={IMPACT_METRICS} />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTRIBUTION_TRACKS.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-black text-[#123753]">{item.title}</h3>
              <p className="mt-2 text-[#4f6272] text-sm">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#dbe8f4] bg-gradient-to-br from-[#f7fbff] via-white to-[#eef6ff] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-[#123753] mb-5">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {ONBOARDING_STEPS.map((item, index) => (
              <article key={item.title} className="rounded-xl border border-[#d8e5f3] bg-white p-4">
                <p className="text-xs font-bold text-[#2d5b83]">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-black text-[#123753]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#4f6272]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className="rounded-3xl border border-[#dce8f4] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#123753] mb-4">Seva Opportunities</h2>
            <div className="space-y-3">
              {SEVA_OPPORTUNITIES.map((item) => (
                <div key={item.title} className="rounded-xl border border-[#e4edf7] bg-[#fbfdff] p-3">
                  <h3 className="font-bold text-[#17486f]">{item.title}</h3>
                  <p className="text-sm text-[#4f6272] mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-[#f1d8b9] bg-gradient-to-b from-[#fff9ef] to-[#fff3e3] p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#7a4f1f] mb-4">Why Join Bhagwat Heritage?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VOLUNTEER_BENEFITS.map((benefit) => (
                <div key={benefit} className="rounded-lg border border-[#efd8b9] bg-white px-3 py-2 text-sm text-[#6f4d2d]">
                  {benefit}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[#efc99a] bg-[#fff1de] p-3">
              <p className="text-sm text-[#8a4c16]">
                <span className="font-bold">Trust Commitment:</span> Every volunteer is assigned with transparency, dignity, and meaningful contribution paths.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-10 max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-[0_16px_35px_rgba(13,59,102,0.10)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#123753]">Advanced Volunteer Application</h2>
              <p className="text-sm text-[#5a6c79] mt-1">Share your interests and availability to get the right seva role.</p>
            </div>
            <div className="min-w-[180px]">
              <p className="text-xs uppercase tracking-wide text-[#46627f] font-semibold mb-1">Profile Completion</p>
              <div className="h-2 rounded-full bg-[#e6eef8] overflow-hidden">
                <div className="h-full bg-[#c47508] transition-all" style={{ width: `${completion}%` }} />
              </div>
              <p className="text-xs text-[#5a6c79] mt-1">{completion}% complete</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <select
              value={form.interest}
              onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
              required
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            >
              <option value="">Primary Area of Interest</option>
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
              placeholder="Availability (e.g., Weekends / Daily 2 hours)"
              value={form.availability}
              onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="text"
              placeholder="Skills (e.g., Event Management, Teaching, Medical)"
              value={form.skills}
              onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
              className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-[#d5e2f0] p-3">
              <p className="text-sm font-semibold text-[#123753] mb-2">Contribution Mode</p>
              <div className="flex gap-2 flex-wrap">
                {(["Volunteer", "Donate", "Both"] as ContributionMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, contributionMode: mode }))}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      form.contributionMode === mode ? "bg-[#0d3b66] text-white" : "bg-[#edf3fb] text-[#37516b]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#d5e2f0] p-3">
              <p className="text-sm font-semibold text-[#123753] mb-2">Join Timeline</p>
              <div className="flex gap-2 flex-wrap">
                {(["Immediately", "Within 1 Month", "Within 3 Months"] as JoinTimeline[]).map((timeline) => (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, timeline }))}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      form.timeline === timeline ? "bg-[#c47508] text-white" : "bg-[#fff3e0] text-[#8a5b23]"
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
            className="w-full mt-4 px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
          />

          {msg && (
            <p className={`mt-3 text-sm font-semibold ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {msg.text}
            </p>
          )}

          <button type="submit" disabled={loading} className="mt-4 btn-primary w-full py-3">
            {loading ? "Submitting..." : "Submit Advanced Application"}
          </button>
        </form>
      </section>

      <PageSectionShell className="pb-12">
        <div className="max-w-4xl mx-auto">
          <FAQSection title="Frequently Asked Questions" items={FAQS} />
        </div>
      </PageSectionShell>
    </div>
  );
});
