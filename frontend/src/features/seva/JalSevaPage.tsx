import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { JalSevaDonationHub } from "./JalSevaDonationHub";
import {
  JAL_FAQS,
  JAL_FLOW_STEPS,
  JAL_HIGHLIGHTS,
  JAL_REACH_AREAS,
  JAL_SEVA_CATALOG,
  JAL_SEVA_PROGRAMS,
  type ProgramCardContent,
  type SevaCatalogItem,
  type SevaFaqItem,
  type SevaHighlight,
  type SevaReachItem,
  type SevaVisualKey,
} from "./jalSevaContent";

function WaterIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C12 3 6 10.019 6 14C6 17.314 8.686 20 12 20C15.314 20 18 17.314 18 14C18 10.019 12 3 12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 14.5C9 12.843 10.343 11.5 12 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 5 16.36 5 10.8C5 8.149 7.149 6 9.8 6C11.07 6 12.289 6.504 13.2 7.402C14.111 6.504 15.33 6 16.6 6C19.251 6 21.4 8.149 21.4 10.8C21.4 16.36 14.4 21 14.4 21H12Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L19 6V11.6C19 15.915 16.086 19.787 12 21C7.914 19.787 5 15.915 5 11.6V6L12 3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.4 12.3L11.1 14L14.8 10.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CommunityIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 11C9.657 11 11 9.657 11 8C11 6.343 9.657 5 8 5C6.343 5 5 6.343 5 8C5 9.657 6.343 11 8 11Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 10.5C17.881 10.5 19 9.381 19 8C19 6.619 17.881 5.5 16.5 5.5C15.119 5.5 14 6.619 14 8C14 9.381 15.119 10.5 16.5 10.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.8 18.5C4.513 15.872 6.663 14 9.2 14H10.8C13.337 14 15.487 15.872 16.2 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.6 14.3C16.542 14.491 18.123 15.984 18.4 17.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13 3L6 13H11L10 21L18 10.5H13.2L13 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SevaIcon({
  icon,
  className = "h-7 w-7",
}: {
  icon: SevaVisualKey;
  className?: string;
}) {
  if (icon === "water") {
    return <WaterIcon className={className} />;
  }

  if (icon === "shield") {
    return <ShieldIcon className={className} />;
  }

  if (icon === "community") {
    return <CommunityIcon className={className} />;
  }

  if (icon === "spark") {
    return <SparkIcon className={className} />;
  }

  return <HeartIcon className={className} />;
}

function toneClasses(icon: SevaVisualKey) {
  switch (icon) {
    case "water":
      return "bg-[#eef9ff] text-[#0f678c]";
    case "shield":
      return "bg-[#eef5ff] text-[#4865b5]";
    case "community":
      return "bg-[#fff4ec] text-[#b7642b]";
    case "spark":
      return "bg-[#fff3d9] text-[#cf7a07]";
    default:
      return "bg-[#fff2eb] text-[#c56033]";
  }
}

const JAL_SECTION_SHELL =
  "mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-[#dceaf1] bg-[linear-gradient(180deg,#fafdff_0%,#eef8fd_100%)] px-6 py-10 shadow-[0_18px_40px_rgba(15,103,140,0.08)] md:px-8 md:py-8";

const JAL_SECTION_LABEL = "text-[24px] font-semibold uppercase tracking-[0.18em] text-[#1b799d]";
const JAL_SECTION_HEADING = "mt-2 text-[14px] font-black text-[#0f678c] md:text-[20px]";
const JAL_SECTION_BODY = "mx-auto mt-4 max-w-3xl text-base leading-7 text-[#58707c] md:text-lg";

function ProgramCard({
  onDonate,
  program,
}: {
  onDonate: () => void;
  program: ProgramCardContent;
}) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-[#d9e8ef] bg-white p-5 shadow-[0_14px_30px_rgba(15,103,140,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,103,140,0.12)]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef9ff] text-[#0f678c]">
        <WaterIcon />
      </div>
      <h4 className="mt-4 text-2xl font-black leading-tight text-[#0f678c]">{program.title}</h4>
      <p className="mt-3 flex-1 text-base leading-7 text-[#5b6774] md:text-lg">{program.description}</p>
      <div className="mt-4 rounded-2xl border border-[#dfeef4] bg-[#f7fcff] px-4 py-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[#1b799d]">Cost</p>
        <p className="mt-1 text-2xl font-black text-[#0f678c]">{program.cost}</p>
      </div>
      {program.impact ? (
        <div className="mt-4 rounded-2xl border border-[#dfeef4] bg-[linear-gradient(135deg,#eef9ff_0%,#ffffff_100%)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[#1b799d]">Impact</p>
          <p className="mt-1 text-base font-semibold leading-7 text-[#4f6670] md:text-lg">{program.impact}</p>
        </div>
      ) : null}
      <button type="button" onClick={onDonate} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#0f678c] px-5 py-3 text-base font-bold text-white transition-all duration-300 group-hover:shadow-[0_16px_32px_rgba(15,103,140,0.26)] md:text-lg">
        Donate Now
      </button>
    </article>
  );
}

