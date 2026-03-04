import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Litres of Water Provided", target: 1000000 },
  { label: "Villages Served", target: 150 },
  { label: "Meals Served", target: 500000 },
  { label: "Families Helped", target: 10000 },
];

export default memo(function JalSevaPage() {
  return (
    <div>
      <HeroSection
        title="Jal / Ann Seva"
        subtitle="Providing Water & Food to Those in Need"
      />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">About Jal Seva</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-10">
          In drought-affected regions of Maharashtra, clean water is a luxury. Our Jal Seva
          program distributes drinking water and food to communities facing scarcity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "💧", title: "Water Distribution", desc: "Mobile water tankers deployed to drought-affected villages." },
            { icon: "🍱", title: "Ann Seva", desc: "Daily free meals distributed to laborers, homeless, and poor." },
            { icon: "🚰", title: "Water Purification", desc: "Installing water purification units in rural schools." },
            { icon: "🌾", title: "Farmers Support", desc: "Supporting farmers with water conservation techniques." },
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
          <h2 className="section-title">Support Jal Seva</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Sponsor One Day", amount: "₹1,100" },
              { label: "Weekly Sponsor", amount: "₹7,700" },
              { label: "Monthly Sponsor", amount: "₹31,000" },
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
