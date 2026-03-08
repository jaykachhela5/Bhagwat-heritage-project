import { memo, useState, type FormEvent } from "react";
import { pathshalaApi } from "../../services/api/misc";

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

const IMPACT = [
  { value: "12,000+", label: "Active Learners" },
  { value: "180+", label: "Mentors and Faculty" },
  { value: "45+", label: "Centers and Chapters" },
  { value: "96%", label: "Program Completion" },
];

const HERO_HIGHLIGHTS = [
  { title: "Active Learners", value: "12,000+", note: "Students connected to Pathshala learning tracks" },
  { title: "Mentor Network", value: "180+", note: "Faculty, Acharyas, and guide mentors" },
  { title: "Centers and Chapters", value: "45+", note: "Connected learning communities and chapters" },
  { title: "Completion Rate", value: "96%", note: "Program continuity and successful progression" },
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
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b2230_0%,#0b2230_24%,#e9f2ff_24%,#f5fbff_72%,#fff6e8_100%)] pb-16">
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#2d7ed4]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[520px] -right-24 h-80 w-80 rounded-full bg-[#18b293]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#ffb347]/16 blur-3xl" />

      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[30px] bg-cover bg-center text-white h-[360px] md:h-[520px] shadow-[0_22px_50px_rgba(15,47,87,0.24)]"
          style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1772914626/pathshala_yqh2vq.png')" }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute -top-20 right-8 h-56 w-56 rounded-full border border-white/20" />
          <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-white/10 blur-xl" />
        </div>
      </section>

      <section className="-mt-10 relative z-20 max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          {HERO_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg"
            >
              <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
              <p className="text-white text-2xl font-black mt-1">{item.value}</p>
              <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="models" className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c]">Pathshala Models</h2>
        <p className="text-[#4c5b67] mt-1 mb-5">Choose the format that fits your family and learning goals.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {LEARNING_MODELS.map((model) => (
            <article
              key={model.title}
              className="rounded-2xl bg-gradient-to-br from-white to-[#f6fbff] border border-[#dce6ef] p-6 shadow-[0_8px_22px_rgba(24,55,84,0.08)]"
            >
              <p className="inline-block text-xs font-bold uppercase tracking-wide bg-[#eaf3ff] text-[#1f5c91] px-2.5 py-1 rounded-full mb-3">
                {model.tag}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-[#143754]">{model.title}</h3>
              <p className="mt-2 text-[#4f5e69] leading-relaxed">{model.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">Program Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TRACKS.map((track) => (
            <article key={track.name} className="rounded-2xl bg-[#0f2f50] text-white p-5 shadow-lg">
              <p className="text-xs uppercase tracking-widest text-[#86d0ff] font-bold">{track.age}</p>
              <h3 className="text-xl font-bold mt-2">{track.name}</h3>
              <p className="text-white/85 mt-2">{track.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-3xl bg-white border border-[#dce6ef] p-6 md:p-8 shadow-[0_8px_22px_rgba(24,55,84,0.07)]">
          <h2 className="text-2xl md:text-4xl font-black text-[#18324c]">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
            {CORE_FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl bg-[#f7fbff] border border-[#e5eff8] p-4">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#0f7ec2]" />
                <p className="text-[#304657] font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">Advanced Learning Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROGRAM_TOOLS.map((tool) => (
            <article
              key={tool.title}
              className="rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#f4fbff] border border-[#dce6ef] p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold text-[#173b57]">{tool.title}</h3>
              <p className="text-[#4d5c67] mt-2 text-sm leading-relaxed">{tool.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#0f3456] to-[#0f5e71] text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black mb-5">Weekly Learning Rhythm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {WEEKLY_SCHEDULE.map((item) => (
              <div key={item.day} className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm font-bold text-[#9de0ff]">{item.day}</p>
                <p className="text-white mt-1">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">Learning Pathway</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_PATH.map((step) => (
            <article key={step.phase} className="rounded-2xl bg-white border border-[#dce6ef] p-5 shadow-sm">
              <p className="text-sm font-bold text-[#0e83bc]">{step.phase}</p>
              <h3 className="text-xl font-bold text-[#173b57] mt-1">{step.title}</h3>
              <p className="text-[#4d5c67] mt-2">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">Outcome Matrix</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OUTCOME_MATRIX.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white border border-[#dce6ef] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-[#173b57]">{item.title}</h3>
              <p className="text-[#4d5c67] mt-2">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">What Families Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((item) => (
            <article key={item.by} className="rounded-2xl bg-white border border-[#dce6ef] p-5 shadow-sm">
              <p className="text-[#3e4f5d] leading-relaxed">"{item.quote}"</p>
              <p className="text-sm font-bold text-[#0f7ec2] mt-4">{item.by}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-[#18324c] mb-5">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((item) => (
            <article key={item.q} className="rounded-2xl bg-white border border-[#dce6ef] p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#173b57]">{item.q}</h3>
              <p className="text-[#4d5c67] mt-2">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="admission-form" className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0f5fc6] to-[#0f8f8e] text-white p-7 md:p-8 shadow-[0_10px_28px_rgba(10,49,98,0.28)]">
            <h2 className="text-2xl md:text-4xl font-black">Admissions Open</h2>
            <p className="mt-3 text-white/90 leading-relaxed">
              Build strong values and confident leadership through guided spiritual and cultural learning.
              Select your preferred course and our admissions team will help with onboarding.
            </p>
            <div className="mt-6 space-y-2 text-white/90">
              <p>. Flexible online and offline batches</p>
              <p>. Mentor support and assessment tracking</p>
              <p>. Activity-based experiential learning</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border border-[#dce6ef] p-6 md:p-7 space-y-3 shadow-[0_8px_22px_rgba(24,55,84,0.07)]"
          >
            <h3 className="text-2xl font-bold text-[#173b57] mb-1">Apply for Admission</h3>
            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
              />
              <input
                type="text"
                placeholder="Parent/Guardian Name"
                value={form.parentName}
                onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
              />
            </div>
            <select
              value={form.course}
              onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
              className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
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
              className="w-full px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab] resize-none"
            />
            {msg ? (
              <p className={`text-sm ${msgType === "success" ? "text-green-600" : "text-red-600"}`}>{msg}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#ffa114] hover:bg-[#e98f09] text-white font-bold py-3 transition-colors disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
});
