import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  MISSION_BODY_TEXT_CLASS,
  MISSION_CARD_TITLE_CLASS,
  MISSION_HERO_SUBTITLE_CLASS,
  MISSION_HIGHLIGHT_TITLE_CLASS,
  MISSION_HIGHLIGHT_VALUE_CLASS,
  MISSION_SECTION_BODY_CLASS,
  MISSION_SECTION_HEADING_CLASS,
  MISSION_SECTION_LABEL_CLASS,
} from "./missionTypography";

type MissionCategory = "all" | "food" | "health" | "education" | "gau" | "relief" | "support";

const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png";

const IMPACT_SIGNALS = [
  {
    title: "Core Expression",
    value: "Compassion and Seva",
    note: "Social service is treated as a living expression of devotion, care, and responsibility.",
  },
  {
    title: "Mission Force",
    value: "Human Welfare",
    note: "Every initiative is focused on dignity, protection, and long-term upliftment for people in need.",
  },
  {
    title: "Sacred Inspiration",
    value: "Shrimad Bhagwat",
    note: "Bhagwat wisdom remains the foundation behind the trust's humanitarian service work.",
  },
  {
    title: "Long-Term Aim",
    value: "Social Transformation",
    note: "The mission extends beyond relief to build lasting change, trust, and social harmony.",
  },
];

const SERVICE_STREAMS = [
  {
    category: "food" as const,
    title: "Food Distribution (Ann Seva)",
    description:
      "Nutritious food support for families, pilgrims, and people facing hardship so no one is deprived of dignity, care, and basic nourishment.",
    impact: "Meals, ration support, and compassionate food outreach.",
    href: ROUTES.seva.ann,
  },
  {
    category: "health" as const,
    title: "Medical Support",
    description:
      "Healthcare assistance, relief support, and medicine-centered seva for people who cannot easily access timely treatment and care.",
    impact: "Medicine distribution and practical healthcare support.",
    href: ROUTES.seva.medicine,
  },
  {
    category: "education" as const,
    title: "Educational Assistance",
    description:
      "Educational help for children, youth, and economically weaker families so learning, self-respect, and growth remain possible.",
    impact: "Study support, learning continuity, and value-based upliftment.",
    href: ROUTES.seva.education,
  },
  {
    category: "gau" as const,
    title: "Gau Seva (Cow Protection)",
    description:
      "Support for Gau Seva through care, shelter, and protection rooted in reverence, responsibility, and dharmic compassion.",
    impact: "Protection, nourishment, and sacred animal care.",
    href: ROUTES.seva.gau,
  },
  {
    category: "relief" as const,
    title: "Disaster Relief",
    description:
      "Rapid and organized support during crisis situations so families and communities receive food, essentials, and hope when they need it most.",
    impact: "Emergency response with dignity and discipline.",
    href: ROUTES.seva.disasterRelief,
  },
  {
    category: "support" as const,
    title: "Support for Weaker Sections",
    description:
      "Sustained social support for underprivileged communities and economically weaker sections through care-led and opportunity-focused initiatives.",
    impact: "Basic necessities, dignity, and opportunities for growth.",
    href: ROUTES.involved.index,
  },
];

const VALUE_PILLARS = [
  {
    title: "Compassion",
    description:
      "True spirituality must respond to suffering with active kindness, not passive sympathy.",
  },
  {
    title: "Empathy",
    description:
      "Service begins when people are seen with dignity, care, and human understanding.",
  },
  {
    title: "Collective Responsibility",
    description:
      "We encourage individuals to become part of a shared mission instead of waiting for change from others.",
  },
  {
    title: "Hope and Security",
    description:
      "Social service should help communities live with respect, stability, and confidence in the future.",
  },
];

const SERVICE_WINDOWS = [
  {
    startHour: 6,
    endHour: 10,
    title: "Morning Seva Coordination",
    window: "6:00 AM - 10:00 AM",
    detail: "Volunteer alignment, field planning, and readiness for food, health, and welfare outreach.",
  },
  {
    startHour: 10,
    endHour: 17,
    title: "Community Support Operations",
    window: "10:00 AM - 5:00 PM",
    detail: "Active execution of Ann Seva, healthcare support, education assistance, and public welfare services.",
  },
  {
    startHour: 17,
    endHour: 21,
    title: "Review and Response Window",
    window: "5:00 PM - 9:00 PM",
    detail: "Follow-up support, next-day planning, and emergency coordination for urgent social response.",
  },
] as const;

const DAILY_SERVICE_NOTES = [
  "Begin the week by serving with discipline so compassion becomes action, not intention alone.",
  "Offer care with respect and sensitivity so help strengthens dignity, not dependence.",
  "Let food, medicine, and education support become expressions of living devotion.",
  "Remember that Gau Seva, humanitarian care, and public welfare all arise from the same spiritual heart.",
  "Work for those in need with patience and a long-term vision for change.",
  "Use seva to cultivate empathy, collective responsibility, and trust within society.",
  "End the week by reflecting on how temporary help can grow into lasting transformation.",
] as const;

const FILTERS: { key: MissionCategory; label: string }[] = [
  { key: "all", label: "All Initiatives" },
  { key: "food", label: "Ann Seva" },
  { key: "health", label: "Medical" },
  { key: "education", label: "Education" },
  { key: "gau", label: "Gau Seva" },
  { key: "relief", label: "Relief" },
  { key: "support", label: "Community Support" },
];

const SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const SECTION_LABEL = MISSION_SECTION_LABEL_CLASS;
const SECTION_HEADING = MISSION_SECTION_HEADING_CLASS;
const SECTION_BODY = MISSION_SECTION_BODY_CLASS;
const CARD_SHELL =
  "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

