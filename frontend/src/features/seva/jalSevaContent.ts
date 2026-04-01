import type { Campaign } from "../../types";

export type SevaVisualKey =
  | "meal"
  | "water"
  | "heart"
  | "shield"
  | "community"
  | "spark";

export interface ProgramCardContent {
  title: string;
  description: string;
  cost: string;
  impact: string;
}

export interface SponsorshipOption {
  title: string;
  amount: number;
  impact: string;
  donationType: "Annadaan" | "Jal Seva" | "Both";
}

export interface TestimonialStory {
  name: string;
  role: string;
  quote: string;
  accent: string;
}

export interface SevaHighlight {
  title: string;
  description: string;
  badge: string;
  icon: SevaVisualKey;
}

export interface SevaCatalogItem {
  title: string;
  description: string;
  supportLine: string;
  icon: SevaVisualKey;
}

export interface SevaFlowStep {
  step: string;
  title: string;
  description: string;
}

export interface SevaReachItem {
  title: string;
  description: string;
  focus: string;
  icon: SevaVisualKey;
}

export interface SevaFaqItem {
  question: string;
  answer: string;
}

export const ANNADAAN_PROGRAMS: ProgramCardContent[] = [
  {
    title: "Daily Meal Service",
    description: "Daily meal support for devotees, labourers, and families in need.",
    cost: "Rs. 51 / 101 / 501",
    impact: "",
  },
  {
    title: "Festival Meal Offering",
    description: "Support special meal service during festivals, holy events, and devotional gatherings.",
    cost: "Rs. 1,001 onwards",
    impact: "One festival offering can support meals for many families",
  },
  {
    title: "Monthly Sponsorship",
    description: "Regular monthly support for planned meal distribution and ongoing food relief.",
    cost: "Rs. 3,001 onwards",
    impact: "Helps sustain meal support throughout the month",
  },
  {
    title: "Special Occasion",
    description: "Mark birthdays, remembrance days, and anniversaries through meaningful meal support.",
    cost: "Rs. 1,100 onwards",
    impact: "Turn a meaningful occasion into blessing and nourishment for others",
  },
];

export const JAL_SEVA_PROGRAMS: ProgramCardContent[] = [
  {
    title: "Summer Water Camp",
    description: "A seasonal water relief camp for people facing heat, thirst, and difficult summer conditions.",
    cost: "Rs. 501 onwards",
    impact: "Rs. 1000 = water for 100 people",
  },
  {
    title: "Water Tanker Support",
    description: "Tanker-based relief support for drought-hit areas and locations facing severe water shortage.",
    cost: "Rs. 2,500 onwards",
    impact: "One tanker can bring relief to an entire high-need area",
  },
  {
    title: "Water Point Installation",
    description: "Dedicated water points for temples, schools, bus stands, and other public spaces.",
    cost: "Rs. 1,100 onwards",
    impact: "One water point can support many people every day",
  },
  {
    title: "Event-based Jal Seva",
    description: "Organized water support for spiritual gatherings, pilgrimages, and public events.",
    cost: "Rs. 751 onwards",
    impact: "Safe drinking water support even in large gatherings",
  },
];

export const JAL_HIGHLIGHTS: SevaHighlight[] = [
  {
    title: "Immediate water relief",
    description: "Jal Seva responds quickly where heat, thirst, public footfall, or shortage creates real daily need.",
    badge: "Life Support",
    icon: "water",
  },
  {
    title: "Public service locations",
    description: "Temples, bus stands, schools, pilgrimage routes, and public squares can all become stable points of water access.",
    badge: "Visible Service",
    icon: "community",
  },
  {
    title: "Summer and emergency readiness",
    description: "Heatwave camps, tanker response, and urgent distribution support can be mobilised with purpose and discipline.",
    badge: "Rapid Response",
    icon: "spark",
  },
  {
    title: "Sponsor with intention",
    description: "Families and donors can adopt water support in memory, gratitude, celebration, or devotional intention.",
    badge: "Purposeful Giving",
    icon: "shield",
  },
];

