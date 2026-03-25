import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import { usePageMeta } from "../../hooks/usePageMeta";

const SEVA_OPTIONS = [
  { label: "वस्त्र श्रृंगार अलंकर की सेवा", amount: "₹ 5101/-" },
  { label: "प्रसाद वितरण की सेवा", amount: "₹ 1101/-" },
  { label: "फूल मालाओं की सेवा", amount: "₹ 2101/-" },
  { label: "भगवान के पालने की सेवा", amount: "₹ 3101/-" },
  { label: "महा अभिषेक की सेवा", amount: "₹ 1101/-" },
  { label: "पंजीरी प्रसाद की सेवा", amount: "₹ 1101/-" },
  { label: "महाप्रसाद की सेवा\n(साबूदाना खिचड़ी वितरण)", amount: "₹ 5101/-" },
  { label: "लूट सामग्री की सेवा", amount: "₹ 501/-" },
  { label: "महाआरती", amount: "₹ 501/-" },
];

const SESSION_KEY = "ramJanmotsavModalDismissed";

/** Served from `public/images/homepage/` (synced from `images/Homepage/HomepageBanner.jpeg`). */
const HOMEPAGE_BANNER_SRC = "/images/homepage/HomepageBanner.jpeg";

function RamJanmotsavModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 py-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl bg-gradient-to-b from-[#fff8f0] to-white">
        {/* Header banner */}
        <div className="relative bg-gradient-to-br from-[#ff9800] via-[#ff6f00] to-[#b32e22] px-6 pt-8 pb-6 text-center rounded-t-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')] bg-cover bg-center" />
          <p className="relative text-orange-100 text-xs font-semibold uppercase tracking-widest mb-1">
            🪔 Shri Bhagwat Heritage Service Foundation Trust
          </p>
          <h2 className="relative text-3xl md:text-4xl font-black text-white leading-tight drop-shadow">
            श्री राम जन्मोत्सव
          </h2>
          <p className="relative text-2xl font-bold text-yellow-200 mt-1">२०२६</p>
          <div className="relative mt-3 inline-block bg-yellow-400 text-[#7c1d00] font-bold text-sm px-5 py-1.5 rounded-full shadow">
            गुरुवार, 26 मार्च 2026
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 hover:bg-white/60 text-white text-lg font-bold transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="px-5 py-5 space-y-5">
          {/* Programme */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <h3 className="text-[#b32e22] font-bold text-base mb-2 flex items-center gap-2">
              <span className="text-lg">🕐</span> जन्मोत्सव कार्यक्रम
            </h3>
            <p className="text-sm text-gray-700 font-semibold mb-2">
              गुरुवार दि. 26 मार्च 2026 &nbsp;·&nbsp; प्रातः 11:00 से 12:30 तक
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>परम पूज्य भागवतमनीषी संत श्री मनीष भाईजी महाराज</strong> के पावन मधुर स्वर में
              भक्ति संगीतमय भजनों के साथ <strong>प्रभु श्री रामचन्द्र जी</strong> के प्रागट्य लीलाओं
              पर सुंदर चरित्र गान।
            </p>
            <p className="text-sm text-gray-700 mt-2">
              ठीक 12:00 बजे रामलला जन्मोत्सव के साथ{" "}
              <strong>श्री विग्रहो</strong> का श्रृंगार दर्शन एवं महाआरती।
            </p>
            <ul className="mt-2 text-sm text-[#b32e22] font-semibold space-y-0.5 list-none">
              <li>🎵 रामलला जन्मोत्सव &nbsp;|&nbsp; बधाई गान &nbsp;|&nbsp; पालना दर्शन</li>
              <li>🙏 सामूहिक आरती एवं प्रसाद</li>
            </ul>
            <p className="mt-3 text-[#0d3b66] font-bold text-sm text-center bg-blue-50 rounded-lg py-2">
              इस संपूर्ण भक्तिमय आयोजन में आप सभी श्रद्धालु स्नेहीजन सादर आमंत्रित हैं।
            </p>
          </div>

          {/* Seva Options */}
          <div>
            <h3 className="text-[#b32e22] font-bold text-base mb-3 flex items-center gap-2">
              <span className="text-lg">🌸</span> विविध सेवाएं
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SEVA_OPTIONS.map((seva) => (
                <div
                  key={seva.label}
                  className="flex items-start justify-between gap-2 rounded-lg border border-orange-100 bg-gradient-to-r from-[#fff8f0] to-white px-3 py-2.5 shadow-sm"
                >
                  <span className="text-sm text-gray-800 leading-snug whitespace-pre-line flex-1">
                    {seva.label}
                  </span>
                  <span className="text-sm font-bold text-[#b32e22] whitespace-nowrap shrink-0 ml-2">
                    {seva.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment info */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center text-sm text-gray-700 leading-relaxed">
            सभी भक्तजन ऑनलाइन गूगल पे अकाउंट के द्वारा तथा कार्यक्रम स्थल पर अपनी भेंट अर्पण कर
            संस्था की पक्की रसीद प्राप्त कर सकते हैं।
          </div>

          {/* Contact & Venue */}
          <div className="rounded-xl bg-gradient-to-br from-[#7c1d00] to-[#b32e22] text-white px-5 py-4 text-center space-y-1 shadow-md">
            <p className="text-sm font-semibold text-orange-200">भागवत मनीषी संत श्री मनीष भाईजी महाराज के पावन सानिध्य में</p>
            <p className="text-xs text-white/70 uppercase tracking-widest mt-1">कार्यक्रम स्थल</p>
            <p className="text-base font-extrabold leading-snug text-yellow-200">
              भागवत धाम श्री स्वामीनारायण मंदिर, चंद्रपुर
            </p>
            <p className="text-xs text-white/70">भागवत हेरिटेज सर्विसेज़ फाउंडेशन, चंद्रपुर</p>
            <a
              href="tel:+918668897445"
              className="inline-block mt-2 bg-yellow-400 text-[#7c1d00] font-bold text-sm px-5 py-1.5 rounded-full hover:bg-yellow-300 transition-colors"
            >
              📞 +91-8668897445
            </a>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Close
            </button>
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-[#ff6f00] to-[#b32e22] text-white font-semibold py-2.5 rounded-lg text-center hover:opacity-90 transition-opacity text-sm"
            >
              🙏 Register / Donate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      const t = setTimeout(() => setShowModal(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    sessionStorage.setItem(SESSION_KEY, "1");
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
    <>
    {showModal && <RamJanmotsavModal onClose={closeModal} />}
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#eaf4f1",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(47,127,115,0.35) 0%, rgba(47,127,115,0) 42%), radial-gradient(circle at top right, rgba(19,126,181,0.28) 0%, rgba(19,126,181,0) 40%), radial-gradient(circle at bottom left, rgba(252,182,48,0.22) 0%, rgba(252,182,48,0) 44%), radial-gradient(circle at bottom right, rgba(148,197,88,0.22) 0%, rgba(148,197,88,0) 46%), linear-gradient(135deg, #f7fcfa 0%, #edf8f2 45%, #fff7e6 100%)",
      }}
    >
      <section className="w-full pt-0">
        {/* Flush with fixed header: no extra top padding — main already offsets SiteHeader height */}
        <div className="relative w-full min-h-[200px] h-[38vw] sm:h-[42vw] md:h-[min(68vh,800px)] max-h-[85vh] overflow-hidden">
          <img
            src={HOMEPAGE_BANNER_SRC}
            alt=""
            className="block h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="w-full px-4 pb-2 pt-4 text-center sm:px-5 sm:pt-5 md:px-6 md:pt-6">
          <h1 className="mx-auto max-w-5xl text-2xl font-bold leading-tight text-[#0d3b66] sm:text-3xl md:text-4xl lg:text-5xl">
            {t("home.heroTitle")}
          </h1>
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
          {/* Featured: Ram Janmotsav 2026 */}
          <article className="relative rounded-2xl overflow-hidden shadow-lg border-0 bg-gradient-to-br from-[#ff9800] via-[#ff6f00] to-[#b32e22] text-white sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] bg-repeat" />
            <div className="relative p-5">
              <span className="inline-block bg-yellow-400 text-[#7c1d00] text-[11px] font-extrabold px-3 py-0.5 rounded-full mb-3 uppercase tracking-wide shadow">
                🪔 Upcoming Festival
              </span>
              <h3 className="text-xl font-black leading-tight">
                श्री राम जन्मोत्सव <span className="text-yellow-300">२०२६</span>
              </h3>
              <p className="text-orange-100 text-sm font-semibold mt-1">गुरुवार, 26 मार्च 2026</p>
              <p className="text-orange-100 text-xs mt-1">प्रातः 11:00 – 12:30 तक</p>
              <p className="text-white/90 text-sm mt-2 leading-snug">
                भागवत धाम श्री स्वामीनारायण मंदिर, चंद्रपुर में रामलला जन्मोत्सव, महाआरती एवं विविध सेवाएं।
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-[#7c1d00] font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow"
                >
                  View Details & Donate
                </button>
                <a
                  href="tel:+918668897445"
                  className="border border-white/50 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  📞 Contact
                </a>
              </div>
            </div>
          </article>

          {/* {upcomingEvents.map((event, index) => (
            <article key={event.title} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-[#123753]">{event.title}</h3>
              <p className="text-sm text-[#4f6272] mt-2 mb-4">{event.desc}</p>
              <Link to={EVENT_META[index].href} className="btn-secondary text-sm">
                {t("home.openEvent")}
              </Link>
            </article>
          ))} */}
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
          {/* <div className="rounded-2xl min-h-[230px] shadow-lg bg-[#14532d] border border-[#166534]">
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
          </div> */}

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
    </>
  );
});
