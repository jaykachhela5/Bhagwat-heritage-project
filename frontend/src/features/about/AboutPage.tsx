import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";

export default memo(function AboutPage() {
  return (
    <div>
      <HeroSection
        title="About Bhagwat Heritage"
        subtitle="Serving Faith, Culture & Humanity Since 1990"
      />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title">Our Story</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          Bhagwat Heritage Service Foundation Trust is a non-profit organization committed to
          spiritual enlightenment, cultural preservation, and humanitarian service. Founded on the
          principles of the Swaminarayan tradition, we serve communities across Maharashtra and
          beyond.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg">
          Through our diverse programs — from education and healthcare to cultural events and
          spiritual discourses — we touch thousands of lives every year.
        </p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "S.S. Manish Bhai Ji", role: "Spiritual Guide", href: "/about/manish-bhaiji" },
              { name: "Trust Committee", role: "Administration", href: "/about" },
              { name: "Seva Volunteers", role: "Community Service", href: "/volunteer" },
            ].map((person) => (
              <div key={person.name} className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-[#0d3b66]/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-user text-2xl text-[#0d3b66]" />
                </div>
                <h3 className="font-bold text-[#0d3b66]">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>
                <Link to={person.href} className="mt-3 btn-primary text-sm inline-block">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h2 className="section-title">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🕉️", title: "Bhakti", desc: "Devotion and spiritual awakening" },
            { icon: "🤲", title: "Seva", desc: "Selfless service to humanity" },
            { icon: "🎭", title: "Sanskriti", desc: "Preservation of cultural heritage" },
          ].map((v) => (
            <div key={v.title} className="p-6 rounded-xl bg-white shadow-md">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-xl text-[#0d3b66] mb-2">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});
