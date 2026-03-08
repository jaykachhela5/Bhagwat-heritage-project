import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

const MISSION_MEDIA = [
  {
    href: ROUTES.mission.spiritual,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png",
  },
  {
    href: ROUTES.involved.index,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png",
  },
  {
    href: ROUTES.mission.cultural,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png",
  },
];

const SEVA_MEDIA = [
  {
    href: ROUTES.seva.annJal,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png",
  },
  {
    href: ROUTES.involved.index,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png",
  },
  {
    href: ROUTES.seva.education,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/education_a16bxi.png",
  },
  {
    href: ROUTES.seva.medicine,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/chikitsa_q2seq1.png",
  },
  {
    href: ROUTES.seva.vyasanmukti,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583760/vyasanmukti_xa9hif.png",
  },
  {
    href: ROUTES.seva.kanyadaan,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583758/kanyadan_ftf9oc.png",
  },
];

const LEADERS = [
  {
    name: "S.S. Manish Bhai Ji",
    href: ROUTES.about.founder,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png",
  },
  {
    name: "Trust Committee",
    href: ROUTES.about.index,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png",
  },
  {
    name: "Seva Volunteers",
    href: ROUTES.involved.volunteer,
    image: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/jal_ymllgv.png",
  },
];

interface Highlight {
  label: string;
  value: string;
}

interface ContentCard {
  title: string;
  desc: string;
}

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export default memo(function AboutPage() {
  const { t } = useTranslation();
  usePageMeta(t("about.meta.title"), t("about.meta.description"));

  const highlights = t("about.highlights", { returnObjects: true }) as Highlight[];
  const missionCards = t("about.missionCards", { returnObjects: true }) as ContentCard[];
  const sevaLabels = t("about.sevaLabels", { returnObjects: true }) as string[];
  const milestones = t("about.milestones", { returnObjects: true }) as Milestone[];
  const leadershipRoles = t("about.leadershipRoles", { returnObjects: true }) as string[];

  return (
    <div className="bg-[#0B2230] text-white">
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[28px] text-center text-white px-5 py-14 md:px-12 md:py-20 shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(11,34,48,0.9) 0%, rgba(11,34,48,0.7) 45%, rgba(245,158,11,0.28) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1771413474/itcm84f9dnqpzgawp7ak.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%)]" />
          <div className="relative z-10">
            <p className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-sm mb-6 bg-white/10">
            {t("about.heroBadge")}
            </p>
            <h1 className="text-3xl md:text-6xl font-black mb-4">{t("about.heroTitle")}</h1>
            <p className="text-xl md:text-4xl font-medium text-white/90">{t("about.heroSubtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={ROUTES.donate}
                className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-bold px-7 py-3 rounded-xl transition-colors"
              >
                {t("about.donateBtn")}
              </Link>
              <Link
                to={ROUTES.involved.volunteer}
                className="inline-block border border-white/25 bg-white/10 text-white font-bold px-7 py-3 rounded-xl hover:bg-white/15 transition-colors"
              >
                {t("about.volunteerBtn")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-[#12394A] border border-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.18)] p-4 md:p-5 text-center"
            >
              <p className="text-3xl md:text-5xl font-extrabold text-[#F59E0B]">{item.value}</p>
              <p className="text-sm md:text-base text-white/82 mt-1.5">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 md:py-14 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#12394A] rounded-2xl p-3 shadow-sm border border-white/10">
            <img
              src="https://res.cloudinary.com/der8zinu8/image/upload/v1771583759/kathapravachan_fp8leo.png"
              alt={t("about.introTitle")}
              className="w-full h-[260px] md:h-[330px] object-cover rounded-xl"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#F59E0B] mb-5">{t("about.introTitle")}</h2>
            <p className="text-white/82 text-lg leading-relaxed mb-6">{t("about.introText")}</p>
            <Link
              to={ROUTES.about.objectives}
              className="inline-block bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              {t("about.readDetail")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("about.missionTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionCards.map((item, index) => (
              <div
                key={item.title}
                className="group bg-[#12394A] rounded-2xl p-6 text-center shadow-md border border-white/10 hover:border-[#F59E0B] hover:-translate-y-1 transition-all"
              >
                <img src={MISSION_MEDIA[index].image} alt={item.title} className="h-20 w-20 rounded-full object-cover mx-auto mb-6" />
                <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                <p className="text-white/80 mb-6">{item.desc}</p>
                <Link
                  to={MISSION_MEDIA[index].href}
                  className="block w-full bg-[#F59E0B] hover:bg-[#d88908] text-white font-semibold py-2.5 rounded-md transition-colors"
                >
                  {t("about.explore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2230] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("about.sevaTitle")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {sevaLabels.map((label, index) => (
              <Link
                key={label}
                to={SEVA_MEDIA[index].href}
                className="bg-[#12394A] rounded-2xl p-4 text-center shadow-sm border border-white/10 hover:border-[#F59E0B] hover:shadow-md transition-all"
              >
                <img
                  src={SEVA_MEDIA[index].image}
                  alt={label}
                  className="h-20 w-20 rounded-xl object-cover mx-auto mb-3"
                  loading="lazy"
                />
                <p className="font-semibold text-white text-sm md:text-base">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#F59E0B] mb-10">{t("about.growthTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((step) => (
            <div key={`${step.year}-${step.title}`} className="rounded-xl bg-[#12394A] border border-white/10 p-5 shadow-sm">
              <p className="text-[#F59E0B] font-black text-lg">{step.year}</p>
              <h3 className="text-white font-bold text-xl mt-1">{step.title}</h3>
              <p className="text-white/78 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0e2a3a] py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title !text-[#F59E0B]">{t("about.leadershipTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERS.map((person, index) => (
              <div key={person.name} className="bg-[#12394A] rounded-xl p-6 text-center shadow-md border border-white/10">
                <img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                <h3 className="font-bold text-white">{person.name}</h3>
                <p className="text-sm text-white/70">{leadershipRoles[index]}</p>
                <Link to={person.href} className="mt-3 inline-block rounded-lg bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d88908]">
                  {t("about.learnMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#12394A] p-8 md:p-10 text-center text-white shadow-lg">
          <h2 className="text-3xl md:text-4xl font-black mb-3">{t("about.ctaTitle")}</h2>
          <p className="text-white/90 max-w-3xl mx-auto mb-6">{t("about.ctaDesc")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-block border border-white/15 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/15 transition-colors"
            >
              {t("about.volunteerBtn")}
            </Link>
            <Link
              to={ROUTES.donate}
              className="inline-block bg-[#F59E0B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#d88908] transition-colors"
            >
              {t("about.donateBtn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});
