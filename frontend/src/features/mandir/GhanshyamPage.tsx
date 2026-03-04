import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";

export default memo(function GhanshyamPage() {
  return (
    <div>
      <HeroSection title="Ghanshyam Maharaj Mahamandir" subtitle="A sacred abode of devotion" />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">About the Mahamandir</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-10">
          The Ghanshyam Maharaj Mahamandir is a grand spiritual centre dedicated to Ghanshyam
          Maharaj (Lord Swaminarayan). The temple hosts regular prayers, festivals, and seva
          activities that draw thousands of devotees.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: "🛕", title: "Daily Puja", desc: "Morning and evening aartis performed with devotion." },
            { icon: "🎵", title: "Bhajan Sandhya", desc: "Weekly devotional music sessions." },
            { icon: "🎊", title: "Festival Celebrations", desc: "Grand celebrations of all major Hindu festivals." },
            { icon: "🤲", title: "Prasad Distribution", desc: "Daily prasad distributed to all devotees." },
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

      <div className="text-center pb-12">
        <Link to="/mandir/gallery" className="btn-primary mr-4">View Gallery</Link>
        <Link to="/mandir" className="btn-secondary">Visit Main Mandir</Link>
      </div>
    </div>
  );
});
