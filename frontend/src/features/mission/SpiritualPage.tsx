import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png";

const STATS = [
  { label: "Katha Programs", value: "250+" },
  { label: "Satsang Reach", value: "50,000+" },
  { label: "Digital Viewers", value: "24/7" },
  { label: "Volunteer Support", value: "1,200+" },
];

const SPIRITUAL_PILLARS = [
  { href: ROUTES.eventsKatha.bhagwatKatha },
  { href: ROUTES.digital.satsang },
  { href: ROUTES.knowledge.pathshala },
  { href: ROUTES.knowledge.children },
];

const SPIRITUAL_SCHEDULE = [
  { startHour: 5, endHour: 7 },
  { startHour: 11, endHour: 13 },
  { startHour: 18, endHour: 20 },
];

const DAILY_FOCUS = [
  "Shravan and attentive listening to katha",
  "Japa, naam-smaran, and inner steadiness",
  "Seva through humility and gratitude",
  "Satsang participation with family discipline",
  "Scriptural study and reflection",
  "Bhajan, devotion, and emotional purity",
  "Silence, self-review, and spiritual reset",
];

interface LabelValue {
  label: string;
  value: string;
}

interface TitleDesc {
  title: string;
  desc: string;
}

interface ScheduleItem {
  title: string;
  window: string;
  detail: string;
}

export default memo(function SpiritualPage() {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = (t("missionPages.spiritual.stats", { returnObjects: true }) as LabelValue[]) ?? STATS;
  const schedule = (t("missionPages.spiritual.schedule", { returnObjects: true }) as ScheduleItem[]) ?? [];
  const pillars = (t("missionPages.spiritual.pillars", { returnObjects: true }) as TitleDesc[]) ?? [];
  const deliveryItems = (t("missionPages.spiritual.deliveryItems", { returnObjects: true }) as string[]) ?? [];
  const dailyFocuses = (t("missionPages.spiritual.dailyFocuses", { returnObjects: true }) as string[]) ?? DAILY_FOCUS;

  const resolvedSchedule = SPIRITUAL_SCHEDULE.map((item, index) => ({
    ...item,
    title: schedule[index]?.title ?? "",
    window: schedule[index]?.window ?? "",
    detail: schedule[index]?.detail ?? "",
  }));

  const currentHour = now.getHours();
  const activeSessionIndex = resolvedSchedule.findIndex(
    (item) => currentHour >= item.startHour && currentHour < item.endHour,
  );
  const nextSessionIndex = resolvedSchedule.findIndex((item) => currentHour < item.startHour);
  const spiritualFocus = dailyFocuses[now.getDay()] ?? DAILY_FOCUS[now.getDay()];

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
              <h1 className="text-4xl font-black leading-tight md:text-6xl">{t("missionPages.spiritual.title")}</h1>
              <p className="mt-4 text-lg text-white/95 md:text-2xl">{t("missionPages.spiritual.subtitle")}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.donate} className="rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]">
                  {t("missionPages.spiritual.donate")}
                </Link>
                <Link to={ROUTES.involved.volunteer} className="rounded-lg bg-white px-6 py-3 font-semibold text-[#0B2230] transition-colors hover:bg-[#eef4f7]">
                  {t("missionPages.common.becomeVolunteer")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-[#12394A] p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-[#F59E0B]">{item.value}</p>
              <p className="mt-1 text-sm text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.spiritual.liveFeature")}</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">{t("missionPages.spiritual.monitorTitle")}</h2>
            <div className="mt-6 grid gap-4">
              {resolvedSchedule.map((item, index) => {
                const isActive = activeSessionIndex === index;
                const isNext = !isActive && (nextSessionIndex === index || (nextSessionIndex === -1 && index === 0));

                return (
                  <div key={`${item.title}-${item.window}`} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-[#dce7ec]">{item.detail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#F59E0B]">{item.window}</p>
                        <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                          isActive
                            ? "bg-[#F59E0B] text-white"
                            : isNext
                              ? "bg-white text-[#0B2230]"
                              : "bg-[#12394A] text-[#dce7ec]"
                        }`}>
                          {isActive
                            ? t("missionPages.spiritual.status.liveNow")
                            : isNext
                              ? t("missionPages.spiritual.status.nextSession")
                              : t("missionPages.spiritual.status.scheduled")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.spiritual.todayFocus")}</p>
              <h2 className="mt-2 text-3xl font-black text-white">{t("missionPages.spiritual.dailyDirection")}</h2>
              <p className="mt-4 text-lg leading-8 text-white">{spiritualFocus}</p>
              <p className="mt-4 text-sm text-[#dce7ec]">
                {t("missionPages.common.updatedOn", {
                  date: now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                  time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                })}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.spiritual.upgrade")}</p>
              <h2 className="mt-2 text-3xl font-black text-white">{t("missionPages.spiritual.deliveryLayers")}</h2>
              <ul className="mt-4 space-y-3 text-[#dce7ec]">
                {deliveryItems.map((item) => (
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
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <h2 className="text-4xl font-black text-[#F59E0B]">{t("missionPages.spiritual.aboutTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.spiritual.aboutText1")}</p>
            <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.spiritual.aboutText2")}</p>
          </div>
          <div className="grid gap-4">
            {SPIRITUAL_PILLARS.map((item, index) => (
              <div key={item.href} className="rounded-2xl border border-white/10 bg-[#12394A] p-5">
                <h3 className="text-2xl font-black text-white">{pillars[index]?.title}</h3>
                <p className="mt-2 leading-7 text-[#dce7ec]">{pillars[index]?.desc}</p>
                <Link to={item.href} className="mt-4 inline-flex rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de930a]">
                  {t("missionPages.common.explore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
