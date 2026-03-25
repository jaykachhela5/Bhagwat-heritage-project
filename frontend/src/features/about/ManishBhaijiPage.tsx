import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

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

const divider = (
  <div className="max-w-6xl mx-auto px-4 pb-4">
    <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full my-4" />
  </div>
);

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

      {/* ── Hero: Photo + Introduction ────────────────────────────────── */}
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
              <h1 className="text-3xl md:text-5xl font-black text-[#b32e22] leading-tight mb-2">{t("founderPage.name")}</h1>
              <h3 className="text-base md:text-xl text-[#f09100] font-semibold mb-5">{t("founderPage.subtitle")}</h3>
              <div className="space-y-4 text-[#4a5964] text-base md:text-lg leading-relaxed mb-6">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Impact Stats ──────────────────────────────────────────────── */}
      <ImpactCounter items={impactItems} />

      {divider}

      {/* ── Spiritual Inspiration ─────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png" alt={t("founderPage.inspirationHeading")} className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.inspirationEyebrow")}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">{t("founderPage.inspirationHeading")}</h2>
            <div className="space-y-4 text-[#4a5964] leading-relaxed">
              <p>{t("founderPage.inspirationPara1")}</p>
              <p>{t("founderPage.inspirationPara2")}</p>
              <p>{t("founderPage.inspirationPara3")}</p>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Bhagwat Katha and Spiritual Teaching ──────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.kathaEyebrow")}</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">{t("founderPage.kathaHeading")}</h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
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

      {/* ── Guiding Philosophy ────────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.principlesEyebrow")}</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-3">{t("founderPage.principlesHeading")}</h2>
          <p className="text-[#4a5964] max-w-2xl mx-auto">{t("founderPage.principlesSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-[#f1dcc0] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-lg font-black text-[#b32e22] mb-2">{p.title}</h3>
              <p className="text-[#4a5964] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── Inspiration Behind the Foundation ────────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.foundationEyebrow")}</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">{t("founderPage.foundationHeading")}</h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
                <p>{t("founderPage.foundationPara1")}</p>
                <p>{t("founderPage.foundationPara2")}</p>
                <p>{t("founderPage.foundationPara3")}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-4">{t("founderPage.objectivesTitle")}</p>
              <div className="space-y-3">
                {objectives.map((obj) => (
                  <div key={obj} className="flex items-start gap-3 bg-white rounded-xl border border-[#f1dcc0] px-4 py-3">
                    <span className="text-[#ff6a00] font-bold mt-0.5 shrink-0">✦</span>
                    <span className="text-[#4a5964] text-sm leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.about.index} className="inline-block mt-6 bg-white border border-[#d2deea] text-[#0d4e85] font-semibold px-6 py-3 rounded-xl hover:bg-[#f2f6fa] transition-colors">
                {t("founderPage.learnFoundation")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Social & Spiritual Service ────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png" alt={t("founderPage.sevaHeading")} className="w-full h-[260px] object-cover rounded-2xl" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.sevaEyebrow")}</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">{t("founderPage.sevaHeading")}</h2>
            <div className="space-y-4 text-[#4a5964] leading-relaxed">
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

      {/* ── Youth Inspiration & Cultural Vision ───────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <div className="text-3xl mb-3">🌱</div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-2">{t("founderPage.youthEyebrow")}</p>
              <h2 className="text-xl md:text-2xl font-black text-[#b32e22] mb-4 leading-tight">{t("founderPage.youthHeading")}</h2>
              <div className="space-y-3 text-[#4a5964] text-sm leading-relaxed">
                <p>{t("founderPage.youthPara1")}</p>
                <p>{t("founderPage.youthPara2")}</p>
                <p>{t("founderPage.youthPara3")}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <div className="text-3xl mb-3">🏛️</div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-2">{t("founderPage.culturalEyebrow")}</p>
              <h2 className="text-xl md:text-2xl font-black text-[#b32e22] mb-4 leading-tight">{t("founderPage.culturalHeading")}</h2>
              <div className="space-y-3 text-[#4a5964] text-sm leading-relaxed">
                <p>{t("founderPage.culturalPara1")}</p>
                <p>{t("founderPage.culturalPara2")}</p>
                <p>{t("founderPage.culturalPara3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Message to Society ────────────────────────────────────────── */}
      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.messageEyebrow")}</p>
        <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-8">{t("founderPage.messageHeading")}</h2>
        <div className="space-y-5 text-[#4a5964] text-base md:text-lg leading-relaxed">
          <p><span className="text-[#b32e22] font-semibold">{t("founderPage.messagePara1")}</span></p>
          <p>{t("founderPage.messagePara2")}</p>
          <p>{t("founderPage.messagePara3")}</p>
        </div>
        <blockquote className="mt-8 border-l-4 border-[#ff6a00] pl-6 text-left bg-white rounded-r-2xl py-4 pr-6 shadow-sm">
          <p className="text-[#7a4f1f] italic text-lg leading-relaxed font-medium">
            &ldquo;{t("founderPage.messageQuote")}&rdquo;
          </p>
          <footer className="mt-2 text-sm text-[#f09100] font-semibold">— {t("founderPage.messageQuoteAuthor")}</footer>
        </blockquote>
      </section>

      {divider}

      {/* ── Services / Connect ────────────────────────────────────────── */}
      <section ref={servicesRef} className="py-14 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.servicesEyebrow")}</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22]">{t("founderPage.servicesHeading")}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((item, index) => (
            <article
              key={item.title}
              className={`flex h-full flex-col rounded-[24px] border border-[#efd6b4] bg-white p-6 shadow-[0_10px_24px_rgba(13,59,102,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(13,59,102,0.14)] hover:border-[#f0b15d] ${
                servicesVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <h3 className="mt-2 text-2xl font-black text-[#0d3b66]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#5a6872]">{item.desc}</p>
              <Link
                to={ROUTES.contact}
                className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] px-5 py-3 text-center text-sm font-bold text-white transition-all duration-300"
              >
                {item.button}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {divider}

      {/* ── Continuing the Journey ────────────────────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">{t("founderPage.journeyEyebrow")}</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">{t("founderPage.journeyHeading")}</h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
                <p>{t("founderPage.journeyPara1")}</p>
                <p>{t("founderPage.journeyPara2")}</p>
                <p>{t("founderPage.journeyPara3")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {futureFocusItems.map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-[#f1dcc0] p-5 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-[#b32e22] font-bold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-[#b32e22] text-center mb-8">{t("founderPage.devotionTitle")}</h2>
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-3">{t("founderPage.ctaTitle")}</h2>
          <p className="text-[#4a5964] max-w-2xl mx-auto mb-8 text-lg leading-relaxed">{t("founderPage.ctaDesc")}</p>
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

    </div>
  );
});
