import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Students Supported", target: 5000 },
  { label: "Schools Covered", target: 120 },
  { label: "Scholarships Awarded", target: 1500 },
  { label: "Medical Camps", target: 200 },
];

const PROGRAMS = [
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png",
    title: "Scholarship Program",
    desc: "Financial aid for meritorious students from underprivileged backgrounds.",
    href: "/seva/scholarship-program",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png",
    title: "Free Medical Camps",
    desc: "Regular health check-ups and free medicine distribution.",
    href: "/seva/medicine-distribution",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772699843/pathshala_eza0sp.png",
    title: "E-Pathshala",
    desc: "Online spiritual and academic education platform.",
    href: "/events/pathshala",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772700010/distribution_nb16yv.png",
    title: "Medicine Distribution",
    desc: "Free medicines for chronic illness patients in rural areas.",
    href: "/seva/medicine-distribution",
  },
];

const MODEL_STEPS = [
  { title: "Identify Need", desc: "Ground teams identify students and patients needing urgent support." },
  { title: "Verify & Plan", desc: "Applications are reviewed and personalized support plans are prepared." },
  { title: "Deliver Support", desc: "Scholarships, camps, and medicines are delivered through verified channels." },
  { title: "Track Outcomes", desc: "Progress and health records are monitored for long-term impact." },
];

const QUICK_HIGHLIGHTS = [
  { title: "Students Supported", value: "5,000+", note: "Academic continuity through trust education seva" },
  { title: "Schools Covered", value: "120+", note: "Partner institutions and outreach learning centers" },
  { title: "Scholarship Aid", value: "1,500+", note: "Students supported through direct sponsorship" },
  { title: "Medical Camps", value: "200+", note: "Integrated health support for learners and families" },
];

const STORIES = [
  {
    name: "Rani, Scholarship Student",
    quote: "This scholarship helped me continue my studies and prepare for my nursing entrance exams.",
  },
  {
    name: "Rural Health Camp Team",
    quote: "Weekly camps now help families detect illnesses early and access essential medicines.",
  },
  {
    name: "Volunteer Mentor",
    quote: "With digital pathshala sessions, students are learning beyond classroom boundaries.",
  },
];

export default memo(function EducationPage() {
  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Medicine & Education Seva"
        subtitle="Empowering communities through knowledge and healthcare"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772699136/medicaleducatio_gmmhg5.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/donate" className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Sponsor a Student
          </Link>
          <Link to="/volunteer" className="bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors">
            Become Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534]">
        <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((item) => (
            <div key={item.title} className="rounded-2xl shadow-sm border border-white/10 bg-[#17384b] overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-52 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                <p className="text-[#d4e1e8] mb-4">{item.desc}</p>
                <Link
                  to={item.href}
                  className="inline-block bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} theme="dark" />

      <section className="py-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">How Our Seva Model Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODEL_STEPS.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <p className="text-[#ffb06a] text-sm font-semibold mb-2">Step {idx + 1}</p>
              <h3 className="text-2xl font-black text-white mb-2">{step.title}</h3>
              <p className="text-[#d4e1e8]">{step.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="pb-16 bg-[#0a2534]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STORIES.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <p className="text-[#d4e1e8] text-lg leading-relaxed">"{item.quote}"</p>
              <p className="text-[#ffb06a] font-semibold mt-4">{item.name}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="pb-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] rounded-2xl p-8 text-white">
          <h3 className="text-4xl font-black mb-3">Monthly Learning & Health Drive</h3>
          <p className="text-white/95 text-lg mb-5">
            Each month we combine education mentorship, scholarship reviews, and health-check support
            to ensure balanced development for students and families.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/donate" className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Donate Now
            </Link>
            <Link to="/volunteer" className="bg-white text-[#0f5a98] font-semibold px-6 py-3 rounded-lg">
              Volunteer as Teacher
            </Link>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
});
