import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";

type MissionCategory = "food" | "water" | "health" | "education" | "essentials";

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png";

const STATS = [
  { label: "Families Supported", value: "50,000+" },
  { label: "Meals Distributed", value: "1,00,000+" },
  { label: "Water Support", value: "850+" },
  { label: "Medical Cases", value: "12,000+" },
];

const ACTIVITIES = [
  { category: "food" as const, href: ROUTES.donate },
  { category: "water" as const, href: ROUTES.seva.annJal },
  { category: "health" as const, href: ROUTES.seva.medicine },
  { category: "education" as const, href: ROUTES.seva.education },
  { category: "essentials" as const, href: ROUTES.involved.index },
];

const LIVE_OPERATIONS = [
  { statusKey: "day" },
  { statusKey: "day" },
  { statusKey: "day" },
  { statusKey: "always" },
];

interface LabelValue {
  label: string;
  value: string;
}

interface ActivityContent {
  title: string;
  desc: string;
  frequency: string;
  beneficiaries: string;
}

interface OperationContent {
  title: string;
  activeHours: string;
  detail: string;
}

export default memo(function SocialPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<MissionCategory | "all">("all");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const stats = (t("missionPages.social.stats", { returnObjects: true }) as LabelValue[]) ?? STATS;
  const activities = (t("missionPages.social.activities", { returnObjects: true }) as ActivityContent[]) ?? [];
  const operations = (t("missionPages.social.operations", { returnObjects: true }) as OperationContent[]) ?? [];
  const actionItems = (t("missionPages.social.actionItems", { returnObjects: true }) as string[]) ?? [];
  const planningCards = (t("missionPages.social.planningCards", { returnObjects: true }) as { title: string; desc: string }[]) ?? [];
  const categories = [
    { key: "all" as const, label: t("missionPages.social.categories.all") },
    { key: "food" as const, label: t("missionPages.social.categories.food") },
    { key: "water" as const, label: t("missionPages.social.categories.water") },
    { key: "health" as const, label: t("missionPages.social.categories.health") },
    { key: "education" as const, label: t("missionPages.social.categories.education") },
    { key: "essentials" as const, label: t("missionPages.social.categories.essentials") },
  ];

  const resolvedActivities = ACTIVITIES.map((item, index) => ({
    ...item,
    title: activities[index]?.title ?? "",
    desc: activities[index]?.desc ?? "",
    frequency: activities[index]?.frequency ?? "",
    beneficiaries: activities[index]?.beneficiaries ?? "",
  }));

  const resolvedOperations = LIVE_OPERATIONS.map((item, index) => ({
    ...item,
    title: operations[index]?.title ?? "",
    activeHours: operations[index]?.activeHours ?? "",
    detail: operations[index]?.detail ?? "",
  }));

  const visibleActivities = useMemo(() => {
    if (activeCategory === "all") return resolvedActivities;
    return resolvedActivities.filter((item) => item.category === activeCategory);
  }, [activeCategory, resolvedActivities]);

  const serviceMode = useMemo(() => {
    const hour = now.getHours();
    if (hour >= 7 && hour < 18) return t("missionPages.social.operationStatus.fieldActive");
    if (hour >= 18 && hour < 22) return t("missionPages.social.operationStatus.reviewPlanning");
    return t("missionPages.social.operationStatus.standby");
  }, [now, t]);

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
              <h1 className="text-4xl font-black leading-tight md:text-6xl">{t("missionPages.social.title")}</h1>
              <p className="mt-4 text-lg text-white/95 md:text-2xl">{t("missionPages.social.subtitle")}</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.donate} className="rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]">
                  {t("missionPages.social.donate")}
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.social.liveFeature")}</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">{t("missionPages.social.boardTitle")}</h2>
            <div className="mt-6 grid gap-4">
              {resolvedOperations.map((item, index) => {
                const live = LIVE_OPERATIONS[index].statusKey === "always" || serviceMode === t("missionPages.social.operationStatus.fieldActive");

                return (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black text-white">{item.title}</h3>
                        <p className="mt-2 text-[#dce7ec]">{item.detail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#F59E0B]">{item.activeHours}</p>
                        <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                          live ? "bg-[#F59E0B] text-white" : "bg-white text-[#0B2230]"
                        }`}>
                          {live ? t("missionPages.social.operationStatus.operational") : t("missionPages.social.operationStatus.queued")}
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.social.snapshot")}</p>
              <h2 className="mt-2 text-3xl font-black text-white">{t("missionPages.social.missionStatus")}</h2>
              <p className="mt-4 text-2xl font-black text-[#F59E0B]">{serviceMode}</p>
              <p className="mt-3 text-[#dce7ec]">
                {t("missionPages.common.updatedOn", {
                  date: now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
                  time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
                })}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">{t("missionPages.social.actionLayers")}</p>
              <ul className="mt-4 space-y-3 text-[#dce7ec]">
                {actionItems.map((item) => (
                  <li key={item} className="rounded-2xl bg-[#0f3140] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <h2 className="text-4xl font-black text-[#F59E0B]">{t("missionPages.social.aboutTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.social.aboutText1")}</p>
            <p className="mt-4 text-lg leading-relaxed text-white">{t("missionPages.social.aboutText2")}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <h2 className="text-3xl font-black text-[#F59E0B]">{t("missionPages.social.filterTitle")}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category.key
                      ? "border-[#F59E0B] bg-[#F59E0B] text-white"
                      : "border-white/10 bg-[#0f3140] text-white hover:border-[#F59E0B]/45"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="space-y-4">
          {visibleActivities.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-[#12394A] p-5 shadow-md">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-3xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-lg text-[#dce7ec]">{item.desc}</p>
                  <p className="mt-2 text-sm text-[#F59E0B]">
                    {t("missionPages.social.frequencyPrefix")}: {item.frequency} | {t("missionPages.social.beneficiariesPrefix")}: {item.beneficiaries}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={item.href} className="rounded-lg bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de930a]">
                    {t("missionPages.social.buttons.donate")}
                  </Link>
                  <Link to={ROUTES.involved.volunteer} className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0B2230] transition-colors hover:bg-[#eef4f7]">
                    {t("missionPages.social.buttons.join")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {planningCards.map((item) => (
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
