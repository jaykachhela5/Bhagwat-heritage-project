import { memo, useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";

type NavCard = {
  title: string;
  desc: string;
  href: string;
};

type RecognitionCategory = "All" | "National" | "Seva" | "Education" | "Cultural";

type RecognitionItem = {
  year: string;
  title: string;
  presenter: string;
  category: Exclude<RecognitionCategory, "All">;
  summary: string;
  impact: string;
};

type StructureCategory = "Governance" | "Spiritual Leadership" | "Seva Operations" | "Administration & Outreach";

type StructureUnit = {
  title: string;
  category: StructureCategory;
  lead: string;
  summary: string;
  duties: string[];
};

type ActivityStream = "All" | "Spiritual" | "Seva" | "Education" | "Cultural";

type TrustActivity = {
  title: string;
  stream: Exclude<ActivityStream, "All">;
  unit: string;
  cadence: string;
  timeWindow: string;
  location: string;
  summary: string;
  days: number[];
};

type DailyQuoteEntry = {
  id: string;
  text: string;
  author: string;
  theme: string;
  publishDate: string;
  createdAt: string;
  createdBy: string;
};

type VideoGalleryCategory = "Katha" | "Seva" | "Festival" | "Youth";

type VideoGalleryItem = {
  slug: string;
  category: VideoGalleryCategory;
  title: string;
  duration: string;
  image: string;
  note: string;
  summary: string;
  videoUrl: string;
};

const DAILY_QUOTE_STORAGE_KEY = "bh_daily_spiritual_quotes";

const DEFAULT_DAILY_QUOTES: DailyQuoteEntry[] = [
  {
    id: "quote-1",
    text: "Where remembrance of Bhagwan becomes steady, the mind slowly becomes peaceful and the heart becomes gentle.",
    author: "Bhagwat Reflection Desk",
    theme: "Bhakti",
    publishDate: "2026-03-08",
    createdAt: "2026-03-08T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    id: "quote-2",
    text: "Seva performed with humility purifies intention more deeply than action performed for recognition.",
    author: "Bhagwat Reflection Desk",
    theme: "Seva",
    publishDate: "2026-03-07",
    createdAt: "2026-03-07T06:00:00.000Z",
    createdBy: "admin",
  },
  {
    id: "quote-3",
    text: "Daily discipline is the bridge between inspiration and spiritual growth.",
    author: "Bhagwat Reflection Desk",
    theme: "Discipline",
    publishDate: "2026-03-06",
    createdAt: "2026-03-06T06:00:00.000Z",
    createdBy: "admin",
  },
];

const MEDIA_VIDEO_GALLERY_ITEMS: VideoGalleryItem[] = [
  {
    slug: "shreemad-bhagwat-katha-day-1",
    category: "Katha",
    title: "Bhagwat Heritage Video 1",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Featured katha and devotional discourse",
    summary: "Featured devotional video from the Bhagwat Heritage YouTube collection, available in the dedicated player page.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
  },
  {
    slug: "bhagwat-pravachan-clip-series",
    category: "Katha",
    title: "Bhagwat Heritage Video 2",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Pravachan and spiritual guidance session",
    summary: "A second featured video from the trust collection for satsang listening and reflection.",
    videoUrl: "https://www.youtube.com/watch?v=cOFNyxt4MhM",
  },
  {
    slug: "gau-seva-field-documentary",
    category: "Seva",
    title: "Bhagwat Heritage Video 3",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Seva-related visual content and devotional outreach",
    summary: "A featured media selection from the trust's YouTube-linked seva and outreach content.",
    videoUrl: "https://www.youtube.com/watch?v=wrg8NMrPwOs",
  },
  {
    slug: "festival-darshan-atmosphere-reel",
    category: "Festival",
    title: "Bhagwat Heritage Video 4",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Festival and darshan-focused featured video",
    summary: "A celebration-oriented featured video from the Bhagwat Heritage media collection.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
  },
  {
    slug: "pathshala-youth-session-recap",
    category: "Youth",
    title: "Bhagwat Heritage Video 5",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Youth and spiritual participation video",
    summary: "A youth-facing trust video designed for devotional engagement and community connection.",
    videoUrl: "https://www.youtube.com/watch?v=oW_Z8hICrHo",
  },
  {
    slug: "aarti-prasad-highlight-film",
    category: "Festival",
    title: "Bhagwat Heritage Video 6",
    duration: "YouTube",
    image: "/images/kathapravachan.png",
    note: "Aarti, temple atmosphere, and devotional highlight video",
    summary: "A sixth featured trust video from the shared YouTube set for devotees to watch directly in the player page.",
    videoUrl: "https://www.youtube.com/watch?v=Rq5iBnW8UEQ",
  },
];

function getYouTubeVideoId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? "";
}

function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeVideoId(url);
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
    : url;
}

function sortQuotes(items: DailyQuoteEntry[]) {
  return [...items].sort((a, b) => {
    if (a.publishDate === b.publishDate) return b.createdAt.localeCompare(a.createdAt);
    return b.publishDate.localeCompare(a.publishDate);
  });
}

const RECOGNITION_FILTERS: RecognitionCategory[] = ["All", "National", "Seva", "Education", "Cultural"];

const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    year: "2025",
    title: "Community Seva Excellence Honor",
    presenter: "Regional Dharma and Welfare Forum",
    category: "Seva",
    summary: "Recognized for sustained ann, jal, and medical support delivered through disciplined volunteer coordination.",
    impact: "Expanded direct-service operations for pilgrims, rural families, and festival gatherings.",
  },
  {
    year: "2024",
    title: "Cultural Heritage Preservation Citation",
    presenter: "Indian Culture Outreach Council",
    category: "Cultural",
    summary: "Acknowledged for preserving devotional traditions through katha programs, temple initiatives, and youth engagement.",
    impact: "Strengthened cultural education visibility across trust events and public programs.",
  },
  {
    year: "2024",
    title: "Education Support Appreciation Award",
    presenter: "District Student Welfare Collective",
    category: "Education",
    summary: "Honored for scholarship guidance, study support, and value-based educational outreach for children and youth.",
    impact: "Improved educational assistance planning for underserved students and family beneficiaries.",
  },
  {
    year: "2023",
    title: "National Spiritual Service Recognition",
    presenter: "Bharat Seva Samman Parishad",
    category: "National",
    summary: "Recognized for integrating devotion, seva, and social welfare through trust-led public initiatives.",
    impact: "Created stronger institutional credibility for future social and spiritual collaborations.",
  },
  {
    year: "2023",
    title: "Volunteer-Led Public Welfare Commendation",
    presenter: "Jan Kalyan Coordination Board",
    category: "Seva",
    summary: "Awarded for responsive volunteer deployment during high-footfall events and community support drives.",
    impact: "Validated the trust's ground-level service model and volunteer training discipline.",
  },
  {
    year: "2022",
    title: "Youth Sanskriti Inspiration Plaque",
    presenter: "Bal Sanskar and Youth Mission Circle",
    category: "Cultural",
    summary: "Presented for engaging youth in satsang, spiritual learning, and value-led cultural participation.",
    impact: "Increased youth-facing programming and family participation in ongoing trust activities.",
  },
];

const STRUCTURE_CATEGORIES: StructureCategory[] = [
  "Governance",
  "Spiritual Leadership",
  "Seva Operations",
  "Administration & Outreach",
];

const STRUCTURE_UNITS: StructureUnit[] = [
  {
    title: "Trust Board and Core Governance",
    category: "Governance",
    lead: "Trustees and senior decision-making body",
    summary: "Provides strategic direction, financial oversight, policy alignment, and approval for major trust initiatives.",
    duties: ["Vision setting and annual planning", "Compliance and accountability review", "Approval of major projects and budgets"],
  },
  {
    title: "Advisory and Dharmic Guidance Council",
    category: "Governance",
    lead: "Senior advisors and dharmic mentors",
    summary: "Supports the trust with institutional guidance, ethical review, and program recommendations rooted in Sanatan values.",
    duties: ["Long-range mission guidance", "Cultural and dharmic alignment", "Strategic counsel for expansion initiatives"],
  },
  {
    title: "Founder and Spiritual Direction",
    category: "Spiritual Leadership",
    lead: "Shri Manish Bhaiji Maharaj",
    summary: "Anchors the spiritual mission of the trust through discourse, inspiration, discipline, and value-centered leadership.",
    duties: ["Spiritual vision and discourse leadership", "Guidance for satsang and katha programs", "Value-based direction for trust initiatives"],
  },
  {
    title: "Satsang and Scriptural Programs Wing",
    category: "Spiritual Leadership",
    lead: "Program coordinators and discourse support teams",
    summary: "Plans bhagwat katha, satsang sabhas, study circles, and devotional learning experiences for devotees and families.",
    duties: ["Program planning and event coordination", "Volunteer deployment for spiritual gatherings", "Audience support and devotional engagement"],
  },
  {
    title: "Ann, Jal, and Medical Seva Wing",
    category: "Seva Operations",
    lead: "Seva coordinators and field volunteers",
    summary: "Executes food distribution, water support, basic care initiatives, and relief-oriented trust service delivery.",
    duties: ["Ground-level seva execution", "Distribution planning and volunteer scheduling", "Beneficiary support and response coordination"],
  },
  {
    title: "Education, Youth, and Family Support Wing",
    category: "Seva Operations",
    lead: "Education volunteers and family outreach team",
    summary: "Focuses on student aid, youth development, scholarship support, value education, and family-centered assistance.",
    duties: ["Student and youth support planning", "Scholarship and mentorship coordination", "Family engagement and outreach activities"],
  },
  {
    title: "Operations, Finance, and Documentation Cell",
    category: "Administration & Outreach",
    lead: "Administrative coordinators",
    summary: "Handles records, reporting, program logistics, financial process support, and internal documentation flow.",
    duties: ["Administrative process control", "Documentation and reporting", "Budget coordination and logistics tracking"],
  },
  {
    title: "Communications, Partnerships, and Public Outreach",
    category: "Administration & Outreach",
    lead: "Media, donor, and outreach coordinators",
    summary: "Builds community relations, donor communication, partnership development, and trust visibility across channels.",
    duties: ["Donor and partner communication", "Public messaging and media coordination", "Community engagement and outreach support"],
  },
];

const STRUCTURE_FLOW = [
  {
    step: "Vision",
    title: "Spiritual and strategic direction",
    desc: "Mission priorities originate from spiritual guidance and trust-level planning.",
  },
  {
    step: "Review",
    title: "Governance and advisory validation",
    desc: "Trust leadership reviews feasibility, compliance, impact, and alignment with values.",
  },
  {
    step: "Execution",
    title: "Department and seva deployment",
    desc: "Operational wings convert the approved direction into field execution and public programs.",
  },
  {
    step: "Reporting",
    title: "Feedback and accountability loop",
    desc: "Teams report outcomes, lessons, and next requirements back to leadership for refinement.",
  },
];

const ACTIVITY_STREAMS: ActivityStream[] = ["All", "Spiritual", "Seva", "Education", "Cultural"];

const TRUST_ACTIVITY_ITEMS: TrustActivity[] = [
  {
    title: "Morning Bhagwat Path and Satsang",
    stream: "Spiritual",
    unit: "Spiritual Programs Wing",
    cadence: "Daily",
    timeWindow: "06:30-08:00",
    location: "Main satsang hall",
    summary: "Daily scriptural recitation, satsang reflection, and devotee guidance to begin the day in discipline.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Ann and Jal Seva Coordination",
    stream: "Seva",
    unit: "Food and relief service teams",
    cadence: "Daily",
    timeWindow: "10:00-13:00",
    location: "Community seva kitchen and distribution points",
    summary: "Volunteer-led food preparation, water logistics, and beneficiary support coordination.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Student Mentoring and Study Support",
    stream: "Education",
    unit: "Education and youth support wing",
    cadence: "Weekdays",
    timeWindow: "16:00-18:00",
    location: "Learning support rooms",
    summary: "Guided learning sessions, mentorship, and scholarship follow-up for students and families.",
    days: [1, 2, 3, 4, 5],
  },
  {
    title: "Bal Sanskar and Youth Circle",
    stream: "Cultural",
    unit: "Youth and cultural development teams",
    cadence: "Weekends",
    timeWindow: "17:30-19:00",
    location: "Cultural activity hall",
    summary: "Value education, devotional learning, and youth participation activities rooted in Sanatan heritage.",
    days: [0, 6],
  },
  {
    title: "Volunteer Review and Duty Allocation",
    stream: "Seva",
    unit: "Operations and volunteer desk",
    cadence: "Daily",
    timeWindow: "19:00-20:00",
    location: "Coordination office",
    summary: "Next-shift planning, duty assignment, response updates, and service quality review.",
    days: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Weekly Katha and Outreach Planning",
    stream: "Spiritual",
    unit: "Trust leadership and event planning team",
    cadence: "Weekly",
    timeWindow: "11:00-12:30",
    location: "Program planning room",
    summary: "Review of upcoming katha programs, outreach priorities, and devotee engagement plans.",
    days: [2],
  },
];

const WEEKDAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const GAU_SEVA_FEATURES = [
  {
    title: "Daily Fodder Support",
    desc: "Green grass, dry fodder, mineral mix, and nutrition planning for gaushala care.",
  },
  {
    title: "Medical and Rescue Care",
    desc: "Periodic health checkups, emergency care coordination, and support for weak or injured cows.",
  },
  {
    title: "Volunteer Gaushala Seva",
    desc: "Ground seva through feeding, cleaning, water support, and disciplined care routines.",
  },
];

const GAU_QUICK_HIGHLIGHTS = [
  { title: "Daily Grass Requirement", value: "2.5 Tons", note: "Fresh green fodder for routine nourishment" },
  { title: "Volunteer Sevadars", value: "350+", note: "Active contributors in gaushala and field seva" },
  { title: "Cows Supported", value: "180+", note: "Regularly cared for through trust seva support" },
  { title: "Emergency Response", value: "< 4 hrs", note: "Average support time for urgent cow care requests" },
];

const GAU_IMPACT_STATS = [
  { value: "180+", label: "Cows Receiving Daily Support" },
  { value: "75+", label: "Fodder Sponsorships Each Month" },
  { value: "24x7", label: "Basic Water and Shelter Attention" },
  { value: "52", label: "Major Seva Drives Per Year" },
];

const GAU_ROUTINE = [
  {
    step: "1. Morning Feeding",
    desc: "Fresh grass, dry fodder, and water distribution begin the day with nourishment and care.",
  },
  {
    step: "2. Cleanliness and Shelter Care",
    desc: "Gaushala areas are cleaned, resting zones are maintained, and water points are checked.",
  },
  {
    step: "3. Health Monitoring",
    desc: "Daily observation helps identify weakness, injury, or veterinary attention requirements early.",
  },
  {
    step: "4. Evening Seva and Review",
    desc: "Final feeding rounds, calm supervision, and next-day support planning are completed.",
  },
];

const GAU_JOIN_OPTIONS = [
  {
    title: "Join Gau Seva",
    desc: "Register as a volunteer for gaushala service, feeding rounds, cleaning support, and field coordination.",
    cta: "Join as Volunteer",
    href: ROUTES.involved.volunteer,
    tone: "bg-[linear-gradient(135deg,#0f5a98_0%,#0d8f91_100%)] text-white",
  },
  {
    title: "Donate Grass / Fodder",
    desc: "Sponsor green grass, dry fodder bundles, mineral feed, and seasonal nutrition support for daily care.",
    cta: "Donate Grass",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#ff8a00_0%,#cf4f00_100%)] text-white",
  },
  {
    title: "Support Medical Care",
    desc: "Help fund checkups, treatment, supplements, and emergency rescue support for vulnerable cows.",
    cta: "Support Medical Seva",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#17384b_0%,#102837_100%)] text-white",
  },
];

const GAU_DONATION_TIERS = [
  { label: "One Day Grass Seva", amount: "Rs 1,100", note: "Fresh fodder support for one day" },
  { label: "Weekly Fodder Seva", amount: "Rs 7,500", note: "Grass and dry feed sponsorship for one week" },
  { label: "Monthly Gau Support", amount: "Rs 21,000", note: "Nutrition, water, and daily care support" },
];

const GAU_STORIES = [
  {
    name: "Gaushala Care Team",
    quote: "When fodder arrives on time, the entire gaushala routine becomes stable and the cows remain calm and healthy.",
  },
  {
    name: "Volunteer Sevadar",
    quote: "Gau Seva taught me patience, humility, and devotion. Even one hour of seva in the gaushala changes the heart.",
  },
  {
    name: "Donor Family",
    quote: "Sponsoring grass seva gave our family a meaningful way to contribute regularly to dharmic service.",
  },
];

const GAU_FAQS = [
  {
    q: "How can I join Gau Seva as a volunteer?",
    a: "Use the Join Gau Seva button on this page. The trust team can connect you for feeding, cleaning, water support, and gaushala duty scheduling.",
  },
  {
    q: "Can I donate only for grass and fodder?",
    a: "Yes. You can specifically support green grass, dry fodder, nutrition mix, or general daily cow care through the donation options.",
  },
  {
    q: "Can I sponsor a day of Gau Seva in the name of my family?",
    a: "Yes. Day-wise and monthly Gau Seva sponsorship options can be dedicated for family seva intentions and remembrance.",
  },
];

const DISASTER_FEATURES = [
  {
    title: "Rapid Relief Deployment",
    desc: "Quick mobilization of food kits, water, blankets, medicines, and essential family support.",
  },
  {
    title: "Volunteer Field Response",
    desc: "Trained sevadars coordinate rescue support, camp logistics, and beneficiary registration on the ground.",
  },
  {
    title: "Recovery and Follow-up",
    desc: "Beyond emergency aid, the trust supports families with follow-up relief, care, and rehabilitation assistance.",
  },
];

const DISASTER_QUICK_HIGHLIGHTS = [
  { title: "Emergency Relief Hotline", value: "+91 98765 43210", note: "Primary disaster support coordination line" },
  { title: "Volunteer Response Teams", value: "500+", note: "Ground volunteers available for rapid deployment" },
  { title: "Relief Coverage Zones", value: "22", note: "Priority districts and outreach clusters" },
  { title: "Average Activation Time", value: "< 4 hrs", note: "Response window after field verification" },
];

const DISASTER_IMPACT_STATS = [
  { value: "12,000+", label: "Relief Kits Delivered" },
  { value: "80+", label: "Emergency Camps Supported" },
  { value: "35,000+", label: "Beneficiaries Reached" },
  { value: "365", label: "Days of Readiness" },
];

const DISASTER_PROCESS = [
  {
    step: "1. Alert and Assessment",
    desc: "Field teams verify the situation, identify urgent needs, and map affected families and areas.",
  },
  {
    step: "2. Relief Mobilization",
    desc: "Food, water, medical supplies, blankets, and volunteer teams are assembled for dispatch.",
  },
  {
    step: "3. Camp Distribution",
    desc: "Essential aid is delivered through organized camps, direct household support, and local coordination points.",
  },
  {
    step: "4. Recovery Support",
    desc: "Post-crisis follow-up helps families with recurring essentials, medical support, and welfare guidance.",
  },
];

const DISASTER_JOIN_OPTIONS = [
  {
    title: "Join Relief Volunteer Team",
    desc: "Assist with packing, field distribution, registration, logistics support, and camp coordination.",
    cta: "Join Disaster Relief",
    href: ROUTES.involved.volunteer,
    tone: "bg-[linear-gradient(135deg,#0f5a98_0%,#0d8f91_100%)] text-white",
  },
  {
    title: "Donate Relief Supplies",
    desc: "Help provide dry ration kits, blankets, medicine support, water, and hygiene essentials.",
    cta: "Donate for Relief",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#ff8a00_0%,#cf4f00_100%)] text-white",
  },
  {
    title: "Sponsor Recovery Support",
    desc: "Support post-disaster rehabilitation assistance for affected families and vulnerable communities.",
    cta: "Support Recovery",
    href: ROUTES.donate,
    tone: "bg-[linear-gradient(135deg,#17384b_0%,#102837_100%)] text-white",
  },
];

const DISASTER_DONATION_TIERS = [
  { label: "Emergency Family Kit", amount: "Rs 1,500", note: "Dry ration, water, and essential supplies" },
  { label: "Camp Support Sponsor", amount: "Rs 7,500", note: "Support one active relief camp response cycle" },
  { label: "Recovery Assistance", amount: "Rs 25,000", note: "Extended support for affected families and communities" },
];

const DISASTER_STORIES = [
  {
    name: "Field Volunteer Team",
    quote: "Disaster relief seva requires speed and discipline. When supplies reach families on time, hope returns immediately.",
  },
  {
    name: "Beneficiary Family",
    quote: "The support arrived when we had lost food, bedding, and daily essentials. It gave us strength to restart.",
  },
  {
    name: "Seva Coordinator",
    quote: "The most important part of disaster relief is organized compassion. Every volunteer becomes a lifeline for someone.",
  },
];

const DISASTER_FAQS = [
  {
    q: "How can I join the disaster relief volunteer team?",
    a: "Use the Join Disaster Relief button on this page. Volunteers can support logistics, packing, field work, registration, and beneficiary assistance.",
  },
  {
    q: "What does my donation support in disaster relief?",
    a: "Donations help fund ration kits, water, medicines, blankets, emergency camp supplies, transport, and post-crisis recovery support.",
  },
  {
    q: "Can I sponsor relief in a specific area?",
    a: "Yes. The trust can coordinate targeted support for a location or active emergency based on ground verification and current need.",
  },
];

function parseTimeWindow(timeWindow: string) {
  const [start, end] = timeWindow.split("-");

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  return { startMinutes: toMinutes(start), endMinutes: toMinutes(end) };
}

function getActivityStatus(now: Date, activity: TrustActivity) {
  const today = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const { startMinutes, endMinutes } = parseTimeWindow(activity.timeWindow);
  const isScheduledToday = activity.days.includes(today);

  if (isScheduledToday && currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    return {
      label: "Live Now",
      tone: "bg-[#e8fff1] text-[#0d7a43] border-[#b7e6c9]",
      note: `Active until ${activity.timeWindow.split("-")[1]}`,
    };
  }

  if (isScheduledToday && currentMinutes < startMinutes) {
    return {
      label: "Upcoming Today",
      tone: "bg-[#eef6ff] text-[#1d4d75] border-[#cfe0f1]",
      note: `Starts at ${activity.timeWindow.split("-")[0]}`,
    };
  }

  return {
    label: "Scheduled",
    tone: "bg-[#fff7ea] text-[#9a5b1d] border-[#efd9ba]",
    note: activity.cadence,
  };
}

function formatCountdownParts(diffMs: number) {
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}

function ArchitectureHubPage({
  title,
  subtitle,
  cards,
}: {
  title: string;
  subtitle: string;
  cards: NavCard[];
}) {
  usePageMeta(title, subtitle);

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-3xl border border-[#f1d6b0] bg-gradient-to-r from-[#fff8ef] via-[#fff5e8] to-[#fff1df] p-6 md:p-8 shadow-[0_14px_30px_rgba(172,85,22,0.16)]">
          <h1 className="text-3xl md:text-5xl font-black text-[#8a3d06]">{title}</h1>
          <p className="mt-3 text-[#7a4d28] md:text-lg">{subtitle}</p>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <article key={card.href} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-black text-[#123753]">{card.title}</h2>
              <p className="text-sm text-[#4f6272] mt-2 mb-4">{card.desc}</p>
              <Link to={card.href} className="btn-primary text-sm">
                Open Section
              </Link>
            </article>
          ))}
        </div>
      </PageSectionShell>
    </div>
  );
}

