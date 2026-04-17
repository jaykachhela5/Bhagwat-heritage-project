import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SEVA_BODY_TEXT_CLASS, SEVA_CARD_TITLE_CLASS, SEVA_HERO_SUBTITLE_CLASS } from "./sevaTypography";

const HERO_IMAGE = "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png";

const QUICK_HIGHLIGHTS = [
  {
    title: "Medicine Access",
    value: "Daily Relief",
    note: "Essential medicines support low-income families, elderly patients, and recurring care cases.",
  },
  {
    title: "Prescription Review",
    value: "Verified Care",
    note: "Medical needs are reviewed before support is allocated so treatment help stays timely and transparent.",
  },
  {
    title: "Health Camp Support",
    value: "Camp Ready",
    note: "Screening, medicine kits, and outreach support can be organised through seva camps and field visits.",
  },
  
  {
    title: "Volunteer Presence",
    value: "Trusted Team",
    note: "Doctors, pharmacists, and field volunteers strengthen every cycle of medical support.",
  },
];

const ABOUT_POINTS = [
  {
    title: "Mission",
    desc: "Deliver timely medicine support, practical health guidance, and service-based relief with dignity and discipline.",
  },
  {
    title: "Focus Areas",
    desc: "Support low-income families, elderly patients, rural communities, and chronic-care cases needing continuity.",
  },
  {
    title: "Why It Matters",
    desc: "A delayed medicine can quickly become a deeper crisis. This service helps families receive relief before that burden grows.",
  },
];

const SERVICES = [
  {
    title: "Free Medicine Distribution",
    desc: "Essential medicines are supplied to low-income families, elderly patients, and vulnerable households facing treatment difficulty.",
  },
  {
    title: "Health Camps and Screening",
    desc: "Regular camps help with checkups, consultation guidance, diagnosis support, and medicine access through trusted support channels.",
  },
  {
    title: "Chronic Care Assistance",
    desc: "Longer support for diabetes, blood pressure, and recurring prescription needs helps families maintain treatment continuity.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Need and patient are identified",
    desc: "Field teams, camps, and local contacts identify individuals and families facing genuine medical hardship.",
  },
  {
    step: "02",
    title: "Prescription is reviewed",
    desc: "Doctors and coordinators review prescriptions, treatment need, and urgency before medicine support is arranged.",
  },
  {
    step: "03",
    title: "Medicines are distributed",
    desc: "Support reaches beneficiaries through camps, outreach points, or verified household relief channels.",
  },
  {
    step: "04",
    title: "Follow-up care continues",
    desc: "Where needed, refill planning and next-step guidance help maintain continuity of treatment and relief.",
  },
];

const SUPPORT_AREAS = [
  "General fever, infection, and seasonal illness medicine support",
  "Blood pressure and diabetes medicine continuity assistance",
  "Women's health and senior citizen care support",
  "Health camp-based consultation and medicine distribution",
];

const FREE_SEVA_ROLES = [
  {
    title: "Doctor Support",
    desc: "Doctors can support consultation, prescription review, medical guidance, and health camp participation for needy families.",
  },
  {
    title: "Nursing Support",
    desc: "Nurses can assist with patient care, camp support, screening help, follow-up coordination, and compassionate field support.",
  },
  {
    title: "Pharmacy Support",
    desc: "Pharmacists can help with medicine verification, dosage guidance, stock support, and safe distribution planning.",
  },
  {
    title: "Lab and Screening Support",
    desc: "Diagnostic helpers can support health screening camps, basic testing coordination, reporting, and patient guidance.",
  },
  {
    title: "Ambulance and Emergency Support",
    desc: "Volunteers and service partners can assist in urgent patient transport, referral help, and emergency medical coordination.",
  },
  {
    title: "Health Camp Coordination",
    desc: "Volunteers can help organize camps, manage patient flow, registration, medicine desks, and local outreach logistics.",
  },
];

const DONATION_TIERS = [
  {
    title: "Basic Medicine Kit",
    amount: "Rs 1,100",
    note: "Essential support for one beneficiary family facing urgent medicine need.",
  },
  {
    title: "Camp Support Sponsor",
    amount: "Rs 7,500",
    note: "Medicines and basic supplies for one local health camp or outreach screening support.",
  },
  {
    title: "Monthly Patient Care",
    amount: "Rs 21,000",
    note: "Recurring medical support for multiple patients needing continuity treatment and follow-up relief.",
  },
  {
    title: "Operation Support",
    amount: "Rs 51,000",
    note: "Helps cover urgent surgery expenses, hospital support, and critical operation care for patients in need.",
  },
];

