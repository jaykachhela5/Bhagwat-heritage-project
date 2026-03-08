import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ImpactCounter } from "../../components/ui/ImpactCounter";

const IMPACT = [
  { label: "Individuals Recovered", target: 800 },
  { label: "Awareness Camps", target: 200 },
  { label: "Recovery Success", target: 95, suffix: "%" },
  { label: "Families Counseled", target: 1500 },
];

const ADDICTION_TYPES = [
  {
    image: "/images/vyasanmukti.png",
    title: "Alcohol Addiction",
    details:
      "Alcohol dependence slowly damages physical health, mental balance, and family trust. Many people begin with occasional drinking but develop compulsive habits over time. Recovery includes medical detox, counseling, relapse prevention, and family support. Early action can prevent serious social and health consequences while restoring confidence, stability, and healthy routines.",
  },
  {
    image: "/images/chikitsa.png",
    title: "Drug Addiction",
    details:
      "Drug addiction can rapidly impact brain function, emotional control, and personal safety. It often leads to isolation, financial stress, and risky behavior. Effective recovery needs supervised treatment, psychological counseling, accountability structures, and social reintegration. Consistent follow-up is essential to reduce relapse risk and rebuild a purposeful, disciplined lifestyle.",
  },
  {
    image: "/images/v.png",
    title: "Tobacco & Smoking",
    details:
      "Tobacco and smoking dependency severely affect lungs, heart health, and long-term quality of life. Nicotine cravings can disturb focus, sleep, and stress response. Recovery works best through habit replacement, counseling, nicotine reduction plans, and peer support. With structured guidance, individuals can quit gradually and regain better stamina and wellbeing.",
  },
  {
    image: "/images/page1.png",
    title: "Gambling",
    details:
      "Gambling addiction causes hidden debt, anxiety, and emotional instability. Repeated losses often trigger shame, secrecy, and family conflict. Recovery includes behavior therapy, strict financial controls, trigger avoidance, and trusted support circles. Practical discipline with counseling helps individuals regain decision-making control, restore relationships, and move toward long-term financial stability.",
  },
  {
    image: "/images/education.png",
    title: "Digital Addiction",
    details:
      "Digital addiction includes compulsive social media use, gaming, and nonstop screen exposure. It can reduce concentration, disrupt sleep, and weaken real-world relationships. Recovery focuses on screen boundaries, schedule correction, productive habits, and emotional counseling. Balanced digital behavior improves focus, academic performance, and healthier social interaction in daily life.",
  },
  {
    image: "/images/ch2.png",
    title: "Prescription Misuse",
    details:
      "Prescription misuse starts when medicines are taken beyond medical advice or dosage. It may appear harmless initially but can lead to dependency and dangerous side effects. Recovery needs monitored tapering, doctor supervision, counseling, and family awareness. Responsible medication practices and relapse prevention planning are critical for safe, sustainable recovery.",
  },
];

const WARNING_SIGNS = [
  "Sudden behaviour change and social withdrawal",
  "Loss of focus in work/studies and sleep disturbance",
  "Financial stress due to compulsive habits",
  "Health deterioration and emotional instability",
];

const RECOVERY_PILLARS = [
  {
    title: "Medical Guidance",
    desc: "Clinical evaluation and structured detox support by professionals.",
    icon: "🩺",
  },
  {
    title: "Counseling Therapy",
    desc: "One-to-one and group sessions for emotional healing and discipline.",
    icon: "🧠",
  },
  {
    title: "Family Reintegration",
    desc: "Family counseling and trust rebuilding with practical routines.",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Spiritual Anchoring",
    desc: "Daily satsang, meditation, and value-based life direction.",
    icon: "🕉️",
  },
];

const MONTHLY_METRICS = [
  { label: "Active Recovery Cases", value: "220+" },
  { label: "Counseling Sessions", value: "950+" },
  { label: "Awareness Outreach", value: "15 districts" },
  { label: "Family Follow-ups", value: "430+" },
];

const TESTIMONIALS = [
  {
    name: "Recovered Youth, Chandrapur",
    quote:
      "Vyasanmukti Seva gave me a second life. Counseling and family support helped me return to normal life.",
  },
  {
    name: "Parent Support Group",
    quote:
      "The program not only supported our child but also taught us how to rebuild trust at home.",
  },
  {
    name: "Seva Volunteer",
    quote:
      "Community awareness camps are reducing stigma and encouraging early help-seeking.",
  },
];

const FAQ = [
  {
    q: "Is counseling confidential?",
    a: "Yes. All sessions and records are handled with strict confidentiality and respect.",
  },
  {
    q: "Can family members join the recovery process?",
    a: "Yes. Family counseling is a key part of long-term recovery and reintegration.",
  },
  {
    q: "How can I support this mission?",
    a: "You can donate for treatment support, sponsor awareness camps, or volunteer in outreach programs.",
  },
];

