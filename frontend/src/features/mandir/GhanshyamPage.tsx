import { memo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const HERO_STATS = [
  { label: "Daily Darshan", value: "4,500+" },
  { label: "Satsang Groups", value: "28" },
  { label: "Annual Utsavs", value: "30+" },
  { label: "Volunteer Sevas", value: "75+" },
];

type ProjectFocusCategory = "All" | "Masterplan" | "Spiritual" | "Seva" | "Pilgrim";

const PROJECT_FOCUS_AREAS = [
  {
    category: "Masterplan" as const,
    title: "Bhagwat Dham Masterplan",
    desc: "A unified temple campus concept with mandir space, satsang gathering areas, seva infrastructure, and a spiritually coherent visitor journey.",
    feature: "Campus planning, sacred layout discipline, and phased development structure.",
  },
  {
    category: "Spiritual" as const,
    title: "Spiritual Core Experience",
    desc: "The project is designed as a center for darshan, aarti, satsang, scripture listening, and value-based devotional living.",
    feature: "Daily darshan rhythm, festival cycle, and mandir-centered spiritual atmosphere.",
  },
  {
    category: "Seva" as const,
    title: "Integrated Seva Infrastructure",
    desc: "Bhagwat Dham should support ann seva, devotional hosting, volunteer management, outreach support, and social service coordination.",
    feature: "Seva-linked halls, support counters, volunteer flow, and service planning layers.",
  },
  {
    category: "Pilgrim" as const,
    title: "Pilgrim and Family Readiness",
    desc: "The page now presents Bhagwat Dham as a destination that should welcome families, yatris, and group visits with clarity and comfort.",
    feature: "Queue guidance, darshan flow, reception, and accessible visitor support design.",
  },
];

const PROJECT_DEVELOPMENT_PHASES = [
  {
    title: "Phase 1 - Vision and Sacred Layout",
    desc: "Define the mandir campus identity, primary sacred zones, devotee movement plan, and spiritual purpose of the project.",
  },
  {
    title: "Phase 2 - Core Mandir and Devotional Facilities",
    desc: "Focus on principal mandir structures, darshan experience, daily worship support, and satsang usability.",
  },
  {
    title: "Phase 3 - Seva and Pilgrim Expansion",
    desc: "Add practical support for ann seva, help desks, family waiting zones, volunteer systems, and yatri support features.",
  },
  {
    title: "Phase 4 - Interpretation and Outreach Layer",
    desc: "Strengthen the campus through guided learning, cultural explanation, devotional installations, and public spiritual engagement.",
  },
];

const PROJECT_SUPPORT_TRACKS = [
  "Mandir construction and sacred space development",
  "Darshan, aarti, and festival readiness systems",
  "Pilgrim reception, queue, and family assistance features",
  "Seva hall, prasad, and volunteer support infrastructure",
];

const DAILY_SCHEDULE = [
  { title: "Mangala Darshan", time: "05:15 AM - 06:00 AM" },
  { title: "Shangar Aarti", time: "07:00 AM - 07:30 AM" },
  { title: "Rajbhog Darshan", time: "11:30 AM - 12:15 PM" },
  { title: "Sandhya Aarti", time: "06:30 PM - 07:15 PM" },
  { title: "Shayan Darshan", time: "08:30 PM - 09:00 PM" },
];

type AartiLanguage = "hindi" | "marathi" | "gujarati" | "english";
type KundaliLanguage = "english" | "hindi" | "marathi" | "gujarati";

const KUNDALI_TYPES = [
  "Sampurna Vishtrut Kundali (100 Pages)",
  "Vivah Vishtrut Kundali (40 Pages)",
  "Janm Kundali Phalit evam Varshfal (30 Pages)",
  "Janm Kundali Phalit (30 Pages)",
  "Computer Printed Kundali (20 Pages)",
];

const EXTRA_KUNDALI_REPORTS = [
  "Vedic Gun Milan (7 Pages)",
  "Varshik Kundali evam Varshfal (8 Pages)",
  "Naamkaran Kundali (4 Pages)",
  "Janm Tippan (1 Page)",
];

type PujaItem = {
  name: string;
  price: string;
  timing: string;
};

const DAINIK_PUJA_SERVICES: PujaItem[] = [
  { name: "प्रातः कालीन आरती पूजा सेवा", price: "₹1,100", timing: "05:30 AM" },
  { name: "संध्याकालीन आरती पूजा सेवा", price: "₹1,100", timing: "06:30 PM" },
  { name: "बाल भोग सेवा", price: "₹751", timing: "08:00 AM" },
  { name: "राजभोग सेवा", price: "₹2,100", timing: "11:30 AM" },
  { name: "फलाहार भोग सेवा", price: "₹901", timing: "04:00 PM" },
  { name: "रात्रि भोग सेवा", price: "₹1,251", timing: "08:15 PM" },
  { name: "ठाकुरजी की श्रृंगार वस्त्र सेवा", price: "₹3,100", timing: "Daily" },
  { name: "महा अभिषेक सेवा", price: "₹5,100", timing: "Special Slot" },
];

const VISHESH_ANUSHTHAN_SERVICES: PujaItem[] = [
  { name: "नवग्रह शांति पूजा", price: "₹7,100", timing: "By Booking" },
  { name: "नक्षत्र शांति पूजा", price: "₹6,100", timing: "By Booking" },
  { name: "जनन शांति पूजा", price: "₹5,100", timing: "By Booking" },
  { name: "महा रुद्राभिषेक", price: "₹11,000", timing: "By Booking" },
  { name: "नवचंडी पाठ", price: "₹21,000", timing: "By Booking" },
  { name: "गणपति अष्टोत्तर शत अथर्वशीर्ष अनुष्ठान", price: "₹8,100", timing: "By Booking" },
  { name: "महामृत्युंजय अनुष्ठान", price: "₹9,100", timing: "By Booking" },
  { name: "महासुदर्शन अनुष्ठान", price: "₹15,100", timing: "By Booking" },
];

const SWAMINARAYAN_AARTI_TEXT: Record<AartiLanguage, string> = {
  hindi: ` ॥ श्री स्वामिनारायण भगवान की आरती ॥
जय सद्गुरु स्वामी,
प्रभु जय सद्गुरु स्वामी।
सहजानंद दयाळु,
बळवंत बहुनामी॥
चरण सरोज तमारा,
वंदु कर जोडी;
चरणे शीश धर्यथी,
दुःख नाख्या तोडी॥
नारायण नर ब्राता,
द्विजकुळ तनु धारी;
पामर पतित उद्धार्या,
अगणित नरनारी॥
नित्य नित्य नवतन लीला,
करता अविनाशी;
अडसठ तीर्थ चरणे,
कोटि गया काशी॥
पुरुषोत्तम प्रगटनु,
जे दर्शन करशो;
काल कर्मथी छूटी,
कुटुंब सहित तरशो॥
आ अवसर करुणानिधि,
करुणा बहु कीधी;
मुक्तानंद कहे मुक्ति,
सुगम करी सीधी॥
॥ जय सद्गुरु स्वामी ॥`,
  marathi: `॥ श्री स्वामिनारायण भगवान की आरती ॥
जय सद्गुरु स्वामी,
प्रभु जय सद्गुरु स्वामी।
सहजानंद दयाळु,
बळवंत बहुनामी॥
चरण सरोज तमारा,
वंदु कर जोडी;
चरणे शीश धर्यथी,
दुःख नाख्या तोडी॥
नारायण नर ब्राता,
द्विजकुळ तनु धारी;
पामर पतित उद्धार्या,
अगणित नरनारी॥
नित्य नित्य नवतन लीला,
करता अविनाशी;
अडसठ तीर्थ चरणे,
कोटि गया काशी॥
पुरुषोत्तम प्रगटनु,
जे दर्शन करशो;
काल कर्मथी छूटी,
कुटुंब सहित तरशो॥
आ अवसर करुणानिधि,
करुणा बहु कीधी;
मुक्तानंद कहे मुक्ति,
सुगम करी सीधी॥
॥ जय सद्गुरु स्वामी ॥
`,
  gujarati: `॥ શ્રી સ્વામિનારાયણ ભગવાનની આરતી ॥
જય સદગુરુ સ્વામી,
પ્રભુ જય સદગુરુ સ્વામી।
સહજાનંદ દયાળુ,
બળવંત બહુનામી॥
ચરણ સરોજ તમારા,
વંદુ કર જોડી;
ચરણે શીશ ધર્યથી,
દુઃખ નાખ્યા તોડી॥
નારાયણ નર બ્રાતા,
દ્વિજકુળ તનુ ધારી;
પામર પતિત ઉદ્ધાર્યા,
અગણિત નરનારી॥
નિત્ય નિત્ય નવતન લીલા,
કરતા અવિનાશી;
અડસઠ તીર્થ ચરણે,
કોટિ ગયા કાશી॥
પુરુષોત્તમ પ્રગટનુ,
જે દર્શન કરશો;
કાલ કર્મથી છૂટી,
કુટુંબ સહિત તરશો॥
આ અવસર કરુણાનિધિ,
કરુણા બહુ કીધી;
મુક્તાનંદ કહે મુક્તિ,
સુગમ કરી સીધી॥
॥ જય સદગુરુ સ્વામી ॥`,
  english: `॥ Shri Swaminarayan Bhagwan Ki Aarti ॥
Jay Sadguru Swami,
Prabhu Jay Sadguru Swami.
Sahajanand Dayalu,
Balavant Bahunami॥
Charan Saroj Tamara,
Vandu Kar Jodi;
Charane Shish Dharyathi,
Dukh Nakhya Todi॥
Narayan Nar Brata,
Dwijakul Tanu Dhari;
Pamar Patit Uddharya,
Aganit Naranari॥
Nitya Nitya Navatan Leela,
Karta Avinashi;
Adasath Tirth Charane,
Koti Gaya Kashi॥
Purushottam Pragatu Nu,
Je Darshan Karsho;
Kal Karmathi Chhuti,
Kutumb Sahit Tarsho॥
Aa Avasar Karunanidhi,
Karuna Bahu Kidhi;
Muktanand Kahe Mukti,
Sugam Kari Sidhi॥
॥ Jay Sadguru Swami ॥`,
};

const SWAMINARAYAN_FEATURE_GROUPS = [
  {
    name: "Nitya Darshan and Aarti",
    items: [
      "Mangala Darshan",
      "Shangar Darshan",
      "Rajbhog Darshan",
      "Utthapan Darshan",
      "Sandhya Darshan",
      "Shayan Darshan",
      "Morning Aarti",
      "Evening Aarti",
    ],
  },
  {
    name: "Scripture and Study",
    items: [
      "Vachanamrut Adhyayan",
      "Shikshapatri Path",
      "Satsangi Jivan Reading",
      "Bhagavad Gita Reflection",
      "Upanishad Introduction",
      "Kirtanavali Training",
      "Smruti Granth Session",
      "Bal Adhyayan Class",
    ],
  },
  {
    name: "Swaminarayan Bhakti",
    items: [
      "Swaminarayan Mahamantra Dhun",
      "Thal Bhakti Seva",
      "Pushpa Seva",
      "Murti Shringar Seva",
      "Tulsi Mala Seva",
      "Mandir Pradakshina Seva",
      "Akshar Purushottam Upasana Sabha",
      "Ekadashi Bhajan Sandhya",
    ],
  },
  {
    name: "Yuva and Bal Activities",
    items: [
      "Bal Sabha Weekly",
      "Kishore Sabha Weekly",
      "Yuvak Mandal Satsang",
      "Yuvati Mandal Satsang",
      "Value Education Workshops",
      "Public Speaking Seva",
      "Scripture Quiz Competition",
      "Volunteer Leadership Camp",
    ],
  },
  {
    name: "Festival Celebrations",
    items: [
      "Ram Navami and Swaminarayan Jayanti",
      "Janmashtami Utsav",
      "Diwali Annakut Darshan",
      "Kartik Purnima Deepotsav",
      "Patotsav Mahotsav",
      "Fuldol Utsav",
      "Hindola Utsav",
      "Jal Jhilani Festival",
    ],
  },
  {
    name: "Pilgrim and Visitor Services",
    items: [
      "Guided Darshan Queue",
      "Wheelchair Assistance",
      "Senior Citizen Support",
      "Shoes and Locker Counter",
      "Drinking Water Points",
      "Medical First Aid Desk",
      "Help and Information Kiosk",
      "Lost and Found Assistance",
    ],
  },
  {
    name: "Temple Seva Departments",
    items: [
      "Mandir Safai Seva",
      "Prasad Vitaran Seva",
      "Parking Seva",
      "Crowd Management Seva",
      "Festival Decoration Seva",
      "Audio and Stage Seva",
      "Annakut Preparation Seva",
      "Book Stall Seva",
    ],
  },
  {
    name: "Spiritual Guidance",
    items: [
      "Niyam Guidance Session",
      "Daily Puja Training",
      "Family Satsang Counseling",
      "Bal Sanskar Guidance",
      "Youth Career and Dharma Mentoring",
      "Gruhasth Dharma Guidance",
      "Sadachar Workshop",
      "Nityapath Coaching",
    ],
  },
  {
    name: "Community Outreach",
    items: [
      "Food Relief Drive",
      "Clothes Distribution",
      "Blood Donation Camp",
      "Medical Camp",
      "Student Scholarship Support",
      "School Kit Distribution",
      "Disaster Relief Seva",
      "Tree Plantation Drive",
    ],
  },
];

const totalFeatures = SWAMINARAYAN_FEATURE_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

export default memo(function GhanshyamPage() {
  const [activeAartiLang, setActiveAartiLang] = useState<AartiLanguage | null>(null);
  const [activeProjectFocus, setActiveProjectFocus] = useState<ProjectFocusCategory>("All");
  const [showPayment, setShowPayment] = useState(false);
  const [kundaliForm, setKundaliForm] = useState({
    fullName: "",
    sex: "Male",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    district: "",
    kundaliTypes: [] as string[],
    extraReports: [] as string[],
    language: "english" as KundaliLanguage,
  });

  const visibleProjectAreas =
    activeProjectFocus === "All"
      ? PROJECT_FOCUS_AREAS
      : PROJECT_FOCUS_AREAS.filter((item) => item.category === activeProjectFocus);

  const toggleSelection = (group: "kundaliTypes" | "extraReports", value: string) => {
    setKundaliForm((prev) => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists ? prev[group].filter((item) => item !== value) : [...prev[group], value],
      };
    });
  };

  const handleKundaliSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowPayment(true);
  };

  return (
    <div className="pb-12">
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[32px] border border-[#dce8ff] bg-cover bg-center p-6 md:p-10 shadow-[0_18px_45px_rgba(12,38,74,0.35)]"
          style={{ backgroundImage: "url('/images/kathapravachan.png')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,47,87,0.9)_0%,rgba(28,77,127,0.82)_45%,rgba(49,112,168,0.74)_100%)]" />
          <div className="absolute -top-12 -right-10 h-56 w-56 rounded-full bg-[#ffd89a]/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-[#8fc8ff]/20 blur-3xl" />

          <div className="relative z-10 text-white">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs md:text-sm tracking-wide">
              Bhagwat Dham Project Vision
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight">Bhagwat Dham Swaminarayan Mandir Project</h1>
            <p className="mt-3 max-w-3xl text-sm md:text-lg text-[#e3efff]">
              A long-term devotional campus vision for mandir darshan, satsang, seva, pilgrim support, and value-based spiritual life inspired by Shree Swaminarayan Bhagwan.
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {HERO_STATS.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/25 bg-white/10 p-3 text-center">
                  <p className="text-xl md:text-2xl font-black">{item.value}</p>
                  <p className="text-xs md:text-sm text-[#dce9ff]">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center rounded-xl bg-[#ffd08b] px-5 py-2.5 text-sm font-bold text-[#163b63] hover:bg-[#ffc36e] transition"
              >
                Join Satsang Seva
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
              >
                Donate for Mandir Seva
              </Link>
              <Link
                to="/mandir/gallery"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#edd0a9] bg-[radial-gradient(circle_at_top_left,_rgba(255,245,229,0.96),_rgba(255,255,255,1)_48%,_rgba(237,246,255,0.96)_100%)] p-6 md:p-8 shadow-[0_12px_30px_rgba(14,52,86,0.1)]">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#a85b1a] font-semibold">Project Overview</p>
            <h2 className="mt-3 text-2xl md:text-4xl font-black text-[#123753]">About Bhagwat Dham Project</h2>
          </div>

          <p className="mt-5 max-w-4xl mx-auto text-center text-[#4f6272] text-base md:text-xl leading-8">
            This page should explain Bhagwat Dham as a complete spiritual campus vision, not only as a mandir name. I updated
            it to show how the project can serve darshan, satsang, seva, pilgrim support, and long-term cultural-spiritual growth.
          </p>
          <p className="mt-4 max-w-4xl mx-auto text-center text-[#4f6272] text-base md:text-xl leading-8">
            The new structure helps devotees understand the purpose of the project, the type of development it supports,
            and the practical areas where families, sponsors, and volunteers can participate.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Sacred Campus Vision",
                desc: "Bhagwat Dham is presented as a complete devotional campus rather than a single-use mandir building.",
              },
              {
                title: "Seva + Satsang Integration",
                desc: "The page now explains how worship, festivals, service, and visitor support can work together inside the project.",
              },
              {
                title: "Pilgrim-Ready Experience",
                desc: "Families and yatris need guidance, flow, and support, so the project page now reflects that real need.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#e6edf6] bg-white/85 p-5 shadow-sm">
                <h3 className="text-xl font-black text-[#173b57]">{item.title}</h3>
                <p className="mt-2 text-[#5d7182] leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#d9e7f5] bg-gradient-to-br from-[#f5faff] via-[#ffffff] to-[#eef6ff] p-6 md:p-8 shadow-[0_10px_28px_rgba(13,59,102,0.08)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#2b618f] font-semibold">New Feature</p>
              <h2 className="mt-2 text-2xl md:text-4xl font-black text-[#123753]">Bhagwat Dham Project Vision Explorer</h2>
              <p className="mt-3 max-w-3xl text-[#4f6272] text-base md:text-lg leading-7">
                Filter the project by focus area so visitors can understand the masterplan, spiritual use, seva role, and pilgrim value of Bhagwat Dham more clearly.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Masterplan", "Spiritual", "Seva", "Pilgrim"] as const).map((focus) => {
                const active = focus === activeProjectFocus;
                return (
                  <button
                    key={focus}
                    type="button"
                    onClick={() => setActiveProjectFocus(focus)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#0d3b66] text-white"
                        : "border border-[#d3e0ee] bg-white text-[#18476f] hover:bg-[#eef6ff]"
                    }`}
                  >
                    {focus}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleProjectAreas.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#d8e5f1] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#0d3b66] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#18476f]">
                    Project Insight
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-[#123753]">{item.title}</h3>
                <p className="mt-3 text-[#4f6272] text-base md:text-lg leading-7">{item.desc}</p>
                <div className="mt-4 rounded-2xl bg-[#f6fbff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2b618f]">Feature Focus</p>
                  <p className="mt-2 text-[#38566f] leading-7">{item.feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 md:p-8 shadow-[0_10px_28px_rgba(13,59,102,0.08)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#2b618f] font-semibold">Development Roadmap</p>
            <h2 className="mt-2 text-2xl md:text-4xl font-black text-[#123753]">Bhagwat Dham Growth Phases</h2>
            <div className="mt-6 space-y-4">
              {PROJECT_DEVELOPMENT_PHASES.map((phase, index) => (
                <div key={phase.title} className="rounded-2xl border border-[#d8e5f1] bg-[#f8fbff] p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#0d5a8e]">Stage {index + 1}</p>
                  <h3 className="mt-2 text-xl font-black text-[#173b57]">{phase.title}</h3>
                  <p className="mt-2 text-[#516676] leading-7">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#edd0a9] bg-gradient-to-br from-[#fff6ea] via-[#fffaf4] to-[#fff2e1] p-6 md:p-8 shadow-[0_12px_30px_rgba(163,71,11,0.12)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#a85b1a] font-semibold">Support Matrix</p>
            <h2 className="mt-2 text-2xl md:text-4xl font-black text-[#7a3604]">Where Support Can Help</h2>
            <ul className="mt-6 space-y-3">
              {PROJECT_SUPPORT_TRACKS.map((line) => (
                <li key={line} className="flex gap-3 text-[#7b4a22] leading-7">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d97918]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-xl bg-[#d97918] px-5 py-3 text-sm font-bold text-white hover:bg-[#c56d14] transition"
              >
                Support Project
              </Link>
              <Link
                to="/get-involved/sponsor-programs"
                className="inline-flex items-center justify-center rounded-xl border border-[#e7bf96] bg-white px-5 py-3 text-sm font-semibold text-[#8a4108] hover:bg-[#fff8f0] transition"
              >
                Sponsor Bhagwat Dham
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#dbe8f7] bg-gradient-to-br from-[#f5faff] via-[#ffffff] to-[#eef6ff] p-6 md:p-8 shadow-[0_10px_28px_rgba(13,59,102,0.08)]">
          <div className="text-center mb-5">
            <p className="text-xs uppercase tracking-wider text-[#2b618f] font-semibold">Devotional Aarti</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#123753]">Swaminarayan Aarti</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "hindi" ? null : "hindi"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "hindi"
                  ? "bg-[#0d3b66] text-white"
                  : "bg-white border border-[#cfe0f2] text-[#18476f] hover:bg-[#eef6ff]"
              }`}
            >
              Hindi
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "marathi" ? null : "marathi"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "marathi"
                  ? "bg-[#0d3b66] text-white"
                  : "bg-white border border-[#cfe0f2] text-[#18476f] hover:bg-[#eef6ff]"
              }`}
            >
              Marathi
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "gujarati" ? null : "gujarati"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "gujarati"
                  ? "bg-[#0d3b66] text-white"
                  : "bg-white border border-[#cfe0f2] text-[#18476f] hover:bg-[#eef6ff]"
              }`}
            >
              Gujarati
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "english" ? null : "english"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "english"
                  ? "bg-[#0d3b66] text-white"
                  : "bg-white border border-[#cfe0f2] text-[#18476f] hover:bg-[#eef6ff]"
              }`}
            >
              English
            </button>
          </div>

          {activeAartiLang && (
            <div className="mt-4 rounded-2xl border border-[#d9e7f5] bg-white p-4 md:p-5">
              <pre className="whitespace-pre-wrap font-sans leading-8 text-sm md:text-base text-[#23445f]">
                {SWAMINARAYAN_AARTI_TEXT[activeAartiLang]}
              </pre>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#e8b989] bg-gradient-to-br from-[#fff9f0] via-[#fffdf9] to-[#fff5ea] p-6 md:p-8 shadow-[0_12px_30px_rgba(163,71,11,0.12)]">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-wider text-[#a84e0f] font-semibold">ॐ Kundali Seva</p>
            <h2 className="text-2xl md:text-4xl font-black text-[#7f3200]">Kundali Nirman Seva (Birth Chart Creation)</h2>
            <p className="mt-3 text-[#7b4a22] max-w-4xl mx-auto">
              We provide professional Vedic Kundali (Birth Chart) creation services. Fill the form below with accurate birth details.
              After submitting the request, the user must complete the payment first, and then the kundali will be prepared and delivered.
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-[#efb48d] bg-[#fff1e7] px-4 py-3 text-[#8d3a08] text-sm md:text-base">
            <span className="font-bold">Important:</span> Please enter correct birth date, time, and place. Incorrect details may result in inaccurate Kundali.
          </div>

          <form onSubmit={handleKundaliSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">Full Name</label>
                <input
                  required
                  value={kundaliForm.fullName}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-[#efcfb0] px-3 py-2 outline-none focus:border-[#c46a1f]"
                />
              </div>

              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">Sex (Male / Female)</label>
                <div className="mt-2 flex gap-3">
                  {["Male", "Female"].map((sex) => (
                    <label key={sex} className="inline-flex items-center gap-2 text-sm text-[#6f4524]">
                      <input
                        type="radio"
                        name="sex"
                        checked={kundaliForm.sex === sex}
                        onChange={() => setKundaliForm((prev) => ({ ...prev, sex }))}
                      />
                      {sex}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={kundaliForm.dateOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-[#efcfb0] px-3 py-2 outline-none focus:border-[#c46a1f]"
                />
              </div>

              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">Time of Birth</label>
                <input
                  type="time"
                  required
                  value={kundaliForm.timeOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, timeOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-[#efcfb0] px-3 py-2 outline-none focus:border-[#c46a1f]"
                />
              </div>

              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">Place of Birth</label>
                <input
                  required
                  value={kundaliForm.placeOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, placeOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-[#efcfb0] px-3 py-2 outline-none focus:border-[#c46a1f]"
                />
              </div>

              <div className="rounded-xl border border-[#f1c9a4] bg-white p-4 shadow-sm">
                <label className="text-sm font-semibold text-[#7f3200]">District</label>
                <input
                  required
                  value={kundaliForm.district}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, district: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-[#efcfb0] px-3 py-2 outline-none focus:border-[#c46a1f]"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#7f3200] mb-3">Kundali Types (with selection boxes)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {KUNDALI_TYPES.map((item) => (
                  <label
                    key={item}
                    className="rounded-xl border border-[#f0c69d] bg-white px-4 py-3 text-[#6f4524] flex items-center gap-3 shadow-sm hover:shadow-md transition"
                  >
                    <input
                      type="checkbox"
                      checked={kundaliForm.kundaliTypes.includes(item)}
                      onChange={() => toggleSelection("kundaliTypes", item)}
                    />
                    <span>☸ {item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#7f3200] mb-3">Extra Kundali Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EXTRA_KUNDALI_REPORTS.map((item) => (
                  <label
                    key={item}
                    className="rounded-xl border border-[#f0c69d] bg-white px-4 py-3 text-[#6f4524] flex items-center gap-3 shadow-sm hover:shadow-md transition"
                  >
                    <input
                      type="checkbox"
                      checked={kundaliForm.extraReports.includes(item)}
                      onChange={() => toggleSelection("extraReports", item)}
                    />
                    <span>🔯 {item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#7f3200] mb-3">Language Preference</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["english", "hindi", "marathi", "gujarati"] as KundaliLanguage[]).map((lang) => (
                  <label
                    key={lang}
                    className={`rounded-xl border px-4 py-3 flex items-center gap-2 text-sm font-semibold capitalize cursor-pointer transition ${
                      kundaliForm.language === lang
                        ? "border-[#c46a1f] bg-[#fff1e2] text-[#8d3a08]"
                        : "border-[#f0c69d] bg-white text-[#6f4524]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="kundali-language"
                      checked={kundaliForm.language === lang}
                      onChange={() => setKundaliForm((prev) => ({ ...prev, language: lang }))}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="rounded-xl bg-[#b94a0f] px-6 py-3 text-white font-bold hover:bg-[#983707] transition shadow-[0_8px_18px_rgba(169,57,7,0.35)]"
              >
                Request Kundali
              </button>
            </div>
          </form>

          {showPayment && (
            <div className="mt-6 rounded-2xl border border-[#efb48d] bg-[#fff3e8] p-5">
              <p className="text-[#8d3a08] font-semibold text-center">
                Your Kundali request will be processed only after successful payment.
              </p>
              <div className="mt-4 flex flex-col md:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="rounded-lg bg-[#0d3b66] px-5 py-2.5 text-white font-semibold hover:bg-[#124d84] transition"
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#c46a1f] bg-white px-5 py-2.5 text-[#8d3a08] font-semibold hover:bg-[#fff7ef] transition"
                >
                  Razorpay (Placeholder)
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#c46a1f] bg-white px-5 py-2.5 text-[#8d3a08] font-semibold hover:bg-[#fff7ef] transition"
                >
                  UPI / Stripe (Placeholder)
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#deebf8] bg-[#f8fbff] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2b618f] font-semibold">Daily Rhythm</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#123753]">Swaminarayan Darshan Schedule</h2>
            </div>
            <p className="text-sm text-[#5d6b78]">Structured daily flow for darshan, aarti, and bhakti</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {DAILY_SCHEDULE.map((item) => (
              <article key={item.title} className="rounded-xl border border-[#d8e7f6] bg-white p-4 shadow-sm">
                <h3 className="font-bold text-[#1a3f63]">{item.title}</h3>
                <p className="mt-1 text-sm text-[#41607b]">{item.time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#efc290] bg-gradient-to-br from-[#fff8ef] via-[#ffffff] to-[#fff2e2] p-6 md:p-8 shadow-[0_12px_30px_rgba(177,92,23,0.12)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#a05216] font-semibold">ॐ Puja Seva</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#7a3604]">मंदिर की दैनिक पूजा और विशेष अनुष्ठान सेवा</h2>
            </div>
            <div className="inline-flex items-center rounded-full border border-[#efc290] bg-[#fff3e2] px-4 py-1.5 text-sm font-bold text-[#93490f]">
              {DAINIK_PUJA_SERVICES.length + VISHESH_ANUSHTHAN_SERVICES.length}+ सेवाएं उपलब्ध
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <article className="rounded-2xl border border-[#f0d2b0] bg-white p-5">
              <h3 className="text-xl font-black text-[#8b4209] mb-4">दैनिक पूजा सेवाएं</h3>
              <div className="space-y-3">
                {DAINIK_PUJA_SERVICES.map((item) => (
                  <div key={item.name} className="rounded-xl border border-[#f4dcc2] bg-[#fffaf4] p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#6f3a0c]">{item.name}</p>
                      <span className="rounded-full bg-[#b85b12] px-3 py-1 text-xs font-bold text-white">{item.price}</span>
                    </div>
                    <p className="text-xs text-[#9a6132] mt-2">समय: {item.timing}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/get-involved"
                        className="inline-flex items-center justify-center rounded-lg bg-[#0d3b66] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#124d84] transition"
                      >
                        Book Seva
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center justify-center rounded-lg border border-[#c47508] bg-[#fff4df] px-3 py-1.5 text-xs font-semibold text-[#a96305] hover:bg-[#ffeac6] transition"
                      >
                        Donate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-[#f0d2b0] bg-white p-5">
              <h3 className="text-xl font-black text-[#8b4209] mb-4">विशेष पूजा एवं अनुष्ठान</h3>
              <div className="space-y-3">
                {VISHESH_ANUSHTHAN_SERVICES.map((item) => (
                  <div key={item.name} className="rounded-xl border border-[#f4dcc2] bg-[#fffaf4] p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-[#6f3a0c]">{item.name}</p>
                      <span className="rounded-full bg-[#b85b12] px-3 py-1 text-xs font-bold text-white">{item.price}</span>
                    </div>
                    <p className="text-xs text-[#9a6132] mt-2">समय: {item.timing}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/get-involved"
                        className="inline-flex items-center justify-center rounded-lg bg-[#0d3b66] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#124d84] transition"
                      >
                        Book Seva
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center justify-center rounded-lg border border-[#c47508] bg-[#fff4df] px-3 py-1.5 text-xs font-semibold text-[#a96305] hover:bg-[#ffeac6] transition"
                      >
                        Donate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#dfe7ef] bg-gradient-to-br from-[#ffffff] via-[#fbfdff] to-[#f6faff] p-6 md:p-8 shadow-[0_10px_28px_rgba(13,59,102,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#21618f] font-semibold">Seva Matrix</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#123753]">Swaminarayan Seva and Satsang Grid</h2>
            </div>
            <div className="inline-flex items-center rounded-full border border-[#c3d8ef] bg-[#eff6ff] px-4 py-1.5 text-sm font-bold text-[#1f5b88]">
              {totalFeatures}+ Active Seva
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SWAMINARAYAN_FEATURE_GROUPS.map((group) => (
              <details
                key={group.name}
                className="group rounded-2xl border border-[#e4edf7] bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base md:text-lg font-black text-[#18476f]">{group.name}</h3>
                    <span className="rounded-full border border-[#d7e5f5] bg-[#f5f9ff] px-3 py-1 text-xs font-semibold text-[#2e5f88]">
                      {group.items.length} Sevas
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-[#e0ecf8] bg-[#f8fbff] px-2.5 py-1 text-xs text-[#4a5f73]"
                      >
                        {feature}
                      </span>
                    ))}
                    {group.items.length > 4 && (
                      <span className="rounded-full border border-[#e0ecf8] bg-[#f8fbff] px-2.5 py-1 text-xs text-[#4a5f73]">
                        +{group.items.length - 4} more
                      </span>
                    )}
                  </div>
                </summary>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((feature) => (
                    <div key={feature} className="rounded-lg border border-[#edf2f8] bg-[#fcfeff] px-3 py-2 text-sm text-[#435261]">
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to="/get-involved"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0d3b66] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#124d84] transition"
                  >
                    Join
                  </Link>
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center rounded-lg border border-[#c47508] bg-[#fff4df] px-3 py-1.5 text-xs font-semibold text-[#a96305] hover:bg-[#ffeac6] transition"
                  >
                    Donate
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#e0e8f2] bg-gradient-to-br from-[#f8fbff] via-[#ffffff] to-[#f1f7ff] p-6 md:p-8 shadow-[0_10px_26px_rgba(13,59,102,0.07)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#2b618f] font-semibold">Divine Moments</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#123753]">Swaminarayan Gallery</h2>
            </div>
            <Link
              to="/mandir/gallery"
              className="inline-flex items-center justify-center rounded-lg bg-[#0d3b66] px-4 py-2 text-sm font-semibold text-white hover:bg-[#124d84] transition"
            >
              View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Mangala Darshan Highlights",
              "Swaminarayan Jayanti Utsav",
              "Annakut Darshan Decor",
              "Bal Sabha Activities",
            ].map((title, index) => (
              <article
                key={title}
                className="aspect-[4/3] rounded-xl border border-[#d7e6f5] bg-gradient-to-br from-[#eef5ff] to-[#dcecff] p-3 flex items-end"
              >
                <p className="text-xs md:text-sm font-semibold text-[#18476f]">
                  {index + 1}. {title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#f1ddbf] bg-gradient-to-r from-[#fff6e8] to-[#ffedd0] p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-[#7a4f1f]">Shree Swaminarayan Bhagwan Blessings</h2>
          <p className="mt-2 max-w-3xl mx-auto text-[#6f5a3c]">
            Join nitya darshan, scripture study, satsang sabha, and seva initiatives to build spiritual discipline and a value-centered life rooted in Swaminarayan teachings.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/mandir" className="btn-secondary">
              Visit Main Mandir
            </Link>
            <Link to="/get-involved" className="btn-primary">
              Register for Seva
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});