export const ANN_HIGHLIGHTS: SevaHighlight[] = [
  {
    title: "No one sleeps hungry",
    description: "Ann Seva is rooted in the belief that dignity begins with nourishment and compassionate food support.",
    badge: "Sacred Giving",
    icon: "meal",
  },
  {
    title: "Daily meal compassion",
    description: "Meals can reach labour families, pilgrims, children, and vulnerable households through organised trust support.",
    badge: "Daily Meals",
    icon: "heart",
  },
  {
    title: "Occasion-based meal offering",
    description: "Birthdays, anniversaries, memorial observances, and devotional gatherings can become meaningful food support opportunities.",
    badge: "Faith-Led Service",
    icon: "spark",
  },
  {
    title: "Volunteer-led food care",
    description: "Cooking, packing, distribution, and respectful delivery become a shared mission for donors and volunteers.",
    badge: "Community Kitchen",
    icon: "community",
  },
];

export const SEVA_HIGHLIGHTS: SevaHighlight[] = [
  {
    title: "Food and Water Together",
    description: "Bhagwat Heritage sees food and water support as one complete mission of compassion.",
    badge: "Integrated Service",
    icon: "heart",
  },
  {
    title: "Emergency-ready support",
    description: "During heatwaves, heavy pilgrim movement, or local emergencies, service mobilisation can be fast and practical.",
    badge: "Rapid Response",
    icon: "spark",
  },
  {
    title: "Occasion-based sponsorship",
    description: "Birthdays, anniversaries, remembrance days, spiritual gatherings, or family intentions can become meaningful support.",
    badge: "Sponsor with Intention",
    icon: "shield",
  },
  {
    title: "City volunteer network",
    description: "Local volunteers, families, youth groups, and organisers help take distribution to the ground.",
    badge: "Community-led",
    icon: "community",
  },
];

export const ANN_SEVA_CATALOG: SevaCatalogItem[] = [
  {
    title: "Daily Meal Distribution",
    description: "Providing fresh and respectful daily meals to families in need, labourers, and pilgrims.",
    supportLine: "Temple routes, shelters, and labor areas",
    icon: "meal",
  },
  {
    title: "Festival & Community Meal Service",
    description: "Organising respectful food service during festivals, devotional gatherings, and major holy events.",
    supportLine: "Community gatherings and holy events",
    icon: "heart",
  },
  {
    title: "Dry Ration Kit Support",
    description: "Providing short-term ration support so vulnerable households can continue cooking at home.",
    supportLine: "Household relief for vulnerable families",
    icon: "shield",
  },
  {
    title: "Hospital Attendant Meal Support",
    description: "Serving meals to patient attendants and family members when time, money, and access are limited.",
    supportLine: "Care for caregivers and attendants",
    icon: "heart",
  },
  {
    title: "School & Hostel Nutrition",
    description: "Strengthening nutrition support for students, hostel children, and learning spaces.",
    supportLine: "Children-focused nutrition support",
    icon: "community",
  },
  {
    title: "Special Occasion Meal Offering",
    description: "Marking birthdays, remembrance days, and other meaningful occasions through food support.",
    supportLine: "Faith-led giving with personal meaning",
    icon: "spark",
  },
];

export const JAL_SEVA_CATALOG: SevaCatalogItem[] = [
  {
    title: "Public Water Stalls & Drinking Points",
    description: "Roadside water stalls, reusable cup service, and summer relief points that provide immediate hydration support.",
    supportLine: "Public footfall areas and relief camps",
    icon: "water",
  },
  {
    title: "Water Tanker Relief",
    description: "Providing drinking water through tanker support in villages, shortage zones, and distress-hit locations.",
    supportLine: "Drought and shortage support",
    icon: "water",
  },
  {
    title: "RO / Filter Setup Support",
    description: "Supporting sustainable clean-water systems for schools, villages, and service centers.",
    supportLine: "Long-term safe water access",
    icon: "shield",
  },
  {
    title: "Water Cooler Installation",
    description: "Installing cooling-based water access in temples, schools, hospitals, and other public places.",
    supportLine: "Recurring relief at public locations",
    icon: "spark",
  },
  {
    title: "Mobile Water Relief Van",
    description: "A mobile support model that reaches high-need spots with water distribution and public awareness.",
    supportLine: "Flexible outreach across locations",
    icon: "community",
  },
  {
    title: "Disaster & Heatwave Water Relief",
    description: "Safe drinking water and rapid relief support during heatwaves, floods, lockdowns, or crisis situations.",
    supportLine: "Emergency-oriented humanitarian water support",
    icon: "heart",
  },
];

