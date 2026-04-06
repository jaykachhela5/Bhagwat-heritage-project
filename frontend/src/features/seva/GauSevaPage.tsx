import { memo } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/ui/HeroSection";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const heroCowImage = "/images/maharaj%20ji/gau.jpg";
const scenicCowImage = "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg";

const heroButtons = [
  {
    label: "Donate for Gau Seva",
    to: ROUTES.donate,
    className:
      "bg-[#f3a11f] text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] hover:bg-[#ffaf31]",
  },
  {
    label: "Sponsor a Cow",
    to: ROUTES.donate,
    className:
      "bg-[#0f7994] text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] hover:bg-[#1492b1]",
  },
  {
    label: "Plan a Visit",
    to: ROUTES.contact,
    className:
      "border border-white/35 bg-white/8 text-white shadow-[0_12px_26px_rgba(6,22,33,0.22)] hover:bg-white/14",
  },
];

const topStats = [
  {
    title: "Gau Seva",
    label: "Kamdhenu Ashram",
    note: "A devotional space for Gau Mata protection, nourishment, and seva.",
  },
  {
    title: "Daily Bhojan Seva",
    label: "2.5 Tons",
    note: "Green fodder, dry feed, and nutritional support managed every day.",
  },
  {
    title: "Cow Sponsorship",
    label: "Open",
    note: "Devotees can sponsor specific cows for recurring care and support.",
  },
  {
    title: "Volunteer Presence",
    label: "365 Days",
    note: "Daily seva by trusted volunteers, donors, and ashram supporters.",
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
    status: "Available for Sponsorship",
    note: "Gentle, healthy, and part of the regular feeding seva circle.",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774593948/19_vjopcc.png",
    objectPosition: "center",
  },
  {
    name: "Shyama",
    status: "Partially Sponsored",
    note: "Requires recurring care, nutrition support, and shelter maintenance attention.",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774593948/Banner_so0elf.png",
    objectPosition: "center",
  },
  {
    name: "Kamdhenu",
    status: "Medical Care Needed",
    note: "Needs focused health monitoring, supplement support, and devotional care sponsorship.",
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774593946/1_uww9cw.jpg",
    objectPosition: "center",
  },
];

const volunteerAreas = ["Feeding & Care", "Gaushala Cleaning", "Prayer & Seva"];

const bottomButtons = [
  {
    label: "Donate for Gau Seva",
    to: ROUTES.donate,
    className: "bg-[#ef9a1e] text-white hover:bg-[#de930a]",
  },
  {
    label: "Sponsor a Cow",
    to: ROUTES.donate,
    className: "bg-[#0d6179] text-white hover:bg-[#18495e]",
  },
  {
    label: "Volunteer for Gau Seva",
    to: ROUTES.involved.volunteer,
    className: "bg-[#0c5871] text-white hover:bg-[#0a4f66]",
  },
  {
    label: "Contact for Gau Seva",
    to: ROUTES.contact,
    className: "bg-[#12394c] text-white hover:bg-[#18495e]",
  },
];

