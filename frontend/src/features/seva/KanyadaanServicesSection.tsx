import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { SEVA_BODY_TEXT_CLASS, SEVA_CARD_TITLE_CLASS, SEVA_SECTION_HEADING_CLASS, SEVA_SECTION_LABEL_CLASS } from "./sevaTypography";

type IconProps = { className?: string };
type KanyadaanService = {
  title: string;
  description: string;
  details: string;
  icon: ReactNode;
  featured?: boolean;
  tag?: string;
};

const SERVICES: KanyadaanService[] = [
  {
    title: "Complete Kanyadaan Support",
    description: "Full wedding support including clothes, rituals, and essential arrangements for underprivileged brides.",
    details: "This seva focuses on giving a daughter and her family a dignified marriage journey through coordinated, compassionate, and transparent support.",
    icon: <BlessingHeartIcon />,
    featured: true,
    tag: "Featured",
  },
  
  {
    title: "Marriage Kit Distribution",
    description: "Providing sarees, utensils, bedding, and basic household items for a new beginning.",
    details: "Marriage kits are structured to reduce pressure on families and help the bride begin married life with essential household support.",
    icon: <MarriageKitIcon />,
  },
  {
    title: "Financial Assistance",
    description: "Direct financial support to help families manage wedding expenses with dignity.",
    details: "Financial assistance is designed for genuine cases where timely support can protect dignity and reduce emotional stress on the family.",
    icon: <FinancialSupportIcon />,
  },
  {
    title: "Group Marriage Sponsorship",
    description: "Support for Samuhik Vivah (mass weddings) to help multiple couples together.",
    details: "This model increases community impact by helping multiple daughters through organized and responsible collective wedding support.",
    icon: <GroupMarriageIcon />,
    tag: "Most Sponsored",
  },
  {
    title: "Ritual & Ceremony Support",
    description: "Arrangements for pandit, mandap, and essential wedding rituals.",
    details: "The trust can help align key ceremonial needs so the event remains respectful, prayerful, and properly supported.",
    icon: <RitualSupportIcon />,
  },
  {
    title: "Post-Marriage Support",
    description: "Basic setup support for starting a new household after marriage.",
    details: "Beyond the ceremony, this seva helps a daughter begin her new household with practical essentials and caring support.",
    icon: <HomeSupportIcon />,
  },
];

function SvgIcon({ children, className = "h-7 w-7" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

function BlessingHeartIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M12 20C12 20 5 15.6 5 10.8C5 8.149 7.149 6 9.8 6C11.07 6 12.289 6.504 13.2 7.402C14.111 6.504 15.33 6 16.6 6C19.251 6 21.4 8.149 21.4 10.8C21.4 15.6 14.4 20 14.4 20H12Z" stroke="currentColor" strokeWidth="1.8" /><path d="M12 3.8V6.6M9.8 5.2H14.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function MarriageKitIcon({ className }: IconProps) {
  return <SvgIcon className={className}><rect x="4.5" y="7" width="15" height="11" rx="2.4" stroke="currentColor" strokeWidth="1.8" /><path d="M9 7V5.8C9 4.806 9.806 4 10.8 4H13.2C14.194 4 15 4.806 15 5.8V7" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 11.5H19.5" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
}

function FinancialSupportIcon({ className }: IconProps) {
  return <SvgIcon className={className}><circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" /><path d="M14.8 9.5C14.4 8.6 13.5 8 12.2 8C10.7 8 9.8 8.7 9.8 9.8C9.8 12.1 14.9 11.1 14.9 14.1C14.9 15.4 13.7 16.2 12.1 16.2C10.6 16.2 9.5 15.5 9 14.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M12 6.8V8M12 16.2V17.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function GroupMarriageIcon({ className }: IconProps) {
  return <SvgIcon className={className}><circle cx="8" cy="8.2" r="2.2" stroke="currentColor" strokeWidth="1.8" /><circle cx="16" cy="8.2" r="2.2" stroke="currentColor" strokeWidth="1.8" /><path d="M4.8 18.2C5.4 15.7 7.2 14.2 9.2 14.2H10.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M19.2 18.2C18.6 15.7 16.8 14.2 14.8 14.2H13.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M10.6 18.4C11 16.3 12.1 15 13.6 14.4C12.9 13.5 12.3 13 12 13C11.7 13 11.1 13.5 10.4 14.4C11.9 15 13 16.3 13.4 18.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function RitualSupportIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M12 4L18.5 8V16L12 20L5.5 16V8L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9.5 12H14.5M12 9.5V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></SvgIcon>;
}

function HomeSupportIcon({ className }: IconProps) {
  return <SvgIcon className={className}><path d="M5 10.5L12 5L19 10.5V18.5H5V10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9.5 18.5V13H14.5V18.5" stroke="currentColor" strokeWidth="1.8" /></SvgIcon>;
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

const KanyadaanServiceCard = memo(function KanyadaanServiceCard({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: KanyadaanService;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="group relative flex h-full flex-col rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]"
      style={{ transitionDelay: `${index * 55}ms` }}
    >
      {service.tag ? (
        <span className="absolute right-5 top-5 rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--campaign-accent)]">
          {service.tag}
        </span>
      ) : null}

      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)] transition-all duration-300 group-hover:bg-[var(--campaign-accent)] group-hover:text-white">
        {service.icon}
      </div>

      <h3 className={`mt-4 pr-24 ${SEVA_CARD_TITLE_CLASS}`}>{service.title}</h3>
      <p className={`mt-3 flex-1 ${SEVA_BODY_TEXT_CLASS}`}>{service.description}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={ROUTES.donate}
          className="inline-flex items-center rounded-xl bg-[var(--campaign-accent)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
        >
          Donate Now
        </Link>
        <Link
          to={ROUTES.involved.sponsor}
          className="inline-flex items-center rounded-xl bg-[var(--campaign-deep)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--campaign-deep-hover)]"
        >
          Sponsor
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center rounded-xl px-1 py-2 text-sm font-bold text-[var(--campaign-accent)] transition-colors hover:text-white"
        >
          Learn More
        </button>
      </div>

      <div className={`grid transition-all duration-300 ${isOpen ? "mt-5 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className={`rounded-[20px] border border-white/10 bg-[var(--campaign-deep)] px-4 py-4 ${SEVA_BODY_TEXT_CLASS}`}>
            {service.details}
          </div>
        </div>
      </div>
    </article>
  );
});

export const KanyadaanServicesSection = memo(function KanyadaanServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <RevealSection className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className={SEVA_SECTION_LABEL_CLASS}>Kanyadaan Services</p>
            <h2 className={SEVA_SECTION_HEADING_CLASS}>Dignified support for daughters and families</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <KanyadaanServiceCard
                key={service.title}
                service={service}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
              />
            ))}
          </div>
      </div>
    </RevealSection>
  );
});
