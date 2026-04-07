import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
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

const heroActivitiesImage = "/images/hero1.png";

const heroButtons = [
  {
    label: "Donate to the Trust",
    to: ROUTES.donate,
    className:
      "bg-[#f3a11f] text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] hover:bg-[#ffaf31]",
  },
  {
    label: "See Event Highlights",
    to: ROUTES.media.highlights,
    className:
      "bg-[#0f7994] text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] hover:bg-[#1492b1]",
  },
  {
    label: "Support Our Activities",
    to: ROUTES.involved.partner,
    className:
      "border border-white/35 bg-white/8 text-white shadow-[0_12px_26px_rgba(6,22,33,0.22)] hover:bg-white/14",
  },
];

const topStats = [
  {
    title: "Service Areas",
    label: "6 Core Streams",
    note: "Spiritual, cultural, educational, welfare, festival, and charity initiatives.",
  },
  {
    title: "Volunteer Spirit",
    label: "Mission-Led",
    note: "Programs supported by disciplined trust coordination and seva teams.",
  },
  {
    title: "Community Reach",
    label: "Local + Regional",
    note: "Activities built for families, devotees, students, and beneficiaries.",
  },
  {
    title: "Approach",
    label: "Faith + Service",
    note: "A balanced model of devotion, heritage, and practical social contribution.",
  },
];

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

const ACTIVITIES_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]";
const ACTIVITIES_HEADING = "text-[14px] font-black text-white md:text-[20px]";
const ACTIVITIES_BODY = "text-base leading-7 text-[#dce7ec] md:text-lg";
const ACTIVITIES_CARD_TITLE = "text-2xl font-black text-white md:text-[1.75rem]";
const ACTIVITIES_LIST_TITLE = "text-lg font-black text-white md:text-xl";
const ACTIVITIES_TOP_CARD_TITLE = "text-[20px] font-black uppercase tracking-wide text-[#ef9a1e] md:text-[24px]";
const ACTIVITIES_TOP_CARD_VALUE = "mt-1 text-[14px] font-black text-white md:text-[20px]";
const SECTION_PANEL =
  "rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const CARD_PANEL =
  "rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

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
      <HeroSection
        title="Trust Activities Overview"
        subtitle="Mission in Action"
        subtitleClassName="whitespace-nowrap text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={heroActivitiesImage}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {heroButtons.slice(0, 2).map((button) => (
            <Link
              key={button.label}
              to={button.to}
              className={`inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-colors ${button.className}`}
            >
              {button.label}
            </Link>
          ))}
        </div>
        <div className="mt-3 flex justify-center">
          <Link
            to={heroButtons[2].to}
            className={`inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-colors ${heroButtons[2].className}`}
          >
            {heroButtons[2].label}
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 md:grid-cols-2 xl:grid-cols-4">
          {topStats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#0d6179] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]"
            >
              <p className={ACTIVITIES_TOP_CARD_TITLE}>* {item.title}</p>
              <p className={ACTIVITIES_TOP_CARD_VALUE}>{item.label}</p>
              <p className={`mt-1 ${ACTIVITIES_BODY}`}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className={SECTION_PANEL}>
            <p className={ACTIVITIES_LABEL}>Introduction</p>
            <h2 className={`mt-3 ${ACTIVITIES_HEADING}`}>Serving Society, Culture, and Spiritual Heritage</h2>
            <div className={`mt-6 space-y-5 ${ACTIVITIES_BODY}`}>
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
                className={CARD_PANEL}
              >
                <h3 className={ACTIVITIES_CARD_TITLE}>{item.title}</h3>
                <p className={`mt-3 ${ACTIVITIES_BODY}`}>{item.text}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={SECTION_PANEL}>
          <p className={ACTIVITIES_LABEL}>Main Activity Categories</p>
          <h2 className={`mt-3 ${ACTIVITIES_HEADING}`}>Core Areas of Trust Activity</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ACTIVITY_CATEGORIES.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#0c5871] shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/45"
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
                  <h3 className={ACTIVITIES_CARD_TITLE}>{item.title}</h3>
                  <p className={`mt-3 ${ACTIVITIES_BODY}`}>{item.description}</p>
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
        <div className={SECTION_PANEL}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={ACTIVITIES_LABEL}>Recent Activities</p>
              <h2 className={`mt-3 ${ACTIVITIES_HEADING}`}>Recent Trust Work Across Programs and Outreach</h2>
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
                className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0c5871] shadow-[0_14px_32px_rgba(0,0,0,0.18)]"
              >
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd08a]">
                    <span>{item.date}</span>
                    <span className="text-white/35">|</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className={`mt-3 ${ACTIVITIES_CARD_TITLE}`}>{item.title}</h3>
                  <p className={`mt-3 ${ACTIVITIES_BODY}`}>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0d6179] shadow-[0_16px_34px_rgba(0,0,0,0.24)]">
            <div className="relative">
              <img
                src={activeGalleryItem.image}
                alt={activeGalleryItem.title}
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2230] via-[#0b2230]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className={ACTIVITIES_LABEL}>Photo Gallery Preview</p>
                <h2 className={`mt-3 ${ACTIVITIES_CARD_TITLE}`}>{activeGalleryItem.title}</h2>
                <p className={`mt-3 max-w-2xl ${ACTIVITIES_BODY}`}>{activeGalleryItem.caption}</p>
              </div>
            </div>
          </div>

          <div className={SECTION_PANEL}>
            <h2 className={ACTIVITIES_HEADING}>Moments from Trust Activities</h2>

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
                        : "border-white/10 bg-[#0c5871] hover:border-white/20"
                    }`}
                  >
                    <img src={slide.image} alt={slide.title} className="h-16 w-20 rounded-xl object-cover" />
                    <div>
                      <h3 className={ACTIVITIES_LIST_TITLE}>{slide.title}</h3>
                      <p className={`mt-1 ${ACTIVITIES_BODY}`}>{slide.caption}</p>
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
        <div className={`${SECTION_PANEL} text-center md:p-10`}>
          <p className={ACTIVITIES_LABEL}>Call To Action</p>
          <h2 className={`mt-3 ${ACTIVITIES_HEADING}`}>Participate in the Trust's Ongoing Work</h2>
          <p className={`mx-auto mt-4 max-w-3xl ${ACTIVITIES_BODY}`}>
            Support the trust through volunteer service, partnership, or direct contribution and help expand programs
            rooted in devotion, public benefit, and cultural continuity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* <Link
              to={ROUTES.involved.volunteer}
              className="inline-flex rounded-xl bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#dd8f0a]"
            >
              Become a Volunteer
            </Link> */}
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
        <div className={SECTION_PANEL}>
          <p className={ACTIVITIES_LABEL}>Testimonials</p>
          <h2 className={`mt-3 ${ACTIVITIES_HEADING}`}>Voices from Participants and Beneficiaries</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={`${item.name}-${item.role}`}
                className="rounded-[24px] border border-white/10 bg-[#0c5871] p-6 shadow-[0_14px_32px_rgba(0,0,0,0.18)]"
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
