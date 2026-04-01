import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";

const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1774714133/globleoutreach_bs55yu.png";

const OUTREACH_TRACKS = [
  {
    label: "All",
    title: "Global Trust Network",
    summary: "A unified global vision connecting satsang, seva, digital learning, and Sanatan cultural outreach.",
  },
  {
    label: "Digital Satsang",
    title: "Digital Satsang Expansion",
    summary: "Online katha, livestream satsang, multilingual clips, and devotional study access across borders.",
  },
  {
    label: "Diaspora Communities",
    title: "Diaspora Community Chapters",
    summary: "Support for devotee communities abroad through local gatherings, seva circles, and value-led engagement.",
  },
  {
    label: "Service Partnerships",
    title: "Global Seva Collaboration",
    summary: "Partnerships with social, spiritual, and community organizations for compassionate service delivery.",
  },
  {
    label: "Youth and Culture",
    title: "Youth and Heritage Outreach",
    summary: "Programs for children and youth to stay connected with scripture, language, culture, and devotional identity.",
  },
] as const;

const GLOBAL_SIGNALS = [
  {
    title: "Mission Pillars",
    value: "4",
    note: "The global mission is structured around satsang, culture, seva, and youth continuity.",
  },
  {
    title: "Expansion Phases",
    value: "4",
    note: "A phased plan helps the trust scale carefully across regions and collaborative pathways.",
  },
  {
    title: "Target Reach",
    value: "Global",
    note: "The vision is meant to connect families and seekers across borders through trusted access points.",
  },
  {
    title: "Digital Presence",
    value: "24/7",
    note: "Digital satsang and study resources help spiritual connection remain continuous across time zones.",
  },
];

const MISSION_PILLARS = [
  {
    title: "Global Satsang Access",
    desc: "Enable devotees in every region to access Bhagwat Katha, satsang guidance, and spiritual reflections through digital and local formats.",
  },
  {
    title: "Sanatan Cultural Preservation",
    desc: "Carry forward devotional traditions, family values, and dharmic practices for communities living far from traditional centers.",
  },
  {
    title: "Cross-Border Seva",
    desc: "Create service models that support humanitarian needs, volunteer collaboration, and disciplined compassion at an international level.",
  },
  {
    title: "Youth Continuity",
    desc: "Build global youth participation through value education, cultural learning, leadership circles, and devotional identity programs.",
  },
];

const GLOBAL_MISSIONS = [
  {
    track: "Digital Satsang",
    region: "Worldwide",
    mission: "Build a continuous online satsang ecosystem",
    details:
      "Develop regular livestream katha sessions, archived pravachan libraries, and devotional content access for global followers in different time zones.",
    href: ROUTES.digital.satsang,
  },
  {
    track: "Diaspora Communities",
    region: "United States, UK, Canada, Australia",
    mission: "Support local chapter-based devotional gatherings",
    details:
      "Help overseas devotees organize satsang circles, festival observances, study groups, and family-centered dharmic events under a shared trust vision.",
    href: ROUTES.eventsKatha.spiritualEvents,
  },
  {
    track: "Service Partnerships",
    region: "India and overseas collaboration hubs",
    mission: "Create seva partnerships with aligned institutions",
    details:
      "Coordinate social welfare campaigns, food support, relief work, and community service with trusted spiritual and service organizations.",
    href: ROUTES.mission.social,
  },
  {
    track: "Youth and Culture",
    region: "Global youth communities",
    mission: "Preserve identity through youth learning tracks",
    details:
      "Offer youth camps, Bal Sanskar modules, scripture introduction, and heritage-centered engagement for the next generation of global families.",
    href: ROUTES.eventsKatha.youthPrograms,
  },
] as const;

const EXPANSION_ROADMAP = [
  {
    phase: "Phase 1",
    title: "Digital Foundation",
    desc: "Strengthen livestream satsang, recorded discourse archives, and online devotion resources.",
  },
  {
    phase: "Phase 2",
    title: "Community Anchors",
    desc: "Support trusted coordinators and satsang groups in key overseas devotee regions.",
  },
  {
    phase: "Phase 3",
    title: "Partnership-Led Seva",
    desc: "Launch collaborative outreach with aligned organizations for service and cultural engagement.",
  },
  {
    phase: "Phase 4",
    title: "Global Learning Ecosystem",
    desc: "Develop multilingual study, youth formation, and devotional education pathways for families worldwide.",
  },
];

const SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]";
const SECTION_HEADING = "mt-2 text-[14px] font-black text-white md:text-[20px]";
const SECTION_BODY = "mt-4 text-base leading-7 text-[#dce7ec] md:text-lg";
const CARD_SHELL =
  "rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

