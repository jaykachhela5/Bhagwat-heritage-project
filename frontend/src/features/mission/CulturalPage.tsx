import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { culturalApi } from "../../services/api/misc";

export default memo(function CulturalPage() {
  const { data } = useApi(() => culturalApi.getAll());

  return (
    <div>
      <HeroSection title="Cultural Mission" subtitle="Preserving our ancient heritage" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Cultural Programs</h2>

        {Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data as { _id: string; title?: string; description?: string; image?: string }[]).map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" loading="lazy" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-[#0d3b66]">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎭", title: "Cultural Nights", desc: "Annual cultural performances celebrating our heritage." },
              { icon: "🎨", title: "Art Exhibitions", desc: "Showcasing traditional arts and crafts." },
              { icon: "💃", title: "Dance & Music", desc: "Classical dance and devotional music programs." },
            ].map((prog) => (
              <div key={prog.title} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-4xl mb-3">{prog.icon}</div>
                <h3 className="font-bold text-[#0d3b66] text-lg mb-2">{prog.title}</h3>
                <p className="text-gray-600 text-sm">{prog.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="text-center pb-12">
        <Link to="/get-involved" className="btn-primary">Participate in Cultural Events</Link>
      </div>
    </div>
  );
});
