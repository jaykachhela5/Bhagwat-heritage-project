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

const GUIDING_PRINCIPLES = [
  {
    icon: "🙏",
    title: "Devotion (Bhakti)",
    desc: "Devotion toward the Divine purifies the heart and brings inner peace. Bhakti connects the individual with divine grace and inspires righteous living.",
  },
  {
    icon: "📖",
    title: "Wisdom (Jnana)",
    desc: "True knowledge helps individuals understand the purpose of life and develop clarity of thought and conduct.",
  },
  {
    icon: "🤲",
    title: "Service (Seva)",
    desc: "Service to humanity is a sacred duty. Helping others with compassion and sincerity reflects the true spirit of spirituality.",
  },
  {
    icon: "🕉️",
    title: "Discipline (Sadhana)",
    desc: "Spiritual growth requires discipline, reflection, and dedication to spiritual practice.",
  },
  {
    icon: "🎭",
    title: "Cultural Responsibility",
    desc: "Preserving and honoring cultural heritage strengthens identity and inspires future generations.",
  },
];

const FOUNDATION_OBJECTIVES = [
  "Spreading Bhagwat wisdom through spiritual programs",
  "Promoting humanitarian service initiatives",
  "Supporting spiritual education and value-based learning",
  "Preserving cultural traditions and sacred knowledge",
  "Inspiring youth toward disciplined and meaningful lives",
];

const FOUNDER_SERVICES = [
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/bhagwatkatha_lfi5h9.png",
    title: "Bhagwat Katha",
    desc: "Request Shrimad Bhagwat Katha by Manish Bhaiji Maharaj for spiritual gatherings, religious events, and community programs.",
    button: "Contact for Bhagwat Katha",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944115/vastu_mzu8l6.jpg",
    title: "Vastu Guidance",
    desc: "Traditional Vastu Shastra consultation for homes, temples, offices, and spiritual spaces to promote harmony, positivity, and prosperity.",
    button: "Contact for Vastu Consultation",
  },
  {
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/astrologo_w1f3rx.webp",
    title: "Astrology Guidance",
    desc: "Jyotish consultation for life guidance, spiritual growth, career decisions, and personal well-being.",
    button: "Contact for Astrology Consultation",
  },
];

const divider = (
  <div className="max-w-6xl mx-auto px-4 py-2">
    <div className="bg-gradient-to-r from-[#ff6a00] to-[#fec758] h-1 w-full rounded-full" />
  </div>
);

