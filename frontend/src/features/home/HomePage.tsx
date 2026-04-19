import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection, type HeroSlide } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg bg-[var(--color-footer-cta)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-footer-cta-hover)]";
const SECONDARY_BUTTON =
  "inline-flex items-center justify-center rounded-lg border border-[#d4a270] bg-white px-6 py-3 text-sm font-semibold text-[#9a5310] transition-colors hover:bg-[#fff7ef]";
const HOME_SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
const HOME_SECTION_HEADING = "mt-2 text-[14px] font-black leading-tight text-[#12394c] md:text-[20px]";
const HOME_BODY = "text-base leading-7 text-[#38505f] md:text-lg";
const HOME_LIGHT_HEADING = "mt-2 text-[14px] font-black leading-tight text-[#12394c] md:text-[20px]";
const HOME_LIGHT_BODY = "text-base leading-7 text-[#38505f] md:text-lg";
const HOME_DARK_HEADING = "mt-2 text-[14px] font-black leading-tight text-[#12394c] md:text-[20px]";
const HOME_DARK_BODY = "text-base leading-7 text-[#38505f] md:text-lg";
const MISSION_CARD =
  "group relative overflow-hidden rounded-[32px] border border-white/80 bg-white/88 p-8 text-center shadow-[0_24px_54px_rgba(233,147,45,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_64px_rgba(233,147,45,0.20)]";
const MISSION_ICON_WRAP =
  "mx-auto mb-7 flex h-[18.125rem] w-[18.125rem] items-center justify-center rounded-full border-[6px] border-[#fff8ee] bg-white p-2 shadow-[0_18px_36px_rgba(233,147,45,0.18)]";
const GOLD_CTA =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f4ce5a] via-[#f8db81] to-[#e9932d] px-7 py-3 text-sm font-semibold text-[#12394c] shadow-[0_18px_34px_rgba(233,147,45,0.22)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_24px_44px_rgba(233,147,45,0.30)]";
const MISSION_BAR_BUTTON =
  "mt-8 inline-flex w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-[#c53e22] via-[#df6927] to-[#f0af3d] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_30px_rgba(223,105,39,0.22)] transition duration-300 group-hover:scale-[1.01] group-hover:shadow-[0_20px_34px_rgba(223,105,39,0.30)]";
const SEVA_SCROLL_CARD =
  "group relative block min-w-[18rem] max-w-[18rem] snap-start overflow-hidden rounded-[1.6rem] shadow-lg shadow-[#c98a2b]/10 transition duration-300 md:min-w-[19.5rem] md:max-w-[19.5rem] xl:min-w-[20rem] xl:max-w-[20rem]";
const INVOLVED_CARD =
  "group rounded-[28px] border border-[#f1d7ab] bg-white/88 p-8 text-center shadow-[0_20px_50px_rgba(233,147,45,0.12)] backdrop-blur-xl transition duration-300 hover:scale-[1.05] hover:border-[#f4ce5a]/70 hover:shadow-[0_26px_56px_rgba(244,206,90,0.18)]";
const CTA_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f4ce5a] via-[#f8db81] to-[#e9932d] px-8 py-3 text-sm font-semibold text-black shadow-[0_18px_34px_rgba(233,147,45,0.26)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_24px_40px_rgba(233,147,45,0.34)]";

function VolunteerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 2c-2.8 0-5 1.8-5 4v1h10v-1c0-2.2-2.2-4-5-4Zm8 1c-1 0-1.9.2-2.7.7.9.8 1.5 1.9 1.7 3.3H21v-.8c0-1.8-2-3.2-5-3.2Z" fill="currentColor" />
    </svg>
  );
}

function DonateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M12 20c5.4-3.4 8-6 8-9 0-2.1-1.5-3.8-3.6-3.8-1.6 0-2.8.8-3.7 2.1-.9-1.3-2.1-2.1-3.7-2.1C7 7.2 5.5 8.9 5.5 11c0 3 2.6 5.6 6.5 9Z" fill="currentColor" />
      <path d="M6 16.8c1.2-.9 2.3-1 3.6-.1l1.1.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PartnerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="M7.5 13.5 10 11l3.2 3.2a2 2 0 0 0 2.8 0l2.7-2.7 2.3 2.3-4.7 4.7a2.5 2.5 0 0 1-3.5 0l-1.3-1.3-1.3 1.3a2.5 2.5 0 0 1-3.5 0L2 13.8l2.3-2.3L7 14.2" fill="currentColor" />
      <path d="M8 10.5 5.3 7.8a2 2 0 0 1 0-2.8l.9-.9a2 2 0 0 1 2.8 0L12 7l3-3a2 2 0 0 1 2.8 0l.9.9a2 2 0 0 1 0 2.8L16 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default memo(function HomePage() {
  const { t } = useTranslation();
  usePageMeta(t("home.meta.title"), t("home.meta.description"));

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

  const missionItems = useMemo(
    () => [
      {
        title: "Spiritual Mission",
        description:
          "Spreading the teachings of Shrimad Bhagavat through Katha, Satsang, and spiritual guidance.",
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771829450/sanskriti_3_bhvx6q.png",
        buttonLabel: "Explore Spiritual Mission",
      },
      {
        title: "Social Service",
        description:
          "Serving society through Annadaan, Gau Seva, disaster relief, and humanitarian initiatives.",
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776586564/sa2_v3ugrc.png",
        buttonLabel: "Explore Social Service",
      },
      {
        title: "Cultural Renaissance",
        description:
          "Preserving Indian traditions, values, and spiritual heritage for future generations.",
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776586564/sa1_fug3jm.png",
        buttonLabel: "Explore Cultural Heritage",
      },
    ],
    [],
  );

  const sevaItems = useMemo(
    () => [
      {
        title: "Gau Seva",
        link: ROUTES.seva.gau,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772910777/gau_pdm92i.jpg",
      },
      {
        title: "Jal Seva",
        link: ROUTES.seva.jal,
        image: "/images/jal1.png",
      },
      {
        title: "Ann Seva",
        link: ROUTES.seva.ann,
        image: "/images/annseva.png",
      },
      {
        title: "Chikitsa Seva",
        link: ROUTES.seva.medicine,
        image: "/images/chikitsa.png",
      },
      {
        title: "Education Support",
        link: ROUTES.seva.education,
        image: "/images/education.png",
      },
      {
        title: "Scholarship Program",
        link: ROUTES.seva.scholarship,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772699279/scholorship_ki7aes.png",
      },
      {
        title: "Kanyadaan Seva",
        link: ROUTES.seva.kanyadaan,
        image: "/images/kanyadan.png",
      },
      {
        title: "Vyasanmukti Abhiyan",
        link: ROUTES.seva.vyasanmukti,
        image: "/images/vyasanmukti.png",
      },
      {
        title: "Disaster Relief",
        link: ROUTES.seva.disasterRelief,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772911110/disaster-relief_lg6qcp.webp",
      },
    ],
    [],
  );

  const involvedItems = useMemo(
    () => [
      {
        title: "Become a Volunteer",
        description: "Offer your time and energy to living seva projects that uplift people with compassion.",
        link: ROUTES.involved.volunteer,
        Icon: VolunteerIcon,
      },
      {
        title: "Donate Now",
        description: "Support spiritual, charitable, and cultural initiatives through focused contribution.",
        link: ROUTES.donate,
        Icon: DonateIcon,
      },
      {
        title: "Partner With Us",
        description: "Collaborate to expand outreach, trust impact, and meaningful service at scale.",
        link: ROUTES.involved.partner,
        Icon: PartnerIcon,
      },
    ],
    [],
  );

  const mediaItems = useMemo(
    () => [
      {
        title: "Photo Gallery",
        tag: "Trending",
        link: ROUTES.media.photos,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771999936/hanuman5_yhct8y.jpg",
        kind: "featured" as const,
      },
      {
        title: "Video Gallery",
        tag: "New",
        link: ROUTES.media.videos,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774802023/swami_r7ypl0.jpg",
        kind: "medium" as const,
      },
      {
        title: "Event Highlights",
        tag: "Featured",
        link: ROUTES.media.highlights,
        image: "/images/kathapravachan.png",
        kind: "medium" as const,
      },
      {
        title: "Publications",
        tag: "Read",
        link: ROUTES.media.publications,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1772913533/festival_axzy0v.jpg",
        kind: "small" as const,
      },
      {
        title: "Latest News",
        tag: "Update",
        link: ROUTES.eventsKatha.index,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776594556/news_c5ixjb.webp",
        kind: "small" as const,
      },
      {
        title: "Social Feed",
        tag: "Live",
        link: ROUTES.media.socialFeed,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774588045/worldspiritual_smnrog.png",
        kind: "small" as const,
      },
      {
        title: "Live Darshan",
        tag: "Live",
        link: ROUTES.digital.satsang,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1774801393/ghanshyammaharaj_x75e8f.jpg",
        kind: "small" as const,
      },
      {
        title: "Upcoming Events",
        tag: "Soon",
        link: ROUTES.eventsKatha.index,
        image: "https://res.cloudinary.com/der8zinu8/image/upload/v1776594836/upcommigevents_uimqwg.jpg",
        kind: "small" as const,
      },
    ],
    [],
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#eaf4f1",
        backgroundImage:
          "radial-gradient(circle at top left, rgba(47,127,115,0.35) 0%, rgba(47,127,115,0) 42%), radial-gradient(circle at top right, rgba(19,126,181,0.28) 0%, rgba(19,126,181,0) 40%), radial-gradient(circle at bottom left, rgba(252,182,48,0.22) 0%, rgba(252,182,48,0) 44%), radial-gradient(circle at bottom right, rgba(148,197,88,0.22) 0%, rgba(148,197,88,0) 46%), linear-gradient(135deg, #f7fcfa 0%, #edf8f2 45%, #fff7e6 100%)",
      }}
    >
      <section className="w-full pt-0">
        <HeroSection
          title={t("home.heroTitle")}
          slides={heroSlides}
          autoplayDelayMs={5600}
          heightClass="h-[calc(58vh+40px)] min-h-[360px] max-h-[800px] sm:h-[calc(62vh+40px)] md:h-[calc(68vh+40px)] lg:h-[calc(72vh+40px)]"
        />
      </section>

      <section className="w-full px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-28 xl:px-24">
        <div className="w-full rounded-[30px] border border-[#d8e5ea] bg-white/90 px-6 py-10 text-center shadow-[0_16px_34px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:px-10 md:px-16 md:py-12 lg:px-20 xl:px-28">
          <p className={`mb-3 ${HOME_SECTION_LABEL}`}>{t("home.aboutEyebrow")}</p>
          <h2 className={`mx-auto mb-4 max-w-4xl ${HOME_SECTION_HEADING}`}>{t("home.aboutTitle")}</h2>
          <p className={`mx-auto mb-7 max-w-4xl ${HOME_BODY}`}>{t("home.aboutText")}</p>
          <Link to={ROUTES.about.index} className={PRIMARY_BUTTON}>
            {t("home.readMore")}
          </Link>
        </div>
      </section>

      <section className="w-full px-4 py-6 sm:px-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24">
        <div className="w-full rounded-[30px] border border-[#d8e5ea] bg-white/90 px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.10)] backdrop-blur-sm sm:px-10 md:px-16 lg:px-20 xl:px-28">
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
              <p className={`mb-2 ${HOME_SECTION_LABEL}`}>{t("home.founderEyebrow")}</p>
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

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,206,90,0.20),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(82,156,176,0.16),transparent_32%),linear-gradient(135deg,#fefcf6_0%,#f5fbff_46%,#fff7eb_100%)]"
        />
        <div aria-hidden="true" className="absolute left-[-5rem] top-12 h-40 w-40 rounded-full bg-[#f4ce5a]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-8 right-[-4rem] h-48 w-48 rounded-full bg-[#529cb0]/16 blur-3xl" />

        <div className="relative w-full">
          <div className="rounded-[40px] border border-[#f1d7ab] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),rgba(255,246,228,0.92)),linear-gradient(135deg,#fffaf0_0%,#fff2d3_100%)] px-6 py-12 shadow-[0_28px_80px_rgba(233,147,45,0.12)] sm:px-10 lg:px-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className={HOME_SECTION_LABEL}>Our Core Mission</p>
              <h2 className={HOME_LIGHT_HEADING}>
                Our Core Mission
              </h2>
              <p className={`${HOME_LIGHT_BODY} mt-4`}>Guided by Dharma, Service, and Heritage</p>
            </motion.div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {missionItems.map((item, index) => {
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, delay: index * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={MISSION_CARD}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,206,90,0.14),transparent_36%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <motion.div
                      className={MISSION_ICON_WRAP}
                      animate={{ rotate: [0, 4, 0], scale: [1, 1.04, 1] }}
                      transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: index * 0.2 }}
                    >
                      <img src={item.image} alt={item.title} className="h-full w-full object-contain" loading="lazy" />
                    </motion.div>

                    <h3 className={HOME_LIGHT_HEADING}>{item.title}</h3>
                    <p className={`${HOME_LIGHT_BODY} mt-4 min-h-[96px]`}>{item.description}</p>
                    <div className={MISSION_BAR_BUTTON}>{item.buttonLabel}</div>
                  </div>
                </motion.div>
              );
            })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
              className="mt-12 text-center"
            >
              <Link to={ROUTES.mission.index} className={GOLD_CTA}>
                Explore Mission →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,206,90,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(221,124,55,0.10),transparent_26%),linear-gradient(135deg,#fffbf4_0%,#fff6e6_38%,#fffdf8_100%)]"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-[-4rem] top-12 h-40 w-40 rounded-full bg-[#f4ce5a]/20 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="absolute bottom-10 right-[-3rem] h-52 w-52 rounded-full bg-[#d86f33]/14 blur-3xl"
        />

        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className={HOME_SECTION_LABEL}>Seva Initiatives</p>
            <p className={`${HOME_LIGHT_BODY} mt-4`}>Serving Humanity Through Selfless Actions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="mt-6 flex items-center justify-end gap-2 text-sm font-semibold text-[#9a6a3f]"
          >
            <span>Scroll</span>
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}>
              →
            </motion.span>
          </motion.div>

          <div className="relative mt-8">
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 bg-gradient-to-r from-[#fff6e7] to-transparent md:w-16" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 bg-gradient-to-l from-[#fffdf8] to-transparent md:w-16" />
            <div className="w-full overflow-x-auto pl-1 pr-1 [scrollbar-width:none] md:pl-2 md:pr-2 [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max snap-x snap-mandatory gap-5 pb-3 md:gap-6">
              {sevaItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
                  className="flex-shrink-0"
                >
                  <Link to={item.link} className={SEVA_SCROLL_CARD}>
                    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="relative h-[23rem]">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,26,36,0.04),rgba(11,26,36,0.16)_35%,rgba(11,26,36,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(11,26,36,0.08),rgba(11,26,36,0.22)_34%,rgba(11,26,36,0.9)_100%)]" />
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5"
                      >
                        <h3 className={`max-w-[12rem] ${HOME_DARK_HEADING}`}>{item.title}</h3>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/92">
                          Explore
                          <span aria-hidden="true">→</span>
                        </span>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,206,90,0.18),transparent_26%),linear-gradient(135deg,#fffbf4_0%,#fff6e6_42%,#fffdf8_100%)]" />
        <div aria-hidden="true" className="absolute left-[-4rem] top-16 h-52 w-52 rounded-full bg-[#f4ce5a]/18 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-4rem] top-28 h-48 w-48 rounded-full bg-[#529cb0]/12 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-8 left-1/3 h-44 w-44 rounded-full bg-[#e9932d]/10 blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className={HOME_SECTION_LABEL}>Get Involved</p>
            <h2 className={HOME_DARK_HEADING}>Be a Part of This Divine Mission</h2>
            <p className={`${HOME_DARK_BODY} mt-4`}>
              Be a part of this divine mission and contribute towards building a better society.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {involvedItems.map((item, index) => {
              const Icon = item.Icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Link to={item.link} className={INVOLVED_CARD}>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f6dfb4] bg-white text-[#d08a32] shadow-[0_0_30px_rgba(244,206,90,0.14)]">
                      <Icon />
                    </div>
                    <h3 className={`mt-6 ${HOME_DARK_HEADING}`}>{item.title}</h3>
                    <p className={`${HOME_DARK_BODY} mt-4`}>{item.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <section className="relative w-full overflow-hidden px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:px-16 lg:py-32 xl:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,206,90,0.16),transparent_24%),linear-gradient(135deg,#fefcf6_0%,#f5fbff_44%,#fff7eb_100%)]" />
        <div aria-hidden="true" className="absolute left-[-4rem] top-16 h-52 w-52 rounded-full bg-[#f4ce5a]/16 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-3rem] top-10 h-44 w-44 rounded-full bg-[#529cb0]/12 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-8 left-1/3 h-40 w-40 rounded-full bg-[#e9932d]/10 blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className={HOME_SECTION_LABEL}>Media & Updates</p>
            <h2 className={HOME_DARK_HEADING}>Explore Our Media & Spiritual Journey</h2>
            <p className={`mx-auto mt-5 max-w-3xl ${HOME_DARK_BODY}`}>
              Dive into pravachans, events, publications, and moments that reflect our mission.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <Link to={mediaItems[0].link} className="group relative block overflow-hidden rounded-[28px] border border-[#f1d7ab] shadow-[0_22px_54px_rgba(233,147,45,0.14)]">
                <motion.img
                  src={mediaItems[0].image}
                  alt={mediaItems[0].title}
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-[26rem] w-full object-cover md:h-[34rem]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,26,36,0.04),rgba(11,26,36,0.16)_40%,rgba(11,26,36,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(11,26,36,0.08),rgba(11,26,36,0.24)_34%,rgba(11,26,36,0.9)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <span className="inline-flex rounded-full border border-[#f6dfb4] bg-white/90 px-3 py-1 text-sm font-semibold text-[#d08a32]">
                      {mediaItems[0].tag}
                    </span>
                    <h3 className={`mt-4 ${HOME_DARK_HEADING}`}>{mediaItems[0].title}</h3>
                  </div>
                  <span className="text-sm font-semibold text-white/90">Explore →</span>
                </div>
              </Link>
            </motion.div>

            <div className="grid gap-6">
              {mediaItems.slice(1, 3).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                >
                  <Link to={item.link} className="group relative block overflow-hidden rounded-[28px] border border-[#f1d7ab] shadow-[0_18px_42px_rgba(233,147,45,0.12)]">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-[16rem] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,26,36,0.04),rgba(11,26,36,0.18)_36%,rgba(11,26,36,0.84)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(11,26,36,0.08),rgba(11,26,36,0.24)_30%,rgba(11,26,36,0.9)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <span className="inline-flex rounded-full border border-[#f6dfb4] bg-white/90 px-3 py-1 text-sm font-semibold text-[#d08a32]">
                          {item.tag}
                        </span>
                        <h3 className={`mt-3 ${HOME_DARK_HEADING}`}>{item.title}</h3>
                      </div>
                      <span className="text-sm font-semibold text-white/90">Explore →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            {mediaItems.slice(3).map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
              >
                <Link to={item.link} className="group relative block overflow-hidden rounded-[24px] border border-[#f1d7ab] shadow-[0_16px_36px_rgba(233,147,45,0.12)]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-[14rem] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,26,36,0.04),rgba(11,26,36,0.14)_30%,rgba(11,26,36,0.82)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(11,26,36,0.08),rgba(11,26,36,0.22)_26%,rgba(11,26,36,0.9)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <div>
                      <span className="inline-flex rounded-full border border-[#f6dfb4] bg-white/90 px-2.5 py-1 text-sm font-semibold text-[#d08a32]">
                        {item.tag}
                      </span>
                      <h3 className={`mt-2 ${HOME_DARK_HEADING}`}>{item.title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-white/88">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <p className={HOME_DARK_BODY}>Stay Connected with Our Spiritual Journey</p>
            <Link to={ROUTES.media.index} className={`${CTA_PRIMARY} mt-6`}>
              View All Media →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
});
