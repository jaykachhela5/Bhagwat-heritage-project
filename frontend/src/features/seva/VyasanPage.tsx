import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Individuals Recovered", target: 800 },
  { label: "Awareness Camps", target: 200 },
  { label: "Recovery Success", target: 95, suffix: "%" },
  { label: "Families Counseled", target: 1500 },
];

export default memo(function VyasanPage() {
  return (
    <div>
      <HeroSection title="Vyasanmukti Seva" subtitle="Break the Chains of Addiction" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Addiction We Address</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "🍺", title: "Alcohol Addiction" },
            { icon: "💊", title: "Drug Addiction" },
            { icon: "🚬", title: "Tobacco & Smoking" },
            { icon: "🎰", title: "Gambling" },
            { icon: "📱", title: "Digital Addiction" },
            { icon: "💉", title: "Prescription Misuse" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-[#0d3b66] text-sm">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">Rehabilitation Process</h2>
          <div className="space-y-4">
            {[
              "Initial Consultation — Confidential assessment with counsellors",
              "Medical Evaluation — Health and psychological evaluation",
              "Detoxification — Supervised detox phase",
              "Therapy & Counseling — Individual and group therapy sessions",
              "Reintegration — Family counselling and job assistance",
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm">
                <span className="bg-[#0d3b66] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">Support Recovery Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Detox Support", amount: "₹5,000" },
              { label: "Full Rehabilitation", amount: "₹25,000" },
              { label: "Awareness Campaign", amount: "₹51,000" },
            ].map((tier) => (
              <div key={tier.label} className="bg-white rounded-xl p-6 shadow">
                <h3 className="font-bold text-[#0d3b66]">{tier.label}</h3>
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
