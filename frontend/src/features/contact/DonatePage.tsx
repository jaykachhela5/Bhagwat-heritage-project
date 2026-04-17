import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_HIGHLIGHT_VALUE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

export default memo(function DonatePage() {
  usePageMeta("Donation System", "Secure online donation access for temple, seva, and trust support.");

  useEffect(() => {
    window.open(EXTERNAL_RAZORPAY_DONATE_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Donation System"
        subtitle="Give with faith, serve with love"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={EXTERNAL_RAZORPAY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Open Payment Link
          </a>
          <Link
            to={ROUTES.digital.index}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Digital Services
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Secure Access", value: "Trusted payment redirect", note: "Visitors are guided straight to the active donation checkout link." },
              { title: "Seva Support", value: "Temple and trust initiatives", note: "Digital giving can support seva work, events, and devotional projects." },
              { title: "Clean Experience", value: "Simple and direct", note: "A clear page design reduces confusion before donation begins." },
              { title: "Visual Match", value: "Aligned with Gau Seva", note: "Hero banner, font rhythm, and section style now follow the same family." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className={SEVA_SECTION_LABEL_CLASS}>Donation Access</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>The payment page opens automatically in a new tab</h2>
            <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS}`}>
              This page keeps the donation flow simple. Visitors are redirected to the live payment link and can also
              open it again manually if the browser blocks the first tab.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Open Payment Link Again
              </a>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className={SEVA_SECTION_LABEL_CLASS}>Support Routes</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Continue browsing after donation if needed</h2>
            <div className="mt-6 grid grid-cols-1 gap-4">
              {[
                { title: "Return to Digital Services", href: ROUTES.digital.index },
                { title: "Explore Gau Seva", href: ROUTES.seva.gau },
                { title: "Contact the Trust", href: ROUTES.contact },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
