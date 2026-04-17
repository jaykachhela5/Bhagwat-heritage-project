import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
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

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1771829272/1771410109114-sanskriti_maft9c.png";

const PROGRAM_LINKS = [
  ROUTES.eventsKatha.festivals,
  ROUTES.eventsKatha.youthPrograms,
  ROUTES.media.highlights,
  ROUTES.mandirTeerth.pilgrimage,
];

const SEASON_MONTHS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
];

interface LabelValue {
  label: string;
  value: string;
}

const SECTION_SHELL =
  "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const SECTION_LABEL = MISSION_SECTION_LABEL_CLASS;
const SECTION_HEADING = MISSION_SECTION_HEADING_CLASS;
const SECTION_BODY = MISSION_SECTION_BODY_CLASS;
const CARD_SHELL =
  "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

export default memo(function CulturalPage() {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = (t("missionPages.cultural.stats", { returnObjects: true }) as LabelValue[]) ?? [];
  const programs = (t("missionPages.cultural.programs", { returnObjects: true }) as { title: string; desc: string }[]) ?? [];
  const seasons = (t("missionPages.cultural.seasons", { returnObjects: true }) as { title: string; desc: string }[]) ?? [];
  const calendarItems = (t("missionPages.cultural.calendar", { returnObjects: true }) as string[]) ?? [];
  const directionItems = (t("missionPages.cultural.directionItems", { returnObjects: true }) as string[]) ?? [];
  const focusCards = (t("missionPages.cultural.focusCards", { returnObjects: true }) as { title: string; desc: string }[]) ?? [];

  const seasonIndex = SEASON_MONTHS.findIndex((months) => months.includes(now.getMonth()));
  const activeSeason = seasons[seasonIndex >= 0 ? seasonIndex : 0];
  const currentCalendarIndex = calendarItems.length ? now.getDay() % calendarItems.length : 0;

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title={t("missionPages.cultural.title")}
        subtitle={t("missionPages.cultural.subtitle")}
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
            className="rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            {t("missionPages.cultural.donate")}
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            {t("missionPages.common.becomeVolunteer")}
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={MISSION_HIGHLIGHT_TITLE_CLASS}>{item.label}</p>
                <p className={MISSION_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <p className={SECTION_LABEL}>{t("missionPages.cultural.liveFeature")}</p>
              <h2 className={SECTION_HEADING}>{t("missionPages.cultural.calendarPulse")}</h2>
              <div className="mt-6 space-y-4">
                {calendarItems.map((item, index) => (
                  <div key={item} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className={MISSION_CARD_TITLE_CLASS}>{item}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                          index === currentCalendarIndex ? "bg-[var(--campaign-accent)] text-white" : "bg-white text-[var(--campaign-deep)]"
                        }`}
                      >
                        {index === currentCalendarIndex
                          ? t("missionPages.cultural.calendarStatus.current")
                          : t("missionPages.cultural.calendarStatus.upcoming")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className={SECTION_LABEL}>{t("missionPages.cultural.seasonalMission")}</p>
                <h2 className={SECTION_HEADING}>{activeSeason?.title}</h2>
                <p className={SECTION_BODY}>{activeSeason?.desc}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--campaign-text)]">
                  {t("missionPages.common.updatedOn", {
                    date: now.toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                  })}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className={SECTION_LABEL}>{t("missionPages.cultural.missionDirection")}</p>
                <h2 className={SECTION_HEADING}>{t("missionPages.cultural.aboutTitle")}</h2>
                <ul className="mt-5 space-y-3 text-[var(--campaign-text)]">
                      {directionItems.map((item) => (
                    <li key={item} className={`rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] px-4 py-3 ${MISSION_BODY_TEXT_CLASS}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <p className={SECTION_LABEL}>{t("missionPages.cultural.aboutTitle")}</p>
          <h2 className={SECTION_HEADING}>{t("missionPages.cultural.title")}</h2>
          <p className="mt-5 text-base leading-7 text-white md:text-lg">{t("missionPages.cultural.aboutText1")}</p>
          <p className="mt-4 text-base leading-7 text-white md:text-lg">{t("missionPages.cultural.aboutText2")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <p className={SECTION_LABEL}>Cultural Programs</p>
          <h2 className={SECTION_HEADING}>How cultural learning is carried forward</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PROGRAM_LINKS.map((href, index) => (
              <div key={href} className={CARD_SHELL}>
                <h3 className={MISSION_CARD_TITLE_CLASS}>{programs[index]?.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS}`}>{programs[index]?.desc}</p>
                <Link
                  to={href}
                  className="mt-5 inline-flex rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  {t("missionPages.common.explore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className={SECTION_SHELL}>
          <p className={SECTION_LABEL}>Cultural Focus</p>
          <h2 className={SECTION_HEADING}>What this mission is protecting and growing</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {focusCards.map((item) => (
              <div key={item.title} className={CARD_SHELL}>
                <h3 className={MISSION_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${MISSION_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
