import { memo, useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { ImpactCounter } from "../../components/ui/ImpactCounter";
import { usePageMeta } from "../../hooks/usePageMeta";

const HOMEPAGE_BANNER_SRC = "/images/homepage/HomePageBanner.jpeg";
const UPCOMING_EVENT_IMAGE_LEFT = "https://res.cloudinary.com/der8zinu8/image/upload/v1774879635/u0_lxrinw.jpg";
const UPCOMING_EVENT_IMAGE_RIGHT = "https://res.cloudinary.com/der8zinu8/image/upload/v1774879636/u1_eobmdm.jpg";
const UPCOMING_EVENT_TITLE = "Shri Maharashtra Kashtbhanjan Hanuman Janmotsav 2026";
const UPCOMING_EVENT_SUBTITLE = "Hanumat Shakti Peeth, Shri Kshetra Chichpalli";
const UPCOMING_EVENT_DATE = "Thursday, 2 April 2026";
const UPCOMING_EVENT_CONTACT = "+91 9822471551";
const UPCOMING_EVENT_VIDEO_URL = "https://youtu.be/uhPE_XK45lE";
const UPCOMING_EVENT_VIDEO_POSTER = "https://res.cloudinary.com/der8zinu8/image/upload/v1775022287/watchnow_aaakef.png";
const UPCOMING_EVENT_LIVE_URL = "https://youtube.com/live/b0Q8JoU4gI4?feature=share";
const UPCOMING_EVENT_LIVE_POSTER = "https://res.cloudinary.com/der8zinu8/image/upload/v1775022232/live2_xb1w2f.png";
const UPCOMING_EVENT_DETAILS =
  "Celebrate Hanuman Janmotsav in the divine presence of Sant Shri Manish Bhaiji Maharaj with aarti, puja, maha abhishek, Sundarkand path, mahaprasad, Hanuman Charitra Gatha, and evening maha aarti.";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg bg-[#f1a15c] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e48d45]";
const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg border border-[#d4a270] bg-white px-6 py-3 text-sm font-semibold text-[#9a5310] transition-colors hover:bg-[#fff7ef]";

function UpcomingEventModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2b1300]/70 px-3 py-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-[#f0d1aa] bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)] shadow-[0_24px_60px_rgba(65,28,0,0.28)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#8a2f0a] shadow transition-colors hover:bg-white"
          aria-label="Close"
        >
          x
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[linear-gradient(180deg,#f8ebdc_0%,#fff7ef_100%)] p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="overflow-hidden rounded-[24px] border border-[#edcfab] bg-white shadow-[0_16px_34px_rgba(122,74,27,0.14)]">
                <img
                  src={UPCOMING_EVENT_IMAGE_LEFT}
                  alt={`${UPCOMING_EVENT_TITLE} poster left`}
                  className="h-full min-h-[260px] w-full object-cover object-top"
                  loading="eager"
                />
              </div>
              <div className="overflow-hidden rounded-[24px] border border-[#edcfab] bg-white shadow-[0_12px_28px_rgba(122,74,27,0.12)]">
                <img
                  src={UPCOMING_EVENT_IMAGE_RIGHT}
                  alt={`${UPCOMING_EVENT_TITLE} poster right`}
                  className="h-full min-h-[260px] w-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b35a10]">{UPCOMING_EVENT_SUBTITLE}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#7c1d00] md:text-5xl">{UPCOMING_EVENT_TITLE}</h2>
            <div className="mt-4 inline-flex rounded-full bg-[#fff1d7] px-4 py-2 text-sm font-bold text-[#8d230d]">
              {UPCOMING_EVENT_DATE}
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5b4027]">{UPCOMING_EVENT_DETAILS}</p>

            <div className="mt-6 rounded-[24px] border border-[#f1ddca] bg-[#fff9f3] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b35a10]">Quick Highlights</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#5d4b3a]">
                <li>5:30 AM - Janmotsav Aarti</li>
                <li>8:00 AM - Puja, Maha Abhishek, Shringar, and Mandal Puja</li>
                <li>8:30 AM - Shringar Darshan and Maha Aarti</li>
                <li>10:00 AM - Sundarkand Path and Mahaprasad for devotees</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={UPCOMING_EVENT_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_BUTTON}
              >
                Watch Live
              </a>
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_BUTTON}
              >
                Donate
              </a>
              <a href={`tel:${UPCOMING_EVENT_CONTACT.replace(/\s+/g, "")}`} className={SECONDARY_BUTTON}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(function HomePage() {
  const { t } = useTranslation();
  usePageMeta(t("home.meta.title"), t("home.meta.description"));
  const [showUpcomingModal, setShowUpcomingModal] = useState(true);

  const closeUpcomingModal = useCallback(() => {
    setShowUpcomingModal(false);
  }, []);

  const impactItems = [
    { label: t("home.impact.livesTouched"), target: 50000 },
    { label: t("home.impact.eventsConducted"), target: 500 },
    { label: t("home.impact.volunteers"), target: 1200 },
    { label: t("home.impact.yearsOfService"), target: 40 },
  ];

  return (
    <>
      {showUpcomingModal ? <UpcomingEventModal onClose={closeUpcomingModal} /> : null}

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#eaf4f1",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(47,127,115,0.35) 0%, rgba(47,127,115,0) 42%), radial-gradient(circle at top right, rgba(19,126,181,0.28) 0%, rgba(19,126,181,0) 40%), radial-gradient(circle at bottom left, rgba(252,182,48,0.22) 0%, rgba(252,182,48,0) 44%), radial-gradient(circle at bottom right, rgba(148,197,88,0.22) 0%, rgba(148,197,88,0) 46%), linear-gradient(135deg, #f7fcfa 0%, #edf8f2 45%, #fff7e6 100%)",
        }}
      >
        <section className="w-full pt-0">
          <div className="relative h-[38vw] max-h-[85vh] min-h-[200px] w-full overflow-hidden sm:h-[42vw] md:h-[min(68vh,800px)]">
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

        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/40 bg-white/35 px-6 py-10 text-center shadow-md backdrop-blur-sm md:px-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a4a1b] md:text-sm">
              {t("home.aboutEyebrow")}
            </p>
            <h2 className="mb-4 text-3xl font-extrabold text-[#0d3b66] md:text-4xl">{t("home.aboutTitle")}</h2>
            <p className="mx-auto mb-7 max-w-3xl text-lg leading-relaxed text-[#2f2f2f]">{t("home.aboutText")}</p>
            <Link to={ROUTES.about.index} className={PRIMARY_BUTTON}>
              {t("home.readMore")}
            </Link>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="w-full rounded-2xl border border-[#dce8f5] bg-white p-6 shadow-sm md:p-8">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[220px_1fr] md:gap-8">
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2b618f]">
                  {t("home.founderEyebrow")}
                </p>
                <h2 className="mb-3 text-2xl font-black text-[#123753] md:text-4xl">{t("home.founderTitle")}</h2>
                <p className="leading-relaxed text-[#4f6272]">{t("home.founderQuote")}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to={ROUTES.about.founder} className={PRIMARY_BUTTON}>
                    {t("home.viewFounderProfile")}
                  </Link>
                  <Link to="/events" className={PRIMARY_BUTTON}>
                    Upcoming Pravachans
                  </Link>
                  <Link to="/get-involved/invite-maharaj-ji" className={PRIMARY_BUTTON}>
                    Invite Maharaj Ji
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="mt-3 text-3xl font-extrabold text-[#0d3b66] md:text-4xl">{t("home.upcomingEventsTitle")}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[28px] border border-[#efcfaa] bg-white p-3 shadow-[0_18px_40px_rgba(122,74,27,0.12)]">
                <img
                  src={UPCOMING_EVENT_IMAGE_LEFT}
                  alt="Upcoming event poster left"
                  className="h-full min-h-[420px] w-full rounded-[22px] object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[#efcfaa] bg-white p-3 shadow-[0_18px_40px_rgba(122,74,27,0.12)]">
                <img
                  src={UPCOMING_EVENT_IMAGE_RIGHT}
                  alt="Upcoming event poster right"
                  className="h-full min-h-[420px] w-full rounded-[22px] object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={EXTERNAL_RAZORPAY_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={PRIMARY_BUTTON}
              >
                Donate
              </a>
              <Link to={ROUTES.involved.index} className={SECONDARY_BUTTON}>
                Join Us
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <a
                href={UPCOMING_EVENT_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-[28px] border border-[#efcfaa] bg-white shadow-[0_18px_40px_rgba(122,74,27,0.12)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={UPCOMING_EVENT_VIDEO_POSTER}
                    alt="Watch now banner for Hanuman Janmotsav YouTube video"
                    className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-[290px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b1300]/85 via-[#2b1300]/30 to-transparent px-6 py-5">
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#8a2f0a]">
                      YouTube Video
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-white">Watch Hanuman Janmotsav</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="text-sm leading-7 text-[#5b4027]">Open the official event video on YouTube.</p>
                  <span className="inline-flex items-center justify-center rounded-lg bg-[#9a5310] px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#7f430b]">
                    Watch Now
                  </span>
                </div>
              </a>

              <a
                href={UPCOMING_EVENT_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-[28px] border border-[#efcfaa] bg-white shadow-[0_18px_40px_rgba(122,74,27,0.12)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={UPCOMING_EVENT_LIVE_POSTER}
                    alt="Live banner for Hanuman Jayanti Janmotsav YouTube livestream"
                    className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-[290px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b1300]/85 via-[#2b1300]/30 to-transparent px-6 py-5">
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#8a2f0a]">
                      YouTube Live
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-white">Hanuman Jayanti Janmotsav Live</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="text-sm leading-7 text-[#5b4027]">Join the live darshan broadcast directly on YouTube.</p>
                  <span className="inline-flex items-center justify-center rounded-lg bg-[#9a5310] px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#7f430b]">
                    Watch Live
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <ImpactCounter items={impactItems} />

        <section className="bg-[#eef0f3] px-4 py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="min-h-[230px] rounded-2xl border border-[#991b1b] bg-[#7f1d1d] shadow-lg">
              <div className="flex h-full flex-col justify-center p-8 text-center">
                <h2 className="mb-3 text-3xl font-bold text-white">{t("home.donationTitle")}</h2>
                <p className="mb-6 text-red-100">{t("home.donationText")}</p>
                <div>
                  <Link to={ROUTES.donate} className={PRIMARY_BUTTON}>
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
