import { memo, useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { HeroSection, type HeroSlide } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
const UPCOMING_EVENT_IMAGE_LEFT = "https://res.cloudinary.com/der8zinu8/image/upload/v1774879635/u0_lxrinw.jpg";
const UPCOMING_EVENT_IMAGE_RIGHT = "https://res.cloudinary.com/der8zinu8/image/upload/v1774879636/u1_eobmdm.jpg";
const UPCOMING_EVENT_TITLE = "Shri Maharashtra Kashtbhanjan Hanuman Janmotsav 2026";
const UPCOMING_EVENT_SUBTITLE = "Hanumat Shakti Peeth, Shri Kshetra Chichpalli";
const UPCOMING_EVENT_DATE = "Thursday, 2 April 2026";
const UPCOMING_EVENT_CONTACT = "+91 9822471551";
const UPCOMING_EVENT_VIDEO_URL = "https://youtu.be/uhPE_XK45lE";
const UPCOMING_EVENT_VIDEO_EMBED_URL = "https://www.youtube.com/embed/uhPE_XK45lE";
const UPCOMING_EVENT_LIVE_URL = "https://youtube.com/live/b0Q8JoU4gI4?feature=share";
const UPCOMING_EVENT_LIVE_EMBED_URL = "https://www.youtube.com/embed/b0Q8JoU4gI4";
const BLOOD_DONATION_WHATSAPP_URL = "https://wa.me/918668897445";
const UPCOMING_EVENT_DETAILS =
  "Celebrate Hanuman Janmotsav in the divine presence of Sant Shri Manish Bhaiji Maharaj with aarti, puja, maha abhishek, Sundarkand path, mahaprasad, Hanuman Charitra Gatha, and evening maha aarti.";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg bg-[var(--color-footer-cta)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-footer-cta-hover)]";