export const SEVA_FLOW_STEPS: SevaFlowStep[] = [
  {
    step: "01",
    title: "Needs are understood",
    description: "Ground requirements, local locations, or active campaign needs are identified first.",
  },
  {
    step: "02",
    title: "The team organizes service",
    description: "Quantity, logistics, volunteer support, and delivery approach are planned with care and discipline.",
  },
  {
    step: "03",
    title: "Donors and volunteers join",
    description: "Sponsors, recurring donors, and volunteers can join according to their capacity.",
  },
  {
    step: "04",
    title: "Support is delivered with dignity",
    description: "Food and water are served respectfully so that relief reaches people with care and dignity.",
  },
];

export const JAL_FLOW_STEPS: SevaFlowStep[] = [
  {
    step: "01",
    title: "Need and location are identified",
    description: "Public spots, shortage zones, or urgent heat-related needs are reviewed before the service is organized.",
  },
  {
    step: "02",
    title: "Water support is arranged",
    description: "Water cans, public water stalls, tankers, and cooling points are arranged according to the ground requirement.",
  },
  {
    step: "03",
    title: "Volunteers and donors contribute",
    description: "The trust aligns donor support and volunteer participation to keep the water relief smooth and timely.",
  },
  {
    step: "04",
    title: "Relief reaches people respectfully",
    description: "Safe drinking water is served with dignity, especially where immediate comfort and relief are needed most.",
  },
];

export const ANN_FLOW_STEPS: SevaFlowStep[] = [
  {
    step: "01",
    title: "Food need is assessed",
    description: "The trust identifies where meal support is needed, whether for families, pilgrims, camps, or special occasions.",
  },
  {
    step: "02",
    title: "Cooking and distribution are planned",
    description: "Food quantity, menu, timing, and distribution logistics are coordinated with care and discipline.",
  },
  {
    step: "03",
    title: "Donors and volunteers join the effort",
    description: "Meal support becomes possible through sponsorship, kitchen support, packing teams, and serving volunteers.",
  },
  {
    step: "04",
    title: "Meals are served with dignity",
    description: "The final goal is not only food delivery, but also warmth, respect, and emotional assurance for the beneficiary.",
  },
];

export const SEVA_REACH_AREAS: SevaReachItem[] = [
  {
    title: "Pilgrims and temple visitors",
    description: "Pilgrimage routes, temple areas, and high-footfall gathering points often need both water and meal support.",
    focus: "Festival and route support",
    icon: "heart",
  },
  {
    title: "Labor families and urban workers",
    description: "Regular support eases everyday hardship for daily wage earners and their families.",
    focus: "Daily nourishment support",
    icon: "meal",
  },
  {
    title: "Villages & water-stressed areas",
    description: "Villages, drought belts, and shortage regions feel the impact of water relief most immediately.",
    focus: "Tanker, filtration, and storage support",
    icon: "water",
  },
  {
    title: "Schools, hospitals & public spaces",
    description: "Recurring service in these locations can create dignified comfort and long-term community care.",
    focus: "Stable service points",
    icon: "community",
  },
];

export const JAL_REACH_AREAS: SevaReachItem[] = [
  {
    title: "Temple routes and pilgrimage points",
    description: "High-footfall devotional routes need consistent water support during long darshan and travel hours.",
    focus: "Pilgrim relief",
    icon: "water",
  },
  {
    title: "Heatwave-affected city locations",
    description: "Urban public points can face intense dehydration risk during peak summer and afternoon footfall.",
    focus: "Summer response",
    icon: "spark",
  },
  {
    title: "Villages and shortage areas",
    description: "Water scarcity zones benefit from tanker support, storage aid, and safer drinking water arrangements.",
    focus: "Rural water support",
    icon: "community",
  },
  {
    title: "Schools, hospitals, and public spaces",
    description: "Coolers, filters, and stable water points can create long-term relief where people gather every day.",
    focus: "Long-term service points",
    icon: "shield",
  },
];

export const ANN_REACH_AREAS: SevaReachItem[] = [
  {
    title: "Labour families and urban workers",
    description: "Daily wage households often need consistent meal support during difficult phases and unstable income periods.",
    focus: "Daily nourishment",
    icon: "meal",
  },
  {
    title: "Pilgrims and festival gatherings",
    description: "Pilgrims and large devotional gatherings benefit from respectful meal service arranged with discipline.",
    focus: "Festival meals",
    icon: "heart",
  },
  {
    title: "Children, hostels, and student groups",
    description: "Nutritious food support for children and students strengthens both care and continuity in learning spaces.",
    focus: "Nutrition support",
    icon: "community",
  },
  {
    title: "Families in temporary hardship",
    description: "Meal kits, cooked food, and ration-based support can help restore stability for vulnerable homes.",
    focus: "Household relief",
    icon: "shield",
  },
];

