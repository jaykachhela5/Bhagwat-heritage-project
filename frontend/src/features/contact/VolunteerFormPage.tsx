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
    <div>
      <PageSectionShell className="pt-8 md:pt-10">
        <FeatureHeroSlider slides={TOP_BANNER_SLIDES} />
      </PageSectionShell>

      <PageSectionShell className="pt-8">
        <StatStrip items={IMPACT_METRICS} />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#dbe8f4] bg-gradient-to-br from-[#f7fbff] via-white to-[#eef6ff] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black text-[#123753] mb-5">Volunteer Onboarding Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {ONBOARDING.map((item, index) => (
              <article key={item.title} className="rounded-xl border border-[#d8e5f3] bg-white p-4">
                <p className="text-xs font-bold text-[#2d5b83]">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-black text-[#123753]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#4f6272]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-[0_16px_35px_rgba(13,59,102,0.10)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#123753]">Advanced Volunteer Application</h2>
              <p className="text-sm text-[#5a6c79] mt-1">Fill details for better role matching.</p>
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
              placeholder="Full Name (min 3 chars)"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              required
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
              placeholder="Indian Mobile (10 digits)"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              required
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <select
              value={form.sevaArea}
              onChange={(e) => setForm((f) => ({ ...f, sevaArea: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-[#d5e2f0] p-3">
              <p className="text-sm font-semibold text-[#123753] mb-2">Availability</p>
              <div className="flex flex-wrap gap-2">
                {(["Weekdays", "Weekends", "Flexible"] as Availability[]).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, availability: slot }))}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      form.availability === slot ? "bg-[#0d3b66] text-white" : "bg-[#edf3fb] text-[#37516b]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#d5e2f0] p-3">
              <p className="text-sm font-semibold text-[#123753] mb-2">Hours Per Week</p>
              <input
                type="range"
                min={1}
                max={20}
                value={form.hoursPerWeek}
                onChange={(e) => setForm((f) => ({ ...f, hoursPerWeek: e.target.value }))}
                className="w-full"
              />
              <p className="text-xs text-[#5a6c79] mt-1">{form.hoursPerWeek} hours / week</p>
            </div>
          </div>

          <textarea
            placeholder="Why do you want to volunteer? (max 500 chars)"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={4}
            maxLength={500}
            className="w-full mt-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
          />

          {msg && (
            <p className={`mt-3 text-sm font-semibold ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {msg.text}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4">
            {loading ? "Submitting..." : "Submit Advanced Application"}
          </button>
        </form>
      </section>

      <PageSectionShell className="pb-12">
        <div className="max-w-4xl mx-auto">
          <FAQSection title="Volunteer FAQs" items={FAQS} />
        </div>
      </PageSectionShell>
    </div>
  );
});