const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg border border-[#d4a270] bg-white px-6 py-3 text-sm font-semibold text-[#9a5310] transition-colors hover:bg-[#fff7ef]";
const HOME_SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
const HOME_SECTION_HEADING = "mt-2 text-[14px] font-black leading-tight text-[#12394c] md:text-[20px]";
const HOME_BODY = "text-base leading-7 text-[#38505f] md:text-lg";
const HOME_CARD_TITLE = "text-2xl font-black text-[#12394c] md:text-[1.75rem]";
const HOME_PANEL =
  "rounded-[30px] border border-[#d8e5ea] bg-white/90 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.10)] backdrop-blur-sm md:p-8";
const HOME_CARD_PANEL =
  "overflow-hidden rounded-[28px] border border-[#d8e5ea] bg-white/95 p-4 shadow-[0_18px_40px_rgba(13,58,85,0.10)]";

function UpcomingEventMediaCard({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
  href,
  ctaLabel,
  placeholderText,
}: {
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  ctaLabel: string;
  placeholderText?: string;
}) {
  const image = (
    <div className="relative overflow-hidden rounded-[24px]">
      <img src={imageSrc} alt={imageAlt} className="h-[240px] w-full object-cover md:h-[280px]" loading="lazy" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2a1200]/80 via-[#2a1200]/15 to-transparent px-5 py-5">
        <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#8c3d00]">
          {eyebrow}
        </span>
      </div>
    </div>
  );

  return (
    <article className="overflow-hidden rounded-[30px] border border-[#efcfaa] bg-white p-4 shadow-[0_18px_40px_rgba(122,74,27,0.12)]">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {image}
        </a>
      ) : (
        image
      )}
      <div className="px-1 pb-1 pt-5">
        <h3 className="text-2xl font-black text-[#7c1d00]">{title}</h3>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#9a5310] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7f430b]"
          >
            {ctaLabel}
          </a>
        ) : (
          <div className="mt-4">
            <span className="inline-flex items-center justify-center rounded-lg border border-[#e8d2bb] bg-[#fff7ef] px-5 py-3 text-sm font-semibold text-[#9a5310]">
              {ctaLabel}
            </span>
            {placeholderText ? <p className="mt-3 text-sm leading-6 text-[#6c5440]">{placeholderText}</p> : null}
          </div>
        )}
      </div>
    </article>
  );
}

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
            <p className={HOME_SECTION_LABEL}>{UPCOMING_EVENT_SUBTITLE}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#12394c] md:text-[2.5rem]">{UPCOMING_EVENT_TITLE}</h2>
            <div className="mt-4 inline-flex rounded-full bg-[#fff1d7] px-4 py-2 text-sm font-bold text-[#8d230d]">
              {UPCOMING_EVENT_DATE}
            </div>
            <p className={`mt-6 max-w-2xl ${HOME_BODY}`}>{UPCOMING_EVENT_DETAILS}</p>

            <div className="mt-6 rounded-[24px] border border-[#f1ddca] bg-[#fff9f3] p-5">
              <p className="text-base font-black uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Quick Highlights</p>
              <ul className="mt-4 space-y-3 text-base leading-7 text-[#38505f]">
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

  const heroSlides = useMemo<HeroSlide[]>(
    () => [
      {
        id: 1,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774802023/swami_r7ypl0.jpg",
        title: t("home.heroSlides.foundationTitle", { defaultValue: "Bhagwat Heritage" }),
        subtitle: t("home.heroSlides.foundationSubtitle", {
          defaultValue: "Spiritual wisdom, seva, and cultural awakening",
        }),
        link: ROUTES.about.index,
      },
      {
        id: 2,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774588045/worldspiritual_smnrog.png",
        title: t("home.heroSlides.founderTitle", {
          defaultValue: "Sant Shri Manish Bhaiji Maharaj",
        }),
        subtitle: t("home.heroSlides.founderSubtitle", {
          defaultValue: "Guiding lives through devotion and service",
        }),
        link: ROUTES.about.founder,
      },
      {
        id: 3,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772647455/hero2_eenipn.png",
        title: t("home.heroSlides.sevaTitle", { defaultValue: "Seva Initiatives" }),
        subtitle: t("home.heroSlides.sevaSubtitle", {
          defaultValue: "Join compassionate service for humanity",
        }),
        link: ROUTES.seva.index,
      },
      {
        id: 4,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771999936/hanuman5_yhct8y.jpg",
        title: t("home.heroSlides.mandirTitle", { defaultValue: "Mandir & Teerth" }),
        subtitle: t("home.heroSlides.mandirSubtitle", {
          defaultValue: "Explore sacred heritage and spiritual vision",
        }),
        link: ROUTES.mandirTeerth.index,
      },
      {
        id: 5,
        image: "/images/homepage/HomePageBanner.jpeg",
        title: t("home.heroSlides.foundationTitle", { defaultValue: "Bhagwat Heritage" }),
        subtitle: t("home.heroSlides.foundationSubtitle", {
          defaultValue: "Spiritual wisdom, seva, and cultural awakening",
        }),
        link: ROUTES.about.index,
      },
    ],
    [t],
  );

  const closeUpcomingModal = useCallback(() => {
    setShowUpcomingModal(false);
  }, []);

  return (
    <>
      {showUpcomingModal ? <UpcomingEventModal onClose={closeUpcomingModal} /> : null}

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#eaf4f1",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(47,127,115,0.35) 0%, rgba(47,127,115,0) 42%), radial-gradient(circle at top right, rgba(19,126,181,0.28) 0%, rgba(19,126,181,0) 40%), radial-gradient(circle at bottom left, rgba(252,182,48,0.22) 0%, rgba(252,182,48,0) 44%), radial-gradient(circle at bottom right, rgba(148,197,88,0.22) 0%, rgba(148,197,88,0) 46%), linear-gradient(135deg, #f7fcfa 0%, #edf8f2 45%, #fff7e6 100%)",
        }}  > 
        <section className="w-full pt-0">
          <HeroSection
            title={t("home.heroTitle")}
            slides={heroSlides}
            autoplayDelayMs={5600}
            heightClass="h-[calc(58vh+40px)] min-h-[360px] max-h-[800px] sm:h-[calc(62vh+40px)] md:h-[calc(68vh+40px)] lg:h-[calc(72vh+40px)]"
          />
        </section>


        <section className="px-4 py-16">
          <div className="mx-auto max-w-[70rem] rounded-[30px] border border-[#d8e5ea] bg-white/90 px-6 py-10 text-center shadow-[0_16px_34px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:px-[56px] md:px-[96px] lg:px-[120px]">
            <p className={`mb-3 ${HOME_SECTION_LABEL}`}>
              {t("home.aboutEyebrow")}
            </p>
            <h2 className={`mx-auto mb-4 max-w-4xl ${HOME_SECTION_HEADING}`}>{t("home.aboutTitle")}</h2>
            <p className={`mx-auto mb-7 max-w-4xl ${HOME_BODY}`}>{t("home.aboutText")}</p>
            <Link to={ROUTES.about.index} className={PRIMARY_BUTTON}>
              {t("home.readMore")}
            </Link>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="mx-auto max-w-[70rem] rounded-[30px] border border-[#d8e5ea] bg-white/90 px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:px-[56px] md:px-[96px] lg:px-[120px]">
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
                <p className={`mb-2 ${HOME_SECTION_LABEL}`}>
                  {t("home.founderEyebrow")}
                </p>
                <h2 className={`mb-3 ${HOME_SECTION_HEADING}`}>{t("home.founderTitle")}</h2>
                <p className={HOME_BODY}>{t("home.founderQuote")}</p>
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
              <h2 className={HOME_SECTION_LABEL}>{t("home.upcomingEventsTitle")}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className={HOME_CARD_PANEL}>
                <div className="mb-3 px-2">
                  <h3 className={HOME_CARD_TITLE}>{t("home.upcomingVideoTitle")}</h3>
                </div>
                <div className="relative w-full overflow-hidden rounded-[22px] pt-[56.25%]">
                  <iframe
                    src={UPCOMING_EVENT_VIDEO_EMBED_URL}
                    title={t("home.upcomingVideoIframeTitle")}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="mt-3 px-2 pb-1">
                  <a href={UPCOMING_EVENT_VIDEO_URL} target="_blank" rel="noopener noreferrer" className={SECONDARY_BUTTON}>
                    {t("home.openOnYouTube")}
                  </a>
                </div>
              </div>

              <div className={HOME_CARD_PANEL}>
                <div className="mb-3 px-2">
                  <h3 className={HOME_CARD_TITLE}>{t("home.upcomingLiveTitle")}</h3>
                </div>
                <div className="relative w-full overflow-hidden rounded-[22px] pt-[56.25%]">
                  <iframe
                    src={UPCOMING_EVENT_LIVE_EMBED_URL}
                    title={t("home.upcomingLiveIframeTitle")}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="mt-3 px-2 pb-1">
                  <a href={UPCOMING_EVENT_LIVE_URL} target="_blank" rel="noopener noreferrer" className={SECONDARY_BUTTON}>
                    {t("home.openLiveOnYouTube")}
                  </a>
                </div>
              </div>
            </div>

            <div className={`mt-10 text-center ${HOME_PANEL}`}>
              <p className={HOME_SECTION_LABEL}>{t("home.bloodDonationTitle")}</p>
              <h3 className={`mx-auto mt-2 max-w-3xl ${HOME_SECTION_HEADING}`}>{t("home.bloodDonationIntro")}</h3>
              <p className={`mt-4 ${HOME_BODY}`}>{t("home.bloodDonationInspired")}</p>
              <p className={`mt-4 ${HOME_BODY}`}>{t("home.bloodDonationLocation")}</p>
              <p className={`mt-2 ${HOME_BODY}`}>{t("home.bloodDonationOccasion")}</p>
              <ul className="mx-auto mt-6 max-w-lg space-y-2 text-base font-semibold leading-7 text-[#38505f] md:text-lg">
                <li>{t("home.bloodDonationBullet1")}</li>
                <li>{t("home.bloodDonationBullet2")}</li>
                <li>{t("home.bloodDonationBullet3")}</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`${BLOOD_DONATION_WHATSAPP_URL}?text=${encodeURIComponent(t("home.bloodDonationWhatsappPrefill"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={PRIMARY_BUTTON}
                >
                  {t("home.bloodDonationRegister")}
                </a>
                <a
                  href={EXTERNAL_RAZORPAY_DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SECONDARY_BUTTON}
                >
                  {t("home.bloodDonationDonate")}
                </a>
              </div>
              <p className="mt-6 text-base font-medium italic leading-7 text-[#8a4f18] md:text-lg">{t("home.bloodDonationClosing")}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className={HOME_CARD_PANEL}>
                <img
                  src={UPCOMING_EVENT_IMAGE_LEFT}
                  alt="Upcoming event poster left"
                  className="h-full min-h-[420px] w-full rounded-[22px] object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className={HOME_CARD_PANEL}>
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
                {t("home.donateNow")}
              </a>
              <Link to={ROUTES.involved.index} className={SECONDARY_BUTTON}>
                {t("home.joinUs")}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#eef0f3] px-4 py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="min-h-[230px] rounded-2xl border border-[#991b1b] bg-[#7f1d1d] shadow-lg">
              <div className="flex h-full flex-col justify-center p-8 text-center">
                <h2 className="mb-3 text-2xl font-black text-white md:text-[1.75rem]">{t("home.donationTitle")}</h2>
                <p className="mb-6 text-base leading-7 text-red-100 md:text-lg">{t("home.donationText")}</p>
                <div>
                  <Link to={ROUTES.donate} className={PRIMARY_BUTTON}>
                    {t("home.donateNow")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="min-h-[230px] rounded-2xl border border-[#1f7a45] bg-[#166534] shadow-lg">
              <div className="flex h-full flex-col justify-center p-8 text-center">
                <h2 className="mb-3 text-2xl font-black text-white md:text-[1.75rem]">{t("home.joinUs")}</h2>
                <p className="mb-6 text-base leading-7 text-green-100 md:text-lg">{t("home.volunteerText")}</p>
                <div>
                  <Link
                    to={ROUTES.involved.index}
                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#166534] transition-colors hover:bg-[#ecfdf5]"
                  >
                    {t("home.joinUs")}
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
