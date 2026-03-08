import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type ActivityCategory = {
  title: string;
  description: string;
  image: string;
  href: string;
  accent: string;
  badge: string;
};

type ImpactMetric = {
  label: string;
  target: number;
  suffix?: string;
  note: string;
};

type RecentActivity = {
  title: string;
  date: string;
  location: string;
  summary: string;
  image: string;
};

type GallerySlide = {
  title: string;
  caption: string;
  image: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    title: "Spiritual Programs & Bhagwat Kathas",
    description:
      "Discourses, satsang gatherings, mantra remembrance, and Bhagwat Katha programs designed to deepen devotion and spiritual understanding.",
    image: "/images/kathapravachan.png",
    href: ROUTES.eventsKatha.bhagwatKatha,
    accent: "from-[#f59e0b]/30 to-[#f97316]/20",
    badge: "SK",
  },
  {
    title: "Education & Knowledge Distribution",
    description:
      "Pathshala support, scriptural study resources, youth learning initiatives, and access to value-based educational content for families and communities.",
    image: "/images/education.png",
    href: ROUTES.knowledge.studyResources,
    accent: "from-[#38bdf8]/25 to-[#0ea5e9]/10",
    badge: "ED",
  },
  {
    title: "Cultural Preservation Activities",
    description:
      "Programs that protect devotional arts, Sanatan values, heritage teachings, and intergenerational participation in living cultural traditions.",
    image: "/images/sanskriti.png",
    href: ROUTES.mission.cultural,
    accent: "from-[#fb7185]/25 to-[#f59e0b]/10",
    badge: "CP",
  },
  {
    title: "Social Welfare & Community Service",
    description:
      "Ann seva, health support, relief-oriented outreach, and organized volunteer action that converts faith into visible community care.",
    image: "/images/annseva.png",
    href: ROUTES.seva.index,
    accent: "from-[#22c55e]/25 to-[#14b8a6]/10",
    badge: "SW",
  },
  {
    title: "Religious Events & Festivals",
    description:
      "Seasonal celebrations, devotional festivals, and trust-led community observances that bring people together in prayer, gratitude, and service.",
    image: "/images/heritage1.png",
    href: ROUTES.eventsKatha.festivals,
    accent: "from-[#c084fc]/20 to-[#60a5fa]/10",
    badge: "RF",
  },
  {
    title: "Charity & Donation Programs",
    description:
      "Transparent donation-backed initiatives that support seva delivery, welfare projects, spiritual outreach, and long-term mission development.",
    image: "/images/chikitsa.png",
    href: ROUTES.donate,
    accent: "from-[#facc15]/20 to-[#f59e0b]/10",
    badge: "CD",
  },
];

const IMPACT_METRICS: ImpactMetric[] = [
  { label: "Events Organized", target: 150, suffix: "+", note: "Bhagwat Katha, satsang, seva drives, and annual observances." },
  { label: "People Benefited", target: 25000, suffix: "+", note: "Community members reached through spiritual and service programs." },
  { label: "Volunteers Involved", target: 320, suffix: "+", note: "Dedicated sevadars supporting event execution and field outreach." },
  { label: "Years of Service", target: 12, suffix: "+", note: "A growing commitment to dharma, heritage, and social responsibility." },
];

const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    title: "Bhagwat Katha & Satsang Week",
    date: "February 18, 2026",
    location: "Bhagwat Dham Campus",
    summary:
      "A multi-day discourse series focused on devotion, scripture understanding, and family participation through prayer and guided reflection.",
    image: "/images/pravachan.png",
  },
  {
    title: "Community Ann Seva Drive",
    date: "January 29, 2026",
    location: "Service Outreach Center",
    summary:
      "Volunteers coordinated food distribution and on-ground support for families, elderly participants, and daily wage communities.",
    image: "/images/annseva.png",
  },
  {
    title: "Youth Heritage Learning Session",
    date: "January 12, 2026",
    location: "Bhagwat Study Hall",
    summary:
      "Interactive learning sessions introduced children and youth to cultural values, sacred stories, and disciplined devotional habits.",
    image: "/images/education.png",
  },
  {
    title: "Festival Celebration & Cultural Sabha",
    date: "December 22, 2025",
    location: "Main Prayer Ground",
    summary:
      "A devotional gathering combining bhajan, spiritual guidance, cultural presentations, and community-led volunteer support.",
    image: "/images/heritage.png",
  },
];

