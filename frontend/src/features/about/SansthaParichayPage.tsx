import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type FocusArea = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
  accent: string;
};

type SnapshotPoint = {
  title: string;
  description: string;
};

type FoundationValue = {
  title: string;
  description: string;
};

type FrameworkStep = {
  step: string;
  title: string;
  description: string;
};

type QuickLink = {
  label: string;
  note: string;
  href: string;
};

const SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
const SECTION_HEADING = "mt-2 text-[14px] font-black text-white md:text-[20px]";
const SECTION_BODY = "mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg";
const CARD_LABEL = "text-[22px] font-semibold uppercase tracking-[0.12em] text-[var(--campaign-accent)]";
const CARD_TITLE = "mt-4 text-[22px] font-black text-white md:text-[24px]";
const CARD_BODY = "mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg";
const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-[18px] bg-[var(--campaign-accent)] px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]";

const FOUNDATION_SNAPSHOT: SnapshotPoint[] = [
  {
    title: "Scripture-Centered",
    description:
      "The trust draws its spiritual direction from the teachings of Shrimad Bhagwat Mahapuran.",
  },
  {
    title: "Community-Focused",
    description:
      "Its work is designed to support individuals, families, and communities through practical initiatives.",
  },
  {
    title: "Service-Led",
    description:
      "The foundation translates spiritual inspiration into visible seva through organized social action.",
  },
];

const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Spiritual Programs",
    eyebrow: "Adhyatma",
    description:
      "Bhagwat Katha, satsang, devotional guidance, and scripture-centered gatherings that strengthen faith and understanding.",
    image: "/images/kathapravachan.png",
    href: ROUTES.eventsKatha.bhagwatKatha,
    accent: "from-[var(--campaign-accent)]/40 via-[var(--campaign-accent)]/16 to-transparent",
  },
  {
    title: "Educational Initiatives",
    eyebrow: "Shiksha",
    description:
      "Learning support, study resources, and values-based educational efforts for children, youth, and families.",
    image: "/images/education.png",
    href: ROUTES.knowledge.studyResources,
    accent: "from-[#7fd0e7]/35 via-[#4db7d4]/14 to-transparent",
  },
  {
    title: "Cultural Activities",
    eyebrow: "Sanskriti",
    description:
      "Heritage programs, devotional participation, and cultural continuity that keep traditional values alive in society.",
    image: "/images/sanskriti.png",
    href: ROUTES.mission.cultural,
    accent: "from-[#f0c34a]/30 via-[#a4d8e5]/14 to-transparent",
  },
  {
    title: "Social Service Projects",
    eyebrow: "Seva",
    description:
      "Humanitarian work in education, welfare, and community support aimed at uplifting lives with compassion and discipline.",
    image: "/images/chikitsa.png",
    href: ROUTES.about.activities,
    accent: "from-[#9bd36b]/30 via-[#8fc65b]/14 to-transparent",
  },
];

const FOUNDATION_VALUES: FoundationValue[] = [
  {
    title: "Compassion",
    description:
      "Service should begin with empathy and move toward real support for people, families, and communities.",
  },
  {
    title: "Devotion",
    description:
      "Bhakti is treated not only as worship, but as a disciplined spiritual force that shapes conduct and purpose.",
  },
  {
    title: "Service",
    description:
      "The trust aims to convert values into action through structured seva, outreach, and visible community responsibility.",
  },
  {
    title: "Cultural Continuity",
    description:
      "Programs are designed to preserve spiritual heritage, devotional practices, and value-based living for future generations.",
  },
];

const FOUNDATION_FRAMEWORK: FrameworkStep[] = [
  {
    step: "01",
    title: "Inspire Through Teachings",
    description:
      "Spread the message of Shrimad Bhagwat Mahapuran in a form that is spiritually rooted and socially meaningful.",
  },
  {
    step: "02",
    title: "Engage Through Participation",
    description:
      "Build involvement through satsang, education, culture, and guided community-oriented activities.",
  },
  {
    step: "03",
    title: "Serve Through Action",
    description:
      "Turn devotion into seva through humanitarian support, social outreach, and trust-led welfare programs.",
  },
];

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Vision & Mission",
    note: "Understand the trust's broader philosophical and service direction.",
    href: ROUTES.about.visionMission,
  },
  {
    label: "Objectives",
    note: "Review the core objectives that shape spiritual and social work.",
    href: ROUTES.about.objectives,
  },
  {
    label: "Sant Shri Manish Bhaiji Maharaj",
    note: "Meet the founder and spiritual guide behind the trust's direction.",
    href: ROUTES.about.founder,
  },
  {
    label: "Trust Activities",
    note: "Explore the practical initiatives and on-ground trust programs.",
    href: ROUTES.about.activities,
  },
];

