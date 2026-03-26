import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const SEVA_MEDIA = [
  { href: ROUTES.seva.gau, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png" },
  { href: ROUTES.seva.annJal, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png" },
  { href: ROUTES.seva.education, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png" },
  { href: ROUTES.seva.medicine, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png" },
  { href: ROUTES.seva.vyasanmukti, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/vyasanmukti_xa9hif.png" },
  { href: ROUTES.seva.kanyadaan, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583758/kanyadan_ftf9oc.png" },
];

const CORE_AREA_HREFS = [
  ROUTES.eventsKatha.bhagwatKatha,
  ROUTES.seva.annJal,
  ROUTES.mission.cultural,
  ROUTES.knowledge.pathshala,
];

const LEADERS = [
  { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png", href: ROUTES.about.founder, nameKey: "S.S. Manish Bhai Ji" },
  { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png", href: ROUTES.about.structure, nameKey: "Trust Committee" },
  { image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png", href: ROUTES.involved.volunteer, nameKey: "Seva Volunteers" },
];

interface VisionCard { title: string; desc: string; }
interface CoreArea { title: string; desc: string; linkLabel: string; }
interface Milestone { year: string; title: string; desc: string; }
interface FutureCard { title: string; desc: string; }
interface HighlightItem { label: string; value: string; }

const VISION_ICONS = ["🕉️", "🌱", "🌏"];
const FUTURE_ICONS = ["🛕", "📡", "🌟"];

const divider = (
  <div className="max-w-6xl mx-auto px-4 py-2">
    <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full" />
  </div>
);

export default memo(function AboutPage() {
  const { t } = useTranslation();
  usePageMeta(t("about.meta.title"), t("about.meta.description"));

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  const highlights = asArray<HighlightItem>(t("about.highlights", { returnObjects: true }));
  const visionCards = asArray<VisionCard>(t("aboutPage.visionCards", { returnObjects: true }));
  const coreAreas = asArray<CoreArea>(t("aboutPage.coreAreas", { returnObjects: true }));
  const humanitarianItems = asArray<string>(t("aboutPage.humanitarianItems", { returnObjects: true }));
  const milestones = asArray<Milestone>(t("aboutPage.milestones", { returnObjects: true }));
  const futureCards = asArray<FutureCard>(t("aboutPage.futureCards", { returnObjects: true }));
  const leadershipRoles = asArray<string>(t("aboutPage.leadershipRoles", { returnObjects: true }));
  const sevaLabels = asArray<string>(t("about.sevaLabels", { returnObjects: true }));

  return (
    <div className="bg-[#0B2230] text-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[28px] text-center text-white px-5 py-14 md:px-12 md:py-20 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(11,34,48,0.9) 0%, rgba(11,34,48,0.7) 45%, rgba(245,158,11,0.28) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%)]" />
          <div className="relative z-10">
            <p className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-sm mb-6 bg-white/10">
              {t("about.heroBadge")}
            </p>
            <h1 className="text-3xl md:text-6xl font-black mb-4">{t("aboutPage.heroTitle")}</h1>
            <p className="text-lg md:text-2xl font-medium text-white/90 max-w-3xl mx-auto">
              {t("aboutPage.heroTagline")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-bold px-7 py-3 rounded-xl transition-colors">
                {t("aboutPage.supportMission")}
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block border border-white/25 bg-white/10 text-white font-bold px-7 py-3 rounded-xl hover:bg-white/15 transition-colors">
                {t("aboutPage.becomeVolunteer")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#12394A] border border-white/10 p-4 md:p-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
              <p className="text-3xl md:text-5xl font-extrabold text-[#F59E0B]">{item.value}</p>
              <p className="text-sm md:text-base text-white/80 mt-1.5">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl bg-[#12394A] p-3 border border-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png"
              alt={t("aboutPage.introHeading")}
              className="w-full h-[260px] md:h-[340px] object-cover rounded-xl"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.introEyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">{t("aboutPage.introHeading")}</h2>
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>{t("aboutPage.introPara1")}</p>
              <p>{t("aboutPage.introPara2")}</p>
              <p>{t("aboutPage.introPara3")}</p>
            </div>
            <Link to={ROUTES.about.objectives} className="inline-block mt-6 bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
              {t("aboutPage.viewObjectives")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Inspiration Behind the Mission ────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.inspirationEyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{t("aboutPage.inspirationHeading")}</h2>
          <div className="space-y-5 text-white/80 text-base md:text-lg leading-relaxed">
            <p>{t("aboutPage.inspirationPara1")}</p>
            <p>{t("aboutPage.inspirationPara2")}</p>
            <p>{t("aboutPage.inspirationPara3")}</p>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#12394A] px-6 py-4">
            <span className="text-3xl">📜</span>
            <p className="text-[#F59E0B] font-semibold italic text-base md:text-lg text-left">
              {t("aboutPage.inspirationQuote")}
            </p>
          </div>
        </div>
      </section>

      {/* ── The Vision ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.visionEyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">{t("aboutPage.visionHeading")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionCards.map((v, i) => (
            <div key={v.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all">
              <div className="text-4xl mb-4">{VISION_ICONS[i]}</div>
              <h3 className="text-xl font-black text-[#F59E0B] mb-3">{v.title}</h3>
              <p className="text-white/80 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sant Manish Bhaiji's Role ──────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.santRoleEyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">{t("aboutPage.santRoleHeading")}</h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>{t("aboutPage.santRolePara1")}</p>
                <p>{t("aboutPage.santRolePara2")}</p>
                <p>{t("aboutPage.santRolePara3")}</p>
              </div>
              <Link to={ROUTES.about.founder} className="inline-block mt-6 bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
                {t("aboutPage.learnAboutFounder")}
              </Link>
            </div>
            <div className="order-1 md:order-2 rounded-2xl bg-[#12394A] p-3 border border-white/10">
              <img
                src="/images/manish2.PNG"
                alt={t("aboutPage.santRoleHeading")}
                className="w-full h-[280px] md:h-[380px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Areas of Work ────────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.coreAreasEyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t("aboutPage.coreAreasHeading")}</h2>
          <p className="text-white/70 max-w-2xl mx-auto">{t("aboutPage.coreAreasSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreAreas.map((area, i) => (
            <div key={area.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all group">
              <h3 className="text-xl font-black text-[#F59E0B] mb-3">{area.title}</h3>
              <p className="text-white/80 leading-relaxed mb-4">{area.desc}</p>
              <Link to={CORE_AREA_HREFS[i]} className="text-sm font-semibold text-[#F59E0B] hover:text-white transition-colors group-hover:underline">
                {area.linkLabel} →
              </Link>
            </div>
          ))}
        </div>

        {/* Humanitarian initiatives list */}
        <div className="mt-8 rounded-2xl bg-[#0e2a3a] border border-white/10 p-6 md:p-8">
          <h3 className="text-xl font-black text-[#F59E0B] mb-4">{t("aboutPage.humanitarianHeading")}</h3>
          <p className="text-white/70 mb-5 leading-relaxed">{t("aboutPage.humanitarianDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {humanitarianItems.map((item) => (
              <div key={item} className="flex items-start gap-2 bg-[#12394A] rounded-lg px-4 py-3 border border-white/10">
                <span className="text-[#F59E0B] font-bold mt-0.5 shrink-0">✦</span>
                <span className="text-white/85 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seva Programs Grid ─────────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("aboutPage.sevaTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {SEVA_MEDIA.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className="bg-[#12394A] rounded-2xl p-4 text-center border border-white/10 hover:border-[#F59E0B] hover:shadow-md transition-all"
              >
                <img src={item.image} alt={sevaLabels[i]} className="h-20 w-20 rounded-xl object-cover mx-auto mb-3" loading="lazy" />
                <p className="font-semibold text-white text-sm">{sevaLabels[i]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Building a Culture of Service and Devotion ────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.buildingCultureEyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">{t("aboutPage.buildingCultureHeading")}</h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>{t("aboutPage.buildingCulturePara1")}</p>
              <p>{t("aboutPage.buildingCulturePara2")}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-5 py-2.5 rounded-md transition-colors">
                {t("aboutPage.joinVolunteer")}
              </Link>
              <Link to={ROUTES.seva.annJal} className="inline-block border border-white/25 bg-white/10 text-white font-semibold px-5 py-2.5 rounded-md hover:bg-white/15 transition-colors">
                {t("aboutPage.exploreSeva")}
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-[#12394A] p-3 border border-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png"
              alt={t("aboutPage.buildingCultureHeading")}
              className="w-full h-[260px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones ──────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("aboutPage.journeyTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((step) => (
              <div key={`${step.year}-${step.title}`} className="rounded-xl bg-[#12394A] border border-white/10 p-5 flex gap-4">
                <p className="text-[#F59E0B] font-black text-lg shrink-0 w-12">{step.year}</p>
                <div>
                  <h3 className="text-white font-bold text-base">{step.title}</h3>
                  <p className="text-white/70 mt-1 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision for the Future ─────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#12394A_0%,#0e2a3a_100%)] border border-[#F59E0B]/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.futureEyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t("aboutPage.futureHeading")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {futureCards.map((f, i) => (
              <div key={f.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-4xl mb-3">{FUTURE_ICONS[i]}</div>
                <h3 className="text-lg font-black text-[#F59E0B] mb-2">{f.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/70 mt-8 max-w-3xl mx-auto leading-relaxed">
            {t("aboutPage.futureParagraph")}
          </p>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("aboutPage.leadershipTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERS.map((person, i) => (
              <div key={person.nameKey} className="bg-[#12394A] rounded-xl p-6 text-center border border-white/10">
                <img src={person.image} alt={person.nameKey} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                <h3 className="font-bold text-white">{person.nameKey}</h3>
                <p className="text-sm text-white/70 mb-4">{leadershipRoles[i]}</p>
                <Link to={person.href} className="inline-block rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d88908] transition-colors">
                  {t("about.learnMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Invitation to Participate ─────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">{t("aboutPage.invitationEyebrow")}</p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">{t("aboutPage.invitationHeading")}</h2>
        <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
          <p>{t("aboutPage.invitationPara1")}</p>
          <p>{t("aboutPage.invitationPara2")}</p>
          <p className="text-[#F59E0B] font-semibold italic text-lg">
            &ldquo;{t("aboutPage.invitationQuote")}&rdquo;
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#F59E0B]/20 bg-[#12394A] p-8 md:p-10 text-center shadow-lg">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{t("aboutPage.ctaTitle")}</h2>
          <p className="text-white/75 max-w-3xl mx-auto mb-8 mt-3">{t("aboutPage.ctaDesc")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              {t("aboutPage.ctaVolunteer")}
            </Link>
            <Link to={ROUTES.donate} className="inline-block bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              {t("aboutPage.ctaSupport")}
            </Link>
            <Link to={ROUTES.eventsKatha.bhagwatKatha} className="inline-block border border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B]/10 font-bold px-8 py-3.5 rounded-xl transition-colors">
              {t("aboutPage.ctaPrograms")}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
});