export default memo(function SocialPage() {
  const [activeCategory, setActiveCategory] = useState<MissionCategory>("all");
  const [now, setNow] = useState(() => new Date());

  usePageMeta(
    "Social Service Mission",
    "Social service mission of Shri Bhagwat Heritage Service Foundation focused on compassion, selfless service, Ann Seva, medical support, education, Gau Seva, disaster relief, and long-term social transformation.",
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const activeWindowIndex = SERVICE_WINDOWS.findIndex(
    (item) => now.getHours() >= item.startHour && now.getHours() < item.endHour,
  );
  const nextWindowIndex = SERVICE_WINDOWS.findIndex((item) => now.getHours() < item.startHour);
  const visibleStreams = useMemo(() => {
    if (activeCategory === "all") {
      return SERVICE_STREAMS;
    }

    return SERVICE_STREAMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);
  const serviceNote = DAILY_SERVICE_NOTES[now.getDay()] ?? DAILY_SERVICE_NOTES[0];

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Social Service Mission"
        subtitle="Spirituality lives in compassion and service"
        subtitleClassName={MISSION_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={HERO_IMAGE}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Support the Mission
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Join Seva
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {IMPACT_SIGNALS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={MISSION_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={MISSION_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${MISSION_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Mission Write-up</p>
              <h2 className={SECTION_HEADING}>Social service as an expression of devotion</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-white md:text-lg">
                <p>
                  True spirituality expresses itself through compassion, selfless service, and a deep commitment to the
                  welfare of society.
                </p>
                <p>
                  At Shri Bhagwat Heritage Service Foundation, we believe that serving humanity is the highest form of
                  devotion. Inspired by the teachings of Shrimad Bhagwat Mahapuran, our social service mission focuses on
                  uplifting underprivileged communities and creating a positive impact through meaningful initiatives.
                </p>
                <p>
                  Through our humanitarian efforts, we actively engage in programs such as food distribution, medical
                  support, educational assistance, Gau Seva, disaster relief, and support for economically weaker sections
                  of society. Our goal is to ensure that no individual is deprived of basic necessities, dignity, and
                  opportunities for growth.
                </p>
                <p>
                  We encourage individuals to participate in seva and become a part of this noble mission. By fostering
                  kindness, empathy, and collective responsibility, we aim to build a compassionate and harmonious
                  society where everyone can live with respect, security, and hope.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Social Intention</p>
                <h2 className={SECTION_HEADING}>What this mission protects</h2>
                <div className="mt-5 space-y-3">
                  {[
                    "Basic necessities should reach people with dignity and respect.",
                    "No person should be denied growth due to poverty or neglect.",
                    "Seva should strengthen social trust, not only provide temporary relief.",
                    "Compassion must become organized, disciplined, and collective action.",
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] px-4 py-3">
                      <span className={MISSION_BODY_TEXT_CLASS}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Today&apos;s Seva Note</p>
                <h2 className={SECTION_HEADING}>Daily direction for social service</h2>
                <p className={SECTION_BODY}>{serviceNote}</p>
                <p className="mt-5 text-sm leading-7 text-[var(--campaign-text)]">
                  Updated on{" "}
                  {now.toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  at {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Mission Explorer</p>
            <h2 className={SECTION_HEADING}>Service initiatives shaping social impact</h2>
            <p className={SECTION_BODY}>
              Explore the major initiatives through which the foundation carries compassion, dignity, and practical
              public support into society.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveCategory(item.key)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                  activeCategory === item.key
                    ? "bg-[var(--campaign-accent)] text-white"
                    : "bg-[var(--campaign-deep)] text-white hover:bg-[var(--campaign-deep-hover)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleStreams.map((item) => (
              <article key={item.title} className={CARD_SHELL}>
                <h3 className={MISSION_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS}`}>{item.description}</p>
                <div className="mt-4 rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Social Impact</p>
                  <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS}`}>{item.impact}</p>
                </div>
                <Link
                  to={item.href}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Social Values</p>
              <h2 className={SECTION_HEADING}>Values behind long-term transformation</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {VALUE_PILLARS.map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                    <h3 className={MISSION_CARD_TITLE_CLASS}>{item.title}</h3>
                    <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Operations Board</p>
              <h2 className={SECTION_HEADING}>Live service rhythm</h2>
              <div className="mt-5 space-y-4">
                {SERVICE_WINDOWS.map((item, index) => {
                  const isActive = activeWindowIndex === index;
                  const isNext = !isActive && (nextWindowIndex === index || (nextWindowIndex === -1 && index === 0));

                  return (
                    <div key={item.title} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className={MISSION_CARD_TITLE_CLASS}>{item.title}</h3>
                          <p className={`mt-2 ${MISSION_BODY_TEXT_CLASS}`}>{item.detail}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[var(--campaign-accent)]">{item.window}</p>
                          <p
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                              isActive
                                ? "bg-[var(--campaign-accent)] text-white"
                                : isNext
                                  ? "bg-white text-[var(--campaign-deep)]"
                                  : "bg-white/10 text-white/78"
                            }`}
                          >
                            {isActive ? "Active now" : isNext ? "Next window" : "Scheduled"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-white shadow-sm">
            <p className={SECTION_LABEL}>Participate</p>
            <h2 className={SECTION_HEADING}>Become part of a compassionate and harmonious society</h2>
            <p className={SECTION_BODY}>
              Help carry kindness, empathy, and organized seva into communities through donation, volunteering, and
              trust-led participation.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
              >
                Become a Volunteer
              </Link>
              <Link
                to={ROUTES.donate}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Support Social Seva
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