const GALLERY_SLIDES: GallerySlide[] = [
  {
    title: "Bhagwat Katha Gatherings",
    caption: "Spiritual assemblies that bring scripture, reflection, and devotion into shared community life.",
    image: "/images/spiritual1.png",
  },
  {
    title: "Festival and Sabha Moments",
    caption: "Celebrations that strengthen cultural continuity, collective participation, and devotional joy.",
    image: "/images/heritage1.png",
  },
  {
    title: "Education and Value-Based Learning",
    caption: "Programs for children, youth, and families focused on scriptural literacy and character formation.",
    image: "/images/education.png",
  },
  {
    title: "Seva in Action",
    caption: "Field outreach supported by volunteers, donors, and mission-driven trust coordination.",
    image: "/images/annseva.png",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The trust's programs are disciplined, devotional, and genuinely service-oriented. Every event feels purposeful and welcoming.",
    name: "Ramesh Patel",
    role: "Bhagwat Katha Participant",
  },
  {
    quote:
      "Our family experienced both spiritual guidance and practical support through the trust's outreach. The impact was immediate and respectful.",
    name: "Sunita Sharma",
    role: "Community Beneficiary",
  },
  {
    quote:
      "Volunteering here means working with structure, sincerity, and a real sense of mission. The trust turns intention into visible service.",
    name: "Amit Joshi",
    role: "Seva Volunteer",
  },
];

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(target * progress));
          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        };

        window.requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, target]);

  return { count, ref };
}

const MetricCard = memo(function MetricCard({ metric }: { metric: ImpactMetric }) {
  const { count, ref } = useCountUp(metric.target);

  return (
    <div
      ref={ref}
      className="rounded-[28px] border border-white/10 bg-[#12394A] p-5 shadow-[0_14px_32px_rgba(0,0,0,0.22)]"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffd08a]">{metric.label}</p>
      <p className="mt-3 text-4xl font-black text-white md:text-5xl">
        {count.toLocaleString()}
        {metric.suffix ?? ""}
      </p>
      <p className="mt-3 text-sm leading-6 text-[#d7e3ea]">{metric.note}</p>
    </div>
  );
});

export default memo(function AboutActivitiesOverviewPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  usePageMeta(
    "Trust Activities Overview",
    "Explore the trust activities overview of Bhagwat Heritage Service Foundation Trust, including spiritual programs, seva, education, cultural preservation, recent activities, gallery highlights, and opportunities to participate.",
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % GALLERY_SLIDES.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeGalleryItem = GALLERY_SLIDES[activeSlide];

  return (
    <div className="min-h-screen bg-[#0B2230] pb-16 text-white">
      <section className="px-4 pt-8 md:pt-10">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-cover bg-center shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(11,34,48,0.92) 0%, rgba(11,34,48,0.78) 45%, rgba(245,158,11,0.24) 100%), url('/images/hero1.png')",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,208,138,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_32%)]" />
          <div className="relative z-10 px-5 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                <li>
                  <Link to={ROUTES.home} className="transition-colors hover:text-[#ffd08a]">
                    Home
                  </Link>
                </li>
                <li className="text-white/45">&gt;</li>
                <li>
                  <Link to={ROUTES.about.index} className="transition-colors hover:text-[#ffd08a]">
                    About
                  </Link>
                </li>
                <li className="text-white/45">&gt;</li>
                <li aria-current="page" className="font-semibold text-[#ffd08a]">
                  Trust Activities Overview
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#ffd08a]">
                Mission in Action
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Trust Activities Overview</h1>
              <p className="mt-5 text-base leading-7 text-white/85 md:text-xl md:leading-8">
                Bhagwat Heritage Service Foundation Trust advances spiritual awakening, cultural continuity, and
                compassionate service through katha, satsang, education, seva, and community-led outreach.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex items-center rounded-xl bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#dd8f0a]"
                >
                  Become a Volunteer
                </Link>
                <Link
                  to={ROUTES.donate}
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Donate to the Trust
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-8 px-4 pb-6">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Service Areas", value: "6", note: "Spiritual, cultural, educational, welfare, festival, and charity initiatives." },
            { label: "Volunteer Spirit", value: "Mission-Led", note: "Programs supported by disciplined trust coordination and seva teams." },
            { label: "Community Reach", value: "Local + Regional", note: "Activities built for families, devotees, students, and beneficiaries." },
            { label: "Approach", value: "Faith + Service", note: "A balanced model of devotion, heritage, and practical social contribution." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#12394A] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#ffd08a]">{item.label}</p>
              <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#d7e3ea]">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Introduction</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Serving Society, Culture, and Spiritual Heritage</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[#d7e3ea] md:text-lg">
              <p>
                Bhagwat Heritage Service Foundation Trust exists to preserve and share spiritual wisdom while translating
                devotion into organized service for society. Its work connects scriptural learning, satsang, cultural
                celebration, and charitable outreach into one coherent trust mission.
              </p>
              <p>
                The trust serves communities through Bhagwat Kathas, educational initiatives, welfare activities,
                volunteer-driven support programs, and heritage-centered events that strengthen values across generations.
              </p>
              <p>
                Its long-term vision is to build an enduring ecosystem where dharma, compassion, and cultural identity are
                actively lived through disciplined programs, trusted partnerships, and sustainable public participation.
              </p>
            </div>
          </article>

          <aside className="grid gap-4">
            {[
              {
                title: "Purpose",
                text: "To create meaningful spiritual and social impact through devotion, discipline, and service-led action.",
              },
              {
                title: "Vision",
                text: "To become a trusted platform for heritage preservation, scriptural learning, and compassionate public service.",
              },
              {
                title: "Commitment",
                text: "To deliver every trust activity with sincerity, transparency, and visible benefit for communities and devotees.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#133a4b_0%,#0f3140_100%)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
              >
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#d7e3ea]">{item.text}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Main Activity Categories</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Core Areas of Trust Activity</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ACTIVITY_CATEGORIES.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#143446] shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} via-transparent to-transparent`} />
                  <div className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B2230]/80 text-sm font-black text-[#ffd08a]">
                    {item.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#d7e3ea]">{item.description}</p>
                  <Link
                    to={item.href}
                    className="mt-5 inline-flex rounded-xl border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-4 py-2.5 text-sm font-bold text-[#ffd08a] transition-colors hover:bg-[#F59E0B]/20"
                  >
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#12394A_0%,#0f3140_100%)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Activity Highlights</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Measured Through Consistent Community Impact</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#d7e3ea] md:text-base">
              The trust's work spans recurring spiritual events, welfare support, volunteer participation, and long-term
              cultural preservation, all delivered with a service-first mindset.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {IMPACT_METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Recent Activities</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Recent Trust Work Across Programs and Outreach</h2>
            </div>
            <Link
              to={ROUTES.media.highlights}
              className="inline-flex rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              See Event Highlights
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {RECENT_ACTIVITIES.map((item) => (
              <article
                key={`${item.title}-${item.date}`}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[#143446] shadow-[0_14px_32px_rgba(0,0,0,0.18)]"
              >
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd08a]">
                    <span>{item.date}</span>
                    <span className="text-white/35">|</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#d7e3ea]">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#103246] shadow-[0_16px_34px_rgba(0,0,0,0.24)]">
            <div className="relative">
              <img
                src={activeGalleryItem.image}
                alt={activeGalleryItem.title}
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2230] via-[#0b2230]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Photo Gallery Preview</p>
                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{activeGalleryItem.title}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-[#d7e3ea]">{activeGalleryItem.caption}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Moments from Trust Activities</h2>
            <p className="mt-4 leading-7 text-[#d7e3ea]">
              A quick visual preview of satsang, seva, education, and celebration across the trust's activity calendar.
            </p>

            <div className="mt-6 grid gap-3">
              {GALLERY_SLIDES.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`flex items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-[#F59E0B]/40 bg-[#F59E0B]/10"
                        : "border-white/10 bg-[#143446] hover:border-white/20"
                    }`}
                  >
                    <img src={slide.image} alt={slide.title} className="h-16 w-20 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-white">{slide.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#d7e3ea]">{slide.caption}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {GALLERY_SLIDES.map((slide, index) => (
                  <button
                    key={`${slide.title}-dot`}
                    type="button"
                    aria-label={`Show gallery slide ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide ? "w-8 bg-[#F59E0B]" : "w-2.5 bg-white/35"
                    }`}
                  />
                ))}
              </div>
              <Link
                to={ROUTES.media.photos}
                className="inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#dd8f0a]"
              >
                View Full Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#12394A_0%,#0f3140_50%,#17384a_100%)] p-6 text-center shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Call To Action</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Participate in the Trust's Ongoing Work</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#d7e3ea] md:text-lg">
            Support the trust through volunteer service, partnership, or direct contribution and help expand programs
            rooted in devotion, public benefit, and cultural continuity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-flex rounded-xl bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#dd8f0a]"
            >
              Become a Volunteer
            </Link>
            <Link
              to={ROUTES.involved.partner}
              className="inline-flex rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
            >
              Support Our Activities
            </Link>
            <Link
              to={ROUTES.donate}
              className="inline-flex rounded-xl border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-6 py-3 font-semibold text-[#ffd08a] transition-all hover:-translate-y-0.5 hover:bg-[#F59E0B]/20"
            >
              Donate to the Trust
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd08a]">Testimonials</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">Voices from Participants and Beneficiaries</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={`${item.name}-${item.role}`}
                className="rounded-[28px] border border-white/10 bg-[#143446] p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)]"
              >
                <p className="text-lg leading-8 text-[#edf5f9]">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-black text-white">{item.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[#ffd08a]">{item.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
