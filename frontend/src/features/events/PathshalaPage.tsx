import { memo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { pathshalaApi } from "../../services/api/misc";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

const COURSES = [
  "Bhagwat Katha",
  "Vedic Studies",
  "Sanskrit",
  "Yoga and Meditation",
  "Classical Music",
  "Classical Dance",
  "Dharmic Leadership",
  "Digital Pathshala Foundation",
];

const LEARNING_MODELS = [
  {
    title: "Residential Gurukul",
    desc: "Immersive campus model with discipline, seva routine, and dedicated mentor support.",
    tag: "Full-time",
  },
  {
    title: "Weekend Family Pathshala",
    desc: "Parent-child batch combining values, chanting, scriptural storytelling, and applied culture.",
    tag: "Hybrid",
  },
  {
    title: "Live Online Pathshala",
    desc: "Interactive online sessions with revision resources, evaluation, and periodic mentor calls.",
    tag: "Online",
  },
  {
    title: "Youth Leadership Fellowship",
    desc: "Advanced track for expression, dharmic communication, and social initiative leadership.",
    tag: "Advanced",
  },
];

const CORE_FEATURES = [
  "Structured multi-level curriculum",
  "Sanskrit chanting and shloka training",
  "Mentor-led weekly progress reviews",
  "Character and value-building modules",
  "Seva projects and social impact labs",
  "Performance tracking and certification",
];

const PROGRAM_TOOLS = [
  { title: "Live Doubt Room", desc: "Weekly interactive sessions with Acharyas and faculty mentors." },
  { title: "Digital Notes Vault", desc: "Topic-wise notes, chants, and revision sheets with quick access." },
  { title: "Parent Dashboard", desc: "Attendance, progress snapshots, and behavioral growth feedback." },
  { title: "Seva Practicum", desc: "Action-based assignments connected to real community service." },
];

const TRACKS = [
  { name: "Bal Sanskar Track", age: "Age 7-12", focus: "Values, chanting, stories, and discipline habits." },
  { name: "Yuva Shakti Track", age: "Age 13-21", focus: "Leadership, communication, seva project execution." },
  { name: "Sanskriti Scholar Track", age: "Age 21+", focus: "Scriptural depth, philosophy, and teaching practice." },
];

const LEARNING_PATH = [
  { phase: "Phase 01", title: "Foundation", desc: "Bhakti basics, dharmic values, pronunciation, and discipline." },
  { phase: "Phase 02", title: "Scriptural Depth", desc: "Bhagwat themes, katha understanding, and guided interpretation." },
  { phase: "Phase 03", title: "Expression", desc: "Public speaking, recitation, devotional music, and cultural presentation." },
  { phase: "Phase 04", title: "Leadership", desc: "Community seva planning, team facilitation, and dharmic leadership practice." },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", focus: "Scripture Reading + Chanting" },
  { day: "Wednesday", focus: "Sanskrit, Language, and Recitation" },
  { day: "Friday", focus: "Yoga, Meditation, and Reflection" },
  { day: "Sunday", focus: "Seva Lab + Mentor Review" },
];

const OUTCOME_MATRIX = [
  { title: "Spiritual Confidence", desc: "Regular chanting and scripture study builds inner stability." },
  { title: "Cultural Intelligence", desc: "Students understand traditions with context and practical relevance." },
  { title: "Leadership Readiness", desc: "Learners gain communication and team responsibility skills." },
  { title: "Service Orientation", desc: "Seva modules train compassion with execution discipline." },
];

const TESTIMONIALS = [
  {
    quote: "My daughter became more confident and disciplined within three months.",
    by: "Parent, Ahmedabad",
  },
  {
    quote: "The blend of scripture and practical seva made learning meaningful for me.",
    by: "Student, Indore",
  },
  {
    quote: "Mentor support and clear structure are the strongest points of this Pathshala.",
    by: "Guardian, Mumbai",
  },
];

const FAQS = [
  { q: "Who can apply?", a: "Children, youth, and adults can join based on the selected model and level." },
  { q: "Are online classes recorded?", a: "Yes, recordings and notes are shared for enrolled students." },
  { q: "Is certification provided?", a: "Yes, level completion certificates are issued after evaluation." },
  { q: "Can parents participate?", a: "Yes, family modules and parent orientation sessions are included." },
];

const PATHSHALA_HERO_SUBTITLE_CLASS = "text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]";
const HERO_CONTENT_CLASS = "flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]";
const HERO_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]";
const HERO_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]";
const sectionPanelClass = "rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const cardClass =
  "rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";