export const SEVA_FAQS: SevaFaqItem[] = [
  {
    question: "Can I donate for both Ann Seva and Jal Seva?",
    answer: "Yes. From the main donation page, you can contribute to Ann Seva, Jal Seva, or a combined service commitment.",
  },
  {
    question: "Can I sponsor service for a special occasion?",
    answer: "Yes. Birthdays, anniversaries, remembrance days, and family intentions can be turned into meaningful food and water support.",
  },
  {
    question: "What should I do if I want to start service in my city?",
    answer: "Submit the Join Seva form. The team will connect with you and guide you as a volunteer, organizer, or city lead.",
  },
  {
    question: "How does the trust support emergency cases?",
    answer: "Depending on the situation, the trust can activate water camps, tanker support, quick food distribution, or volunteer-led relief coordination.",
  },
  {
    question: "What happens after I click Donate Now?",
    answer: "All donation and sponsorship actions on this page take you directly to the main donation page.",
  },
];

export const JAL_FAQS: SevaFaqItem[] = [
  {
    question: "What kinds of Jal Seva can I support?",
    answer: "You can support public water stalls, tanker relief, water camps, cooling systems, filters, and public drinking water access efforts.",
  },
  {
    question: "Can Jal Seva be sponsored for a specific location?",
    answer: "Yes. Donors can support a specific area, season, or public point where recurring drinking water access is needed.",
  },
  {
    question: "Does the Jal Seva page have a direct donation route?",
    answer: "Yes. Every donation or sponsorship action on this page redirects to the main donation page for payment.",
  },
  {
    question: "Can I start Jal Seva in my city with the trust?",
    answer: "Yes. Use the Join Seva form and the team can connect with you for volunteer, organiser, or city-level support.",
  },
  {
    question: "Is this page only for water-related seva?",
    answer: "Yes. This page is now focused only on Jal Seva activities, services, and water-related support opportunities.",
  },
];

export const ANN_FAQS: SevaFaqItem[] = [
  {
    question: "What kind of Ann Seva does the trust organise?",
    answer: "The trust organises daily meal service, festival food distribution, ration support, special occasion meal offerings, and community-based food support.",
  },
  {
    question: "Can I sponsor Ann Seva for a birthday or family occasion?",
    answer: "Yes. Special occasions can be dedicated as Ann Seva with meaningful meal support offered in devotion and gratitude.",
  },
  {
    question: "Will Donate Now on this page go to the main donation page?",
    answer: "Yes. All donation and sponsorship actions on the Ann Seva page redirect to the trust's main donation page.",
  },
  {
    question: "Can volunteers also help in cooking or distribution?",
    answer: "Yes. Volunteers can support kitchen coordination, packing, serving, distribution, and local event-based Ann Seva.",
  },
  {
    question: "Is this page only for food-related service details?",
    answer: "Yes. This page is dedicated specifically to Ann Seva offerings, food support, and meal-based support opportunities.",
  },
];

export const ADOPT_A_SEVA_OPTIONS: SponsorshipOption[] = [
  {
    title: "1 Day Meal Sponsorship",
    amount: 5000,
    impact: "One day of meal support for families and pilgrims in need.",
    donationType: "Annadaan",
  },
  {
    title: "1 Week Jal Seva",
    amount: 10000,
    impact: "Seven days of water-camp and supply support for people facing thirst and heat.",
    donationType: "Jal Seva",
  },
  {
    title: "Full Event Sponsorship",
    amount: 25000,
    impact: "Full support for meals, water, volunteer logistics, and spiritual hospitality.",
    donationType: "Both",
  },
];

export const JAL_ADOPT_A_SEVA_OPTIONS: SponsorshipOption[] = [
  {
    title: "1 Week Jal Seva",
    amount: 10000,
    impact: "Seven days of structured water seva support for public relief points and high-need locations.",
    donationType: "Jal Seva",
  },
  {
    title: "Summer Water Point Sponsor",
    amount: 15000,
    impact: "Helps set up and sustain a visible drinking water point during peak heat conditions.",
    donationType: "Jal Seva",
  },
  {
    title: "Water Tanker Support",
    amount: 25000,
    impact: "Supports larger-scale relief where villages or stressed zones need dependable drinking water access.",
    donationType: "Jal Seva",
  },
];

