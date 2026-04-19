import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_HERO_SUBTITLE_CLASS,
  ABOUT_HERO_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "./aboutTypography";

// Impact labels reuse keys from the home section (already translated in all 4 locales)
const IMPACT_CONFIG = [
  { labelKey: "home.impact.yearsOfService", target: 40 },
  { labelKey: "home.impact.volunteers", target: 100000 },
  { labelKey: "home.impact.eventsConducted", target: 500 },
  { labelKey: "home.impact.livesTouched", target: 50000 },
];

interface Principle { icon: string; title: string; desc: string; }
interface Service { title: string; desc: string; button: string; }
interface FocusItem { icon: string; label: string; }

const SERVICE_IMAGES: Record<string, string> = {
  "Bhagwat Katha": "https://res.cloudinary.com/dalug9cfc/image/upload/v1776429635/bhagwat_uv7p9u.png",
  "Vastu Guidance": "https://res.cloudinary.com/dalug9cfc/image/upload/v1776429328/vastuimage_kkeny3.jpg",
  "Astrology Guidance": "https://res.cloudinary.com/dalug9cfc/image/upload/v1776429327/astrologyimage_bxbwbl.webp",
};

const divider = (
  <div className="max-w-6xl mx-auto px-4 pb-4">
    <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full my-4" />
  </div>
);

const FOUNDER_LABEL = `${ABOUT_SECTION_LABEL_CLASS} text-[#f09100]`;
const FOUNDER_HEADING = `${ABOUT_SECTION_HEADING_CLASS} text-[#b32e22]`;
const FOUNDER_BODY = `${ABOUT_BODY_CLASS} text-[#4a5964]`;
const FOUNDER_CARD_TITLE = `${ABOUT_CARD_TITLE_CLASS} text-[#b32e22]`;
const FOUNDER_ACCENT_BODY = `${ABOUT_BODY_CLASS} font-black text-[#b32e22]`;

