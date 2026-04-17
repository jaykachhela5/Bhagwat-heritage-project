import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

const QUICK_HIGHLIGHTS = [
  { title: "Students Assisted", note: "Scholarship beneficiaries supported across multiple academic journeys" },
  { title: "Academic Mentors", note: "Guides helping students stay focused, confident, and future-ready" },
  { title: "Partner Schools", note: "Connected institutions supporting student identification and continuity" },
  { title: "Renewal Success", note: "Learners continuing education after first support year" },
];

const SCHOLARSHIP_PILLARS = [
  {
    title: "Merit with Responsibility",
    desc: "The program supports sincere students who show discipline, effort, and a genuine commitment toward their studies.",
  },
  {
    title: "Need-Based Continuity",
    desc: "Financial difficulty should not force a student to stop learning. The trust helps deserving learners stay on track.",
  },
  {
    title: "Mentorship and Direction",
    desc: "Scholarship support becomes stronger when paired with mentoring, encouragement, and consistent academic guidance.",
  },
  {
    title: "Values with Knowledge",
    desc: "We believe education grows best when academic progress is strengthened by ethics, discipline, and inner growth.",
  },
];

const SUPPORT_PATHWAYS = [
  {
    title: "School Learners",
    shortLabel: "School Learners",
    audience: "Students needing support for school continuity, uniforms, books, and annual essentials.",
    support: "Covers basic educational continuity needs so children can keep moving forward with dignity.",
    impact: "Prevents dropout risk during critical school years.",
    sponsorLabel: "Sponsor School Support",
  },
  {
    title: "Higher Education",
    shortLabel: "Higher Education",
    audience: "Deserving students entering college, university, or advanced study pathways with real financial need.",
    support: "Supports tuition continuity, materials, and learning stability during higher studies.",
    impact: "Helps bright students stay connected to long-term goals.",
    sponsorLabel: "Support Higher Studies",
  },
  {
    title: "Competitive Aspirants",
    shortLabel: "Exam Aspirants",
    audience: "Learners preparing for competitive exams, professional courses, and career-shaping opportunities.",
    support: "Encouragement, guidance, and focused aid for students working toward career-defining milestones.",
    impact: "Turns talent into opportunity through timely intervention.",
    sponsorLabel: "Encourage Aspirants",
  },
  {
    title: "Girls Education Support",
    shortLabel: "Girls Education",
    audience: "Focused educational continuity for girls whose studies may be interrupted by social or financial challenges.",
    support: "Strengthens access, confidence, and continuity so education can remain a lasting path forward.",
    impact: "Builds dignity, stability, and future leadership through learning.",
    sponsorLabel: "Support Girls Education",
  },
];

const APPLICATION_STEPS = [
  {
    step: "1. Student Identification",
    desc: "Students are identified through schools, trust networks, family referrals, and community outreach.",
  },
  {
    step: "2. Need and Merit Review",
    desc: "Academic records, family background, sincerity, and financial need are reviewed before support is approved.",
  },
  {
    step: "3. Scholarship Allocation",
    desc: "Support is arranged for tuition, study materials, academic continuity, or a specific stage of the student's journey.",
  },
  {
    step: "4. Progress and Renewal",
    desc: "The trust stays connected to track continuity, growth, and long-term learning outcomes wherever possible.",
  },
];

const SUPPORT_TIERS = [
  { label: "School Starter Support", amount: "Rs 2,100", note: "Books, notebooks, stationery, and basic school readiness" },
  { label: "Annual Scholarship Aid", amount: "Rs 11,000", note: "Support for one deserving student's education year" },
  { label: "Higher Study Sponsorship", amount: "Rs 31,000", note: "Focused aid for advanced academic or professional study" },
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
    a: "Students with genuine financial need, sincere academic commitment, and verified educational continuity requirements can be considered for trust support.",
  },
  {
    q: "Can I sponsor one student directly?",
    a: "Yes. Donors can support one student, a specific academic stage, or a scholarship pool through the trust's donation pathway.",
  },
  {
    q: "Does the scholarship program include mentoring?",
    a: "Yes. The program encourages value-based mentoring, motivation, review, and academic direction alongside financial support.",
  },
  {
    q: "Can the trust support girls education and higher studies separately?",
    a: "Yes. Different educational needs can be aligned to school support, girls education, higher studies, or specialized academic progression.",
  },
];

function RevealSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {children}
    </section>
  );
}

export default memo(function ScholarshipPage() {
  const [activePathwayIndex, setActivePathwayIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const activePathway = SUPPORT_PATHWAYS[activePathwayIndex];

  usePageMeta(
    "Scholarship Seva",
    "Scholarship aid, student mentoring, merit and need-based support, and educational continuity for deserving learners.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Scholarship Seva"
        subtitle="Supporting dreams, shaping futures."
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        backgroundPositionClass="bg-center"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Sponsor a Student
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Become Mentor
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-deep)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
          >
            Contact for Support
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SEVA_SECTION_LABEL_CLASS}>Scholarship Program</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Scholarship Program</h2>
              <p className="mt-5 text-base leading-7 text-white md:text-lg">
                The Scholarship Program is designed to encourage deserving students by offering financial support for their educational journey.
                This initiative seeks to remove obstacles and open doors for bright and sincere learners who need assistance.
              </p>
              <p className="mt-4 text-base leading-7 text-white md:text-lg">
                We aim to support talent with responsibility and help shape a future built on knowledge and values.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.donate}
                  className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Donate for Scholarship
                </Link>
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
                >
                  Join as Guide
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {SCHOLARSHIP_PILLARS.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className={SEVA_SECTION_LABEL_CLASS}>Scholarship Pathways</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the support journey</h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {SUPPORT_PATHWAYS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActivePathwayIndex(index)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                  activePathwayIndex === index
                    ? "bg-[var(--campaign-accent)] text-white"
                    : "bg-[var(--campaign-deep)] text-white hover:bg-[var(--campaign-deep-hover)]"
                }`}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SEVA_SECTION_LABEL_CLASS}>Selected Support Area</p>
              <h3 className="mt-2 text-[14px] font-black text-white md:text-[20px]">{activePathway.title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{activePathway.audience}</p>
              <div className="mt-5 rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">What the trust supports</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{activePathway.support}</p>
              </div>
              <div className="mt-4 rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Scholarship impact</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{activePathway.impact}</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-white shadow-sm">
              <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor education continuity</p>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                Your contribution can help a deserving student continue school or higher studies without losing momentum due to financial barriers.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-3">
                {SUPPORT_TIERS.map((tier) => (
                  <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--campaign-deep-hover)]">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                    <p className="mt-2 text-[14px] font-black text-white md:text-[20px]">{tier.amount}</p>
                    <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{tier.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.donate}
                  className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  {activePathway.sponsorLabel}
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
                >
                  Contact for Scholarship Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Scholarship Process</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {APPLICATION_STEPS.map((item) => (
              <div key={item.step} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.step}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Impact Stories</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STORIES.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <p className="text-base leading-7 text-[var(--campaign-text)]">"{item.quote}"</p>
                <p className="mt-4 text-[14px] font-black text-white md:text-[20px]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p>
          <div className="mt-8 space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div key={item.q} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[14px] font-black text-white md:text-[20px]">{item.q}</span>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--campaign-deep)] text-xl text-white transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-white shadow-sm">
            <p className={SEVA_SECTION_LABEL_CLASS}>Final Scholarship CTA</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Support talent, responsibility, and a brighter future</h3>
            <p className="mt-4 max-w-4xl text-base leading-7 text-[var(--campaign-text)] md:text-lg">
              Bhagwat Heritage Service Foundation Trust aims to help sincere students continue their educational journey with stability,
              values, and meaningful encouragement. Every scholarship contribution can become a turning point in a student's life.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={ROUTES.donate}
                className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Donate for Scholarship
              </Link>
              <Link
                to={ROUTES.contact}
                className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
              >
                Contact for Educational Help
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
              >
                Mentor a Learner
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
});
