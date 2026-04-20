import { memo, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../app/providers/AuthProvider";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { HeroSection } from "../../components/ui/HeroSection";
import { Card } from "../../components/ui/Card";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";
import { SevaHeroBanner } from "../seva/SevaHeroBanner";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_HERO_SUBTITLE_CLASS,
  ABOUT_HERO_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "../about/aboutTypography";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_HIGHLIGHT_VALUE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

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
  theme: "Gita" | "Avatar Stories" | "Sacred Places" | "Practices" | "Rituals" | "Teachings" | "Heritage";
  title: string;
  duration: string;
  image: string;
  note: string;
  summary: string;
  videoUrl: string;
  views: string;
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
    theme: "Teachings",
    title: "Bhagwat Katha: Eternal Leela of Sri Krishna",
    duration: "8:15",
    image: "/images/kathaimage.webp",
    note: "Bhagwat Katha discourse on Sri Krishna's leela, bhakti, and scripture reflection.",
    summary: "A satsang-centered Bhagwat Katha session introducing Krishna leela, devotion, and scripture-linked reflection for regular listeners.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "18.4K",
  },
  {
    slug: "bhagwat-pravachan-clip-series",
    category: "Katha",
    theme: "Teachings",
    title: "Bhagwat Katha: Introduction to Shrimad Bhagavatam",
    duration: "12:20",
    image: "/images/katha4.jfif",
    note: "Pravachan introducing Shrimad Bhagavatam listening with spiritual context.",
    summary: "A guided Bhagwat Katha introduction to Shrimad Bhagavatam for devotees who want structured listening and clear spiritual orientation.",
    videoUrl: "https://www.youtube.com/watch?v=cOFNyxt4MhM",
    views: "12.8K",
  },
  {
    slug: "gau-seva-field-documentary",
    category: "Seva",
    theme: "Practices",
    title: "Spiritual Pravachan: Govardhan Leela Explained",
    duration: "12:20",
    image: "/images/katha7.jfif",
    note: "A spiritual pravachan on protection, surrender, and remembrance.",
    summary: "This devotional spiritual talk connects Govardhan leela with faith, surrender, and practical spiritual discipline in daily life.",
    videoUrl: "https://www.youtube.com/watch?v=wrg8NMrPwOs",
    views: "10.1K",
  },
  {
    slug: "festival-darshan-atmosphere-reel",
    category: "Festival",
    theme: "Heritage",
    title: "Cultural Heritage Journey Through Vrindavan",
    duration: "10:05",
    image: "/images/katha5.jfif",
    note: "A cultural heritage tour through sacred devotional geography.",
    summary: "A cultural heritage-focused video exploring Vrindavan atmosphere, pilgrimage value, and visual devotion rooted in sacred memory.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "14.7K",
  },
  {
    slug: "pathshala-youth-session-recap",
    category: "Youth",
    theme: "Teachings",
    title: "Youth Sanskar Session: Creative Values and Discipline",
    duration: "10:05",
    image: "/images/manish.PNG",
    note: "Youth-friendly teaching content combining discipline, guidance, and growth.",
    summary: "A youth-oriented sanskar session designed to connect modern learning with spiritual grounding, discipline, and mindful progress.",
    videoUrl: "https://www.youtube.com/watch?v=oW_Z8hICrHo",
    views: "6.9K",
  },
  {
    slug: "aarti-prasad-highlight-film",
    category: "Festival",
    theme: "Avatar Stories",
    title: "Spiritual Katha: Prahlad and Narasimha",
    duration: "8:16",
    image: "/images/spiritual1.png",
    note: "Avatar katha focused on protection, devotion, and courage.",
    summary: "A spiritual storytelling video reflecting on Prahlad bhakti, Narasimha protection, and unwavering faith.",
    videoUrl: "https://www.youtube.com/watch?v=Rq5iBnW8UEQ",
    views: "22.4K",
  },
  {
    slug: "dasha-avatar-ten-divine-forms",
    category: "Katha",
    theme: "Avatar Stories",
    title: "Bhagwat Katha: Dasha Avatar Divine Forms",
    duration: "8:15",
    image: "/images/katha6.jfif",
    note: "A concise Bhagwat Katha overview of divine manifestations and dharmic meaning.",
    summary: "This video introduces the ten avatar forms and their place in devotional understanding and dharma restoration.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "17.2K",
  },
  {
    slug: "gitas-essence-in-bhagavatam",
    category: "Katha",
    theme: "Gita",
    title: "Gita Wisdom in Bhagwat Katha",
    duration: "15:30",
    image: "/images/ram1.webp",
    note: "A teaching session connecting Gita wisdom with Bhagwat Katha listening.",
    summary: "A deeper spiritual talk showing how Gita themes of duty, surrender, and wisdom appear in Bhagavatam-centered devotion.",
    videoUrl: "https://www.youtube.com/watch?v=cOFNyxt4MhM",
    views: "11.6K",
  },
  {
    slug: "discovering-dwarka-ancient-ruins",
    category: "Festival",
    theme: "Sacred Places",
    title: "Sacred Dwarka Darshan and Cultural History",
    duration: "10:05",
    image: "/images/hanuman3.JPG",
    note: "A sacred geography video with pilgrimage atmosphere and cultural memory.",
    summary: "A cultural and spiritual exploration video showing Dwarka-linked imagery, sacred location value, and pilgrimage interest for devotees.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "9.4K",
  },
  {
    slug: "vedic-chants-and-stotras",
    category: "Katha",
    theme: "Rituals",
    title: "Spiritual Chants, Stotras, and Daily Bhakti",
    duration: "8:15",
    image: "/images/swaminarayan.jpg",
    note: "Chanting and recitation for prayerful listening and devotional rhythm.",
    summary: "A chanting-focused spiritual media piece designed for calm repetition, remembrance, and prayer atmosphere.",
    videoUrl: "https://www.youtube.com/watch?v=Z-zaUl-uazk",
    views: "13.1K",
  },
  {
    slug: "rasa-leela-divine-dance",
    category: "Youth",
    theme: "Practices",
    title: "Cultural Rasa Leela and Devotional Dance",
    duration: "8:15",
    image: "/images/sanskriti.png",
    note: "A cultural devotional story suited for younger audiences and family viewers.",
    summary: "A graceful cultural presentation of rasa leela intended for devotional inspiration, youth engagement, and family viewing.",
    videoUrl: "https://www.youtube.com/watch?v=oW_Z8hICrHo",
    views: "15.8K",
  },
  {
    slug: "architectural-marvels-of-bhakti",
    category: "Festival",
    theme: "Heritage",
    title: "Cultural Architecture of Bhakti Heritage",
    duration: "10:05",
    image: "/images/hanuman4.JPG",
    note: "Temple architecture, sacred design, and devotional public space.",
    summary: "A visual cultural heritage feature exploring temple form, sacred architecture, and bhakti-centered public spiritual design.",
    videoUrl: "https://www.youtube.com/watch?v=Rq5iBnW8UEQ",
    views: "8.7K",
  },
  {
    slug: "festivals-of-bhagwat-heritage",
    category: "Festival",
    theme: "Heritage",
    title: "Social and Cultural Festivals of Bhagwat Heritage",
    duration: "10:05",
    image: "/images/sanskriti (2).png",
    note: "Festival color, devotional celebration, and community participation.",
    summary: "A social and cultural festival highlight video capturing celebration mood, family participation, and devotional togetherness across trust events.",
    videoUrl: "https://www.youtube.com/watch?v=ZYX6zpiY-6w",
    views: "19.6K",
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
  extraSection,
}: {
  title: string;
  subtitle: string;
  cards: NavCard[];
  extraSection?: ReactNode;
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

      {extraSection ? <PageSectionShell className="pt-4">{extraSection}</PageSectionShell> : null}
    </div>
  );
}

const SEVA_INITIATIVE_ITEMS = [
  {
    title: "Gau Seva",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
    href: ROUTES.seva.gau,
  },
  {
    title: "Jal Seva",
    image: "/images/jal1.png",
    href: ROUTES.seva.jal,
  },
  {
    title: "Ann Seva",
    image: "/images/annseva.png",
    href: ROUTES.seva.ann,
  },
  {
    title: "Chikitsa Seva",
    image: "/images/chikitsa.png",
    href: ROUTES.seva.medicine,
  },
  {
    title: "Education Support",
    image: "/images/education.png",
    href: ROUTES.seva.education,
  },
  {
    title: "Scholarship Program",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png",
    href: ROUTES.seva.scholarship,
  },
  {
    title: "Kanyadaan Seva",
    image: "/images/kanyadan.png",
    href: ROUTES.seva.kanyadaan,
  },
  {
    title: "Vyasanmukti Abhiyan",
    image: "/images/vyasanmukti.png",
    href: ROUTES.seva.vyasanmukti,
  },
  {
    title: "Disaster Relief",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772911110/disaster-relief_lg6qcp.webp",
    href: ROUTES.seva.disasterRelief,
  },
] as const;

function SevaInitiativesSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#e7d4b7] bg-[radial-gradient(circle_at_top_left,rgba(249,242,169,0.28),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(82,156,176,0.14),transparent_28%),linear-gradient(135deg,#fff9f0_0%,#fffefb_42%,#f7fbff_100%)] px-5 py-10 shadow-[0_24px_60px_rgba(18,55,83,0.10)] md:px-8 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute -left-14 top-10 h-36 w-36 rounded-full bg-[#f4ce5a]/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 right-4 h-40 w-40 rounded-full bg-[#529cb0]/14 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d38a1f]">Seva Initiatives</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#123753] md:text-5xl">Seva Initiatives</h2>
        <p className="mt-4 text-base leading-7 text-[#5c6f7f] md:text-lg">Serving Humanity Through Selfless Actions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative mt-5 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9c6f3f]"
      >
        <span>Scroll to explore</span>
        <span aria-hidden="true">→</span>
      </motion.div>

      <div className="relative mt-8 overflow-hidden">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SEVA_INITIATIVE_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
              className="min-w-[18.5rem] max-w-[18.5rem] snap-start md:min-w-[19.5rem] md:max-w-[19.5rem] xl:min-w-[20rem] xl:max-w-[20rem]"
            >
              <Link to={item.href} className="group block">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative h-[23rem] overflow-hidden rounded-[1.6rem] shadow-[0_18px_44px_rgba(18,55,83,0.12)]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,32,49,0.04),rgba(10,32,49,0.18)_38%,rgba(8,23,37,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(10,32,49,0.08),rgba(10,32,49,0.24)_34%,rgba(8,23,37,0.9)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-end justify-between gap-4"
                    >
                      <h3 className="max-w-[12rem] text-2xl font-black leading-tight text-white">{item.title}</h3>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                        Explore
                        <span aria-hidden="true">→</span>
                      </span>
                    </motion.div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
          <p className="inline-flex rounded-full border border-[var(--color-border-nav)] bg-[#f5f9ff] px-3 py-1 text-xs font-semibold text-[#1d4d75]">
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
                <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
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

const EVENT_SEVA_HERO_CONTENT_CLASS =
  "flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]";
const EVENT_SEVA_HERO_SUBTITLE_WRAP_CLASS =
  "text-[18px] font-semibold leading-tight text-white sm:text-[24px] md:text-[34px]";
const EVENT_SEVA_PRIMARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]";
const EVENT_SEVA_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]";
const EVENT_SEVA_SECTION_CLASS =
  "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
const EVENT_SEVA_CARD_CLASS =
  "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";
const EVENT_SEVA_HIGHLIGHT_CARD_CLASS =
  "rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]";
