import { memo } from "react";
import { Link } from "react-router-dom";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Years of Service", target: 35 },
  { label: "Followers", target: 100000 },
  { label: "Events Conducted", target: 500 },
  { label: "Lives Touched", target: 50000 },
];

export default memo(function ManishBhaijiPage() {
  return (
    <div>
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/manish2.PNG"
              alt="S.S. Manish Bhai Ji Maharaj"
              className="w-full rounded-2xl shadow-2xl object-cover max-h-[500px]"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0d3b66] mb-2">
              Sant Shree Manish Bhai Ji Maharaj
            </h1>
            <h3 className="text-lg text-[#f4a261] font-semibold mb-4">
              Spiritual Guide • Cultural Leader • Social Reformer
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              For over 35 years, S.S. Manish Bhai Ji has dedicated his life to spiritual awakening,
              cultural preservation, and humanitarian service. Through spiritual discourses, seva
              activities, and leadership, he has inspired thousands of followers across India.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact for Seva
            </Link>
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Spiritual Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          From a young age, Manish Bhai Ji showed deep devotion toward sacred scriptures and
          spiritual knowledge. Over decades, he established Bhagwat Heritage Service Foundation
          Trust and initiated numerous social service programs, charity drives, and educational
          campaigns.
        </p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title">Moments of Devotion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["/images/s1.jfif", "/images/Inspriation Main.jpg", "/images/Aims & objectives main.jpg"].map(
              (src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-48 object-cover rounded-xl shadow"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
});
