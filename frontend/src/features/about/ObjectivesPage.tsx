import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";

const OBJECTIVES = [
  { icon: "🙏", title: "भक्ति", desc: "श्रीहरि भक्ति का जागरण — Spiritual awakening and devotion to the divine." },
  { icon: "🤲", title: "सेवा", desc: "मानव सेवा का विस्तार — Expanding service to all of humanity." },
  { icon: "🎭", title: "संस्कृति", desc: "सनातन संस्कृति का संरक्षण — Preservation of eternal culture." },
  { icon: "📚", title: "शिक्षा", desc: "Providing education to underprivileged communities." },
  { icon: "🏥", title: "स्वास्थ्य", desc: "Healthcare and medical assistance for those in need." },
  { icon: "🌿", title: "पर्यावरण", desc: "Environmental protection and green initiatives." },
];

export default memo(function ObjectivesPage() {
  return (
    <div>
      <HeroSection
        title="भगवत हेरिटेज सेवा ट्रस्ट"
        subtitle="सेवा • संस्कार • संस्कृति"
      >
        <Link to="/get-involved" className="btn-secondary mt-4 inline-block">
          सेवा से जुड़ें
        </Link>
      </HeroSection>

      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="section-title">हमारे उद्देश्य</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          हम श्रीमद्भागवत के आध्यात्मिक, सामाजिक और सांस्कृतिक संदेश को जन-जन तक पहुँचाने के
          लिए समर्पित हैं।
        </p>
      </section>

      <section className="pb-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OBJECTIVES.map((obj) => (
            <div
              key={obj.title}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{obj.icon}</div>
              <h3 className="text-xl font-bold text-[#0d3b66] mb-2">{obj.title}</h3>
              <p className="text-gray-600 text-sm">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});