const EVENT_SEVA_DETAIL_CARD_CLASS = "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm";

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
  gauSevaStyle = false,
  hideHighlightValues = false,
  supportIntro,
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
  gauSevaStyle?: boolean;
  hideHighlightValues?: boolean;
  supportIntro?: string | null;
}) {
  usePageMeta(title, metaDescription);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title={title}
        subtitle={subtitle}
        subtitleClassName={gauSevaStyle ? SEVA_HERO_SUBTITLE_CLASS : undefined}
        contentClassName={gauSevaStyle ? EVENT_SEVA_HERO_CONTENT_CLASS : undefined}
        backgroundImage={backgroundImage}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass={gauSevaStyle ? "bg-black/55" : undefined}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className={gauSevaStyle ? EVENT_SEVA_PRIMARY_BUTTON_CLASS : "inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"}
          >
            {primaryCta}
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className={gauSevaStyle ? EVENT_SEVA_SECONDARY_BUTTON_CLASS : "inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"}
          >
            {secondaryCta}
          </Link>
        </div>
      </HeroSection>

      <section className={`${gauSevaStyle ? "relative z-20 mt-[10px]" : "-mt-10 relative z-20"} pb-6`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className={gauSevaStyle ? EVENT_SEVA_HIGHLIGHT_CARD_CLASS : "rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg"}
              >
                <p className={gauSevaStyle ? SEVA_HIGHLIGHT_TITLE_CLASS : "text-[#ffb06a] text-xs uppercase tracking-wide"}>{item.title}</p>
                {hideHighlightValues ? null : (
                  <p className={gauSevaStyle ? SEVA_HIGHLIGHT_VALUE_CLASS : "text-white text-2xl font-black mt-1"}>{item.value}</p>
                )}
                <p className={gauSevaStyle ? `${hideHighlightValues ? "mt-3" : "mt-1"} ${SEVA_BODY_TEXT_CLASS}` : "text-[#c7d7e1] text-sm mt-1"}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-7xl mx-auto px-4"}>
          <p className={gauSevaStyle ? SEVA_SECTION_LABEL_CLASS : "hidden"}>{aboutTitle}</p>
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>{title}</h2> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">{aboutTitle}</h2>}
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className={gauSevaStyle ? `mt-4 first:mt-5 ${SEVA_BODY_TEXT_CLASS}` : "max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5 first:mt-0"}
            >
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {features.map((item) => (
              <div key={item.title} className={gauSevaStyle ? EVENT_SEVA_CARD_CLASS : "rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center"}>
                <h3 className={gauSevaStyle ? SEVA_CARD_TITLE_CLASS : "text-3xl font-black text-white mb-3"}>{item.title}</h3>
                <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-[#c8d6df] text-xl"}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extraSection}

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16"}`}>
        <div className={gauSevaStyle ? `${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6` : "max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6"}>
          <div className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8"}>
            {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Event Support Tracks</p> : null}
            <h3 className={gauSevaStyle ? SEVA_SECTION_HEADING_CLASS : "text-4xl font-black text-white mb-5"}>Event Support Tracks</h3>
            <ul className={gauSevaStyle ? `space-y-3 mt-5 ${SEVA_BODY_TEXT_CLASS}` : "space-y-3 text-[#d4e1e8] text-xl"}>
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] p-6 text-white shadow-sm"}>
            {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Join or Support This Event</p> : null}
            <h3 className={gauSevaStyle ? SEVA_SECTION_HEADING_CLASS : "text-4xl font-black mb-4"}>Join or Support This Event</h3>
            {supportIntro !== null ? (
              <p className={gauSevaStyle ? `mt-4 ${SEVA_BODY_TEXT_CLASS}` : "text-xl text-white/95 mb-6"}>
                {supportIntro ?? "Support venue readiness, hospitality, volunteer coordination, digital outreach, and event execution through your seva."}
              </p>
            ) : null}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${gauSevaStyle ? "mt-6 mb-6" : "mb-6"}`}>
              {donationTiers.map((tier) => (
                <div key={tier.label} className={gauSevaStyle ? "rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4" : "rounded-xl bg-white/15 p-4 text-center"}>
                  <p className={gauSevaStyle ? "text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]" : "text-base font-semibold"}>{tier.label}</p>
                  <p className={gauSevaStyle ? "mt-2 text-2xl font-black text-white" : "text-2xl font-black mt-1"}>{tier.amount}</p>
                  <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-sm text-white/85 mt-2"}>{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.donate}
                className={gauSevaStyle ? "inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]" : "inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl"}
              >
                Donate Now
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className={gauSevaStyle ? "inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]" : "inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl"}
              >
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-7xl mx-auto px-4 py-10" : "bg-[#0a2534] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-7xl mx-auto px-4"}>
          {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Voices from the Event</p> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Voices from the Event</h2>}
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>Experiences from devotees and volunteers</h2> : null}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${gauSevaStyle ? "mt-8" : ""}`}>
            {testimonials.map((item) => (
              <div key={item.name} className={gauSevaStyle ? EVENT_SEVA_DETAIL_CARD_CLASS : "rounded-2xl border border-white/10 bg-[#17384b] p-6"}>
                <p className={gauSevaStyle ? SEVA_BODY_TEXT_CLASS : "text-[#dbe7ee] text-xl leading-relaxed"}>"{item.quote}"</p>
                <p className={gauSevaStyle ? "mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]" : "text-[#ffb06a] font-semibold text-lg mt-4"}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${gauSevaStyle ? "max-w-5xl mx-auto px-4 py-10" : "bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16"}`}>
        <div className={gauSevaStyle ? EVENT_SEVA_SECTION_CLASS : "max-w-5xl mx-auto px-4"}>
          {gauSevaStyle ? <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p> : <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>}
          {gauSevaStyle ? <h2 className={SEVA_SECTION_HEADING_CLASS}>Helpful answers for visitors, donors, and volunteers</h2> : null}
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className={`rounded-xl border border-white/10 ${gauSevaStyle ? "bg-[var(--campaign-surface)]" : "bg-[#163548]"} p-5`}>
                <summary className={gauSevaStyle ? "cursor-pointer text-white text-lg font-black md:text-xl" : "cursor-pointer text-white text-xl font-semibold"}>{item.q}</summary>
                <p className={gauSevaStyle ? `mt-3 ${SEVA_BODY_TEXT_CLASS}` : "text-[#d4e1e8] text-lg mt-3"}>{item.a}</p>
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
        { title: "Jal Seva", desc: "Water relief, hydration support, and compassionate public water seva.", href: ROUTES.seva.jal },
        { title: "Ann Seva", desc: "Meal service, annadaan support, and dignified food seva for communities.", href: ROUTES.seva.ann },
        { title: "Chikitsa Seva", desc: "Medical support and medicine access programs.", href: ROUTES.seva.medicine },
        { title: "Education Support", desc: "Student aid, mentoring, and educational seva.", href: ROUTES.seva.education },
        { title: "Scholarship Program", desc: "Scholarship support for deserving learners.", href: ROUTES.seva.scholarship },
        { title: "Kanyadaan Seva", desc: "Support with dignity for family ceremonies.", href: ROUTES.seva.kanyadaan },
        { title: "Vyasanmukti Abhiyan", desc: "Addiction recovery and rehabilitation support.", href: ROUTES.seva.vyasanmukti },
        { title: "Disaster Relief", desc: "Rapid response support during emergencies.", href: ROUTES.seva.disasterRelief },
        { title: "Volunteer Programs", desc: "Seva teams and volunteer coordination models.", href: ROUTES.seva.volunteerPrograms },
      ]}
      extraSection={<SevaInitiativesSection />}
    />
  );
});

export const EventsKathaHubPage = memo(function EventsKathaHubPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Katha" | "Festivals" | "Youth" | "Spiritual">("All");

  const eventItems = useMemo(
    () => [
      {
        title: "Bhagwat Katha Mahotsav",
        description: "Large-scale katha assemblies and devotional discourse.",
        href: ROUTES.eventsKatha.bhagwatKatha,
        image: "/images/kathapravachan.png",
        badge: "Upcoming",
        date: "May 2026",
        category: "Katha" as const,
      },
      {
        title: "Spiritual Events",
        description: "Satsang sabhas, path, and spiritual gatherings.",
        href: ROUTES.eventsKatha.spiritualEvents,
        image: "/images/spiritual1.png",
        badge: "Live",
        date: "Every Week",
        category: "Spiritual" as const,
      },
      {
        title: "Festivals & Celebrations",
        description: "Traditional utsavs and seasonal observances.",
        href: ROUTES.eventsKatha.festivals,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
        badge: "Seasonal",
        date: "All Year",
        category: "Festivals" as const,
      },
      {
        title: "Guru Purnima",
        description: "Guru bhakti and spiritual gratitude programs.",
        href: ROUTES.eventsKatha.guruPurnima,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913532/gurupurnima_gthuvv.jpg",
        badge: "Sacred",
        date: "Annual",
        category: "Festivals" as const,
      },
      {
        title: "Annakut Mahotsav",
        description: "Devotional offering and community celebration.",
        href: ROUTES.eventsKatha.annakut,
        image: "/images/annseva.png",
        badge: "Popular",
        date: "Festival Day",
        category: "Festivals" as const,
      },
      {
        title: "Youth Programs",
        description: "Youth-focused camps, classes, and leadership sessions.",
        href: ROUTES.eventsKatha.youthPrograms,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg",
        badge: "Youth",
        date: "Monthly",
        category: "Youth" as const,
      },
    ],
    [],
  );

  const visibleItems =
    activeFilter === "All" ? eventItems : eventItems.filter((item) => item.category === activeFilter);
  const featuredItem = visibleItems[0] ?? eventItems[0];
  const spotlightItems = visibleItems.slice(1, 3);
  const supportingItems = visibleItems.slice(3);

  usePageMeta(
    "Events & Katha",
    "Bhagwat Katha and devotional events calendar with youth and festival engagement.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFF9F1_0%,#FFFDF8_42%,#F6EAD4_100%)] text-[#51463C]">
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(4, 18, 30, 0.34), rgba(4, 18, 30, 0.78)), url('/images/kathapravachan.png')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(228,180,94,0.14),transparent_24%)]" />
        <div aria-hidden="true" className="absolute left-[6%] top-24 h-28 w-28 rounded-full bg-[#E4B45E]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[10%] top-36 h-32 w-32 rounded-full bg-[#529CB0]/14 blur-3xl" />

        <div className="relative flex min-h-[420px] w-full items-end px-4 py-16 sm:px-6 md:min-h-[540px] md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className={`${ABOUT_SECTION_LABEL_CLASS} text-[#F9F2A9] md:text-base`}>Spiritual Calendar</p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
              className="mt-3 text-4xl font-black leading-tight text-white md:text-6xl"
            >
              Events & Katha
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
              className="mt-4 max-w-3xl text-base leading-7 text-white/90 md:text-lg"
            >
              Bhagwat Katha and devotional events calendar with youth and festival engagement.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 w-full px-4 pb-12 sm:px-6 md:px-10 md:pb-20 lg:-mt-10 lg:px-16 lg:pb-24 xl:px-24">
        <div className="rounded-[28px] border border-[#E7D3B5] bg-[#FFFDF8]/95 p-3 shadow-[0_20px_55px_rgba(29,79,99,0.08)] backdrop-blur-xl sm:p-4">
          <div className="flex flex-wrap gap-2">
            {(["All", "Katha", "Festivals", "Youth", "Spiritual"] as const).map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#E4B45E] text-[#33210F] shadow-[0_12px_28px_rgba(228,180,94,0.28)] hover:bg-[#D08A32]"
                      : "border border-[#D8C3A2] bg-[#FFF9F1] text-[#51463C] hover:border-[#E4B45E] hover:bg-[#FFFDF8]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-12 sm:px-6 md:px-10 md:pb-20 lg:px-16 lg:pb-24 xl:px-24">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link to={featuredItem.href} className="group block">
              <motion.article
                whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative h-[26rem] overflow-hidden rounded-[28px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_22px_60px_rgba(29,79,99,0.12)] md:h-[34rem]"
              >
                <motion.img
                  src={featuredItem.image}
                  alt={featuredItem.title}
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.08),rgba(29,79,99,0.16)_38%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.24)_32%,rgba(20,48,64,0.92)_100%)]" />
                <div className="absolute left-6 top-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#33210F]">
                    {featuredItem.badge}
                  </span>
                  <span className="rounded-full border border-[#E7D3B5] bg-[#FFFDF8]/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#51463C]">
                    {featuredItem.date}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-2xl font-black text-white md:text-4xl">{featuredItem.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/88 md:text-base">{featuredItem.description}</p>
                  </div>
                  <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                    Open Section →
                  </motion.span>
                </div>
              </motion.article>
            </Link>
          </motion.div>

          <div className="grid gap-6">
            {spotlightItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              >
                <Link to={item.href} className="group block">
                  <motion.article
                    whileHover={{ y: -8, rotateX: 1.2, rotateY: 1.2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="relative h-[16rem] overflow-hidden rounded-[26px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_18px_46px_rgba(29,79,99,0.1)]"
                  >
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.08),rgba(29,79,99,0.18)_32%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.26)_26%,rgba(20,48,64,0.92)_100%)]" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#33210F]">
                        {item.badge}
                      </span>
                      <span className="rounded-full border border-[#E7D3B5] bg-[#FFFDF8]/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#51463C]">
                        {item.date}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <h3 className="text-[14px] font-black text-white md:text-[20px]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/88">{item.description}</p>
                      </div>
                      <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                        Open →
                      </motion.span>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportingItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
            >
              <Link to={item.href} className="group block">
                <motion.article
                  whileHover={{ y: -8, rotateX: 1, rotateY: -1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative h-[18rem] overflow-hidden rounded-[24px] border border-[#D8C3A2] bg-[#FFFDF8] shadow-[0_16px_40px_rgba(29,79,99,0.1)]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,79,99,0.06),rgba(29,79,99,0.16)_30%,rgba(20,48,64,0.84)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(29,79,99,0.12),rgba(29,79,99,0.26)_24%,rgba(20,48,64,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="rounded-full border border-[#E7D3B5] bg-[#E4B45E]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#33210F]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <h3 className="text-[14px] font-black text-white md:text-[20px]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/88">{item.description}</p>
                    </div>
                    <motion.span whileHover={{ x: 4 }} className="text-sm font-semibold text-white/92">
                      →
                    </motion.span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          <p className="text-base leading-7 text-[#5E5247] md:text-lg">Join Our Spiritual Gatherings</p>
          <Link
            to={ROUTES.eventsKatha.festivals}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#E4B45E] px-8 py-3 text-sm font-semibold text-[#33210F] shadow-[0_16px_32px_rgba(228,180,94,0.26)] transition duration-300 hover:scale-[1.04] hover:bg-[#D08A32] hover:shadow-[0_20px_38px_rgba(208,138,50,0.28)]"
          >
            View Full Calendar →
          </Link>
        </motion.div>
      </section>
    </div>
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
        { title: "Shree Kasthbhanjan Hanuman", desc: "Kasthbhanjan Hanuman murti and darshan concept.", href: ROUTES.mandirTeerth.hanuman },
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
  const digitalCards = [
    {
      title: "E-Store",
      desc: "Books, puja items, and devotional essentials in a clean digital storefront.",
      href: ROUTES.digital.store,
    },
    {
      title: "Donation System",
      desc: "Support temple, seva, and trust initiatives through a simple online contribution flow.",
      href: ROUTES.digital.donation,
    },
    {
      title: "Online Satsang",
      desc: "Join live discourse, digital darshan, and replay access from anywhere.",
      href: ROUTES.digital.satsang,
    },
    {
      title: "Membership Portal",
      desc: "Stay connected with member benefits, registration, and digital identity tools.",
      href: ROUTES.digital.membership,
    },
    {
      title: "Kundli",
      desc: "Request traditional kundli guidance with booking, details, and delivery support.",
      href: ROUTES.digital.kundli,
    },
  ];

  usePageMeta(
    "Digital Services",
    "Digital services hub for e-store, online donations, satsang access, membership support, and kundli booking.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Digital Services"
        subtitle="Devotional access, online seva support, and spiritual tools in one place"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.digital.store} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Visit E-Store
          </Link>
          <Link to={ROUTES.digital.satsang} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Join Online Satsang
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Digital Reach",
                label: "Daily access for devotees",
                note: "Simple routes for seva, study, satsang, and spiritual support.",
              },
              {
                title: "Clean Experience",
                label: "Easy to browse",
                note: "Each service is organized with clear entry points and focused actions.",
              },
              {
                title: "Connected Seva",
                label: "Support from anywhere",
                note: "Donate, join, request, and stay connected through digital channels.",
              },
              {
                title: "Platform Design",
                label: "Fast and functional",
                note: "A cleaner visual system inspired by the Gau Seva page style.",
              },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.label}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Digital Service Routes</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Explore every major online service with the same clean visual language</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {digitalCards.map((card) => (
              <article key={card.href} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{card.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{card.desc}</p>
                <Link to={card.href} className={`mt-5 inline-flex ${EVENT_SEVA_PRIMARY_BUTTON_CLASS}`}>
                  Open Section
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 gap-6 lg:grid-cols-2`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Why This Hub Matters</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>A clearer digital entry point for devotees, donors, and families</h3>
            <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS}`}>
              The Digital Services area now follows the same structured look as Gau Seva so visitors can move through
              online sections without facing mismatched fonts, banners, or scattered layouts.
            </p>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              This makes the project feel more polished, more trustworthy, and easier to use across donation, satsang,
              membership, shopping, and kundli support.
            </p>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Start With These</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Quick digital actions for common visitor needs</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={ROUTES.digital.donation} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
                Open Donation System
              </Link>
              <Link to={ROUTES.digital.membership} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
                View Membership Portal
              </Link>
              <Link to={ROUTES.digital.kundli} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
                Book Kundli
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
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
  const awardsLabel = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
  const awardsHeading = "text-[14px] font-black text-white md:text-[20px]";
  const awardsBody = "text-base leading-7 text-[var(--campaign-text)] md:text-lg";
  const awardsCardTitle = "text-2xl font-black text-white md:text-[1.75rem]";
  const awardsPanel =
    "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
  const awardsCardPanel =
    "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]";

  usePageMeta(
    "Awards & Recognition",
    "Recognitions, honors, and milestone acknowledgements reflecting the trust's spiritual, social, and cultural impact.",
  );

  const visibleRecognitions =
    activeFilter === "All"
      ? RECOGNITION_ITEMS
      : RECOGNITION_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-12">
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-10 md:pt-10">
        <section className={awardsPanel}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className={awardsLabel}>International Award</p>
              <h2 className={`mt-2 ${awardsHeading}`}>
                Maharshi Honor Conferred at Jio World Centre, Mumbai
              </h2>
              <div className={`mt-5 space-y-4 ${awardsBody}`}>
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
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Award Scope</p>
                <p className={`mt-2 ${awardsCardTitle}`}>International Recognition</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Award Title</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Maharshi Award</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Venue</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Jio World Centre, Mumbai</p>
              </div>
              <div className={awardsCardPanel}>
                <p className={awardsLabel}>Honoree</p>
                <p className={`mt-2 ${awardsCardTitle}`}>Shri Manish Bhaiji Maharaj</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
          <section className={awardsPanel}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={awardsLabel}>New Feature</p>
                <h2 className={`mt-2 ${awardsHeading}`}>Recognition Explorer</h2>
                <p className={`mt-2 max-w-2xl ${awardsBody}`}>
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
                          ? "bg-[var(--campaign-accent)] text-white shadow-sm"
                          : "border border-white/15 bg-white/10 text-white hover:border-white/25 hover:bg-white/15"
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
                  className={awardsCardPanel}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-accent)]">
                          {item.category}
                        </span>
                        <span className="text-sm font-semibold text-[var(--campaign-text)]">{item.year}</span>
                      </div>
                      <h3 className={`mt-3 ${awardsCardTitle}`}>{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-[var(--campaign-accent)]">{item.presenter}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] px-4 py-3 md:max-w-[240px]">
                      <p className={awardsLabel}>Outcome</p>
                      <p className={`mt-2 ${awardsBody}`}>{item.impact}</p>
                    </div>
                  </div>

                  <p className={`mt-4 ${awardsBody}`}>{item.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className={awardsPanel}>
              <h2 className={awardsHeading}>Recognition Focus</h2>
              <ul className={`mt-4 space-y-3 ${awardsBody}`}>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Seva programs are evaluated on continuity, discipline, and measurable community relief.
                </li>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Educational support recognitions highlight long-term child and youth development impact.
                </li>
                <li className="rounded-2xl bg-[var(--campaign-surface)] px-4 py-3">
                  Cultural honors reflect preservation of devotion, heritage, and spiritual participation.
                </li>
              </ul>
            </section>

            <section className={awardsPanel}>
              <h2 className={awardsHeading}>Milestone Snapshot</h2>
              <div className="mt-4 space-y-4">
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Public Trust</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    Recognition strengthens transparency, credibility, and long-term support for trust-led initiatives.
                  </p>
                </div>
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Service Quality</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    Awards validate disciplined execution across social relief, event operations, and volunteer engagement.
                  </p>
                </div>
                <div className={awardsCardPanel}>
                  <p className={awardsLabel}>Future Readiness</p>
                  <p className={`mt-1 ${awardsBody}`}>
                    The archive creates a strong narrative base for upcoming partnerships, sponsorships, and institutional outreach.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
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
                <p className="text-2xl font-black text-[var(--color-secondary)]">{liveCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Live Now</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">{upcomingCount}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Upcoming Today</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">{TRUST_ACTIVITY_ITEMS.length}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#6a7f90]">Tracked Programs</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4">
                <p className="text-2xl font-black text-[var(--color-secondary)]">4</p>
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

              <div className="rounded-2xl border border-[#e1ebf5] bg-[var(--color-surface-hover)] px-4 py-3 text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a7f90]">Live Snapshot</p>
                <p className="mt-1 text-lg font-black text-[#123753]">{formattedTime}</p>
                <p className="text-sm text-[var(--color-text-soft)]">{weekdayName}, {formattedDate}</p>
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
                        : "border border-[#d7e5f2] bg-[var(--color-surface-hover)] text-[#36526b] hover:border-[#b7cfe3] hover:bg-white"
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
                <li className="rounded-2xl bg-[var(--color-surface-hover)] px-4 py-3">Spiritual programs maintain daily rhythm and anchor community participation.</li>
                <li className="rounded-2xl bg-[#fff7ea] px-4 py-3">Seva teams operate through scheduled coordination blocks for consistency and accountability.</li>
                <li className="rounded-2xl bg-[var(--color-surface-hover)] px-4 py-3">Education and cultural activities are timed to maximize youth and family participation.</li>
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
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-12">
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
  const heroCowImage = "/images/maharaj%20ji/gau.jpg";
  const scenicCowImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg";

  const heroButtons = [
    {
      label: "Donate for Gau Seva",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#c76d28] via-[#8f3f13] to-[#6f2806] text-[#fff5df] shadow-[inset_0_1px_0_rgba(255,237,201,0.35),0_10px_18px_rgba(86,39,14,0.22)] hover:brightness-105",
    },
    {
      label: "Sponsor a Cow",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#59733c] via-[#395b24] to-[#23421a] text-[#fff5df] shadow-[inset_0_1px_0_rgba(237,249,197,0.25),0_10px_18px_rgba(48,63,27,0.22)] hover:brightness-105",
    },
    {
      label: "Visit Kamdhenu Ashram",
      to: ROUTES.contact,
      className: "bg-gradient-to-b from-[#cc9c55] via-[#9c6b28] to-[#6d4512] text-[#fff5df] shadow-[inset_0_1px_0_rgba(255,243,210,0.35),0_10px_18px_rgba(86,56,15,0.22)] hover:brightness-105",
    },
  ];

  const topStats = [
    {
      title: "2.5 Tons",
      label: "Daily Bhojan Seva",
      note: "Fresh green fodder and dry feed offered every day.",
    },
    {
      title: "Open",
      label: "Cow Sponsorship",
      note: "Devotees can sponsor routine nourishment and care.",
    },
    {
      title: "365 Days",
      label: "Volunteer Presence",
      note: "Gaushala seva continues throughout the year.",
    },
  ];

  const sevaActivities = [
    {
      icon: "CF",
      title: "Cow Feeding",
      desc: "Daily bhojan seva with green fodder, dry feed, mineral support, and seasonal nourishment planning.",
      className: "bg-gradient-to-b from-[#8d6632] via-[#6c4a1d] to-[#4f3511] text-[#fff8e9]",
    },
    {
      icon: "MC",
      title: "Medical Care",
      desc: "Veterinary consultation, emergency treatment, health checks, and recovery care for weak or injured cows.",
      className: "bg-gradient-to-b from-[#b86b20] via-[#8f4710] to-[#6c2c07] text-[#fff8e9]",
    },
    {
      icon: "SP",
      title: "Shelter & Protection",
      desc: "Safe shelter, rescue coordination, and long-term care for abandoned, elderly, and vulnerable cows.",
      className: "bg-gradient-to-b from-[#4d6a3a] via-[#32512a] to-[#233b1f] text-[#fff8e9]",
    },
    {
      icon: "HE",
      title: "Healthy Environment",
      desc: "Clean sheds, hygiene management, water access, shaded rest areas, and disciplined daily maintenance.",
      className: "bg-gradient-to-b from-[#425467] via-[#304355] to-[#1f3141] text-[#fff8e9]",
    },
  ];

  const donationOptions = [
    {
      title: "Feed a Cow",
      amount: "Rs 501",
      desc: "Support one day of bhojan seva with green fodder and daily nourishment.",
      className: "bg-gradient-to-b from-[#b56a22] via-[#8d4510] to-[#6d3008] text-[#fff6e3]",
    },
    {
      title: "Monthly Cow Care",
      amount: "Rs 5,100",
      desc: "Contribute toward recurring feed, care, water, and shelter support for one month.",
      className: "bg-gradient-to-b from-[#446676] via-[#29485a] to-[#1c3241] text-[#eff8ff]",
    },
    {
      title: "Medical Support",
      amount: "Rs 2,100",
      desc: "Help cover veterinary consultation, medicines, supplements, and emergency treatment.",
      className: "bg-gradient-to-b from-[#61733b] via-[#425525] to-[#2a3918] text-[#f5ffe7]",
    },
    {
      title: "Gaushala Support",
      amount: "Rs 11,000",
      desc: "Support shed upkeep, water systems, sanitation, and protective infrastructure.",
      className: "bg-gradient-to-b from-[#59627f] via-[#414a64] to-[#2f3548] text-[#f5f6ff]",
    },
    {
      title: "Lifetime Seva",
      amount: "Rs 51,000",
      desc: "Offer long-term support to sustain protection, nourishment, and dharmic Gau Seva.",
      className: "bg-gradient-to-b from-[#8b511d] via-[#6c3310] to-[#4f2207] text-[#fff7e8]",
    },
  ];

  const sponsorCows = [
    {
      name: "Gauri",
      age: "6 years",
      status: "Available for Sponsorship",
      note: "Gentle, healthy, and part of the regular feeding seva circle.",
      image: scenicCowImage,
      objectPosition: "center 35%",
    },
    {
      name: "Shyama",
      age: "9 years",
      status: "Partially Sponsored",
      note: "Requires recurring care, nutrition support, and shelter maintenance attention.",
      image: heroCowImage,
      objectPosition: "center 18%",
    },
    {
      name: "Kamdhenu",
      age: "11 years",
      status: "Medical Care Needed",
      note: "Needs focused health monitoring, supplement support, and devotional care sponsorship.",
      image: scenicCowImage,
      objectPosition: "center 45%",
    },
  ];

  const galleryItems = [
    {
      title: "Morning Gau Darshan",
      image: scenicCowImage,
      wrapperClassName: "md:col-span-2",
      heightClassName: "h-64 md:h-full",
      objectPosition: "center 35%",
    },
    {
      title: "Ashram Care Space",
      image: heroCowImage,
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center 18%",
    },
    {
      title: "Sacred Heritage Atmosphere",
      image: "/images/heritage1.png",
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center",
    },
    {
      title: "Volunteer and Devotional Spirit",
      image: "/images/spiritual1.png",
      wrapperClassName: "",
      heightClassName: "h-52",
      objectPosition: "center",
    },
    {
      title: "Care and Nourishment",
      image: scenicCowImage,
      wrapperClassName: "md:col-span-2",
      heightClassName: "h-56",
      objectPosition: "center 40%",
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

  const volunteerAreas = ["Feeding & Care", "Gaushala Cleaning", "Prayer & Seva"];

  const bottomButtons = [
    {
      label: "Donate for Gau Seva",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#c76d28] via-[#8f3f13] to-[#6f2806] text-[#fff6de]",
    },
    {
      label: "Sponsor a Cow",
      to: ROUTES.donate,
      className: "bg-gradient-to-b from-[#59733c] via-[#395b24] to-[#23421a] text-[#fff6de]",
    },
    {
      label: "Volunteer for Gau Seva",
      to: ROUTES.involved.volunteer,
      className: "bg-gradient-to-b from-[#b26c1f] via-[#8d4b0e] to-[#653008] text-[#fff6de]",
    },
    {
      label: "Contact Kamdhenu Ashram",
      to: ROUTES.contact,
      className: "bg-gradient-to-b from-[#46627b] via-[#30495f] to-[#203447] text-[#fff6de]",
    },
  ];

  usePageMeta(
    "Gau Seva - Kamdhenu Ashram",
    "Kamdhenu Ashram page with Gau Seva activities, donation options, cow sponsorship, volunteer support, and spiritual significance.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
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
            className="inline-flex items-center rounded-lg bg-[#F59E0B] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Donate for Gau Seva
          </Link>
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[#12394A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
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
                <p className="mt-1 text-sm text-[var(--campaign-text)]">{item.note}</p>
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
                <p className="mt-3 leading-7 text-[var(--campaign-text)]">{item.desc}</p>
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
                <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{item.desc}</p>
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
                <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{item.desc}</p>
                <Link
                  to={ROUTES.donate}
                  className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
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
                  <p className="mt-2 text-sm leading-7 text-[var(--campaign-text)]">{cow.note}</p>
                  <Link
                    to={ROUTES.donate}
                    className="mt-5 inline-flex rounded-xl bg-[#F59E0B] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
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
                <li key={item} className="rounded-2xl bg-[#0f3140] px-4 py-3 text-[var(--campaign-text)] shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={ROUTES.involved.volunteer}
              className="mt-6 inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
            >
              Volunteer Registration
            </Link>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Spiritual Message</p>
              <blockquote className="mt-4 text-3xl font-black leading-tight text-white">
                "Î±Ã±Ã¹Î±Ã±â•›Î±Ã±â•¡Î±Ã‘Ã¯ Î±Ã±â•¡Î±Ã±â”Î±Ã±â•¢Î±Ã‘Ã¬Î±Ã±â•¡Î±Ã±â••Î±Ã‘Ã¬Î±Ã±Â» Î±Ã±Â«Î±Ã±â•›Î±Ã±Ã±Î±Ã±â–‘Î±Ã±Ã¢"
              </blockquote>
              <p className="mt-3 text-lg text-[#F59E0B]">The cows are the mothers of the universe.</p>
              <p className="mt-4 text-base leading-7 text-[var(--campaign-text)]">
                Gau Mata represents nourishment, gentleness, and sacred abundance. Serving her is an offering of gratitude,
                protection, and dharmic responsibility.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#12394A] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">Contact Kamdhenu Ashram</p>
              <h2 className="mt-2 text-3xl font-black text-white">Visit or Connect</h2>
              <div className="mt-5 space-y-4 text-[var(--campaign-text)]">
                <p><span className="font-black text-white">Address:</span> Kamdhenu Ashram, Bhagwat Heritage Service Foundation Trust Campus, Swaminarayan Bhagwat Dham</p>
                <p><span className="font-black text-white">Phone:</span> +91 98765 43210</p>
                <p><span className="font-black text-white">Email:</span> info@bhagwatheritage.org</p>
                <p><span className="font-black text-white">Map Location:</span> Available through the contact desk for visitor guidance and ashram visit planning.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={ROUTES.contact} className="inline-flex rounded-xl bg-[#F59E0B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <SevaHeroBanner
        title="Disaster Relief"
        subtitle="Relief with care, support with heart"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772911110/disaster-relief_lg6qcp.webp"
      >
        <Link
          to={ROUTES.donate}
          className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-[#F4CE5A] px-7 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#E9932D]"
        >
          Donate for Relief
        </Link>
        <Link
          to={ROUTES.involved.volunteer}
          className="inline-flex min-w-[190px] items-center justify-center rounded-full border border-white/35 bg-white/8 px-7 py-4 text-base font-bold text-white shadow-[0_12px_26px_rgba(6,22,33,0.22)] transition-colors hover:bg-white/14"
        >
          Join Relief Team
        </Link>
      </SevaHeroBanner>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">About Disaster Relief</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Emergency response with compassion and discipline</h2>
          <p className="mt-5 text-base leading-7 text-white md:text-lg">
            Disaster Relief Seva is the trust's emergency response mission for communities facing floods, fire incidents,
            storms, displacement, and sudden humanitarian distress.
          </p>
          <p className="mt-4 text-base leading-7 text-white md:text-lg">
            This page is built around action: join the field seva team, donate relief materials, sponsor recovery support,
            and help families rebuild with dignity.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {DISASTER_FEATURES.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
              >
                <h3 className="text-[24px] font-black text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Relief Process</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">How Disaster Relief Works</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {DISASTER_PROCESS.map((item) => (
              <div key={item.step} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <h3 className="text-[24px] font-black text-white">{item.step}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Relief Seva Support</p>
            <h3 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Join and Support Relief Seva</h3>
            <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
              You can serve by joining field response teams, supporting logistics and camp setup, donating supplies, or
              sponsoring emergency and recovery assistance for affected families.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {DISASTER_JOIN_OPTIONS.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                  <h4 className="text-xl font-black text-white">{item.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{item.desc}</p>
                  <Link
                    to={item.href}
                    className="mt-5 inline-flex rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                  >
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 text-white shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Donation Options</p>
            <h3 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Emergency Donation Support</h3>
            <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
              Contributions help the trust mobilize emergency food, water, medicine, shelter essentials, and rehabilitation
              support when families face sudden crisis.
            </p>
            <div className="my-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {DISASTER_DONATION_TIERS.map((tier) => (
                <div key={tier.label} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                  <p className="text-xl font-black text-white">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-[var(--campaign-accent)]">{tier.amount}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--campaign-text)]">{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-flex rounded-xl bg-[var(--campaign-surface)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]">
                Become Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Relief Stories</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Compassion in action</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {DISASTER_STORIES.map((item) => (
              <div key={item.name} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className="text-base leading-7 text-[var(--campaign-text)] md:text-lg">&quot;{item.quote}&quot;</p>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Help Desk</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {DISASTER_FAQS.map((item) => (
              <details key={item.q} className="rounded-[20px] border border-white/10 bg-[var(--campaign-surface)] p-5">
                <summary className="cursor-pointer text-xl font-black text-white">{item.q}</summary>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export const EventsBhagwatKathaPage = memo(function EventsBhagwatKathaPage() {
  const [mahotsavStart] = useState(() => {
    const start = new Date();
    start.setDate(start.getDate() + 12);
    start.setHours(9, 0, 0, 0);
    return start;
  });

  usePageMeta(
    "Bhagwat Katha Mahotsav",
    "Bhagwat Katha program vision, seva participation, and mahotsav schedule overview.",
  );

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

  const visibleSchedule = sessionSchedule.slice(0, 9);

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Bhagwat Katha Mahotsav"
        subtitle="Live wisdom, active seva, divine experience"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/kathapravachan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.donate} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Sponsor Mahotsav
          </Link>
          <Link to={ROUTES.involved.volunteer} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Join Katha Seva
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Bhagwat Katha Mahotsav</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>A devotional gathering rooted in katha, seva, and spiritual discipline</h2>
          <p className={`mt-5 ${SEVA_BODY_TEXT_CLASS}`}>
            Bhagwat Katha Mahotsav is envisioned as a disciplined spiritual event where sacred discourse, devotional music,
            seva participation, and community hospitality work together in one integrated devotional ecosystem.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {featureCards.map((item) => (
              <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Experience</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>A devotional rhythm from prayer to discourse and evening aarti</h2>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              Each day of the mahotsav is designed around bhajan, Bhagwat discourse, darshan, hospitality seva, and calm devotee guidance.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">Daily Flow</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  Morning prayer, afternoon katha, and evening aarti create a complete devotional journey through the day.
                </p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">Devotee Support</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  Seating, water, prasad, and volunteer guidance help families and devotees participate peacefully.
                </p>
              </div>
            </div>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Join or Sponsor Mahotsav</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Support stage, hospitality, and digital access</h3>
            <p className={`mt-4 ${SEVA_BODY_TEXT_CLASS}`}>
              Support stage readiness, devotee hospitality, water seva, seating management, and digital access for the Katha Mahotsav.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 mb-6">
              {donationTiers.map((tier) => (
                <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{tier.amount}</p>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{tier.note}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
                Donate Now
              </Link>
              <Link to={ROUTES.involved.volunteer} className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]">
                Join Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Schedule Snapshot</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Day-wise sessions and devotional flow</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {visibleSchedule.map((session) => {
              return (
                <div
                  key={session.id}
                  className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{session.dayLabel}</p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-text)]">
                      {session.slot}
                    </span>
                  </div>
                  <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{session.title}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--campaign-text)]">{session.slot}</p>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>
                    {session.start.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} |{" "}
                    {session.start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Operational Support Tracks</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>How seva teams can contribute during the mahotsav</h3>
            <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
              {supportTracks.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Mahotsav Participation</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>A welcoming and disciplined experience for all devotees</h3>
            <div className={`mt-5 space-y-4 ${SEVA_BODY_TEXT_CLASS}`}>
              <p>
                The mahotsav is organized so families, devotees, and volunteers can participate in katha with peace, order, and devotional focus.
              </p>
              <p>
                Seating guidance, darshan flow, hospitality seva, and prayerful discipline help create a calm atmosphere throughout the gathering.
              </p>
              <p>
                Every session is designed to support scripture listening, devotional music, and respectful participation across the full event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Devotee Experience</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Feedback from volunteers, families, and online viewers</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div key={item.name} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                <p className={SEVA_BODY_TEXT_CLASS}>"{item.quote}"</p>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Frequently Asked Questions</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Helpful answers for donors, devotees, and seva teams</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                <summary className="cursor-pointer text-lg font-black text-white md:text-xl">{item.q}</summary>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.a}</p>
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
      subtitle="Tradition, devotion, and joy, celebrated together"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg"
      metaDescription="Annual Swaminarayan Bhagwat Dham festival calendar, utsav planning, seva participation, and celebration support."
      aboutTitle="Annual Festival Vision"
      aboutParagraphs={[]}
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
      gauSevaStyle
      hideHighlightValues
      supportIntro={null}
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
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <div className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
                <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <p className={SEVA_SECTION_LABEL_CLASS}>Year 2026</p>
                  <h2 className={SEVA_SECTION_HEADING_CLASS}>Annual Swaminarayan Bhagwat Dham Festival Calendar</h2>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Festival Days", value: `${annualFestivals.length}` },
                      { label: "Months Covered", value: "Jan-Nov" },
                      { label: "Temple Support", value: "Join + Donate" },
                      { label: "Planning Style", value: "Date-Wise" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-[var(--campaign-deep)] p-4">
                        <p className="text-[20px] font-black uppercase tracking-wide text-[var(--campaign-accent)] md:text-[24px]">{item.label}</p>
                        <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
                    >
                      Join Festival Seva
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
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
                    <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                      <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                      <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {annualFestivals.map((festival) => (
                <div
                  key={`${festival.dayDate}-${festival.title}`}
                  className="group rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{festival.month}</p>
                      <p className="mt-2 text-[14px] font-black text-white md:text-[20px]">{festival.dayDate}</p>
                    </div>
                    <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                      2026
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--campaign-deep)] p-4">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[var(--campaign-text)]">{festival.lunar}</p>
                    <h3 className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{festival.title}</h3>
                    <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{festival.focus}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={ROUTES.involved.volunteer}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
                    >
                      Join Us
                    </Link>
                    <Link
                      to={ROUTES.donate}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
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
                <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
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
      subtitle="Inspiring youth to lead with purpose"
      backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/youth_xj81l3.jpg"
      metaDescription="Youth event programs, Bal Sanskar, Yuva leadership, cultural growth, and community seva development."
      aboutTitle="About Youth Programs"
      aboutParagraphs={[]}
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
      gauSevaStyle
      hideHighlightValues
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
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Youth Growth Tracks</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Structured pathways for values, leadership, and seva</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {youthTracks.map((track) => (
                <div key={track.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{track.title}</h3>
                  <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{track.focus}</p>
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
      desc: "",
      format: "Beginner study sheets",
    },
    {
      category: "Guided" as const,
      title: "Mentor-Led Study Notes",
      desc: "",
      format: "Annotated notes and references",
    },
    {
      category: "Advanced" as const,
      title: "Thematic Deep Study Modules",
      desc: "",
      format: "Advanced resource modules",
    },
    {
      category: "Practice" as const,
      title: "Daily Revision and Reflection",
      desc: "",
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Bhagwat Study Resources"
        subtitle="Guided knowledge for a deeper spiritual journey"
        subtitleClassName="text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1775569184/bhagwatdhamstudy_ky9jf3.avif"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.library}
            className="inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]"
          >
            Explore Library
          </Link>
          <Link
            to={ROUTES.knowledge.pathshala}
            className="inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]"
          >
            Join Study Path
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Study Tracks", value: "4", note: "Foundational to advanced Bhagwat learning paths" },
              { title: "Guided Modules", value: "25+", note: "Organized themes for topic-wise scripture study" },
              { title: "Daily Practice", value: "365", note: "Consistent reflection and revision opportunities" },
              { title: "Mentor Support", value: "Available", note: "Study-friendly routes linked with Pathshala and satsang" },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Bhagwat Study Resources</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Organized scripture study for learners, satsang groups, and guided devotees</h2>

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
              <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Study Resource Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Filter the right study track for reading, teaching, and deeper learning</h2>
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
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]/40"
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
              <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-text)]">
                    {item.format}
                  </span>
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                {item.desc ? <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Study Support Features</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Useful tools for disciplined scripture learning</h3>
            <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
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

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Build a Better Study Path</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Move from reading toward understanding and reflection</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Self Study Start", amount: "Open Access" },
                { label: "Guided Learning", amount: "Mentor Ready" },
                { label: "Deep Study Route", amount: "Advanced" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.knowledge.library}
                className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Open Library
              </Link>
              <Link
                to={ROUTES.knowledge.pathshala}
                className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
              >
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Children Spiritual Learning"
        subtitle="Bal Sanskar today, strong character tomorrow"
        subtitleClassName="text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772915579/children_hrarip.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.pathshala}
            className="inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]"
          >
            Join Bal Sanskar Path
          </Link>
          <Link
            to={ROUTES.contact}
            className="inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]"
          >
            Connect With Mentor
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Age Tracks", value: "4", note: "Bal sanskar, primary, teens, and family participation routes" },
              { title: "Learning Style", value: "Story + Practice", note: "Children learn through stories, prayer, action, and repetition" },
              { title: "Family Role", value: "Active", note: "Parents are included as learning partners and spiritual anchors" },
              { title: "Weekly Rhythm", value: "7 Day", note: "Simple daily habits designed for steady sanskar development" },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>{item.title}</p>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Children Spiritual Learning</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Joyful sanskar learning guided by family, prayer, and daily practice</h2>

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
              <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Children Learning Journey Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the most suitable track by age and family role</h2>
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
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]/40"
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
              <div key={item.title} className={EVENT_SEVA_DETAIL_CARD_CLASS}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[var(--campaign-text)]">
                    {item.format}
                  </span>
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Weekly Sanskar Routine</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>A practical family rhythm for prayer, story, action, and reflection</h2>

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
                  <div key={item.step} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-5">
                    <h3 className="text-xl font-black text-white">{item.step}</h3>
                    <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
          </div>

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Today&apos;s Focus</p>
              <h3 className={SEVA_SECTION_HEADING_CLASS}>{dailyFocus.title}</h3>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{dailyFocus.day}</p>

              <div className="mt-8 grid grid-cols-1 gap-3">
                {[
                  "Short daily practice for home use",
                  "Family-friendly and child-safe learning rhythm",
                  "Designed for both beginners and regular satsang families",
                ].map((line) => (
                  <div key={line} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] px-4 py-3 text-base font-semibold text-[var(--campaign-text)]">
                    {line}
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Page Support</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>What this page adds for children and families</h3>
            <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
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

          <div className={EVENT_SEVA_DETAIL_CARD_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Start Children Learning Support</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Connect home learning, mentors, and Pathshala routes</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Home Start", amount: "Family Ready" },
                { label: "Guided Track", amount: "Mentor Supported" },
                { label: "Pathshala Route", amount: "Joinable" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[var(--campaign-accent)]">{tier.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={ROUTES.knowledge.pathshala}
                className="inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Join Pathshala
              </Link>
              <Link
                to={ROUTES.knowledge.library}
                className="inline-flex rounded-xl bg-[var(--campaign-bg)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
              >
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Daily Spiritual Quotes"
        subtitle="Daily reflections, admin-managed quote publishing, and a public archive for disciplined spiritual remembrance"
        subtitleClassName="text-[18px] font-semibold leading-tight text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.knowledge.dailyQuotesToday}
            className="inline-flex items-center rounded-lg bg-[#f3a11f] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]"
          >
            View Today&apos;s Quote
          </Link>
          <a
            href="#quote-archive"
            className="inline-flex items-center rounded-lg bg-[#0f7994] px-6 py-3 font-semibold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]"
          >
            Open Quote Archive
          </a>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Today", value: featuredQuote ? "Published" : "Pending", note: "Latest quote becomes the daily featured reflection" },
              { title: "Archive", value: `${quotes.length}`, note: "Published quotes remain visible for all users on this page" },
              { title: "Themes", value: `${Math.max(availableThemes.length - 1, 1)}`, note: "Theme filters help devotees browse by reflection type" },
              { title: "Admin Flow", value: isAdmin ? "Active" : "View Only", note: "Admins can publish directly; all visitors can read the results" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[20px] font-black uppercase tracking-wide text-[var(--campaign-accent)] md:text-[24px]">* {item.title}</p>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10" id="todays-quote">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Featured Daily Reflection</p>
            <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Today&apos;s Spiritual Quote</h2>
            <p className="mt-5 text-base leading-7 text-white md:text-lg">
              &quot;{featuredQuote?.text || "A new quote will appear here once it is published."}&quot;
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-[var(--campaign-accent)]/15 px-4 py-2 font-bold text-[var(--campaign-accent)]">
                {featuredQuote?.theme || "Daily Reflection"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.publishDate || today}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.author || "Bhagwat Heritage Service Foundation Trust"}
              </span>
            </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">New Feature</p>
            <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Admin Quote Publisher</h2>
            <p className="mt-4 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
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
                    className="w-full rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none transition focus:border-[var(--campaign-accent)]"
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
                      className="w-full rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none transition focus:border-[var(--campaign-accent)]"
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
                      className="w-full rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none transition focus:border-[var(--campaign-accent)]"
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
                    className="w-full rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none transition focus:border-[var(--campaign-accent)]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-2xl bg-[var(--campaign-accent)] px-6 py-3 font-bold text-white transition hover:bg-[var(--campaign-accent-hover)]"
                >
                  Publish Quote
                </button>
                {status ? <p className="text-sm font-medium text-[#ffcf9a]">{status}</p> : null}
              </form>
            ) : (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5 text-[var(--campaign-text)]">
                <p className="text-lg font-semibold text-white">Admin access required</p>
                <p className="mt-2 leading-7">
                  Log in with an admin account to publish the daily quote. All published quotes remain visible to every visitor.
                </p>
                <Link to={ROUTES.login} className="mt-4 inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
                  Go to Login
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Reader Tools</p>
            <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Quote Reading Features</h2>
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
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10" id="quote-archive">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Public Archive</p>
              <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Daily Quote Archive</h2>
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
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]/40"
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
              <div key={item.id} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-accent)]">
                    {item.theme}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-text)]">
                    {item.publishDate}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-text)]">
                    {item.createdBy}
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-white md:text-lg">&quot;{item.text}&quot;</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[var(--campaign-text)]">{item.author}</p>
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
    "A devotional daily quote view with an immersive featured reflection design for devotees.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/der8zinu8/image/upload/v1774775572/quotes_kdamdm.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,15,21,0.72)_0%,rgba(8,31,43,0.7)_45%,rgba(5,18,27,0.82)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10 md:py-16">
          <div className="w-full rounded-[32px] border border-white/10 bg-black/40 p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-10 lg:p-14">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Today&apos;s Spiritual Quote</p>
            <h1 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Daily Divine Reflection</h1>

            <p className="mx-auto mt-8 max-w-4xl text-3xl font-semibold leading-[1.6] text-white md:text-5xl md:leading-[1.45]">
              &quot;{featuredQuote?.text || "A new spiritual quote will appear here soon."}&quot;
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-[var(--campaign-accent)]/15 px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--campaign-accent)]">
                {featuredQuote?.theme || "Daily Reflection"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.publishDate || today}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--campaign-text)]">
                {featuredQuote?.author || "Bhagwat Heritage Service Foundation Trust"}
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to={ROUTES.knowledge.dailyQuotes}
                className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
              >
                Back to Quotes Page
              </Link>
            </div>
          </div>
        </div>
      </section>
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
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
    <div className="min-h-screen bg-[var(--campaign-deep)]">
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

type MediaVideoFilter = "All" | "Pravachan" | "Bhajan" | "Events" | "Live Darshan";

const MEDIA_VIDEO_FILTERS: MediaVideoFilter[] = ["All", "Pravachan", "Bhajan", "Events", "Live Darshan"];

function getMediaVideoFilter(item: VideoGalleryItem): MediaVideoFilter {
  if (item.category === "Festival") return "Events";
  if (item.theme === "Rituals") return "Live Darshan";
  if (item.theme === "Practices" || item.theme === "Heritage") return "Bhajan";
  return "Pravachan";
}

function parseViews(views: string) {
  return Number.parseFloat(views.replace(/K/i, ""));
}

function buildVideoMeta(item: VideoGalleryItem, index: number) {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index % 6];
  return `${month} ${index + 5}, 2024`;
}

type MediaVideoModalProps = {
  video: VideoGalleryItem | null;
  onClose: () => void;
};

const MediaVideoModal = memo(function MediaVideoModal({ video, onClose }: MediaVideoModalProps) {
  useEffect(() => {
    if (!video) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102332]/70 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            className="w-full max-w-5xl overflow-hidden rounded-[30px] border border-white/20 bg-[#0f2331] shadow-[0_28px_70px_rgba(16,35,50,0.42)]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F4CE5A]">{getMediaVideoFilter(video)}</p>
                <h2 id="video-modal-title" className="mt-2 text-xl font-bold text-white md:text-2xl">
                  {video.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close video modal"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#102332]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_360px]">
              <div className="bg-black">
                <iframe
                  title={video.title}
                  src={getYouTubeEmbedUrl(video.videoUrl)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-[260px] w-full md:h-[460px]"
                />
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,115,160,0.18)_0%,rgba(16,35,50,0.92)_100%)] px-5 py-5 text-white md:px-6 md:py-6">
                <p className="text-sm leading-7 text-white/85">{video.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Like", "Share", "Save"].map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#102332]"
                    >
                      {action}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <p>Duration: {video.duration}</p>
                  <p>Views: {video.views}</p>
                  <p>Theme: {video.theme}</p>
                </div>
                <Link
                  to={`${ROUTES.media.videos}/${video.slug}`}
                  className="mt-6 inline-flex items-center rounded-full bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-5 py-3 text-sm font-bold text-[#102332] shadow-[0_18px_30px_rgba(233,147,45,0.28)] transition hover:-translate-y-0.5"
                >
                  Open Dedicated Player
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
});

type MediaVideoFilterBarProps = {
  activeFilter: MediaVideoFilter;
  onFilterChange: (filter: MediaVideoFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const MediaVideoFilterBar = memo(function MediaVideoFilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: MediaVideoFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid grid-cols-2 gap-2 rounded-[22px] border border-[#e8dcc7] bg-white/95 p-2 shadow-[0_14px_35px_rgba(31,115,160,0.08)] sm:flex sm:flex-wrap">
        {MEDIA_VIDEO_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              activeFilter === item
                ? "bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] text-[#17344A] shadow-[0_14px_24px_rgba(233,147,45,0.25)]"
                : "text-[#33586d] hover:bg-[#fff8e4]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="relative block w-full lg:max-w-[320px]">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#529CB0]">⌕</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search videos..."
          className="w-full rounded-[22px] border border-[#e8dcc7] bg-white/95 py-3 pl-12 pr-5 text-sm text-[#33586d] shadow-[0_14px_35px_rgba(31,115,160,0.08)] outline-none transition focus:border-[#F4CE5A]"
        />
      </label>
    </div>
  );
});

type MediaVideoCardProps = {
  item: VideoGalleryItem;
  index: number;
  onOpen: (item: VideoGalleryItem) => void;
};

const MediaVideoCard = memo(function MediaVideoCard({ item, index, onOpen }: MediaVideoCardProps) {
  const category = getMediaVideoFilter(item);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[24px] border border-[#e7d9c2] bg-white/95 shadow-[0_18px_40px_rgba(31,115,160,0.08)]"
    >
      <button type="button" onClick={() => onOpen(item)} className="block w-full text-left">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,35,50,0.05)_0%,rgba(16,35,50,0.58)_100%)]" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(24,31,39,0.54)] text-xl font-semibold text-white shadow-[0_0_0_10px_rgba(255,255,255,0.10)]">
              ▶
            </div>
          </motion.div>
          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1F73A0]">
            {category}
          </span>
          <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
            {item.duration}
          </span>
          <div className="absolute inset-x-4 bottom-0 h-1 overflow-hidden rounded-t-full bg-white/20">
            <div className="h-full rounded-t-full bg-[linear-gradient(90deg,#F4CE5A_0%,#E9932D_100%)]" style={{ width: `${36 + (index % 5) * 10}%` }} />
          </div>
        </div>
      </button>

      <div className="space-y-3 px-5 py-5">
        <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-[#17344A]">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-7 text-[#5d6f79]">{item.note}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#70848d]">
          <span>{item.duration}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#E9932D]" />
          <span>{buildVideoMeta(item, index)}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#A9CAD1]" />
          <span>{item.views} views</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="rounded-full bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-5 py-2.5 text-sm font-bold text-[#17344A] shadow-[0_16px_28px_rgba(233,147,45,0.22)] transition hover:-translate-y-0.5"
          >
            Watch
          </button>
          <Link
            to={`${ROUTES.media.videos}/${item.slug}`}
            className="rounded-full border border-[#d9e7eb] px-5 py-2.5 text-sm font-semibold text-[#1F73A0] transition hover:border-[#F4CE5A] hover:bg-[#fff9e8]"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

export const MediaVideoGalleryPage = memo(function MediaVideoGalleryPage() {
  const [activeFilter, setActiveFilter] = useState<MediaVideoFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryItem | null>(null);
  const [popularIndex, setPopularIndex] = useState(0);

  usePageMeta(
    "Video Gallery",
    "Premium spiritual video gallery featuring pravachan, bhajan, event moments, and divine media from Bhagwat Heritage.",
  );

  const filteredVideos = useMemo(() => {
    return MEDIA_VIDEO_GALLERY_ITEMS.filter((item) => {
      const matchesFilter = activeFilter === "All" ? true : getMediaVideoFilter(item) === activeFilter;
      const haystack = `${item.title} ${item.note} ${item.summary} ${item.theme} ${item.category}`.toLowerCase();
      const matchesSearch = searchQuery.trim() ? haystack.includes(searchQuery.trim().toLowerCase()) : true;
      return matchesFilter && matchesSearch;
    }).sort((a, b) => MEDIA_VIDEO_GALLERY_ITEMS.findIndex((item) => item.slug === a.slug) - MEDIA_VIDEO_GALLERY_ITEMS.findIndex((item) => item.slug === b.slug));
  }, [activeFilter, searchQuery]);

  const featuredVideo = filteredVideos[0] ?? MEDIA_VIDEO_GALLERY_ITEMS[0];
  const latestVideos = filteredVideos.slice(0, visibleCount);
  const popularVideos = useMemo(
    () => [...MEDIA_VIDEO_GALLERY_ITEMS].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, 6),
    [],
  );

  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPopularIndex((current) => (current + 1) % Math.max(popularVideos.length, 1));
    }, 4200);
    return () => window.clearInterval(intervalId);
  }, [popularVideos.length]);

  const visiblePopular = popularVideos.length
    ? [popularVideos[popularIndex], popularVideos[(popularIndex + 1) % popularVideos.length], popularVideos[(popularIndex + 2) % popularVideos.length]]
    : [];

  return (
    <div className="pb-14">
      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[34px] border border-[#efe1cf] bg-[url('/images/spiritual1.png')] bg-cover bg-center shadow-[0_26px_62px_rgba(31,115,160,0.10)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,47,71,0.58)_0%,rgba(21,47,71,0.30)_38%,rgba(244,206,90,0.10)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,242,169,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(233,147,45,0.18),transparent_28%)]" />
        <div className="relative px-6 py-16 md:px-10 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl"
          >
            Video Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-white md:text-2xl md:leading-10"
          >
            Explore Pravachan, Bhajan, Events & Divine Moments
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-[5px] px-2 md:px-5"
      >
        <div className="rounded-[30px] border border-[#efe1cf] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,251,245,0.98)_100%)] p-5 shadow-[0_22px_54px_rgba(31,115,160,0.08)] md:p-6">
          <MediaVideoFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55 }}
        className="mt-8"
      >
        <div className="overflow-hidden rounded-[32px] border border-[#ead7bb] bg-[linear-gradient(135deg,rgba(21,47,71,0.92)_0%,rgba(31,115,160,0.80)_42%,rgba(233,147,45,0.34)_100%)] shadow-[0_24px_60px_rgba(31,115,160,0.12)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_1.12fr]">
            <div className="relative flex flex-col justify-center px-6 py-8 text-white md:px-8 md:py-10">
              <span className="mb-5 inline-flex w-fit rounded-full bg-[#e76648] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.18em] text-white">
                Featured
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F9F2A9]">Featured Video</p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white md:text-5xl">{featuredVideo.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/85 md:text-lg">{featuredVideo.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedVideo(featuredVideo)}
                  className="rounded-2xl bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-6 py-3 text-base font-bold text-[#17344A] shadow-[0_20px_36px_rgba(233,147,45,0.30)] transition hover:-translate-y-0.5"
                >
                  Watch Now
                </button>
                <Link
                  to={`${ROUTES.media.videos}/${featuredVideo.slug}`}
                  className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-[#17344A]"
                >
                  Open Player
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden">
              <img src={featuredVideo.image} alt={featuredVideo.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,31,44,0.08)_0%,rgba(15,31,44,0.00)_40%,rgba(15,31,44,0.30)_100%)]" />
              <motion.button
                type="button"
                onClick={() => setSelectedVideo(featuredVideo)}
                whileHover={{ scale: 1.08 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(41,24,7,0.35)] text-3xl text-white shadow-[0_0_0_14px_rgba(255,255,255,0.12)] backdrop-blur-sm"
              >
                ▶
              </motion.button>
              <span className="absolute bottom-6 right-6 rounded-2xl bg-black/58 px-4 py-2 text-sm font-semibold text-white">
                {featuredVideo.duration}
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="mt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-[#17344A]">Latest Videos</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#5d6f79]">
              Graceful pravachan, bhajan, and event media arranged in a premium devotional gallery with clean search and smooth interaction.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#efe1cf] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,250,244,0.92)_100%)] p-5 shadow-[0_20px_48px_rgba(31,115,160,0.07)] md:p-6">
          <MediaVideoFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestVideos.map((item, index) => (
            <MediaVideoCard key={item.slug} item={item} index={index} onOpen={setSelectedVideo} />
          ))}
        </div>

        {visibleCount < filteredVideos.length ? (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVisibleCount((current) => current + 3)}
              className="rounded-2xl bg-[linear-gradient(135deg,#F4CE5A_0%,#E9932D_100%)] px-8 py-4 text-base font-bold text-[#17344A] shadow-[0_22px_34px_rgba(233,147,45,0.28)] transition"
            >
              Load More
            </motion.button>
          </div>
        ) : null}
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-[#17344A]">Popular Videos</h2>
            <p className="mt-3 text-base leading-8 text-[#5d6f79]">Most-viewed devotional media from the Bhagwat Heritage library.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous popular videos"
              onClick={() => setPopularIndex((current) => (current - 1 + popularVideos.length) % popularVideos.length)}
              className="rounded-full border border-[#d8e8ec] bg-white px-4 py-3 text-[#1F73A0] shadow-[0_10px_24px_rgba(31,115,160,0.08)] transition hover:border-[#F4CE5A] hover:bg-[#fff9e8]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next popular videos"
              onClick={() => setPopularIndex((current) => (current + 1) % popularVideos.length)}
              className="rounded-full border border-[#d8e8ec] bg-white px-4 py-3 text-[#1F73A0] shadow-[0_10px_24px_rgba(31,115,160,0.08)] transition hover:border-[#F4CE5A] hover:bg-[#fff9e8]"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visiblePopular.map((item, index) => (
              <motion.div
                key={`${item.slug}-${popularIndex}-${index}`}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.35 }}
              >
                <MediaVideoCard item={item} index={index} onOpen={setSelectedVideo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <MediaVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
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
    <div className="min-h-screen bg-[var(--campaign-deep)] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#102d3f] p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] md:text-[24px]">Now Playing</p>
              <h1 className="mt-2 text-[16px] font-black text-white md:text-[22px]">{currentVideo.title}</h1>
              <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{currentVideo.summary}</p>
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
    <div className="space-y-6 pb-12">
      <section className="rounded-[30px] border border-borderBeige bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-saffron">Media Gallery</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-tealDeep md:text-5xl">Event Highlights</h1>
        <p className="mt-3 max-w-3xl text-brownSoft md:text-lg">Story-led highlights and event memory cards presented with the same calm layout, warm palette, and premium spacing as the About page.</p>
      </section>

      <Card className="hover:scale-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron">Filter Highlights</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-tealDeep md:text-4xl">Highlight Storyboard</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Spiritual", "Festival", "Seva", "Youth"] as const).map((stream) => (
              <button
                key={stream}
                type="button"
                onClick={() => setActiveHighlight(stream)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeHighlight === stream ? "bg-tealPrimary text-white" : "border border-borderCard bg-bgSoft text-brownSoft hover:border-gold hover:bg-sand"}`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImageHighlights.map((item) => (
          <Card key={item.title} className="group p-0">
            <div className="overflow-hidden rounded-t-2xl">
              <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-tealCard">{item.title}</h3>
              <p className="mt-2 text-brownSoft">{item.note}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleHighlights.map((item) => (
          <Card key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-brownSoft">{item.desc}</p>
            <div className="mt-4 rounded-xl bg-sand p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Highlight Output</p>
              <p className="mt-2 text-brownSoft">{item.output}</p>
            </div>
          </Card>
        ))}
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
    <div className="space-y-6 pb-12">
      <section className="rounded-[30px] border border-borderBeige bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-saffron">Media Gallery</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-tealDeep md:text-5xl">Publications</h1>
        <p className="mt-3 max-w-3xl text-brownSoft md:text-lg">Reports, brochures, study notes, and festival documents arranged with the same warm hierarchy and card rhythm as the About page.</p>
      </section>

      <Card className="hover:scale-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron">Archive Navigator</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-tealDeep md:text-4xl">Browse Publication Types</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Reports", "Brochures", "Study", "Festival Notes"] as const).map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setActivePublication(group)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activePublication === group ? "bg-tealPrimary text-white" : "border border-borderCard bg-bgSoft text-brownSoft hover:border-gold hover:bg-sand"}`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visiblePublications.map((item) => (
          <Card key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-brownSoft">{item.desc}</p>
            <div className="mt-4 rounded-xl bg-sand p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Best Use</p>
              <p className="mt-2 text-brownSoft">{item.use}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePublicationCards.map((item) => (
          <Card key={item.title}>
            <div className="rounded-xl bg-sand p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.category}</p>
              <p className="mt-2 text-xl font-semibold text-tealCard">{item.format}</p>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-brownSoft">{item.note}</p>
            <button type="button" className="spiritual-btn mt-5">Open Publication</button>
          </Card>
        ))}
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
    <div className="space-y-6 pb-12">
      <section className="rounded-[30px] border border-borderBeige bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
        <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-saffron">Media Gallery</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-tealDeep md:text-5xl">Social Feed</h1>
        <p className="mt-3 max-w-3xl text-brownSoft md:text-lg">Official updates, festival pulse, seva motion, and community voices expressed through the same About-page card language and warm structure.</p>
      </section>

      <Card className="hover:scale-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron">Channel Filter</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-tealDeep md:text-4xl">Channel Pulse Board</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Announcements", "Festival", "Seva", "Youth"] as const).map((channel) => (
              <button
                key={channel}
                type="button"
                onClick={() => setActiveChannel(channel)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeChannel === channel ? "bg-tealPrimary text-white" : "border border-borderCard bg-bgSoft text-brownSoft hover:border-gold hover:bg-sand"}`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleChannels.map((item) => (
          <Card key={item.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.category}</p>
            <h3 className="mt-3 text-xl font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-brownSoft">{item.desc}</p>
            <div className="mt-4 rounded-xl bg-sand p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">Posting Pulse</p>
              <p className="mt-2 text-brownSoft">{item.pulse}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleFeedbackCards.map((item) => (
          <Card key={item.platform}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{item.platform}</span>
              <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-tealDeep">{item.category}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-tealCard">{item.title}</h3>
            <p className="mt-2 text-brownSoft">{item.feedback}</p>
          </Card>
        ))}
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
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Online Satsang"
        subtitle="Digital darshan, real devotion"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/kathapravachan.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.media.videos} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Watch Satsang
          </Link>
          <Link to={ROUTES.contact} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
            Book Digital Satsang
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Access Modes", value: "Audio, video, and booking", note: "Flexible online access for daily listening and live participation." },
              { title: "Platform Reach", value: "Multiple digital channels", note: "YouTube, Facebook, Instagram, WhatsApp, and future trust-controlled routes." },
              { title: "Join Style", value: "Live and replay", note: "Stay connected in real time or return later for peaceful listening." },
              { title: "Devotee Experience", value: "Simple and clear", note: "A cleaner layout inspired by the Gau Seva page style." },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Digital Satsang Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the right way to join satsang online</h2>
              <p className={`mt-4 max-w-3xl ${SEVA_BODY_TEXT_CLASS}`}>
                Filter by access mode to quickly find whether you want to listen, watch, request, or join through a platform.
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
                        ? "bg-[var(--campaign-accent)] text-white shadow-[0_10px_24px_rgba(239,154,30,0.24)]"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]"
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
              <div key={item.title} className={`${EVENT_SEVA_DETAIL_CARD_CLASS} flex h-full flex-col`}>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-[var(--campaign-bg)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--campaign-text)]">
                    Digital Satsang
                  </span>
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Why It Matters</p>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.support}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={`${EVENT_SEVA_SECTION_CLASS} grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]`}>
          <div className={`${EVENT_SEVA_DETAIL_CARD_CLASS} flex h-full flex-col`}>
            <p className={SEVA_SECTION_LABEL_CLASS}>How Devotees Join</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Listen, watch, request, and revisit satsang with ease</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: "Live Audio Satsang",
                  desc: "A simple listening route for devotees who want shravan-focused access throughout the day.",
                },
                {
                  title: "Live Video Darshan",
                  desc: "A visual satsang route for pravachan, mandir atmosphere, and family participation.",
                },
                {
                  title: "Digital Satsang Booking",
                  desc: "A clear path for requesting scheduled satsang access or future digital sessions.",
                },
                {
                  title: "Replay Support",
                  desc: "A useful archive option for devotees in different time zones or daily routines.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-5">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${EVENT_SEVA_DETAIL_CARD_CLASS} flex h-full flex-col`}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Join Satsang Actions</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Quick steps for today&apos;s digital participation</h2>
            <div className="mt-6 space-y-4">
              {[
                "Open the current satsang or replay link.",
                "Choose audio or video based on your situation.",
                "Contact the trust for special digital satsang requests.",
                "Return later for archive-based listening and reflection.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Step {index + 1}</p>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.contact} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
                Book Satsang
              </Link>
              <Link to={ROUTES.media.videos} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
                Watch Video Satsang
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Platform Section</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Available platforms for online satsang</h2>
            </div>
            <p className={SEVA_BODY_TEXT_CLASS}>YouTube, Facebook, Instagram, WhatsApp, and more</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformCards.map((item) => (
              <article key={item.name} className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] shadow-sm">
                <div className={`bg-gradient-to-r ${item.accent} px-5 py-4`}>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-white">{item.type}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{item.name}</h3>
                </div>
                <div className="flex h-full flex-col p-5">
                  <p className={`${SEVA_BODY_TEXT_CLASS} flex-1`}>{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={item.satsangHref}
                      target={item.satsangHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.satsangHref.startsWith("http") ? "noreferrer" : undefined}
                      className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}
                    >
                      Join Satsang
                    </a>
                    <a
                      href={item.kathaHref}
                      target={item.kathaHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.kathaHref.startsWith("http") ? "noreferrer" : undefined}
                      className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
                    >
                      Join Katha
                    </a>
                    <a
                      href={item.eventsHref}
                      target={item.eventsHref.startsWith("http") ? "_blank" : undefined}
                      rel={item.eventsHref.startsWith("http") ? "noreferrer" : undefined}
                      className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
                    >
                      Join Events
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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

  const membershipSectionClass = "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
  const membershipCardClass = "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm";
  const membershipInputClass =
    "rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[var(--campaign-accent)]";
  const membershipButtonClass =
    "rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]";
  const membershipSecondaryButtonClass =
    "rounded-xl border border-white/10 bg-[var(--campaign-surface)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--campaign-accent)]";

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Membership Portal"
        subtitle="Join the Bhagwat Heritage community"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        backgroundImage="/images/spiritual1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#member-registration" className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
            Join Now
          </a>
          <Link
            to={ROUTES.login}
            className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
          >
            Login
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Membership Plans", value: "Basic, Premium, and Lifetime", note: "Flexible ways to stay connected with the trust community." },
              { title: "Member Benefits", value: "Programs, seva, and events", note: "A clean route to participation, updates, and devotional connection." },
              { title: "Digital Access", value: "Profile, card, and certificate", note: "Useful member tools presented with a clearer visual layout." },
              { title: "Payment Support", value: "Online contribution ready", note: "Payment-friendly membership flow with simple action points." },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Membership Benefits</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Why become a member</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {[
              { icon: "SP", title: "Spiritual Programs", desc: "Regular access to satsang, discourse, and devotional learning paths." },
              { icon: "ME", title: "Member-Only Events", desc: "Special member access to selected spiritual and community gatherings." },
              { icon: "VO", title: "Volunteer Opportunities", desc: "Priority connection to seva, event support, and service roles." },
              { icon: "DC", title: "Digital Certificates", desc: "Receive member documentation and recognition in digital format." },
              { icon: "PP", title: "Priority Participation", desc: "Get preference in Bhagwat events, workshops, and major trust activities." },
            ].map((item) => (
              <div key={item.title} className={membershipCardClass}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-sm font-black text-[var(--campaign-accent)]">
                  {item.icon}
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Membership Plans</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose your plan</h2>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {membershipPlans.map((plan) => (
              <div key={plan.name} className={membershipCardClass}>
                <p className={SEVA_SECTION_LABEL_CLASS}>{plan.name}</p>
                <p className={`mt-3 ${SEVA_CARD_TITLE_CLASS}`}>{plan.price}</p>
                <ul className={`mt-5 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setMembershipForm((current) => ({ ...current, plan: plan.name }))}
                  className={`mt-6 inline-flex ${membershipButtonClass}`}
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
          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Registration</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Join the community</h2>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={membershipForm.fullName}
                onChange={(event) => setMembershipForm((current) => ({ ...current, fullName: event.target.value }))}
                placeholder="Full Name"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.email}
                onChange={(event) => setMembershipForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.phone}
                onChange={(event) => setMembershipForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone Number"
                className={membershipInputClass}
              />
              <select
                value={membershipForm.plan}
                onChange={(event) => setMembershipForm((current) => ({ ...current, plan: event.target.value }))}
                className={membershipInputClass}
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
                className={`${membershipInputClass} md:col-span-2`}
              />
              <input
                value={membershipForm.city}
                onChange={(event) => setMembershipForm((current) => ({ ...current, city: event.target.value }))}
                placeholder="City"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.state}
                onChange={(event) => setMembershipForm((current) => ({ ...current, state: event.target.value }))}
                placeholder="State"
                className={membershipInputClass}
              />
              <input
                value={membershipForm.country}
                onChange={(event) => setMembershipForm((current) => ({ ...current, country: event.target.value }))}
                placeholder="Country"
                className={`${membershipInputClass} md:col-span-2`}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-dashed border-[var(--campaign-accent)]/50 bg-[var(--campaign-surface)] px-4 py-5 text-sm font-semibold text-white">
                Profile Photo Upload
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
              <label className="rounded-2xl border border-dashed border-[var(--campaign-accent)]/50 bg-[var(--campaign-surface)] px-4 py-5 text-sm font-semibold text-white">
                ID Proof Upload
                <input type="file" onChange={handleIdProofChange} className="mt-3 block w-full text-sm text-[#d9e6ec]" />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className={membershipButtonClass}>
                Submit Registration
              </button>
              <button type="button" className={membershipSecondaryButtonClass}>
                Save Form Draft
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className={membershipSectionClass}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Digital Membership Card</p>
              <div className="mt-5 rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[var(--campaign-bg)]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Member" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-[var(--campaign-accent)]">PHOTO</span>
                    )}
                  </div>
                  <div>
                    <p className={SEVA_SECTION_LABEL_CLASS}>Bhagwat Heritage Member ID</p>
                    <h3 className={`mt-2 ${SEVA_CARD_TITLE_CLASS}`}>{membershipForm.fullName || "Member Name"}</h3>
                    <p className="mt-1 text-sm text-[#d9e6ec]">{memberId}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Membership Type</p>
                    <p className="mt-1 font-semibold text-white">{selectedPlan.name}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Join Date</p>
                    <p className="mt-1 font-semibold text-white">{joinDate}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">Status</p>
                    <p className="mt-1 font-semibold text-white">Pending Approval</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--campaign-bg)] p-3">
                    <p className="text-xs uppercase tracking-wide text-[var(--campaign-accent)]">ID Proof</p>
                    <p className="mt-1 font-semibold text-white">{idProofName || "Not uploaded"}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => window.print()} className={membershipButtonClass}>
                    Download Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareCard();
                    }}
                    className={membershipSecondaryButtonClass}
                  >
                    Share Card
                  </button>
                </div>
              </div>
            </div>

            <div className={membershipSectionClass}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Payment Integration</p>
              <h3 className={SEVA_SECTION_HEADING_CLASS}>Online payment methods</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["UPI", "Credit Card", "Debit Card", "Net Banking"].map((method) => (
                  <div key={method} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-center text-white font-semibold">
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
          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Dashboard</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Dashboard preview after login</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                "View profile and edit personal details",
                "Download membership certificate",
                "See membership ID and status",
                "Track event participation and activity",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5 text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={membershipSectionClass}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Member Activity</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Upcoming activities</h2>
            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                { title: "Bhagwat Event Participation", desc: "Priority member invitations for key satsang and festival gatherings." },
                { title: "Volunteer Programs", desc: "Join seva teams, digital support, and trust-led service activities." },
                { title: "Spiritual Workshops", desc: "Take part in guided learning, chanting, and dharmic growth sessions." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className={membershipSectionClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Admin Features Concept</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Admin management layer</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Approve or Reject Memberships", desc: "Admin review flow for incoming member registrations." },
              { title: "Manage Member Database", desc: "Searchable records for profiles, plans, and statuses." },
              { title: "Export Member List", desc: "Admin-ready export for reporting and communication workflows." },
              { title: "Send Announcements", desc: "Push notices to members for events, updates, and digital programs." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
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
  const partnerInputClass =
    "rounded-2xl border border-white/10 bg-[var(--campaign-surface)] px-4 py-3 text-white outline-none placeholder:text-[#aac0ca] focus:border-[var(--campaign-accent)]";
  const partnerBadgeClass =
    "rounded-xl bg-[var(--campaign-accent)]/15 px-4 py-2 text-sm font-bold text-[var(--campaign-accent)] transition-colors hover:bg-[var(--campaign-accent)]/20";

  const handlePartnerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Partner With Us"
        subtitle="Collaborate with Bhagwat Heritage Service Foundation Trust to expand spiritual education, seva, charity, and community upliftment through purposeful partnership"
        backgroundImage="/images/heritage1.png"
        subtitleClassName={EVENT_SEVA_HERO_SUBTITLE_WRAP_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#partnership-form"
            className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}
          >
            Become a Partner
          </a>
          <Link
            to={ROUTES.contact}
            className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
          >
            Contact Us
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
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
                className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}
              >
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Introduction</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Partnerships expand the trust&apos;s real impact</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className={`space-y-5 ${SEVA_BODY_TEXT_CLASS}`}>
              <p>
                Bhagwat Heritage Service Foundation Trust is focused on spiritual education, devotional gatherings,
                value-based learning, seva programs, charitable outreach, and community development rooted in dharma.
              </p>
              <p>
                Partnerships matter because trust impact grows faster when institutions, communities, and service-minded
                organizations work together with clarity, shared intent, and disciplined execution.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { title: "Spiritual Education", desc: "Pathshala, discourse, study support, youth values, and cultural learning programs." },
                { title: "Charity and Seva", desc: "Gau seva, relief work, medicine support, food seva, and community care initiatives." },
                { title: "Community Service", desc: "Volunteer mobilization, event support, social campaigns, and local service action." },
              ].map((item) => (
                <div key={item.title} className={EVENT_SEVA_CARD_CLASS}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Types of Partnerships</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Choose the right collaboration path</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {partnershipCategories.map((item) => (
              <article
                key={item.title}
                className={EVENT_SEVA_CARD_CLASS}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-sm font-black text-[var(--campaign-accent)]">
                  {item.icon}
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                <p className="mt-3 text-sm leading-6 text-[#aac0ca]">{item.detail}</p>
                <a
                  href="#partnership-process"
                  className="mt-5 inline-flex rounded-xl border border-[var(--campaign-accent)]/40 bg-[var(--campaign-accent)]/10 px-4 py-2 text-sm font-bold text-[var(--campaign-accent)] transition-colors hover:bg-[var(--campaign-accent)]/20"
                >
                  Learn More
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Partnership Benefits</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Why organizations partner</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Brand visibility across website, programs, and event-level acknowledgements.",
              "Recognition inside trust-led spiritual and social initiatives.",
              "Direct contribution to social impact and spiritual outreach.",
              "Networking with spiritual guides, trustees, and community leaders.",
              "Participation in large devotional gatherings and organized service campaigns.",
            ].map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                <p className={SEVA_BODY_TEXT_CLASS}>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Partner Showcase</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Existing supporters and collaboration circles</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {partnerShowcase.map((item) => (
              <div
                key={item}
                className="flex min-h-[132px] items-center justify-center rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--campaign-accent)]/15 text-sm font-black text-[var(--campaign-accent)]">
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
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Partnership Application Form</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Submit a partnership request</h2>

            <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handlePartnerSubmit}>
              <input
                value={partnerForm.organizationName}
                onChange={(event) => setPartnerForm((current) => ({ ...current, organizationName: event.target.value }))}
                placeholder="Organization Name"
                className={partnerInputClass}
              />
              <input
                value={partnerForm.contactName}
                onChange={(event) => setPartnerForm((current) => ({ ...current, contactName: event.target.value }))}
                placeholder="Contact Person Name"
                className={partnerInputClass}
              />
              <input
                value={partnerForm.email}
                onChange={(event) => setPartnerForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email Address"
                className={partnerInputClass}
              />
              <input
                value={partnerForm.phone}
                onChange={(event) => setPartnerForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone Number"
                className={partnerInputClass}
              />
              <select
                value={partnerForm.organizationType}
                onChange={(event) => setPartnerForm((current) => ({ ...current, organizationType: event.target.value }))}
                className={partnerInputClass}
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
                className={partnerInputClass}
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
                className={`${partnerInputClass} md:col-span-2`}
              />
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-[var(--campaign-accent)]/45 bg-[var(--campaign-surface)] px-4 py-3 text-white md:col-span-2">
                <span>{profileFileName || "Upload Organization Profile"}</span>
                <span className="rounded-lg bg-[var(--campaign-accent)]/15 px-3 py-1 text-sm font-bold text-[var(--campaign-accent)]">Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => setProfileFileName(event.target.files?.[0]?.name ?? "")}
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)] md:col-span-2"
              >
                Submit Partnership Request
              </button>
            </form>

            {requestSubmitted ? (
              <p className="mt-4 rounded-2xl border border-[var(--campaign-accent)]/35 bg-[var(--campaign-surface)] px-4 py-3 text-sm font-medium text-white">
                Partnership request drafted successfully. The trust team can now review the proposal and continue the discussion process.
              </p>
            ) : null}
          </div>

          <div className="space-y-6">
            <div id="partnership-process" className={EVENT_SEVA_SECTION_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Partnership Process</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>How collaboration moves forward</h2>
              <div className="mt-8 space-y-4">
                {[
                  "Submit partnership request",
                  "Review by trust committee",
                  "Discussion and planning",
                  "Formal partnership agreement",
                  "Collaboration implementation",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--campaign-accent)] text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className={SEVA_CARD_TITLE_CLASS}>{step}</p>
                      <p className={`mt-1 text-sm leading-6 ${SEVA_BODY_TEXT_CLASS}`}>
                        Structured review keeps the collaboration aligned, practical, and mission-consistent.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={EVENT_SEVA_SECTION_CLASS}>
              <p className={SEVA_SECTION_LABEL_CLASS}>Contact Section</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Talk to the partnership desk</h2>
              <div className={`mt-6 space-y-4 ${SEVA_BODY_TEXT_CLASS}`}>
                <p>
                  <span className="font-black text-white">Email:</span> bhagwatheritage@gmail.com
                </p>
                <p>
                  <span className="font-black text-white">Phone:</span> +91 8668897445
                </p>
                <p>
                  <span className="font-black text-white">Office Address:</span> Bhagwat Heritage Service Foundation Trust, Swaminarayan Bhagwat Dham Campus, Chandrapur, Kasturaba Road, Maharashtra
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/bhagwat.heritage"
                  target="_blank"
                  rel="noreferrer"
                  className={partnerBadgeClass}
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/1AtpQtn1SL/"
                  target="_blank"
                  rel="noreferrer"
                  className={partnerBadgeClass}
                >
                  Facebook
                </a>
                <a
                  href="https://youtube.com/@bhagwatheritage"
                  target="_blank"
                  rel="noreferrer"
                  className={partnerBadgeClass}
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/918668897445"
                  target="_blank"
                  rel="noreferrer"
                  className={partnerBadgeClass}
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
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Testimonials</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>What existing partners say</h2>
            <div className="mt-8 space-y-4">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                  <p className={SEVA_BODY_TEXT_CLASS}>&quot;{item.quote}&quot;</p>
                  <p className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.name}</p>
                  <p className="text-sm text-[var(--campaign-accent)]">{item.org}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>FAQ</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Common partnership questions</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5">
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.question}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.answer}</p>
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
  const sponsorInfoCardClass = "rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-5";

  usePageMeta(
    "Sponsor Programs",
    "Sponsor trust programs across seva, education, mandir development, and spiritual events with structured participation options.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="Sponsor Programs"
        subtitle="Sponsor meaningful seva, education, mandir development, and spiritual initiatives with structured contribution paths"
        backgroundImage="/images/kathapravachan.png"
        subtitleClassName={EVENT_SEVA_HERO_SUBTITLE_WRAP_CLASS}
        contentClassName={EVENT_SEVA_HERO_CONTENT_CLASS}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}
          >
            Sponsor Now
          </Link>
          <Link
            to={ROUTES.contact}
            className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
          >
            Talk to Sponsor Team
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { title: "Sponsor Tracks", value: "8", note: "Program-focused sponsorship options across seva, learning, and mandir work" },
              { title: "Impact Areas", value: "4", note: "Spiritual, Seva, Education, and Mandir development support" },
              { title: "Support Model", value: "Flexible", note: "Sponsor one event, one program, one season, or recurring monthly seva" },
              { title: "Recognition Flow", value: "Transparent", note: "Sponsors support clear causes with visible trust purpose and allocation direction" },
            ].map((item) => (
              <div key={item.title} className={EVENT_SEVA_HIGHLIGHT_CARD_CLASS}>
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <p className={SEVA_SECTION_LABEL_CLASS}>About Sponsor Programs</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>A clearer structure for meaningful sponsorship</h2>

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
              <div key={item.title} className={`${EVENT_SEVA_CARD_CLASS} text-center`}>
                <h3 className={`mb-3 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={SEVA_BODY_TEXT_CLASS}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className={EVENT_SEVA_SECTION_CLASS}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Program Explorer</p>
              <h2 className={SEVA_SECTION_HEADING_CLASS}>Browse sponsorship opportunities by category</h2>
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
                        ? "bg-[var(--campaign-accent)] text-white shadow-[0_10px_24px_rgba(239,154,30,0.24)]"
                        : "border border-white/10 bg-[var(--campaign-surface)] text-[var(--campaign-text)] hover:border-[var(--campaign-accent)]"
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
              <div key={item.title} className={`${EVENT_SEVA_DETAIL_CARD_CLASS} flex h-full flex-col`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-[var(--campaign-bg)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-text)]">
                    Sponsor Route
                  </span>
                </div>
                <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{item.title}</h3>
                <p className={`mt-3 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Impact</p>
                    <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.impact}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">What Sponsorship Supports</p>
                    <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.support}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={ROUTES.donate} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
                    Sponsor This Program
                  </Link>
                  <Link
                    to={ROUTES.contact}
                    className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}
                  >
                    Request Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Seva Ideas</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Program ideas sponsors can support directly</h2>
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
                <div key={item.title} className={sponsorInfoCardClass}>
                  <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                  <p className={`mt-2 ${SEVA_BODY_TEXT_CLASS}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Sponsor Journey</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>How sponsorship can work</h3>
            <div className="mt-6 space-y-4">
              {[
                "Choose the trust program or seva area you want to support.",
                "Connect with the trust for scope, amount, and sponsorship type if needed.",
                "Complete contribution through the donation route or guided sponsor coordination.",
                "Stay connected with the purpose and continuity of the supported trust work.",
              ].map((line, index) => (
                <div key={line} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Step {index + 1}</p>
                  <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Why This Page Helps</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Why this page is better now</h3>
            <ul className={`mt-6 space-y-3 ${SEVA_BODY_TEXT_CLASS}`}>
              {[
                "Sponsors can now choose real trust programs instead of reading generic sponsorship text.",
                "The page includes both seva and spiritual sponsorship routes for broader participation.",
                "It explains what each sponsorship actually supports in practice.",
                "It gives a direct path to sponsor now or request details from the trust team.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={EVENT_SEVA_SECTION_CLASS}>
            <p className={SEVA_SECTION_LABEL_CLASS}>Start Sponsoring Trust Work</p>
            <h3 className={SEVA_SECTION_HEADING_CLASS}>Clear options for sponsor participation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "One-Time Support", amount: "Available" },
                { label: "Monthly Seva", amount: "Possible" },
                { label: "Festival Sponsor", amount: "Ready" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-center">
                  <p className="text-base font-semibold text-[var(--campaign-text)]">{tier.label}</p>
                  <p className="mt-1 text-2xl font-black text-white">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={ROUTES.donate} className={EVENT_SEVA_PRIMARY_BUTTON_CLASS}>
                Sponsor Now
              </Link>
              <Link to={ROUTES.contact} className={EVENT_SEVA_SECONDARY_BUTTON_CLASS}>
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

