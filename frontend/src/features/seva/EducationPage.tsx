import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import { EducationServicesSection } from "./EducationServicesSection";

const MODEL_STEPS = [
  { title: "Identify Learners", desc: "Students and families needing education support are identified through outreach, schools, and trust networks." },
  { title: "Assess the Need", desc: "The team reviews the learner's situation, academic stage, and the type of support required." },
  { title: "Deliver Education Support", desc: "Study materials, continuity aid, mentorship, or learning access support is arranged through the trust." },
  { title: "Track Student Progress", desc: "The trust follows student continuity and learning progress so support remains meaningful and sustained." },
];

const QUICK_HIGHLIGHTS = [
  { title: "Academic Continuity", value: "School First", note: "Helping children stay in school with practical learning support" },
  { title: "Learning Material Support", value: "Books and Kits", note: "Study essentials delivered where families need relief most" },
  { title: "Mentorship Network", value: "Guided Growth", note: "Volunteer mentors encouraging students with care and consistency" },
  { title: "Community Reach", value: "Village to City", note: "Education seva extending from rural learners to urban support cases" },
];

const STORIES = [
  {
    name: "Class 10 Student",
    quote: "The trust's education support helped me continue school with books, stationery, and confidence during a difficult year.",
  },
  {
    name: "Parent Beneficiary",
    quote: "We were worried our child might leave school, but timely support helped us keep education going with dignity.",
  },
  {
    name: "Volunteer Mentor",
    quote: "Even a few hours of guidance each week can change how a student studies, dreams, and moves forward.",
  },
];

export default memo(function EducationPage() {
  usePageMeta(
    "Education Seva",
    "Bhagwat Heritage Service Foundation Trust education seva page focused on student learning continuity, mentorship, school resources, and educational support.",
  );

  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Education Seva"
        subtitle="Lighting lives through learning."
        subtitleClassName="text-[34px] font-semibold md:text-[40px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772699843/pathshala_eza0sp.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.donate} className="inline-flex items-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]">
            Support Education
          </Link>
          <Link to={ROUTES.involved.volunteer} className="inline-flex items-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]">
            Become Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d6179] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[19px] font-black uppercase tracking-wide text-[#ef9a1e]">{item.title}</p>
                <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.value}</p>
                <p className="mt-1 text-base leading-7 text-[#dce7ec] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">About Education Seva</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Learning support with guidance and continuity</h2>
          <p className="mt-5 text-base leading-7 text-white md:text-lg">
            Education Seva is aimed at helping students move forward with confidence and dignity. Through this initiative,
            the foundation supports educational needs such as study materials, guidance, and assistance for learners from deserving backgrounds.
          </p>
          <p className="mt-4 text-base leading-7 text-white md:text-lg">
            We believe that education should be strengthened by values, discipline, and inner growth along with academic progress.
          </p>
        </div>
      </section>

      <EducationServicesSection />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">How Education Seva Works</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {MODEL_STEPS.map((step, idx) => (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ef9a1e]">Step {idx + 1}</p>
                <h3 className="mt-3 text-xl font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Education Stories</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STORIES.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <p className="text-base leading-7 text-[#dce7ec]">"{item.quote}"</p>
                <p className="mt-4 text-[14px] font-black text-white md:text-[20px]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Monthly Education Support Drive</p>
            <p className="mt-4 text-base leading-7 text-[#dce7ec] md:text-lg">
              Each month the trust supports students through learning materials, school continuity help,
              mentorship guidance, and digital education assistance so children can keep moving forward.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="rounded-xl bg-[#0b2230] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#15384b]">
                Volunteer as Teacher
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
