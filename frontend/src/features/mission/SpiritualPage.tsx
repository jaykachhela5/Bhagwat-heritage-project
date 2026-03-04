import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { spiritualApi } from "../../services/api/misc";

export default memo(function SpiritualPage() {
  const { data } = useApi(() => spiritualApi.getAll());

  return (
    <div>
      <HeroSection title="Spiritual Mission" subtitle="Spreading the divine message of Bhagwat" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Our Spiritual Programs</h2>
        <p className="text-gray-600 text-lg text-center leading-relaxed mb-10">
          Through Katha Pravachan, Bhajan Sandhya, and spiritual discourses, we bring the teachings
          of sacred scriptures to thousands of devotees.
        </p>

        {Array.isArray(data) && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data as { _id: string; title?: string; description?: string; image?: string }[]).map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
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
              { icon: "📖", title: "Katha Pravachan", desc: "Regular scriptural discourses on Bhagwat and other sacred texts." },
              { icon: "🎵", title: "Bhajan Sandhya", desc: "Evening devotional singing sessions open to all." },
              { icon: "🕊️", title: "Meditation Camps", desc: "Guided meditation and yoga sessions for inner peace." },
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
        <Link to="/get-involved" className="btn-primary">Join Our Spiritual Programs</Link>
      </div>
    </div>
  );
});
