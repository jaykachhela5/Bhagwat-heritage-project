import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_HERO_SUBTITLE_CLASS,
  ABOUT_HERO_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "./aboutTypography";

const CORE_AREA_HREFS = [
  ROUTES.eventsKatha.bhagwatKatha,
  ROUTES.seva.annJal,
  ROUTES.mission.cultural,
  ROUTES.knowledge.pathshala,
];

const WHAT_WE_DO_ITEMS = [
  { title: "Gau Seva", href: ROUTES.seva.gau },
  { title: "Jal Seva", href: ROUTES.seva.jal },
  { title: "Ann Seva", href: ROUTES.seva.ann },
  { title: "Chikitsa Seva", href: ROUTES.seva.medicine },
  { title: "Education Support", href: ROUTES.seva.education },
  { title: "Scholarship Program", href: ROUTES.seva.scholarship },
  { title: "Kanyadaan Seva", href: ROUTES.seva.kanyadaan },
  { title: "Vyasanmukti Abhiyan", href: ROUTES.seva.vyasanmukti },
  { title: "Disaster Relief", href: ROUTES.seva.disasterRelief },
] as const;

interface VisionCard { title: string; desc: string; }
interface CoreArea { title: string; desc: string; linkLabel: string; }
interface Milestone { year: string; title: string; desc: string; }
interface FutureCard { title: string; desc: string; }

const VISION_ICONS = ["🕉️", "🌱", "🌏"];
const FUTURE_ICONS = ["🛕", "📡", "🌟"];

const SECTION_LABEL = `${ABOUT_SECTION_LABEL_CLASS} text-[#C46D1A]`;
const SECTION_HEADING = `${ABOUT_SECTION_HEADING_CLASS} text-[#1D4F63]`;
const BODY_TEXT = `${ABOUT_BODY_CLASS} text-[#51463C]`;
const CARD_TITLE = `${ABOUT_CARD_TITLE_CLASS} text-[#27657A]`;
const CARD_BODY = `${ABOUT_BODY_CLASS} text-[#51463C]`;
const FOOTER_CARD_BG = "bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,247,233,0.98)_100%)]";
const FOOTER_CARD_BG_SOFT = "bg-[linear-gradient(180deg,rgba(255,248,236,0.98)_0%,rgba(243,232,214,0.86)_100%)]";
const PALE_CARD_TEXT = "text-[#1D4F63]";
const PALE_CARD_MUTED = "text-[#5E5247]";
const CARD_SHELL =
  "border border-[#D8C3A2] shadow-[0_18px_38px_rgba(101,71,35,0.08)]";
const CARD_HOVER =
  "transition-all duration-300 hover:-translate-y-1 hover:border-[#D08A32] hover:shadow-[0_22px_42px_rgba(196,109,26,0.14)]";
const SECTION_SHELL_GOLD =
  "rounded-[30px] border border-[#E7D3B5] bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] shadow-[0_22px_52px_rgba(101,71,35,0.09)]";
const SECTION_SHELL_BLUE =
  "rounded-[30px] border border-[#D8E4E5] bg-[linear-gradient(180deg,rgba(230,241,240,0.85)_0%,rgba(255,252,247,0.98)_56%,rgba(250,241,225,0.9)_100%)] shadow-[0_22px_52px_rgba(29,79,99,0.08)]";
