import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Years of Service", target: 40 },
  { label: "Followers", target: 100000 },
  { label: "Events Conducted", target: 500 },
  { label: "Lives Touched", target: 50000 },
];

const FOUNDER_SERVICES = [
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/bhagwatkatha_lfi5h9.png",
    title: "Bhagwat Katha",
    desc: "Invite devotees and organizations to request Shrimad Bhagwat Katha by Manish Bhaiji Maharaj for spiritual gatherings, religious events, and community programs.",
    button: "Contact for Bhagwat Katha",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944115/vastu_mzu8l6.jpg",
    title: "Vastu Guidance",
    desc: "Offer traditional Vastu Shastra consultation for homes, temples, offices, and spiritual spaces to promote harmony, positivity, and prosperity.",
    button: "Contact for Vastu Consultation",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/astrologo_w1f3rx.webp",
    title: "Astrology Guidance",
    desc: "Provide Jyotish consultation for life guidance, spiritual growth, career decisions, and personal well-being.",
    button: "Contact for Astrology Consultation",
  },
];

export default memo(function ManishBhaijiPage() {
  const servicesRef = useRef<HTMLElement | null>(null);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    const target = servicesRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <section className="w-full px-4 pt-8 md:pt-10 pb-10">
          <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src="/images/manish2.PNG"
                alt="S.S. Manish Bhai Ji Maharaj"
                className="w-full object-contain h-[320px] md:h-[520px]"
              />
            </div>

            <div>
              <p className="inline-flex items-center rounded-full border border-[#8bbbe6] bg-[#ebf5ff] px-4 py-1 text-sm text-[#0d4e85] mb-4">
                Bhagwat Heritage Service Foundation Trust
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-[#b32e22] leading-tight mb-3">
                Sant Shree Manish Bhai Ji Maharaj
              </h1>
              <h3 className="text-base md:text-xl text-[#f09100] font-semibold mb-5">
                Spiritual Guide . Cultural Leader . Social Reformer
              </h3>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1f2f39] mb-3">About Manish Bhai Ji</h2>
              <p className="text-[#4a5964] text-base md:text-lg leading-relaxed mb-4">
                For over 35 years, S.S. Manish Bhai Ji has dedicated his life to spiritual awakening,
                cultural preservation, and humanitarian service. His teachings connect bhakti with practical
                seva, inspiring families and youth to live with discipline, compassion, and devotion.
              </p>
              <p className="text-[#4a5964] text-base md:text-lg leading-relaxed mb-6">
                Through satsang, katha, and trust-led social initiatives, he has guided thousands of devotees
                toward value-based living while supporting education, healthcare, and community welfare.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={ROUTES.contact}
                  className="inline-block bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Contact for Seva
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="inline-block bg-white border border-[#d2deea] text-[#0d4e85] font-bold px-6 py-3 rounded-xl hover:bg-[#f2f6fa] transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-4">
        <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full my-4" />
      </div>

      <section ref={servicesRef} className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-[28px] border border-[#f1dcc0] bg-gradient-to-b from-[#fec758]/20 to-[#ff6a00]/10 p-5 md:p-8 shadow-[0_12px_28px_rgba(166,94,21,0.10)]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c6761e]">Guidance and Services</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-[#b32e22]">Connect with Manish Bhaiji Maharaj</h2>
            <p className="mt-3 text-base md:text-lg leading-7 text-[#53626d]">
              These service cards are placed directly below the founder photo section so devotees, families, and organizations can quickly connect for spiritual guidance and consultation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {FOUNDER_SERVICES.map((item, index) => (
              <article
                key={item.title}
                className={`flex h-full flex-col rounded-[24px] border border-[#efd6b4] bg-white p-6 shadow-[0_10px_24px_rgba(13,59,102,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(13,59,102,0.14)] hover:border-[#f0b15d] ${
                  servicesVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="relative overflow-hidden rounded-[20px] border border-[#f1dfc3] bg-[#fff7ec] shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,59,102,0.06)_0%,rgba(13,59,102,0.34)_100%)]" />
                </div>
                <h3 className="mt-5 text-2xl font-black text-[#0d3b66]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#5a6872]">{item.desc}</p>
                <Link
                  to={ROUTES.contact}
                  className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] px-5 py-3 text-center text-sm font-bold text-white transition-all duration-300"
                >
                  {item.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} />

      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title text-[#b32e22]">Spiritual Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          From a young age, Manish Bhai Ji showed deep devotion toward sacred scriptures and
          spiritual knowledge. Over decades, he established Bhagwat Heritage Service Foundation
          Trust and initiated numerous social service programs, charity drives, and educational
          campaigns.
        </p>
      </section>

      <section className="bg-[#fff8f0] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title text-[#b32e22]">Moments of Devotion</h2>
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