export const ANN_ADOPT_A_SEVA_OPTIONS: SponsorshipOption[] = [
  {
    title: "1 Day Meal Sponsorship",
    amount: 5000,
    impact: "Supports a full day of meal service for families, workers, devotees, or pilgrim groups in need.",
    donationType: "Annadaan",
  },
  {
    title: "Community Meal Sponsor",
    amount: 11000,
    impact: "Helps organise a larger community meal service with respectful distribution and devotional hospitality.",
    donationType: "Annadaan",
  },
  {
    title: "Monthly Food Support",
    amount: 21000,
    impact: "Provides recurring nourishment support for ongoing Ann Seva outreach and vulnerable beneficiaries.",
    donationType: "Annadaan",
  },
];

export const TESTIMONIALS: TestimonialStory[] = [
  {
    name: "",
    role: "Donor Family",
    quote: "We linked meal support to our family birthday, and for the first time it felt like celebration had become someone's blessing.",
    accent: "from-[#fff4dc] to-[#fffaf2]",
  },
  {
    name: "",
    role: "Beneficiary Mother",
    quote: "When ration and meals arrived, the worry of feeding the children became lighter. The trust's service gave us real support.",
    accent: "from-[#edf9ff] to-[#f8fdff]",
  },
  {
    name: "",
    role: "Seva Volunteer",
    quote: "The biggest lesson from the water camps was that even one pot of water can bring immediate relief to someone in need.",
    accent: "from-[#fff8e8] to-[#fffdf7]",
  },
];

export const JAL_TESTIMONIALS: TestimonialStory[] = [
  {
    name: "",
    role: "Jal Seva Donor",
    quote: "Seeing people receive cool drinking water during intense summer heat made this service feel immediate, practical, and deeply humane.",
    accent: "from-[#edf9ff] to-[#f8fdff]",
  },
  {
    name: "",
    role: "Volunteer Coordinator",
    quote: "Even a simple water point becomes a blessing when it is organised with care and reached at the right place and time.",
    accent: "from-[#fff8e8] to-[#fffdf7]",
  },
  {
    name: "",
    role: "Public Relief Beneficiary",
    quote: "Safe drinking water gave real comfort during a difficult day outside. It felt like someone truly cared.",
    accent: "from-[#eef8ff] to-[#ffffff]",
  },
];

export const ANN_TESTIMONIALS: TestimonialStory[] = [
  {
    name: "",
    role: "Ann Seva Donor Family",
    quote: "Offering Ann Seva on a family occasion brought a different kind of joy because it turned celebration into meaningful support.",
    accent: "from-[#fff4dc] to-[#fffaf2]",
  },
  {
    name: "",
    role: "Meal Distribution Volunteer",
    quote: "Serving food with dignity reminds us that compassion is not abstract. It reaches people one meal at a time.",
    accent: "from-[#fff8e8] to-[#fffdf7]",
  },
  {
    name: "",
    role: "Beneficiary Mother",
    quote: "Meal support gave relief at a time when even one day's food security felt uncertain for the family.",
    accent: "from-[#fff7ef] to-[#ffffff]",
  },
];

export const CTA_LINES = [
  "One act of service can become someone's full hope",
  "Help make sure no one sleeps hungry today",
  "One sip of water can support one life",
];

export const JAL_CTA_LINES = [
  "One sip of water can support one life",
  "Help compassion and relief reach every thirsty person",
  "Your Jal Seva can make someone's day safer and more bearable",
];

export const ANN_CTA_LINES = [
  "Help ensure no one sleeps hungry",
  "One meal can support one life",
  "Your Ann Seva can bring hope to a home",
];

export const FALLBACK_CAMPAIGNS: Campaign[] = [
  {
    _id: "fallback-annadaan",
    title: "Summer Relief Meal Drive",
    description: "Daily hot meal packets for worker families and pilgrim groups in need.",
    category: "Annadaan",
    goalAmount: 75000,
    collectedAmount: 28500,
    impactLine: "Rs. 501 = meals for 50 people",
    coverImage: "/images/annseva.png",
    location: "Ahmedabad outreach corridor",
    donorCount: 36,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fallback-jalseva",
    title: "Heatwave Water Relief Camp",
    description: "A live campaign to deliver cool and safe drinking water to high-footfall public areas.",
    category: "Jal Seva",
    goalAmount: 60000,
    collectedAmount: 21400,
    impactLine: "Rs. 1000 = water for 100 people",
    coverImage: "/images/jal1.png",
    location: "Temple routes and public squares",
    donorCount: 24,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];
