import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png";

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
    <div className="min-h-screen bg-[#0B2230] pb-16">
      <section className="px-4 pb-6 pt-8 md:pt-10">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 shadow-xl">
          <div
            className="relative h-[360px] md:h-[520px]"
            style={{
              backgroundImage: `linear-gradient(rgba(11,34,48,0.62), rgba(11,34,48,0.78)), url('${HERO_IMAGE}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
              <p className="mb-4 inline-flex rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-1 text-sm">
                {t("missionPages.common.badge")}
              </p>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">{t("missionPages.cultural.title")}</h1>
              <p className="mt-4 text-lg text-white/95 md:text-2xl">{t("missionPages.cultural.subtitle")}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.donate} className="rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]">
                  {t("missionPages.cultural.donate")}
                </Link>
                <Link to={ROUTES.involved.volunteer} className="rounded-lg bg-white px-6 py-3 font-semibold text-[#0B2230] transition-colors hover:bg-[#eef4f7]">
                  {t("missionPages.common.becomeVolunteer")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-[#12394A] p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#F59E0B]">{item.value}</p>
              <p className="mt-1 text-sm text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.cultural.liveFeature")}</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">{t("missionPages.cultural.calendarPulse")}</h2>
            <div className="mt-6 space-y-4">
              {calendarItems.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">{item}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      index === currentCalendarIndex ? "bg-[#F59E0B] text-white" : "bg-white text-[#0B2230]"
                    }`}>
                      {index === currentCalendarIndex
                        ? t("missionPages.cultural.calendarStatus.current")
                        : t("missionPages.cultural.calendarStatus.upcoming")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.cultural.seasonalMission")}</p>
              <h2 className="mt-2 text-3xl font-black text-white">{activeSeason?.title}</h2>
              <p className="mt-4 leading-8 text-[#dce7ec]">{activeSeason?.desc}</p>
              <p className="mt-4 text-sm text-[#dce7ec]">
                {t("missionPages.common.updatedOn", {
                  date: now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                  time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                })}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.cultural.missionDirection")}</p>
              <ul className="mt-4 space-y-3 text-[#dce7ec]">
                {directionItems.map((item) => (
                  <li key={item} className="rounded-2xl bg-[#0f3140] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
          <h2 className="text-4xl font-black text-[#F59E0B]">{t("missionPages.cultural.aboutTitle")}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.cultural.aboutText1")}</p>
          <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.cultural.aboutText2")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAM_LINKS.map((href, index) => (
            <div key={href} className="rounded-2xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h3 className="text-2xl font-black text-white">{programs[index]?.title}</h3>
              <p className="mt-3 leading-7 text-[#dce7ec]">{programs[index]?.desc}</p>
              <Link to={href} className="mt-5 inline-flex rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de930a]">
                {t("missionPages.common.explore")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {focusCards.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#dce7ec]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});
