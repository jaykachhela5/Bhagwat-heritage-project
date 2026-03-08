import { memo } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";

const OBJECTIVES = [
  {
    image: "/images/spiritual1.png",
    title: "Bhakti",
    desc: "Spiritual awakening and devotion to Bhagwan through satsang, katha, and disciplined faith.",
  },
  {
    image: "/images/jal.png",
    title: "Seva",
    desc: "Expanding compassionate service for humanity through relief, support, and grassroots care.",
  },
  {
    image: "/images/sanskriti.png",
    title: "Sanskriti",
    desc: "Preserving Sanatan culture, values, festivals, and devotional heritage for future generations.",
  },
  {
    image: "/images/education.png",
    title: "Shiksha",
    desc: "Supporting education, moral learning, and upliftment for children, youth, and underserved families.",
  },
  {
    image: "/images/chikitsa.png",
    title: "Swasthya",
    desc: "Providing healthcare assistance, medicine support, and medical outreach for those in need.",
  },
  {
    image: "/images/nadi.jpg",
    title: "Paryavaran",
    desc: "Encouraging environmental protection, cleanliness, and responsible green initiatives.",
  },
];

const HERO_STATS = [
  { value: "50,000+", label: "People Served" },
  { value: "1,00,000+", label: "Meals Distributed" },
  { value: "850+", label: "Water Camps" },
  { value: "12,000+", label: "Medical Support Cases" },
];

export default memo(function ObjectivesPage() {
  return (
    <div className="min-h-screen bg-[#0B2230] pb-16">
      <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[28px] px-5 py-14 text-center text-white shadow-[0_12px_30px_rgba(0,0,0,0.3)] md:px-12 md:py-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(11,34,48,0.62), rgba(11,34,48,0.78)), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="mb-6 inline-flex items-center rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-4 py-1 text-sm">
            Bhagwat Heritage Service Foundation Trust
          </p>
          <h1 className="mb-4 text-3xl font-black md:text-6xl">Our Objectives</h1>
          <p className="text-xl font-medium text-white/90 md:text-4xl">Seva . Sanskriti . Sanskar</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.donate}
              className="inline-block rounded-xl bg-[#F59E0B] px-7 py-3 font-bold text-white transition-colors hover:bg-[#dc920b]"
            >
              Donate for Seva
            </Link>
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-block rounded-xl bg-white px-7 py-3 font-bold text-[#0B2230] transition-colors hover:bg-[#eef4f7]"
            >
              Become Volunteer
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {HERO_STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#12394A] p-4 text-center shadow-[0_3px_10px_rgba(0,0,0,0.18)] md:p-5"
            >
              <p className="text-3xl font-extrabold text-[#F59E0B] md:text-5xl">{item.value}</p>
              <p className="mt-1.5 text-sm text-white md:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="rounded-[28px] border border-white/10 bg-[#12394A] px-6 py-10 shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
          <h2 className="text-3xl font-black text-[#F59E0B] md:text-5xl">Mission Through Objectives</h2>
          <p className="mt-5 text-lg leading-relaxed text-white">
            We work with full devotion and commitment to carry the spiritual, social, and cultural message of Shreemad Bhagwat
            to every section of society. Through dharma, seva, sanskar, compassion, discipline, and humanitarian outreach,
            the trust aims to build a more aware, value-driven, and service-oriented community.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {OBJECTIVES.map((obj) => (
            <div
              key={obj.title}
              className="rounded-xl border border-white/10 bg-[#12394A] p-6 text-center shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="mb-4">
                <img
                  src={obj.image}
                  alt={obj.title}
                  className="mx-auto h-16 w-16 rounded-full border-2 border-[#F59E0B] object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#F59E0B]">{obj.title}</h3>
              <p className="text-sm text-white">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});
