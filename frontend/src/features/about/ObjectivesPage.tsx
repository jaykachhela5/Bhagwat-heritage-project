import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  ABOUT_BODY_CLASS,
  ABOUT_CARD_TITLE_CLASS,
  ABOUT_SECTION_HEADING_CLASS,
  ABOUT_SECTION_LABEL_CLASS,
} from "./aboutTypography";

type ObjectiveSection = {
  eyebrow: string;
  title: string;
  tagline: string;
  items: Array<{
    title: string;
    description: string;
  }>;
  shellClassName: string;
};

const SECTION_LABEL = `${ABOUT_SECTION_LABEL_CLASS} text-[#C46D1A]`;
const SECTION_HEADING = `${ABOUT_SECTION_HEADING_CLASS} text-[#1D4F63]`;
const SECTION_BODY = `mt-4 ${ABOUT_BODY_CLASS} text-[#5E5247]`;
const CARD_TITLE = `${ABOUT_CARD_TITLE_CLASS} text-[#27657A]`;
const CARD_BODY = `${ABOUT_BODY_CLASS} text-[#51463C]`;
const SECTION_SHELL =
  "rounded-[30px] border border-[#E7D3B5] bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8";
const SOFT_SECTION_SHELL =
  "rounded-[30px] border border-[#D8E4E5] bg-[linear-gradient(180deg,rgba(230,241,240,0.85)_0%,rgba(255,252,247,0.98)_56%,rgba(250,241,225,0.9)_100%)] p-6 shadow-[0_22px_52px_rgba(29,79,99,0.08)] md:p-8";