const STORIES = [
  {
    name: "Village Health Beneficiary",
    quote: "Regular medicine support helped my father continue treatment without missing doses during difficult months.",
  },
  {
    name: "Medical Camp Volunteer",
    quote: "This service connects diagnosis, medicine, and compassion in one place. It is practical support with immediate impact.",
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
    a: "Yes. Donations can be directed toward medicine kits, camp support, chronic care assistance, and general health support.",
  },
  {
    q: "Can doctors or pharmacists join this service?",
    a: "Yes. Medical professionals and support volunteers can join through the volunteer route and help in camps and field outreach.",
  },
];

export default memo(function MedicinePage() {
  usePageMeta(
    "Chikitsa Seva",
    "Chikitsa Seva page with medicine distribution, health camp support, chronic care relief, donation options, and medical volunteer support.",
  );

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)]">
      <HeroSection
        title="Chikitsa Seva"
        subtitle="Service is the greatest form of healing."
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={HERO_IMAGE}
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.donate}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Donate Medicines
          </Link>
          <Link
            to={ROUTES.involved.volunteer}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Join Medical Support
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {QUICK_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[24px] font-black uppercase tracking-wide text-[var(--campaign-accent)]">{item.title}</p>
                <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.value}</p>
                <p className="mt-1 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">About Chikitsa Seva</p>
            <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Medical support with dignity and timely care</h2>
            <p className="mt-5 text-base leading-7 text-white md:text-lg">
              Chikitsa Seva is dedicated to helping low-income families, elderly patients, and medically vulnerable households receive essential
              medicines before delay becomes danger.
            </p>
            <p className="mt-4 text-base leading-7 text-white md:text-lg">
              Along with medicine support, the service model includes camp-based screening, prescription verification, and practical follow-up
              guidance so relief remains useful, transparent, and compassionate.
            </p>
            <p className="mt-4 text-base leading-7 text-white md:text-lg">
              Every contribution becomes a form of healing support that protects health, restores hope, and helps a struggling family continue life
              with dignity.
            </p>
          </div>

          <div className="grid gap-4">
            {ABOUT_POINTS.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-2xl font-black text-white md:text-[1.75rem]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Our Medical Services</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Relief, screening, and care support</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <h3 className="text-[24px] font-black text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">How Chikitsa Seva Works</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">From medical need to medicine support</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <article key={item.step} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <div className="inline-flex rounded-full bg-[var(--campaign-accent)]/15 px-4 py-2 text-sm font-black tracking-[0.2em] text-[var(--campaign-accent)]">
                  {item.step}
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Chikitsa Seva Donation Options</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Different ways to support medical relief</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {DONATION_TIERS.map((item) => (
              <div key={item.title} className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <h3 className={SEVA_CARD_TITLE_CLASS}>{item.title}</h3>
                <p className="mt-2 text-2xl font-black text-[var(--campaign-accent)]">{item.amount}</p>
                <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
                <Link
                  to={ROUTES.donate}
                  className="mt-5 inline-flex w-fit rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                >
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Support Areas</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Where medicine relief makes a difference</h2>
          <div className="mt-6 space-y-3">
            {SUPPORT_AREAS.map((item) => (
              <div key={item} className="flex gap-3 rounded-[20px] border border-white/10 bg-[var(--campaign-surface)] p-4">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--campaign-accent)]" />
                <p className="text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Offer Free Medical Support</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Serve the trust through your medical skills</h2>
          <p className="mt-4 text-base leading-7 text-white md:text-lg">
            Doctors, nurses, pharmacists, medical helpers, and service-minded professionals are welcome to offer free support for the trust through
            camps, consultations, medicine support, and patient guidance.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {FREE_SEVA_ROLES.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
                <h3 className="text-[24px] font-black text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.desc}</p>
              </article>
            ))}
          </div>
          <Link
            to={ROUTES.involved.volunteer}
            className="mt-8 inline-flex rounded-xl bg-[var(--campaign-accent)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Offer Free Medical Support
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Impact Stories</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Voices from medical support</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STORIES.map((item) => (
              <article key={item.name} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <p className="text-base leading-7 text-[var(--campaign-text)] md:text-lg">"{item.quote}"</p>
                <p className="mt-4 text-[24px] font-black text-white">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Chikitsa Seva FAQ</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Common questions about medicine support</h2>
          <div className="mt-8 space-y-4">
            {FAQS.map((item) => (
              <details key={item.q} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
                <summary className="cursor-pointer text-[14px] font-black text-white md:text-[20px]">{item.q}</summary>
                <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});
