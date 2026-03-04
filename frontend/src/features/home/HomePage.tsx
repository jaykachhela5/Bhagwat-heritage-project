import { memo } from "react";
import { Link } from "react-router-dom";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const GALLERY_IMAGES = [
  { href: "/seva/education", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png", alt: "Education" },
  { href: "/seva/education", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png", alt: "Medical" },
  { href: "/seva/jal-seva", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png", alt: "Jal Seva" },
  { href: "/seva/kanya", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583758/kanyadan_ftf9oc.png", alt: "Kanyadaan" },
  { href: "/seva/education", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png", alt: "Chikitsa" },
  { href: "/seva/vyasan", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/vyasanmukti_xa9hif.png", alt: "Vyasanmukti" },
  { href: "/mission/spiritual", src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png", alt: "Katha" },
];

const IMPACT_ITEMS = [
  { label: "Lives Touched", target: 50000 },
  { label: "Events Conducted", target: 500 },
  { label: "Volunteers", target: 1200 },
  { label: "Years of Service", target: 35 },
];

export default memo(function HomePage() {
  return (
    <div>
      <section
        className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://res-console.cloudinary.com/der8zinu8/thumbnails/v1/image/upload/v1771413474/aXRjbTg0ZjlkbnFwemdhd3A3YWs=/drilldown')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to Bhagwat Heritage
          </h1>
          <h3 className="text-xl md:text-2xl text-gray-200 mb-8">Service Foundation Trust</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/about" className="btn-primary">Learn More</Link>
            <Link to="/donate" className="btn-secondary">Donate Now</Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="section-title">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Our Mission", desc: "Promoting spirituality, culture & service.", link: "/about", icon: "🕉️" },
            { title: "Upcoming Events", desc: "Cultural programs & festivals.", link: "/events/pathshala", icon: "📅" },
            { title: "Temple Activities", desc: "Puja, Satsang & Seva.", link: "/mandir", icon: "🛕" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-[#0d3b66] mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.desc}</p>
              <Link to={card.link} className="btn-primary">Learn More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">About Our Trust</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Dedicated to spiritual enlightenment and preservation of the cultural heritage of the
            Swaminarayan tradition. We serve over 50,000 people annually through our diverse seva
            programs.
          </p>
          <Link to="/about" className="btn-primary">Read More</Link>
        </div>
      </section>

      <ImpactCounter items={IMPACT_ITEMS} />

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="section-title">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {GALLERY_IMAGES.map((img) => (
            <Link key={img.src} to={img.href} className="group overflow-hidden rounded-lg aspect-square">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#0d3b66] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Become a Volunteer</h2>
            <p className="text-gray-300 mb-4">Join us in serving the community</p>
            <Link to="/volunteer" className="btn-secondary">Join Us</Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
            <p className="text-gray-300 mb-4">Support our charitable activities</p>
            <Link to="/donate" className="btn-secondary">Donate Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
});
