import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Students Supported", target: 5000 },
  { label: "Schools Covered", target: 120 },
  { label: "Scholarships Awarded", target: 1500 },
  { label: "Medical Camps", target: 200 },
];

export default memo(function EducationPage() {
  return (
    <div>
      <HeroSection title="Medicine & Education Seva" subtitle="Empowering communities through knowledge and healthcare" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "📚", title: "Scholarship Program", desc: "Financial aid for meritorious students from underprivileged backgrounds." },
            { icon: "🏥", title: "Free Medical Camps", desc: "Regular health check-ups and free medicine distribution." },
            { icon: "🎓", title: "E-Pathshala", desc: "Online spiritual and academic education platform." },
            { icon: "💊", title: "Medicine Distribution", desc: "Free medicines for chronic illness patients in rural areas." },
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
        <Link to="/donate" className="btn-primary mr-4">Support Education</Link>
        <Link to="/volunteer" className="btn-secondary">Volunteer as Teacher</Link>
      </div>
    </div>
  );
});