function HighlightCard({ item }: { item: SevaHighlight }) {
  return (
    <article className="rounded-[24px] border border-[#dcebf1] bg-white p-5 shadow-[0_14px_30px_rgba(15,103,140,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,103,140,0.12)]">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
        <SevaIcon icon={item.icon} />
      </div>
      <p className="mt-4 text-[24px] font-black uppercase tracking-wide text-[#1b799d]">{item.badge}</p>
      <h3 className="mt-1 text-[14px] font-black leading-tight text-[#0f678c] md:text-[20px]">{item.title}</h3>
      <p className="mt-1 text-base leading-7 text-[#5e6b76] md:text-lg">{item.description}</p>
    </article>
  );
}

function CatalogCard({ item }: { item: SevaCatalogItem }) {
  return (
    <article className="rounded-[24px] border border-[#dceaf0] bg-white p-5 shadow-[0_12px_28px_rgba(15,103,140,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,103,140,0.12)]">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
        <SevaIcon icon={item.icon} className="h-6 w-6" />
      </div>
      <h4 className="mt-4 text-2xl font-black leading-tight text-[#0f678c]">{item.title}</h4>
      <p className="mt-3 text-base leading-7 text-[#5d6872] md:text-lg">{item.description}</p>
      <div className="mt-4 rounded-2xl border border-[#dfeef4] bg-[linear-gradient(135deg,#eef9ff_0%,#ffffff_100%)] px-4 py-3">
        <p className="text-xs uppercase tracking-[0.18em] text-[#1b799d]">Support Focus</p>
        <p className="mt-1 text-base font-semibold text-[#4f6670] md:text-lg">{item.supportLine}</p>
      </div>
    </article>
  );
}

function ReachCard({ item }: { item: SevaReachItem }) {
  return (
    <article className="rounded-[24px] border border-[#dce9ef] bg-white p-5 shadow-[0_14px_30px_rgba(15,103,140,0.08)]">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
        <SevaIcon icon={item.icon} />
      </div>
      <p className="mt-4 text-base font-semibold uppercase tracking-[0.18em] text-[#1b799d] md:text-lg">{item.focus}</p>
      <h3 className="mt-3 text-2xl font-black text-[#0f678c]">{item.title}</h3>
      <p className="mt-3 text-base leading-7 text-[#556772] md:text-lg">{item.description}</p>
    </article>
  );
}

