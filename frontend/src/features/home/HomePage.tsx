import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import { usePageMeta } from "../../hooks/usePageMeta";

const HERO_SLIDES = [
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1772647455/hero2_eenipn.png",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1772647529/hero3_csexsl.png",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1772647646/hero4_giyget.png",
];

/* COMMENTED OUT — Section 4
const SEVA_HIGHLIGHT_META = [
  {
    link: ROUTES.seva.gau,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png",
  },
  {
    link: ROUTES.seva.annJal,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png",
  },
  {
    link: ROUTES.seva.education,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png",
  },
];
*/

const EVENT_META = [
  { href: ROUTES.eventsKatha.bhagwatKatha },
  { href: ROUTES.eventsKatha.guruPurnima },
  { href: ROUTES.eventsKatha.annakut },
];

/* COMMENTED OUT — Section 4
const GALLERY_META = [
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png",
    altKey: "home.galleryAlts.education",
  },
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png",
    altKey: "home.galleryAlts.medical",
  },
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png",
    altKey: "home.galleryAlts.jal",
  },
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583758/kanyadan_ftf9oc.png",
    altKey: "home.galleryAlts.kanyadaan",
  },
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/vyasanmukti_xa9hif.png",
    altKey: "home.galleryAlts.vyasanmukti",
  },
  {
    href: ROUTES.media.photos,
    src: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png",
    altKey: "home.galleryAlts.katha",
  },
];
*/

interface TextCard {
  title: string;
  desc: string;
}

export default memo(function HomePage() {
  const { t } = useTranslation();
  usePageMeta(t("home.meta.title"), t("home.meta.description"));

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  // COMMENTED OUT — Section 4
  // const sevaHighlights = t("home.sevaHighlights", { returnObjects: true }) as TextCard[];
  const upcomingEvents = t("home.upcomingEvents", { returnObjects: true }) as TextCard[];
  const impactItems = [
    { label: t("home.impact.livesTouched"), target: 50000 },
    { label: t("home.impact.eventsConducted"), target: 500 },
    { label: t("home.impact.volunteers"), target: 1200 },
    { label: t("home.impact.yearsOfService"), target: 40 },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#eaf4f1",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(47,127,115,0.35) 0%, rgba(47,127,115,0) 42%), radial-gradient(circle at top right, rgba(19,126,181,0.28) 0%, rgba(19,126,181,0) 40%), radial-gradient(circle at bottom left, rgba(252,182,48,0.22) 0%, rgba(252,182,48,0) 44%), radial-gradient(circle at bottom right, rgba(148,197,88,0.22) 0%, rgba(148,197,88,0) 46%), linear-gradient(135deg, #f7fcfa 0%, #edf8f2 45%, #fff7e6 100%)",
      }}
    >
      <section className="px-4 md:px-6 pt-6 md:pt-8">
        <div className="relative w-full max-w-[1240px] h-[360px] md:h-[520px] mx-auto rounded-2xl overflow-hidden">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                heroIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${slide}')` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">{t("home.heroTitle")}</h1>
          </div>
        </div>

      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-white/35 backdrop-blur-sm border border-white/40 rounded-2xl px-6 md:px-10 py-10 shadow-md">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-[#7a4a1b] font-semibold mb-3">
            {t("home.aboutEyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d3b66] mb-4">{t("home.aboutTitle")}</h2>
          <p className="text-[#2f2f2f] text-lg leading-relaxed mb-7 max-w-3xl mx-auto">{t("home.aboutText")}</p>
          <Link
            to={ROUTES.about.index}
            className="inline-block bg-[#f1a15c] hover:bg-[#e48d45] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {t("home.readMore")}
          </Link>
        </div>
      </section>

      <section className="py-2 px-4">
        <div className="w-full rounded-2xl border border-[#dce8f5] bg-white p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-8 items-center">
            <div className="mx-auto w-full max-w-[220px]">
              <div className="rounded-2xl border border-[#e0e8f0] bg-[#f6f8fb] p-2 shadow-sm">
                <img
                  src="/images/manish2.PNG"
                  alt={t("home.founderTitle")}
                  className="h-[260px] w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#2b618f] font-semibold mb-2">
                {t("home.founderEyebrow")}
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-[#123753] mb-3">{t("home.founderTitle")}</h2>
              <p className="text-[#4f6272] leading-relaxed">{t("home.founderQuote")}</p>
              <Link to={ROUTES.about.founder} className="inline-block mt-4 btn-primary">
                {t("home.viewFounderProfile")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT — Section 4: Seva Highlights
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="section-title">{t("home.sevaHighlightsTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sevaHighlights.map((card, index) => (
            <div key={card.title} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <img
                  src={SEVA_HIGHLIGHT_META[index].image}
                  alt={card.title}
                  className="h-14 w-14 rounded-full object-cover mx-auto border-2 border-[#f1a15c]"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0d3b66] mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.desc}</p>
              <Link to={SEVA_HIGHLIGHT_META[index].link} className="btn-primary">
                {t("home.learnMore")}
              </Link>
            </div>
          ))}
        </div>
      </section>
      */}

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="section-title">{t("home.upcomingEventsTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <article key={event.title} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-[#123753]">{event.title}</h3>
              <p className="text-sm text-[#4f6272] mt-2 mb-4">{event.desc}</p>
              <Link to={EVENT_META[index].href} className="btn-secondary text-sm">
                {t("home.openEvent")}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <ImpactCounter items={impactItems} />

      {/* COMMENTED OUT — Section 4: Gallery Preview
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="section-title">{t("home.galleryTitle")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GALLERY_META.map((img) => (
            <Link key={img.src} to={img.href} className="group overflow-hidden rounded-lg aspect-square">
              <img
                src={img.src}
                alt={t(img.altKey)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>
      */}

      <section className="py-16 px-4 bg-[#eef0f3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl min-h-[230px] shadow-lg bg-[#14532d] border border-[#166534]">
            <div className="p-8 h-full flex flex-col justify-center text-center">
              <h2 className="text-3xl font-bold mb-3 text-white">{t("home.volunteerTitle")}</h2>
              <p className="text-green-100 mb-6">{t("home.volunteerText")}</p>
              <div>
                <Link
                  to={ROUTES.involved.volunteer}
                  className="inline-block bg-[#f1a15c] hover:bg-[#e48d45] text-white font-semibold px-7 py-3 rounded-lg transition-colors"
                >
                  {t("home.joinUs")}
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl min-h-[230px] shadow-lg bg-[#7f1d1d] border border-[#991b1b]">
            <div className="p-8 h-full flex flex-col justify-center text-center">
              <h2 className="text-3xl font-bold mb-3 text-white">{t("home.donationTitle")}</h2>
              <p className="text-red-100 mb-6">{t("home.donationText")}</p>
              <div>
                <Link
                  to={ROUTES.donate}
                  className="inline-block bg-[#f1a15c] hover:bg-[#e48d45] text-white font-semibold px-7 py-3 rounded-lg transition-colors"
                >
                  {t("home.donateNow")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
