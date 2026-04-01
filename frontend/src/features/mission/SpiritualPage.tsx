import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";

const HERO_IMAGE =
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png";

const MISSION_SIGNALS = [
  {
    title: "Core Scripture",
    value: "Shrimad Bhagwat",
    note: "The mission remains anchored in timeless Bhagwat wisdom and Krishna-centered reflection.",
  },
  {
    title: "Living Path",
    value: "Dharma and Devotion",
    note: "Daily life is guided through bhakti, righteous action, and spiritually disciplined conduct.",
  },
  {
    title: "Daily Expression",
    value: "Seva and Humility",
    note: "Spiritual learning becomes meaningful when it flows into service, humility, and compassion.",
  },
  {
    title: "Reach",
    value: "All Generations",
    note: "Traditional wisdom is shared in a way that remains accessible to families, youth, and elders.",
  },
];

const SACRED_STREAMS = [
  {
    title: "Bhagwat Katha",
    description:
      "Organized katha programs help people listen to Krishna tattva, understand life deeply, and reconnect with the timeless teachings of Shrimad Bhagwat.",
    href: ROUTES.eventsKatha.bhagwatKatha,
  },
  {
    title: "Satsang",
    description:
      "Regular satsang creates spiritual discipline, positive company, and a space where faith, reflection, and right living grow together.",
    href: ROUTES.digital.satsang,
  },
  {
    title: "Devotional Gatherings",
    description:
      "Bhajan, prayer, remembrance, and collective devotion awaken inner peace and help seekers experience divine connection in a living form.",
    href: ROUTES.eventsKatha.spiritualEvents,
  },
  {
    title: "Modern Outreach",
    description:
      "Traditional wisdom is carried through digital and community platforms so spirituality remains accessible, relevant, and welcoming to every generation.",
    href: ROUTES.knowledge.studyResources,
  },
];

const TRANSFORMATION_VALUES = [
  {
    title: "Compassion",
    description:
      "Spiritual learning should soften the heart and deepen care for people, families, and society.",
  },
  {
    title: "Humility",
    description:
      "Devotion grows when ego becomes lighter and service becomes more natural than self-importance.",
  },
  {
    title: "Truth",
    description:
      "Bhagwat wisdom encourages honest living, clarity of purpose, and conduct rooted in righteousness.",
  },
  {
    title: "Seva",
    description:
      "Spiritual realization must move outward through selfless action, kindness, and disciplined contribution.",
  },
];

const ACCESS_PATHS = [
  "Guide individuals toward devotion, inner peace, and righteousness.",
  "Awaken spiritual consciousness through Krishna-centered teachings.",
  "Strengthen positive thinking and purpose-led living.",
  "Help families and youth walk the path of righteous living with clarity.",
];

const SPIRITUAL_SCHEDULE = [
  {
    startHour: 5,
    endHour: 7,
    title: "Mangala Reflection",
    window: "5:00 AM - 7:00 AM",
    detail: "Morning shravan, mantra remembrance, and quiet spiritual centering.",
  },
  {
    startHour: 11,
    endHour: 13,
    title: "Bhagwat Study Window",
    window: "11:00 AM - 1:00 PM",
    detail: "Scripture reflection, guided understanding, and dharmic learning for the day.",
  },
  {
    startHour: 18,
    endHour: 20,
    title: "Satsang and Bhajan Time",
    window: "6:00 PM - 8:00 PM",
    detail: "Evening satsang, devotional connection, and community-led spiritual energy.",
  },
] as const;

const DAILY_FOCUS = [
  "Begin the week with Bhagwat shravan and a calm intention for righteous action.",
  "Strengthen positive thinking through satsang, prayer, and disciplined reflection.",
  "Practice humility in speech, conduct, and seva through the day.",
  "Reconnect with Krishna consciousness through study and grateful remembrance.",
  "Let devotion express itself through compassion toward family and society.",
  "Carry truth and inner steadiness into work, relationships, and daily responsibility.",
  "Use the day for bhajan, silence, and spiritual reset before the next week begins.",
] as const;

const SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]";
const SECTION_HEADING = "mt-2 text-[14px] font-black text-white md:text-[20px]";
const SECTION_BODY = "mt-4 text-base leading-7 text-[#dce7ec] md:text-lg";
const CARD_SHELL =
  "rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

