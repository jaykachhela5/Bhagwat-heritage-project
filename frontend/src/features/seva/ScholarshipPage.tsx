import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";

const QUICK_HIGHLIGHTS = [
  { title: "Students Assisted", value: "1,500+", note: "Scholarship beneficiaries across trust support cycles" },
  { title: "Academic Mentors", value: "120+", note: "Guides supporting student growth and direction" },
  { title: "Partner Schools", value: "85", note: "Institutions connected to scholarship outreach" },
  { title: "Renewal Success", value: "92%", note: "Students continuing education after first support year" },
];

const SCHOLARSHIP_FEATURES = [
  {
    title: "Merit-Based Support",
    desc: "Financial assistance for deserving students with strong academic commitment and limited resources.",
  },
  {
    title: "Need-Based Continuity",
    desc: "Support for students facing economic hardship so education is not interrupted mid-year.",
  },
  {
    title: "Mentorship and Guidance",
    desc: "Career encouragement, academic follow-up, and values-based mentoring beyond scholarship aid.",
  },
];

const IMPACT = [
  { label: "Scholarships Awarded", target: 1500 },
  { label: "Students Retained", target: 1200 },
  { label: "Career Guidance Sessions", target: 350 },
  { label: "Family Support Reviews", target: 900 },
];

const SCHOLARSHIP_STREAMS = [
  "School support for underprivileged children",
  "Higher education aid for deserving students",
  "Competitive exam and professional course assistance",
  "Girls education encouragement and continuity support",
];

const APPLICATION_STEPS = [
  {
    step: "1. Student Identification",
    desc: "Students are identified through schools, community networks, and direct applications.",
  },
  {
    step: "2. Need and Merit Review",
    desc: "Academic records, family circumstances, and genuine need are reviewed before approval.",
  },
  {
    step: "3. Scholarship Allocation",
    desc: "Financial support is assigned for tuition, materials, or specific academic continuity requirements.",
  },
  {
    step: "4. Progress Tracking",
    desc: "Student performance and educational continuity are monitored for renewal and long-term impact.",
  },
];

const SUPPORT_TIERS = [
  { label: "School Starter Support", amount: "Rs 2,100", note: "Books, stationery, and basic education continuity" },
  { label: "Annual Scholarship Aid", amount: "Rs 11,000", note: "Support for one deserving student's academic year" },
  { label: "Higher Study Sponsorship", amount: "Rs 31,000", note: "Focused support for advanced or professional study" },
];

const STORIES = [
  {
    name: "Scholarship Student",
    quote: "This scholarship allowed me to continue my studies without forcing my family to choose between education and survival.",
  },
  {
    name: "Parent Beneficiary",
    quote: "The trust gave us more than financial help. It gave our child confidence that education can continue.",
  },
  {
    name: "Academic Mentor",
    quote: "Students grow faster when support includes both scholarship aid and consistent human guidance.",
  },
];

const FAQS = [
  {
    q: "Who can receive scholarship support?",
    a: "Students with genuine financial need, academic commitment, and verified educational continuity requirements can be considered for support.",
  },
  {
    q: "Can I sponsor one student directly?",
    a: "Yes. You can contribute toward supporting one student's annual scholarship or a specific academic need through the donation flow.",
  },
  {
    q: "Does the scholarship program include mentoring?",
    a: "Yes. The model is designed to include academic encouragement, progress tracking, and value-based guidance alongside financial support.",
  },
];

export default memo(function ScholarshipPage() {
  usePageMeta(
    "Scholarship Program",
    "Scholarship aid, student mentoring, merit and need-based support, and educational continuity for deserving learners.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Scholarship Program"
        subtitle="Helping deserving students continue education with dignity, discipline, and hope"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor a Student
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Become Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/40 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#d4e1e8] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Scholarship Seva</h2>
        <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed">
          The Scholarship Program supports learners who have the desire to study but face financial barriers. The trust
          combines financial aid, review, and guidance so students can continue education with stability.
        </p>
        <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed mt-5">
          This page is designed specifically for scholarship support, different from education and medicine seva, with
          student-focused features, donor sponsorship options, and mentoring pathways.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {SCHOLARSHIP_FEATURES.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center shadow-sm">
              <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
              <p className="text-[#d4e1e8] text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} theme="dark" />

      <section className="py-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-8">
          <h3 className="text-4xl font-black text-white mb-5">Scholarship Focus Areas</h3>
          <ul className="space-y-3 text-[#d4e1e8] text-lg">
            {SCHOLARSHIP_STREAMS.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] rounded-2xl p-8 text-white">
          <h3 className="text-4xl font-black mb-4">Sponsor Education Continuity</h3>
          <p className="text-white/95 text-lg mb-6">
            Your support helps deserving students continue school or higher studies without dropping out due to financial difficulty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {SUPPORT_TIERS.map((tier) => (
              <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                <p className="text-base font-semibold">{tier.label}</p>
                <p className="text-2xl font-black mt-1">{tier.amount}</p>
                <p className="text-sm text-white/85 mt-2">{tier.note}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.donate} className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Donate Now
            </Link>
            <Link to={ROUTES.involved.volunteer} className="bg-white text-[#0f5a98] font-semibold px-6 py-3 rounded-lg">
              Join as Mentor
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a2534]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Scholarship Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPLICATION_STEPS.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <h3 className="text-2xl font-black text-white mb-3">{item.step}</h3>
              <p className="text-[#d4e1e8]">{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="pb-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
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

      <section className="pb-16 bg-[#0a2534]">
        <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5 shadow-sm">
              <summary className="cursor-pointer text-white text-xl font-semibold">{item.q}</summary>
              <p className="text-[#d4e1e8] text-lg mt-3">{item.a}</p>
            </details>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
});