const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-xl bg-[#1D5B72] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(29,91,114,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#27657A]";
const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-xl bg-[#E4B45E] px-6 py-3 font-semibold text-[#33210F] shadow-[0_14px_28px_rgba(212,150,63,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#D08A32]";
const TERTIARY_BUTTON =
  "inline-flex items-center justify-center rounded-xl bg-[#B8502D] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(184,80,45,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#983f22]";

const divider = (
  <div className="max-w-6xl mx-auto px-4 py-2">
    <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full" />
  </div>
);

export default memo(function AboutPage() {
  const { t } = useTranslation();
  usePageMeta(t("about.meta.title"), t("about.meta.description"));

  const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

  const visionCards = asArray<VisionCard>(t("aboutPage.visionCards", { returnObjects: true }));
  const coreAreas = asArray<CoreArea>(t("aboutPage.coreAreas", { returnObjects: true }));
  const humanitarianItems = asArray<string>(t("aboutPage.humanitarianItems", { returnObjects: true }));
  const milestones = asArray<Milestone>(t("aboutPage.milestones", { returnObjects: true }));
  const futureCards = asArray<FutureCard>(t("aboutPage.futureCards", { returnObjects: true }));
  const introPara3 = t("aboutPage.introPara3");

  return (
    <div className="bg-[radial-gradient(circle_at_top_right,_rgba(228,180,94,0.22)_0%,_rgba(228,180,94,0)_30%),radial-gradient(circle_at_left_center,_rgba(39,101,122,0.12)_0%,_rgba(39,101,122,0)_28%),linear-gradient(180deg,_#FFF9F1_0%,_#FFFDF8_44%,_#F6EAD4_100%)] text-[#1D4F63]">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[28px] px-5 py-8 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:min-h-[520px] md:px-12 md:py-12"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,34,48,0.08) 0%, rgba(11,34,48,0.34) 42%, rgba(11,34,48,0.92) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%)]" />
          <div className="relative z-10 flex flex-col items-center justify-end gap-[2px]">
            <h1 className={`${ABOUT_HERO_TITLE_CLASS} whitespace-nowrap text-[clamp(1.1rem,3.1vw,3.8rem)] leading-tight text-white`}>
              {t("aboutPage.heroTitle")}
            </h1>
            <p className="mx-auto max-w-none whitespace-nowrap text-[40px] font-bold leading-tight text-white/95">
              {t("aboutPage.heroTagline")}
            </p>
            <p className={`${ABOUT_HERO_SUBTITLE_CLASS} mx-auto max-w-none whitespace-nowrap text-[clamp(0.9rem,1.35vw,1.5rem)] text-white/90`}>
              {t("aboutPage.heroSubtagline")}
            </p>
            <div className="mt-[2px] flex flex-wrap justify-center gap-[8px]">
              <Link to={ROUTES.donate} className={TERTIARY_BUTTON}>
                {t("aboutPage.supportMission")}
              </Link>
              <Link to={ROUTES.involved.volunteer} className={PRIMARY_BUTTON}>
                {t("aboutPage.becomeVolunteer")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      {/* ── Introduction ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4">
        <div className={`${SECTION_SHELL_GOLD} p-5 md:p-8`}>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10">
            <div className={`rounded-2xl ${FOOTER_CARD_BG} ${CARD_SHELL} p-3`}>
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png"
                alt={t("aboutPage.introHeading")}
                className="w-full h-[260px] md:h-[340px] object-cover rounded-xl"
              />
            </div>
            <div className={`rounded-2xl ${FOOTER_CARD_BG} ${CARD_SHELL} p-6 md:p-8`}>
              <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.introEyebrow")}</p>
              <h2 className={`${SECTION_HEADING} mb-5 leading-tight`}>{t("aboutPage.introHeading")}</h2>
              <div className={`space-y-4 ${ABOUT_BODY_CLASS} ${PALE_CARD_MUTED}`}>
                <p>{t("aboutPage.introPara1")}</p>
                <p>{t("aboutPage.introPara2")}</p>
                {introPara3 ? <p>{introPara3}</p> : null}
              </div>
              <Link to={ROUTES.about.objectives} className={`mt-6 ${PRIMARY_BUTTON}`}>
                {t("aboutPage.viewObjectives")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inspiration Behind the Mission ────────────────────────────── */}
      <section className="py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`${SECTION_SHELL_GOLD} p-6 md:p-8`}>
            <div className="text-center mb-10">
              <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.coreAreasEyebrow")}</p>
              <h2 className={`${SECTION_HEADING} mb-3`}>{t("aboutPage.coreAreasHeading")}</h2>
            </div>
            <div className={`mb-2 w-full rounded-2xl ${FOOTER_CARD_BG_SOFT} ${CARD_SHELL} ${CARD_HOVER} p-6 text-center md:p-8`}>
              <h3 className={`${CARD_TITLE} mb-4`}>{t("aboutPage.whoWeAreHeading")}</h3>
              <div className={`space-y-4 ${BODY_TEXT}`}>
                <p>{t("aboutPage.whoWeArePara1")}</p>
                <p>{t("aboutPage.whoWeArePara2")}</p>
                <p>{t("aboutPage.whoWeArePara3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className={`${SECTION_SHELL_BLUE} p-6 md:p-8`}>
          <div className="text-center mb-10">
            <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.visionEyebrow")}</p>
            <h2 className={SECTION_HEADING}>{t("aboutPage.visionHeading")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visionCards.map((v, i) => (
              <div key={v.title} className={`${FOOTER_CARD_BG} ${CARD_SHELL} ${CARD_HOVER} rounded-2xl p-6`}>
                <div className="text-4xl mb-4">{VISION_ICONS[i]}</div>
                <h3 className={`${CARD_TITLE} mb-3`}>{v.title}</h3>
                <p className={`${ABOUT_BODY_CLASS} ${PALE_CARD_MUTED}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className={`max-w-4xl mx-auto px-4 text-center ${SECTION_SHELL_GOLD} p-6 md:p-10`}>
          <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.inspirationEyebrow")}</p>
          <h2 className={`${SECTION_HEADING} mb-8`}>{t("aboutPage.inspirationHeading")}</h2>
          <div className={`space-y-5 ${BODY_TEXT}`}>
            <p>{t("aboutPage.inspirationPara1")}</p>
            <p>{t("aboutPage.inspirationPara2")}</p>
            <p>{t("aboutPage.inspirationPara3")}</p>
          </div>
          <div className={`mt-8 inline-flex items-center gap-3 rounded-2xl ${FOOTER_CARD_BG_SOFT} ${CARD_SHELL} px-6 py-4`}>
            <span className="text-3xl">📜</span>
            <p className="text-[#C46D1A] font-semibold italic text-base md:text-lg text-left">
              {t("aboutPage.inspirationQuote")}
            </p>
          </div>
        </div>
      </section>

      {/* ── The Vision ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={`rounded-2xl ${FOOTER_CARD_BG} ${CARD_SHELL} p-3`}>
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png"
              alt={t("aboutPage.buildingCultureHeading")}
              className="w-full h-[260px] md:h-[340px] object-cover rounded-xl"
            />
          </div>
          <div>
            <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.buildingCultureEyebrow")}</p>
            <h2 className={`${SECTION_HEADING} mb-5 leading-tight`}>{t("aboutPage.buildingCultureHeading")}</h2>
            <div className={`space-y-4 ${BODY_TEXT}`}>
              <p>{t("aboutPage.buildingCulturePara1")}</p>
              <p>{t("aboutPage.buildingCulturePara2")}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className={PRIMARY_BUTTON}>
                {t("aboutPage.joinVolunteer")}
              </Link>
              <Link to={ROUTES.seva.annJal} className={SECONDARY_BUTTON}>
                {t("aboutPage.exploreSeva")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <div className={`rounded-2xl ${FOOTER_CARD_BG_SOFT} ${CARD_SHELL} p-6 md:p-8`}>
          <div className="text-center">
            <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.whatWeDoHeading")}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO_ITEMS.map((item) => (
              <div
                key={item.title}
                className={`flex flex-col rounded-2xl ${FOOTER_CARD_BG} ${CARD_SHELL} ${CARD_HOVER} px-5 py-5 text-center`}
              >
                <p className={`text-base font-semibold ${PALE_CARD_TEXT}`}>{item.title}</p>
                <Link
                  to={item.href}
                className={`${PRIMARY_BUTTON} mt-4 rounded-lg px-4 py-2 text-sm shadow-[0_10px_20px_rgba(31,115,160,0.14)]`}
                >
                  Related Page
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to={ROUTES.seva.index}
              className={SECONDARY_BUTTON}
            >
              {t("aboutPage.exploreSeva")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="hidden" aria-hidden="true">
        <div className="text-center mb-10">
          <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.visionEyebrow")}</p>
          <h2 className={SECTION_HEADING}>{t("aboutPage.visionHeading")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionCards.map((v, i) => (
            <div key={v.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all">
              <div className="text-4xl mb-4">{VISION_ICONS[i]}</div>
              <h3 className={`${CARD_TITLE} mb-3`}>{v.title}</h3>
              <p className={CARD_BODY}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sant Manish Bhaiji's Role ──────────────────────────────────── */}
      <section className="py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`${SECTION_SHELL_BLUE} grid grid-cols-1 items-center gap-10 p-6 md:grid-cols-2 md:p-8`}>
            <div className="order-2 md:order-2">
              <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.santRoleEyebrow")}</p>
              <div className={`space-y-4 ${BODY_TEXT}`}>
                <p className="text-xl font-bold text-[#529CB0] md:text-2xl">{t("aboutPage.santRolePara1")}</p>
                <p>{t("aboutPage.santRolePara2")}</p>
                <p>{t("aboutPage.santRolePara3")}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.about.founder} className={`${PRIMARY_BUTTON} shrink-0`}>
                  {t("aboutPage.learnAboutFounder")}
                </Link>
                <Link to={ROUTES.media.videos} className={`${SECONDARY_BUTTON} shrink-0`}>
                  {t("aboutPage.watchPravachan")}
                </Link>
                <Link to={ROUTES.digital.guidance} className={`${TERTIARY_BUTTON} shrink-0`}>
                  {t("aboutPage.seekGuidance")}
                </Link>
              </div>
            </div>
            <div className={`order-1 md:order-1 rounded-2xl ${FOOTER_CARD_BG} ${CARD_SHELL} p-3`}>
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
      <section className="hidden" aria-hidden="true">
        <div className="text-center mb-10">
          <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.coreAreasEyebrow")}</p>
          <h2 className={`${SECTION_HEADING} mb-3`}>{t("aboutPage.coreAreasHeading")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreAreas.map((area, i) => (
            <div key={area.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all group">
              <h3 className={`${CARD_TITLE} mb-3`}>{area.title}</h3>
              <p className={`${CARD_BODY} mb-4`}>{area.desc}</p>
              <Link to={CORE_AREA_HREFS[i]} className="text-sm font-semibold text-[#F59E0B] hover:text-white transition-colors group-hover:underline">
                {area.linkLabel} →
              </Link>
            </div>
          ))}
        </div>

        {/* Humanitarian initiatives list */}
        <div className="mt-8 rounded-2xl bg-[#0e2a3a] border border-white/10 p-6 md:p-8">
          <h3 className={`${CARD_TITLE} mb-4`}>{t("aboutPage.humanitarianHeading")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {humanitarianItems.map((item) => (
              <div key={item} className="flex items-start gap-2 bg-[#12394A] rounded-lg px-4 py-3 border border-white/10">
                <span className="text-[#F59E0B] font-bold mt-0.5 shrink-0">✦</span>
                <span className={`${ABOUT_BODY_CLASS} text-white/85`}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seva Programs Grid ─────────────────────────────────────────── */}
      

      {/* ── Building a Culture of Service and Devotion ────────────────── */}
      <section className="hidden" aria-hidden="true">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.buildingCultureEyebrow")}</p>
            <h2 className={`${SECTION_HEADING} mb-5 leading-tight`}>{t("aboutPage.buildingCultureHeading")}</h2>
            <div className={`space-y-4 ${BODY_TEXT}`}>
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
      <section className="py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`${SECTION_LABEL} text-center mb-10`}>{t("aboutPage.journeyTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((step) => (
              <div key={`${step.year}-${step.title}`} className={`rounded-xl ${FOOTER_CARD_BG} ${CARD_SHELL} ${CARD_HOVER} p-5 flex gap-4`}>
                <p className="text-[#C46D1A] font-black text-lg shrink-0 w-12">{step.year}</p>
                <div>
                  <h3 className={`font-bold text-base ${PALE_CARD_TEXT}`}>{step.title}</h3>
                  <p className={`${ABOUT_BODY_CLASS} mt-1 ${PALE_CARD_MUTED}`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision for the Future ─────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className={`rounded-[28px] ${SECTION_SHELL_BLUE} p-8 md:p-12`}>
          <div className="text-center mb-8">
            <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.futureEyebrow")}</p>
            <h2 className={`${SECTION_HEADING} mb-4`}>{t("aboutPage.futureHeading")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {futureCards.map((f, i) => (
              <div key={f.title} className={`${FOOTER_CARD_BG} ${CARD_SHELL} ${CARD_HOVER} rounded-2xl p-6`}>
                <div className="text-4xl mb-3">{FUTURE_ICONS[i]}</div>
                <h3 className={`${CARD_TITLE} mb-2`}>{f.title}</h3>
                <p className={`${ABOUT_BODY_CLASS} ${PALE_CARD_MUTED}`}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p className={`${ABOUT_BODY_CLASS} text-center ${PALE_CARD_MUTED} mt-8 max-w-3xl mx-auto`}>
            {t("aboutPage.futureParagraph")}
          </p>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      

      {/* ── Invitation to Participate ─────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-4xl mx-auto px-4 text-center">
        <p className={`${SECTION_LABEL} mb-3`}>{t("aboutPage.invitationEyebrow")}</p>
        <h2 className={`${SECTION_HEADING} mb-6`}>{t("aboutPage.invitationHeading")}</h2>
        <div className={`space-y-4 ${BODY_TEXT}`}>
          <p>{t("aboutPage.invitationPara1")}</p>
          <p>{t("aboutPage.invitationPara2")}</p>
          <p className="text-[#C46D1A] font-semibold italic text-lg">
            &ldquo;{t("aboutPage.invitationQuote")}&rdquo;
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="pb-16 px-4">
        <div className={`max-w-5xl mx-auto rounded-2xl ${SECTION_SHELL_GOLD} p-8 md:p-10 text-center`}>
          <h2 className={`${ABOUT_SECTION_HEADING_CLASS} mb-2 text-[#1D4F63]`}>{t("aboutPage.ctaTitle")}</h2>
          <p className={`${ABOUT_BODY_CLASS} ${PALE_CARD_MUTED} max-w-3xl mx-auto mb-8 mt-3`}>{t("aboutPage.ctaDesc")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.involved.volunteer} className={PRIMARY_BUTTON}>
              {t("aboutPage.ctaVolunteer")}
            </Link>
            <Link to={ROUTES.donate} className={TERTIARY_BUTTON}>
              {t("aboutPage.ctaSupport")}
            </Link>
            <Link to={ROUTES.eventsKatha.bhagwatKatha} className={SECONDARY_BUTTON}>
              {t("aboutPage.ctaPrograms")}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
});