export default memo(function SpiritualPage() {
  const [now, setNow] = useState(() => new Date());

  usePageMeta(
    "Spiritual Mission",
    "Spiritual mission of Shri Bhagwat Heritage Service Foundation rooted in Shrimad Bhagwat Mahapuran, Bhagwat Katha, satsang, devotion, seva, and dharmic living.",
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const currentHour = now.getHours();
  const activeSessionIndex = SPIRITUAL_SCHEDULE.findIndex(
    (item) => currentHour >= item.startHour && currentHour < item.endHour,
  );
  const nextSessionIndex = SPIRITUAL_SCHEDULE.findIndex((item) => currentHour < item.startHour);
  const focusOfTheDay = DAILY_FOCUS[now.getDay()] ?? DAILY_FOCUS[0];

  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Spiritual Mission"
        subtitle="Rooted in Bhagwat wisdom. Guided by devotion, inner peace, and righteous living."
        subtitleClassName="text-[34px] font-semibold md:text-[40px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={HERO_IMAGE}
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.eventsKatha.bhagwatKatha}
            className="inline-flex items-center justify-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Explore Bhagwat Katha
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center justify-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Join the Mission
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {MISSION_SIGNALS.map((item) => (
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
          <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Mission Write-up</p>
              <h2 className={SECTION_HEADING}>The spiritual purpose behind the trust</h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-white md:text-lg">
                <p>
                  Our spiritual mission is to spread the divine and timeless wisdom of the{" "}
                  <em className="font-semibold not-italic text-[#ef9a1e]">Shrimad Bhagwat Mahapuran</em> and guide
                  individuals towards a life rooted in devotion, inner peace, and righteousness.
                </p>
                <p>
                  We are dedicated to awakening spiritual consciousness by organizing Bhagwat Katha, satsang, and
                  devotional gatherings that connect people with the teachings of Lord Krishna and{" "}
                  <span className="font-semibold text-[#ef9a1e]">Sanatan Dharma</span>. Through these sacred platforms,
                  we aim to inspire faith, <span className="font-semibold text-[#ef9a1e]">positive thinking</span>, and
                  a deeper understanding of life&apos;s true purpose.
                </p>
                <p>
                  Our mission is not only to share knowledge but to transform lives by encouraging individuals to
                  practice compassion, humility, truth, and selfless service in their daily lives. We believe that
                  spiritual growth leads to personal fulfillment and creates a harmonious and value-driven society.
                </p>
                <p>
                  By combining traditional wisdom with modern outreach, we strive to make spirituality accessible to all
                  generations, helping individuals walk the path of dharma, wisdom, and divine connection.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Guiding Outcomes</p>
                <h2 className={SECTION_HEADING}>What this mission seeks to awaken</h2>
                <div className="mt-5 space-y-3">
                  {ACCESS_PATHS.map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-[#0b2230] px-4 py-3">
                      <span className="text-sm leading-7 text-[#dce7ec]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <p className={SECTION_LABEL}>Daily Direction</p>
                <h2 className={SECTION_HEADING}>Focus for today&apos;s practice</h2>
                <p className={SECTION_BODY}>{focusOfTheDay}</p>
                <p className="mt-5 text-sm leading-7 text-[#dce7ec]">
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
            <p className={SECTION_LABEL}>Sacred Platforms</p>
            <h2 className={SECTION_HEADING}>How spiritual consciousness is carried into society</h2>
            <p className={SECTION_BODY}>
              The mission becomes real through living spiritual spaces where people can listen, participate, reflect,
              and reconnect with Krishna-centered wisdom.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {SACRED_STREAMS.map((item) => (
              <article key={item.title} className={CARD_SHELL}>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{item.description}</p>
                <Link
                  to={item.href}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
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
            <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Life Transformation</p>
              <h2 className={SECTION_HEADING}>Values the mission asks people to practice</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {TRANSFORMATION_VALUES.map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-white/10 bg-[#0b2230] p-4">
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <p className={SECTION_LABEL}>Spiritual Rhythm</p>
              <h2 className={SECTION_HEADING}>Today&apos;s sacred schedule</h2>
              <div className="mt-5 space-y-4">
                {SPIRITUAL_SCHEDULE.map((item, index) => {
                  const isActive = activeSessionIndex === index;
                  const isNext = !isActive && (nextSessionIndex === index || (nextSessionIndex === -1 && index === 0));

                  return (
                    <div key={item.title} className="rounded-[20px] border border-white/10 bg-[#0b2230] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-black text-white">{item.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-[#dce7ec]">{item.detail}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-[#ef9a1e]">{item.window}</p>
                          <p
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                              isActive
                                ? "bg-[#ef9a1e] text-white"
                                : isNext
                                  ? "bg-white text-[#0b2230]"
                                  : "bg-white/10 text-white/78"
                            }`}
                          >
                            {isActive ? "Live now" : isNext ? "Next session" : "Scheduled"}
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
          <div className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 text-white shadow-sm">
            <p className={SECTION_LABEL}>Next Step</p>
            <h2 className={SECTION_HEADING}>Support a spiritually awakened and value-driven society</h2>
            <p className={SECTION_BODY}>
              Join satsang, support trust activities, or help carry the message of Bhagwat wisdom to more homes,
              families, and seekers.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={ROUTES.contact}
                className="inline-flex items-center justify-center rounded-xl bg-[#0b2230] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#15384b]"
              >
                Contact the Trust
              </Link>
              <Link
                to={ROUTES.donate}
                className="inline-flex items-center justify-center rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
              >
                Support Seva
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
