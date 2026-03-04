import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Lives Served", target: 50000 },
  { label: "Meals Distributed", target: 100000 },
  { label: "Medical Camps", target: 200 },
  { label: "Families Supported", target: 5000 },
];

export default memo(function SocialPage() {
  return (
    <div>
      <HeroSection title="Social Service Mission" subtitle="Serving humanity with compassion" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Our Social Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "🍱", title: "Ann Seva", desc: "Free meal distribution to the needy and underprivileged." },
            { icon: "💧", title: "Jal Seva", desc: "Providing clean drinking water in drought-affected areas." },
            { icon: "🏥", title: "Medical Camps", desc: "Free health check-ups and medicine distribution." },
            { icon: "📚", title: "Education Support", desc: "Scholarships and educational materials for poor students." },
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

      <div className="text-center py-12">
        <Link to="/donate" className="btn-primary mr-4">Support Our Mission</Link>
        <Link to="/volunteer" className="btn-secondary">Volunteer</Link>
      </div>
    </div>
  );
});
