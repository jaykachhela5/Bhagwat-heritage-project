import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SevaHeroBanner } from "./SevaHeroBanner";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_CONTENT_CLASS,
  SEVA_HERO_OUTLINE_BUTTON_CLASS,
  SEVA_HERO_PRIMARY_BUTTON_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

const MONTHLY_METRICS = [
  {
    title: "Active Recovery Cases",
    note: "Ongoing care, counseling, and trust-led recovery support for active cases.",
  },
  {
    title: "Counseling Sessions",
    note: "One-to-one and group sessions helping individuals rebuild discipline and stability.",
  },
  {
    title: "Awareness Outreach",
    note: "Public awareness efforts reaching communities with prevention and early-help guidance.",
  }, 
  {
    title: "Family Follow-ups",
    note: "Regular family coordination helping recovery stay supported at home and beyond.",
  },
];

const ADDICTION_TYPES = [
  {
    image: "/images/vyasanmukti.png",
    title: "Alcohol Addiction",
    details:
      "Alcohol dependence slowly damages physical health, mental balance, and family trust. Recovery includes detox, counseling, relapse prevention, and strong support systems.",
  },
  {
    image: "/images/chikitsa.png",
    title: "Drug Addiction",
    details:
      "Drug addiction can impact brain function, emotional control, personal safety, and financial stability. Recovery needs supervised treatment and reintegration support.",
  },
  {
    image: "/images/v.png",
    title: "Tobacco and Smoking",
    details:
      "Tobacco dependency affects lungs, heart health, sleep, and stress response. With structured guidance, individuals can gradually regain better stamina and wellbeing.",
  },
  {
    image: "/images/page1.png",
    title: "Gambling",
    details:
      "Gambling addiction causes debt, anxiety, secrecy, and family conflict. Counseling and practical discipline are key to restoring stability and control.",
  },
  {
    image: "/images/education.png",
    title: "Digital Addiction",
    details:
      "Compulsive screen habits can reduce concentration, disturb sleep, and weaken relationships. Recovery focuses on boundaries, routine correction, and counseling.",
  },
  {
    image: "/images/ch2.png",
    title: "Prescription Misuse",
    details:
      "Prescription misuse may begin quietly but can lead to dependency and dangerous side effects. Recovery requires medical supervision, counseling, and safe tapering plans.",
  },
];

const RECOVERY_PILLARS = [
  { title: "Medical Guidance", desc: "Clinical evaluation and structured detox support by professionals.", icon: "M" },
  { title: "Counseling Therapy", desc: "One-to-one and group sessions for emotional healing and discipline.", icon: "C" },
  { title: "Family Reintegration", desc: "Family counseling and trust rebuilding with practical routines.", icon: "F" },
  { title: "Spiritual Anchoring", desc: "Daily spiritual reflection, meditation, and value-based life direction.", icon: "S" },
];

const RECOVERY_SUPPORT_OPTIONS = [
  {
    label: "Detox Support",
    amount: "Rs 5,000",
    note: "Supports intake assessment, early detox guidance, and first-stage recovery help.",
    badge: "Immediate Help",
  },
  {
    label: "Full Rehabilitation",
    amount: "Rs 25,000",
    note: "Supports counseling, family follow-up, structured recovery planning, and deeper treatment care.",
    badge: "Most Needed",
  },
  {
    label: "Awareness Campaign",
    amount: "Rs 51,000",
    note: "Sponsors public awareness camps, prevention outreach, and early-help intervention efforts.",
    badge: "Community Impact",
  },
];

const REHABILITATION_STEPS = [
  "Initial Consultation - Confidential assessment with counsellors",
  "Medical Evaluation - Health and psychological evaluation",
  "Detoxification - Supervised detox phase",
  "Therapy and Counseling - Individual and group therapy sessions",
  "Reintegration - Family counselling and practical life rebuilding",
];

const WARNING_SIGNS = [
  "Sudden behaviour change and social withdrawal",
  "Loss of focus in work or studies and sleep disturbance",
  "Financial stress due to compulsive habits",
  "Health deterioration and emotional instability",
];

const TESTIMONIALS = [
  {
    name: "Recovered Youth, Chandrapur",
    quote: "Vyasanmukti Seva gave me a second life. Counseling and family support helped me return to normal life.",
  },
  {
    name: "Parent Support Group",
    quote: "The program not only supported our child but also taught us how to rebuild trust at home.",
  },
  {
    name: "Seva Volunteer",
    quote: "Community awareness camps are reducing stigma and encouraging early help-seeking.",
  },
];