export default memo(function ManishBhaijiPage() {
  const servicesRef = useRef<HTMLElement | null>(null);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    const target = servicesRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setServicesVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f0]">

      {/* ── Hero: Photo + Introduction ────────────────────────────────── */}
      <section className="w-full px-4 pt-8 md:pt-10 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src="/images/manish2.PNG"
                alt="Sant Shri Manish Bhai Ji Maharaj"
                className="w-full object-contain h-[320px] md:h-[520px]"
              />
            </div>
            <div>
              <p className="inline-flex items-center rounded-full border border-[#8bbbe6] bg-[#ebf5ff] px-4 py-1 text-sm text-[#0d4e85] mb-4">
                Bhagwat Heritage Service Foundation Trust
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-[#b32e22] leading-tight mb-2">
                Sant Shri Manish Bhaiji Maharaj
              </h1>
              <h3 className="text-base md:text-xl text-[#f09100] font-semibold mb-5">
                Spiritual Guide · Bhagwat Scholar · Social Reformer
              </h3>
              <div className="space-y-4 text-[#4a5964] text-base md:text-lg leading-relaxed mb-6">
                <p>
                  Sant Shri Manish Bhaiji Maharaj is a respected spiritual guide, Bhagwat scholar, and the inspirational force behind the mission of Shri Bhagwat Heritage Service Foundation. Through his teachings, discourses, and service initiatives, he continues to inspire individuals to live a life rooted in devotion, discipline, compassion, and cultural responsibility.
                </p>
                <p>
                  His spiritual journey reflects a deep commitment to spreading the sacred wisdom of Shrimad Bhagwat Mahapuran while guiding society toward moral strength, spiritual awareness, and service to humanity.
                </p>
              </div>
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

      {divider}

      {/* ── Impact Stats ──────────────────────────────────────────────── */}
      <ImpactCounter items={IMPACT} />

      {divider}

      {/* ── Spiritual Inspiration ─────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png"
              alt="Bhagwat Katha"
              className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">The Foundation of His Path</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">
              Spiritual Inspiration
            </h2>
            <div className="space-y-4 text-[#4a5964] leading-relaxed">
              <p>
                From an early stage of his spiritual journey, Sant Shri Manish Bhaiji Maharaj developed deep reverence for the sacred teachings of Shrimad Bhagwat Mahapuran and the spiritual heritage of Sanatan Dharma.
              </p>
              <p>
                The teachings of Bhagwat emphasize devotion toward the Divine, humility in conduct, compassion toward all beings, and dedication to righteous living. These teachings became the foundation of his spiritual path.
              </p>
              <p>
                His teachings emphasize that spiritual wisdom should guide individuals toward inner purity, moral clarity, and compassionate service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Bhagwat Katha and Spiritual Teaching ──────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">Spiritual Discourse</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">
                Bhagwat Katha &amp; Spiritual Teaching
              </h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
                <p>
                  One of the central aspects of his mission is the presentation of Bhagwat Katha — a sacred spiritual discourse that explains the teachings of Shrimad Bhagwat Mahapuran in a meaningful and inspiring manner.
                </p>
                <p>
                  Through Bhagwat Katha programs, he shares the message of devotion, spiritual wisdom, and ethical living with large audiences. His discourses help listeners understand the deeper spiritual meaning of scriptures while encouraging them to apply those teachings in daily life.
                </p>
                <p>
                  His teachings emphasize that spiritual knowledge should inspire humility, devotion, self-discipline, and service to others.
                </p>
              </div>
              <Link to={ROUTES.eventsKatha.bhagwatKatha} className="inline-block mt-6 bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
                Attend Bhagwat Katha
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/der8zinu8/image/upload/v1772944114/bhagwatkatha_lfi5h9.png"
                alt="Bhagwat Katha Discourse"
                className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Guiding Philosophy ────────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">Core Principles</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-3">Guiding Philosophy</h2>
          <p className="text-[#4a5964] max-w-2xl mx-auto">
            These principles form the foundation of his teachings and continue to guide the activities of the foundation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDING_PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-[#f1dcc0] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-lg font-black text-[#b32e22] mb-2">{p.title}</h3>
              <p className="text-[#4a5964] text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {divider}

      {/* ── Inspiration Behind the Foundation ────────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">The Vision</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">
                Inspiration Behind the Foundation
              </h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
                <p>
                  The vision of Shri Bhagwat Heritage Service Foundation emerged from the desire to create a platform where spiritual knowledge, humanitarian service, and cultural values could work together for the benefit of society.
                </p>
                <p>
                  Sant Shri Manish Bhaiji Maharaj envisioned an organization that would not only promote spiritual teachings but also encourage meaningful social initiatives that reflect compassion and responsibility.
                </p>
                <p>
                  The foundation serves as a bridge between spiritual wisdom and practical service to society.
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-4">Foundation Objectives</p>
              <div className="space-y-3">
                {FOUNDATION_OBJECTIVES.map((obj) => (
                  <div key={obj} className="flex items-start gap-3 bg-white rounded-xl border border-[#f1dcc0] px-4 py-3">
                    <span className="text-[#ff6a00] font-bold mt-0.5 shrink-0">✦</span>
                    <span className="text-[#4a5964] text-sm leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.about.index} className="inline-block mt-6 bg-white border border-[#d2deea] text-[#0d4e85] font-semibold px-6 py-3 rounded-xl hover:bg-[#f2f6fa] transition-colors">
                Learn About the Foundation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Social & Spiritual Service ────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png"
              alt="Humanitarian Seva"
              className="w-full h-[260px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">Seva in Action</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">
              Social &amp; Spiritual Service
            </h2>
            <div className="space-y-4 text-[#4a5964] leading-relaxed">
              <p>
                Sant Shri Manish Bhaiji Maharaj strongly believes that spirituality must express itself through compassion and service. Efforts are being made to support humanitarian activities including Gau Seva, food distribution, educational assistance, and community welfare programs.
              </p>
              <p>
                These initiatives aim to promote kindness, responsibility, and social harmony while encouraging individuals to contribute toward the welfare of others.
              </p>
              <p>
                By connecting spiritual awareness with social service, the foundation seeks to create a positive and lasting impact on society.
              </p>
            </div>
            <Link to={ROUTES.seva.annJal} className="inline-block mt-6 bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300">
              Explore Seva Programs
            </Link>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Youth Inspiration & Cultural Vision ───────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Youth */}
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <div className="text-3xl mb-3">🌱</div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-2">Future Generation</p>
              <h2 className="text-xl md:text-2xl font-black text-[#b32e22] mb-4 leading-tight">
                Inspiration for the Younger Generation
              </h2>
              <div className="space-y-3 text-[#4a5964] text-sm leading-relaxed">
                <p>
                  A key focus of his mission is guiding the younger generation toward positive values and responsible living. Modern society presents many challenges for youth — confusion about values, cultural disconnection, and lack of spiritual guidance.
                </p>
                <p>
                  Through his teachings and programs, he encourages young individuals to develop discipline, confidence, moral clarity, and spiritual awareness.
                </p>
                <p>
                  Youth who grow with strong values become capable of contributing meaningfully to society while maintaining cultural and spiritual roots.
                </p>
              </div>
            </div>
            {/* Cultural Vision */}
            <div className="bg-white rounded-2xl border border-[#f1dcc0] p-6 md:p-8">
              <div className="text-3xl mb-3">🏛️</div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-2">Heritage & Tradition</p>
              <h2 className="text-xl md:text-2xl font-black text-[#b32e22] mb-4 leading-tight">
                Cultural &amp; Spiritual Vision
              </h2>
              <div className="space-y-3 text-[#4a5964] text-sm leading-relaxed">
                <p>
                  Sant Shri Manish Bhaiji Maharaj envisions a society where spiritual wisdom and cultural values continue to guide human life.
                </p>
                <p>
                  His vision includes the development of spiritual learning platforms, temple projects, devotional programs, and service initiatives that help individuals connect with sacred traditions.
                </p>
                <p>
                  By nurturing both knowledge and character, the foundation seeks to support the growth of a balanced and harmonious society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Message to Society ────────────────────────────────────────── */}
      <section className="py-14 max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">His Message</p>
        <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-8">Message to Society</h2>
        <div className="space-y-5 text-[#4a5964] text-base md:text-lg leading-relaxed">
          <p>
            Sant Shri Manish Bhaiji Maharaj often emphasizes that the <span className="text-[#b32e22] font-semibold">transformation of society begins with the transformation of the individual.</span>
          </p>
          <p>
            When individuals cultivate devotion, humility, compassion, and responsibility, families become stronger, communities become harmonious, and society moves toward peace and progress.
          </p>
          <p>
            The teachings of Shrimad Bhagwat remind us that human life is a precious opportunity for spiritual growth and service to others.
          </p>
        </div>
        <blockquote className="mt-8 border-l-4 border-[#ff6a00] pl-6 text-left bg-white rounded-r-2xl py-4 pr-6 shadow-sm">
          <p className="text-[#7a4f1f] italic text-lg leading-relaxed font-medium">
            "Through devotion, wisdom, and compassionate action, every individual can contribute toward building a better world."
          </p>
          <footer className="mt-2 text-sm text-[#f09100] font-semibold">— Sant Shri Manish Bhaiji Maharaj</footer>
        </blockquote>
      </section>

      {divider}

      {/* ── Services / Connect ────────────────────────────────────────── */}
      <section ref={servicesRef} className="py-14 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">Guidance & Services</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22]">Connect with Manish Bhaiji Maharaj</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FOUNDER_SERVICES.map((item, index) => (
            <article
              key={item.title}
              className={`flex h-full flex-col rounded-[24px] border border-[#efd6b4] bg-white p-6 shadow-[0_10px_24px_rgba(13,59,102,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(13,59,102,0.14)] hover:border-[#f0b15d] ${
                servicesVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative overflow-hidden rounded-[20px] border border-[#f1dfc3] bg-[#fff7ec] shadow-sm">
                <img src={item.image} alt={item.title} className="h-44 w-full object-cover" loading="lazy" />
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
      </section>

      {divider}

      {/* ── Continuing the Journey ────────────────────────────────────── */}
      <section className="py-14 bg-[#fff3e8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f09100] font-semibold mb-3">The Path Ahead</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-5 leading-tight">
                Continuing the Spiritual Journey
              </h2>
              <div className="space-y-4 text-[#4a5964] leading-relaxed">
                <p>
                  The mission inspired by Sant Shri Manish Bhaiji Maharaj continues to grow through the efforts of the foundation, its volunteers, supporters, and participants in spiritual programs.
                </p>
                <p>
                  The journey ahead includes expanding spiritual education initiatives, strengthening service activities, preserving cultural traditions, and sharing the message of Bhagwat with wider audiences.
                </p>
                <p>
                  Through collective dedication and sincere devotion, the foundation seeks to move forward toward a future guided by spiritual wisdom and compassionate service.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📖", label: "Spiritual Education" },
                { icon: "🤲", label: "Service Initiatives" },
                { icon: "🎭", label: "Cultural Preservation" },
                { icon: "🌏", label: "Global Outreach" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-[#f1dcc0] p-5 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-[#b32e22] font-bold text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-[#b32e22] text-center mb-8">Moments of Devotion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["/images/s1.jfif", "/images/Inspriation Main.jpg", "/images/Aims & objectives main.jpg"].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Devotional moment ${i + 1}`}
              className="w-full h-52 object-cover rounded-2xl shadow"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ))}
        </div>
      </section>

      {divider}

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-[#b32e22] mb-3">
            Learn More About the Mission &amp; Join the Spiritual Journey
          </h2>
          <p className="text-[#4a5964] max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Be part of a growing movement rooted in devotion, service, and spiritual wisdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-block bg-gradient-to-r from-[#ff6a00] to-[#ed9b24] hover:from-[#ed9b24] hover:to-[#fec758] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300"
            >
              Become a Volunteer
            </Link>
            <Link
              to={ROUTES.donate}
              className="inline-block bg-white border border-[#d2deea] text-[#0d4e85] font-bold px-8 py-3.5 rounded-xl hover:bg-[#f2f6fa] transition-colors"
            >
              Support the Mission
            </Link>
            <Link
              to={ROUTES.eventsKatha.bhagwatKatha}
              className="inline-block border border-[#ff6a00]/50 text-[#b32e22] font-bold px-8 py-3.5 rounded-xl hover:bg-[#fff3e8] transition-colors"
            >
              Participate in Spiritual Programs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
});