export default memo(function GlobalOutreachPage() {
  const [activeTrack, setActiveTrack] = useState<(typeof OUTREACH_TRACKS)[number]["label"]>("All");

  usePageMeta(
    "Global Outreach Vision",
    "Global satsang expansion, cultural preservation, international seva collaboration, and youth outreach under the trust mission.",
  );

  const activeTrackContent = OUTREACH_TRACKS.find((track) => track.label === activeTrack) ?? OUTREACH_TRACKS[0];
  const visibleMissions =
    activeTrack === "All" ? GLOBAL_MISSIONS : GLOBAL_MISSIONS.filter((mission) => mission.track === activeTrack);

  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Global Outreach Vision"
        subtitle="Bhagwat Heritage connects satsang, seva, and Sanatan culture across borders."
        subtitleClassName="text-[34px] font-semibold md:text-[40px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={HERO_IMAGE}
        boxed
        heightClass="h-[420px] md:h-[620px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.digital.satsang}
            className="inline-flex items-center justify-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Explore Digital Satsang
          </Link>
          <Link
            to={ROUTES.involved.partner}
            className="inline-flex items-center justify-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Partner Globally
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {GLOBAL_SIGNALS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d6179] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[24px] uppercase tracking-wide text-[#ef9a1e]">{item.title}</p>
                <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.value}</p>
                <p className="mt-1 text-base leading-7 text-[#dce7ec] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Mission Pillars</p>
            <h2 className={SECTION_HEADING}>Four foundations behind the global vision</h2>
            <p className={SECTION_BODY}>
              The trust&apos;s global expansion is not only geographic. It is built around continuity of satsang,
              culture, seva, and intergenerational dharmic identity.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {MISSION_PILLARS.map((pillar) => (
              <article key={pillar.title} className={CARD_SHELL}>
                <h3 className="text-xl font-black text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.78fr)]">
            <section className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className={SECTION_LABEL}>Mission Explorer</p>
                  <h2 className={SECTION_HEADING}>Global outreach tracks</h2>
                  <p className="mt-4 text-base leading-7 text-[#dce7ec] md:text-lg">
                    Browse the outreach vision by track to understand how the trust can expand through digital satsang,
                    diaspora communities, seva partnerships, and youth-centered cultural continuity.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-[#0b2230] px-5 py-4 md:max-w-[320px]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ef9a1e]">Active Vision Track</p>
                  <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{activeTrackContent.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#dce7ec]">{activeTrackContent.summary}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {OUTREACH_TRACKS.map((track) => {
                  const active = track.label === activeTrack;

                  return (
                    <button
                      key={track.label}
                      type="button"
                      onClick={() => setActiveTrack(track.label)}
                      className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                        active ? "bg-[#ef9a1e] text-white" : "bg-[#0b2230] text-white hover:bg-[#15384b]"
                      }`}
                    >
                      {track.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                {visibleMissions.map((mission) => (
                  <article key={`${mission.track}-${mission.mission}`} className="rounded-[20px] border border-white/10 bg-[#0b2230] p-4">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ef9a1e]">{mission.track}</p>
                    <h3 className="mt-3 text-xl font-black text-white">{mission.mission}</h3>
                    <p className="mt-3 text-sm font-semibold text-[#ef9a1e]">{mission.region}</p>
                    <p className="mt-4 text-sm leading-7 text-[#dce7ec]">{mission.details}</p>
                    <Link
                      to={mission.href}
                      className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                    >
                      Explore
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-5">
              <section className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Global Intention</p>
                <h2 className={SECTION_HEADING}>What this vision protects</h2>
                <div className="mt-5 space-y-3">
                  {[
                    "Bhagwat knowledge should remain accessible regardless of geography.",
                    "Families abroad should stay rooted in Sanatan values and devotional identity.",
                    "Seva can be coordinated across borders through aligned trust networks.",
                    "Youth should inherit culture through modern, relevant, and value-led engagement.",
                  ].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-[#0b2230] px-4 py-3">
                      <span className="text-sm leading-7 text-[#dce7ec]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Expansion Path</p>
                <h2 className={SECTION_HEADING}>Roadmap overview</h2>
                <div className="mt-5 space-y-4">
                  {EXPANSION_ROADMAP.map((item) => (
                    <div key={item.phase} className="rounded-[20px] border border-white/10 bg-[#0b2230] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ef9a1e]">{item.phase}</p>
                      <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#dce7ec]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 text-white shadow-sm">
            <p className={SECTION_LABEL}>Take This Further</p>
            <h2 className={SECTION_HEADING}>Build a global devotional and service-led network</h2>
            <p className={SECTION_BODY}>
              Expand satsang access, support overseas communities, create cross-border seva partnerships, and help the
              next generation stay rooted in Bhagwat wisdom and Sanatan culture.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={ROUTES.involved.partner}
                className="inline-flex items-center justify-center rounded-xl bg-[#0b2230] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#15384b]"
              >
                Partner With the Trust
              </Link>
              <Link
                to={ROUTES.donate}
                className="inline-flex items-center justify-center rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
              >
                Support Global Outreach
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
