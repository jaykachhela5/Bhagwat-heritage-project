import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "./aboutTypography";

type ObjectivePoint = {
  title: string;
  description: string;
  href: string;
  accent: string;
};

type ObjectiveStream = {
  title: string;
  description: string;
  points: string[];
};

type ObjectiveSignal = {
  title: string;
  note: string;
};

const SECTION_LABEL = `${ABOUT_SECTION_LABEL_CLASS} text-[#C46D1A]`;
const SECTION_HEADING = `${ABOUT_SECTION_HEADING_CLASS} text-[#1D4F63]`;
const SECTION_BODY = `mt-4 ${ABOUT_BODY_CLASS} text-[#5E5247]`;
const CARD_LABEL = `${ABOUT_SECTION_LABEL_CLASS} text-[#C46D1A]`;
const CARD_TITLE = `${ABOUT_CARD_TITLE_CLASS} text-[#27657A]`;
const CARD_BODY = `mt-4 ${ABOUT_BODY_CLASS} text-[#51463C]`;
const SECTION_SHELL =
  "rounded-[30px] border border-[#E7D3B5] bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8";
const DARK_SECTION_SHELL =
  "rounded-[30px] border border-[#D8E4E5] bg-[linear-gradient(180deg,rgba(230,241,240,0.85)_0%,rgba(255,252,247,0.98)_56%,rgba(250,241,225,0.9)_100%)] p-6 shadow-[0_22px_52px_rgba(29,79,99,0.08)] md:p-8";
const CARD_SHELL =
  "rounded-[24px] border border-[#D8C3A2] bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,247,233,0.98)_100%)] p-5 shadow-[0_18px_38px_rgba(101,71,35,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D08A32] hover:shadow-[0_22px_42px_rgba(196,109,26,0.14)]";