function ArchitecturePlaceholderPage({
  title,
  summary,
  bullets,
}: {
  title: string;
  summary: string;
  bullets: string[];
}) {
  usePageMeta(title, summary);

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
          <p className="inline-flex rounded-full border border-[#d8e4f2] bg-[#f5f9ff] px-3 py-1 text-xs font-semibold text-[#1d4d75]">
            Content Placeholder
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-black text-[#123753]">{title}</h1>
          <p className="mt-2 text-[#4f6272] max-w-3xl">{summary}</p>
          <div className="mt-4 rounded-xl border border-[#f1d8b9] bg-[#fff7ea] p-4">
            <p className="text-sm text-[#7a4f1f]">
              This page is active in the new architecture and ready for detailed trust content.
            </p>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-[#123753] mb-3">Planned Highlights</h2>
          <ul className="space-y-2 text-[#4f6272]">
            {bullets.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#0d3b66]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSectionShell>
    </div>
  );
}

type EventHighlight = {
  title: string;
  value: string;
  note: string;
};

type EventFeature = {
  title: string;
  desc: string;
};

type EventTier = {
  label: string;
  amount: string;
  note: string;
};

type EventVoice = {
  name: string;
  quote: string;
};

type EventFaq = {
  q: string;
  a: string;
};

function EventShowcasePage({
  title,
  subtitle,
  backgroundImage,
  metaDescription,
  aboutTitle,
  aboutParagraphs,
  highlights,
  features,
  supportTracks,
  donationTiers,
  testimonials,
  faqs,
  primaryCta,
  secondaryCta,
  extraSection,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
  metaDescription: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  highlights: EventHighlight[];
  features: EventFeature[];
  supportTracks: string[];
  donationTiers: EventTier[];
  testimonials: EventVoice[];
  faqs: EventFaq[];
  primaryCta: string;
  secondaryCta: string;
  extraSection?: ReactNode;
}) {
  usePageMeta(title, metaDescription);

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {primaryCta}
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {secondaryCta}
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">{aboutTitle}</h2>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5 first:mt-0">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {features.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Event Support Tracks</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Join or Support This Event</h3>
            <p className="text-xl text-white/95 mb-6">
              Support venue readiness, hospitality, volunteer coordination, digital outreach, and event execution through your seva.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {donationTiers.map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                  <p className="text-sm text-white/85 mt-2">{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Voices from the Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <p className="text-[#dbe7ee] text-xl leading-relaxed">"{item.quote}"</p>
                <p className="text-[#ffb06a] font-semibold text-lg mt-4">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5">
                <summary className="cursor-pointer text-white text-xl font-semibold">{item.q}</summary>
                <p className="text-[#d4e1e8] text-lg mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const MissionHubPage = memo(function MissionHubPage() {
  return (
    <ArchitectureHubPage
      title="Mission & Philosophy"
      subtitle="Spiritual mission, social service mission, cultural renaissance, and global outreach vision."
      cards={[
        { title: "Spiritual Mission", desc: "Bhakti, satsang, and scriptural guidance programs.", href: ROUTES.mission.spiritual },
        { title: "Social Service Mission", desc: "Compassion-led initiatives for families and society.", href: ROUTES.mission.social },
        { title: "Cultural Renaissance", desc: "Protection and revival of values and heritage.", href: ROUTES.mission.cultural },
        { title: "Global Outreach Vision", desc: "Vision for global satsang and service collaboration.", href: ROUTES.mission.global },
      ]}
    />
  );
});

export const SevaHubPage = memo(function SevaHubPage() {
  return (
    <ArchitectureHubPage
      title="Seva"
      subtitle="A structured seva ecosystem covering food, water, education, healthcare, and social upliftment."
      cards={[
        { title: "Gau Seva", desc: "Cow care, protection, and sattvik seva support.", href: ROUTES.seva.gau },
        { title: "Ann / Jal Seva", desc: "Food and water service for devotees and communities.", href: ROUTES.seva.annJal },
        { title: "Medicine Distribution", desc: "Medical support and medicine access programs.", href: ROUTES.seva.medicine },
        { title: "Education Support", desc: "Student aid, mentoring, and educational seva.", href: ROUTES.seva.education },
        { title: "Scholarship Program", desc: "Scholarship support for deserving learners.", href: ROUTES.seva.scholarship },
        { title: "Kanyadaan Seva", desc: "Support with dignity for family ceremonies.", href: ROUTES.seva.kanyadaan },
        { title: "Vyasanmukti Abhiyan", desc: "Addiction recovery and rehabilitation support.", href: ROUTES.seva.vyasanmukti },
        { title: "Disaster Relief", desc: "Rapid response support during emergencies.", href: ROUTES.seva.disasterRelief },
        { title: "Volunteer Programs", desc: "Seva teams and volunteer coordination models.", href: ROUTES.seva.volunteerPrograms },
      ]}
    />
  );
});

export const EventsKathaHubPage = memo(function EventsKathaHubPage() {
  return (
    <ArchitectureHubPage
      title="Events & Katha"
      subtitle="Bhagwat Katha and devotional events calendar with youth and festival engagement."
      cards={[
        { title: "Bhagwat Katha Mahotsav", desc: "Large-scale katha assemblies and devotional discourse.", href: ROUTES.eventsKatha.bhagwatKatha },
        { title: "Spiritual Events", desc: "Satsang sabhas, path, and spiritual gatherings.", href: ROUTES.eventsKatha.spiritualEvents },
        { title: "Festivals & Celebrations", desc: "Traditional utsavs and seasonal observances.", href: ROUTES.eventsKatha.festivals },
        { title: "Guru Purnima", desc: "Guru bhakti and spiritual gratitude programs.", href: ROUTES.eventsKatha.guruPurnima },
        { title: "Annakut Mahotsav", desc: "Devotional offering and community celebration.", href: ROUTES.eventsKatha.annakut },
        { title: "Youth Programs", desc: "Youth-focused camps, classes, and leadership sessions.", href: ROUTES.eventsKatha.youthPrograms },
      ]}
    />
  );
});

export const KnowledgeHubPage = memo(function KnowledgeHubPage() {
  return (
    <ArchitectureHubPage
      title="Knowledge & Learning"
      subtitle="Digital learning ecosystem for scriptural study, children learning, and daily inspiration."
      cards={[
        { title: "E-Pathshala", desc: "Interactive dharmic learning modules and admissions.", href: ROUTES.knowledge.pathshala },
        { title: "Digital Library", desc: "Curated spiritual catalog and reading resources.", href: ROUTES.knowledge.library },
        { title: "Bhagwat Study Resources", desc: "Structured notes and guided study material.", href: ROUTES.knowledge.studyResources },
        { title: "Children Spiritual Learning", desc: "Bal sanskar and value-based spiritual modules.", href: ROUTES.knowledge.children },
        { title: "Daily Spiritual Quotes", desc: "Daily reflection and inspirational quote stream.", href: ROUTES.knowledge.dailyQuotes },
      ]}
    />
  );
});

export const MandirTeerthHubPage = memo(function MandirTeerthHubPage() {
  return (
    <ArchitectureHubPage
      title="Mandir & Teerth"
      subtitle="Temple vision, architecture, murti concept, construction updates, and pilgrimage guidance."
      cards={[
        { title: "Bhagwat Dham Project", desc: "Swaminarayan Mandir project overview and seva matrix.", href: ROUTES.mandirTeerth.bhagwatDham },
        { title: "Mahamandir Architecture", desc: "Hanuman Mahamandir design and darshan details.", href: ROUTES.mandirTeerth.mahamandir },
        { title: "24 Avatars Installation", desc: "Planned avatar installation concept updates.", href: ROUTES.mandirTeerth.avatars },
        { title: "Hanuman Murti Concept", desc: "Kasthbhanjan Hanuman murti and darshan concept.", href: ROUTES.mandirTeerth.hanuman },
        { title: "Temple Construction Updates", desc: "Milestones and progress reports.", href: ROUTES.mandirTeerth.construction },
        { title: "Pilgrimage Information", desc: "Travel and teerth visitor support details.", href: ROUTES.mandirTeerth.pilgrimage },
      ]}
    />
  );
});

export const MediaGalleryHubPage = memo(function MediaGalleryHubPage() {
  return (
    <ArchitectureHubPage
      title="Media & Gallery"
      subtitle="Photo and video gallery, event highlights, publications, and social media feed."
      cards={[
        { title: "Photo Gallery", desc: "Temple events and trust activities photo archive.", href: ROUTES.media.photos },
        { title: "Video Gallery", desc: "Katha clips and devotional event videos.", href: ROUTES.media.videos },
        { title: "Event Highlights", desc: "High-impact moments from recent programs.", href: ROUTES.media.highlights },
        { title: "Publications", desc: "Trust publications and downloadable content.", href: ROUTES.media.publications },
        { title: "Social Media Feed", desc: "Connected trust social updates and links.", href: ROUTES.media.socialFeed },
      ]}
    />
  );
});

export const DigitalServicesHubPage = memo(function DigitalServicesHubPage() {
  return (
    <ArchitectureHubPage
      title="Digital Services"
      subtitle="Online store, donation system, satsang access, membership portal, and Kundli services."
      cards={[
        { title: "E-Store", desc: "Spiritual products and devotional resources.", href: ROUTES.digital.store },
        { title: "Donation System", desc: "Digital donation channels with transparent support.", href: ROUTES.digital.donation },
        { title: "Online Satsang", desc: "Virtual satsang and broadcast programs.", href: ROUTES.digital.satsang },
        { title: "Membership / User Portal", desc: "Member access and personalized resources.", href: ROUTES.digital.membership },
        { title: "Kundli", desc: "Request spiritual astrology guidance and birth chart consultation.", href: ROUTES.digital.kundli },
      ]}
    />
  );
});

export const GetInvolvedHubPage = memo(function GetInvolvedHubPage() {
  return (
    <ArchitectureHubPage
      title="Get Involved"
      subtitle="Volunteer, donate, partner, and sponsor meaningful seva and spiritual initiatives."
      cards={[
        { title: "Volunteer Registration", desc: "Join trust seva teams with skill-based assignment.", href: ROUTES.involved.volunteer },
        { title: "Become a Donor", desc: "Support causes with transparent donation flow.", href: ROUTES.involved.donor },
        { title: "Partner With Us", desc: "Collaborate as an institution or service partner.", href: ROUTES.involved.partner },
        { title: "Sponsor Programs", desc: "Sponsor events, education, and social outreach programs.", href: ROUTES.involved.sponsor },
      ]}
    />
  );
});

export const AboutAwardsPage = memo(function AboutAwardsPage() {
  const [activeFilter, setActiveFilter] = useState<RecognitionCategory>("All");

  usePageMeta(
    "Awards & Recognition",
    "Recognitions, honors, and milestone acknowledgements reflecting the trust's spiritual, social, and cultural impact.",
  );

  const visibleRecognitions =
    activeFilter === "All"
      ? RECOGNITION_ITEMS
      : RECOGNITION_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="overflow-hidden rounded-[2rem] border border-[#f0d9b5] bg-[radial-gradient(circle_at_top_left,_rgba(255,243,222,0.92),_rgba(255,255,255,1)_45%,_rgba(234,245,255,0.95)_100%)] p-6 md:p-8 shadow-[0_18px_40px_rgba(18,55,83,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#e7c79b] bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#9a5b1d]">
                Trust Honors
              </p>
              <h1 className="mt-4 text-3xl font-black text-[#123753] md:text-5xl">Awards & Recognition</h1>
              <p className="mt-3 text-base leading-7 text-[#4f6272] md:text-lg">
                A living archive of trust honors, public acknowledgements, and milestone recognitions earned through seva,
                spiritual programs, educational support, and cultural preservation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[420px]">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <p className="text-2xl font-black text-[#8a3d06]">12+</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Recognitions</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <p className="text-2xl font-black text-[#8a3d06]">7</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Institutions</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <p className="text-2xl font-black text-[#8a3d06]">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Impact Areas</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <p className="text-2xl font-black text-[#8a3d06]">2022</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Archive Start</p>
              </div>
            </div>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <section className="rounded-[2rem] border border-[#f1d8b9] bg-[linear-gradient(135deg,#fff8ef_0%,#fff2df_52%,#fffdf9_100%)] p-6 md:p-8 shadow-[0_16px_34px_rgba(138,61,6,0.12)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#e4bc84] bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#9a5b1d]">
                International Award
              </p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-[#8a3d06] md:text-4xl">
                Maharshi Honor Conferred at Jio World Centre, Mumbai
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#7a4f1f] md:text-[15px]">
                <p>
                  Shri Manish Bhaiji Maharaj, the revered founder and spiritual guide of Bhagwat Heritage Service Foundation
                  Trust, was honored with the prestigious <strong>&ldquo;Maharshi Award&rdquo;</strong> at the renowned{" "}
                  <strong>Jio World Centre, Mumbai</strong>.
                </p>
                <p>
                  This distinguished recognition was bestowed upon him in appreciation of his unwavering dedication to spiritual
                  awakening, cultural preservation, and humanitarian service. Through his inspiring discourses on{" "}
                  <strong>Shreemad Bhagwat Katha</strong> and his continuous efforts in guiding society toward dharma,
                  compassion, and selfless service, Manish Bhaiji Maharaj has touched the lives of countless devotees across
                  the nation.
                </p>
                <p>
                  The conferment of the <strong>&ldquo;Maharshi&rdquo; title</strong> symbolizes respect for his deep
                  spiritual wisdom, commitment to Sanatan values, and his mission to spread divine knowledge for the upliftment
                  of humanity.
                </p>
                <p>
                  This moment stands as a proud milestone for the entire <strong>Bhagwat Heritage family</strong>, inspiring
                  devotees and followers to continue the path of spirituality, service, and righteousness.
                </p>
              </div>
            </div>

            <div className="grid gap-3 lg:w-[280px]">
              <div className="rounded-2xl border border-[#efd4ae] bg-white/85 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Award Scope</p>
                <p className="mt-2 text-lg font-black text-[#123753]">International Recognition</p>
              </div>
              <div className="rounded-2xl border border-[#efd4ae] bg-white/85 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Award Title</p>
                <p className="mt-2 text-lg font-black text-[#123753]">Maharshi Award</p>
              </div>
              <div className="rounded-2xl border border-[#efd4ae] bg-white/85 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Venue</p>
                <p className="mt-2 text-lg font-black text-[#123753]">Jio World Centre, Mumbai</p>
              </div>
              <div className="rounded-2xl border border-[#efd4ae] bg-white/85 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Honoree</p>
                <p className="mt-2 text-lg font-black text-[#123753]">Shri Manish Bhaiji Maharaj</p>
              </div>
            </div>
          </div>
        </section>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">New Feature</p>
                <h2 className="mt-2 text-2xl font-black text-[#123753]">Recognition Explorer</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4f6272]">
                  Filter recognitions by category to quickly review honors related to national acknowledgement, seva impact,
                  education support, and cultural preservation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {RECOGNITION_FILTERS.map((filter) => {
                  const active = filter === activeFilter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[#123753] text-white shadow-sm"
                          : "border border-[#d7e5f2] bg-[#f7fbff] text-[#36526b] hover:border-[#b7cfe3] hover:bg-white"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {visibleRecognitions.map((item) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className="rounded-2xl border border-[#e1ebf5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#fff3e0] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#9a5b1d]">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-[#60758c]">{item.year}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-black text-[#123753]">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#8a4d14]">{item.presenter}</p>
                    </div>

                    <div className="rounded-2xl border border-[#e7eef6] bg-white px-4 py-3 md:max-w-[240px]">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Outcome</p>
                      <p className="mt-2 text-sm leading-6 text-[#48606f]">{item.impact}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#4f6272]">{item.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#123753]">Recognition Focus</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f6272]">
                <li className="rounded-2xl bg-[#f7fbff] px-4 py-3">
                  Seva programs are evaluated on continuity, discipline, and measurable community relief.
                </li>
                <li className="rounded-2xl bg-[#fff7ea] px-4 py-3">
                  Educational support recognitions highlight long-term child and youth development impact.
                </li>
                <li className="rounded-2xl bg-[#f7fbff] px-4 py-3">
                  Cultural honors reflect preservation of devotion, heritage, and spiritual participation.
                </li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#f1d8b9] bg-[#fff8ef] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#8a3d06]">Milestone Snapshot</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Public Trust</p>
                  <p className="mt-1 text-sm leading-6 text-[#7a4f1f]">
                    Recognition strengthens transparency, credibility, and long-term support for trust-led initiatives.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Service Quality</p>
                  <p className="mt-1 text-sm leading-6 text-[#7a4f1f]">
                    Awards validate disciplined execution across social relief, event operations, and volunteer engagement.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Future Readiness</p>
                  <p className="mt-1 text-sm leading-6 text-[#7a4f1f]">
                    The archive creates a strong narrative base for upcoming partnerships, sponsorships, and institutional outreach.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const AboutStructurePage = memo(function AboutStructurePage() {
  usePageMeta(
    "Organizational Structure",
    "Leadership hierarchy, governance structure, and operational teams of Bhagwat Heritage Service Foundation Trust.",
  );

  const trustees = [
    {
      name: "Shri Hariprasad Ji",
      role: "Chairman",
      image: "/images/manish2.PNG",
      desc: "Guides board direction, strategic trust alignment, and policy stewardship across core initiatives.",
    },
    {
      name: "Smt. Shantaben Joshi",
      role: "Secretary",
      image: "/images/heritage1.png",
      desc: "Coordinates trust records, governance communication, and committee follow-through for institutional continuity.",
    },
    {
      name: "Shri Mukesh Bhai Patel",
      role: "Treasurer",
      image: "/images/heritage2.png",
      desc: "Oversees accountable financial planning, reporting discipline, and donation utilization transparency.",
    },
    {
      name: "Shri Devendra Bhai",
      role: "Trustee",
      image: "/images/spiritual1.png",
      desc: "Supports trust-wide planning, seva execution review, and interdepartment coordination with field teams.",
    },
  ];

  const advisors = [
    {
      title: "Spiritual Advisors",
      icon: "fas fa-om",
      desc: "Offer scriptural guidance, festival protocol support, and dharmic alignment for trust programs.",
    },
    {
      title: "Legal Advisors",
      icon: "fas fa-scale-balanced",
      desc: "Support compliance, trust documentation, legal reviews, and governance safeguards.",
    },
    {
      title: "Financial Advisors",
      icon: "fas fa-chart-line",
      desc: "Guide audit discipline, donor transparency, budgeting, and long-term financial sustainability.",
    },
    {
      title: "Social Development Experts",
      icon: "fas fa-hand-holding-heart",
      desc: "Help shape outreach models, impact measurement, and community-serving program design.",
    },
  ];

  const managementTeam = [
    {
      name: "Program Director",
      image: "/images/education.png",
      desc: "Leads annual planning, impact targets, and coordination across spiritual, seva, and educational initiatives.",
    },
    {
      name: "Operations Manager",
      image: "/images/jal.png",
      desc: "Runs daily execution systems, team scheduling, logistics, and program readiness across departments.",
    },
    {
      name: "Event Coordinator",
      image: "/images/annseva.png",
      desc: "Handles mahotsav planning, volunteer deployment, guest flow, and ceremonial execution support.",
    },
    {
      name: "Media Manager",
      image: "/images/pravachan.png",
      desc: "Oversees digital storytelling, announcements, livestream support, and community media communication.",
    },
  ];

  const departments = [
    {
      title: "Spiritual Programs Department",
      icon: "fas fa-book-open",
      desc: "Manages katha, satsang, discourse planning, scriptural learning support, and devotional program curation.",
    },
    {
      title: "Gau Seva Department",
      icon: "fas fa-cow",
      desc: "Coordinates gaushala support, fodder seva, medical care response, and devotee participation programs.",
    },
    {
      title: "Social Service Department",
      icon: "fas fa-hands-helping",
      desc: "Leads relief work, education support, food seva, healthcare assistance, and grassroots welfare outreach.",
    },
    {
      title: "Digital Services Department",
      icon: "fas fa-laptop-code",
      desc: "Handles online satsang, digital membership, content publishing, website systems, and engagement channels.",
    },
    {
      title: "Event Management Department",
      icon: "fas fa-calendar-check",
      desc: "Plans festivals, spiritual gatherings, guest logistics, volunteer operations, and event-day coordination.",
    },
  ];

  const hierarchy = [
    "Founder / Spiritual Head",
    "Board of Trustees",
    "Advisory Board",
    "Management Team",
    "Departments & Volunteers",
  ];

  const volunteerStats = [
    { value: "1,200+", label: "Total Volunteers" },
    { value: "18", label: "Operational Regions" },
    { value: "25+", label: "Activities Supported" },
  ];

  const governancePoints = [
    "Major decisions move through spiritual review, trustee discussion, and role-based execution ownership.",
    "Ethical guidelines prioritize dharma, accountability, public trust, and respectful community service.",
    "Financial transparency is maintained through tracked donations, utilization reporting, and compliance-led review.",
    "Operational feedback from departments and volunteers is reviewed regularly to improve service quality.",
  ];

  const workflow = [
    {
      step: "1. Spiritual Direction",
      desc: "Founder guidance shapes the intent, values, and mission focus of major trust initiatives.",
    },
    {
      step: "2. Trustee Review",
      desc: "Board members assess feasibility, resources, compliance, and institutional priority.",
    },
    {
      step: "3. Advisory Input",
      desc: "Specialized advisors refine the plan from legal, financial, and social-development angles.",
    },
    {
      step: "4. Management Allocation",
      desc: "Operational leads assign responsibilities, timelines, execution teams, and reporting checkpoints.",
    },
    {
      step: "5. Department Execution",
      desc: "Departments and volunteers deliver the program on ground with regular accountability loops.",
    },
  ];

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <section
          className="overflow-hidden rounded-[2rem] border border-[#f1d8b9] shadow-[0_22px_48px_rgba(138,61,6,0.16)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(15,44,68,0.86) 0%, rgba(15,44,68,0.72) 44%, rgba(191,104,20,0.44) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-end">
            <div className="max-w-3xl text-white">
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#ffe7c7]">
                Leadership & Governance
              </p>
              <h1 className="mt-4 text-3xl font-black md:text-5xl">Organizational Structure</h1>
              <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">
                A transparent overview of how Bhagwat Heritage Service Foundation Trust is spiritually guided,
                ethically governed, and professionally operated through trustees, advisors, management teams,
                departments, and volunteer networks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "5", label: "Leadership Layers" },
                { value: "4", label: "Trustee Roles" },
                { value: "5", label: "Core Departments" },
                { value: "100%", label: "Governance Focus" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-sm">
                  <p className="text-2xl font-black text-[#ffd08a]">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <section className="rounded-[2rem] border border-[#f0d8ba] bg-[linear-gradient(135deg,#fff8ef_0%,#fff5ea_52%,#ffffff_100%)] p-6 md:p-8 shadow-[0_16px_34px_rgba(138,61,6,0.10)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Founder & Spiritual Head</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
            <div className="rounded-[28px] border border-[#f1dcc0] bg-white p-3 shadow-sm">
              <img
                src="/images/manish2.PNG"
                alt="Manish Bhaiji Maharaj"
                className="h-[320px] w-full rounded-[22px] object-cover"
              />
            </div>

            <div className="rounded-[28px] border border-[#f0d8ba] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6761e]">Founder Leadership Card</p>
              <h2 className="mt-3 text-3xl font-black text-[#123753] md:text-4xl">Manish Bhaiji Maharaj</h2>
              <p className="mt-2 text-lg font-semibold text-[#9a5b1d]">Founder & Spiritual Guide</p>
              <p className="mt-4 text-base leading-7 text-[#53626d]">
                Revered as the spiritual force behind the trust, Manish Bhaiji Maharaj provides the core moral,
                devotional, and mission direction for Bhagwat Heritage Service Foundation Trust. His leadership
                connects katha, seva, culture, and disciplined public service into one unified trust vision.
              </p>
              <p className="mt-4 text-base leading-7 text-[#53626d]">
                Under his guidance, the trust advances spiritual education, community welfare, youth formation,
                cultural preservation, and faith-rooted social impact with long-term integrity.
              </p>
              <Link to={ROUTES.about.founder} className="mt-6 inline-flex rounded-xl bg-[#ff9d00] px-6 py-3 font-bold text-white transition-colors hover:bg-[#ea9000]">
                View Full Profile
              </Link>
            </div>
          </div>
        </section>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Board Governance</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753] md:text-4xl">Board of Trustees</h2>
            <p className="mt-3 text-base leading-7 text-[#4f6272]">
              The Board of Trustees provides policy direction, fiduciary oversight, and strategic continuity for the trust.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustees.map((member) => (
              <article
                key={member.role}
                className="group rounded-[24px] border border-[#e3ebf3] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#f0b15d] hover:shadow-[0_18px_36px_rgba(18,55,83,0.14)]"
              >
                <img src={member.image} alt={member.name} className="h-52 w-full rounded-[18px] object-cover" />
                <h3 className="mt-4 text-xl font-black text-[#123753]">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#c6761e]">{member.role}</p>
                <p className="mt-3 text-sm leading-7 text-[#53626d]">{member.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Guiding Specialists</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753]">Advisory Board</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {advisors.map((advisor) => (
                <article key={advisor.title} className="rounded-2xl border border-[#e3ebf3] bg-[#fbfdff] p-5 transition hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3df] text-[#c6761e] shadow-sm">
                    <i className={advisor.icon} />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-[#123753]">{advisor.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#53626d]">{advisor.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Daily Leadership</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753]">Management Team</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {managementTeam.map((member) => (
                <article key={member.name} className="rounded-2xl border border-[#e3ebf3] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 transition hover:-translate-y-1 hover:shadow-md">
                  <img src={member.image} alt={member.name} className="h-40 w-full rounded-[18px] object-cover" />
                  <h3 className="mt-4 text-xl font-black text-[#123753]">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#53626d]">{member.desc}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <section className="rounded-[2rem] border border-[#f0d8ba] bg-[linear-gradient(180deg,#fff8ef_0%,#fffdf9_100%)] p-6 md:p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Departments & Committees</p>
          <h2 className="mt-2 text-3xl font-black text-[#123753] md:text-4xl">Operational Departments</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {departments.map((department) => (
              <article key={department.title} className="rounded-[24px] border border-[#efd6b4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3df] text-[#c6761e] shadow-sm">
                  <i className={department.icon} />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#123753]">{department.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5a6872]">{department.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Hierarchy Diagram</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753]">Organizational Hierarchy</h2>
            <div className="mt-8 flex flex-col items-center gap-4">
              {hierarchy.map((item, index) => (
                <div key={item} className="flex w-full max-w-[540px] flex-col items-center">
                  <div className="w-full rounded-[24px] border border-[#e3ebf3] bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_100%)] px-5 py-4 text-center shadow-sm">
                    <p className="text-lg font-black text-[#123753]">{item}</p>
                  </div>
                  {index < hierarchy.length - 1 ? <span className="my-2 text-2xl text-[#c6761e]">↓</span> : null}
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Volunteer Network</p>
              <h2 className="mt-2 text-2xl font-black text-[#123753]">Volunteers Backbone</h2>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {volunteerStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#e3ebf3] bg-[#fbfdff] p-4 text-center">
                    <p className="text-2xl font-black text-[#c6761e]">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">{item.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#4f6272]">
                <li className="rounded-2xl bg-[#f7fbff] px-4 py-3">Volunteers support festivals, seva drives, digital outreach, field distribution, and temple events.</li>
                <li className="rounded-2xl bg-[#fff7ea] px-4 py-3">Regional teams work across local trust clusters, outreach districts, and event-based operational zones.</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#f1d8b9] bg-[#fff8ef] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#8a3d06]">Decision Workflow</h2>
              <div className="mt-4 space-y-4">
                {workflow.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">{item.step}</p>
                    <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="rounded-[2rem] border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Governance & Transparency</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753]">Ethical Governance Standards</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#4f6272]">
              {governancePoints.map((point, index) => (
                <li key={point} className={`rounded-2xl px-4 py-3 ${index % 2 === 0 ? "bg-[#f7fbff]" : "bg-[#fff7ea]"}`}>
                  <span className="mr-2 font-black text-[#c6761e]">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[2rem] border border-[#f1d8b9] bg-[linear-gradient(135deg,#fff5e5_0%,#fffaf4_52%,#ffffff_100%)] p-6 md:p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">Engagement</p>
            <h2 className="mt-2 text-3xl font-black text-[#123753]">Support the Trust Structure in Action</h2>
            <p className="mt-4 text-base leading-7 text-[#5a6872]">
              Visitors, donors, institutions, and sevadars can connect directly with the trust through service,
              participation, collaboration, and mission support pathways.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {/* <Link to={ROUTES.involved.volunteer} className="inline-flex items-center justify-center rounded-xl bg-[#ff9d00] px-5 py-3 font-bold text-white transition-colors hover:bg-[#ea9000]">
                Become a Volunteer
              </Link> */}
              <Link to={ROUTES.digital.membership} className="inline-flex items-center justify-center rounded-xl border border-[#d8b98c] bg-white px-5 py-3 font-bold text-[#8a3d06] transition-colors hover:bg-[#fff7ea]">
                Join the Trust
              </Link>
              <Link to={ROUTES.involved.partner} className="inline-flex items-center justify-center rounded-xl border border-[#d7e5f2] bg-[#f7fbff] px-5 py-3 font-bold text-[#123753] transition-colors hover:bg-white">
                Partner With Us
              </Link>
              <Link to={ROUTES.donate} className="inline-flex items-center justify-center rounded-xl bg-[#123753] px-5 py-3 font-bold text-white transition-colors hover:bg-[#0d3b66]">
                Donate Now
              </Link>
            </div>
          </section>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const AboutActivitiesOverviewPage = memo(function AboutActivitiesOverviewPage() {
  const [activeStream, setActiveStream] = useState<ActivityStream>("All");
  const [currentTime, setCurrentTime] = useState(() => new Date());

  usePageMeta(
    "Trust Activities Overview",
    "A real-time styled overview of spiritual, seva, educational, and cultural activities run by the trust.",
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  const visibleActivities =
    activeStream === "All"
      ? TRUST_ACTIVITY_ITEMS
      : TRUST_ACTIVITY_ITEMS.filter((activity) => activity.stream === activeStream);

  const liveCount = TRUST_ACTIVITY_ITEMS.filter((activity) => getActivityStatus(currentTime, activity).label === "Live Now").length;
  const upcomingCount = TRUST_ACTIVITY_ITEMS.filter((activity) => getActivityStatus(currentTime, activity).label === "Upcoming Today").length;
  const weekdayName = WEEKDAY_LABELS[currentTime.getDay()];
  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-[2rem] border border-[#dce8f5] bg-[linear-gradient(135deg,#fff8ef_0%,#ffffff_45%,#edf7ff_100%)] p-6 md:p-8 shadow-[0_18px_36px_rgba(18,55,83,0.10)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#e7c79b] bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#9a5b1d]">
                Live Trust Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-black text-[#123753] md:text-5xl">Trust Activities Overview</h1>
              <p className="mt-3 text-base leading-7 text-[#4f6272] md:text-lg">
                This page should feel operational, not static. It now presents a live-style overview of daily trust work
                across satsang, seva delivery, education support, and cultural programs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[440px]">
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[#0d3b66]">{liveCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Live Now</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[#0d3b66]">{upcomingCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Upcoming Today</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[#0d3b66]">{TRUST_ACTIVITY_ITEMS.length}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Tracked Programs</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[#0d3b66]">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Work Streams</p>
              </div>
            </div>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.8fr)]">
          <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5b1d]">New Feature</p>
                <h2 className="mt-2 text-2xl font-black text-[#123753]">Activity Control Center</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4f6272]">
                  Real-time style status tracking updates activity cards based on the current day and time, helping visitors
                  understand what is running now, what is coming next, and which teams are responsible.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e1ebf5] bg-[#f7fbff] px-4 py-3 text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Live Snapshot</p>
                <p className="mt-1 text-lg font-black text-[#123753]">{formattedTime}</p>
                <p className="text-sm text-[#60758c]">{weekdayName}, {formattedDate}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {ACTIVITY_STREAMS.map((stream) => {
                const active = stream === activeStream;

                return (
                  <button
                    key={stream}
                    type="button"
                    onClick={() => setActiveStream(stream)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#123753] text-white shadow-sm"
                        : "border border-[#d7e5f2] bg-[#f7fbff] text-[#36526b] hover:border-[#b7cfe3] hover:bg-white"
                    }`}
                  >
                    {stream}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              {visibleActivities.map((activity) => {
                const status = getActivityStatus(currentTime, activity);

                return (
                  <article
                    key={`${activity.stream}-${activity.title}`}
                    className="rounded-2xl border border-[#e1ebf5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#fff3e0] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#9a5b1d]">
                            {activity.stream}
                          </span>
                          <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${status.tone}`}>
                            {status.label}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-black text-[#123753]">{activity.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-[#8a4d14]">{activity.unit}</p>
                        <p className="mt-3 text-sm leading-7 text-[#4f6272]">{activity.summary}</p>
                      </div>

                      <div className="rounded-2xl border border-[#e7eef6] bg-white px-4 py-3 md:min-w-[240px]">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Operational Details</p>
                        <div className="mt-2 space-y-2 text-sm leading-6 text-[#48606f]">
                          <p><span className="font-semibold text-[#123753]">Timing:</span> {activity.timeWindow}</p>
                          <p><span className="font-semibold text-[#123753]">Cadence:</span> {activity.cadence}</p>
                          <p><span className="font-semibold text-[#123753]">Location:</span> {activity.location}</p>
                          <p><span className="font-semibold text-[#123753]">Status Note:</span> {status.note}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#123753]">Operational Signals</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#4f6272]">
                <li className="rounded-2xl bg-[#f7fbff] px-4 py-3">Spiritual programs maintain daily rhythm and anchor community participation.</li>
                <li className="rounded-2xl bg-[#fff7ea] px-4 py-3">Seva teams operate through scheduled coordination blocks for consistency and accountability.</li>
                <li className="rounded-2xl bg-[#f7fbff] px-4 py-3">Education and cultural activities are timed to maximize youth and family participation.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#f1d8b9] bg-[#fff8ef] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#8a3d06]">Realtime Working Logic</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">What I Added</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    A live-style activity tracker that changes status based on the current time and day.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Why It Fits</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    This page should show ongoing trust work in motion, not only describe departments and programs.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#efd9ba] bg-white/75 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b1d]">Next Upgrade</p>
                  <p className="mt-2 text-sm leading-6 text-[#7a4f1f]">
                    This can later connect to backend APIs for actual volunteer counts, event attendance, and seva completion updates.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const MissionGlobalOutreachPage = memo(function MissionGlobalOutreachPage() {
  const outreachTracks = [
    {
      label: "All",
      title: "Global Trust Network",
      summary: "A unified global vision connecting satsang, seva, digital learning, and Sanatan cultural outreach.",
    },
    {
      label: "Digital Satsang",
      title: "Digital Satsang Expansion",
      summary: "Online katha, livestream satsang, multilingual clips, and devotional study access across borders.",
    },
    {
      label: "Diaspora Communities",
      title: "Diaspora Community Chapters",
      summary: "Support for devotee communities abroad through local gatherings, seva circles, and value-led engagement.",
    },
    {
      label: "Service Partnerships",
      title: "Global Seva Collaboration",
      summary: "Partnerships with social, spiritual, and community organizations for compassionate service delivery.",
    },
    {
      label: "Youth and Culture",
      title: "Youth and Heritage Outreach",
      summary: "Programs for children and youth to stay connected with scripture, language, culture, and devotional identity.",
    },
  ] as const;

  const missionPillars = [
    {
      title: "Global Satsang Access",
      desc: "Enable devotees in every region to access Bhagwat Katha, satsang guidance, and spiritual reflections through digital and local formats.",
    },
    {
      title: "Sanatan Cultural Preservation",
      desc: "Carry forward devotional traditions, family values, and dharmic practices for communities living far from traditional centers.",
    },
    {
      title: "Cross-Border Seva",
      desc: "Create service models that support humanitarian needs, volunteer collaboration, and disciplined compassion at an international level.",
    },
    {
      title: "Youth Continuity",
      desc: "Build global youth participation through value education, cultural learning, leadership circles, and devotional identity programs.",
    },
  ];

  const globalMissions = [
    {
      track: "Digital Satsang",
      region: "Worldwide",
      mission: "Build a continuous online satsang ecosystem",
      details:
        "Develop regular livestream katha sessions, archived pravachan libraries, and devotional content access for global followers in different time zones.",
    },
    {
      track: "Diaspora Communities",
      region: "United States, UK, Canada, Australia",
      mission: "Support local chapter-based devotional gatherings",
      details:
        "Help overseas devotees organize satsang circles, festival observances, study groups, and family-centered dharmic events under a shared trust vision.",
    },
    {
      track: "Service Partnerships",
      region: "India and overseas collaboration hubs",
      mission: "Create seva partnerships with aligned institutions",
      details:
        "Coordinate social welfare campaigns, food support, relief work, and community service with trusted spiritual and service organizations.",
    },
    {
      track: "Youth and Culture",
      region: "Global youth communities",
      mission: "Preserve identity through youth learning tracks",
      details:
        "Offer youth camps, Bal Sanskar modules, scripture introduction, and heritage-centered engagement for the next generation of global families.",
    },
  ] as const;

  const expansionRoadmap = [
    {
      phase: "Phase 1",
      title: "Digital Foundation",
      desc: "Strengthen livestream satsang, recorded discourse archives, and online devotion resources.",
    },
    {
      phase: "Phase 2",
      title: "Community Anchors",
      desc: "Support trusted coordinators and satsang groups in key overseas devotee regions.",
    },
    {
      phase: "Phase 3",
      title: "Partnership-Led Seva",
      desc: "Launch collaborative outreach with aligned organizations for service and cultural engagement.",
    },
    {
      phase: "Phase 4",
      title: "Global Learning Ecosystem",
      desc: "Develop multilingual study, youth formation, and devotional education pathways for families worldwide.",
    },
  ];

  const [activeTrack, setActiveTrack] = useState<(typeof outreachTracks)[number]["label"]>("All");

  usePageMeta(
    "Global Outreach Vision",
    "Global satsang expansion, cultural preservation, international seva collaboration, and youth outreach under the trust mission.",
  );

  const activeTrackContent = outreachTracks.find((track) => track.label === activeTrack) ?? outreachTracks[0];
  const visibleMissions =
    activeTrack === "All" ? globalMissions : globalMissions.filter((mission) => mission.track === activeTrack);

  return (
    <div className="min-h-screen bg-[#0B2230] pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <div className="rounded-[2rem] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_18px_36px_rgba(0,0,0,0.24)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#F59E0B]">
                Mission Beyond Borders
              </p>
              <h1 className="mt-4 text-3xl font-black text-white md:text-5xl">Global Outreach Vision</h1>
              <p className="mt-3 text-base leading-7 text-[#d9e6ec] md:text-lg">
                Bhagwat Heritage envisions a global devotional network where spiritual knowledge, seva, and Sanatan culture
                reach families across nations through both digital access and trusted community partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[440px]">
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Mission Pillars</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Expansion Phases</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">Global</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Target Reach</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#d9e6ec]">Digital Presence</p>
              </div>
            </div>
          </div>
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missionPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/10 bg-[#12394A] p-5 shadow-sm">
              <h2 className="text-xl font-black text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#d9e6ec]">{pillar.desc}</p>
            </article>
          ))}
        </div>
      </PageSectionShell>

      <PageSectionShell className="pt-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.8fr)]">
          <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">New Feature</p>
                <h2 className="mt-2 text-2xl font-black text-white">Global Mission Explorer</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d9e6ec]">
                  Browse the global vision by outreach track to understand how the trust can expand through digital satsang,
                  diaspora communities, seva partnerships, and youth-centered cultural continuity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 md:max-w-[300px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F59E0B]">Active Vision Track</p>
                <p className="mt-1 text-lg font-black text-white">{activeTrackContent.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#d9e6ec]">{activeTrackContent.summary}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {outreachTracks.map((track) => {
                const active = track.label === activeTrack;

                return (
                  <button
                    key={track.label}
                    type="button"
                    onClick={() => setActiveTrack(track.label)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#F59E0B] text-white shadow-sm"
                        : "border border-white/10 bg-[#0f3140] text-white hover:border-[#F59E0B]/40 hover:bg-[#12394A]"
                    }`}
                  >
                    {track.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              {visibleMissions.map((item) => (
                <article
                  key={`${item.track}-${item.mission}`}
                  className="rounded-2xl border border-white/10 bg-[#0f3140] p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                          {item.track}
                        </span>
                        <span className="rounded-full bg-[#12394A] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          {item.region}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-black text-white">{item.mission}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#d9e6ec]">{item.details}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-white">Global Mission Priorities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#d9e6ec]">
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Make satsang and Bhagwat knowledge accessible regardless of geography.</li>
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Preserve Sanatan values for families growing up outside traditional cultural environments.</li>
                <li className="rounded-2xl bg-[#0f3140] px-4 py-3">Create trusted channels for seva, partnerships, and community-building beyond India.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm">
              <h2 className="text-2xl font-black text-[#F59E0B]">Expansion Roadmap</h2>
              <div className="mt-4 space-y-4">
                {expansionRoadmap.map((item) => (
                  <div key={item.phase} className="rounded-2xl border border-white/10 bg-[#0f3140] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">{item.phase}</p>
                    <h3 className="mt-1 text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#d9e6ec]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </PageSectionShell>
    </div>
  );
});

export const SevaGauSevaPage = memo(function SevaGauSevaPage() {
  const sevaActivities = [
    {
      icon: "CF",
      title: "Cow Feeding Programs",
      desc: "Daily bhojan seva with green fodder, dry feed, mineral support, and seasonal nourishment planning.",
    },
    {
      icon: "MC",
      title: "Medical Care Support",
      desc: "Veterinary consultation, emergency treatment, health checks, and recovery care for weak or injured cows.",
    },
    {
      icon: "SP",
      title: "Shelter and Protection",
      desc: "Safe shelter, rescue coordination, and long-term care for abandoned, elderly, and vulnerable cows.",
    },
    {
      icon: "GH",
      title: "Healthy Gaushala Environment",
      desc: "Clean sheds, hygiene management, water access, shaded rest areas, and disciplined daily maintenance.",
    },
    {
      icon: "VS",
      title: "Volunteer and Devotee Seva",
      desc: "Hands-on service through feeding, cleaning, prayer participation, and devotional ashram support.",
    },
  ];

  const donationOptions = [
    {
      title: "Feed a Cow",
      amount: "Rs 501",
      desc: "Support one day of bhojan seva with green fodder and daily nourishment.",
    },
    {
      title: "Monthly Cow Care Sponsorship",
      amount: "Rs 5,100",
      desc: "Contribute toward recurring feed, care, water, and basic shelter support for one month.",
    },
    {
      title: "Medical Support for Cows",
      amount: "Rs 2,100",
      desc: "Help cover veterinary consultation, medicines, supplements, and emergency treatment.",
    },
    {
      title: "Gaushala Infrastructure Support",
      amount: "Rs 11,000",
      desc: "Support shed upkeep, water systems, flooring, sanitation, and protective infrastructure.",
    },
    {
      title: "Lifetime Gau Seva Donation",
      amount: "Rs 51,000",
      desc: "Offer long-term support to sustain protection, nourishment, and dharmic Gau Seva at the Ashram.",
    },
  ];

  const sponsorCows = [
    {
      name: "Gauri",
      age: "6 years",
      status: "Available for Sponsorship",
      note: "Gentle, healthy, and part of the regular feeding seva circle.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    },
    {
      name: "Shyama",
      age: "9 years",
      status: "Partially Sponsored",
      note: "Requires recurring care, nutrition support, and shelter maintenance attention.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    },
    {
      name: "Kamdhenu",
      age: "11 years",
      status: "Medical Care Needed",
      note: "Needs focused health monitoring, supplement support, and devotional care sponsorship.",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    },
  ];

  const galleryItems = [
    {
      title: "Sacred Cow Care",
      image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    },
    {
      title: "Ashram Environment",
      image: "/images/heritage1.png",
    },
    {
      title: "Volunteer Seva Spirit",
      image: "/images/spiritual1.png",
    },
    {
      title: "Daily Feeding Support",
      image: "/images/annseva.png",
    },
  ];

  const impactItems = [
    { label: "Total Cows Protected", value: "180+" },
    { label: "Daily Fodder Provided", value: "2.5 Tons" },
    { label: "Volunteers Involved", value: "350+" },
    { label: "Donors Supporting Gau Seva", value: "900+" },
  ];

  const volunteerPoints = [
    "Morning feeding seva and water preparation",
    "Gaushala cleaning, upkeep, and support duty",
    "Care support for weak, elderly, or recovering cows",
    "Prayer participation and devotional ashram discipline",
  ];

  usePageMeta("Gau Seva - Kamdhenu Ashram", "Kamdhenu Ashram page with Gau Seva activities, donation options, cow sponsorship, volunteer support, and spiritual significance.");

  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Gau Seva - Kamdhenu Ashram"
        subtitle="Protecting and Serving Sacred Cows with Love and Devotion"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Donate for Gau Seva
          </Link>
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[#12394A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Sponsor a Cow
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Kamdhenu Ashram", value: "Sacred Care", note: "A devotional space for Gau Mata protection, nourishment, and seva." },
              { title: "Daily Bhojan Seva", value: "2.5 Tons", note: "Green fodder, dry feed, and nutritional support managed every day." },
              { title: "Cow Sponsorship", value: "Open", note: "Devotees can sponsor specific cows for recurring care and support." },
              { title: "Volunteer Presence", value: "365 Days", note: "Daily seva by trusted volunteers, donors, and ashram supporters." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#12394A] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-xs uppercase tracking-wide text-[#F59E0B]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#dce7ec]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">About Kamdhenu Ashram</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">A Sacred Space for Gau Mata Protection</h2>
            <p className="mt-5 text-lg leading-8 text-white">
              Kamdhenu Ashram is dedicated to protecting, feeding, sheltering, and serving sacred cows with devotion and discipline.
              It is designed as a living seva space where compassion, daily care, and dharmic gratitude come together.
            </p>
            <p className="mt-4 text-lg leading-8 text-white">
              In Sanatan Dharma, Gau Seva is considered deeply auspicious because the cow is honored as a nourisher, a symbol of gentle abundance,
              and a sacred presence connected with selfless giving. Kamdhenu represents spiritual prosperity, harmony, and divine nurturing.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Mission",
                desc: "Protect cows with food, medical care, shelter, and devotional service rooted in Sanatan values.",
              },
              {
                title: "Vision",
                desc: "Build a compassionate, clean, and spiritually grounded gaushala where every cow is served with dignity.",
              },
              {
                title: "Dharma Significance",
                desc: "Gau Seva teaches gratitude, non-violence, nourishment, humility, and disciplined seva for all beings.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#12394A] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#dce7ec]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Our Gau Seva Activities</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Service at Kamdhenu Ashram</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {sevaActivities.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-[#0f3140] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-sm font-black text-[#F59E0B]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Gau Seva Donation Options</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Different Ways to Contribute</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {donationOptions.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-[#0f3140] p-5 shadow-sm">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-2xl font-black text-[#F59E0B]">{item.amount}</p>
                <p className="mt-3 text-sm leading-7 text-[#dce7ec]">{item.desc}</p>
                <Link
                  to={ROUTES.donate}
                  className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                >
                  Donate
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Sponsor a Cow Program</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Adopt Care with Devotion</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {sponsorCows.map((cow) => (
              <article key={cow.name} className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0f3140] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <img src={cow.image} alt={cow.name} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black text-white">{cow.name}</h3>
                    <span className="rounded-full bg-[#F59E0B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                      {cow.age}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#F59E0B]">{cow.status}</p>
                  <p className="mt-2 text-sm leading-7 text-[#dce7ec]">{cow.note}</p>
                  <Link
                    to={ROUTES.donate}
                    className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                  >
                    Sponsor Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {impactItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-[#12394A] p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="text-3xl font-black text-[#F59E0B] md:text-4xl">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-white">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Photo Gallery of Kamdhenu Ashram</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Sacred Seva Moments</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <figure key={item.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0f3140] shadow-sm">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105" />
                <figcaption className="px-4 py-3 text-sm font-semibold text-white">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Volunteer for Gau Seva</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Visit and Serve at the Ashram</h2>
            <p className="mt-4 text-lg leading-8 text-white">
              Devotees, families, youth groups, and service-minded volunteers are welcome to participate in practical Gau Seva.
              Volunteers can support feeding, care, cleanliness, and devotional ashram routines.
            </p>
            <ul className="mt-6 space-y-3">
              {volunteerPoints.map((item) => (
                <li key={item} className="rounded-2xl bg-[#0f3140] px-4 py-3 text-[#dce7ec] shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.involved.volunteer}
              className="mt-6 inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
            >
              Volunteer Registration
            </Link>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Spiritual Message</p>
              <blockquote className="mt-4 text-3xl font-black leading-tight text-white">
                "गावो विश्वस्य मातरः"
              </blockquote>
              <p className="mt-3 text-lg text-[#F59E0B]">The cows are the mothers of the universe.</p>
              <p className="mt-4 text-base leading-7 text-[#dce7ec]">
                Gau Mata represents nourishment, gentleness, and sacred abundance. Serving her is an offering of gratitude,
                protection, and dharmic responsibility.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Contact Kamdhenu Ashram</p>
              <h2 className="mt-2 text-3xl font-black text-white">Visit or Connect</h2>
              <div className="mt-5 space-y-4 text-[#dce7ec]">
                <p><span className="font-black text-white">Address:</span> Kamdhenu Ashram, Bhagwat Heritage Service Foundation Trust Campus, Swaminarayan Bhagwat Dham</p>
                <p><span className="font-black text-white">Phone:</span> +91 98765 43210</p>
                <p><span className="font-black text-white">Email:</span> info@bhagwatheritage.org</p>
                <p><span className="font-black text-white">Map Location:</span> Available through the contact desk for visitor guidance and ashram visit planning.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.contact} className="inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#de930a]">
                  Contact Ashram
                </Link>
                <Link to={ROUTES.contact} className="inline-flex rounded-xl border border-white/10 bg-[#0f3140] px-5 py-3 text-sm font-semibold text-white">
                  Map and Visit Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const SevaDisasterReliefPage = memo(function SevaDisasterReliefPage() {
  usePageMeta(
    "Disaster Relief Seva",
    "Emergency response, relief kits, volunteer deployment, donation support, and recovery assistance for affected communities.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Disaster Relief Seva"
        subtitle="Emergency Response and Compassionate Support for Families in Crisis"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772911110/disaster-relief_lg6qcp.webp"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Donate for Relief
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Join Relief Team
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {DISASTER_QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Disaster Relief</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            Disaster Relief Seva is the trust's emergency response mission for communities facing floods, fire incidents,
            storms, displacement, and sudden humanitarian distress.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            This page is built around action: join the field seva team, donate relief materials, sponsor recovery support,
            and help families rebuild with dignity.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {DISASTER_FEATURES.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {DISASTER_IMPACT_STATS.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-[#153346] p-5 text-center">
                <p className="text-[#ffb06a] text-4xl font-black">{item.value}</p>
                <p className="text-[#c7d7e1] text-base mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">How Disaster Relief Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DISASTER_PROCESS.map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <h3 className="text-white text-2xl font-black mb-3">{item.step}</h3>
                <p className="text-[#d4e1e8] text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Join and Support Relief Seva</h3>
            <p className="text-[#d4e1e8] text-xl leading-relaxed">
              You can serve by joining field response teams, supporting logistics and camp setup, donating supplies, or
              sponsoring emergency and recovery assistance for affected families.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              {DISASTER_JOIN_OPTIONS.map((item) => (
                <div key={item.title} className={`rounded-2xl p-5 shadow-sm ${item.tone}`}>
                  <h4 className="text-xl font-black">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/90">{item.desc}</p>
                  <Link to={item.href} className="mt-4 inline-block rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Emergency Donation Support</h3>
            <p className="text-xl text-white/95 mb-6">
              Contributions help the trust mobilize emergency food, water, medicine, shelter essentials, and rehabilitation
              support when families face sudden crisis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {DISASTER_DONATION_TIERS.map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                  <p className="text-sm text-white/85 mt-2">{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Become Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Relief Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DISASTER_STORIES.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <p className="text-[#dbe7ee] text-xl leading-relaxed">"{item.quote}"</p>
                <p className="text-[#ffb06a] font-semibold text-lg mt-4">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {DISASTER_FAQS.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5">
                <summary className="cursor-pointer text-white text-xl font-semibold">{item.q}</summary>
                <p className="text-[#d4e1e8] text-lg mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const EventsBhagwatKathaPage = memo(function EventsBhagwatKathaPage() {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [mahotsavStart] = useState(() => {
    const start = new Date();
    start.setDate(start.getDate() + 12);
    start.setHours(9, 0, 0, 0);
    return start;
  });

  usePageMeta(
    "Bhagwat Katha Mahotsav",
    "Bhagwat Katha program vision, real-time event operations, seva participation, and mahotsav schedule overview.",
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  const heroHighlights = [
    { title: "Live Katha Days", value: "7", note: "Structured discourse, darshan, and seva programming" },
    { title: "Volunteer Network", value: "900+", note: "Hospitality, crowd, stage, and logistics support" },
    { title: "Daily Seating", value: "12,000+", note: "Managed devotee attendance capacity" },
    { title: "Broadcast Reach", value: "24/7", note: "Digital access for distant devotees and families" },
  ];

  const featureCards = [
    {
      title: "Scriptural Discourse Experience",
      desc: "Daily Bhagwat Katha sessions with spiritual explanation, devotional immersion, and structured audience participation.",
    },
    {
      title: "Integrated Seva Management",
      desc: "Volunteer coordination for reception, seating, water, prasad, discipline, and family assistance across the venue.",
    },
    {
      title: "Digital and On-Ground Reach",
      desc: "A hybrid mahotsav model with on-site presence, livestream support, announcements, and recorded session access.",
    },
  ];

  const supportTracks = [
    "Reception and devotee help desk",
    "Stage, sound, and katha operations",
    "Prasad, water, and hospitality seva",
    "Volunteer roster, access, and queue discipline",
  ];

  const donationTiers = [
    { label: "One Session Seva", amount: "Rs 2,100", note: "Support one discourse session with service logistics" },
    { label: "Daily Mahotsav Sponsor", amount: "Rs 15,000", note: "Support one full day of seva coordination" },
    { label: "Grand Event Support", amount: "Rs 51,000", note: "Contribute to stage, hospitality, and program execution" },
  ];

  const testimonials = [
    {
      name: "Mahotsav Volunteer Desk",
      quote: "When the event system is organized well, devotees can focus fully on katha and spiritual experience.",
    },
    {
      name: "Visiting Devotee Family",
      quote: "The discipline, seating management, and seva care made the entire Katha Mahotsav peaceful and uplifting.",
    },
    {
      name: "Digital Satsang Viewer",
      quote: "The livestream and timely updates helped our family stay connected even from far away.",
    },
  ];

  const faqs = [
    {
      q: "How can I join Bhagwat Katha Mahotsav seva?",
      a: "You can register through the volunteer route and support reception, seating, discipline, hospitality, announcements, or backstage operations.",
    },
    {
      q: "Can I sponsor a full day or a specific session?",
      a: "Yes. Donors can support session-level seva, daily event sponsorship, or broader mahotsav logistics and hospitality arrangements.",
    },
    {
      q: "Will the event also be available online?",
      a: "Yes. The page now includes a digital-first event concept with livestream, remote updates, and recorded access planning.",
    },
  ];

  const dayLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
  const sessionTemplates = [
    { slot: "Morning", title: "Mangalacharan and Bhajan", hour: 8, minute: 0, durationHours: 2 },
    { slot: "Afternoon", title: "Bhagwat Katha Main Session", hour: 15, minute: 0, durationHours: 3 },
    { slot: "Evening", title: "Aarti, Sankirtan, and Reflection", hour: 19, minute: 30, durationHours: 2 },
  ];

  const sessionSchedule = dayLabels.flatMap((dayLabel, dayIndex) =>
    sessionTemplates.map((template) => {
      const start = new Date(mahotsavStart);
      start.setDate(mahotsavStart.getDate() + dayIndex);
      start.setHours(template.hour, template.minute, 0, 0);

      const end = new Date(start);
      end.setHours(end.getHours() + template.durationHours);

      return {
        id: `${dayLabel}-${template.slot}`,
        dayLabel,
        slot: template.slot,
        title: template.title,
        start,
        end,
      };
    }),
  );

  const currentSession = sessionSchedule.find((session) => currentTime >= session.start && currentTime <= session.end) ?? null;
  const nextSession = sessionSchedule.find((session) => currentTime < session.start) ?? null;
  const eventEnd = sessionSchedule[sessionSchedule.length - 1]?.end ?? mahotsavStart;

  const controlStatus =
    currentTime < mahotsavStart ? "Countdown Active" : currentTime <= eventEnd ? "Mahotsav Live" : "Completed";
  const countdownTarget = currentSession ? currentSession.end : nextSession?.start ?? eventEnd;
  const countdown = formatCountdownParts(countdownTarget.getTime() - currentTime.getTime());

  const visibleSchedule = sessionSchedule.slice(0, 9);
  const liveOperations = [
    { label: "Current Status", value: controlStatus, note: currentSession ? currentSession.title : nextSession ? "Next session in queue" : "Awaiting next cycle" },
    {
      label: currentSession ? "Session Ends In" : nextSession ? "Starts In" : "Since Completion",
      value: `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`,
      note: currentSession ? currentSession.dayLabel : nextSession ? nextSession.dayLabel : "Mahotsav archive mode",
    },
    {
      label: "Live Session",
      value: currentSession ? currentSession.slot : "Standby",
      note: currentSession ? currentSession.title : nextSession ? nextSession.title : "Schedule closed",
    },
    {
      label: "Next Activation",
      value: nextSession ? nextSession.dayLabel : "To be announced",
      note: nextSession ? nextSession.slot : "Fresh planning cycle pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Bhagwat Katha Mahotsav"
        subtitle="A structured devotional gathering with live discourse, seva coordination, and spiritual experience"
        backgroundImage="/images/kathapravachan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor Mahotsav
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Join Katha Seva
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Bhagwat Katha Mahotsav</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            Bhagwat Katha Mahotsav is envisioned as a disciplined spiritual event where sacred discourse, devotional music,
            seva participation, and community hospitality work together in one integrated devotional ecosystem.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            This page now goes beyond static content. It includes a real-time operations panel, live session status logic,
            structured schedule visibility, and advanced event support sections.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {featureCards.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {liveOperations.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-[#153346] p-5">
                <p className="text-[#ffb06a] text-sm uppercase tracking-wide">{item.label}</p>
                <p className="text-white text-3xl font-black mt-2">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h2 className="text-4xl font-black text-[#ffb06a] mb-5">Live Katha Control Center</h2>
            <p className="text-[#d4e1e8] text-xl leading-relaxed mb-6">
              This real-time feature tracks whether the mahotsav is in countdown mode, currently live, or between sessions,
              and surfaces the next important operational moment for volunteers and devotees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#143446] border border-white/10 p-5">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">Current Session</p>
                <p className="text-white text-2xl font-black mt-2">{currentSession ? currentSession.title : "No live session"}</p>
                <p className="text-[#d4e1e8] mt-2 text-sm">
                  {currentSession
                    ? `${currentSession.dayLabel} | ${currentSession.slot}`
                    : nextSession
                      ? `Next: ${nextSession.dayLabel} | ${nextSession.slot}`
                      : "Awaiting the next announced mahotsav cycle"}
                </p>
              </div>
              <div className="rounded-2xl bg-[#143446] border border-white/10 p-5">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">Realtime Timer</p>
                <p className="text-white text-2xl font-black mt-2">{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}</p>
                <p className="text-[#d4e1e8] mt-2 text-sm">
                  {currentSession ? "Time remaining in the active discourse block" : "Time remaining until the next key activation"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Join or Sponsor Mahotsav</h3>
            <p className="text-xl text-white/95 mb-6">
              Support stage readiness, devotee hospitality, water seva, seating management, and digital access for the Katha Mahotsav.
            </p>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {donationTiers.map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                  <p className="text-sm text-white/85 mt-2">{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Mahotsav Schedule Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleSchedule.map((session) => {
              const isLive = currentTime >= session.start && currentTime <= session.end;
              const isNext = !isLive && nextSession?.id === session.id;

              return (
                <div
                  key={session.id}
                  className={`rounded-2xl border p-6 ${
                    isLive
                      ? "border-[#ffb06a] bg-[#194257]"
                      : isNext
                        ? "border-[#0d8f91] bg-[#17384b]"
                        : "border-white/10 bg-[#143446]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[#ffb06a] text-sm uppercase tracking-wide">{session.dayLabel}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isLive ? "bg-[#ffb06a] text-[#17384b]" : isNext ? "bg-[#0d8f91] text-white" : "bg-white/10 text-[#d4e1e8]"}`}>
                      {isLive ? "Live" : isNext ? "Next" : session.slot}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-black mt-3">{session.title}</h3>
                  <p className="text-[#d4e1e8] text-sm mt-2">{session.slot}</p>
                  <p className="text-[#d4e1e8] text-sm mt-1">
                    {session.start.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} |{" "}
                    {session.start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Operational Support Tracks</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#17384b] p-8">
            <h3 className="text-4xl font-black text-white mb-5">Realtime Event Logic</h3>
            <div className="space-y-4 text-[#d4e1e8] text-lg">
              <p>
                The page checks current time against the mahotsav session schedule and updates status cards automatically.
              </p>
              <p>
                Devotees and volunteers can quickly see countdown, live session state, next activation, and support focus.
              </p>
              <p>
                This structure is ready for a future backend upgrade where live attendance, queue status, and broadcast health can plug in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Devotee Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <p className="text-[#dbe7ee] text-xl leading-relaxed">"{item.quote}"</p>
                <p className="text-[#ffb06a] font-semibold text-lg mt-4">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5">
                <summary className="cursor-pointer text-white text-xl font-semibold">{item.q}</summary>
                <p className="text-[#d4e1e8] text-lg mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const EventsSpiritualPage = memo(function EventsSpiritualPage() {
  return (
    <EventShowcasePage
      title="Spiritual Events"
      subtitle="A living spiritual calendar of satsang, bhajan, path, and devotional gatherings"
      backgroundImage="/images/spiritual1.png"
      metaDescription="Spiritual events calendar, satsang gatherings, devotional programs, and structured volunteer support."
      aboutTitle="About Spiritual Events"
      aboutParagraphs={[
        "Spiritual Events bring together satsang, kirtan, scripture listening, bhajan, and collective devotion in a disciplined atmosphere.",
        "This page is designed to feel active and mission-led, aligned with the same dark event style as the Seva pages.",
      ]}
      highlights={[
        { title: "Weekly Satsang", value: "12+", note: "Recurring devotional gatherings each month" },
        { title: "Volunteer Teams", value: "250+", note: "Hospitality, discipline, and event support" },
        { title: "Digital Reach", value: "24/7", note: "Recorded clips and livestream support" },
        { title: "Bhajan Sessions", value: "40+", note: "Community-led devotional music gatherings" },
      ]}
      features={[
        { title: "Satsang Sabhas", desc: "Regular spiritual gatherings with discourse, reflection, and collective prayer." },
        { title: "Bhajan and Kirtan", desc: "Devotional music events that deepen emotional and spiritual participation." },
        { title: "Path and Reflection", desc: "Scriptural reading circles and thematic spiritual study sessions." },
      ]}
      supportTracks={[
        "Reception and registration support",
        "Bhajan, aarti, and stage coordination",
        "Devotee seating and movement discipline",
        "Digital updates and remote satsang access",
      ]}
      donationTiers={[
        { label: "One Sabha Support", amount: "Rs 1,500", note: "Hospitality and basic event logistics" },
        { label: "Monthly Spiritual Sponsor", amount: "Rs 9,000", note: "Recurring satsang event support" },
        { label: "Bhajan Mahotsav Support", amount: "Rs 31,000", note: "Larger devotional event assistance" },
      ]}
      primaryCta="Sponsor Spiritual Event"
      secondaryCta="Join Spiritual Seva"
      testimonials={[
        { name: "Satsang Volunteer", quote: "A well-managed spiritual event creates peace before the discourse even begins." },
        { name: "Devotee Family", quote: "The satsang environment helps families reconnect with devotion in a practical way." },
        { name: "Bhajan Team", quote: "When seva and music flow together, the spiritual atmosphere becomes transformative." },
      ]}
      faqs={[
        { q: "Can I join regular spiritual event seva?", a: "Yes. Volunteers can help with reception, stage support, audio, and devotee guidance." },
        { q: "Are spiritual events announced in advance?", a: "Yes. This page is designed for structured spiritual programming and advance participation planning." },
        { q: "Can I sponsor a satsang or bhajan session?", a: "Yes. Individual sabha support and monthly devotional sponsorship options can be contributed." },
      ]}
    />
  );
});

export const EventsFestivalsPage = memo(function EventsFestivalsPage() {
  const annualFestivals = [
    {
      month: "January",
      dayDate: "Wednesday, 14 Jan 2026",
      lunar: "Posh Krishna Ekadashi, VS 2082",
      title: "Makar Sankranti / Uttarayan",
      focus: "Sunrise darshan, festive satsang, and seasonal offering seva.",
    },
    {
      month: "January",
      dayDate: "Friday, 23 Jan 2026",
      lunar: "Magh Shukl Pancham, VS 2082",
      title: "Vasant Panchmi",
      focus: "Yellow-themed celebration, prayer, learning blessing, and devotional music.",
    },
    {
      month: "January",
      dayDate: "Monday, 26 Jan 2026",
      lunar: "Magh Shukl Ashtami, VS 2082",
      title: "Republic Day",
      focus: "National spirit, community gathering, and values-based remembrance.",
    },
    {
      month: "February",
      dayDate: "Sunday, 15 Feb 2026",
      lunar: "Maha Vad Teras, VS 2082",
      title: "Shivratri",
      focus: "Night prayer, dhun, abhishek support, and disciplined devotee flow.",
    },
    {
      month: "March",
      dayDate: "Monday, 2 Mar 2026",
      lunar: "Fagan Shukl Shashti, VS 2082",
      title: "Holika Dahan",
      focus: "Ceremonial preparation, safety coordination, and family participation.",
    },
    {
      month: "March",
      dayDate: "Tuesday, 3 Mar 2026",
      lunar: "Fagan Shukl Purnima, VS 2082",
      title: "Pushpadolotsav Rangotsav",
      focus: "Phooldol celebration, color utsav support, and festive hospitality seva.",
    },
    {
      month: "March",
      dayDate: "Thursday, 27 Mar 2026",
      lunar: "Chaitra Shukl Navmi, VS 2082",
      title: "Shri Ramnavmi - Bhagwan Swaminarayan Pragat Utsav",
      focus: "Major devotional observance with katha, aarti, and crowd discipline planning.",
    },
    {
      month: "April",
      dayDate: "Thursday, 2 Apr 2026",
      lunar: "Chaitra Shukl Purnima, VS 2082",
      title: "Hanuman Janmotsav",
      focus: "Hanuman bhakti, recitation support, and mandir celebration seva.",
    },
    {
      month: "July",
      dayDate: "Thursday, 16 Jul 2026",
      lunar: "Ashadh Shukl 8, VS 2082",
      title: "Rathyatra",
      focus: "Route discipline, procession seva, and public devotional participation.",
    },
    {
      month: "July",
      dayDate: "Wednesday, 29 Jul 2026",
      lunar: "Ashadh Shukl Purnima, VS 2082",
      title: "Guru Purnima",
      focus: "Guru bhakti, gratitude offerings, and reverent event coordination.",
    },
    {
      month: "August",
      dayDate: "Saturday, 15 Aug 2026",
      lunar: "Shravan Shukl Tij, VS 2082",
      title: "Independence Day",
      focus: "Patriotic observance with satsang values, family presence, and seva spirit.",
    },
    {
      month: "August",
      dayDate: "Friday, 28 Aug 2026",
      lunar: "Shravan Shukl Punam, VS 2082",
      title: "Raksha Bandhan",
      focus: "Family celebration, blessings, and values-centered participation.",
    },
    {
      month: "September",
      dayDate: "Friday, 4 Sep 2026",
      lunar: "Shravan Krishna Atham, VS 2082",
      title: "Janmashtami Utsav",
      focus: "Midnight celebration, bhajan support, and high-devotee footfall management.",
    },
    {
      month: "September",
      dayDate: "Monday, 14 Sep 2026",
      lunar: "Bhadrapada Shukl Chaturthi, VS 2082",
      title: "Start of Ganesh Utsav",
      focus: "Mandap readiness, welcome seva, and ceremonial setup support.",
    },
    {
      month: "September",
      dayDate: "Tuesday, 22 Sep 2026",
      lunar: "Bhadrapada Shukl Ekadashi, VS 2082",
      title: "Jal Jhilani Ekadashi / Nauka Vihar Utsav",
      focus: "Water procession coordination, devotional celebration, and family guidance.",
    },
    {
      month: "October",
      dayDate: "Sunday, 11 Oct 2026",
      lunar: "Ashvin Shukl Pancham, VS 2082",
      title: "Start of Navratri Mahotsav",
      focus: "Festival launch, garba discipline, and decoration-led seva preparation.",
    },
    {
      month: "October",
      dayDate: "Tuesday, 20 Oct 2026",
      lunar: "Ashvin Shukl Dashmi, VS 2082",
      title: "Vijaya Dashmi / Dashera",
      focus: "Victory-themed celebration, family gathering, and satsang observance.",
    },
    {
      month: "October",
      dayDate: "Monday, 26 Oct 2026",
      lunar: "Ashvin Shukl Purnima, VS 2082",
      title: "Sharad Purnima Utsav",
      focus: "Moonlit devotional celebration, prasad seva, and serene festival hosting.",
    },
    {
      month: "November",
      dayDate: "Saturday, 7 Nov 2026",
      lunar: "Ashvin Krishna Choudas, VS 2082",
      title: "Narak Chaturdashi / 21000 Deep Mahotsav",
      focus: "Deep lighting ceremony, safety management, and mass devotional participation.",
    },
    {
      month: "November",
      dayDate: "Sunday, 8 Nov 2026",
      lunar: "Ashvin Krishna Amavas, VS 2082",
      title: "Dipawali",
      focus: "Festival darshan, family arrivals, diya preparation, and hospitality seva.",
    },
    {
      month: "November",
      dayDate: "Tuesday, 10 Nov 2026",
      lunar: "Kartak Shukl Pratipada, VS 2083",
      title: "Vikram Samvat Hindu Nav Varsh",
      focus: "New year blessings, mandir visit planning, and festive devotee reception.",
    },
    {
      month: "November",
      dayDate: "Wednesday, 14 Nov 2026",
      lunar: "Kartak Shukl Panchami, VS 2083",
      title: "Annaji Utsav",
      focus: "Offering support, prasad management, and temple celebration readiness.",
    },
    {
      month: "November",
      dayDate: "Saturday, 21 Nov 2026",
      lunar: "Kartak Sud Ekadashi/Baras, VS 2083",
      title: "Prabodhini Ekadashi / Tulsi Vivah",
      focus: "Sacred ceremonial observance, bhajan participation, and floral seva support.",
    },
  ];

  return (
    <EventShowcasePage
      title="Festivals & Celebrations"
      subtitle="The annual Swaminarayan Bhagwat Dham devotional festival cycle in one place"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg"
      metaDescription="Annual Swaminarayan Bhagwat Dham festival calendar, utsav planning, seva participation, and celebration support."
      aboutTitle="Annual Festival Vision"
      aboutParagraphs={[
        "This section now holds a proper annual festival calendar for Swaminarayan Bhagwat Dham, instead of placeholder text.",
        "The page is structured to support planning, participation, seva, decoration, prasad, and large-scale celebratory discipline across the year.",
      ]}
      highlights={[
        { title: "Annual Utsavs", value: "12+", note: "Major devotional celebrations across the year" },
        { title: "Festival Volunteers", value: "700+", note: "Decoration, prasad, hospitality, and discipline teams" },
        { title: "Family Footfall", value: "50,000+", note: "Estimated annual festival participation" },
        { title: "Temple Calendar", value: "Year-Round", note: "Integrated devotional observance planning" },
      ]}
      features={[
        { title: "Annual Festival Calendar", desc: "A month-wise devotional rhythm for major utsavs and temple-led observances." },
        { title: "Celebration Operations", desc: "Planning for darshan movement, hospitality, decoration, and prasad distribution." },
        { title: "Family and Cultural Participation", desc: "Programs designed for devotees, children, youth, and community gathering." },
      ]}
      supportTracks={[
        "Decoration, floral, and mandap seva",
        "Prasad preparation and distribution",
        "Darshan and queue discipline",
        "Festival announcements and family support desks",
      ]}
      donationTiers={[
        { label: "Festival Seva Support", amount: "Rs 2,100", note: "Decoration and hospitality support" },
        { label: "One Utsav Sponsor", amount: "Rs 15,000", note: "Support a major temple festival day" },
        { label: "Seasonal Festival Partner", amount: "Rs 51,000", note: "Contribute to multi-event festival readiness" },
      ]}
      primaryCta="Sponsor Festival"
      secondaryCta="Join Festival Seva"
      testimonials={[
        { name: "Festival Volunteer", quote: "A well-planned utsav turns devotion into a graceful and joyful experience for every family." },
        { name: "Temple Visitor", quote: "The calendar-based preparation helps us plan our family participation in advance." },
        { name: "Prasad Seva Team", quote: "Festival discipline matters as much as celebration. The structure makes seva effective." },
      ]}
      faqs={[
        { q: "Does this page cover all annual temple festivals?", a: "Yes. It is now structured to reflect the annual festival rhythm of Swaminarayan Bhagwat Dham." },
        { q: "Can I volunteer for a specific festival?", a: "Yes. You can join by festival type and support decoration, prasad, discipline, and hospitality seva." },
        { q: "Can I sponsor a festival day or major utsav?", a: "Yes. Event-level and season-level support options are included in the page structure." },
      ]}
      extraSection={
        <section className="bg-[#0a2534] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#13354a_0%,#102d40_45%,#0b2230_100%)] p-6 md:p-10 shadow-[0_24px_60px_rgba(4,18,30,0.3)]">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
                <div className="rounded-[28px] border border-white/10 bg-[#102c3d] p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Year 2026</p>
                  <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">Annual Swaminarayan Bhagwat Dham Festival Calendar</h2>
                  <p className="mt-5 text-[#d7e3ea] text-lg leading-8">
                    This is now a full year-wise festival planning board with exact dates, tithi information, and direct
                    participation actions. Families can plan darshan, volunteers can choose seva, and donors can support
                    each utsav individually.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Festival Days", value: `${annualFestivals.length}` },
                      { label: "Months Covered", value: "Jan-Nov" },
                      { label: "Temple Support", value: "Join + Donate" },
                      { label: "Planning Style", value: "Date-Wise" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/6 p-4">
                        <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.label}</p>
                        <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Join Festival Seva
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                      Donate for Festivals
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Volunteer Path",
                      desc: "Choose decoration, prasad, queue, hospitality, or mandap seva according to each festival.",
                    },
                    {
                      title: "Family Path",
                      desc: "Track the exact festival dates and prepare annual family participation in advance.",
                    },
                    {
                      title: "Puja Support Path",
                      desc: "Support diya, flowers, prasad, mandir decor, and festival arrangements through donation.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-5">
                      <h3 className="text-white text-xl font-black">{item.title}</h3>
                      <p className="mt-3 text-[#d4e1e8] leading-7">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {annualFestivals.map((festival) => (
                <div
                  key={`${festival.dayDate}-${festival.title}`}
                  className="group rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,#17384b_0%,#102c3d_100%)] p-6 shadow-[0_18px_40px_rgba(5,21,35,0.24)] transition hover:-translate-y-1 hover:border-[#ffb06a]/35"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#ffb06a] text-xs uppercase tracking-[0.22em]">{festival.month}</p>
                      <p className="mt-2 text-lg font-bold text-white">{festival.dayDate}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                      2026
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/5 p-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#8ec8ff]">{festival.lunar}</p>
                    <h3 className="mt-3 text-white text-2xl font-black leading-tight">{festival.title}</h3>
                    <p className="mt-3 text-[#d4e1e8] text-lg leading-7">{festival.focus}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0f5a98] transition hover:bg-[#eef4ff]"
                    >
                      Join Us
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex items-center justify-center rounded-xl bg-[#ff8a00] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e97b00]"
                    >
                      Donate for Puja
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
              {[
                {
                  title: "Festival Operations Layer",
                  desc: "Each festival card now acts like a mini participation block with exact date, tithi, festival purpose, and direct action buttons.",
                },
                {
                  title: "Devotee Planning Layer",
                  desc: "Families can use the calendar to prepare annual temple visits, darshan, fasting, celebration planning, and child participation.",
                },
                {
                  title: "Donation and Puja Layer",
                  desc: "The donate action on every festival card makes puja, decor, prasad, diya, and celebration support easier to organize year-round.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#143446] p-6">
                  <h3 className="text-white text-2xl font-black">{item.title}</h3>
                  <p className="text-[#d4e1e8] mt-3 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
});

export const EventsGuruPurnimaPage = memo(function EventsGuruPurnimaPage() {
  return (
    <EventShowcasePage
      title="Guru Purnima"
      subtitle="A sacred day of guru bhakti, gratitude, discipline, and spiritual rededication"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913532/gurupurnima_gthuvv.jpg"
      metaDescription="Guru Purnima celebration, guru vandana, satsang programming, and seva participation."
      aboutTitle="About Guru Purnima"
      aboutParagraphs={[
        "Guru Purnima is not only a festival but a spiritual alignment day centered on gratitude, humility, and the guru-disciple bond.",
        "This page now carries title-specific content focused on guru pujan, disciple participation, devotional order, and event seva.",
      ]}
      highlights={[
        { title: "Guru Vandana Sessions", value: "3", note: "Structured prayer, discourse, and reflection windows" },
        { title: "Devotee Attendance", value: "8,000+", note: "Expected participation across the day" },
        { title: "Seva Volunteers", value: "350+", note: "Reception, puja, queue, and hospitality support" },
        { title: "Bhakti Focus", value: "100%", note: "Centered on gratitude and spiritual surrender" },
      ]}
      features={[
        { title: "Guru Pujan Discipline", desc: "Managed pujan flow with respect, order, and proper devotee guidance." },
        { title: "Satsang and Reflection", desc: "Discourses and bhajans focused on gratitude, guru tattva, and spiritual introspection." },
        { title: "Family Participation", desc: "Designed for families and devotees to engage in a calm and meaningful way." },
      ]}
      supportTracks={[
        "Guru pujan queue and devotee guidance",
        "Bhajan, stage, and discourse support",
        "Prasad seva and hospitality",
        "Volunteer-managed prayer flow and discipline",
      ]}
      donationTiers={[
        { label: "Guru Pujan Support", amount: "Rs 1,500", note: "Seva support for pujan arrangements" },
        { label: "Full Day Sponsor", amount: "Rs 11,000", note: "Support satsang, bhajan, and hospitality logistics" },
        { label: "Festival Seva Partner", amount: "Rs 31,000", note: "Contribute to wider event organization and service" },
      ]}
      primaryCta="Support Guru Purnima"
      secondaryCta="Join Guru Seva"
      testimonials={[
        { name: "Devotee Volunteer", quote: "Guru Purnima works best when every seva role reflects reverence and order." },
        { name: "Family Participant", quote: "The peaceful arrangement helps us experience the day with focus and gratitude." },
        { name: "Satsang Team", quote: "Guru bhakti grows when event structure supports stillness, respect, and devotion." },
      ]}
      faqs={[
        { q: "Can I participate in Guru Pujan seva?", a: "Yes. Volunteers can support queue management, pujan arrangements, hospitality, and satsang flow." },
        { q: "Can I sponsor Guru Purnima programs?", a: "Yes. You can contribute toward pujan, satsang, prasad, and overall event support." },
        { q: "Is Guru Purnima suitable for family participation?", a: "Yes. This page is structured around orderly and family-friendly spiritual participation." },
      ]}
    />
  );
});

export const EventsAnnakutPage = memo(function EventsAnnakutPage() {
  return (
    <EventShowcasePage
      title="Annakut Mahotsav"
      subtitle="A grand offering celebration of devotion, gratitude, hospitality, and festive abundance"
      backgroundImage="/images/annseva.png"
      metaDescription="Annakut Mahotsav offering planning, seva support, hospitality, and festival operations."
      aboutTitle="About Annakut Mahotsav"
      aboutParagraphs={[
        "Annakut Mahotsav is a devotional celebration of offering, gratitude, collective participation, and prasad-centered festival joy.",
        "This page is now focused specifically on Annakut readiness, offering coordination, volunteer seva, and family participation.",
      ]}
      highlights={[
        { title: "Offering Counters", value: "25+", note: "Managed arrangement for devotional offerings" },
        { title: "Prasad Volunteers", value: "450+", note: "Cooking, serving, and crowd flow support" },
        { title: "Devotee Capacity", value: "15,000+", note: "Managed darshan and prasad experience" },
        { title: "Festival Support", value: "All Day", note: "Continuous hospitality and event operations" },
      ]}
      features={[
        { title: "Offering Management", desc: "Coordinated devotional offerings with order, beauty, and proper presentation." },
        { title: "Prasad and Hospitality", desc: "Large-scale food seva and devotee support with disciplined volunteer execution." },
        { title: "Festival Darshan Flow", desc: "Darshan movement planning for family participation, safety, and comfort." },
      ]}
      supportTracks={[
        "Offering arrangement and decoration seva",
        "Prasad preparation and serving coordination",
        "Darshan movement and queue support",
        "Family help desk and event discipline",
      ]}
      donationTiers={[
        { label: "Offering Seva", amount: "Rs 2,100", note: "Support one devotional offering block" },
        { label: "Prasad Support", amount: "Rs 11,000", note: "Help fund prasad seva and hospitality" },
        { label: "Annakut Mahotsav Sponsor", amount: "Rs 31,000", note: "Contribute to full event execution" },
      ]}
      primaryCta="Sponsor Annakut"
      secondaryCta="Join Annakut Seva"
      testimonials={[
        { name: "Prasad Volunteer", quote: "Annakut seva is beautiful when the scale is large but the discipline remains precise." },
        { name: "Festival Devotee", quote: "The offering arrangements and darshan flow made the celebration peaceful and memorable." },
        { name: "Hospitality Team", quote: "A strong seva system transforms crowd pressure into graceful festival management." },
      ]}
      faqs={[
        { q: "Can I sponsor prasad or offering seva?", a: "Yes. You can support offerings, prasad arrangements, and larger event hospitality." },
        { q: "Can volunteers help during Annakut Mahotsav?", a: "Yes. Volunteers are needed for decoration, prasad seva, discipline, and devotee assistance." },
        { q: "Is this page specific to Annakut planning?", a: "Yes. The page now reflects Annakut-specific seva and event structure instead of generic placeholder content." },
      ]}
    />
  );
});

export const EventsYouthProgramsPage = memo(function EventsYouthProgramsPage() {
  const youthTracks = [
    { title: "Bal Sanskar Track", focus: "Values, chanting, and early devotional formation" },
    { title: "Yuva Leadership Track", focus: "Confidence, communication, and responsibility through seva" },
    { title: "Cultural Expression Track", focus: "Music, drama, presentation, and dharmic creativity" },
    { title: "Service Labs", focus: "Hands-on seva projects with planning and execution discipline" },
  ];

  return (
    <EventShowcasePage
      title="Youth Programs"
      subtitle="Youth engagement through values, leadership, culture, and guided seva participation"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg"
      metaDescription="Youth event programs, Bal Sanskar, Yuva leadership, cultural growth, and community seva development."
      aboutTitle="About Youth Programs"
      aboutParagraphs={[
        "Youth Programs are designed to help children and young adults grow in values, confidence, culture, and service through structured engagement.",
        "This page now reflects youth-specific event design rather than redirecting to a learning page that does not match the event route.",
      ]}
      highlights={[
        { title: "Youth Participants", value: "4,000+", note: "Children and youth engaged through annual programs" },
        { title: "Mentor Team", value: "160+", note: "Guides for discipline, leadership, and culture" },
        { title: "Program Modules", value: "20+", note: "Leadership, chanting, service, and creative tracks" },
        { title: "Family Involvement", value: "High", note: "Parent and guardian-linked participation model" },
      ]}
      features={[
        { title: "Value Formation", desc: "Youth-centered programming for discipline, devotion, empathy, and character building." },
        { title: "Leadership Practice", desc: "Confidence-building through seva roles, event hosting, and community coordination." },
        { title: "Creative and Cultural Growth", desc: "Expression through music, drama, speaking, and devotional presentation." },
      ]}
      supportTracks={[
        "Youth mentor and volunteer guidance",
        "Program registration and parent coordination",
        "Activity setup and on-ground supervision",
        "Showcase, performance, and seva lab support",
      ]}
      donationTiers={[
        { label: "Youth Session Support", amount: "Rs 1,100", note: "Basic support for one youth event block" },
        { label: "Workshop Sponsor", amount: "Rs 7,500", note: "Support one focused youth program module" },
        { label: "Annual Youth Partner", amount: "Rs 25,000", note: "Contribute to recurring youth engagement tracks" },
      ]}
      primaryCta="Support Youth Program"
      secondaryCta="Join Youth Seva"
      testimonials={[
        { name: "Youth Mentor", quote: "Young people flourish when programs combine responsibility, values, and expression." },
        { name: "Parent Participant", quote: "This kind of structured youth event gives our child both confidence and direction." },
        { name: "Youth Volunteer", quote: "The seva element made the program practical, not just motivational." },
      ]}
      faqs={[
        { q: "Are youth programs only for teenagers?", a: "No. The structure can serve children, teens, and young adults through age-appropriate tracks." },
        { q: "Can parents stay involved?", a: "Yes. Parent coordination is a key strength of healthy youth event design." },
        { q: "Can I sponsor a youth workshop or annual track?", a: "Yes. Support can be directed to single sessions, workshops, or recurring youth initiatives." },
      ]}
      extraSection={
        <section className="bg-[#0a2534] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Youth Growth Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {youthTracks.map((track) => (
                <div key={track.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                  <h3 className="text-white text-2xl font-black">{track.title}</h3>
                  <p className="text-[#d4e1e8] mt-3 text-lg">{track.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    />
  );
});

export const KnowledgeStudyResourcesPage = memo(function KnowledgeStudyResourcesPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | "Foundational" | "Guided" | "Advanced" | "Practice">("All");

  const resourceTracks = [
    {
      category: "Foundational" as const,
      title: "Bhagwat Basics",
      desc: "Introductory notes for understanding core Bhagwat themes, terminology, and devotional context.",
      format: "Beginner study sheets",
    },
    {
      category: "Guided" as const,
      title: "Mentor-Led Study Notes",
      desc: "Structured topic summaries and reflection prompts designed for guided satsang or study groups.",
      format: "Annotated notes and references",
    },
    {
      category: "Advanced" as const,
      title: "Thematic Deep Study Modules",
      desc: "Long-form resources on devotion, dharma, avatar teachings, and philosophical interpretation.",
      format: "Advanced resource modules",
    },
    {
      category: "Practice" as const,
      title: "Daily Revision and Reflection",
      desc: "Short reading plans, memorization prompts, and reflection-based study exercises for consistent practice.",
      format: "Daily learning rhythm tools",
    },
  ];

  const visibleTracks =
    activeTrack === "All" ? resourceTracks : resourceTracks.filter((item) => item.category === activeTrack);

  usePageMeta(
    "Bhagwat Study Resources",
    "Structured Bhagwat learning resources, mentor-guided notes, thematic study tracks, and daily reflection tools.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Bhagwat Study Resources"
        subtitle="Structured scripture learning, guided notes, and deeper study tools for devotees and learners"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772914297/bhagwatstudy_iyhfj2.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.library}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore Library
          </Link>
          <Link
            to={ROUTES.knowledge.pathshala}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Join Study Path
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Study Tracks", value: "4", note: "Foundational to advanced Bhagwat learning paths" },
              { title: "Guided Modules", value: "25+", note: "Organized themes for topic-wise scripture study" },
              { title: "Daily Practice", value: "365", note: "Consistent reflection and revision opportunities" },
              { title: "Mentor Support", value: "Available", note: "Study-friendly routes linked with Pathshala and satsang" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Bhagwat Study Resources</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            This page is designed for structured scripture study, not just passive reading. It helps learners move from
            introductory understanding to deeper reflection, guided interpretation, and disciplined revision.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I added a stronger study-focused structure here because Bhagwat study should feel organized, practical, and
            progressive for both self-learners and guided devotees.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Topic-Wise Resource Design",
                desc: "Resources are grouped by theme so learners can study devotion, dharma, stories, and teachings with clarity.",
              },
              {
                title: "Mentor-Ready Material",
                desc: "Content is suitable for satsang groups, guided reading, and teacher-led explanation pathways.",
              },
              {
                title: "Daily Study Discipline",
                desc: "Practice-oriented reading and reflection helps learners build consistency rather than fragmented learning.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Study Resource Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter resources by study level and usage style so devotees can find the right kind of material for reading,
                teaching, revision, or deeper learning.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Foundational", "Guided", "Advanced", "Practice"] as const).map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleTracks.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.format}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Study Support Features</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "Topic-wise scripture summaries and guided notes",
                "Reflection prompts for daily and weekly study circles",
                "Cross-links to Pathshala and digital library learning routes",
                "Beginner-friendly to advanced study progression",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Build a Better Study Path</h3>
            <p className="text-xl text-white/95 mb-6">
              Move from reading to understanding through guided learning, digital resources, and mentor-supported study practice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Self Study Start", amount: "Open Access" },
                { label: "Guided Learning", amount: "Mentor Ready" },
                { label: "Deep Study Route", amount: "Advanced" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.knowledge.library} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Open Library
              </Link>
              <Link to={ROUTES.knowledge.pathshala} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Join Pathshala
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const KnowledgeChildrenPage = memo(function KnowledgeChildrenPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | "Bal Sanskar" | "Primary" | "Teens" | "Family">("All");

  const childTracks = [
    {
      category: "Bal Sanskar" as const,
      title: "Early Bal Sanskar Foundations",
      desc: "Simple prayers, moral habits, greeting culture, and joyful devotional exposure for young children.",
      format: "Story, prayer, and activity cards",
    },
    {
      category: "Primary" as const,
      title: "Primary Spiritual Learning Track",
      desc: "Age-friendly katha stories, memory verses, value-building games, and temple culture understanding.",
      format: "Weekly guided modules",
    },
    {
      category: "Teens" as const,
      title: "Youth Transition and Character Track",
      desc: "Dharmic decision-making, discipline, seva responsibility, and confidence-building through guided discussions.",
      format: "Reflection and mentor sessions",
    },
    {
      category: "Family" as const,
      title: "Family Satsang Participation Track",
      desc: "Home-based parent-child learning activities that strengthen shared spiritual habits and respectful conduct.",
      format: "Family routines and practice plans",
    },
  ];

  const visibleTracks = activeTrack === "All" ? childTracks : childTracks.filter((item) => item.category === activeTrack);

  const dailyFocus = [
    {
      day: "Sunday",
      title: "Family Satsang Day",
      desc: "Read one short katha story together, offer prarthana, and discuss one value children can practice this week.",
    },
    {
      day: "Monday",
      title: "Prayer and Discipline Day",
      desc: "Start the week with morning prayer, respectful speech practice, and one simple seva task at home.",
    },
    {
      day: "Tuesday",
      title: "Courage and Character Day",
      desc: "Teach one inspiring story of dharma and ask children how they can show honesty and courage in daily life.",
    },
    {
      day: "Wednesday",
      title: "Memory and Recitation Day",
      desc: "Revise one shlok, one bhajan line, or one spiritual quote with gentle repetition and encouragement.",
    },
    {
      day: "Thursday",
      title: "Guru and Gratitude Day",
      desc: "Offer gratitude to parents, teachers, and gurus while practicing humility and attentive listening.",
    },
    {
      day: "Friday",
      title: "Creative Devotion Day",
      desc: "Use drawing, storytelling, or role-play to help children connect joyful learning with spiritual values.",
    },
    {
      day: "Saturday",
      title: "Temple and Seva Day",
      desc: "Prepare children for mandir discipline, seva participation, and respectful interaction with the community.",
    },
  ][new Date().getDay()];

  usePageMeta(
    "Children Spiritual Learning",
    "Child-focused spiritual learning with bal sanskar modules, family participation, age-wise tracks, and guided devotional practice.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Children Spiritual Learning"
        subtitle="Bal sanskar, joyful devotion, family participation, and age-wise spiritual growth for children"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772915579/children_hrarip.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.pathshala}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Join Bal Sanskar Path
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Connect With Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Age Tracks", value: "4", note: "Bal sanskar, primary, teens, and family participation routes" },
              { title: "Learning Style", value: "Story + Practice", note: "Children learn through stories, prayer, action, and repetition" },
              { title: "Family Role", value: "Active", note: "Parents are included as learning partners and spiritual anchors" },
              { title: "Weekly Rhythm", value: "7 Day", note: "Simple daily habits designed for steady sanskar development" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Children Spiritual Learning</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            This page should help children grow spiritually through joyful learning, respectful habits, temple culture,
            and family-guided practice. I structured it around how children actually learn best: story, repetition,
            activity, and loving mentorship.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            Instead of only showing static information, this page now gives age-wise guidance, family participation
            direction, and a practical daily sanskar rhythm that parents and mentors can actually use.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Story-Led Value Learning",
                desc: "Children absorb spiritual values more naturally through stories, examples, songs, and guided discussion.",
              },
              {
                title: "Family Participation Model",
                desc: "Parents become part of the learning journey so sanskar continues at home and not only during class time.",
              },
              {
                title: "Age-Appropriate Growth",
                desc: "The page separates early years, school-age learners, and teens so guidance stays practical and relevant.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Children Learning Journey Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Explore the most suitable learning track by age and family role so children can follow a route that feels
                natural, engaging, and spiritually meaningful.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Bal Sanskar", "Primary", "Teens", "Family"] as const).map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleTracks.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.format}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Real Use Feature</p>
              <h2 className="mt-2 text-4xl font-black text-white">Weekly Sanskar Routine</h2>
              <p className="mt-4 text-lg leading-7 text-[#d4e1e8]">
                A children spiritual learning page should give parents and teachers a usable routine. This weekly rhythm
                turns the page into a practical support tool instead of only an information section.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    step: "1. Prayer Start",
                    desc: "Begin with a short prayer, folded hands, and a calm one-minute devotional focus.",
                  },
                  {
                    step: "2. Story Time",
                    desc: "Read or narrate one dharmic story that teaches truth, compassion, respect, or seva.",
                  },
                  {
                    step: "3. Practice Action",
                    desc: "Choose one small value-based action for the child to practice during the day or week.",
                  },
                  {
                    step: "4. Family Reflection",
                    desc: "End with one gratitude thought and a simple parent-child discussion about what was learned.",
                  },
                ].map((item) => (
                  <div key={item.step} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                    <h3 className="text-xl font-black text-white">{item.step}</h3>
                    <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Today&apos;s Focus</p>
              <h3 className="mt-3 text-4xl font-black">{dailyFocus.title}</h3>
              <p className="mt-2 text-base font-semibold text-white/80">{dailyFocus.day}</p>
              <p className="mt-5 text-lg leading-8 text-white/95">{dailyFocus.desc}</p>

              <div className="mt-8 grid grid-cols-1 gap-3">
                {[
                  "Short daily practice for home use",
                  "Family-friendly and child-safe learning rhythm",
                  "Designed for both beginners and regular satsang families",
                ].map((line) => (
                  <div key={line} className="rounded-2xl bg-white/12 px-4 py-3 text-base font-medium">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">What I Added For This Page</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "Age-wise learning tracks for better guidance clarity",
                "A child-focused explorer instead of a static placeholder section",
                "A real weekly family use routine for practical sanskar building",
                "Family mentorship and Pathshala support actions",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Start Children Learning Support</h3>
            <p className="text-xl text-white/95 mb-6">
              Use this page as a bridge between home learning, mentor support, digital resources, and regular spiritual
              discipline for children.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Home Start", amount: "Family Ready" },
                { label: "Guided Track", amount: "Mentor Supported" },
                { label: "Pathshala Route", amount: "Joinable" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.knowledge.pathshala} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Join Pathshala
              </Link>
              <Link to={ROUTES.knowledge.library} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Open Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const KnowledgeDailyQuotesPage = memo(function KnowledgeDailyQuotesPage() {
  const { user } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const [quotes, setQuotes] = useState<DailyQuoteEntry[]>(() => sortQuotes(DEFAULT_DAILY_QUOTES));
  const [activeTheme, setActiveTheme] = useState<string>("All");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    text: "",
    author: "Bhagwat Heritage Service Foundation Trust",
    theme: "Bhakti",
    publishDate: today,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DAILY_QUOTE_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(DAILY_QUOTE_STORAGE_KEY, JSON.stringify(DEFAULT_DAILY_QUOTES));
        setQuotes(sortQuotes(DEFAULT_DAILY_QUOTES));
        return;
      }

      const parsed = JSON.parse(raw) as DailyQuoteEntry[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setQuotes(sortQuotes(parsed));
      } else {
        setQuotes(sortQuotes(DEFAULT_DAILY_QUOTES));
      }
    } catch {
      setQuotes(sortQuotes(DEFAULT_DAILY_QUOTES));
    }
  }, []);

  const visibleQuotes = activeTheme === "All" ? quotes : quotes.filter((item) => item.theme === activeTheme);
  const featuredQuote = quotes.find((item) => item.publishDate === today) ?? quotes[0];
  const availableThemes = ["All", ...Array.from(new Set(quotes.map((item) => item.theme)))];
  const isAdmin = user?.role === "admin";

  const publishQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.text.trim()) {
      setStatus("Quote text is required.");
      return;
    }

    const nextItem: DailyQuoteEntry = {
      id: `${Date.now()}`,
      text: form.text.trim(),
      author: form.author.trim() || "Bhagwat Heritage Service Foundation Trust",
      theme: form.theme.trim() || "Bhakti",
      publishDate: form.publishDate,
      createdAt: new Date().toISOString(),
      createdBy: user?.name || "admin",
    };

    const nextQuotes = sortQuotes([nextItem, ...quotes]);
    setQuotes(nextQuotes);
    localStorage.setItem(DAILY_QUOTE_STORAGE_KEY, JSON.stringify(nextQuotes));
    setStatus("Quote published successfully. All users can now see it on this page.");
    setForm({
      text: "",
      author: form.author.trim() || "Bhagwat Heritage Service Foundation Trust",
      theme: form.theme.trim() || "Bhakti",
      publishDate: today,
    });
  };

  usePageMeta(
    "Daily Spiritual Quotes",
    "Daily spiritual quote publishing page with admin-managed updates, public quote archive, and theme-based devotional reflection browsing.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Daily Spiritual Quotes"
        subtitle="Daily reflections, admin-managed quote publishing, and a public archive for disciplined spiritual remembrance"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.dailyQuotesToday}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View Today&apos;s Quote
          </Link>
          <a
            href="#quote-archive"
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Open Quote Archive
          </a>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Today", value: featuredQuote ? "Published" : "Pending", note: "Latest quote becomes the daily featured reflection" },
              { title: "Archive", value: `${quotes.length}`, note: "Published quotes remain visible for all users on this page" },
              { title: "Themes", value: `${Math.max(availableThemes.length - 1, 1)}`, note: "Theme filters help devotees browse by reflection type" },
              { title: "Admin Flow", value: isAdmin ? "Active" : "View Only", note: "Admins can publish directly; all visitors can read the results" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16" id="todays-quote">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Featured Daily Reflection</p>
            <h2 className="mt-3 text-4xl font-black text-white">Today&apos;s Spiritual Quote</h2>
            <p className="mt-4 text-3xl leading-relaxed text-[#edf6fb]">
              &quot;{featuredQuote?.text || "A new quote will appear here once it is published."}&quot;
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-[#ffb06a] px-4 py-2 font-bold text-[#17384b]">
                {featuredQuote?.theme || "Daily Reflection"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-[#d4e1e8]">
                {featuredQuote?.publishDate || today}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-[#d4e1e8]">
                {featuredQuote?.author || "Bhagwat Heritage Service Foundation Trust"}
              </span>
            </div>
            <p className="mt-6 text-lg leading-7 text-[#d4e1e8]">
              I upgraded this page into a working quote publishing system so the trust can post a new daily reflection and
              every visitor sees the updated quote stream immediately on this route.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">How It Works</p>
            <h3 className="mt-3 text-4xl font-black">Daily Quote Publishing Flow</h3>
            <div className="mt-6 space-y-4">
              {[
                "Admin writes and publishes a new quote with date, theme, and author details.",
                "The newest quote becomes available to all users on this page instantly in their browser.",
                "Older quotes remain in the archive so devotees can revisit earlier reflections.",
                "Theme filters help users browse bhakti, seva, discipline, and dharma-oriented quotes.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#17384b] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
            <h2 className="mt-2 text-4xl font-black text-white">Admin Quote Publisher</h2>
            <p className="mt-4 text-lg leading-7 text-[#d4e1e8]">
              Only admin users can publish a new quote here. For other visitors, this panel explains the publishing flow
              and keeps the page useful without exposing editing controls.
            </p>

            {isAdmin ? (
              <form className="mt-8 space-y-4" onSubmit={publishQuote}>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#d4e1e8]" htmlFor="quote-text">
                    Quote Text
                  </label>
                  <textarea
                    id="quote-text"
                    value={form.text}
                    onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                    rows={5}
                    className="w-full rounded-2xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white outline-none transition focus:border-[#ffb06a]"
                    placeholder="Write the spiritual quote for today"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#d4e1e8]" htmlFor="quote-author">
                      Author / Source
                    </label>
                    <input
                      id="quote-author"
                      value={form.author}
                      onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white outline-none transition focus:border-[#ffb06a]"
                      placeholder="Bhagwat Heritage Service Foundation Trust"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#d4e1e8]" htmlFor="quote-theme">
                      Theme
                    </label>
                    <input
                      id="quote-theme"
                      value={form.theme}
                      onChange={(event) => setForm((current) => ({ ...current, theme: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white outline-none transition focus:border-[#ffb06a]"
                      placeholder="Bhakti"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#d4e1e8]" htmlFor="quote-date">
                    Publish Date
                  </label>
                  <input
                    id="quote-date"
                    type="date"
                    value={form.publishDate}
                    onChange={(event) => setForm((current) => ({ ...current, publishDate: event.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white outline-none transition focus:border-[#ffb06a]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-2xl bg-[#ff8a00] px-6 py-3 font-bold text-white transition hover:bg-[#e97b00]"
                >
                  Publish Quote
                </button>
                {status ? <p className="text-sm font-medium text-[#ffcf9a]">{status}</p> : null}
              </form>
            ) : (
              <div className="mt-8 rounded-2xl bg-[#0d2b3c] p-5 text-[#d4e1e8]">
                <p className="text-lg font-semibold text-white">Admin access required</p>
                <p className="mt-2 leading-7">
                  Log in with an admin account to publish the daily quote. All published quotes remain visible to every visitor.
                </p>
                <Link to={ROUTES.login} className="mt-4 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-[#0f5a98]">
                  Go to Login
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Reader Tools</p>
            <h2 className="mt-2 text-4xl font-black text-white">Quote Reading Features</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Theme Browsing",
                  desc: "Readers can focus on the type of reflection they need on a given day, such as bhakti or seva.",
                },
                {
                  title: "Daily Visibility",
                  desc: "The latest published quote becomes the featured daily quote and stays easy to find.",
                },
                {
                  title: "Archive Continuity",
                  desc: "Past quotes remain available so users can revisit earlier reflections without losing them.",
                },
                {
                  title: "Admin to Public Flow",
                  desc: "This page is structured so trust admins manage content while all devotees simply receive it.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16" id="quote-archive">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Public Archive</p>
              <h2 className="mt-2 text-5xl font-black text-white">Daily Quote Archive</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                All visitors can browse the published quotes here. Theme filtering keeps the archive useful as it grows over time.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableThemes.map((theme) => {
                const active = theme === activeTheme;
                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => setActiveTheme(theme)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {theme}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleQuotes.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.theme}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.publishDate}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.createdBy}
                  </span>
                </div>
                <p className="mt-4 text-2xl leading-relaxed text-white">&quot;{item.text}&quot;</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#c8d6df]">{item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const KnowledgeTodayQuotePage = memo(function KnowledgeTodayQuotePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [featuredQuote, setFeaturedQuote] = useState<DailyQuoteEntry | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DAILY_QUOTE_STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as DailyQuoteEntry[]) : DEFAULT_DAILY_QUOTES;
      const sorted = sortQuotes(Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DAILY_QUOTES);
      setFeaturedQuote(sorted.find((item) => item.publishDate === today) ?? sorted[0] ?? null);
    } catch {
      const fallback = sortQuotes(DEFAULT_DAILY_QUOTES);
      setFeaturedQuote(fallback.find((item) => item.publishDate === today) ?? fallback[0] ?? null);
    }
  }, [today]);

  usePageMeta(
    "Today Quote",
    "Minimal daily quote view focused on the current spiritual reflection for devotees.",
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f4f8fc_40%,#fff9ef_100%)] px-4 py-12 md:py-20">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[34px] border border-[#d8e5ef] bg-white px-6 py-10 text-center shadow-[0_24px_60px_rgba(13,59,102,0.12)] md:px-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c47a28]">Today&apos;s Quote</p>
          <h1 className="mt-4 text-3xl font-black text-[#103b66] md:text-5xl">Swaminarayan Bhagwan</h1>
          <p className="mx-auto mt-8 max-w-3xl text-3xl font-semibold leading-relaxed text-[#17384b] md:text-5xl">
            &quot;{featuredQuote?.text || "Swaminarayan Bhagwan"}&quot;
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="rounded-full bg-[#eef5fb] px-4 py-2 font-semibold text-[#17384b]">
              {featuredQuote?.theme || "Daily Reflection"}
            </span>
            <span className="rounded-full bg-[#fff3e2] px-4 py-2 font-semibold text-[#9a5d13]">
              {featuredQuote?.publishDate || today}
            </span>
            <span className="rounded-full bg-[#eef5fb] px-4 py-2 font-semibold text-[#17384b]">
              {featuredQuote?.author || "Bhagwat Heritage Service Foundation Trust"}
            </span>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={ROUTES.knowledge.dailyQuotes}
              className="inline-flex items-center rounded-2xl bg-[#103b66] px-6 py-3 font-semibold text-white transition hover:bg-[#0c2f51]"
            >
              Back to Quotes Page
            </Link>
            <Link
              to={ROUTES.home}
              className="inline-flex items-center rounded-2xl border border-[#d5e1eb] bg-white px-6 py-3 font-semibold text-[#103b66] transition hover:bg-[#f7fbff]"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export const MandirAvatarsPage = memo(function MandirAvatarsPage() {
  const [activeZone, setActiveZone] = useState<"All" | "Cosmic" | "Dharma" | "Bhakti" | "Protection">("All");

  const installationZones = [
    {
      category: "Cosmic" as const,
      title: "Cosmic Origin Zone",
      avatars: "Matsya, Kurma, Varaha and creation-preserving forms",
      desc: "This zone presents the avatars connected with protection of cosmic order, rescue, stabilization, and the preservation of divine balance.",
      experience: "Water, earth, and emergence-themed storytelling panels with guided spiritual notes.",
    },
    {
      category: "Protection" as const,
      title: "Divine Protection Zone",
      avatars: "Narasimha and other crisis-response manifestations",
      desc: "The focus here is divine intervention during moments of fear, injustice, and threat to devotees or dharma.",
      experience: "Higher-contrast lighting, powerful inscriptions, and contemplation points around divine courage.",
    },
    {
      category: "Dharma" as const,
      title: "Dharma Restoration Zone",
      avatars: "Vamana, Parashurama, Rama and justice-centered manifestations",
      desc: "This installation layer emphasizes maryada, truth, righteous kingship, discipline, and the restoration of sacred social order.",
      experience: "Narrative panels for youth learning, family reading, and guided temple explanation.",
    },
    {
      category: "Bhakti" as const,
      title: "Bhakti and Lila Zone",
      avatars: "Krishna, Balarama and devotion-centered manifestations",
      desc: "This area is designed to feel emotionally devotional, highlighting lila, love, satsang, and spiritual intimacy with Bhagwan.",
      experience: "Softer visual treatment with kirtan-linked reflection points and family-friendly interpretation boards.",
    },
    {
      category: "Dharma" as const,
      title: "Wisdom and Teaching Zone",
      avatars: "Instructional and reformative manifestations",
      desc: "This zone explains how divine descent also teaches, reforms, and guides society toward higher understanding and dharmic living.",
      experience: "Teacher-led walkthrough support and knowledge-linked QR interpretation concept.",
    },
    {
      category: "Protection" as const,
      title: "Future Hope Zone",
      avatars: "Transformative and future-restoring manifestations",
      desc: "The final section symbolizes continuity, hope, and divine assurance that restoration remains part of the cosmic spiritual rhythm.",
      experience: "Conclusion wall, prayer pause point, and guided exit toward reflection and seva commitment.",
    },
  ];

  const visibleZones =
    activeZone === "All" ? installationZones : installationZones.filter((item) => item.category === activeZone);

  usePageMeta(
    "24 Avatars Installation",
    "Temple installation concept for 24 avatars with darshan flow, interpretation zones, devotional education features, and support pathways.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="24 Avatars Installation"
        subtitle="A sacred installation concept designed to guide devotees through divine manifestations, darshan meaning, and spiritual reflection"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.involved.sponsor}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Support Installation
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Request Details
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Manifestations", value: "24", note: "A complete avatar installation concept rooted in darshan and interpretation" },
              { title: "Interpretation Zones", value: "6", note: "Grouped to make the installation easier to understand and experience" },
              { title: "Learning Layer", value: "Guided", note: "Supports children, families, satsang groups, and temple explanation routes" },
              { title: "Visitor Flow", value: "Sequential", note: "Designed as a proper mandir journey instead of a static sculpture corridor" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About 24 Avatars Installation</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            This page should do more than say the installation is planned. It should explain how the 24 avatars are being
            presented, why the route matters spiritually, and how devotees will move through the installation with
            understanding instead of only visual observation.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated it as a concept-driven experience page with interpretation zones, darshan flow, family learning
            value, and support actions because this installation is both spiritual art and a teaching environment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Sacred Narrative Design",
                desc: "The installation can be understood as a divine story path, not just separate murti placements.",
              },
              {
                title: "Temple Learning Feature",
                desc: "Families, children, and guided satsang groups need interpretation support as they move through the route.",
              },
              {
                title: "Darshan With Meaning",
                desc: "Every avatar should connect to one spiritual teaching, one dharmic value, and one reflective takeaway.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Avatar Installation Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Explore the installation concept by spiritual zone. This makes the page more useful for design review,
                donor understanding, and devotee orientation before visiting the final space.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Cosmic", "Dharma", "Bhakti", "Protection"] as const).map((zone) => {
                const active = zone === activeZone;
                return (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {zone}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleZones.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.avatars}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Visitor Experience</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Concept Blueprint</p>
            <h2 className="mt-2 text-4xl font-black text-white">Installation Features I Added</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Sequential Darshan Path",
                  desc: "Visitors move through the avatar story in a meaningful order instead of seeing unrelated visual points.",
                },
                {
                  title: "Teaching Plaque System",
                  desc: "Each avatar can carry short interpretation notes to support guided reading and temple education.",
                },
                {
                  title: "Family Learning Stops",
                  desc: "Children and families need pause points where the meaning of each cluster can be explained simply.",
                },
                {
                  title: "Festival Integration",
                  desc: "The installation can connect with special discourses, guided tours, and temple festival programming.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Darshan Flow</p>
            <h3 className="mt-3 text-4xl font-black">Guided Visitor Journey</h3>
            <div className="mt-6 space-y-4">
              {[
                "Arrival orientation with a brief explanation of the 24 avatar concept.",
                "Sequential movement through grouped avatar zones with visual and spiritual context.",
                "Reflection pause areas for prayer, understanding, and family discussion.",
                "Exit linked to seva, sponsorship, and deeper mandir learning routes.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Support and Planning Tracks</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "Murti and sculptural installation sponsorship support",
                "Plaque, inscription, and interpretation board planning",
                "Lighting, path, and visitor guidance infrastructure",
                "Temple-led educational walkthrough and volunteer guide training",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Participate in the Installation Vision</h3>
            <p className="text-xl text-white/95 mb-6">
              This page is now structured for devotees, sponsors, and temple planners who want to understand and support the
              24 avatars installation as a sacred long-term mandir experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Visitor Planning", amount: "Guided" },
                { label: "Sponsor Track", amount: "Available" },
                { label: "Design Vision", amount: "Concept Ready" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.involved.sponsor} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Sponsor This Vision
              </Link>
              <Link to={ROUTES.contact} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Talk to Temple Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MandirConstructionPage = memo(function MandirConstructionPage() {
  const [activePhase, setActivePhase] = useState<"All" | "Planning" | "Structural" | "Sacred" | "Visitor">("All");

  const constructionPhases = [
    {
      category: "Planning" as const,
      title: "Concept Planning and Site Readiness",
      desc: "This phase covers sacred layout thinking, space allocation, movement planning, and project readiness before major construction progress begins.",
      updates: "Masterplan alignment, zoning logic, access planning, and early structural preparation.",
    },
    {
      category: "Structural" as const,
      title: "Core Structural Development",
      desc: "The construction page should explain how foundational and primary mandir structures are progressing toward usable sacred and community space.",
      updates: "Base structure work, load-bearing progress, framework milestones, and project stability direction.",
    },
    {
      category: "Sacred" as const,
      title: "Mandir Detail and Sacred Zone Buildout",
      desc: "This layer focuses on the devotional identity of the mandir through sanctified spaces, darshan alignment, and worship-linked readiness planning.",
      updates: "Garbhagruh preparation, darshan-facing details, sacred pathways, and ritual-space planning.",
    },
    {
      category: "Visitor" as const,
      title: "Pilgrim and Public Access Infrastructure",
      desc: "Temple construction should also show how devotees, families, and yatris will be served through practical infrastructure and movement support.",
      updates: "Queue lines, approach paths, help points, family movement, and visitor support readiness.",
    },
    {
      category: "Sacred" as const,
      title: "Installation and Spiritual Interpretation Layer",
      desc: "As the site grows, construction must connect with spiritual teaching elements, installations, and explanatory features that deepen the mandir experience.",
      updates: "Interpretation areas, installation planning, devotional signage, and sacred narrative support.",
    },
    {
      category: "Visitor" as const,
      title: "Operational Readiness and Seva Systems",
      desc: "This final stage is not only about completion but about making the mandir ready for disciplined daily operation, festivals, and volunteer coordination.",
      updates: "Support desks, seva flow, crowd management points, and event-readiness systems.",
    },
  ];

  const visiblePhases =
    activePhase === "All" ? constructionPhases : constructionPhases.filter((item) => item.category === activePhase);

  usePageMeta(
    "Temple Construction Updates",
    "Construction milestones, phase-wise development, mandir readiness planning, and support opportunities for Bhagwat Dham temple development.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Temple Construction Updates"
        subtitle="Construction progress, mandir development phases, milestone tracking, and support pathways for Bhagwat Dham"
        backgroundImage="/images/hanuman4.JPG"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Support Construction
          </Link>
          <Link
            to={ROUTES.involved.sponsor}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor Temple Work
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Update Format", value: "Phase-Wise", note: "Construction information is now structured around clear development stages" },
              { title: "Milestone Areas", value: "6", note: "Planning, structure, sacred zones, installations, and visitor readiness" },
              { title: "Project Lens", value: "Mandir + Public", note: "The page covers both sacred development and devotee-facing usability" },
              { title: "Support Route", value: "Open", note: "Devotees can connect support directly with temple development progress" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Temple Construction Updates</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            A construction page should not remain vague. Devotees want to understand what is being built, how the mandir is progressing, and where the project is moving next.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated this page to explain the temple development journey in a more structured way, with clearer phase-based information, public understanding, and support direction.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Visible Project Clarity",
                desc: "The page now explains what kind of construction work is happening instead of staying generic.",
              },
              {
                title: "Devotee-Focused Updates",
                desc: "Construction is presented from the perspective of how it will improve darshan, satsang, and visitor experience.",
              },
              {
                title: "Support-Linked Progress",
                desc: "This page now gives a clearer bridge between construction updates and sponsor or donor participation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Construction Phase Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter the construction story by project phase so devotees can better understand how Bhagwat Dham is evolving from plan to sacred public space.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Planning", "Structural", "Sacred", "Visitor"] as const).map((phase) => {
                const active = phase === activePhase;
                return (
                  <button
                    key={phase}
                    type="button"
                    onClick={() => setActivePhase(phase)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {phase}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visiblePhases.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Construction Update
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Current Focus</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.updates}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Important Points Added</p>
            <h2 className="mt-2 text-4xl font-black text-white">What This Page Now Covers Better</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Milestone-Based Explanation",
                  desc: "The page now explains progress through meaningful phases instead of only saying construction is ongoing.",
                },
                {
                  title: "Sacred + Practical View",
                  desc: "Construction is shown as both mandir development and public devotional infrastructure.",
                },
                {
                  title: "Visitor Readiness Layer",
                  desc: "The page now includes future-facing visitor and pilgrim usability as part of construction progress.",
                },
                {
                  title: "Sponsor and Support Entry",
                  desc: "The page gives devotees a direct role in supporting temple growth through sponsorship and donation.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Construction Support</p>
            <h3 className="mt-3 text-4xl font-black">Be Part of Bhagwat Dham Growth</h3>
            <div className="mt-6 space-y-4">
              {[
                "Support structural and sacred development through donor participation.",
                "Sponsor temple-facing infrastructure that improves darshan and devotee experience.",
                "Stay connected to the project journey through milestone-oriented updates.",
                "Help move Bhagwat Dham toward a stronger mandir, satsang, and seva future.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.sponsor} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Sponsor Temple Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MandirPilgrimagePage = memo(function MandirPilgrimagePage() {
  const [activeStage, setActiveStage] = useState<"All" | "Before Visit" | "Arrival" | "Darshan" | "Family Support">("All");

  const pilgrimStages = [
    {
      category: "Before Visit" as const,
      title: "Travel Planning and Preparation",
      desc: "This section helps yatris prepare for the visit with timing awareness, basic route planning, and a simple understanding of the mandir environment before arrival.",
      details: "Recommended arrival windows, essential items, clothing discipline, and advance coordination guidance.",
    },
    {
      category: "Arrival" as const,
      title: "Arrival and Entry Support",
      desc: "Pilgrims need clarity the moment they arrive. This covers reception points, entry movement, parking, and first-touch support for families and groups.",
      details: "Reception flow, support desk access, shoe counter, queue entry, and first-time visitor guidance.",
    },
    {
      category: "Darshan" as const,
      title: "Darshan and Mandir Conduct",
      desc: "A pilgrimage page should guide devotees on how to move respectfully through darshan, prayer, aarti participation, and sacred temple spaces.",
      details: "Queue discipline, silence zones, prayer etiquette, aarti participation, and darshan sequence awareness.",
    },
    {
      category: "Family Support" as const,
      title: "Family and Elder Support",
      desc: "Families, senior citizens, and children often need specific guidance to make the pilgrimage experience smoother and more comfortable.",
      details: "Seating pause points, assistance counters, child guidance, and senior-friendly movement support.",
    },
    {
      category: "Darshan" as const,
      title: "Festival and Peak-Day Readiness",
      desc: "Pilgrimage changes during festival days, so this page now includes guidance for visiting during larger crowds and major devotional events.",
      details: "Peak-hour darshan planning, festival entry discipline, and public gathering awareness.",
    },
    {
      category: "Before Visit" as const,
      title: "Stay, Food, and Seva Orientation",
      desc: "Pilgrims should understand how their visit can connect with prasadi, seva participation, and practical temple support systems.",
      details: "Meal timing orientation, seva inquiry points, and trust support touchpoints during the visit.",
    },
  ];

  const visibleStages =
    activeStage === "All" ? pilgrimStages : pilgrimStages.filter((item) => item.category === activeStage);

  usePageMeta(
    "Pilgrimage Information",
    "Pilgrimage planning, darshan guidance, family support, and visitor information for devotees coming to Bhagwat Dham and temple routes.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Pilgrimage Information"
        subtitle="Travel guidance, darshan support, family-ready pilgrimage planning, and visitor assistance for devotees coming to Bhagwat Dham"
        backgroundImage="/images/hanuman5.JPG"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Plan Your Visit
          </Link>
          <Link
            to={ROUTES.mandirTeerth.bhagwatDham}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore Bhagwat Dham
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Darshan Guidance", value: "Available", note: "Structured visitor orientation for respectful temple movement" },
              { title: "Family Readiness", value: "Supported", note: "Helpful planning for children, elders, and group visits" },
              { title: "Festival Visits", value: "Managed", note: "Guidance improves planning for high-footfall devotional days" },
              { title: "Pilgrim Flow", value: "Step-Based", note: "Before visit, arrival, darshan, and support information all in one page" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Pilgrimage Information</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            A pilgrimage page should help devotees visit with peace, clarity, and preparation. It should not remain a short placeholder because yatris need real guidance before they travel and after they arrive.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated this page to function as a practical pilgrim guide with planning help, darshan support, family-readiness direction, and useful temple visit structure.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Travel Clarity",
                desc: "Visitors need to know how to prepare before they come so the pilgrimage begins smoothly.",
              },
              {
                title: "Mandir Etiquette Support",
                desc: "Darshan becomes better when devotees understand temple discipline, movement, and respectful conduct.",
              },
              {
                title: "Family-Friendly Guidance",
                desc: "This page now reflects real family needs including elder care, children, and peak day visits.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Pilgrim Support Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter pilgrimage guidance by stage so visitors can quickly find the part of the journey they need help with most.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Before Visit", "Arrival", "Darshan", "Family Support"] as const).map((stage) => {
                const active = stage === activeStage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setActiveStage(stage)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visibleStages.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Pilgrim Guide
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">What This Covers</p>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Visitor Readiness</p>
            <h2 className="mt-2 text-4xl font-black text-white">Practical Visit Information</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Best Visit Preparation",
                  desc: "Arrive with modest clothing, enough time for darshan, and a calm spiritual mindset rather than treating the visit as a rushed stop.",
                },
                {
                  title: "What Families Should Keep in Mind",
                  desc: "Plan the visit keeping children, elders, and waiting time in mind so the experience stays peaceful for everyone.",
                },
                {
                  title: "Temple Conduct",
                  desc: "Respect sacred areas, maintain silence where needed, follow queue discipline, and support an atmosphere of devotion.",
                },
                {
                  title: "Festival Days",
                  desc: "On major utsav days, arrive earlier, expect larger crowds, and follow volunteer guidance for smoother entry and darshan movement.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Pilgrim Flow</p>
            <h3 className="mt-3 text-4xl font-black">Suggested Visit Journey</h3>
            <div className="mt-6 space-y-4">
              {[
                "Plan the visit and connect with the trust if special support is needed.",
                "Arrive calmly and use the reception, entry, and queue systems in order.",
                "Take darshan with attention, reverence, and awareness of temple discipline.",
                "Use available support for family, elders, prasadi orientation, or further seva interest.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Helpful Pilgrimage Content Added</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "A real hero banner and pilgrim-focused page structure",
                "Stage-wise guidance through the new Pilgrim Support Explorer",
                "Practical darshan, conduct, family, and festival-day support information",
                "Clear visit-planning and trust-contact actions",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Need Visit Assistance?</h3>
            <p className="text-xl text-white/95 mb-6">
              This page is now structured to help pilgrims, families, and first-time visitors approach Bhagwat Dham with better clarity, readiness, and devotional comfort.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Visit Planning", amount: "Ready" },
                { label: "Family Support", amount: "Guided" },
                { label: "Darshan Help", amount: "Available" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.contact} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Contact Temple Desk
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Join Visitor Seva
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const MediaVideoGalleryPage = memo(function MediaVideoGalleryPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | VideoGalleryCategory>("All");

  const videoTracks = [
    {
      category: "Katha" as const,
      title: "Bhagwat Katha Recordings",
      desc: "Full-length discourse recordings, themed katha clips, and chapter-based devotional listening paths.",
      format: "Long-form and segmented playback",
    },
    {
      category: "Seva" as const,
      title: "Seva Documentary Clips",
      desc: "Ground-level seva stories showing gau seva, relief response, medicine support, and volunteer effort in action.",
      format: "Impact reels and field recaps",
    },
    {
      category: "Festival" as const,
      title: "Festival Celebration Videos",
      desc: "Curated festival highlights with darshan atmosphere, decor, prasad movement, and family participation moments.",
      format: "Event recap and devotional montage",
    },
    {
      category: "Youth" as const,
      title: "Youth and Sanskar Media",
      desc: "Youth sessions, Pathshala moments, mentor interactions, and disciplined learning snapshots for younger audiences.",
      format: "Youth-focused content stream",
    },
  ];

  const visibleTracks = activeTrack === "All" ? videoTracks : videoTracks.filter((item) => item.category === activeTrack);

  const visibleVideoGallery =
    activeTrack === "All"
      ? MEDIA_VIDEO_GALLERY_ITEMS
      : MEDIA_VIDEO_GALLERY_ITEMS.filter((item) => item.category === activeTrack);

  usePageMeta(
    "Video Gallery",
    "Structured video gallery for katha recordings, seva recaps, festival media, and youth-focused devotional content.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#12354a_0%,#102d40_44%,#0b2230_100%)] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Media Gallery</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Video Gallery</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#d4e1e8]">
            This page is now structured as a real trust video hub with category-based navigation, content grouping, and a clearer viewing path for katha, seva, festivals, and youth media.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Video Streams", value: "4", note: "Katha, seva, festival, and youth media tracks" },
              { title: "Content Style", value: "Mixed", note: "Long-form recordings and short recap formats" },
              { title: "Library Logic", value: "Structured", note: "Category-first browsing instead of random uploads" },
              { title: "Use Case", value: "Archive + Discovery", note: "Built for both repeat viewers and new visitors" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-4">
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d4e1e8]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Advanced Feature</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Content Grid Controller</h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#d4e1e8]">
                Filter video content by purpose so devotees can find the right media quickly, whether they want satsang, recap, inspiration, or event memory.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Katha", "Seva", "Festival", "Youth"] as const).map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleTracks.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.format}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#d4e1e8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Gallery Section</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Video Gallery Grid</h2>
            </div>
            <p className="text-sm text-[#d4e1e8]">Showing {visibleVideoGallery.length} related videos</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleVideoGallery.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0f2c3d]">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b28] via-[#071b28]/15 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white">
                    {item.duration}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/85">{item.note}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-medium text-[#d4e1e8]">Devotional video archive</span>
                  <Link
                    to={`${ROUTES.media.videos}/${item.slug}`}
                    className="rounded-xl bg-[#ff8a00] px-4 py-2 text-sm font-bold text-white"
                  >
                    Watch
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#153446] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Video Workflows Added</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Program-Wise Video Mapping",
                  desc: "Content can now be imagined and organized by program type instead of living in one flat gallery list.",
                },
                {
                  title: "Watch Intent Clarity",
                  desc: "Visitors can choose whether they want full discourse, short highlights, seva recaps, or youth-centered media.",
                },
                {
                  title: "Archive Growth Logic",
                  desc: "This structure supports future expansion without making the page feel cluttered as more videos are added.",
                },
                {
                  title: "Cross-Link Readiness",
                  desc: "The page now has a stronger base for linking events, satsang, seva pages, and future media uploads.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <h2 className="text-3xl font-black md:text-4xl">Creative Gallery Sections</h2>
            <div className="mt-6 space-y-4">
              {[
                "Featured discourse rail for current satsang season",
                "Festival memory reels grouped by annual celebration cycle",
                "Seva impact film section for volunteers and donors",
                "Youth expression corner for Pathshala and mentoring content",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Layer {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export const MediaVideoPlayerPage = memo(function MediaVideoPlayerPage() {
  const { videoId } = useParams();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const currentVideo = MEDIA_VIDEO_GALLERY_ITEMS.find((item) => item.slug === videoId) ?? MEDIA_VIDEO_GALLERY_ITEMS[0];
  const relatedVideos = MEDIA_VIDEO_GALLERY_ITEMS.filter((item) => item.slug !== currentVideo.slug).slice(0, 4);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMuted(false);
    setIsPlaying(true);
  }, [currentVideo.slug]);

  const postPlayerCommand = (func: string, args: (string | number | boolean)[] = []) => {
    const frame = iframeRef.current;
    if (!frame?.contentWindow) return;

    frame.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  };

  const togglePlayback = () => {
    if (!isPlaying) {
      postPlayerCommand("playVideo");
      setIsPlaying(true);
      return;
    }

    postPlayerCommand("pauseVideo");
    setIsPlaying(false);
  };

  const restartVideo = () => {
    postPlayerCommand("seekTo", [0, true]);
    postPlayerCommand("playVideo");
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (isMuted) {
      postPlayerCommand("unMute");
      setIsMuted(false);
      return;
    }

    postPlayerCommand("mute");
    setIsMuted(true);
  };

  usePageMeta(
    `${currentVideo.title} | Video Gallery`,
    "Dedicated video player page with autoplay, pause control, and related devotional video navigation.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Now Playing</p>
              <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">{currentVideo.title}</h1>
              <p className="mt-4 text-lg leading-8 text-[#d4e1e8]">{currentVideo.summary}</p>
            </div>

            <Link
              to={ROUTES.media.videos}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Back to Video Gallery
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#071b28]">
            <iframe
              key={currentVideo.slug}
              ref={iframeRef}
              src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-[260px] w-full bg-black md:h-[560px]"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="rounded-xl bg-[#ff8a00] px-5 py-3 text-sm font-bold text-white"
            >
              {isPlaying ? "Pause Video" : "Play Video"}
            </button>
            <button
              type="button"
              onClick={restartVideo}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              Restart
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <a
              href={currentVideo.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
            >
              Open on YouTube
            </a>
            <span className="inline-flex items-center rounded-xl border border-white/10 bg-[#17384b] px-4 py-3 text-sm font-semibold text-[#d4e1e8]">
              Auto-play enabled on open
            </span>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#153446] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Player Features</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Added Video Experience</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Autoplay on Open",
                  desc: "The selected video begins playing when the dedicated player page opens.",
                },
                {
                  title: "Pause and Resume",
                  desc: "Visitors can pause or resume playback using both native controls and the custom action button.",
                },
                {
                  title: "Restart and Mute",
                  desc: "Playback can be restarted instantly and audio can be muted or restored with one click.",
                },
                {
                  title: "Related Video Rail",
                  desc: "The page keeps visitors inside the gallery experience by suggesting the next devotional videos to open.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Related Videos</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Continue Watching</h2>
            <div className="mt-6 space-y-4">
              {relatedVideos.map((item) => (
                <Link
                  key={item.slug}
                  to={`${ROUTES.media.videos}/${item.slug}`}
                  className="flex gap-4 rounded-2xl bg-white/12 p-4 transition hover:bg-white/18"
                >
                  <img src={item.image} alt={item.title} className="h-20 w-28 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/75">
                      {item.category} · {item.duration}
                    </p>
                    <h3 className="mt-1 truncate text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/85">{item.note}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export const MediaEventHighlightsPage = memo(function MediaEventHighlightsPage() {
  const [activeHighlight, setActiveHighlight] = useState<"All" | "Spiritual" | "Festival" | "Seva" | "Youth">("All");

  const highlightStreams = [
    {
      category: "Spiritual" as const,
      title: "Spiritual Moments",
      desc: "Highlight pages should spotlight the most peaceful and transformative satsang moments, not just event attendance numbers.",
      output: "Katha moments, aarti atmosphere, and devotional audience response.",
    },
    {
      category: "Festival" as const,
      title: "Festival Story Frames",
      desc: "Festival highlights should capture color, darshan, prasad, family participation, and the visual joy of celebration.",
      output: "Decor details, crowd flow snapshots, and celebration atmosphere.",
    },
    {
      category: "Seva" as const,
      title: "Seva Impact Highlights",
      desc: "This section should show how trust work translated into visible community help and practical service outcomes.",
      output: "Volunteer action frames, beneficiary touchpoints, and field support sequences.",
    },
    {
      category: "Youth" as const,
      title: "Youth and Sanskar Highlights",
      desc: "Youth highlights should show confidence, participation, learning, and growth rather than just stage photos.",
      output: "Mentor-led moments, activity snapshots, and disciplined youth engagement.",
    },
  ];

  const visibleHighlights =
    activeHighlight === "All" ? highlightStreams : highlightStreams.filter((item) => item.category === activeHighlight);

  const imageHighlightItems = [
    {
      category: "Spiritual" as const,
      title: "Evening Aarti Reflection",
      image: "/images/spiritual1.png",
      note: "Aarti atmosphere, lamp glow, and focused darshan moments",
    },
    {
      category: "Festival" as const,
      title: "Festival Decor Wall",
      image: "/images/hanuman5.JPG",
      note: "Color, mandap decoration, and devotee arrival energy",
    },
    {
      category: "Seva" as const,
      title: "Volunteer Seva Action",
      image: "/images/hanuman3.JPG",
      note: "Field-level discipline, movement, and service support",
    },
    {
      category: "Youth" as const,
      title: "Youth Participation Frame",
      image: "/images/hanuman2.JPG",
      note: "Mentor-led learning and youth-led contribution moments",
    },
    {
      category: "Festival" as const,
      title: "Prasad Distribution Highlight",
      image: "/images/hanuman4.JPG",
      note: "Hospitality, distribution, and festival flow snapshot",
    },
    {
      category: "Spiritual" as const,
      title: "Katha Darshan Audience",
      image: "/images/kathapravachan.png",
      note: "Absorption, listening, and spiritual atmosphere capture",
    },
  ];

  const visibleImageHighlights =
    activeHighlight === "All"
      ? imageHighlightItems
      : imageHighlightItems.filter((item) => item.category === activeHighlight);

  usePageMeta(
    "Event Highlights",
    "Curated event highlights page with story-focused spotlighting across festivals, seva, satsang, and youth programs.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Media Gallery</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Event Highlights</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#d4e1e8]">
            This page is now structured to present event highlights as stories and impact moments, not just a list of old event names or generic recap text.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Highlight Streams", value: "4", note: "Spiritual, festival, seva, and youth-focused highlights" },
              { title: "Editorial Style", value: "Story-Based", note: "Built to capture emotion, movement, and key takeaways" },
              { title: "Usefulness", value: "High", note: "Useful for recap, donor trust, and public understanding" },
              { title: "Media Direction", value: "Curated", note: "Highlights now follow a deliberate selection logic" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-4">
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d4e1e8]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Advanced Feature</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Highlight Storyboard</h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#d4e1e8]">
                Filter by event mood and purpose so the page behaves like an editorial highlights board rather than a static news dump.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Spiritual", "Festival", "Seva", "Youth"] as const).map((stream) => {
                const active = stream === activeHighlight;
                return (
                  <button
                    key={stream}
                    type="button"
                    onClick={() => setActiveHighlight(stream)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {stream}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Highlight Stream
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#d4e1e8]">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Highlight Output</p>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.output}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Gallery Section</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Event Image Gallery</h2>
            </div>
            <p className="text-sm text-[#d4e1e8]">Showing {visibleImageHighlights.length} highlight frames</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleImageHighlights.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#17384b]">
                <div className="relative h-60 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071b28] via-[#071b28]/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/85">{item.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Sections Worth Adding Here</h2>
            <ul className="mt-6 space-y-3 text-lg text-[#d4e1e8]">
              {[
                "Top highlight reel of the month",
                "Festival spotlight wall by celebration season",
                "Seva before-and-after impact moments",
                "Devotee reaction and atmosphere highlights",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <h2 className="text-3xl font-black md:text-4xl">Creative Highlight Logic</h2>
            <p className="mt-5 text-lg leading-8 text-white/95">
              Event highlights work best when they are organized by feeling, impact, and storytelling value. This page now has a stronger foundation for editorial curation instead of a simple event list.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
});

export const MediaPublicationsPage = memo(function MediaPublicationsPage() {
  const [activePublication, setActivePublication] = useState<"All" | "Reports" | "Brochures" | "Study" | "Festival Notes">("All");

  const publicationGroups = [
    {
      category: "Reports" as const,
      title: "Annual and Impact Reports",
      desc: "Formal trust reporting content for accountability, growth summaries, seva outcomes, and program visibility.",
      use: "Ideal for donors, institutions, and long-form trust understanding.",
    },
    {
      category: "Brochures" as const,
      title: "Trust and Mandir Brochures",
      desc: "Public-facing introduction material for programs, campus vision, values, and organizational identity.",
      use: "Useful for first-time visitors and outreach distribution.",
    },
    {
      category: "Study" as const,
      title: "Study and Spiritual Booklets",
      desc: "Short publications that support satsang learning, event interpretation, and devotional reading paths.",
      use: "Useful for Pathshala, satsang circles, and scriptural orientation.",
    },
    {
      category: "Festival Notes" as const,
      title: "Festival and Event Publications",
      desc: "Event-specific notes, annual utsav guides, devotional schedules, and celebration-linked publication material.",
      use: "Useful during public festivals and seasonal devotional planning.",
    },
  ];

  const visiblePublications =
    activePublication === "All"
      ? publicationGroups
      : publicationGroups.filter((item) => item.category === activePublication);

  const publicationCards = [
    {
      category: "Reports" as const,
      title: "Annual Trust Report 2026",
      format: "PDF Report",
      note: "Progress, seva reach, and annual trust summary",
    },
    {
      category: "Brochures" as const,
      title: "Bhagwat Dham Vision Brochure",
      format: "Campus Brochure",
      note: "Mandir vision, visitor appeal, and support direction",
    },
    {
      category: "Study" as const,
      title: "Bhagwat Study Companion Notes",
      format: "Study Booklet",
      note: "Learning aid for satsang and study circles",
    },
    {
      category: "Festival Notes" as const,
      title: "Festival Calendar and Seva Guide",
      format: "Festival Notes",
      note: "Annual celebration guide and participation structure",
    },
    {
      category: "Brochures" as const,
      title: "Trust Program Introduction Deck",
      format: "Program Booklet",
      note: "Overview of seva, education, and outreach routes",
    },
    {
      category: "Reports" as const,
      title: "Impact Snapshot Publication",
      format: "Summary Report",
      note: "Short-form donor and public-facing trust impact review",
    },
  ];

  const visiblePublicationCards =
    activePublication === "All"
      ? publicationCards
      : publicationCards.filter((item) => item.category === activePublication);

  usePageMeta(
    "Publications",
    "Publication archive for trust reports, brochures, study materials, and event-linked devotional documents.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Media Gallery</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Publications</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#d4e1e8]">
            This page is now shaped as a publication archive strategy page with issue grouping, audience purpose, and publication logic for reports, brochures, and devotional materials.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Publication Types", value: "4", note: "Reports, brochures, study material, and event publications" },
              { title: "Archive Style", value: "Categorized", note: "Documents are grouped by purpose instead of one flat list" },
              { title: "Audience Range", value: "Wide", note: "Useful for donors, devotees, families, and institutions" },
              { title: "Growth Readiness", value: "Expandable", note: "Supports future PDF, booklet, and download integration" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-4">
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d4e1e8]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Advanced Feature</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Publication Archive Navigator</h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#d4e1e8]">
                Filter publication groups by purpose so the archive feels organized and useful for both trust communication and devotional reading.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Reports", "Brochures", "Study", "Festival Notes"] as const).map((group) => {
                const active = group === activePublication;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setActivePublication(group)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visiblePublications.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Publication Group
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#d4e1e8]">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Best Use</p>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Archive Section</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Publication Gallery</h2>
            </div>
            <p className="text-sm text-[#d4e1e8]">Showing {visiblePublicationCards.length} publication cards</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePublicationCards.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-[#17384b] p-6">
                <div className="flex h-40 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#244f67_0%,#17384b_100%)]">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">{item.category}</p>
                    <p className="mt-2 text-lg font-black text-white">{item.format}</p>
                  </div>
                </div>
                <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-[#d4e1e8] leading-7">{item.note}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Archive Ready
                  </span>
                  <button type="button" className="rounded-xl bg-[#ff8a00] px-4 py-2 text-sm font-bold text-white">
                    Open
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Sections Added For Better Publishing Work</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { title: "Issue-Based Grouping", desc: "Allows future annual report and seasonal publication stacking." },
                { title: "Audience Logic", desc: "Separates public intro material from deeper devotional or institutional documents." },
                { title: "Download-Ready Layout", desc: "Prepares the page for future PDFs, flipbooks, and archive links." },
                { title: "Trust Memory Archive", desc: "Helps preserve the long-form documentary identity of the trust." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <h2 className="text-3xl font-black md:text-4xl">Creative Publication Layers</h2>
            <ul className="mt-6 space-y-3 text-lg text-white/95">
              {[
                "Featured publication of the season",
                "Annual report shelf with issue history",
                "Festival booklet and schedule rack",
                "Study notes corner connected to learning pages",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-white" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
});

export const MediaSocialFeedPage = memo(function MediaSocialFeedPage() {
  const [activeChannel, setActiveChannel] = useState<"All" | "Announcements" | "Festival" | "Seva" | "Youth">("All");

  const socialStreams = [
    {
      category: "Announcements" as const,
      title: "Official Trust Announcements",
      desc: "Important updates, route changes, event notices, trust messages, and verified public communication belong here.",
      pulse: "Clear, reliable, and high-priority information flow.",
    },
    {
      category: "Festival" as const,
      title: "Festival Live Pulse",
      desc: "This stream captures real-time feeling around festival prep, darshan, aarti windows, crowd notes, and celebration mood.",
      pulse: "Fast and celebratory update rhythm.",
    },
    {
      category: "Seva" as const,
      title: "Seva Ground Updates",
      desc: "Social feed should show seva in motion through field clips, volunteer work, and visible public service impact.",
      pulse: "Practical, human, and impact-focused posting.",
    },
    {
      category: "Youth" as const,
      title: "Youth and Community Interaction",
      desc: "Youth-focused content should highlight discipline, participation, and meaningful voice inside the trust ecosystem.",
      pulse: "Engaging, positive, and growth-oriented.",
    },
  ];

  const visibleChannels =
    activeChannel === "All" ? socialStreams : socialStreams.filter((item) => item.category === activeChannel);

  const socialFeedbackCards = [
    {
      platform: "Instagram",
      category: "Festival" as const,
      title: "Festival Reel Feedback",
      feedback: "The darshan reels feel vibrant and devotional. Families connect quickly when the celebration atmosphere is shown clearly.",
      accent: "from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    },
    {
      platform: "Facebook",
      category: "Announcements" as const,
      title: "Public Update Response",
      feedback: "Structured announcement posts help us trust event dates, seva notices, and official temple messages without confusion.",
      accent: "from-[#1877f2] to-[#0a4cb5]",
    },
    {
      platform: "WhatsApp",
      category: "Seva" as const,
      title: "Seva Group Feedback",
      feedback: "WhatsApp updates are useful for volunteer coordination, last-minute seva alerts, and fast festival information sharing.",
      accent: "from-[#25d366] to-[#128c7e]",
    },
    {
      platform: "YouTube",
      category: "Spiritual" as const,
      title: "YouTube Viewer Response",
      feedback: "Long-form katha videos and highlight clips help devotees stay connected even when they cannot physically attend programs.",
      accent: "from-[#ff0000] to-[#b31217]",
    },
  ];

  const visibleFeedbackCards =
    activeChannel === "All"
      ? socialFeedbackCards
      : socialFeedbackCards.filter((item) => item.category === activeChannel || (activeChannel === "Announcements" && item.platform === "Facebook"));

  usePageMeta(
    "Social Media Feed",
    "Structured social feed page for official updates, festival pulse, seva stories, and community-facing trust communication.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Media Gallery</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Social Media Feed</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#d4e1e8]">
            This page is now shaped like a communication control area for official updates, festival pulse, seva storytelling, and community-facing trust content.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Feed Streams", value: "4", note: "Announcements, festival, seva, and youth communication tracks" },
              { title: "Tone System", value: "Curated", note: "The feed is organized by purpose rather than raw social embedding" },
              { title: "Community Use", value: "Active", note: "Supports information, connection, and participation" },
              { title: "Future Ready", value: "Expandable", note: "Can grow into embedded handles and live post modules later" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-4">
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d4e1e8]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Advanced Feature</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Channel Pulse Board</h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#d4e1e8]">
                Filter the social feed by communication purpose so the page acts like a media operations surface rather than a static list of handle names.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Announcements", "Festival", "Seva", "Youth"] as const).map((channel) => {
                const active = channel === activeChannel;
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setActiveChannel(channel)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleChannels.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Feed Stream
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#d4e1e8]">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Posting Pulse</p>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.pulse}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Feedback Section</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Instagram, Facebook, WhatsApp and YouTube Feedback</h2>
            </div>
            <p className="text-sm text-[#d4e1e8]">Showing {visibleFeedbackCards.length} platform feedback cards</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {visibleFeedbackCards.map((item) => (
              <article key={item.platform} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#17384b]">
                <div className={`bg-gradient-to-r ${item.accent} px-5 py-4`}>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">{item.platform}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    {item.category}
                  </span>
                  <p className="mt-4 text-base leading-7 text-[#d4e1e8]">{item.feedback}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Creative Feed Sections Added</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { title: "Verified Announcement Rail", desc: "For official notices and trusted public communication." },
                { title: "Festival Live Counter", desc: "For time-sensitive celebration mood and attendance updates." },
                { title: "Seva in Motion", desc: "For volunteer-led real-world service snapshots and field narratives." },
                { title: "Community Voice Layer", desc: "For reactions, testimonials, and audience-facing trust warmth." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <h2 className="text-3xl font-black md:text-4xl">What This Page Should Do</h2>
            <ul className="mt-6 space-y-3 text-lg text-white/95">
              {[
                "Separate official updates from general inspiration posts",
                "Make festival and seva content easier to discover quickly",
                "Create a stronger public-facing communication identity",
                "Prepare for future embedded social handles and live content",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-white" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
});

export const DigitalSatsangPage = memo(function DigitalSatsangPage() {
  const [activeMode, setActiveMode] = useState<"All" | "Live Audio" | "Live Video" | "Booking" | "Platforms">("All");

  const satsangModes = [
    {
      category: "Live Audio" as const,
      title: "Listen to Satsang in Audio Mode",
      desc: "Devotees can stay connected through audio-first satsang access for prayerful listening during travel, work breaks, or home routine.",
      support: "Useful for low-bandwidth listening, recurring shravan, and daily spiritual discipline.",
    },
    {
      category: "Live Video" as const,
      title: "Watch Satsang in Video Mode",
      desc: "Video satsang helps devotees experience discourse, darshan, stage atmosphere, and visual participation from any location.",
      support: "Best for live pravachan, festival broadcast, and family group viewing.",
    },
    {
      category: "Booking" as const,
      title: "Book or Request Online Satsang",
      desc: "This page now supports the idea of booking satsang access, requesting a digital session, or joining scheduled virtual programs.",
      support: "Useful for special satsang events, private digital requests, and group coordination.",
    },
    {
      category: "Platforms" as const,
      title: "Join Through Multiple Platforms",
      desc: "A proper digital satsang page should show where devotees can join, follow, replay, and stay connected through social and streaming channels.",
      support: "Supports reach across YouTube, Facebook, Instagram, WhatsApp, and future streaming channels.",
    },
  ];

  const visibleModes = activeMode === "All" ? satsangModes : satsangModes.filter((item) => item.category === activeMode);

  const platformCards = [
    {
      name: "YouTube Satsang",
      type: "Video Streaming",
      desc: "Full pravachan, replay archive, long-form satsang, and live-stream events.",
      accent: "from-[#ff0000] to-[#b31217]",
      satsangHref: "https://youtube.com/@bhagwatheritage",
      kathaHref: "https://youtube.com/@bhagwatheritage",
      eventsHref: "https://youtube.com/@bhagwatheritage",
    },
    {
      name: "Facebook Satsang Updates",
      type: "Community Broadcast",
      desc: "Announcements, event live notices, highlights, and digital satsang updates.",
      accent: "from-[#1877f2] to-[#0a4cb5]",
      satsangHref: "https://www.facebook.com/share/1AtpQtn1SL/",
      kathaHref: "https://www.facebook.com/share/1AtpQtn1SL/",
      eventsHref: "https://www.facebook.com/share/1AtpQtn1SL/",
    },
    {
      name: "Instagram Devotional Feed",
      type: "Short Video and Reels",
      desc: "Short clips, moments from discourse, devotional visuals, and story-based satsang updates.",
      accent: "from-[#f58529] via-[#dd2a7b] to-[#8134af]",
      satsangHref: "https://www.instagram.com/bhagwat.heritage",
      kathaHref: "https://www.instagram.com/bhagwat.heritage",
      eventsHref: "https://www.instagram.com/bhagwat.heritage",
    },
    {
      name: "WhatsApp Satsang Groups",
      type: "Fast Communication",
      desc: "Quick join links, reminders, seva notices, and same-day satsang coordination.",
      accent: "from-[#25d366] to-[#128c7e]",
      satsangHref: "https://wa.me/918668897445",
      kathaHref: "https://wa.me/918668897445",
      eventsHref: "https://wa.me/918668897445",
    },
    {
      name: "Website Live Join Page",
      type: "Direct Access",
      desc: "A future-ready trust-controlled route for joining and tracking official satsang sessions.",
      accent: "from-[#0f5a98] to-[#0d8f91]",
      satsangHref: ROUTES.media.videos,
      kathaHref: ROUTES.eventsKatha.bhagwatKatha,
      eventsHref: ROUTES.eventsKatha.index,
    },
    {
      name: "Multi-Platform Replay Access",
      type: "Archive Layer",
      desc: "Replay satsang sessions across linked digital surfaces so devotees never miss spiritual continuity.",
      accent: "from-[#8c52ff] to-[#4f46e5]",
      satsangHref: ROUTES.media.videos,
      kathaHref: ROUTES.media.videos,
      eventsHref: ROUTES.media.highlights,
    },
  ];

  usePageMeta(
    "Online Satsang",
    "Digital satsang page for live listening, video satsang, booking requests, and joining across YouTube, Facebook, Instagram, WhatsApp, and more.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#12354a_0%,#102d40_44%,#0b2230_100%)] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">Digital Services</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Online Satsang</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#d4e1e8]">
            This page is now built as a real digital satsang access area where devotees can listen, watch, join, book, and stay connected through multiple online platforms.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Access Modes", value: "4", note: "Audio, video, booking, and platform-based digital satsang access" },
              { title: "Platform Reach", value: "6", note: "YouTube, Facebook, Instagram, WhatsApp, website, and replay access" },
              { title: "Join Style", value: "Live + Replay", note: "Supports both real-time satsang and later devotional listening" },
              { title: "Experience", value: "Multi-Device", note: "Useful for mobile, family viewing, and audio-only connection" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-4">
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d4e1e8]">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Advanced Feature</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Digital Satsang Access Explorer</h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#d4e1e8]">
                Filter the page by access mode so devotees can quickly find the right way to join satsang online.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Live Audio", "Live Video", "Booking", "Platforms"] as const).map((mode) => {
                const active = mode === activeMode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleModes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Digital Satsang
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#d4e1e8]">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#0f2c3d] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Why It Matters</p>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.support}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white md:text-4xl">Listen, Watch, Book, and Join</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Live Audio Satsang",
                  desc: "For devotees who want shravan-focused satsang without needing full video streaming.",
                },
                {
                  title: "Live Video Darshan and Pravachan",
                  desc: "For devotees who want discourse, stage view, mandir mood, and visual spiritual presence.",
                },
                {
                  title: "Book a Digital Satsang Slot",
                  desc: "Supports future booking and request handling for scheduled online satsang sessions.",
                },
                {
                  title: "Replay and Archive Listening",
                  desc: "Makes it easier for devotees in different time slots to revisit satsang later.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-6 md:p-8 text-white">
            <h2 className="text-3xl font-black md:text-4xl">Join Satsang Actions</h2>
            <div className="mt-6 space-y-4">
              {[
                "Join current satsang through video stream links",
                "Listen in audio mode for mobile-friendly access",
                "Request a private or scheduled digital satsang",
                "Follow replay and archived satsang content later",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.contact} className="inline-block rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0f5a98]">
                Book Satsang
              </Link>
              <Link to={ROUTES.media.videos} className="inline-block rounded-xl bg-[#11283a] px-5 py-3 text-sm font-semibold text-white">
                Watch Video Satsang
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-[#153446] p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Platform Section</p>
              <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">Available Platforms for Online Satsang</h2>
            </div>
            <p className="text-sm text-[#d4e1e8]">YouTube, Facebook, Instagram, WhatsApp, and more</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformCards.map((item) => (
              <article key={item.name} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#17384b]">
                <div className={`bg-gradient-to-r ${item.accent} px-5 py-4`}>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">{item.type}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{item.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-base leading-7 text-[#d4e1e8]">{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={item.satsangHref}
                      target={item.satsangHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.satsangHref.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-xl bg-[#ff8a00] px-4 py-2 text-sm font-bold text-white"
                    >
                      Join Satsang
                    </a>
                    <a
                      href={item.kathaHref}
                      target={item.kathaHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.kathaHref.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Join Katha
                    </a>
                    <a
                      href={item.eventsHref}
                      target={item.eventsHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.eventsHref.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Join Events
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

export const DigitalMembershipPage = memo(function DigitalMembershipPage() {
  const membershipPlans = [
    {
      name: "Basic Member",
      price: "Rs 499 / year",
      benefits: [
        "Access to spiritual programs",
        "Festival and satsang notices",
        "Basic membership ID",
      ],
    },
    {
      name: "Premium Member",
      price: "Rs 1,999 / year",
      benefits: [
        "Priority participation in Bhagwat events",
        "Digital certificate and membership card",
        "Volunteer and workshop preference",
      ],
    },
    {
      name: "Lifetime Member",
      price: "Rs 11,000 one-time",
      benefits: [
        "Lifetime spiritual community membership",
        "Priority devotional event access",
        "Recognition, certificate, and long-term portal identity",
      ],
    },
  ];

  const [membershipForm, setMembershipForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    plan: membershipPlans[0].name,
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [idProofName, setIdProofName] = useState("");

  const selectedPlan = membershipPlans.find((plan) => plan.name === membershipForm.plan) ?? membershipPlans[0];
  const memberId =
    membershipForm.fullName.trim().length > 0
      ? `BHSF-${membershipForm.fullName.trim().replace(/\s+/g, "").slice(0, 6).toUpperCase()}-2026`
      : "BHSF-MEMBER-2026";
  const joinDate = "March 8, 2026";

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return previewUrl;
    });
  };

  const handleIdProofChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIdProofName(file?.name ?? "");
  };

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleShareCard = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: "Bhagwat Heritage Membership Card",
        text: `${membershipForm.fullName || "Member"} - ${selectedPlan.name} - ${memberId}`,
      });
    } catch {
      // Ignore cancelled share actions.
    }
  };

  usePageMeta(
    "Membership Portal",
    "Membership portal for community joining, membership plans, registration, digital membership card, payments, activities, and admin management concepts.",
  );

  return (
    <div className="min-h-screen bg-[#0B2230] pb-16">
      <HeroSection
        title="Membership Portal"
        subtitle="Join the Bhagwat Heritage community and stay connected to spiritual programs, seva, events, and digital member benefits"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#member-registration" className="inline-flex items-center bg-[#F59E0B] hover:bg-[#dd8f0a] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Join Now
          </a>
          <Link
            to={ROUTES.login}
            className="inline-flex items-center bg-white text-[#0B2230] hover:bg-[#eef4f7] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Membership Plans", value: "3", note: "Basic, Premium, and Lifetime membership options" },
              { title: "Member Benefits", value: "Priority + Access", note: "Programs, events, seva opportunities, and recognition" },
              { title: "Digital Access", value: "Portal Ready", note: "Profile, card, certificate, and participation tracking" },
              { title: "Payment Methods", value: "4", note: "UPI, credit card, debit card, and net banking" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#12394A] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                <p className="text-xs uppercase tracking-wide text-[#F59E0B]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#d9e6ec]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Membership Benefits</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Why Become a Member</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {[
              { icon: "SP", title: "Spiritual Programs", desc: "Regular access to satsang, discourse, and devotional learning paths." },
              { icon: "ME", title: "Member-Only Events", desc: "Special member access to selected spiritual and community gatherings." },
              { icon: "VO", title: "Volunteer Opportunities", desc: "Priority connection to seva, event support, and service roles." },
              { icon: "DC", title: "Digital Certificates", desc: "Receive member documentation and recognition in digital format." },
              { icon: "PP", title: "Priority Participation", desc: "Get preference in Bhagwat events, workshops, and major trust activities." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F59E0B]/15 text-sm font-black text-[#F59E0B]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-[#d9e6ec]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Membership Plans</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Choose Your Plan</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {membershipPlans.map((plan) => (
              <div key={plan.name} className="rounded-[28px] border border-white/10 bg-[#0f3140] p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#F59E0B]">{plan.name}</p>
                <p className="mt-3 text-3xl font-black text-white">{plan.price}</p>
                <ul className="mt-5 space-y-3 text-[#d9e6ec]">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setMembershipForm((current) => ({ ...current, plan: plan.name }))}
                  className="mt-6 inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white hover:bg-[#dd8f0a]"
                >
                  Join {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="member-registration" className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Member Registration</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Join the Community</h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={membershipForm.fullName}
                onChange={(event) => setMembershipForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Full Name"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B]"
              />
              <input
                value={membershipForm.email}
                onChange={(event) => setMembershipForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B]"
              />
              <input
                value={membershipForm.phone}
                onChange={(event) => setMembershipForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone Number"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B]"
              />
              <select
                value={membershipForm.plan}
                onChange={(event) => setMembershipForm((current) => ({ ...current, plan: event.target.value }))}
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none focus:border-[#F59E0B]"
              >
                {membershipPlans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <input
                value={membershipForm.address}
                onChange={(event) => setMembershipForm((current) => ({ ...current, address: event.target.value }))}
                placeholder="Address"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B] md:col-span-2"
              />
              <input
                value={membershipForm.city}
                onChange={(event) => setMembershipForm((current) => ({ ...current, city: event.target.value }))}
                placeholder="City"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B]"
              />
              <input
                value={membershipForm.state}
                onChange={(event) => setMembershipForm((current) => ({ ...current, state: event.target.value }))}
                placeholder="State"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B]"
              />
              <input
                value={membershipForm.country}
                onChange={(event) => setMembershipForm((current) => ({ ...current, country: event.target.value }))}
                placeholder="Country"
                className="rounded-2xl border border-white/10 bg-[#0f3140] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[#F59E0B] md:col-span-2"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-dashed border-[#F59E0B]/50 bg-[#0f3140] px-4 py-5 text-sm font-semibold text-white">
                Profile Photo Upload
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
              <label className="rounded-2xl border border-dashed border-[#F59E0B]/50 bg-[#0f3140] px-4 py-5 text-sm font-semibold text-white">
                ID Proof Upload
                <input type="file" onChange={handleIdProofChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-bold text-white hover:bg-[#dd8f0a]">
                Submit Registration
              </button>
              <button type="button" className="rounded-xl border border-white/10 bg-[#0f3140] px-6 py-3 text-sm font-semibold text-white">
                Save Form Draft
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Digital Membership Card</p>
              <div className="mt-5 rounded-[28px] border border-white/10 bg-[#0f3140] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#12394A]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Member" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-[#F59E0B]">PHOTO</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#F59E0B]">Bhagwat Heritage Member ID</p>
                    <h3 className="mt-2 text-2xl font-black text-white">{membershipForm.fullName || "Member Name"}</h3>
                    <p className="mt-1 text-sm text-[#d9e6ec]">{memberId}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#12394A] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#F59E0B]">Membership Type</p>
                    <p className="mt-1 font-semibold text-white">{selectedPlan.name}</p>
                  </div>
                  <div className="rounded-2xl bg-[#12394A] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#F59E0B]">Join Date</p>
                    <p className="mt-1 font-semibold text-white">{joinDate}</p>
                  </div>
                  <div className="rounded-2xl bg-[#12394A] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#F59E0B]">Status</p>
                    <p className="mt-1 font-semibold text-white">Pending Approval</p>
                  </div>
                  <div className="rounded-2xl bg-[#12394A] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#F59E0B]">ID Proof</p>
                    <p className="mt-1 font-semibold text-white">{idProofName || "Not uploaded"}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => window.print()} className="rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white">
                    Download Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareCard();
                    }}
                    className="rounded-xl border border-white/10 bg-[#12394A] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Share Card
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Payment Integration</p>
              <h3 className="mt-2 text-3xl font-black text-white">Online Payment Methods</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => (
                  <div key={method} className="rounded-2xl border border-white/10 bg-[#0f3140] p-4 text-center text-white font-semibold">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Member Dashboard</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Dashboard Preview After Login</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "View profile and edit personal details",
                "Download membership certificate",
                "See membership ID and status",
                "Track event participation and activity",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5 text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Member Activity</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Upcoming Activities</h2>
            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                { title: "Bhagwat Event Participation", desc: "Priority member invitations for key satsang and festival gatherings." },
                { title: "Volunteer Programs", desc: "Join seva teams, digital support, and trust-led service activities." },
                { title: "Spiritual Workshops", desc: "Take part in guided learning, chanting, and dharmic growth sessions." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d9e6ec] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#12394A] p-6 md:p-8 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Admin Features Concept</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Admin Management Layer</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Approve or Reject Memberships", desc: "Admin review flow for incoming member registrations." },
              { title: "Manage Member Database", desc: "Searchable records for profiles, plans, and statuses." },
              { title: "Export Member List", desc: "Admin-ready export for reporting and communication workflows." },
              { title: "Send Announcements", desc: "Push notices to members for events, updates, and digital programs." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f3140] p-5">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-[#d9e6ec] leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const InvolvedPartnerPage = memo(function InvolvedPartnerPage() {
  const partnershipCategories = [
    {
      icon: "CP",
      title: "Corporate Partnerships",
      desc: "Companies supporting social impact, spiritual initiatives, employee volunteering, and CSR-led seva alignment.",
      detail: "Best for CSR projects, brand-backed seva, and long-term trust collaboration.",
    },
    {
      icon: "NG",
      title: "NGO Collaborations",
      desc: "Work jointly with non-profit organizations for social welfare, relief, education, and structured community support.",
      detail: "Best for aligned charity missions, field programs, and collaborative outreach delivery.",
    },
    {
      icon: "EV",
      title: "Event Partnerships",
      desc: "Partner for Bhagwat Katha, festivals, spiritual gatherings, youth programs, and large devotional events.",
      detail: "Best for co-hosting, logistics support, outreach, and event execution partnerships.",
    },
    {
      icon: "ED",
      title: "Educational Partnerships",
      desc: "Collaborate with schools, universities, and research institutions for values education and cultural learning.",
      detail: "Best for Pathshala, youth workshops, study circles, and knowledge initiatives.",
    },
    {
      icon: "CM",
      title: "Community Partnerships",
      desc: "Local groups, resident associations, and service communities helping scale spiritual and social development work.",
      detail: "Best for local mobilization, volunteer networks, and neighborhood seva participation.",
    },
  ];

  const impactStats = [
    { label: "Total Events Organized", value: "250+", note: "Spiritual, educational, and community gatherings supported annually." },
    { label: "Volunteers Involved", value: "1,500+", note: "Active sevaks and field contributors linked through trust initiatives." },
    { label: "Communities Supported", value: "80+", note: "Cities, local groups, and outreach communities touched through programs." },
    { label: "Social Initiatives Completed", value: "120+", note: "Seva, education, health, and support campaigns delivered with partners." },
  ];

  const partnerShowcase = [
    "Heritage CSR Circle",
    "Seva Community Forum",
    "Youth Dharma Network",
    "Satsang Support Alliance",
    "Bhagwat Education Collective",
    "Community Relief Partners",
  ];

  const testimonials = [
    {
      name: "CSR Partnership Desk",
      org: "Heritage Impact Group",
      quote:
        "The trust offered a clear structure, measurable seva outcomes, and a spiritually grounded partnership process that made collaboration practical and meaningful.",
    },
    {
      name: "Program Coordinator",
      org: "Community Welfare Collective",
      quote:
        "Our joint outreach felt disciplined from planning to execution. The trust combines devotional purpose with strong program ownership on the ground.",
    },
    {
      name: "Academic Outreach Lead",
      org: "Values Education Network",
      quote:
        "The educational collaboration was thoughtful and well organized, especially for youth values sessions, community learning, and cultural engagement.",
    },
  ];

  const faqs = [
    {
      question: "Who can apply to partner with the trust?",
      answer: "Companies, NGOs, community groups, educational institutions, event teams, and mission-aligned organizations can submit a partnership request.",
    },
    {
      question: "Can partnerships be project-based instead of long term?",
      answer: "Yes. The trust can structure one-event, campaign-based, seasonal, or long-term partnerships depending on the need and fit.",
    },
    {
      question: "What documents are helpful in the application?",
      answer: "A basic organization profile, contact details, collaboration proposal, and a short summary of your intended contribution are enough to begin review.",
    },
    {
      question: "How does the approval process work?",
      answer: "Requests are reviewed by the trust team, followed by discussion, planning, and formal alignment before implementation begins.",
    },
  ];

  const [partnerForm, setPartnerForm] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "Corporate",
    partnershipCategory: partnershipCategories[0].title,
    message: "",
  });
  const [profileFileName, setProfileFileName] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handlePartnerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b2230] pb-16">
      <HeroSection
        title="Partner With Us"
        subtitle="Collaborate with Bhagwat Heritage Service Foundation Trust to expand spiritual education, seva, charity, and community upliftment through purposeful partnership"
        backgroundImage="/images/heritage1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#partnership-form"
            className="inline-flex items-center rounded-lg bg-[#d97a18] px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#c86d14]"
          >
            Become a Partner
          </a>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#8a4108] transition-all hover:-translate-y-0.5 hover:bg-[#fff2dd]"
          >
            Contact Us
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Collaboration Tracks", value: "5", note: "Corporate, NGO, event, educational, and community partnership models." },
              { title: "Partnership Style", value: "Flexible", note: "Project-based, event-based, recurring, or long-term collaboration paths." },
              { title: "Mission Areas", value: "Spiritual + Social", note: "Education, seva, charity, events, and community development support." },
              { title: "Response Flow", value: "Structured", note: "Review, planning, approval, and implementation through the trust team." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.title}</p>
                <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm text-[#c7d7e1]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Introduction</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Partnerships Expand the Trust's Real Impact</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-lg leading-8 text-[#d7e3ea]">
              <p>
                Bhagwat Heritage Service Foundation Trust is focused on spiritual education, devotional gatherings,
                value-based learning, seva programs, charitable outreach, and community development rooted in dharma.
              </p>
              <p>
                Partnerships matter because trust impact grows faster when institutions, communities, and service-minded
                organizations work together with clarity, shared intent, and disciplined execution.
              </p>
              <p>
                This page is designed to turn interest into action: identify the right partnership model, understand the
                benefit for both sides, submit a proposal, and build collaboration around meaningful social and spiritual work.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { title: "Spiritual Education", desc: "Pathshala, discourse, study support, youth values, and cultural learning programs." },
                { title: "Charity and Seva", desc: "Gau seva, relief work, medicine support, food seva, and community care initiatives." },
                { title: "Community Service", desc: "Volunteer mobilization, event support, social campaigns, and local service action." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384a] p-5 transition-transform duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[#d4e1e8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#103246_0%,#0d2c3d_100%)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Types of Partnerships</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Choose the Right Collaboration Path</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partnershipCategories.map((item) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-[#17384a] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.26)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb06a]/15 text-sm font-black text-[#ffb06a]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#d4e1e8]">{item.desc}</p>
                <p className="mt-3 text-sm leading-6 text-[#a7c0ce]">{item.detail}</p>
                <a
                  href="#partnership-process"
                  className="mt-5 inline-flex rounded-xl border border-[#ffb06a]/40 bg-[#ffb06a]/10 px-4 py-2 text-sm font-bold text-[#ffb06a] transition-colors hover:bg-[#ffb06a]/20"
                >
                  Learn More
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Partnership Benefits</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Why Organizations Partner</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "Brand visibility across website, programs, and event-level acknowledgements.",
                "Recognition inside trust-led spiritual and social initiatives.",
                "Direct contribution to social impact and spiritual outreach.",
                "Networking with spiritual guides, trustees, and community leaders.",
                "Participation in large devotional gatherings and organized service campaigns.",
              ].map((benefit) => (
                <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-[#17384a] p-4">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <p className="leading-7 text-[#d7e3ea]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#13384d_0%,#102f40_100%)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Our Impact</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Collaboration at Scale</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {impactStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-[#17384a] p-5 transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-xs uppercase tracking-wide text-[#ffb06a]">{item.label}</p>
                  <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#d4e1e8]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Partner Showcase</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Existing Supporters and Collaboration Circles</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {partnerShowcase.map((item) => (
              <div
                key={item}
                className="flex min-h-[132px] items-center justify-center rounded-[28px] border border-white/10 bg-[#17384a] p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffb06a]/15 text-sm font-black text-[#ffb06a]">
                    {item
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <p className="mt-3 text-sm font-bold leading-6 text-white">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partnership-form" className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Partnership Application Form</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Submit a Partnership Request</h2>

            <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handlePartnerSubmit}>
              <input
                value={partnerForm.organizationName}
                onChange={(event) => setPartnerForm((current) => ({ ...current, organizationName: event.target.value }))}
                placeholder="Organization Name"
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none placeholder:text-[#93afbe] focus:border-[#ffb06a]"
              />
              <input
                value={partnerForm.contactName}
                onChange={(event) => setPartnerForm((current) => ({ ...current, contactName: event.target.value }))}
                placeholder="Contact Person Name"
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none placeholder:text-[#93afbe] focus:border-[#ffb06a]"
              />
              <input
                value={partnerForm.email}
                onChange={(event) => setPartnerForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email Address"
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none placeholder:text-[#93afbe] focus:border-[#ffb06a]"
              />
              <input
                value={partnerForm.phone}
                onChange={(event) => setPartnerForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone Number"
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none placeholder:text-[#93afbe] focus:border-[#ffb06a]"
              />
              <select
                value={partnerForm.organizationType}
                onChange={(event) => setPartnerForm((current) => ({ ...current, organizationType: event.target.value }))}
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none focus:border-[#ffb06a]"
              >
                {["Corporate", "NGO", "Educational Institution", "Community Group", "Event Team"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={partnerForm.partnershipCategory}
                onChange={(event) => setPartnerForm((current) => ({ ...current, partnershipCategory: event.target.value }))}
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none focus:border-[#ffb06a]"
              >
                {partnershipCategories.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <textarea
                value={partnerForm.message}
                onChange={(event) => setPartnerForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Message / Proposal"
                rows={5}
                className="rounded-2xl border border-white/10 bg-[#17384a] px-4 py-3 text-white outline-none placeholder:text-[#93afbe] focus:border-[#ffb06a] md:col-span-2"
              />
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-[#ffb06a]/45 bg-[#17384a] px-4 py-3 text-white md:col-span-2">
                <span>{profileFileName || "Upload Organization Profile"}</span>
                <span className="rounded-lg bg-[#ffb06a]/15 px-3 py-1 text-sm font-bold text-[#ffb06a]">Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => setProfileFileName(event.target.files?.[0]?.name ?? "")}
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-[#ff8a00] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ea7e00] md:col-span-2"
              >
                Submit Partnership Request
              </button>
            </form>

            {requestSubmitted ? (
              <p className="mt-4 rounded-2xl border border-[#ffb06a]/35 bg-[#17384a] px-4 py-3 text-sm font-medium text-white">
                Partnership request drafted successfully. The trust team can now review the proposal and continue the discussion process.
              </p>
            ) : null}
          </div>

          <div className="space-y-6">
            <div id="partnership-process" className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#13384d_0%,#102f40_100%)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Partnership Process</p>
              <h2 className="mt-2 text-3xl font-black text-white">How Collaboration Moves Forward</h2>
              <div className="mt-8 space-y-4">
                {[
                  "Submit partnership request",
                  "Review by trust committee",
                  "Discussion and planning",
                  "Formal partnership agreement",
                  "Collaboration implementation",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-[#17384a] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff8a00] text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-black text-white">{step}</p>
                      <p className="mt-1 text-sm leading-6 text-[#d4e1e8]">
                        Structured review keeps the collaboration aligned, practical, and mission-consistent.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Contact Section</p>
              <h2 className="mt-2 text-3xl font-black text-white">Talk to the Partnership Desk</h2>
              <div className="mt-6 space-y-4 text-[#d7e3ea]">
                <p>
                  <span className="font-black text-white">Email:</span> info@bhagwatheritage.org
                </p>
                <p>
                  <span className="font-black text-white">Phone:</span> +91 98765 43210
                </p>
                <p>
                  <span className="font-black text-white">Office Address:</span> Bhagwat Heritage Service Foundation Trust Office, Swaminarayan Bhagwat Dham Campus
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/bhagwat.heritage"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#ffb06a]/12 px-4 py-2 font-semibold text-white transition-colors hover:bg-[#ffb06a]/20"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/1AtpQtn1SL/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#ffb06a]/12 px-4 py-2 font-semibold text-white transition-colors hover:bg-[#ffb06a]/20"
                >
                  Facebook
                </a>
                <a
                  href="https://youtube.com/@bhagwatheritage"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#ffb06a]/12 px-4 py-2 font-semibold text-white transition-colors hover:bg-[#ffb06a]/20"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/918668897445"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#ffb06a]/12 px-4 py-2 font-semibold text-white transition-colors hover:bg-[#ffb06a]/20"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#103246] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Testimonials</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">What Existing Partners Say</h2>
            <div className="mt-8 space-y-4">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384a] p-5">
                  <p className="text-lg leading-8 text-[#d7e3ea]">"{item.quote}"</p>
                  <p className="mt-4 text-lg font-black text-white">{item.name}</p>
                  <p className="text-sm text-[#ffb06a]">{item.org}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#13384d_0%,#102f40_100%)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">FAQ</p>
            <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">Common Partnership Questions</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-[#17384a] p-5">
                  <h3 className="text-xl font-black text-white">{item.question}</h3>
                  <p className="mt-2 leading-7 text-[#d7e3ea]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const InvolvedSponsorPage = memo(function InvolvedSponsorPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | "Spiritual" | "Seva" | "Education" | "Mandir">("All");

  const sponsorPrograms = [
    {
      category: "Spiritual" as const,
      title: "Bhagwat Katha and Festival Sponsorship",
      desc: "Support major satsang programs, festival celebrations, stage arrangements, prasad, hospitality, and devotee experience.",
      impact: "Visible devotional impact during high-footfall events and temple celebrations.",
      support: "Festival seva, katha logistics, decor, sound, seating, and spiritual hospitality.",
    },
    {
      category: "Seva" as const,
      title: "Gau Seva Sponsorship",
      desc: "Sponsor grass, fodder, medical care, shelter support, and day-to-day gaushala seva continuity.",
      impact: "Provides disciplined care support for cows through recurring and need-based seva.",
      support: "Fodder seva, emergency care, routine nourishment, and gaushala operations.",
    },
    {
      category: "Seva" as const,
      title: "Disaster Relief Sponsorship",
      desc: "Fund emergency kits, food distribution, blankets, temporary essentials, and field response support.",
      impact: "Helps the trust respond quickly when families need urgent practical support.",
      support: "Relief kits, transport, volunteer deployment, and rapid-response field coordination.",
    },
    {
      category: "Education" as const,
      title: "Scholarship and Student Sponsorship",
      desc: "Support students through scholarship assistance, books, learning tools, and values-based educational guidance.",
      impact: "Creates measurable long-term upliftment through education and character support.",
      support: "Fees, study material, mentoring, and structured student support routes.",
    },
    {
      category: "Education" as const,
      title: "Pathshala and Children Learning Sponsorship",
      desc: "Enable bal sanskar programs, digital Pathshala support, child learning modules, and family spiritual education initiatives.",
      impact: "Builds the next generation through dharmic learning and disciplined spiritual formation.",
      support: "Class materials, mentor support, event days, and children learning resources.",
    },
    {
      category: "Mandir" as const,
      title: "Mandir and Installation Sponsorship",
      desc: "Support temple construction-linked features, sacred installations, devotional infrastructure, and visitor experience planning.",
      impact: "Strengthens long-term mandir vision and the spiritual environment for devotees.",
      support: "Murti support, installations, visitor pathways, decor, lighting, and sacred space readiness.",
    },
    {
      category: "Seva" as const,
      title: "Medicine Distribution Sponsorship",
      desc: "Fund medicine kits, recurring patient support, health camps, and essential care outreach for vulnerable families.",
      impact: "Converts sponsor contribution into direct healthcare stability for beneficiaries.",
      support: "Medicine supply, camp support, distribution logistics, and chronic care assistance.",
    },
    {
      category: "Spiritual" as const,
      title: "Annakut and Prasad Sponsorship",
      desc: "Sponsor offering arrangements, prasad preparation, festival hospitality, and temple celebration support.",
      impact: "Creates direct devotional participation through large-scale offering and guest care.",
      support: "Bhog, prasad seva, utensils, serving support, and festival hospitality infrastructure.",
    },
  ];

  const visiblePrograms =
    activeTrack === "All" ? sponsorPrograms : sponsorPrograms.filter((item) => item.category === activeTrack);

  usePageMeta(
    "Sponsor Programs",
    "Sponsor trust programs across seva, education, mandir development, and spiritual events with structured participation options.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Sponsor Programs"
        subtitle="Sponsor meaningful seva, education, mandir development, and spiritual initiatives with structured contribution paths"
        backgroundImage="/images/kathapravachan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Sponsor Now
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Talk to Sponsor Team
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Sponsor Tracks", value: "8", note: "Program-focused sponsorship options across seva, learning, and mandir work" },
              { title: "Impact Areas", value: "4", note: "Spiritual, Seva, Education, and Mandir development support" },
              { title: "Support Model", value: "Flexible", note: "Sponsor one event, one program, one season, or recurring monthly seva" },
              { title: "Recognition Flow", value: "Transparent", note: "Sponsors support clear causes with visible trust purpose and allocation direction" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-[#143446]/95 p-4 shadow-lg backdrop-blur-sm">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Sponsor Programs</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            A sponsorship page should not feel generic. It should clearly show what can be sponsored, why it matters,
            and how a sponsor can support the trust with purpose rather than making an unfocused donation.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            I updated this page around practical trust programs so sponsors can connect directly with festivals, gau seva,
            student support, medicine distribution, Pathshala, mandir work, and recurring seva impact.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {[
              {
                title: "Cause-Focused Sponsorship",
                desc: "Sponsors should be able to choose a real program area instead of donating without context.",
              },
              {
                title: "Visible Seva Direction",
                desc: "Each sponsorship route should explain what part of trust work it strengthens in practice.",
              },
              {
                title: "Flexible Contribution Entry",
                desc: "Some sponsors want one-time support while others want monthly, seasonal, or annual program participation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">New Feature</p>
              <h2 className="mt-2 text-5xl font-black text-white">Sponsor Program Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#d4e1e8] text-lg leading-7">
                Filter sponsorship opportunities by program category so visitors can quickly find the trust work they want
                to support most directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Spiritual", "Seva", "Education", "Mandir"] as const).map((track) => {
                const active = track === activeTrack;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setActiveTrack(track)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#ffb06a] text-[#17384b]"
                        : "border border-white/10 bg-[#17384b] text-[#d4e1e8] hover:border-[#ffb06a]/40"
                    }`}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {visiblePrograms.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#ffb06a] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#17384b]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#d4e1e8]">
                    Sponsor Route
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black mt-4">{item.title}</h3>
                <p className="text-[#d4e1e8] mt-3 text-lg leading-7">{item.desc}</p>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl bg-[#0f2c3d] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">Impact</p>
                    <p className="mt-2 text-[#d4e1e8] leading-7">{item.impact}</p>
                  </div>
                  <div className="rounded-2xl bg-[#0f2c3d] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#ffb06a]">What Sponsorship Supports</p>
                    <p className="mt-2 text-[#d4e1e8] leading-7">{item.support}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={ROUTES.donate} className="inline-flex items-center rounded-xl bg-[#ff8a00] px-5 py-3 font-bold text-white transition hover:bg-[#e97b00]">
                    Sponsor This Program
                  </Link>
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
                  >
                    Request Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#09202d] to-[#081925] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#153446] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb06a]">Sponsor Seva Ideas</p>
            <h2 className="mt-2 text-4xl font-black text-white">New Seva Support Added On This Page</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Monthly Gau Grass Seva",
                  desc: "A recurring sponsor option for daily grass and nourishment support in the gaushala.",
                },
                {
                  title: "Festival Decoration and Puja Seva",
                  desc: "Support mandap decor, flowers, lighting, and puja-related festival arrangements.",
                },
                {
                  title: "Child Sanskar Kit Sponsorship",
                  desc: "Support books, activity material, and spiritual learning kits for children and Pathshala batches.",
                },
                {
                  title: "Medical Camp Support",
                  desc: "Fund health camps, medicine distribution days, and practical wellness seva for families in need.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-5">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-[#d4e1e8] leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#0f5a98] to-[#0d8f91] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Sponsor Journey</p>
            <h3 className="mt-3 text-4xl font-black">How Sponsorship Can Work</h3>
            <div className="mt-6 space-y-4">
              {[
                "Choose the trust program or seva area you want to support.",
                "Connect with the trust for scope, amount, and sponsorship type if needed.",
                "Complete contribution through the donation route or guided sponsor coordination.",
                "Stay connected with the purpose and continuity of the supported trust work.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-sm font-bold uppercase tracking-wide text-white/75">Step {index + 1}</p>
                  <p className="mt-1 text-lg text-white/95">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8">
            <h3 className="text-4xl font-black text-white mb-5">Why This Page Is Better Now</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {[
                "Sponsors can now choose real trust programs instead of reading generic sponsorship text.",
                "The page includes both seva and spiritual sponsorship routes for broader participation.",
                "It explains what each sponsorship actually supports in practice.",
                "It gives a direct path to sponsor now or request details from the trust team.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Start Sponsoring Trust Work</h3>
            <p className="text-xl text-white/95 mb-6">
              This page is now structured for sponsors who want clear, meaningful, and accountable participation in trust
              seva, education, mandir development, and spiritual programs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "One-Time Support", amount: "Available" },
                { label: "Monthly Seva", amount: "Possible" },
                { label: "Festival Sponsor", amount: "Ready" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl">
                Sponsor Now
              </Link>
              <Link to={ROUTES.contact} className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl">
                Contact Sponsor Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export const NotFoundPage = memo(function NotFoundPage() {
  usePageMeta("Page Not Found");
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full rounded-3xl border border-[#dce8f5] bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl md:text-4xl font-black text-[#123753]">Page Not Found</h1>
        <p className="text-[#4f6272] mt-3">The requested page does not exist in the current trust website architecture.</p>
        <Link to={ROUTES.home} className="btn-primary mt-5 inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
});