function FaqCard({
  isOpen,
  item,
  onToggle,
}: {
  isOpen: boolean;
  item: SevaFaqItem;
  onToggle: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#dce9ef] bg-white shadow-[0_12px_28px_rgba(15,103,140,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-[14px] font-black leading-7 text-[#0f678c] md:text-[20px]">{item.question}</span>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#eef9ff] text-[#1b799d] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-base leading-7 text-[#5d6973] md:text-lg">{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export default memo(function JalSevaPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  usePageMeta(
    "Jal Seva",
    "Support Bhagwat Heritage Service Foundation Trust through Jal Seva, water relief, public water support, volunteering, and sponsorship.",
  );

  return (
    <div className="bg-[radial-gradient(circle_at_top,rgba(185,234,248,0.22),transparent_26%),linear-gradient(180deg,#eef9fd_0%,#d8f1f6_100%)] px-4 pb-24 pt-6 md:px-6 md:pb-28 md:pt-8">
      <style>{`@keyframes sevaFadeInUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <section className="relative isolate mx-auto min-h-[460px] max-w-[1240px] overflow-hidden rounded-[30px] bg-[#072638] shadow-[0_28px_60px_rgba(8,52,73,0.18)] md:min-h-[540px] lg:min-h-[620px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/jal1.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,18,28,0.88)_0%,rgba(7,49,70,0.76)_42%,rgba(5,105,148,0.60)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,207,240,0.20),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(23,146,169,0.20),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-end justify-center px-5 py-8 text-center sm:px-8 md:min-h-[540px] lg:min-h-[620px]">
          <div className="w-full max-w-4xl">
            <h1 className="mt-[10px] text-4xl font-black leading-tight text-white md:text-5xl">Jal Seva</h1>
            <p className="mt-[10px] text-[34px] font-semibold text-gray-200 md:text-[40px]">Har Pyaase Tak Karuna Ka Sandesh</p>
            <div className="mt-[10px] flex flex-col items-center justify-center gap-[10px] sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(ROUTES.donate)}
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-[#ef9a1e] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#de930a]"
              >
                <span>Donate Now</span>
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.involved.index)}
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-white/10 bg-[#0d6179] px-7 py-4 text-base font-bold text-white transition-colors hover:bg-[#18495e]"
              >
                <span>Join Seva</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${JAL_SECTION_SHELL} text-center`}>
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef9ff] text-[#0f678c]">
            <WaterIcon className="h-8 w-8" />
          </div>
          <p className="mt-5 text-[24px] font-semibold uppercase tracking-[0.18em] text-[#1b799d]">Spiritual Foundation</p>
          <h2 className={JAL_SECTION_HEADING}>Why Jal Seva</h2>
          <div className="mt-6 space-y-3 text-base leading-7 text-[#5b6f79] md:text-lg">
            <p>Jal Seva means saving lives with immediate compassion.</p>
            <p>Safe drinking water brings comfort, dignity, and hope to people in moments of real need.</p>
            <p>Water offered with humility becomes both humanitarian support and spiritual service.</p>
          </div>
          <div className="mt-8 rounded-[24px] border border-[#d8ebf2] bg-white px-6 py-6 shadow-[0_12px_26px_rgba(15,103,140,0.08)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#25a9c9_0%,#0f678c_100%)] text-white"><HeartIcon className="h-8 w-8" /></div>
            <p className="mt-4 text-base font-black italic leading-7 text-[#0f678c] md:text-lg">"A single sip of water can bring immediate relief to an exhausted life."</p>
          </div>
        </div>
      </section>

      <section className={JAL_SECTION_SHELL}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>Complete Jal Seva Services</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {JAL_SEVA_CATALOG.map((item) => (
            <CatalogCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className={JAL_SECTION_SHELL}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>How Jal Seva Works</p>
          <h2 className={JAL_SECTION_HEADING}>From water need to relief delivery</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {JAL_FLOW_STEPS.map((step) => (
            <article key={step.step} className="rounded-[24px] border border-[#dce9ef] bg-white p-5 shadow-[0_14px_30px_rgba(15,103,140,0.08)]">
              <div className="inline-flex rounded-full bg-[#eef9ff] px-4 py-2 text-sm font-black tracking-[0.2em] text-[#1b799d]">
                {step.step}
              </div>
              <h3 className="mt-4 text-2xl font-black text-[#0f678c]">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#59656f] md:text-lg">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[30px] bg-[linear-gradient(135deg,#0f678c_0%,#14445c_40%,#1792a9_100%)] px-6 py-7 text-white shadow-[0_24px_48px_rgba(15,103,140,0.18)] md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#d6f3ff]">Emergency & Need Support</p>
              <h3 className="mt-2 text-[14px] font-black md:text-[20px]">Need Jal Seva support at a location?</h3>
              <p className="mt-4 text-base leading-7 text-white/88 md:text-lg">Use the contact page for water-related need reporting, or visit Get Involved to begin Jal Seva in your city.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(ROUTES.contact)}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 font-black text-[#0f678c] transition hover:-translate-y-0.5"
              >
                Contact the Trust
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.involved.index)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16"
              >
                Start Jal Seva
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={JAL_SECTION_SHELL} style={{ animation: "sevaFadeInUp 0.85s ease-out both" }}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>Jal Seva Highlights</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {JAL_HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className={JAL_SECTION_SHELL}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>Jal Seva Programs</p>
          <h2 className={JAL_SECTION_HEADING}>Ways to sponsor water support</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {JAL_SEVA_PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} onDonate={() => navigate(ROUTES.donate)} />
          ))}
        </div>
      </section>

      <section className={JAL_SECTION_SHELL}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>Where Jal Seva Reaches</p>
          <h2 className={JAL_SECTION_HEADING}>Communities and spaces served by water support</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {JAL_REACH_AREAS.map((item) => (
            <ReachCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <JalSevaDonationHub mode="jal" />

      <section className={JAL_SECTION_SHELL}>
        <div className="text-center">
          <p className={JAL_SECTION_LABEL}>Jal Seva FAQ</p>
          <h2 className={JAL_SECTION_HEADING}>Common questions about water seva</h2>
        </div>

        <div className="mt-8 grid gap-4">
          {JAL_FAQS.map((item, index) => (
            <FaqCard
              key={item.question}
              item={item}
              isOpen={openFaqIndex === index}
              onToggle={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </section>
    </div>
  );
});