const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-xl bg-[#F0AE57] px-5 py-3 text-[15px] font-semibold text-[#FFFDF8] shadow-[0_14px_28px_rgba(233,147,45,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#E9932D]";
const GHOST_BUTTON =
  "inline-flex items-center justify-center rounded-xl border border-[#D8C3A2] bg-[rgba(255,255,255,0.72)] px-5 py-3 text-[15px] font-semibold text-[#1D4F63] transition-all hover:-translate-y-0.5 hover:bg-[#F6EAD4]";

const OBJECTIVE_POINTS: ObjectivePoint[] = [
  {
    title: "Spread spiritual knowledge through Bhagwat teachings",
    description:
      "Advance Bhagwat Katha, satsang, and scripture-centered explanation so devotion is understood, practiced, and shared with clarity.",
    href: ROUTES.eventsKatha.bhagwatKatha,
    accent: "from-[#E4B45E]/30 via-[#E4B45E]/10 to-transparent",
  },
  {
    title: "Develop spiritual learning platforms",
    description:
      "Build study pathways, digital access, and learning spaces that help seekers, families, and youth engage with spiritual knowledge regularly.",
    href: ROUTES.knowledge.index,
    accent: "from-[#D8E4E5]/38 via-[#A9CAD1]/14 to-transparent",
  },
  {
    title: "Strengthen family and youth spiritual formation",
    description:
      "Guide children, youth, and families through Bal Sanskar, mentorship, and regular devotional practice that supports character and continuity.",
    href: ROUTES.knowledge.children,
    accent: "from-[#F6EAD4]/42 via-[#E7D3B5]/16 to-transparent",
  },
  {
    title: "Support education and cultural awareness",
    description:
      "Encourage value-based education and preserve cultural understanding through heritage, language, festivals, and dharmic learning.",
    href: ROUTES.mission.cultural,
    accent: "from-[#D8E4E5]/34 via-[#F6EAD4]/12 to-transparent",
  },
  {
    title: "Promote social welfare and humanitarian initiatives",
    description:
      "Extend the trust's mission through seva, care, outreach, and practical support for communities in need.",
    href: ROUTES.about.activities,
    accent: "from-[#F6EAD4]/36 via-[#E4B45E]/12 to-transparent",
  },
  {
    title: "Establish sacred centers of devotion and learning",
    description:
      "Create and strengthen spaces where worship, study, satsang, and spiritual discipline can grow together.",
    href: ROUTES.mandirTeerth.bhagwatDham,
    accent: "from-[#E4B45E]/30 via-[#C46D1A]/12 to-transparent",
  },
];

const OBJECTIVE_STREAMS: ObjectiveStream[] = [
  {
    title: "Spiritual Transmission",
    description:
      "The trust works to carry Bhagwat teachings into daily life through live discourse, guided devotion, and continued study.",
    points: ["Bhagwat Katha", "Satsang and spiritual guidance", "Scripture-rooted public teaching"],
  },
  {
    title: "Learning and Cultural Continuity",
    description:
      "Objectives are not limited to worship; they include shaping values, preserving heritage, and supporting meaningful learning environments.",
    points: ["Spiritual learning platforms", "Education support", "Cultural awareness and heritage revival"],
  },
  {
    title: "Service and Sacred Infrastructure",
    description:
      "The trust connects seva with institution-building so communities can benefit from both compassionate action and sacred spaces.",
    points: ["Humanitarian initiatives", "Community welfare support", "Sacred centers of devotion and learning"],
  },
];

const OBJECTIVE_SIGNALS: ObjectiveSignal[] = [
  {
    title: "Core Objectives",
    note: "Bhagwat-rooted priorities guiding trust direction.",
  },
  {
    title: "Knowledge Source",
    note: "Scriptural wisdom remains the foundation of the work.",
  },
  {
    title: "Development Focus",
    note: "Education and understanding move alongside devotion.",
  },
  {
    title: "Social Expression",
    note: "Service translates trust values into public support.",
  },
  {
    title: "Institution Vision",
    note: "Spiritual spaces are built for worship, learning, and continuity.",
  },
];

export default memo(function ObjectivesPage() {
  usePageMeta(
    "Objectives",
    "Objectives of the trust including Bhagwat teachings, spiritual learning, family and youth formation, education, cultural awareness, social welfare, and sacred centers.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(228,180,94,0.22)_0%,_rgba(228,180,94,0)_30%),radial-gradient(circle_at_left_center,_rgba(39,101,122,0.12)_0%,_rgba(39,101,122,0)_28%),linear-gradient(180deg,_#FFF9F1_0%,_#FFFDF8_44%,_#F6EAD4_100%)] pb-16 text-[#1D4F63]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute right-0 top-[180px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(39,101,122,0.12),transparent_62%)] blur-3xl" />

      <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[34px] border border-[#D8C3A2] shadow-[0_24px_60px_rgba(101,71,35,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,34,48,0.08) 0%, rgba(11,34,48,0.34) 42%, rgba(11,34,48,0.92) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1774439060/objectives_bj9uay.jpg')",
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
              <h1 className="mb-[10px] text-4xl font-bold leading-tight text-white md:text-5xl">
                Objectives
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] font-semibold leading-7 text-white/90 md:text-[24px]">
                Promoting learning, seva, and sacred values
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.donate} className={BUTTON_CLASS}>
                  Donate
                </Link>
                <Link to={ROUTES.involved.sponsor} className={GHOST_BUTTON}>
                  Sponsor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {OBJECTIVE_SIGNALS.map((item) => (
            <div key={item.title} className={CARD_SHELL}>
              <p className={CARD_LABEL}>{item.title}</p>
              <p className={CARD_BODY}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className={DARK_SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Objective Framework</p>
            <h2 className={SECTION_HEADING}>Six Core Objectives of the Trust</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {OBJECTIVE_POINTS.map((item) => (
              <article
                key={item.title}
                className="group relative flex h-full overflow-hidden rounded-[28px] border border-[#D8C3A2] bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,247,233,0.98)_100%)] shadow-[0_18px_38px_rgba(101,71,35,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D08A32] hover:shadow-[0_22px_42px_rgba(196,109,26,0.14)]"
              >
                <div className={`absolute inset-0 bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${item.accent}`} />
                <div className="relative flex h-full flex-1 flex-col p-6">
                  <h3 className={CARD_TITLE}>{item.title}</h3>
                  <p className={`${CARD_BODY} flex-1`}>{item.description}</p>
                  <Link to={item.href} className={`mt-6 self-start ${BUTTON_CLASS}`}>
                    Explore Related Work
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={SECTION_SHELL}>
            <p className={SECTION_LABEL}>Why These Objectives Matter</p>
            <h2 className={SECTION_HEADING}>A Trust Model Rooted in Dharma and Public Good</h2>
            <p className={SECTION_BODY}>
              The trust is not built around one isolated activity. Its objectives connect spiritual knowledge, community learning, culture, seva, and sacred development into one integrated direction.
            </p>
            <p className={SECTION_BODY}>
              This creates a trust structure where worship deepens understanding, understanding shapes conduct, conduct inspires service, and service strengthens the social and spiritual life of the community.
            </p>
          </div>

          <div className={DARK_SECTION_SHELL}>
            <p className={SECTION_LABEL}>Trust Direction</p>
            <h2 className={SECTION_HEADING}>Objectives in One View</h2>
            <div className="mt-6 space-y-3">
              {[
                "Bhagwat knowledge should reach society in a living form.",
                "Spiritual learning should be structured, accessible, and lasting.",
                "Families and youth should receive guided sanskar-based formation.",
                "Education and culture should reinforce each other.",
                "Seva should remain practical, compassionate, and disciplined.",
                "Sacred centers should become spaces of devotion and learning.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[22px] border border-[#D8C3A2] bg-[rgba(255,255,255,0.72)] px-4 py-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E4B45E]" />
                  <span className={SECTION_BODY}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className={SECTION_SHELL}>
          <div className="max-w-3xl">
            <p className={SECTION_LABEL}>Three Working Streams</p>
            <h2 className={SECTION_HEADING}>How the Objectives Become Action</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {OBJECTIVE_STREAMS.map((item) => (
              <div key={item.title} className={CARD_SHELL}>
                <h3 className="text-[22px] font-black text-[#27657A] md:text-[24px]">{item.title}</h3>
                <p className={CARD_BODY}>{item.description}</p>
                <div className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-[20px] border border-[#D8C3A2] bg-[rgba(255,255,255,0.72)] px-4 py-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E4B45E]" />
                      <span className={CARD_BODY}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-[30px] border border-[#E7D3B5] bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 text-[#1D4F63] shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#C46D1A]">Support the Objectives</p>
              <h2 className="mt-2 text-[14px] font-black text-[#1D4F63] md:text-[20px]">Help the Trust Carry These Objectives Forward</h2>
              <p className={`mt-4 max-w-2xl ${SECTION_BODY}`}>
                Participate through seva, support educational and cultural efforts, and help strengthen sacred, service-led, Bhagwat-rooted initiatives.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to={ROUTES.contact} className={GHOST_BUTTON}>
                Contact the Trust
              </Link>
              <Link to={ROUTES.donate} className={BUTTON_CLASS}>
                Support the Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