const sectionTitleClass = SEVA_SECTION_LABEL_CLASS;
const surfaceSectionClass = sectionPanelClass;
const darkSectionClass = sectionPanelClass;
const lightCardClass = cardClass;
const surfaceMetaClass = "text-sm font-black uppercase tracking-[0.12em] text-[#ef9a1e]";
const surfaceCardTitleClass = SEVA_CARD_TITLE_CLASS;
const surfaceCardBodyClass = `mt-3 ${SEVA_BODY_TEXT_CLASS}`;
const darkMetaClass = "text-sm font-black uppercase tracking-[0.12em] text-[#ef9a1e]";
const darkCardTitleClass = `mt-2 ${SEVA_CARD_TITLE_CLASS}`;
const darkCardBodyClass = `mt-3 ${SEVA_BODY_TEXT_CLASS}`;
const formFieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0b2230] px-4 py-3 text-base text-white placeholder:text-[#dce7ec]/70 focus:outline-none focus:ring-2 focus:ring-[#ef9a1e]/40";

export default memo(function PathshalaPage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    parentName: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setMsgType("");

    try {
      await pathshalaApi.submit({ ...form, age: form.age ? Number(form.age) : undefined });
      setMsg("Admission submitted successfully. Our team will contact you shortly.");
      setMsgType("success");
      setForm({
        name: "",
        age: "",
        parentName: "",
        phone: "",
        email: "",
        course: "",
        message: "",
      });
    } catch {
      setMsg("Unable to submit right now. Please try again in a moment.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#0B2230] pb-16">
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#2d7ed4]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[520px] -right-24 h-80 w-80 rounded-full bg-[#18b293]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#ffb347]/16 blur-3xl" />

      <HeroSection
        title="E-Pathshala"
        subtitle="Digital Pathshala Foundation for spiritual, cultural, and value-based learning"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772914626/pathshala_yqh2vq.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        contentClassName="flex h-full flex-col justify-end !pb-8 !pt-0 md:!pb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#admission-form"
            className="inline-flex items-center rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Apply for Admission
          </a>
          <Link
            to={ROUTES.knowledge.studyResources}
            className="inline-flex items-center rounded-lg bg-[#12394A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Explore Study Resources
          </Link>
        </div>
      </HeroSection>

      <section id="models" className="max-w-6xl mx-auto px-4 pb-10 pt-[20px]">
        <div className={surfaceSectionClass}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {LEARNING_MODELS.map((model) => (
              <article
                key={model.title}
                className="rounded-[24px] border border-white/10 bg-[#0f3140] p-6 shadow-sm"
              >
                <p className="mb-3 inline-block rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
                  {model.tag}
                </p>
                <h3 className={surfaceCardTitleClass}>{model.title}</h3>
                <p className={surfaceCardBodyClass}>{model.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Program Tracks</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TRACKS.map((track) => (
              <article key={track.name} className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-lg">
                <p className={darkMetaClass}>{track.age}</p>
                <h3 className={darkCardTitleClass}>{track.name}</h3>
                <p className={darkCardBodyClass}>{track.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
            {CORE_FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0f3140] p-4">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <p className="text-sm font-semibold leading-7 text-[#dce7ec]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Advanced Learning Tools</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PROGRAM_TOOLS.map((tool) => (
              <article
                key={tool.title}
                className={lightCardClass}
              >
                <h3 className={surfaceCardTitleClass}>{tool.title}</h3>
                <p className={surfaceCardBodyClass}>{tool.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={darkSectionClass}>
          <h2 className={sectionTitleClass}>Weekly Learning Rhythm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WEEKLY_SCHEDULE.map((item) => (
              <div key={item.day} className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className={darkMetaClass}>{item.day}</p>
                <p className="mt-2 text-xl font-black text-white">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Learning Pathway</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {LEARNING_PATH.map((step) => (
              <article key={step.phase} className={lightCardClass}>
                <p className={surfaceMetaClass}>{step.phase}</p>
                <h3 className="mt-2 text-xl font-black text-white">{step.title}</h3>
                <p className={surfaceCardBodyClass}>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Outcome Matrix</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {OUTCOME_MATRIX.map((item) => (
              <article key={item.title} className={lightCardClass}>
                <h3 className={surfaceCardTitleClass}>{item.title}</h3>
                <p className={surfaceCardBodyClass}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>What Families Say</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <article key={item.by} className={lightCardClass}>
                <p className="text-sm leading-7 text-[#dce7ec]">"{item.quote}"</p>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[#F59E0B]">{item.by}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className={surfaceSectionClass}>
          <h2 className={sectionTitleClass}>Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FAQS.map((item) => (
              <article key={item.q} className={lightCardClass}>
                <h3 className={surfaceCardTitleClass}>{item.q}</h3>
                <p className={surfaceCardBodyClass}>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="admission-form" className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
          <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-7 text-white shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <h2 className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Admissions Open</h2>
            <p className="mt-3 text-base leading-7 text-white/90 md:text-lg">
              Build strong values and confident leadership through guided spiritual and cultural learning.
              Select your preferred course and our admissions team will help with onboarding.
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-white/90">
              <p className="rounded-xl bg-white/10 px-4 py-3">. Flexible online and offline batches</p>
              <p className="rounded-xl bg-white/10 px-4 py-3">. Mentor support and assessment tracking</p>
              <p className="rounded-xl bg-white/10 px-4 py-3">. Activity-based experiential learning</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-7"
          >
            <h3 className="mb-1 text-[14px] font-black text-white md:text-[20px]">Apply for Admission</h3>
            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className={formFieldClass}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                className={formFieldClass}
              />
              <input
                type="text"
                placeholder="Parent/Guardian Name"
                value={form.parentName}
                onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                className={formFieldClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={formFieldClass}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={formFieldClass}
              />
            </div>
            <select
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              className={formFieldClass}
              required
            >
              <option value="">Select Course</option>
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={4}
              className={`${formFieldClass} resize-none`}
            />
            {msg ? (
              <p className={`text-sm ${msgType === "success" ? "text-green-600" : "text-red-600"}`}>{msg}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#F59E0B] py-3 font-bold text-white transition-colors hover:bg-[#de930a] disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
});