export default memo(function VyasanPage() {
  const [activeLearnMore, setActiveLearnMore] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0b2230]">
      <HeroSection
        title="Vyasanmukti Seva"
        subtitle="Break the Chains of Addiction"
        backgroundImage="/images/vyasanmukti.png"
        boxed
        heightClass="h-[360px] md:h-[520px]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Support Recovery
          </Link>
          <Link
            to="/volunteer"
            className="bg-white text-[#0f5a98] hover:bg-[#eef4ff] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Become Volunteer
          </Link>
        </div>
      </HeroSection>

      <section className="-mt-10 relative z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MONTHLY_METRICS.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/15 bg-[#143446]/95 shadow-lg p-4 text-center">
              <p className="text-3xl font-black text-white">{item.value}</p>
              <p className="text-sm text-[#d4e1e8] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#0d2f43] via-[#0c2a3a] to-[#0a2534] py-16">
        <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Addiction We Address</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ADDICTION_TYPES.map((item) => (
            <div key={item.title} className="rounded-xl shadow-md p-4 text-center border border-white/10 bg-[#17384b]">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3 border border-[#d8d8d8]"
                loading="lazy"
              />
              <h3 className="font-semibold text-white text-sm">{item.title}</h3>
              <button
                type="button"
                onClick={() =>
                  setActiveLearnMore((prev) => (prev === item.title ? null : item.title))
                }
                className="mt-3 inline-block bg-[#0f5a98] hover:bg-[#0d4e83] text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors"
              >
                Learn More
              </button>
              {activeLearnMore === item.title && (
                <p className="mt-3 text-xs text-[#d4e1e8] leading-relaxed">{item.details}</p>
              )}
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-[#0a2534] py-16">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Recovery Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {RECOVERY_PILLARS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
              <p className="text-[#d4e1e8]">{item.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Rehabilitation Process</h2>
          <div className="space-y-4">
            {[
              "Initial Consultation - Confidential assessment with counsellors",
              "Medical Evaluation - Health and psychological evaluation",
              "Detoxification - Supervised detox phase",
              "Therapy & Counseling - Individual and group therapy sessions",
              "Reintegration - Family counselling and job assistance",
            ].map((step, i) => (
              <div key={step} className="flex gap-4 items-start rounded-xl p-4 shadow-sm border border-white/10 bg-[#17384b]">
                <span className="bg-[#0d3b66] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-[#d4e1e8]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImpactCounter items={IMPACT} theme="dark" />

      <section className="max-w-7xl mx-auto px-4 py-12 bg-[#0a2534]">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Recovery Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
              <p className="text-[#d4e1e8]">"{item.quote}"</p>
              <p className="text-[#ffb06a] font-semibold mt-4">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#0b2130] via-[#0d2f43] to-[#0b2130]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Support Recovery Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Detox Support", amount: "Rs 5,000" },
              { label: "Full Rehabilitation", amount: "Rs 25,000" },
              { label: "Awareness Campaign", amount: "Rs 51,000" },
            ].map((tier) => (
              <div key={tier.label} className="rounded-xl p-6 shadow border border-white/10 bg-[#17384b]">
                <h3 className="font-bold text-white">{tier.label}</h3>
                <p className="text-2xl font-bold text-[#ffb06a] mt-2">{tier.amount}</p>
                <Link to="/donate" className="btn-primary mt-4 inline-block">
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 bg-[#0a2534]">
        <h2 className="text-center text-5xl font-black text-[#ffb06a] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-[#163548] p-5">
              <summary className="cursor-pointer text-white font-semibold">{item.q}</summary>
              <p className="text-[#d4e1e8] mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-12 bg-[#0a2534]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#17384b] shadow-sm p-6">
            <h2 className="text-3xl font-black text-white mb-4">Early Warning Signs</h2>
            <ul className="space-y-2 text-[#d4e1e8]">
              {WARNING_SIGNS.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#ff8a00]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-[#0f5a98] to-[#0d8f91] rounded-2xl shadow-sm p-6 text-white">
            <h2 className="text-3xl font-black mb-3">Need Immediate Help?</h2>
            <p className="text-white/95 mb-5">
              Connect with our Vyasanmukti support team for confidential guidance and counseling.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="bg-white text-[#0f5a98] font-semibold px-5 py-2.5 rounded-lg">
                Contact Counselor
              </Link>
              <Link to="/donate" className="bg-[#ff8a00] hover:bg-[#e87900] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Sponsor Treatment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>    
  );
});