export default memo(function GauSevaPage() {
  usePageMeta(
    "Gau Seva",
    "Gau Seva page with cow care activities, donation options, cow sponsorship, volunteer support, and spiritual significance.",
  );

  return (
    <div className="min-h-screen bg-[#0B2230]">
      <HeroSection
        title="Gau Seva"
        subtitle="Kamdhenu Ashram"
        subtitleClassName="whitespace-nowrap text-[18px] font-semibold text-white sm:text-[24px] md:text-[34px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage={heroCowImage}
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {topStats.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0d6179] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className="text-[20px] font-black uppercase tracking-wide text-[#ef9a1e] md:text-[24px]">* {item.title}</p>
                <p className="mt-1 text-[14px] font-black text-white md:text-[20px]">{item.label}</p>
                <p className="mt-1 text-base leading-7 text-[#dce7ec] md:text-lg">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
            <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">About Gau Seva</p>
            <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">
              A Sacred Space for Gau Mata Protection in Sanatan Dharma
            </h2>
            <p className="mt-5 text-base leading-7 text-white md:text-lg">
              This Gau Seva initiative is dedicated to protecting, feeding, sheltering, and serving sacred cows with devotion and discipline.
              It is a living seva space where compassion, daily care, and dharmic gratitude come together.
            </p>
            <p className="mt-4 text-base leading-7 text-white md:text-lg">
              In Sanatan Dharma, Gau Seva is considered deeply auspicious because the cow is honored as a nourisher, a symbol of gentle
              abundance, and a sacred presence connected with selfless giving.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#0d6179] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-black text-white md:text-[1.75rem]">Mission</h3>
              <p className="mt-3 text-base leading-8 text-[#dce7ec] md:text-lg">
                Food, medical care, shelter, and devotional service rooted in Sanatan values.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0d6179] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-black text-white md:text-[1.75rem]">Vision</h3>
              <p className="mt-3 text-base leading-8 text-[#dce7ec] md:text-lg">
                A compassionate, clean, and spiritually grounded gaushala where every cow is served with dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Our Gau Seva Activities</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Service Through Gau Seva</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sevaActivities.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
              >
                <div className="inline-flex rounded-full bg-[#ef9a1e]/15 px-4 py-2 text-sm font-black tracking-[0.2em] text-[#ef9a1e]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-[24px] font-black text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#dce7ec] md:text-lg">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Gau Seva Donation Options</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Different ways to contribute</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {donationOptions.map((item) => (
              <div key={item.title} className="flex h-full flex-col rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-2xl font-black text-[#ef9a1e]">{item.amount}</p>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#dce7ec]">{item.desc}</p>
                <Link
                  to={ROUTES.donate}
                  className="mt-5 inline-flex w-fit rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                >
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Sponsor a Cow Program</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Adopt care with devotion</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {sponsorCows.map((cow) => (
              <article key={cow.name} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0c5871] shadow-sm">
                <img
                  src={cow.image}
                  alt={cow.name}
                  className="h-64 w-full object-cover"
                  style={{ objectPosition: cow.objectPosition }}
                />
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-black text-white md:text-[1.75rem]">{cow.name}</h3>
                    <span className="rounded-full bg-[#ef9a1e]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#ef9a1e]">
                      Sponsor
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-[#ef9a1e]">{cow.status}</p>
                  <p className="mt-3 text-base leading-7 text-[#dce7ec] md:text-lg">{cow.note}</p>
                  <Link
                    to={ROUTES.donate}
                    className="mt-5 inline-flex rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                  >
                    Sponsor Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Volunteer for Gau Seva</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Visit and serve at the ashram</h2>
          <p className="mt-4 text-base leading-7 text-white md:text-lg">
            Devotees, families, youth groups, and service-minded volunteers are welcome to participate in practical Gau Seva through feeding,
            cleanliness, care support, and devotional ashram discipline.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {volunteerAreas.map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-[#0c5871] px-4 py-3 text-base font-semibold text-[#dce7ec]">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Spiritual Message</p>
              <h3 className="mt-2 text-[14px] font-black text-white md:text-[20px]">"Gavo vishvasya matarah."</h3>
              <p className="mt-4 text-base font-semibold text-white md:text-lg">The cows are the mothers of the universe.</p>
              <p className="mt-4 text-base leading-7 text-[#dce7ec] md:text-lg">
                Gau Mata represents nourishment, gentleness, and sacred abundance. Serving her is an offering of gratitude, protection, and
                dharmic responsibility.
              </p>
            </article>

            <article className="rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm">
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e]">Contact for Gau Seva</p>
              <h3 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Visit or Connect</h3>
              <div className="mt-5 space-y-4 text-base leading-7 text-[#dce7ec] md:text-lg">
                <p>
                  <span className="font-black text-white">Address:</span> Bhagwat Niketan Ashram, Mul Road, Shree Kshetra Chichpalli,
                  District - Chandrapur (Maharashtra)
                </p>
                <p>
                  <span className="font-black text-white">Phone:</span> +91 8668897445
                </p>
                <p>
                  <span className="font-black text-white">Email:</span> bhagwatheritage@gmail.com
                </p>
                <p>
                  <span className="font-black text-white">Visitor Help:</span> Contact the trust desk for darshan timing, map guidance, and
                  seva planning.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-flex rounded-xl bg-[#ef9a1e] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
                >
                  Volunteer Registration
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="inline-flex rounded-xl bg-[#0d6179] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#18495e]"
                >
                  Contact Ashram
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-4 pb-12">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {bottomButtons.map((button) => (
            <Link
              key={button.label}
              to={button.to}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-4 text-center text-sm font-bold transition-colors ${button.className}`}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
});
