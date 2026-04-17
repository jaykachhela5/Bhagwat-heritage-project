import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type MissionPillar = {
  id: string;
  title: string;
  description: string;
  supportText: string;
  href: string;
  accent: string;
};

type MissionPath = {
  title: string;
  description: string;
  href: string;
  image: string;
};

const SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
const SECTION_HEADING = "mt-2 text-[14px] font-black text-white md:text-[20px]";
const SECTION_BODY = "mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg";
const CARD_LABEL = "text-[22px] font-semibold uppercase tracking-[0.12em] text-[var(--campaign-accent)]";
const CARD_TITLE = "mt-4 text-[22px] font-black text-white md:text-[24px]";
const CARD_BODY = "mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg";
const SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,var(--campaign-bg)_0%,var(--campaign-surface)_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8";
const DARK_SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#102d3e_0%,#0c2634_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8";
const CARD_SHELL =
  "rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm";
const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-[18px] bg-[var(--campaign-accent)] px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]";
const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-[18px] bg-[#0f678c] px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#0b5879]";
const GHOST_BUTTON =
  "inline-flex items-center justify-center rounded-[18px] border border-white/14 bg-white/8 px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white/14";

const MISSION_POINTS = [
  "Spread Bhagwat knowledge globally",
  "Promote spiritual education",
  "Encourage humanitarian service",
  "Preserve and revive cultural heritage",
  "Inspire youth with dharmic values",
] as const;

const CORE_DIRECTION_POINTS = [
  "Bhagwat wisdom",
  "Spiritual education",
  "Humanitarian seva",
  "Cultural revival",
  "Youth dharma",
] as const;

const LIVING_VISION_TAGS = ["Awakening", "Education", "Seva"] as const;

const MISSION_PILLARS: MissionPillar[] = [
  {
    id: "global",
    title: "Spread Bhagwat Knowledge Globally",
    description:
      "Carry the teachings of Shrimad Bhagwat beyond local boundaries through events, content, outreach, and accessible platforms.",
    supportText:
      "This pillar helps the trust build a wider spiritual footprint while keeping the message rooted in scripture.",
    href: ROUTES.mission.global,
    accent: "from-[#f2c65c]/36 via-[#f7dfa0]/16 to-transparent",
  },
  {
    id: "education",
    title: "Promote Spiritual Education",
    description:
      "Create structured learning opportunities that help children, youth, and families understand dharma, devotion, and ethical living.",
    supportText:
      "Education keeps values alive across generations and turns inspiration into steady inner growth.",
    href: ROUTES.knowledge.studyResources,
    accent: "from-[#7fd0e7]/34 via-[#dff6fb]/12 to-transparent",
  },
  {
    id: "service",
    title: "Encourage Humanitarian Service",
    description:
      "Translate teachings into action through welfare, care, relief support, and trust-led service initiatives.",
    supportText:
      "This pillar connects bhakti with real-life responsibility and visible compassion in society.",
    href: ROUTES.about.activities,
    accent: "from-[#a9d67a]/28 via-[#edf8d4]/12 to-transparent",
  },
  {
    id: "heritage",
    title: "Preserve and Revive Cultural Heritage",
    description:
      "Protect devotional traditions, festivals, practices, and Sanskriti through organized participation and heritage-focused work.",
    supportText:
      "Culture survives when it is practiced, explained, and passed forward with care and clarity.",
    href: ROUTES.mission.cultural,
    accent: "from-[#f1c54a]/30 via-[#f6e3a3]/14 to-transparent",
  },
  {
    id: "youth",
    title: "Inspire Youth With Dharmic Values",
    description:
      "Guide younger generations toward discipline, respect, service, and spiritually grounded leadership.",
    supportText:
      "This pillar ensures the trust's work remains future-facing while staying rooted in dharmic principles.",
    href: ROUTES.eventsKatha.youthPrograms,
    accent: "from-[#9fd8ea]/30 via-[#ebf7fb]/12 to-transparent",
  },
];

const MISSION_PATHS: MissionPath[] = [
  {
    title: "Spiritual Mission",
    description: "Bhagwat-centered spiritual direction, satsang, and inner awakening initiatives.",
    href: ROUTES.mission.spiritual,
    image: "/images/spiritual1.png",
  },
  {
    title: "Social Service Mission",
    description: "Compassion-driven outreach and community support through seva-oriented action.",
    href: ROUTES.mission.social,
    image: "/images/jal.png",
  },
  {
    title: "Cultural Renaissance",
    description: "Preservation and revival of heritage, festivals, and value-based cultural expression.",
    href: ROUTES.mission.cultural,
    image: "/images/sanskriti.png",
  },
  {
    title: "Global Outreach Vision",
    description: "Wider spiritual reach through modern engagement, scalable access, and trust-led expansion.",
    href: ROUTES.mission.global,
    image: "/images/heritage2.png",
  },
];

export default memo(function VisionMissionPage() {
  const [activePillar, setActivePillar] = useState<MissionPillar>(MISSION_PILLARS[0]);

  usePageMeta(
    "Vision & Mission",
    "Vision and mission of Shri Bhagwat Heritage Service Foundation, including spiritual direction, educational goals, humanitarian service, cultural preservation, and youth inspiration.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#071b28] pb-16 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_44%)]" />
      <div className="pointer-events-none absolute right-0 top-[180px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_62%)] blur-3xl" />

      <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[34px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,27,40,0.08) 0%, rgba(7,27,40,0.26) 38%, rgba(7,27,40,0.88) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1774437435/vision_mission_qymnvd.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 opacity-16"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(245,158,11,0.22) 0%, transparent 36%)",
            }}
          />
          <div className="relative flex min-h-[420px] flex-col justify-end px-5 py-[22px] md:min-h-[540px] md:px-8 md:py-[30px]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-[10px] text-[20px] font-semibold text-gray-200 md:text-[24px]">
                Bhagwat Heritage Service Foundation Trust
              </p>
              <h1 className="mb-[10px] text-4xl font-bold leading-tight text-white md:text-5xl">
                Vision &amp; Mission
              </h1>
              <p className="mx-auto max-w-4xl text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                Building a spiritually awakened society through Bhagwat wisdom, spiritual education, cultural preservation, humanitarian service, and dharmic youth inspiration.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-[10px]">
                <Link to={ROUTES.about.sansthaParichay} className={BUTTON_CLASS}>
                  Explore Sanstha Parichay
                </Link>
                <Link to={ROUTES.about.activities} className={SECONDARY_BUTTON}>
                  View Trust Activities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className={SECTION_SHELL}>
            <p className={SECTION_LABEL}>Vision</p>
            <h2 className={SECTION_HEADING}>Where the Trust Aims to Lead</h2>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <p className="text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                To create a spiritually awakened society guided by the eternal wisdom of Shrimad Bhagwat.
              </p>
            </div>
          </div>

          <div className={SECTION_SHELL}>
            <p className={SECTION_LABEL}>Mission</p>
            <h2 className={SECTION_HEADING}>How the Trust Works Toward That Vision</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MISSION_POINTS.map((item, index) => (
                <div key={item} className={CARD_SHELL}>
                  <div className="inline-flex rounded-full border border-[#f0c34a]/25 bg-[#f0c34a]/10 px-3 py-1 text-[15px] font-black text-[#ffd790]">
                    0{index + 1}
                  </div>
                  <p className="mt-4 text-base font-semibold leading-7 text-[var(--campaign-text)] md:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className={DARK_SECTION_SHELL}>
            <p className={SECTION_LABEL}>Living Vision</p>
            <h2 className={SECTION_HEADING}>Wisdom That Moves Into Action</h2>
            <p className={SECTION_BODY}>
              The trust aims to shape a society where spiritual understanding is not passive. It should guide character, strengthen culture, and inspire service-led living.
            </p>
          </div>

          <div className={SECTION_SHELL}>
            <p className={SECTION_LABEL}>Key Expressions</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {LIVING_VISION_TAGS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-[15px] font-bold uppercase tracking-[0.14em] text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className={DARK_SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Core Direction</p>
            <h2 className={SECTION_HEADING}>Five Commitments Behind the Vision</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {CORE_DIRECTION_POINTS.map((item, index) => (
              <div key={item} className={CARD_SHELL}>
                <div className="inline-flex rounded-full border border-[#f0c34a]/25 bg-[#f0c34a]/10 px-3 py-1 text-[15px] font-black text-[#ffd790]">
                  0{index + 1}
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-[var(--campaign-text)] md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className={SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Mission Explorer</p>
            <h2 className={SECTION_HEADING}>Explore Each Mission Pillar</h2>
            <p className={SECTION_BODY}>
              This section helps visitors understand each mission area in more depth instead of reading only a flat list.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="grid grid-cols-1 gap-3">
              {MISSION_PILLARS.map((pillar) => (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillar(pillar)}
                  className={`rounded-[22px] border px-5 py-4 text-left transition-all ${
                    activePillar.id === pillar.id
                      ? "border-[var(--campaign-accent)]/45 bg-[#13384a] text-white shadow-[0_16px_28px_rgba(0,0,0,0.18)]"
                      : "border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]/30 hover:bg-[#13384a]"
                  }`}
                >
                  <p className="text-base font-bold md:text-lg">{pillar.title}</p>
                </button>
              ))}
            </div>

            <div
              className={`rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${activePillar.accent} p-[1px] shadow-[0_16px_34px_rgba(0,0,0,0.16)]`}
            >
              <div className="rounded-[27px] bg-[var(--campaign-surface)]/95 p-6 backdrop-blur-sm md:p-8">
                <p className={SECTION_LABEL}>Selected Focus</p>
                <h3 className={CARD_TITLE}>{activePillar.title}</h3>
                <p className={CARD_BODY}>{activePillar.description}</p>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                  <p className={CARD_LABEL}>Why It Matters</p>
                  <p className={CARD_BODY}>{activePillar.supportText}</p>
                </div>

                <Link to={activePillar.href} className={`mt-6 ${BUTTON_CLASS}`}>
                  Explore This Mission Area
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className={DARK_SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Mission Paths</p>
            <h2 className={SECTION_HEADING}>Connected Areas of Work</h2>
            <p className={SECTION_BODY}>
              Vision becomes practical when it is carried through structured spiritual, social, cultural, and outreach pathways.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {MISSION_PATHS.map((path) => (
              <article
                key={path.title}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-[var(--campaign-surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.18)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={path.image}
                    alt={path.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[22px] font-black text-white md:text-[24px]">{path.title}</h3>
                  <p className={CARD_BODY}>{path.description}</p>
                  <Link to={path.href} className={`mt-5 ${BUTTON_CLASS}`}>
                    Explore
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,var(--color-secondary)_0%,#1788ac_52%,var(--campaign-accent)_100%)] p-6 text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)] md:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-white/80">Take the Next Step</p>
              <h2 className="mt-2 text-[14px] font-black md:text-[20px]">Support the Vision. Strengthen the Mission.</h2>
              <p className="mt-4 text-base leading-7 text-white/88 md:text-lg">
                Connect with the trust, explore its active work, or contribute toward a spiritually awake and service-oriented society.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to={ROUTES.contact} className={GHOST_BUTTON}>
                Contact the Trust
              </Link>
              <Link
                to={ROUTES.donate}
                className="inline-flex items-center justify-center rounded-[18px] bg-white px-5 py-3 text-[15px] font-bold text-[var(--color-secondary)] transition-colors hover:bg-[#fff9ef]"
              >
                Support the Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
