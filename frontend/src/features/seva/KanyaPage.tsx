import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import { KanyadaanServicesSection } from "./KanyadaanServicesSection";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "./sevaTypography";

const QUICK_HIGHLIGHTS = [
  { title: "Dignity First", note: "Kanyadaan Seva is guided by respect, prayer, and family care" },
  { title: "Volunteer Network", note: "Community volunteers available for coordination and support" },
  { title: "Support Models", note: "Multiple formats of marriage support for different needs" },
  { title: "Transparent Help", note: "Structured support aligned through the foundation's service flow" },
];

export default memo(function KanyaPage() {
  usePageMeta(
    "Kanyadaan Seva",
    "Bhagwat Heritage Service Foundation Trust Kanyadaan Seva page focused on dignified marriage support, sponsorship, and compassionate family assistance.",
  );

  
  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Kanyadaan Seva"
        subtitle="Respect daughters, uplift society"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="/images/kanyadan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        backgroundPositionClass="bg-center"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Sponsor Kanyadaan
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Become Volunteer
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d6179] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>About Kanyadaan Seva</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Support rooted in dignity and family care</h2>
          <p className="mt-5 text-base leading-7 text-white md:text-lg">
            Kanyadaan Seva supports underprivileged daughters with dignified marriage assistance through transparent and compassionate community support.
          </p>
        </div>
      </section>

      <KanyadaanServicesSection />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor a Wedding</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Support a dignified marriage journey</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Basic Support", amount: "Rs 11,000" },
              { label: "Full Marriage Support", amount: "Rs 51,000" },
              { label: "Community Wedding Sponsor", amount: "Rs 1,11,000" },
            ].map((tier) => (
              <div key={tier.label} className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <h3 className={SEVA_CARD_TITLE_CLASS}>{tier.label}</h3>
                <p className="mt-2 text-[14px] font-black text-[#ef9a1e] md:text-[20px]">{tier.amount}</p>
                <Link to={ROUTES.donate} className="mt-5 inline-flex w-fit rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]">
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
