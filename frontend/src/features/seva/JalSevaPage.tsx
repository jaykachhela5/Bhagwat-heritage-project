import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";

const ABOUT_FEATURES = [
  {
    icon: "🌞",
    title: "Summer Water Camps",
    desc: "Water stalls during peak heat seasons.",
  },
  {
    icon: "🏛️",
    title: "Temple Seva",
    desc: "Continuous drinking water facility for devotees.",
  },
  {
    icon: "🚰",
    title: "Rural Support",
    desc: "Providing water tanks in underprivileged areas.",
  },
];

const IMPACT_STATS = [
  { value: "1,000,000+", label: "Litres of Water Provided" },
  { value: "150+", label: "Villages Served" },
  { value: "500,000+", label: "Meals Served" },
  { value: "10,000+", label: "Families Helped" },
];

const MONTHLY_OPERATIONS = [
  "Daily water stalls near mandir and pilgrimage zones.",
  "Mobile tanker distribution in drought-affected villages.",
  "School hydration points and filtration unit maintenance.",
  "Ann Seva support for laborers, elderly, and homeless families.",
];

const QUICK_HIGHLIGHTS = [
  { title: "24x7 Seva Hotline", value: "+91 98765 43210", note: "Emergency water support coordination" },
  { title: "Volunteer Network", value: "1,200+", note: "Active ground seva contributors" },
  { title: "District Coverage", value: "18", note: "Operational outreach zones" },
  { title: "Response Time", value: "< 6 hrs", note: "Average camp deployment window" },
];

const PROCESS_STEPS = [
  {
    step: "1. Need Mapping",
    desc: "Local teams identify water-scarcity areas and beneficiary clusters.",
  },
  {
    step: "2. Camp Deployment",
    desc: "Tankers, storage points, and distribution counters are arranged.",
  },
  {
    step: "3. Daily Distribution",
    desc: "Clean water and Ann Seva delivered with volunteer supervision.",
  },
  {
    step: "4. Follow-up & Reporting",
    desc: "Impact metrics tracked and next-cycle support planned.",
  },
];

const STORIES = [
  {
    name: "Savita Tai, Village Beneficiary",
    quote:
      "In summer months, the Jal Seva camps became our only reliable water source. The support changed our daily life.",
  },
  {
    name: "Rohit, Seva Volunteer",
    quote:
      "Serving in water camps taught me the true meaning of compassion and discipline. Every weekend now goes to seva.",
  },
  {
    name: "Temple Committee, Chandrapur",
    quote:
      "Continuous water seva during gatherings has improved health and comfort for thousands of devotees.",
  },
];

const GALLERY = ["/images/jal1.png", "/images/jal.png", "/images/annseva.png", "/images/nihsulksevasivir.png"];

export default memo(function JalSevaPage() {
  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Jal / Ann Seva"
        subtitle="Providing Water & Food to Those in Need"
        backgroundImage="/images/jal1.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center bg-[#ff8a00] hover:bg-[#e97b00] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Donate for Jal Seva
          </Link>
          <Link
            to="/volunteer"
            className="inline-flex items-center bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Become Volunteer
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/15 bg-[#143446]/95 backdrop-blur-sm p-4 shadow-lg"
              >
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
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">About Jal Seva</h2>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed">
            Jal Seva is a sacred initiative by Bhagwat Heritage Service Foundation Trust aimed at
            providing clean and safe drinking water during extreme summer heat and spiritual gatherings.
          </p>
          <p className="max-w-4xl mx-auto text-center text-[#d7e3ea] text-2xl leading-relaxed mt-5">
            Thousands of devotees and needy individuals benefit every year through our water
            distribution camps across Maharashtra.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            {ABOUT_FEATURES.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-4xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-[#c8d6df] text-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#153346] p-5">
                <p className="text-[#ffb06a] text-sm uppercase tracking-wide">{item.title}</p>
                <p className="text-white text-3xl font-black mt-2">{item.value}</p>
                <p className="text-[#c7d7e1] text-sm mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-[#1b3646]/80 p-8 text-center"
              >
                <p className="text-5xl font-black text-[#ffb06a]">{item.value}</p>
                <p className="text-[#d4e1e8] mt-2 text-xl">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c2a3a] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">How Jal Seva Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((item) => (
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
            <h3 className="text-4xl font-black text-white mb-5">Monthly Seva Operations</h3>
            <ul className="space-y-3 text-[#d4e1e8] text-xl">
              {MONTHLY_OPERATIONS.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] rounded-2xl p-6 text-white shadow-sm">
            <h3 className="text-4xl font-black mb-4">Support Jal Seva</h3>
            <p className="text-xl text-white/95 mb-6">
              Your contribution helps us run water camps, tankers, and Ann Seva support for people
              who need it most.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Sponsor One Day", amount: "Rs 1,100" },
                { label: "Weekly Sponsor", amount: "Rs 7,700" },
                { label: "Monthly Sponsor", amount: "Rs 31,000" },
              ].map((tier) => (
                <div key={tier.label} className="rounded-xl bg-white/15 p-4 text-center">
                  <p className="text-base font-semibold">{tier.label}</p>
                  <p className="text-2xl font-black mt-1">{tier.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/donate"
                className="inline-block bg-white text-[#cf4f00] font-semibold px-6 py-3 rounded-xl"
              >
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="inline-block bg-[#11283a] text-white font-semibold px-6 py-3 rounded-xl"
              >
                Become Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-10">Beneficiary Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STORIES.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] p-6">
                <p className="text-[#dbe7ee] text-xl leading-relaxed">"{item.quote}"</p>
                <p className="text-[#ffb06a] font-semibold text-lg mt-4">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Jal Seva Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((src) => (
              <img
                key={src}
                src={src}
                alt="Jal Seva Activity"
                className="w-full h-52 rounded-xl object-cover border border-white/10"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: "How is donation used in Jal Seva?",
                a: "Donations are used for water procurement, tanker movement, camp setup, and beneficiary logistics.",
              },
              {
                q: "Can I sponsor a specific village or camp?",
                a: "Yes. You can choose targeted support and our team will share planned locations and impact updates.",
              },
              {
                q: "How can I join as a volunteer?",
                a: "Use the 'Become Volunteer' button on this page to register. The seva team will connect with you.",
              },
            ].map((item) => (
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