const FAQ = [
  {
    q: "Is counseling confidential?",
    a: "Yes. All sessions and records are handled with strict confidentiality and respect.",
  },
  {
    q: "Can family members join the recovery process?",
    a: "Yes. Family counseling is a key part of long-term recovery and reintegration.",
  },
  {
    q: "How can I support this mission?",
    a: "You can donate for treatment support, sponsor awareness camps, sponsor recovery cases, or volunteer in outreach programs.",
  },
];

export default memo(function VyasanPage() {
  const [activeLearnMore, setActiveLearnMore] = useState<string | null>(null);

  usePageMeta(
    "Vyasanmukti Abhiyan",
    "Bhagwat Heritage Service Foundation Trust Vyasanmukti Seva page focused on recovery care, counseling, rehabilitation support, awareness outreach, and sponsored treatment support.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <SevaHeroBanner
        title="Vyasanmukti Abhiyan"
        subtitle="Break addiction, rebuild life."
        backgroundImage="/images/vyasanmukti.png"
      >
        <Link
          to={ROUTES.donate}
          className={SEVA_HERO_PRIMARY_BUTTON_CLASS}
        >
          Donate for Recovery
        </Link>
        <Link
          to={ROUTES.involved.sponsor}
          className={SEVA_HERO_PRIMARY_BUTTON_CLASS}
        >
          Sponsor Treatment
        </Link>
        <Link
          to={ROUTES.involved.sponsor}
          className={SEVA_HERO_OUTLINE_BUTTON_CLASS}
        >
          Sponsor Awareness Camp
        </Link>
      </SevaHeroBanner>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {MONTHLY_METRICS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Addiction We Address</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Understanding the forms of dependency</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ADDICTION_TYPES.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mx-auto mb-4 h-20 w-20 rounded-full border border-white/15 object-cover"
                  loading="lazy"
                />
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <button
                  type="button"
                  onClick={() => setActiveLearnMore((prev) => (prev === item.title ? null : item.title))}
                  className="mt-4 inline-flex rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Learn More
                </button>
                {activeLearnMore === item.title ? (
                  <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>{item.details}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Recovery Pillars</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Key areas supporting healing and reintegration</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {RECOVERY_PILLARS.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-xl font-black text-[var(--campaign-accent)]">
                  {item.icon}
                </div>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Rehabilitation Process</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Step-by-step recovery and support journey</h2>
          <div className="mt-8 space-y-4">
            {REHABILITATION_STEPS.map((step, i) => (
              <div key={step} className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--campaign-deep)] text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="text-base leading-7 text-[var(--campaign-text)] md:text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Recovery Stories</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Voices of change, trust, and healing</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className="text-base leading-7 text-[var(--campaign-text)]">"{item.quote}"</p>
                <p className="mt-4 text-[14px] font-black text-white md:text-[20px]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Support Recovery Programs</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Ways to sponsor treatment and awareness support</h2>
          <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
            Choose a direct donation or sponsor a focused support track to help someone move from addiction toward recovery, discipline, and hope.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {RECOVERY_SUPPORT_OPTIONS.map((tier) => (
              <div key={tier.label} className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <span className="inline-flex w-fit rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--campaign-accent)]">
                  {tier.badge}
                </span>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{tier.label}</h3>
                <p className="mt-2 text-[14px] font-black text-[var(--campaign-accent)] md:text-[20px]">{tier.amount}</p>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS}`}>{tier.note}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.donate}
                    className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                  >
                    Donate Now
                  </Link>
                  <Link
                    to={ROUTES.involved.sponsor}
                    className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
                  >
                    Sponsor
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5">
                <summary className="cursor-pointer text-[14px] font-black text-white md:text-[20px]">{item.q}</summary>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm lg:col-span-1">
              <p className={SEVA_SECTION_LABEL_CLASS}>Early Warning Signs</p>
              <ul className="mt-5 space-y-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                {WARNING_SIGNS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-white shadow-sm lg:col-span-3">
              <p className={SEVA_SECTION_LABEL_CLASS}>Need Immediate Help?</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Connect for confidential recovery guidance</h2>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                Connect with our Vyasanmukti support team for confidential guidance, counseling, and the right recovery path.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={ROUTES.contact} className="rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]">
                  Contact Counselor
                </Link>
                <Link
                  to={ROUTES.involved.sponsor}
                  className="rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Sponsor Treatment
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
