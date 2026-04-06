import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { SEVA_BODY_TEXT_CLASS, SEVA_CARD_TITLE_CLASS, SEVA_SECTION_HEADING_CLASS, SEVA_SECTION_LABEL_CLASS } from "./sevaTypography";

type IconProps = { className?: string };
type ServiceItem = {
  title: string;
  description: string;
  icon: ReactNode;
};


const EDUCATION_SERVICES: ServiceItem[] = [
  {
    title: "Scholarship Support",
    description: "Financial aid for school, college, and competitive exam students from low-income families.",
    icon: <ScholarshipIcon />,
  },
  {
    title: "School Kit Distribution",
    description: "Providing books, notebooks, uniforms, and bags to underprivileged students.",
    icon: <SchoolKitIcon />,
  },
  {
    title: "Digital Education Support",
    description: "Access to online learning through tablets, laptops, and internet support in rural areas.",
    icon: <DigitalLearningIcon />,
  },
  {
    title: "Free Coaching Classes",
    description: "Free tuition for core subjects like Maths, Science, and English, including basic exam preparation.",
    icon: <CoachingIcon />,
  },
  {
    title: "Skill Development Programs",
    description: "Training in computer skills, spoken English, and job-oriented learning for youth.",
    icon: <SkillProgramIcon />,
  },
  {
    title: "Girl Child Education Support",
    description: "Focused scholarships and awareness programs to promote education for girls.",
    icon: <GirlEducationIcon />,
  },
  {
    title: "Library & Learning Centers",
    description: "Community libraries, study spaces, and book banks for continuous learning.",
    icon: <LibraryIcon />,
  },
  {
    title: "Career Guidance & Mentorship",
    description: "Career counseling, expert sessions, and mentorship programs for students.",
    icon: <MentorshipIcon />,
  },
];

function SvgIcon({ children, className = "h-7 w-7" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

function ScholarshipIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M3 8L12 4L21 8L12 12L3 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M7 10.5V15.5C7 16.8 9.2 18.5 12 18.5C14.8 18.5 17 16.8 17 15.5V10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M21 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function SchoolKitIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M7 6.5H17C18.381 6.5 19.5 7.619 19.5 9V18.5H4.5V9C4.5 7.619 5.619 6.5 7 6.5Z" stroke="currentColor" strokeWidth="1.8" /><path d="M9 6.5V5.5C9 4.672 9.672 4 10.5 4H13.5C14.328 4 15 4.672 15 5.5V6.5" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 12.5H19.5" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
}

function DigitalLearningIcon({ className }: IconProps) {
  return <SvgIcon className={className}><rect x="4.5" y="5" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M9 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M12 15.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8.5 9H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8.5 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function CoachingIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M6 5.5H18C18.828 5.5 19.5 6.172 19.5 7V17C19.5 17.828 18.828 18.5 18 18.5H6C5.172 18.5 4.5 17.828 4.5 17V7C4.5 6.172 5.172 5.5 6 5.5Z" stroke="currentColor" strokeWidth="1.8" /><path d="M8 9H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8 12H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M8 15H11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function SkillProgramIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M6.5 14.5L9.5 17.5L17.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
}

function GirlEducationIcon({ className }: IconProps) {
  return <SvgIcon className={className}><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" /><path d="M8 19C8.5 16.1 10 14.5 12 14.5C14 14.5 15.5 16.1 16 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M16.5 6.5L18.5 8.5M18.5 6.5L16.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function LibraryIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M6 5H9V19H6C5.172 19 4.5 18.328 4.5 17.5V6.5C4.5 5.672 5.172 5 6 5Z" stroke="currentColor" strokeWidth="1.8" /><path d="M9 5H13V19H9" stroke="currentColor" strokeWidth="1.8" /><path d="M13 6H17C17.828 6 18.5 6.672 18.5 7.5V19H13" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
}

function MentorshipIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M12 19C16.418 19 20 15.866 20 12C20 8.134 16.418 5 12 5C7.582 5 4 8.134 4 12C4 13.72 4.711 15.295 5.9 16.52L5.3 19L8.1 18.25C9.24 18.73 10.58 19 12 19Z" stroke="currentColor" strokeWidth="1.8" /><path d="M9 11.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M9 14.2H13.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function RevealSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className} transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {children}
    </section>
  );
}

const EducationServiceCard = memo(function EducationServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <article
      className="group flex h-full flex-col rounded-[24px] border border-white/10 bg-[#0c5871] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ef9a1e]/15 text-[#ef9a1e] transition-all duration-300 group-hover:bg-[#ef9a1e] group-hover:text-white">
        {service.icon}
      </div>
      <h3 className={`mt-4 ${SEVA_CARD_TITLE_CLASS}`}>{service.title}</h3>
      <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS}`}>{service.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={ROUTES.donate}
          className="inline-flex items-center rounded-xl bg-[#ef9a1e] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#de930a]"
        >
          Donate
        </Link>
        <Link
          to={ROUTES.involved.sponsor}
          className="inline-flex items-center rounded-xl bg-[#0b2230] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#15384b]"
        >
          Sponsor
        </Link>
      </div>
    </article>
  );
});

export const EducationServicesSection = memo(function EducationServicesSection() {
  return (
    <RevealSection className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-[30px] border border-white/10 bg-[#0d6179] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className={SEVA_SECTION_LABEL_CLASS}>Education Services</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Support learning through focused educational seva</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {EDUCATION_SERVICES.map((service, index) => (
              <EducationServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
      </div>
    </RevealSection>
  );
});