export default memo(function SansthaParichayPage() {
  usePageMeta(
    "Sanstha Parichay",
    "Introduction to Shri Bhagwat Heritage Service Foundation, its spiritual identity, humanitarian direction, and trust-led service focus.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#071b28] pb-18 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_44%)]" />
      <div className="pointer-events-none absolute right-0 top-[180px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_62%)] blur-3xl" />

      <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[34px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(7,27,40,0.08) 0%, rgba(7,27,40,0.26) 38%, rgba(7,27,40,0.88) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1774438457/santhaparichay_tesqe1.jpg')",
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
                Shri Bhagwat Heritage Service Foundation
              </p>
              <h1 className="mb-[10px] text-4xl font-bold leading-tight text-white md:text-5xl">
                Sanstha Parichay
              </h1>
              <p className="mx-auto max-w-4xl text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                A spiritual and humanitarian organization devoted to Bhagwat teachings, compassionate service, and value-based community upliftment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,var(--campaign-bg)_0%,var(--campaign-surface)_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8">
            <p className={SECTION_LABEL}>Sanstha Parichay</p>
            <h2 className={SECTION_HEADING}>About the Foundation</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
              <p>
                Shri Bhagwat Heritage Service Foundation is a spiritual and humanitarian organization devoted to spreading the teachings of Shrimad Bhagwat Mahapuran and promoting values of compassion, devotion, and service.
              </p>
              <p>
                The foundation works through spiritual programs, educational initiatives, cultural activities, and social service projects aimed at uplifting individuals and communities.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {FOUNDATION_SNAPSHOT.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                  <p className={CARD_LABEL}>{item.title}</p>
                  <p className={CARD_BODY}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-[#f0c34a]/12 bg-[linear-gradient(180deg,#f8e4b8_0%,#f3d396_100%)] p-6 text-[#3a2915] shadow-[0_14px_30px_rgba(0,0,0,0.18)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#956818]">Living Purpose</p>
            <h2 className="mt-2 text-[14px] font-black md:text-[20px]">Bhakti With Social Meaning</h2>
            <p className="mt-4 text-base leading-7 text-[#5e472d] md:text-lg">
              The foundation does not treat spiritual knowledge as isolated doctrine. It carries that knowledge into educational support, cultural continuity, and seva-oriented public work.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Spread Bhagwat teachings in a practical and accessible form",
                "Support value-based growth for individuals and families",
                "Preserve culture through active participation and heritage work",
                "Strengthen communities through disciplined service initiatives",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/55 px-4 py-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c98d1f]" />
                  <span className="text-base font-medium leading-7 md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#102d3e_0%,#0c2634_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8">
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Focus Areas</p>
            <h2 className={SECTION_HEADING}>Four Active Paths of Service</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {FOCUS_AREAS.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[var(--campaign-bg)] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--campaign-accent)]/40"
              >
                <div className={`absolute inset-0 bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${item.accent}`} />
                <div className="relative p-4">
                  <div className="overflow-hidden rounded-[22px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-5">
                    <p className={CARD_LABEL}>{item.eyebrow}</p>
                    <h3 className="mt-2 text-[22px] font-black text-white md:text-[24px]">{item.title}</h3>
                    <p className={CARD_BODY}>{item.description}</p>
                  </div>
                  <Link
                    to={item.href}
                    className={`mt-5 ${BUTTON_CLASS}`}
                  >
                    Explore
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,var(--campaign-bg)_0%,var(--campaign-surface)_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8">
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Foundation Framework</p>
            <h2 className={SECTION_HEADING}>How the Mission Moves Forward</h2>
            <p className={SECTION_BODY}>
              The trust's approach can be understood as a clear sequence: spiritual inspiration, meaningful participation, and service through disciplined action.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {FOUNDATION_FRAMEWORK.map((item) => (
              <div key={item.step} className="relative rounded-[26px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-md">
                <div className="inline-flex rounded-full border border-[#f0c34a]/25 bg-[#f0c34a]/10 px-3 py-1 text-[15px] font-black text-[#ffd790]">
                  {item.step}
                </div>
                <h3 className="mt-5 text-[22px] font-black text-white md:text-[24px]">{item.title}</h3>
                <p className={CARD_BODY}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#102d3e_0%,#0c2634_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8">
            <p className={SECTION_LABEL}>Core Values</p>
            <h2 className={SECTION_HEADING}>What Guides the Trust</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FOUNDATION_VALUES.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <h3 className="text-[22px] font-black text-[var(--campaign-accent)] md:text-[24px]">{item.title}</h3>
                  <p className={CARD_BODY}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,var(--campaign-bg)_0%,var(--campaign-surface)_100%)] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.2)] md:p-8">
            <p className={SECTION_LABEL}>Explore Further</p>
            <h2 className={SECTION_HEADING}>Continue Through the About Section</h2>
            <p className={SECTION_BODY}>
              Visitors reaching Sanstha Parichay often need the next step immediately. These links connect the introduction page with the trust's mission, founder, objectives, and active work.
            </p>

            <div className="mt-6 space-y-4">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group flex items-start justify-between gap-4 rounded-[22px] border border-white/10 bg-[var(--campaign-surface)] px-5 py-4 transition-all hover:border-[var(--campaign-accent)]/50 hover:bg-[#13384a]"
                >
                  <div>
                    <p className="text-[22px] font-black text-white transition-colors group-hover:text-[var(--campaign-accent)] md:text-[24px]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.note}</p>
                  </div>
                  <span className="mt-2 text-[15px] font-bold text-[var(--campaign-accent)] transition-transform group-hover:translate-x-1">
                    Explore
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-[#f0c34a]/15 bg-[linear-gradient(135deg,rgba(245,158,11,0.14)_0%,rgba(245,158,11,0.05)_100%)] p-5">
              <h3 className="text-[22px] font-black text-white md:text-[24px]">Support the Foundation's Work</h3>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
                Connect with the trust for seva, guidance, participation, or support toward spiritual and humanitarian initiatives.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.contact}
                  className="inline-flex rounded-[18px] border border-white/14 bg-white/8 px-5 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white/14"
                >
                  Contact the Trust
                </Link>
                <Link
                  to={ROUTES.donate}
                  className={BUTTON_CLASS}
                >
                  Support the Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});


