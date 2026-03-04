import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Daughters Supported", target: 250 },
  { label: "Marriage Assistance (₹L)", target: 50 },
  { label: "Community Wedding Events", target: 40 },
  { label: "Transparent Donations", target: 100, suffix: "%" },
];

export default memo(function KanyaPage() {
  return (
    <div>
      <HeroSection title="Kanyadaan Seva" subtitle="Supporting Daughters with Respect & Blessings" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">About Kanyadaan Seva</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-10">
          Kanyadaan Seva is a sacred initiative dedicated to supporting underprivileged daughters
          with financial and material assistance for marriage ceremonies. We believe every daughter
          deserves a respectful and joyous beginning to her married life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "💰", title: "Marriage Financial Support", desc: "Direct financial aid for wedding expenses." },
            { icon: "🎁", title: "Essential Marriage Kit", desc: "Clothing, utensils and household essentials." },
            { icon: "🎊", title: "Ceremony Arrangement", desc: "Basic arrangements for a dignified wedding ceremony." },
            { icon: "📋", title: "Legal Documentation Help", desc: "Marriage registration assistance." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow-md p-6 flex gap-4">
              <div className="text-4xl flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold text-[#0d3b66] text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ImpactCounter items={IMPACT} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">Sponsor a Wedding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Basic Support", amount: "₹11,000" },
              { label: "Full Marriage Support", amount: "₹51,000" },
              { label: "Community Wedding Sponsor", amount: "₹1,11,000" },
            ].map((tier) => (
              <div key={tier.label} className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-[#0d3b66] text-lg">{tier.label}</h3>
                <p className="text-2xl font-bold text-[#f4a261] mt-2">{tier.amount}</p>
                <Link to="/donate" className="btn-primary mt-4 inline-block">Donate Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