export default memo(function ManishBhaijiPage() {
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLElement | null>(null);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    const target = servicesRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setServicesVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const principles = t("founderPage.principles", { returnObjects: true }) as Principle[];
  const objectives = t("founderPage.objectives", { returnObjects: true }) as string[];
  const services = t("founderPage.services", { returnObjects: true }) as Service[];
  const futureFocusItems = t("founderPage.futureFocusItems", { returnObjects: true }) as FocusItem[];

  const impactItems = IMPACT_CONFIG.map((item) => ({
    label: t(item.labelKey as never),
    target: item.target,
  }));

  return (
    <div className="min-h-screen bg-[#fff8f0]">

      {/* â”€â”€ Hero: Photo + Introduction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="w-full px-4 pt-8 md:pt-10 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img src="/images/manish2.PNG" alt={t("founderPage.name")} className="w-full object-contain h-[320px] md:h-[520px]" />
            </div>
            <div>
              <p className="inline-flex items-center rounded-full border border-[#8bbbe6] bg-[#ebf5ff] px-4 py-1 text-sm text-[#0d4e85] mb-4">
                {t("founderPage.badge")}
              </p>
              <h1 className={`${ABOUT_HERO_TITLE_CLASS} text-[#b32e22] mb-2`}>{t("founderPage.name")}</h1>
              <h3 className={`${ABOUT_HERO_SUBTITLE_CLASS} text-[#f09100] mb-5`}>{t("founderPage.subtitle")}</h3>
              <div className={`space-y-4 ${FOUNDER_BODY} mb-6`}>
                <p>{t("founderPage.introPara1")}</p>
                <p>{t("founderPage.introPara2")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.contact} className="inline-block bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
                  {t("founderPage.contactSeva")}
                </Link>
                <Link to={ROUTES.donate} className="inline-block bg-white border border-[#d2deea] text-[#0d4e85] font-bold px-6 py-3 rounded-xl hover:bg-[#f2f6fa] transition-colors">
                  {t("founderPage.donateNow")}
                </Link>
                <Link to="/get-involved/invite-maharaj-ji" className="inline-block bg-[#0d4e85] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0a3f6b] transition-colors">
                  Invite Maharaj Ji
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Impact Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        id="guidance-services"
        ref={servicesRef}
        className="mx-auto max-w-6xl px-4 py-16"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-[#f2d7b2] bg-[radial-gradient(circle_at_top,_#fff7ea_0%,_#fff2de_42%,_#ffe7c2_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(179,46,34,0.10)] md:px-10 md:py-14">
          <div className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-[#ffd18a]/45 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[#f5b56c]/35 blur-3xl" />
          <div className="relative text-center mb-10 md:mb-12">
            <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.servicesEyebrow")}</p>
            <h2 className={`${FOUNDER_HEADING} mb-4`}>{t("founderPage.servicesHeading")}</h2>
          </div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((item, index) => (
            <article
              key={item.title}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(255,248,239,0.98)_100%)] p-7 shadow-[0_18px_40px_rgba(13,59,102,0.10)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_50px_rgba(179,46,34,0.16)] hover:border-[#f1c07a] ${
                servicesVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,_rgba(255,188,103,0.28)_0%,_rgba(255,255,255,0)_100%)]" />
              <div className="relative flex justify-center">
                <div className="rounded-full bg-white/90 p-2 shadow-[0_16px_30px_rgba(13,59,102,0.12)] ring-4 ring-[#fff0d9] transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={SERVICE_IMAGES[item.title]}
                    alt={item.title}
                    className="h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className={`mt-6 text-center ${FOUNDER_CARD_TITLE} text-[var(--color-secondary)]`}>{item.title}</h3>
              {item.desc ? (
                <p className={`mt-3 flex-1 text-center ${ABOUT_BODY_CLASS} text-[#5a6872]`}>{item.desc}</p>
              ) : (
                <div className="flex-1" />
              )}
              <Link
                to={ROUTES.contact}
                className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-2xl bg-[linear-gradient(90deg,_#b32e22_0%,_#f07e1f_52%,_#f6b74b_100%)] px-5 py-3 text-center text-sm font-bold text-white shadow-[0_16px_30px_rgba(179,46,34,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(179,46,34,0.24)]"
              >
                {item.button}
              </Link>
            </article>
          ))}
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Spiritual Inspiration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png" alt={t("founderPage.inspirationHeading")} className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl" loading="lazy" />
          </div>
          <div>
            <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.inspirationEyebrow")}</p>
            <h2 className={`${FOUNDER_HEADING} mb-5 leading-tight`}>{t("founderPage.inspirationHeading")}</h2>
            <div className={`space-y-4 ${FOUNDER_BODY}`}>
              <p>{t("founderPage.inspirationPara1")}</p>
              <p>{t("founderPage.inspirationPara2")}</p>
              <p>{t("founderPage.inspirationPara3")}</p>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Bhagwat Katha and Spiritual Teaching â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.kathaEyebrow")}</p>
              <h2 className={`${FOUNDER_HEADING} mb-5 leading-tight`}>{t("founderPage.kathaHeading")}</h2>
              <div className={`space-y-4 ${FOUNDER_BODY}`}>
                <p>{t("founderPage.kathaPara1")}</p>
                <p>{t("founderPage.kathaPara2")}</p>
                <p>{t("founderPage.kathaPara3")}</p>
              </div>
              <Link to={ROUTES.eventsKatha.bhagwatKatha} className="inline-block mt-6 bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
                {t("founderPage.attendKatha")}
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/bhagwatkatha_lfi5h9.png" alt={t("founderPage.kathaHeading")} className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Guiding Philosophy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.principlesEyebrow")}</p>
          <h2 className={`${FOUNDER_HEADING} mb-3`}>{t("founderPage.principlesHeading")}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="group flex h-full flex-col rounded-[28px] border border-[#f1dcc0] bg-[linear-gradient(180deg,_#fffefb_0%,_#fff6eb_100%)] p-6 shadow-[0_12px_28px_rgba(13,59,102,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_34px_rgba(179,46,34,0.12)]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0da] text-3xl shadow-[inset_0_0_0_1px_rgba(240,145,0,0.12)]">
                {p.icon}
              </div>
              <h3 className={`${FOUNDER_CARD_TITLE} mb-2`}>{p.title}</h3>
              <p className={`flex-1 ${FOUNDER_BODY}`}>{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:from-[#ed9b24] hover:to-[#fec758]"
                >
                  Join
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex items-center justify-center rounded-full border border-[#d8c1a2] bg-white px-4 py-2 text-xs font-bold text-[#0d4e85] transition-colors hover:bg-[#f8efe4]"
                >
                  Contact
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* â”€â”€ Inspiration Behind the Foundation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.foundationEyebrow")}</p>
              <h2 className={`${FOUNDER_HEADING} mb-5 leading-tight`}>{t("founderPage.foundationHeading")}</h2>
              <div className={`space-y-4 ${FOUNDER_BODY}`}>
                <p>{t("founderPage.foundationPara1")}</p>
                <p>{t("founderPage.foundationPara2")}</p>
                <p>{t("founderPage.foundationPara3")}</p>
              </div>
            </div>
            <div>
              <p className={`${FOUNDER_LABEL} mb-4`}>{t("founderPage.objectivesTitle")}</p>
              <div className="space-y-3">
                {objectives.map((obj) => (
                  <div key={obj} className="flex items-start gap-3 bg-white rounded-xl border border-[#f1dcc0] px-4 py-3">
                    <span className="text-[#ff6a00] font-bold mt-0.5 shrink-0"></span>
                    <span className={FOUNDER_BODY}>{obj}</span>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.about.index} className="inline-block mt-6 bg-white border border-[#d2deea] text-[#0d4e85] font-semibold px-6 py-3 rounded-xl hover:bg-[#f2f6fa] transition-colors">
                {t("founderPage.learnFoundation")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Social & Spiritual Service â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png" alt={t("founderPage.sevaHeading")} className="w-full h-[260px] object-cover rounded-2xl" loading="lazy" />
          </div>
          <div>
            <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.sevaEyebrow")}</p>
            <h2 className={`${FOUNDER_HEADING} mb-5 leading-tight`}>{t("founderPage.sevaHeading")}</h2>
            <div className={`space-y-4 ${FOUNDER_BODY}`}>
              <p>{t("founderPage.sevaPara1")}</p>
              <p>{t("founderPage.sevaPara2")}</p>
              <p>{t("founderPage.sevaPara3")}</p>
            </div>
            <Link to={ROUTES.seva.annJal} className="inline-block mt-6 bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
              {t("founderPage.exploreSevaBtn")}
            </Link>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Youth Inspiration & Cultural Vision â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <p className={`${FOUNDER_LABEL} mb-2`}>{t("founderPage.youthEyebrow")}</p>
              <h2 className={`${FOUNDER_HEADING} mb-4 leading-tight`}>{t("founderPage.youthHeading")}</h2>
              <div className={`space-y-3 ${FOUNDER_BODY}`}>
                <p>{t("founderPage.youthPara1")}</p>
                <p>{t("founderPage.youthPara2")}</p>
                <p>{t("founderPage.youthPara3")}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <p className={`${FOUNDER_LABEL} mb-2`}>{t("founderPage.culturalEyebrow")}</p>
              <h2 className={`${FOUNDER_HEADING} mb-4 leading-tight`}>{t("founderPage.culturalHeading")}</h2>
              <div className={`space-y-3 ${FOUNDER_BODY}`}>
                <p>{t("founderPage.culturalPara1")}</p>
                <p>{t("founderPage.culturalPara2")}</p>
                <p>{t("founderPage.culturalPara3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Message to Society â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.messageEyebrow")}</p>
        <h2 className={`${FOUNDER_HEADING} mb-8`}>{t("founderPage.messageHeading")}</h2>
        <div className={`space-y-5 ${FOUNDER_BODY}`}>
          <p><span className={FOUNDER_ACCENT_BODY}>{t("founderPage.messagePara1")}</span></p>
          <p>{t("founderPage.messagePara2")}</p>
          <p>{t("founderPage.messagePara3")}</p>
        </div>
        <blockquote className="mt-8 border-l-4 border-[#ff6a00] pl-6 text-left bg-white rounded-r-2xl py-4 pr-6 shadow-sm">
          <p className={`${FOUNDER_BODY} italic font-medium text-[#7a4f1f]`}>
            &ldquo;{t("founderPage.messageQuote")}&rdquo;
          </p>
          <footer className={`mt-2 ${ABOUT_BODY_CLASS} font-semibold text-[#f09100]`}>â€” {t("founderPage.messageQuoteAuthor")}</footer>
        </blockquote>
      </section>

      {divider}

      {/* â”€â”€ Services / Connect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      

      {divider}

      {/* â”€â”€ Continuing the Journey â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className={`${FOUNDER_LABEL} mb-3`}>{t("founderPage.journeyEyebrow")}</p>
              <h2 className={`${FOUNDER_HEADING} mb-5 leading-tight`}>{t("founderPage.journeyHeading")}</h2>
              <div className={`space-y-4 ${FOUNDER_BODY}`}>
                <p>{t("founderPage.journeyPara1")}</p>
                <p>{t("founderPage.journeyPara2")}</p>
                <p>{t("founderPage.journeyPara3")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {futureFocusItems.map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-[#f1dcc0] p-5 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className={`${ABOUT_BODY_CLASS} font-black text-[#b32e22]`}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* â”€â”€ Gallery â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <h2 className={`${FOUNDER_HEADING} mb-8 text-center`}>{t("founderPage.devotionTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["/images/s1.jfif", "/images/Inspriation Main.jpg", "/images/Aims & objectives main.jpg"].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${t("founderPage.devotionTitle")} ${i + 1}`}
              className="w-full h-52 object-cover rounded-2xl shadow"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ))}
        </div>
      </section>

      {divider}

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${FOUNDER_HEADING} mb-3`}>{t("founderPage.ctaTitle")}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.involved.volunteer} className="inline-block bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300">
              {t("founderPage.ctaVolunteer")}
            </Link>
            <Link to={ROUTES.donate} className="inline-block bg-white border border-[#d2deea] text-[#0d4e85] font-bold px-8 py-3.5 rounded-xl hover:bg-[#f2f6fa] transition-colors">
              {t("founderPage.ctaSupport")}
            </Link>
            <Link to={ROUTES.eventsKatha.bhagwatKatha} className="inline-block border border-[#ff6a00]/50 text-[#b32e22] font-bold px-8 py-3.5 rounded-xl hover:bg-[#fff3e8] transition-colors">
              {t("founderPage.ctaPrograms")}
            </Link>
          </div>
        </div>
      </section>

      {divider}

      <ImpactCounter items={impactItems} />

    </div>
  );
});