const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-xl bg-[#F0AE57] px-5 py-3 text-[15px] font-semibold text-[#FFFDF8] shadow-[0_14px_28px_rgba(233,147,45,0.20)] transition-all hover:-translate-y-0.5 hover:bg-[#E9932D]";
const GHOST_BUTTON =
  "inline-flex items-center justify-center rounded-xl border border-[#D8C3A2] bg-[rgba(255,255,255,0.72)] px-5 py-3 text-[15px] font-semibold text-[#1D4F63] transition-all hover:-translate-y-0.5 hover:bg-[#F6EAD4]";
const LIST_ITEM_SHELL =
  "group flex gap-4 border-b border-[#D8C3A2]/70 py-5 last:border-b-0 transition-all duration-300 hover:translate-x-1";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const objectiveSections: ObjectiveSection[] = [
  {
    eyebrow: "Spiritual Objectives",
    title: "Spiritual Objectives",
    tagline: "Deepening devotion through Bhagwat-centered spiritual learning",
    items: [
      {
        title: "Spread teachings of Shrimad Bhagavat",
        description: "Share divine knowledge in a simple and practical way for all.",
      },
      {
        title: "Organize Bhagwat Katha & Satsang",
        description: "Create spiritual gatherings that inspire devotion and wisdom.",
      },
      {
        title: "Guide individuals spiritually",
        description: "Help people lead a balanced and purposeful life.",
      },
      {
        title: "Promote Bhakti (devotion)",
        description: "Encourage connection with divine consciousness.",
      },
      {
        title: "Create spiritual learning platforms",
        description: "Build spaces for continuous spiritual growth.",
      },
    ],
    shellClassName: SOFT_SECTION_SHELL,
  },
  {
    eyebrow: "Service Objectives",
    title: "Service Objectives",
    tagline: "Turning compassion into seva for those in need",
    items: [
      {
        title: "Annadaan (food donation)",
        description: "Provide food support to the needy with dignity.",
      },
      {
        title: "Gau Seva initiatives",
        description: "Protect and serve cows as a sacred responsibility.",
      },
      {
        title: "Emergency & disaster help",
        description: "Support communities during critical situations.",
      },
      {
        title: "Social welfare programs",
        description: "Uplift underprivileged sections of society.",
      },
      {
        title: "Community service activities",
        description: "Encourage collective participation in seva.",
      },
    ],
    shellClassName: SECTION_SHELL,
  },
  {
    eyebrow: "Youth & Education Objectives",
    title: "Youth & Education Objectives",
    tagline: "Guiding the next generation with values and vision",
    items: [
      {
        title: "Value-based youth guidance",
        description: "Help young minds grow with discipline, integrity, and purpose.",
      },
      {
        title: "Educational programs & workshops",
        description: "Create practical learning spaces that nurture knowledge and character.",
      },
      {
        title: "Moral & leadership development",
        description: "Prepare youth to lead with responsibility, empathy, and courage.",
      },
      {
        title: "Cultural education",
        description: "Introduce dharmic traditions in ways that feel relevant and alive.",
      },
      {
        title: "Heritage awareness",
        description: "Connect the next generation with the wisdom of Indian heritage.",
      },
    ],
    shellClassName: SOFT_SECTION_SHELL,
  },
  {
    eyebrow: "Cultural Objectives",
    title: "Cultural Objectives",
    tagline: "Preserving dharmic identity through culture",
    items: [
      {
        title: "Preserve Indian culture",
        description: "Protect timeless values, customs, and sacred cultural expressions.",
      },
      {
        title: "Celebrate festivals spiritually",
        description: "Honor festivals with devotion, understanding, and community participation.",
      },
      {
        title: "Organize cultural events",
        description: "Create meaningful platforms for devotional and cultural celebration.",
      },
      {
        title: "Pass traditions to next generation",
        description: "Ensure living traditions remain rooted in family and community life.",
      },
      {
        title: "Strengthen cultural identity",
        description: "Build confidence in dharmic heritage through awareness and practice.",
      },
    ],
    shellClassName: SECTION_SHELL,
  },
  {
    eyebrow: "Long-Term Goals",
    title: "Long-Term Goals",
    tagline: "Building a sustainable future of seva and spirituality",
    items: [
      {
        title: "Expand activities",
        description: "Reach more individuals and communities through wider seva programs.",
      },
      {
        title: "Build spiritual centers",
        description: "Create sacred spaces for worship, learning, and guidance.",
      },
      {
        title: "Global devotee network",
        description: "Connect seekers across regions through a shared spiritual mission.",
      },
      {
        title: "Structured long-term programs",
        description: "Develop sustainable initiatives with clear long-term social impact.",
      },
    ],
    shellClassName: SOFT_SECTION_SHELL,
  },
];

export default memo(function ObjectivesPage() {
  usePageMeta(
    "Our Objectives",
    "Explore the spiritual, service, youth, cultural, community, and long-term objectives of Shri Bhagwat Heritage Service Foundation Trust.",
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(228,180,94,0.22)_0%,_rgba(228,180,94,0)_30%),radial-gradient(circle_at_left_center,_rgba(39,101,122,0.12)_0%,_rgba(39,101,122,0)_28%),linear-gradient(180deg,_#FFF9F1_0%,_#FFFDF8_44%,_#F6EAD4_100%)] pb-16 text-[#1D4F63]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute right-0 top-[180px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(39,101,122,0.12),transparent_62%)] blur-3xl" />

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-4 pt-8 md:pt-10"
      >
        <div
          className="relative overflow-hidden rounded-[34px] border border-[#D8C3A2] shadow-[0_24px_60px_rgba(101,71,35,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,34,48,0.08) 0%, rgba(11,34,48,0.34) 42%, rgba(11,34,48,0.92) 100%), url('https://res.cloudinary.com/der8zinu8/image/upload/v1774439060/objectives_bj9uay.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 opacity-16"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(245,158,11,0.22) 0%, transparent 36%)",
            }}
          />
          <div className="relative flex min-h-[420px] flex-col justify-end px-5 py-[22px] md:min-h-[540px] md:px-8 md:py-[30px]">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-[10px] text-4xl font-bold leading-tight text-white md:text-5xl">
                Our Objectives
              </h1>
              <p className="mx-auto max-w-3xl text-[18px] font-semibold leading-7 text-white/90 md:text-[24px]">
                Guided by Faith • Driven by Service • Focused on Impact
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 py-10 md:py-14"
      >
        <div className={SECTION_SHELL}>
          <p className={SECTION_LABEL}>Our Purpose</p>
          <h2 className={SECTION_HEADING}>Transforming values into spiritual and social action</h2>
          <p className={SECTION_BODY}>
            The Trust exists to bridge spirituality with real-life action by transforming values into service. It aims to create a balanced society where inner peace, moral strength, and social responsibility go hand in hand.
          </p>
          <p className={SECTION_BODY}>
            Our purpose is not only to inspire devotion but also to bring positive change through structured initiatives that uplift individuals, families, and communities.
          </p>
        </div>
      </motion.section>

      {objectiveSections.map((section) => (
        <motion.section
          key={section.eyebrow}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mx-auto max-w-6xl px-4 pb-10"
        >
          <div className={section.shellClassName}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
              <div className="lg:pr-10">
                <p className={SECTION_LABEL}>{section.eyebrow}</p>
                <h2 className={SECTION_HEADING}>{section.title}</h2>
                <p className={`${SECTION_BODY} max-w-md`}>{section.tagline}</p>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                className="relative lg:border-l lg:border-[#D8C3A2] lg:pl-10"
              >
                {section.items.map((item) => (
                  <motion.div key={item.title} variants={fadeUp} className={LIST_ITEM_SHELL}>
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6EAD4] text-[#C46D1A] shadow-[inset_0_0_0_1px_rgba(196,109,26,0.12)] transition-all duration-300 group-hover:bg-[#F0AE57] group-hover:text-[#FFFDF8]">
                      ✓
                    </span>
                    <div>
                      <h3 className={`${CARD_TITLE} transition-colors duration-300 group-hover:text-[#1D5B72]`}>
                        {item.title}
                      </h3>
                      <p className={`mt-2 ${CARD_BODY}`}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      ))}

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-6xl px-4 pb-10"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className={SECTION_SHELL}>
            <p className={SECTION_LABEL}>Community Objectives</p>
            <h2 className={SECTION_HEADING}>Building value-driven communities with unity and responsibility</h2>
            <p className={SECTION_BODY}>
              The Trust aims to build strong, value-driven communities by encouraging unity, cooperation, and collective growth.
            </p>
          </div>

          <div className={SOFT_SECTION_SHELL}>
            <p className={SECTION_LABEL}>Community Focus</p>
            <h2 className={SECTION_HEADING}>How this mission reaches society</h2>
            <div className="mt-6 space-y-3">
              {[
                "Promote unity",
                "Encourage seva participation",
                "Build responsible individuals",
                "Support community growth",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex items-start gap-3 rounded-[22px] border border-[#D8C3A2] bg-[rgba(255,255,255,0.72)] px-4 py-3"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E4B45E]" />
                  <span className={`${ABOUT_BODY_CLASS} text-[#51463C]`}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 pb-10"
      >
        <div className="rounded-[30px] border border-[#E7D3B5] bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 text-[#1D4F63] shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#C46D1A]">Join Our Mission</p>
              <h2 className="mt-2 text-[14px] font-black text-[#1D4F63] md:text-[20px]">
                Be a part of our mission to transform lives through devotion, service, and culture.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to={ROUTES.seva.index} className={GHOST_BUTTON}>
                Participate in Seva
              </Link>
              <Link to={ROUTES.donate} className={BUTTON_CLASS}>
                Support Our Initiatives
              </Link>
              <Link to={ROUTES.contact} className={GHOST_BUTTON}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
});
