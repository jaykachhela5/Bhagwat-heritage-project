import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Daughters Supported", target: 250 },
  { label: "Marriage Assistance (Rs Lakh)", target: 50 },
  { label: "Community Wedding Events", target: 40 },
  { label: "Transparent Donations", target: 100, suffix: "%" },
];

const SUPPORT_TYPES = [
  {
    image: "/images/kanyadan.png",
    title: "Marriage Financial Support",
    desc: "Direct financial assistance for essential wedding expenses.",
  },
  {
    image: "/images/vastraseva.png",
    title: "Essential Marriage Kit",
    desc: "Clothing, utensils, and household starter essentials for daughters.",
  },
  {
    image: "/images/page1.png",
    title: "Ceremony Arrangement",
    desc: "Basic venue and ritual setup support for a dignified ceremony.",
  },
  {
    image: "/images/aa.png",
    title: "Documentation Support",
    desc: "Marriage registration and required paperwork assistance.",
  },
];

const QUICK_HIGHLIGHTS = [
  { title: "Daughters Supported", value: "250+", note: "Direct marriage assistance and dignity support" },
  { title: "Volunteer Network", value: "180+", note: "Community sevadars for logistics and care" },
  { title: "Marriage Support Kits", value: "300+", note: "Clothing, essentials, and family support items" },
  { title: "Transparent Assistance", value: "100%", note: "Verified and documented support delivery" },
];

export default memo(function KanyaPage() {
  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Kanyadaan Seva"
        subtitle="Supporting Daughters with Respect, Dignity, and Blessings"
        backgroundImage="/images/kanyadan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor Kanyadaan
          </Link>
          <Link
            to="/volunteer"
            className="bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Become Volunteer
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Kanyadaan Seva</h2>
        <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed mb-5">
          Kanyadaan Seva supports underprivileged daughters with dignified marriage assistance through
          transparent and compassionate community support.
        </p>
        <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed mb-8">
          The page now follows the same seva visual theme, with a stronger focus on dignity, family support, and structured seva participation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {SUPPORT_TYPES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-[#1b3646]/80 shadow-sm overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-44 object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                <p className="text-[#d4e1e8]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} theme="dark" />

      <section className="py-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Sponsor a Wedding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Basic Support", amount: "Rs 11,000" },
              { label: "Full Marriage Support", amount: "Rs 51,000" },
              { label: "Community Wedding Sponsor", amount: "Rs 1,11,000" },
            ].map((tier) => (
              <div key={tier.label} className="rounded-xl p-6 shadow border border-white/10 bg-[#17384b]">
                <h3 className="font-bold text-white text-lg">{tier.label}</h3>
                <p className="text-2xl font-bold text-[#ffb06a] mt-2">{tier.amount}</p>
                <Link to="/donate" className="btn-primary mt-4 inline-block">
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
