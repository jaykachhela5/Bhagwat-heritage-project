import { memo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const HERO_STATS = [
  { label: "Daily Darshan", note: "Expected daily devotee presence across the mandir darshan flow." },
  { label: "Satsang Groups", note: "Connected satsang circles participating in the campus vision." },
  { label: "Annual Utsavs", note: "Festivals and devotional observances planned through the year." },
  { label: "Volunteer Services", note: "Service pathways supporting pilgrims, events, and mandir operations." },
];

type ProjectFocusCategory = "All" | "Masterplan" | "Spiritual" | "Service" | "Pilgrim";

const PROJECT_FOCUS_AREAS = [
  {
    category: "Masterplan" as const,
    title: "Bhagwat Dham Masterplan",
    desc: "A unified temple campus concept with mandir space, satsang gathering areas, Service infrastructure, and a spiritually coherent visitor journey.",
    feature: "Campus planning, sacred layout discipline, and phased development structure.",
  },
  {
    category: "Spiritual" as const,
    title: "Spiritual Core Experience",
    desc: "The project is designed as a center for darshan, aarti, satsang, scripture listening, and value-based devotional living.",
    feature: "Daily darshan rhythm, festival cycle, and mandir-centered spiritual atmosphere.",
  },
  {
    category: "Service" as const,
    title: "Integrated Service Infrastructure",
    desc: "Bhagwat Dham should support food service, devotional hosting, volunteer management, outreach support, and social service coordination.",
    feature: "Service-linked halls, support counters, volunteer flow, and service planning layers.",
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
    title: "Phase 3 - Service and Pilgrim Expansion",
    desc: "Add practical support for food service, help desks, family waiting zones, volunteer systems, and yatri support features.",
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
  "Service hall, prasad, and volunteer support infrastructure",
];

const DAILY_SCHEDULE = [
  { title: "Morning Darshan", time: "05:15 AM - 06:00 AM" },
  { title: "Morning Aarti", time: "07:00 AM - 07:30 AM" },
  { title: "Midday Darshan", time: "11:30 AM - 12:15 PM" },
  { title: "Evening Aarti", time: "06:30 PM - 07:15 PM" },
  { title: "Night Darshan", time: "08:30 PM - 09:00 PM" },
];

type AartiLanguage = "hindi" | "marathi" | "gujarati" | "english";
type KundaliLanguage = "english" | "hindi" | "marathi" | "gujarati";

type PujaItem = {
  name: string;
  price: string;
  timing: string;
};

const SWAMINARAYAN_FEATURE_GROUPS = [
  {
    name: "Daily Darshan and Aarti",
    items: [
      "Morning Darshan",
      "Adorned Darshan",
      "Midday Darshan",
      "Afternoon Darshan",
      "Evening Darshan",
      "Night Darshan",
      "Morning Aarti",
      "Evening Aarti",
    ],
  },
  {
    name: "Scripture and Study",
    items: [
      "Vachanamrut Study",
      "Shikshapatri Reading",
      "Satsangi Jivan Study",
      "Bhagavad Gita Reflection",
      "Upanishad Introduction",
      "Kirtan Training",
      "Scripture Study Session",
      "Children's Study Class",
    ],
  },
  {
    name: "Swaminarayan Devotion",
    items: [
      "Swaminarayan Mantra Chanting",
      "Thal Offering Service",
      "Flower Offering Service",
      "Deity Decoration Service",
      "Tulsi Garland Service",
      "Temple Circumambulation Service",
      "Akshar Purushottam Devotional Gathering",
      "Ekadashi Devotional Evening",
    ],
  },
  {
    name: "Youth and Children Activities",
    items: [
      "Children's Weekly Meeting",
      "Teen Weekly Meeting",
      "Young Men's Satsang",
      "Young Women's Satsang",
      "Value Education Workshops",
      "Public Speaking Training",
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
    name: "Temple Service Departments",
    items: [
      "Temple Cleaning Service",
      "Prasad Distribution Service",
      "Parking Service",
      "Crowd Management Service",
      "Festival Decoration Service",
      "Audio and Stage Service",
      "Annakut Preparation Service",
      "Book Stall Service",
    ],
  },
  {
    name: "Spiritual Guidance",
    items: [
      "Discipline Guidance Session",
      "Daily Worship Training",
      "Family Satsang Counseling",
      "Children's Values Guidance",
      "Youth Career and Dharma Mentoring",
      "Householder Dharma Guidance",
      "Virtuous Conduct Workshop",
      "Daily Prayer Coaching",
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
      "Disaster Relief Service",
      "Tree Plantation Drive",
    ],
  },
];

const totalFeatures = SWAMINARAYAN_FEATURE_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const ENGLISH_DAILY_PUJA_SERVICES: PujaItem[] = [
  { name: "Morning Aarti Puja Service", price: "Rs 1,100", timing: "05:30 AM" },
  { name: "Evening Aarti Puja Service", price: "Rs 1,100", timing: "06:30 PM" },
  { name: "Bal Bhog Service", price: "Rs 751", timing: "08:00 AM" },
  { name: "Rajbhog Service", price: "Rs 2,100", timing: "11:30 AM" },
  { name: "Falahar Bhog Service", price: "Rs 901", timing: "04:00 PM" },
  { name: "Night Bhog Service", price: "Rs 1,251", timing: "08:15 PM" },
  { name: "Thakorji Shringar Vastra Service", price: "Rs 3,100", timing: "Daily" },
  { name: "Maha Abhishek Service", price: "Rs 5,100", timing: "Special Slot" },
];

const ENGLISH_SPECIAL_PUJA_SERVICES: PujaItem[] = [
  { name: "Navgraha Peace Ritual", price: "Rs 7,100", timing: "By Booking" },
  { name: "Nakshatra Peace Ritual", price: "Rs 6,100", timing: "By Booking" },
  { name: "Birth Blessing Ritual", price: "Rs 5,100", timing: "By Booking" },
  { name: "Great Rudra Ritual", price: "Rs 11,000", timing: "By Booking" },
  { name: "Navchandi Reading", price: "Rs 21,000", timing: "By Booking" },
  { name: "Ganpati Atharvashirsha Ritual", price: "Rs 8,100", timing: "By Booking" },
  { name: "Mahamrityunjaya Ritual", price: "Rs 9,100", timing: "By Booking" },
  { name: "Mahasudarshan Ritual", price: "Rs 15,100", timing: "By Booking" },
];

const ENGLISH_AARTI_TEXT = `Swaminarayan Aarti
This aarti honors Shri Swaminarayan Bhagwan with devotion, gratitude, and remembrance.

It is offered as a prayer of surrender, service, and spiritual discipline.`;
const sectionShellClass =
  "rounded-3xl border border-white/10 bg-[var(--campaign-bg)] p-6 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.18)]";
const sectionEyebrowClass =
  "text-[22px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] md:text-[24px]";
const sectionTitleClass = "mt-2 text-[16px] font-black text-white md:text-[22px]";
const sectionBodyClass = "text-base leading-8 text-[var(--campaign-text)] md:text-lg";
const sectionCardClass =
  "rounded-2xl border border-white/10 bg-[#156b86] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.15)]";

export default memo(function GhanshyamPage() {
  const [activeAartiLang, setActiveAartiLang] = useState<AartiLanguage | null>(null);
  const [activeProjectFocus, setActiveProjectFocus] = useState<ProjectFocusCategory>("All");

  const visibleProjectAreas =
    activeProjectFocus === "All"
      ? PROJECT_FOCUS_AREAS
      : PROJECT_FOCUS_AREAS.filter((item) => item.category === activeProjectFocus);

  return (
    <div className="bg-[#082638] pb-12">
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div className="relative h-[360px] overflow-hidden rounded-[32px] border border-[#dce8ff] bg-[#0b2741] shadow-[0_18px_45px_rgba(12,38,74,0.35)] md:h-[520px]">
          <div
            className="absolute inset-0 scale-[1.02] bg-cover bg-center brightness-[1.14] contrast-[1.08] saturate-[1.08]"
            style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1774791426/ghanshyamji_ly7wbt.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,23,40,0.14)_0%,rgba(9,35,58,0.18)_36%,rgba(7,28,46,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0)_62%)]" />
        </div>

        <div className="mt-5 text-center text-white md:mt-6">
          <h1 className="mb-[10px] text-4xl font-bold leading-tight md:text-5xl">
            Bhagwat Dham Swaminarayan Temple
          </h1>
          <p className="mx-auto mb-[10px] max-w-5xl text-[20px] font-semibold leading-tight text-white md:text-[32px]">
            A divine vision of Service, satsang, and spiritual living inspired by Shree Swaminarayan Bhagwan.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/get-involved"
              className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
            >
              Join Satsang Service
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
            >
              Donate for Mandir Service
            </Link>
            <Link
              to="/mandir/gallery"
              className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/18"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-20 mt-[14px] pb-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {HERO_STATS.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[24px] font-black uppercase tracking-wide text-[var(--campaign-accent)]">{item.label}</p>
                <p className="mt-1 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden">
        <div className={sectionShellClass}>
          {/*
          {/*
          <div className="text-center">
            <p className={sectionEyebrowClass}>Project Overview</p>
            <h2 className={sectionTitleClass}>About Bhagwat Dham Project</h2>
          </div>

          <p className={`mx-auto mt-5 max-w-4xl text-center ${sectionBodyClass}`}>
            Bhagwat Dham is presented here as a complete spiritual campus vision, not only as a mandir name. The page explains
            how the project can support darshan, satsang, Service, pilgrim guidance, and long-term cultural-spiritual growth.
          </p>
          <p className={`mx-auto mt-4 max-w-4xl text-center ${sectionBodyClass}`}>
            This structure helps devotees understand the purpose of Bhagwat Dham, the development areas it supports, and the
            practical ways families, sponsors, and volunteers can participate.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Sacred Campus Vision",
                desc: "Bhagwat Dham is presented as a complete devotional campus rather than a single-use mandir building.",
              },
              {
                title: "Service + Satsang Integration",
                desc: "The page now explains how worship, festivals, service, and visitor support can work together inside the project.",
              },
              {
                title: "Pilgrim-Ready Experience",
                desc: "Families and yatris need guidance, flow, and support, so the project page now reflects that real need.",
              },
            ].map((item) => (
              <div key={item.title} className={sectionCardClass}>
                <h3 className="text-[24px] font-black uppercase tracking-[0.05em] text-[var(--campaign-accent)]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={sectionShellClass}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={sectionEyebrowClass}>New Feature</p>
              <h2 className={sectionTitleClass}>Bhagwat Dham Project Vision Explorer</h2>
              <p className={`mt-3 max-w-3xl ${sectionBodyClass}`}>
                Filter the project by focus area so visitors can understand the masterplan, spiritual use, Service role, and pilgrim value of Bhagwat Dham more clearly.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Masterplan", "Spiritual", "Service", "Pilgrim"] as const).map((focus) => {
                const active = focus === activeProjectFocus;
                return (
                  <button
                    key={focus}
                    type="button"
                    onClick={() => setActiveProjectFocus(focus)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[var(--campaign-accent)] text-white"
                        : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
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
              <div key={item.title} className={sectionCardClass}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--campaign-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--campaign-text)]">
                    Project Insight
                  </span>
                </div>
                <h3 className="mt-4 text-[24px] font-black uppercase tracking-[0.05em] text-[var(--campaign-accent)]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/75">Feature Focus</p>
                  <p className="mt-2 text-base leading-8 text-white md:text-lg">{item.feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className={sectionShellClass}>
            <p className={sectionEyebrowClass}>Development Roadmap</p>
            <h2 className={sectionTitleClass}>Bhagwat Dham Growth Phases</h2>
            <div className="mt-6 space-y-4">
              {PROJECT_DEVELOPMENT_PHASES.map((phase, index) => (
                <div key={phase.title} className={sectionCardClass}>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/75">Stage {index + 1}</p>
                  <h3 className="mt-2 text-[22px] font-black text-[var(--campaign-accent)] md:text-[24px]">{phase.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={sectionShellClass}>
            <h2 className={sectionTitleClass}>Where Support Can Help</h2>
            <ul className="mt-6 space-y-3">
              {PROJECT_SUPPORT_TRACKS.map((line) => (
                <li key={line} className="flex gap-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">
                  <span className="mt-3 h-2.5 w-2.5 rounded-full bg-[var(--campaign-accent)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--campaign-accent-hover)] transition"
              >
                Support Project
              </Link>
              <Link
                to="/get-involved/sponsor-programs"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Sponsor Bhagwat Dham
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={sectionShellClass}>
          <div className="text-center mb-5">
            <p className={sectionEyebrowClass}>Devotional Aarti</p>
            <h2 className={sectionTitleClass}>Swaminarayan Aarti</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "hindi" ? null : "hindi"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "hindi"
                  ? "bg-[var(--campaign-accent)] text-white"
                  : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Hindi
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "marathi" ? null : "marathi"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "marathi"
                  ? "bg-[var(--campaign-accent)] text-white"
                  : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Marathi
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "gujarati" ? null : "gujarati"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "gujarati"
                  ? "bg-[var(--campaign-accent)] text-white"
                  : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Gujarati
            </button>
            <button
              type="button"
              onClick={() => setActiveAartiLang((prev) => (prev === "english" ? null : "english"))}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                activeAartiLang === "english"
                  ? "bg-[var(--campaign-accent)] text-white"
                  : "border border-white/15 bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              English
            </button>
          </div>

          {activeAartiLang && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#156b86] p-4 md:p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-8 text-white md:text-base">
                {ENGLISH_AARTI_TEXT}
              </pre>
            </div>
          )}
        </div>
      </section>

      <section className="hidden">
        <div className={sectionShellClass}>
          {/*
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">Full Name</label>
                <input
                  required
                  value={kundaliForm.fullName}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white px-3 py-2 text-[#173b57] outline-none focus:border-[var(--campaign-accent)]"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">Sex (Male / Female)</label>
                <div className="mt-2 flex gap-3">
                  {["Male", "Female"].map((sex) => (
                    <label key={sex} className="inline-flex items-center gap-2 text-sm text-[var(--campaign-text)]">
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

              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={kundaliForm.dateOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white px-3 py-2 text-[#173b57] outline-none focus:border-[var(--campaign-accent)]"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">Time of Birth</label>
                <input
                  type="time"
                  required
                  value={kundaliForm.timeOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, timeOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white px-3 py-2 text-[#173b57] outline-none focus:border-[var(--campaign-accent)]"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">Place of Birth</label>
                <input
                  required
                  value={kundaliForm.placeOfBirth}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, placeOfBirth: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white px-3 py-2 text-[#173b57] outline-none focus:border-[var(--campaign-accent)]"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                <label className="text-sm font-semibold text-white">District</label>
                <input
                  required
                  value={kundaliForm.district}
                  onChange={(e) => setKundaliForm((prev) => ({ ...prev, district: e.target.value }))}
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white px-3 py-2 text-[#173b57] outline-none focus:border-[var(--campaign-accent)]"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[22px] font-black text-[var(--campaign-accent)]">Kundali Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ENGLISH_KUNDALI_TYPES.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#156b86] px-4 py-3 text-white shadow-sm transition hover:bg-[#1a7692] [&>span:last-of-type]:hidden"
                  >
                    <input
                      type="checkbox"
                      checked={kundaliForm.kundaliTypes.includes(item)}
                      onChange={() => toggleSelection("kundaliTypes", item)}
                    />
                    <span className="text-base leading-7 text-white md:text-lg">{item}</span>
                    <span>Ã¢ËœÂ¸ {item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[22px] font-black text-[var(--campaign-accent)]">Extra Kundali Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ENGLISH_EXTRA_KUNDALI_REPORTS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#156b86] px-4 py-3 text-white shadow-sm transition hover:bg-[#1a7692] [&>span:last-of-type]:hidden"
                  >
                    <input
                      type="checkbox"
                      checked={kundaliForm.extraReports.includes(item)}
                      onChange={() => toggleSelection("extraReports", item)}
                    />
                    <span className="text-base leading-7 text-white md:text-lg">{item}</span>
                    <span>Ã°Å¸â€Â¯ {item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-[22px] font-black text-[var(--campaign-accent)]">Language Preference</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["english", "hindi", "marathi", "gujarati"] as KundaliLanguage[]).map((lang) => (
                  <label
                    key={lang}
                    className={`rounded-xl border px-4 py-3 flex items-center gap-2 text-sm font-semibold capitalize cursor-pointer transition ${
                      kundaliForm.language === lang
                        ? "border-[var(--campaign-accent)] bg-[var(--campaign-accent)]/10 text-white"
                        : "border-white/10 bg-[#156b86] text-[var(--campaign-text)]"
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
                className="rounded-xl bg-[var(--campaign-accent)] px-6 py-3 font-bold text-white transition hover:bg-[var(--campaign-accent-hover)] shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
              >
                Request a Kundali
              </button>
            </div>
          </form>

          {showPayment && (
            <div className="mt-6 rounded-2xl border border-[var(--campaign-accent)]/40 bg-[var(--campaign-accent)]/10 p-5">
              <p className="text-center font-semibold text-white">
                Your Kundali request will be processed only after successful payment.
              </p>
              <div className="mt-4 flex flex-col md:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="rounded-lg bg-[#0f678c] px-5 py-2.5 text-white font-semibold hover:bg-[#0c5b7d] transition"
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-white font-semibold hover:bg-white/15 transition"
                >
                  Razorpay (Placeholder)
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-white font-semibold hover:bg-white/15 transition"
                >
                  UPI / Stripe (Placeholder)
                </button>
              </div>
            </div>
          )}
          */}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={sectionShellClass}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-5">
            <div>
              <p className={sectionEyebrowClass}>Daily Rhythm</p>
              <h2 className={sectionTitleClass}>Swaminarayan Darshan Schedule</h2>
            </div>
            <p className="text-sm text-[var(--campaign-text)] md:text-base">Structured daily flow for darshan, aarti, and bhakti.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
            {DAILY_SCHEDULE.map((item) => (
              <article key={item.title} className={sectionCardClass}>
                <h3 className="text-[22px] font-black text-[var(--campaign-accent)]">{item.title}</h3>
                <p className="mt-2 text-base text-white md:text-lg">{item.time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className={sectionShellClass}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <div>
              <p className={sectionEyebrowClass}>Puja Service</p>
              <h2 className={sectionTitleClass}>Daily Puja and Special Ritual Services</h2>
            </div>
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-white">
              {ENGLISH_DAILY_PUJA_SERVICES.length + ENGLISH_SPECIAL_PUJA_SERVICES.length}+ services available
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <article className={sectionCardClass}>
              <h3 className="mb-4 text-[24px] font-black uppercase tracking-[0.05em] text-[var(--campaign-accent)]">Daily Worship Services</h3>
              <div className="space-y-3">
                {ENGLISH_DAILY_PUJA_SERVICES.map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-lg font-black text-white">{item.name}</p>
                      <span className="rounded-full bg-[var(--campaign-accent)] px-3 py-1 text-xs font-bold text-white">{item.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--campaign-text)]">Timing: {item.timing}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/get-involved"
                        className="inline-flex items-center justify-center rounded-lg bg-[#0f678c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0c5b7d] transition"
                      >
                        Book Service
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition"
                      >
                        Donate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={sectionCardClass}>
              <h3 className="mb-4 text-[24px] font-black uppercase tracking-[0.05em] text-[var(--campaign-accent)]">Special Worship and Ritual Services</h3>
              <div className="space-y-3">
                {ENGLISH_SPECIAL_PUJA_SERVICES.map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-lg font-black text-white">{item.name}</p>
                      <span className="rounded-full bg-[var(--campaign-accent)] px-3 py-1 text-xs font-bold text-white">{item.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--campaign-text)]">Timing: {item.timing}</p>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/get-involved"
                        className="inline-flex items-center justify-center rounded-lg bg-[#0f678c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0c5b7d] transition"
                      >
                        Book Service
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition"
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
        <div className={sectionShellClass}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
            <div>
              <h2 className={sectionTitleClass}>Swaminarayan Service and Satsang Grid</h2>
            </div>
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-white">
              {totalFeatures}+ Active Service
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SWAMINARAYAN_FEATURE_GROUPS.map((group) => (
              <details
                key={group.name}
                className="group rounded-2xl border border-white/10 bg-[#156b86] p-4 shadow-sm transition hover:bg-[#1a7692]"
              >
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-black text-[var(--campaign-accent)] md:text-lg">{group.name}</h3>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      {group.items.length} Services
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-[var(--campaign-text)]"
                      >
                        {feature}
                      </span>
                    ))}
                    {group.items.length > 4 && (
                      <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-[var(--campaign-text)]">
                        +{group.items.length - 4} more
                      </span>
                    )}
                  </div>
                </summary>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((feature) => (
                    <div key={feature} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white">
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    to="/get-involved"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0f678c] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0c5b7d] transition"
                  >
                    Join
                  </Link>
                  <Link
                    to="/donate"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/15 transition"
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
        <div className={sectionShellClass + " text-center"}>
          <p className={sectionEyebrowClass}>Spiritual Blessings</p>
          <h2 className={sectionTitleClass}>Shree Swaminarayan Bhagwan Blessings</h2>
          <p className={`mx-auto mt-3 max-w-3xl ${sectionBodyClass}`}>
            Join nitya darshan, scripture study, satsang sabha, and Service initiatives to build spiritual discipline and a value-centered life rooted in Swaminarayan teachings.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/get-involved" className="btn-primary">
              Register for Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});





