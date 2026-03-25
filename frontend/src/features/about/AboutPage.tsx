import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const SEVA_MEDIA = [
  { href: ROUTES.seva.gau, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png", label: "Gau Seva" },
  { href: ROUTES.seva.annJal, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png", label: "Ann Seva" },
  { href: ROUTES.seva.education, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png", label: "Education" },
  { href: ROUTES.seva.medicine, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png", label: "Medicine" },
  { href: ROUTES.seva.vyasanmukti, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/vyasanmukti_xa9hif.png", label: "Vyasanmukti" },
  { href: ROUTES.seva.kanyadaan, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583758/kanyadan_ftf9oc.png", label: "Kanyadaan" },
];

const LEADERS = [
  { name: "S.S. Manish Bhai Ji", role: "Spiritual Guide & Founder", href: ROUTES.about.founder, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png" },
  { name: "Trust Committee", role: "Administration & Management", href: ROUTES.about.structure, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png" },
  { name: "Seva Volunteers", role: "Community Service & Support", href: ROUTES.involved.volunteer, image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png" },
];

const CORE_AREAS = [
  {
    icon: "📖",
    title: "Spiritual Education",
    desc: "Bhagwat Katha programs, satsang gatherings, spiritual discourses, and study initiatives that help individuals understand the teachings of Shrimad Bhagwat and other sacred scriptures.",
    href: ROUTES.eventsKatha.bhagwatKatha,
  },
  {
    icon: "🤲",
    title: "Humanitarian Service",
    desc: "Service to humanity as an expression of devotion — Gau Seva, Ann Seva food distribution, medicine distribution, educational support, scholarship assistance, and disaster relief.",
    href: ROUTES.seva.annJal,
  },
  {
    icon: "🎭",
    title: "Cultural Preservation",
    desc: "Preserving and promoting India's spiritual heritage through cultural programs, festivals, devotional practices, and educational initiatives for all generations.",
    href: ROUTES.mission.cultural,
  },
  {
    icon: "💻",
    title: "Spiritual Learning Platforms",
    desc: "E-Pathshala, digital learning resources, and spiritual study materials making sacred knowledge accessible to people of all ages and backgrounds.",
    href: ROUTES.knowledge.pathshala,
  },
];

const HUMANITARIAN_INITIATIVES = [
  "Gau Seva programs",
  "Ann Seva food distribution",
  "Medicine distribution for needy individuals",
  "Educational support for students",
  "Scholarship assistance",
  "Disaster relief activities",
];

const HIGHLIGHTS = [
  { value: "35+", label: "Years of Service" },
  { value: "1L+", label: "Lives Touched" },
  { value: "500+", label: "Events Conducted" },
  { value: "1200+", label: "Seva Volunteers" },
];

interface Milestone { year: string; title: string; desc: string; }

const MILESTONES: Milestone[] = [
  { year: "1990", title: "Foundation Established", desc: "Shri Bhagwat Heritage Service Foundation founded with a mission of spiritual and humanitarian service." },
  { year: "2000", title: "Bhagwat Katha Programs Begin", desc: "Regular Bhagwat Katha Mahotsav programs launched to spread the teachings of Shrimad Bhagwat." },
  { year: "2010", title: "Humanitarian Seva Expansion", desc: "Expanded Gau Seva, Ann Seva, medical camps, and education support programs across Maharashtra." },
  { year: "2018", title: "Chandrapur Mahamandir Vision", desc: "Foundation of the 63-Ft Hanuman Murti and Mahamandir temple complex project at Dham Chandrapur." },
  { year: "2022", title: "Cultural Revival Programs", desc: "Launched youth cultural programs, E-Pathshala, and digital spiritual learning initiatives." },
  { year: "2026", title: "Global Outreach & Future Growth", desc: "Expanding spiritual centers, service networks, and digital platforms to inspire individuals worldwide." },
];

export default memo(function AboutPage() {
  const { t } = useTranslation();
  usePageMeta("About — Shri Bhagwat Heritage Service Foundation", "Learn about the mission, vision, and service work of Shri Bhagwat Heritage Service Foundation Trust.");

  return (
    <div className="bg-[#0B2230] text-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[28px] text-center text-white px-5 py-14 md:px-12 md:py-20 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(11,34,48,0.9) 0%, rgba(11,34,48,0.7) 45%, rgba(245,158,11,0.28) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%)]" />
          <div className="relative z-10">
            <p className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-sm mb-6 bg-white/10">
              Shri Bhagwat Heritage Service Foundation Trust
            </p>
            <h1 className="text-3xl md:text-6xl font-black mb-4">
              About Shri Bhagwat Heritage<br className="hidden md:block" /> Service Foundation
            </h1>
            <p className="text-lg md:text-2xl font-medium text-white/90 max-w-3xl mx-auto">
              Spiritual Wisdom • Compassionate Service • Cultural Preservation
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-bold px-7 py-3 rounded-xl transition-colors">
                Support the Mission
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block border border-white/25 bg-white/10 text-white font-bold px-7 py-3 rounded-xl hover:bg-white/15 transition-colors">
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#12394A] border border-white/10 p-4 md:p-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
              <p className="text-3xl md:text-5xl font-extrabold text-[#F59E0B]">{item.value}</p>
              <p className="text-sm md:text-base text-white/80 mt-1.5">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl bg-[#12394A] p-3 border border-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png"
              alt="Bhagwat Katha"
              className="w-full h-[260px] md:h-[340px] object-cover rounded-xl"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Introduction</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
              A Mission Rooted in<br />Devotion and Service
            </h2>
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Shri Bhagwat Heritage Service Foundation is a spiritual and humanitarian initiative dedicated to spreading the timeless wisdom of Shrimad Bhagwat Mahapuran while serving society through compassion, cultural preservation, and value-based education.
              </p>
              <p>
                Inspired by the sacred teachings of Sanatan Dharma and guided by the spiritual vision of Sant Shri Manish Bhaiji Maharaj, the foundation works to create a harmonious connection between spiritual knowledge and practical service to humanity.
              </p>
              <p>
                The foundation believes that spiritual awareness should inspire individuals to cultivate devotion, moral character, social responsibility, and compassionate action in everyday life.
              </p>
            </div>
            <Link to={ROUTES.about.objectives} className="inline-block mt-6 bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
              View Our Objectives
            </Link>
          </div>
        </div>
      </section>

      {/* ── Inspiration Behind the Mission ────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">The Sacred Inspiration</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">The Inspiration Behind the Mission</h2>
          <div className="space-y-5 text-white/80 text-base md:text-lg leading-relaxed text-left md:text-center">
            <p>
              The guiding inspiration of Shri Bhagwat Heritage Service Foundation is the divine wisdom contained in <span className="text-[#F59E0B] font-semibold">Shrimad Bhagwat Mahapuran</span> — one of the most revered scriptures of Sanatan tradition.
            </p>
            <p>
              Shrimad Bhagwat teaches the path of devotion, righteousness, humility, compassion, and divine love. It presents spiritual knowledge in a way that inspires individuals to purify their hearts, cultivate devotion toward the Divine, and live a life dedicated to service and dharma.
            </p>
            <p>
              The foundation considers this scripture not only a sacred text but also a living guide for building a spiritually awakened society. By sharing the teachings of Bhagwat in a modern and accessible way, the foundation seeks to inspire individuals to bring spiritual values into their personal lives, families, and communities.
            </p>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#12394A] px-6 py-4">
            <span className="text-3xl">📜</span>
            <p className="text-[#F59E0B] font-semibold italic text-base md:text-lg text-left">
              "Shrimad Bhagwat — A Living Guide for Spiritual Awakening and Compassionate Living"
            </p>
          </div>
        </div>
      </section>

      {/* ── The Vision ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Our Direction</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">The Vision of the Foundation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🕉️",
              title: "Spiritual Society",
              desc: "Create a society where spiritual awareness, moral values, and compassionate service become guiding principles for life.",
            },
            {
              icon: "🌱",
              title: "Inner Clarity & Peace",
              desc: "Reconnect individuals with timeless teachings of Bhagwat to inspire purposeful living with devotion and integrity in a rapidly changing world.",
            },
            {
              icon: "🌏",
              title: "Long-Term Growth",
              desc: "Develop spiritual learning platforms, service initiatives, cultural programs, and sacred spaces that cultivate devotion, knowledge, and character.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-black text-[#F59E0B] mb-3">{v.title}</h3>
              <p className="text-white/80 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sant Manish Bhaiji's Role ──────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Spiritual Guide</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                The Role of Sant Shri<br />Manish Bhaiji Maharaj
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  The spiritual inspiration and guiding force behind the foundation is <span className="text-[#F59E0B] font-semibold">Sant Shri Manish Bhaiji Maharaj</span> — a respected spiritual guide and Bhagwat scholar devoted to spreading the sacred teachings of Shrimad Bhagwat.
                </p>
                <p>
                  Through spiritual discourses, satsang gatherings, and social initiatives, Sant Shri Manish Bhaiji Maharaj continues to inspire individuals toward a life of devotion, discipline, humility, and service.
                </p>
                <p>
                  His teachings emphasize that true spirituality is not limited to rituals or philosophical study — it should transform the individual's character and inspire compassionate action for the welfare of society.
                </p>
              </div>
              <Link to={ROUTES.about.founder} className="inline-block mt-6 bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
                Learn About Manish Bhaiji
              </Link>
            </div>
            <div className="order-1 md:order-2 rounded-2xl bg-[#12394A] p-3 border border-white/10">
              <img
                src="/images/manish2.PNG"
                alt="Sant Shri Manish Bhaiji Maharaj"
                className="w-full h-[280px] md:h-[380px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Areas of Work ────────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Core Areas of Work</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The foundation carries out its mission through interconnected areas that integrate spirituality with practical service to humanity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORE_AREAS.map((area) => (
            <div key={area.title} className="bg-[#12394A] rounded-2xl p-6 border border-white/10 hover:border-[#F59E0B]/50 transition-all group">
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="text-xl font-black text-[#F59E0B] mb-3">{area.title}</h3>
              <p className="text-white/80 leading-relaxed mb-4">{area.desc}</p>
              <Link to={area.href} className="text-sm font-semibold text-[#F59E0B] hover:text-white transition-colors group-hover:underline">
                Explore → 
              </Link>
            </div>
          ))}
        </div>

        {/* Humanitarian initiatives list */}
        <div className="mt-8 rounded-2xl bg-[#0e2a3a] border border-white/10 p-6 md:p-8">
          <h3 className="text-xl font-black text-[#F59E0B] mb-4">Humanitarian Service Initiatives</h3>
          <p className="text-white/70 mb-5 leading-relaxed">
            The foundation believes that service to humanity is an expression of devotion. Various service initiatives support individuals and communities in need:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HUMANITARIAN_INITIATIVES.map((item) => (
              <div key={item} className="flex items-start gap-2 bg-[#12394A] rounded-lg px-4 py-3 border border-white/10">
                <span className="text-[#F59E0B] font-bold mt-0.5 shrink-0">✦</span>
                <span className="text-white/85 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seva Programs Grid ─────────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">Our Seva Programs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {SEVA_MEDIA.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="bg-[#12394A] rounded-2xl p-4 text-center border border-white/10 hover:border-[#F59E0B] hover:shadow-md transition-all"
              >
                <img src={item.image} alt={item.label} className="h-20 w-20 rounded-xl object-cover mx-auto mb-3" loading="lazy" />
                <p className="font-semibold text-white text-sm">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Building a Culture of Service and Devotion ────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Core Principle</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
              Building a Culture of<br />Service and Devotion
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                One of the central principles of the foundation is that spiritual wisdom must be expressed through service. Devotion becomes meaningful when it inspires individuals to help others, uplift communities, and contribute toward collective well-being.
              </p>
              <p>
                The foundation encourages individuals to participate in volunteer programs, service initiatives, and community activities. By working together in a spirit of devotion and responsibility, individuals develop both inner growth and social awareness.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.involved.volunteer} className="btn-secondary">
                Join as Volunteer
              </Link>
              <Link to={ROUTES.seva.annJal} className="inline-block border border-white/25 bg-white/10 text-white font-semibold px-5 py-2 rounded-md hover:bg-white/15 transition-colors">
                Explore Seva
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-[#12394A] p-3 border border-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png"
              alt="Seva in Action"
              className="w-full h-[260px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones ──────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MILESTONES.map((step) => (
              <div key={`${step.year}-${step.title}`} className="rounded-xl bg-[#12394A] border border-white/10 p-5 flex gap-4">
                <p className="text-[#F59E0B] font-black text-lg shrink-0 w-12">{step.year}</p>
                <div>
                  <h3 className="text-white font-bold text-base">{step.title}</h3>
                  <p className="text-white/70 mt-1 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision for the Future ─────────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <div className="rounded-[28px] bg-[linear-gradient(135deg,#12394A_0%,#0e2a3a_100%)] border border-[#F59E0B]/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Looking Ahead</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Vision for the Future</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🛕", title: "Spiritual Centers", desc: "Develop sacred spaces and spiritual centers that serve as hubs of devotion, learning, and community service." },
              { icon: "📡", title: "Digital & Global Outreach", desc: "Expand digital learning platforms and global outreach to inspire individuals across generations and geographies." },
              { icon: "🌟", title: "Divine Society", desc: "Combine ancient scriptural wisdom with modern needs to contribute toward a divine personality and compassionate, spiritually awakened world." },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-black text-[#F59E0B] mb-2">{f.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/70 mt-8 max-w-3xl mx-auto leading-relaxed">
            By combining the wisdom of ancient scriptures with the needs of modern society, the foundation hopes to contribute toward building a divine personality, a compassionate society, and a spiritually awakened world.
          </p>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────────────────────── */}
      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERS.map((person) => (
              <div key={person.name} className="bg-[#12394A] rounded-xl p-6 text-center border border-white/10">
                <img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                <h3 className="font-bold text-white">{person.name}</h3>
                <p className="text-sm text-white/70 mb-4">{person.role}</p>
                <Link to={person.href} className="inline-block rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d88908] transition-colors">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Invitation to Participate ─────────────────────────────────── */}
      <section className="py-14 md:py-16 max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-semibold mb-3">Open to All</p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Invitation to Participate</h2>
        <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
          <p>
            The mission of Shri Bhagwat Heritage Service Foundation grows through the participation of sincere individuals who wish to contribute toward spiritual awareness and humanitarian service.
          </p>
          <p>
            Whether through volunteering, supporting service initiatives, participating in spiritual programs, or simply sharing the message of Bhagwat — every individual can become part of this collective journey.
          </p>
          <p className="text-[#F59E0B] font-semibold italic text-lg">
            "Together, with devotion in the heart and service in action, we move forward in the light of Shrimad Bhagwat."
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#F59E0B]/20 bg-[#12394A] p-8 md:p-10 text-center shadow-lg">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Join the Mission of Devotion, Service &amp; Spiritual Awakening
          </h2>
          <p className="text-white/75 max-w-3xl mx-auto mb-8 mt-3">
            Every contribution — through time, resources, or participation — helps carry forward the sacred work of Shrimad Bhagwat Heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Become a Volunteer
            </Link>
            <Link to={ROUTES.donate} className="inline-block bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              Support the Mission
            </Link>
            <Link to={ROUTES.eventsKatha.bhagwatKatha} className="inline-block border border-[#F59E0B]/50 text-[#F59E0B] hover:bg-[#F59E0B]/10 font-bold px-8 py-3.5 rounded-xl transition-colors">
              Participate in Spiritual Programs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
});
