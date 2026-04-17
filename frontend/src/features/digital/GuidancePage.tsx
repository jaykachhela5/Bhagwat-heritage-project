import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type GuidanceCard = {
  title: string;
  description: string;
};

type GuidanceRoute = {
  label: string;
  title: string;
  description: string;
  href: string;
};

const HERO_IMAGE = "/images/manish2.PNG";

const BUTTON_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-[#ff9933] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8871c]";
const BUTTON_LIGHT =
  "inline-flex items-center justify-center rounded-full border border-[#efcda8] bg-white px-6 py-3 text-sm font-semibold text-[#8a4a0e] transition-colors hover:bg-[#fff7ed]";
const BUTTON_GHOST =
  "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20";

const SECTION_WRAPPER = "mx-auto max-w-7xl px-4 py-16 md:py-20";
const LIGHT_PANEL =
  "rounded-[28px] border border-[#efdcc4] bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)] p-6 shadow-[0_14px_32px_rgba(166,94,21,0.08)] md:p-8";
const LIGHT_CARD =
  "rounded-[24px] border border-[#f0dcc1] bg-white p-6 shadow-[0_12px_28px_rgba(153,90,22,0.08)]";

const GUIDANCE_AREAS: GuidanceCard[] = [
  {
    title: "Personal clarity",
    description: "For prayer life, decisions, inner restlessness, and the next practical step.",
  },
  {
    title: "Family harmony",
    description: "For household balance, respectful communication, and stronger sanskar at home.",
  },
  {
    title: "Seva direction",
    description: "For volunteers, organizers, and devotees who want to serve with the right spirit.",
  },
  {
    title: "Youth and study",
    description: "For focus, discipline, study habits, and value-based growth in daily life.",
  },
];

const GUIDANCE_STEPS: GuidanceCard[] = [
  {
    title: "Share the concern",
    description: "Explain the situation briefly and honestly so the guidance can be direct and useful.",
  },
  {
    title: "Listen with attention",
    description: "Maharaj Ji's guidance is rooted in bhakti, clarity, and a practical path forward.",
  },
  {
    title: "Act with consistency",
    description: "The real result appears when the guidance is followed in daily routine and seva.",
  },
];

const GUIDANCE_REFLECTIONS = [
  "Bhakti grows strongest when it becomes discipline in daily life.",
  "A calm home begins with respectful words and steady sanskar.",
  "Seva is most powerful when it is done without ego and with care.",
  "When the mind is confused, return to prayer, satsang, and one clear step.",
  "The right guidance does not only answer a question. It changes the direction of life.",
];

const QUICK_LINKS: GuidanceRoute[] = [
  {
    label: "Founder",
    title: "View Founder Profile",
    description: "Read Maharaj Ji's profile, message, and the trust journey behind this mission.",
    href: ROUTES.about.founder,
  },
  {
    label: "Invite",
    title: "Invite Maharaj Ji",
    description: "Request Maharaj Ji for katha, personal guidance, seminars, or special gatherings.",
    href: "/get-involved/invite-maharaj-ji",
  },
  {
    label: "Events",
    title: "Join Events",
    description: "See upcoming satsang, Bhagwat Katha, and spiritual gatherings across the trust.",
    href: "/events",
  },
  {
    label: "Digital",
    title: "Digital Services",
    description: "Explore the wider digital service hub for deeper trust connectivity.",
    href: ROUTES.digital.index,
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${light ? "text-[#ffe0b8]" : "text-[#d07a13]"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-black leading-tight ${light ? "text-white" : "text-[#6f3b07]"} md:text-4xl lg:text-5xl`}>
        {title}
      </h2>
      {description ? <p className={`mt-4 text-base leading-8 ${light ? "text-[#fff1da]" : "text-[#5d4b36]"} md:text-lg`}>{description}</p> : null}
    </div>
  );
}

function SliderDots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-[#ff9933]" : "w-2.5 bg-[#e8c7a2]"}`}
          aria-label={`Go to guidance reflection ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default memo(function GuidancePage() {
  const [reflectionIndex, setReflectionIndex] = useState(0);

  usePageMeta(
    "Guidance",
    "Seek spiritual guidance from Sant Shri Manish Bhaiji Maharaj for family harmony, seva direction, personal clarity, and devotional growth."
  );

  useEffect(() => {
    const timer = window.setInterval(() => setReflectionIndex((current) => (current + 1) % GUIDANCE_REFLECTIONS.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const currentReflection = GUIDANCE_REFLECTIONS[reflectionIndex % GUIDANCE_REFLECTIONS.length];

  return (
    <div className="bg-[linear-gradient(180deg,#fff7ea_0%,#fffdf8_28%,#ffffff_100%)] text-[#314049]">
      <section className="px-4 pt-6 md:px-6 md:pt-8">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[34px] border border-[#f2dcc4] bg-[linear-gradient(180deg,#fffaf2_0%,#fffdf8_100%)] shadow-[0_20px_50px_rgba(166,94,21,0.12)]">
          <div className="grid gap-10 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-12 lg:py-12">
            <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center rounded-[28px] bg-[radial-gradient(circle_at_50%_20%,rgba(255,153,51,0.20)_0%,rgba(255,153,51,0.06)_40%,rgba(255,153,51,0)_72%)] p-4">
              <img
                src={HERO_IMAGE}
                alt="Sant Shri Manish Bhaiji Maharaj"
                className="h-[320px] w-full object-contain object-bottom drop-shadow-[0_22px_36px_rgba(120,66,0,0.18)] md:h-[420px] lg:h-[520px]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fffaf2] to-transparent" />
            </div>

            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#9ac6f0] bg-[#eef6ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1f5ea8]">
                Personal spiritual guidance
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight text-[#b53b21] md:text-6xl">
                Sant Shri Manish Bhaiji Maharaj
              </h1>
              <p className="mt-4 text-lg font-semibold leading-8 text-[#f08a00] md:text-2xl">
                Guidance for devotion, seva, family harmony, and life direction
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#435769] md:text-lg">
                This page is for seekers who want calm, practical, and spiritually rooted direction. Use it when a question
                needs clarity, when a family needs support, or when seva and satsang should move in the right direction.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#435769] md:text-lg">
                Maharaj Ji's guidance is centered on bhakti, sanskar, and service. The aim is not only to answer the
                immediate concern, but to help the seeker leave with a more stable path forward.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/get-involved/invite-maharaj-ji" className={BUTTON_PRIMARY}>
                  Invite Maharaj Ji
                </Link>
                <Link to="/events" className={BUTTON_LIGHT}>
                  Join Events
                </Link>
                <Link to={ROUTES.about.founder} className={BUTTON_LIGHT}>
                  View Founder Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION_WRAPPER}>
        <div className={LIGHT_PANEL}>
          <SectionHeading
            eyebrow="Guidance Areas"
            title="Where Maharaj Ji's guidance can help"
            description="These are the most common situations where seekers look for spiritual direction and a grounded next step."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {GUIDANCE_AREAS.map((item) => (
              <article key={item.title} className={LIGHT_CARD}>
                <h3 className="text-xl font-black text-[#6b3910]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#675d54]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_WRAPPER}>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className={LIGHT_PANEL}>
            <SectionHeading
              eyebrow="How It Works"
              title="A simple path from question to direction"
              description="The page is designed to make guidance feel easy, respectful, and spiritually meaningful."
            />
            <div className="mt-8 space-y-4">
              {GUIDANCE_STEPS.map((item, index) => (
                <article
                  key={item.title}
                  className="relative rounded-[24px] border border-[#f1dcc4] bg-white p-5 shadow-[0_10px_24px_rgba(153,90,22,0.07)]"
                >
                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#fff7ed] bg-[#ff9933] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="pl-14">
                    <h3 className="text-2xl font-black text-[#5b320f]">{item.title}</h3>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-[#675d53]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={LIGHT_PANEL}>
            <SectionHeading
              eyebrow="Guidance Reflection"
              title="A few Maharaj Ji guidance themes"
              description="These reflections summarize the kind of direction seekers are encouraged to carry into daily life."
            />
            <article className="mt-8 rounded-[28px] border border-[#edd5b0] bg-[linear-gradient(180deg,#fffdf8_0%,#fff3e4_100%)] p-6 shadow-[0_14px_34px_rgba(153,90,22,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d07a13]">Current reflection</p>
              <blockquote className="mt-5 text-2xl font-semibold leading-10 text-[#6b3910] md:text-3xl">
                "{currentReflection}"
              </blockquote>
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setReflectionIndex((index) => (index - 1 + GUIDANCE_REFLECTIONS.length) % GUIDANCE_REFLECTIONS.length)}
                  className={BUTTON_LIGHT}
                >
                  Previous
                </button>
                <SliderDots total={GUIDANCE_REFLECTIONS.length} active={reflectionIndex} onSelect={setReflectionIndex} />
                <button
                  type="button"
                  onClick={() => setReflectionIndex((index) => (index + 1) % GUIDANCE_REFLECTIONS.length)}
                  className={BUTTON_LIGHT}
                >
                  Next
                </button>
              </div>
            </article>

            <div className="mt-6 rounded-[24px] border border-[#edd7b7] bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d07a13]">What to bring</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#675d54]">
                <li>1. A clear question or the situation you want help with.</li>
                <li>2. A willingness to listen and follow the next practical step.</li>
                <li>3. A devotional mindset that values seva, satsang, and sanskar.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION_WRAPPER}>
        <div className={LIGHT_PANEL}>
          <SectionHeading
            eyebrow="Route Structure"
            title="Quick internal routes for seekers"
            description="Move from inspiration to action with these connected paths."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group rounded-[24px] border border-[#e6edf4] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbfd_100%)] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#f0b15d] hover:shadow-[0_16px_30px_rgba(13,45,78,0.10)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d07a13]">{item.label}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--color-secondary)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#60707d]">{item.description}</p>
                <div className="mt-4 inline-flex rounded-full bg-[#fff3e2] px-3 py-1 text-xs font-semibold text-[#b35f11]">
                  {item.href}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9a5310] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionHeading
              eyebrow="Final CTA"
              title="Bring your question to Maharaj Ji's guidance path"
              description="This closing section keeps the next step visible for seekers who want personal direction, events, or invitations."
              light
            />
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffe0b8]">Why this page exists</p>
              <p className="mt-4 text-base leading-8 text-[#fff5e7]">
                A good guidance page should not feel like a dead end. It should help a seeker connect, move forward, and
                stay rooted in bhakti, seva, and practical spiritual discipline.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-involved/invite-maharaj-ji" className={BUTTON_GHOST}>
              Invite Maharaj Ji
            </Link>
            <Link to="/events" className={BUTTON_GHOST}>
              Join Events
            </Link>
            <Link to={ROUTES.about.founder} className={BUTTON_GHOST}>
              View Founder Profile
            </Link>
            <Link to={ROUTES.donate} className={BUTTON_LIGHT}>
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="rounded-[28px] border border-[#f0dcc4] bg-white p-6 text-center shadow-[0_14px_32px_rgba(166,94,21,0.08)] md:p-8">
          <SectionHeading
            eyebrow="Personal Message"
            title="A closing note for every seeker"
            description="This final line leaves visitors with warmth, direction, and a clear spiritual tone."
            center
          />
          <p className="mt-6 text-lg leading-8 text-[#5f4b38]">
            May Maharaj Ji's guidance bring calm to your mind, strength to your actions, and sweetness to your home
            through devotion, discipline, and seva.
          </p>
        </div>
      </section>
    </div>
  );
});
