import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../app/routes/routes";

const QUICK_HIGHLIGHTS = [
  { title: "Relief Helpline", value: "+91 98765 43210", note: "Medicine request and support coordination" },
  { title: "Medical Volunteers", value: "180+", note: "Doctors, pharmacists, and seva coordinators" },
  { title: "Rural Coverage", value: "26", note: "Villages and outreach zones served monthly" },
  { title: "Critical Support", value: "< 24 hrs", note: "Average response for urgent medicine requests" },
];

const KEY_FEATURES = [
  {
    title: "Free Medicine Distribution",
    desc: "Essential medicines supplied to low-income families, elderly patients, and chronic illness beneficiaries.",
  },
  {
    title: "Health Camps and Screening",
    desc: "Regular camps for checkups, consultations, diagnosis support, and follow-up treatment planning.",
  },
  {
    title: "Chronic Care Assistance",
    desc: "Continued support for diabetes, blood pressure, and other long-term treatment needs in vulnerable communities.",
  },
];

const IMPACT = [
  { label: "Medicines Distributed", target: 250000 },
  { label: "Patients Supported", target: 18000 },
  { label: "Medical Camps Conducted", target: 320 },
  { label: "Volunteer Health Team", target: 180 },
];

const DISTRIBUTION_MODEL = [
  {
    step: "1. Identify Patients",
    desc: "Field teams, camps, and local contacts identify families and patients needing medicine support.",
  },
  {
    step: "2. Verify Prescription",
    desc: "Doctors and coordinators review medical need, prescriptions, and urgency before dispatch.",
  },
  {
    step: "3. Distribute Medicines",
    desc: "Medicines are delivered through camps, outreach points, or verified beneficiary support channels.",
  },
  {
    step: "4. Follow-up Care",
    desc: "Health teams track continuity, refill requirements, and long-term treatment support.",
  },
];

const SUPPORT_AREAS = [
  "General fever, infection, and seasonal illness medicine support",
  "Blood pressure and diabetes medicine continuity assistance",
  "Women's health and senior citizen care support",
  "Health camp-based consultation and medicine distribution",
];

const DONATION_TIERS = [
  { label: "Basic Medicine Kit", amount: "Rs 1,100", note: "Essential support for one beneficiary family" },
  { label: "Camp Support Sponsor", amount: "Rs 7,500", note: "Medicines and supplies for one local health camp" },
  { label: "Monthly Patient Care", amount: "Rs 21,000", note: "Ongoing medicine support for chronic care cases" },
];

const STORIES = [
  {
    name: "Village Health Beneficiary",
    quote: "Regular medicine support helped my father continue treatment without missing doses during difficult months.",
  },
  {
    name: "Medical Camp Volunteer",
    quote: "This seva connects diagnosis, medicine, and compassion in one place. It is practical service with immediate impact.",
  },
  {
    name: "Senior Citizen Support Team",
    quote: "For many elderly patients, monthly medicine support is the difference between stability and suffering.",
  },
];

const FAQS = [
  {
    q: "How is medicine distribution organized?",
    a: "The trust works through camps, verified requests, and community outreach to supply essential medicines where they are needed most.",
  },
  {
    q: "Can I donate specifically for medicine kits?",
    a: "Yes. Donations can be directed toward medicine kits, camp support, chronic care assistance, and general health seva.",
  },
  {
    q: "Can doctors or pharmacists join this seva?",
    a: "Yes. Medical professionals and support volunteers can join through the volunteer registration route and help in camps and field outreach.",
  },
];

export default memo(function MedicinePage() {
  usePageMeta(
    "Medicine Distribution",
    "Free medicine distribution, health camps, chronic care support, and volunteer-led medical seva for underserved communities.",
  );

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Medicine Distribution Seva"
        subtitle="Delivering essential medicines and health support to families in need"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Donate Medicines
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Join Medical Seva
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/40 bg-[#133a56]/95 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-[#ffb06a] text-xs uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-2xl font-black mt-1">{item.value}</p>
                <p className="text-[#d4e1e8] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Medicine Distribution</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed">
            Medicine Distribution Seva is dedicated to ensuring that essential medicines reach patients who cannot regularly
            afford treatment, especially in rural communities, low-income households, and chronic care cases.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-xl leading-relaxed mt-5">
            This page is intentionally different from the education page. It focuses entirely on medical camps, patient
            support, medicine access, health volunteers, and recurring treatment continuity.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {KEY_FEATURES.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center shadow-sm">
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#d4e1e8] text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} theme="dark" />

      <section className="py-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">How Medicine Seva Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DISTRIBUTION_MODEL.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <h3 className="text-2xl font-black text-white mb-3">{item.step}</h3>
              <p className="text-[#d4e1e8]">{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="pb-16 bg-[#0a2534]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-8">
          <h3 className="text-4xl font-black text-white mb-5">Support Areas</h3>
          <ul className="space-y-3 text-[#d4e1e8] text-lg">
            {SUPPORT_AREAS.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] rounded-2xl p-8 text-white">
          <h3 className="text-4xl font-black mb-4">Join or Sponsor Medical Seva</h3>
          <p className="text-white/95 text-lg mb-6">
            Contribute medicine kits, sponsor camps, or join as a health volunteer to help patients receive timely support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {DONATION_TIERS.map((tier) => (
              <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                <p className="text-base font-semibold">{tier.label}</p>
                <p className="text-2xl font-black mt-1">{tier.amount}</p>
                <p className="text-sm text-white/85 mt-2">{tier.note}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.donate} className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Donate Now
            </Link>
            <Link to={ROUTES.involved.volunteer} className="bg-white text-[#0f5a98] font-semibold px-6 py-3 rounded-lg">
              Volunteer in Camps
            </Link>
          </div>
        </div>
        </div>
      </section>

      <section className="pb-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STORIES.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <p className="text-[#d4e1e8] text-lg leading-relaxed">"{item.quote}"</p>
              <p className="text-[#ffb06a] font-semibold mt-4">{item.name}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="pb-16 bg-[#0a2534]">
        <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5 shadow-sm">
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
