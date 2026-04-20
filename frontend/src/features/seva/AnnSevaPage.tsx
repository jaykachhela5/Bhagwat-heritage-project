import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";
import { JalSevaDonationHub } from "./JalSevaDonationHub";
import {
  ANNADAAN_PROGRAMS,
  ANN_FAQS,
  ANN_FLOW_STEPS,
  ANN_HIGHLIGHTS,
  ANN_REACH_AREAS,
  ANN_SEVA_CATALOG,
  type ProgramCardContent,
  type SevaCatalogItem,
  type SevaFaqItem,
  type SevaHighlight,
  type SevaReachItem,
  type SevaVisualKey,
} from "./jalSevaContent";

function MealIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 13C4 9.686 6.686 7 10 7H14C17.314 7 20 9.686 20 13V14.5C20 16.433 18.433 18 16.5 18H7.5C5.567 18 4 16.433 4 14.5V13Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7C8 5.343 9.343 4 11 4H13C14.657 4 16 5.343 16 7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 18H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
  if (icon === "meal") {
    return <MealIcon className={className} />;
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
    case "meal":
      return "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]";
    case "shield":
      return "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]";
    case "community":
      return "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]";
    case "spark":
      return "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]";
    default:
      return "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]";
  }
}

function ProgramCard({
  onDonate,
  program,
}: {
  onDonate: () => void;
  program: ProgramCardContent;
}) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]">
        <MealIcon />
      </div>
      <h4 className="mt-4 text-2xl font-black leading-tight text-white">{program.title}</h4>
      <p className="mt-3 flex-1 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{program.description}</p>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--campaign-bg)] px-4 py-3">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--campaign-accent)]">Cost</p>
        <p className="mt-1 text-lg font-black text-[var(--campaign-accent)]">{program.cost}</p>
      </div>
      {program.impact ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--campaign-bg)] px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--campaign-accent)]">Impact</p>
          <p className="mt-1 text-base font-semibold leading-7 text-[var(--campaign-text)]">{program.impact}</p>
        </div>
      ) : null}
      <button type="button" onClick={onDonate} className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--campaign-accent)] px-5 py-3 font-bold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]">
        Donate Now
      </button>
    </article>
  );
}

function HighlightCard({ item }: { item: SevaHighlight }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
      <div className="flex items-start justify-between gap-4">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
          <SevaIcon icon={item.icon} />
        </div>
        <span className="rounded-full bg-[var(--campaign-accent)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--campaign-accent)]">
          {item.badge}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
      <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.description}</p>
    </article>
  );
}

function CatalogCard({ item }: { item: SevaCatalogItem }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.26)]">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
        <SevaIcon icon={item.icon} className="h-6 w-6" />
      </div>
      <h4 className="mt-4 text-2xl font-black leading-tight text-white">{item.title}</h4>
      <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.description}</p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-[var(--campaign-bg)] px-4 py-3">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Support Focus</p>
        <p className="mt-1 text-base font-semibold text-[var(--campaign-text)]">{item.supportLine}</p>
      </div>
    </article>
  );
}

function ReachCard({ item }: { item: SevaReachItem }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses(item.icon)}`}>
        <SevaIcon icon={item.icon} />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--campaign-accent)]">{item.focus}</p>
      <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
      <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.description}</p>
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
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-[14px] font-black leading-7 text-white md:text-[20px]">{item.question}</span>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export default memo(function AnnSevaPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  usePageMeta(
    "Ann Seva",
    "Support Ann Seva through meal distribution, sponsorship, volunteering, and food relief support.",
  );

  return (
    <div className="bg-[var(--campaign-deep)] pb-24 md:pb-28">
      <style>{`@keyframes sevaFadeInUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <section className="mt-[10px] pb-8">
        <div
          className="relative h-[360px] w-full overflow-hidden bg-cover bg-center md:h-[520px]"
          style={{ backgroundImage: "url('/images/annseva.png')" }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex h-full flex-col justify-end px-4 py-16 text-center md:px-8 [&>h1]:mb-[10px] [&>p]:mb-[10px]">
            <h1 className="mb-4 text-4xl font-bold leading-tight !text-[#F9F2A9] md:text-5xl">Ann Seva</h1>
            <p className="mb-8 whitespace-nowrap text-[18px] font-semibold !text-[#F9F2A9] sm:text-[24px] md:text-[34px]">
              Ek Thali Bhojan, Ek Jeevan Ka Sahara
            </p>
            <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.donate)}
                  className="inline-flex min-w-[190px] items-center justify-center rounded-lg bg-[#f3a11f] px-7 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(243,161,31,0.28)] transition-colors hover:bg-[#ffaf31]"
                >
                  <span>Donate Now</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.involved.index)}
                  className="inline-flex min-w-[190px] items-center justify-center rounded-lg bg-[#0f7994] px-7 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(15,121,148,0.28)] transition-colors hover:bg-[#1492b1]"
                >
                  <span>Join Seva</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 text-center shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]">
            <MealIcon className="h-8 w-8" />
          </div>
          <p className="mt-5 text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Spiritual Foundation</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Why Ann Seva</h2>
          <div className="mt-6 space-y-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">
            <p>Offering food is regarded as one of the highest forms of giving in Indian spiritual tradition.</p>
            <p>A respectfully served meal can restore both physical strength and emotional hope.</p>
            <p>Food support is not only charity. It is compassionate protection of dignity and life.</p>
          </div>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] px-6 py-6 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]"><HeartIcon className="h-8 w-8" /></div>
            <p className="mt-4 text-base font-black italic leading-7 text-white md:text-lg">"When a meal is served with dignity, it nourishes not only the body but also the heart."</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8" style={{ animation: "sevaFadeInUp 0.85s ease-out both" }}>
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Ann Seva Highlights</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Dedicated food support for nourishment, dignity, and care</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ANN_HIGHLIGHTS.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Ann Seva Programs</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Ways to sponsor meal support</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ANNADAAN_PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} onDonate={() => navigate(ROUTES.donate)} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Complete Ann Seva Services</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ANN_SEVA_CATALOG.map((item) => (
            <CatalogCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">How Ann Seva Works</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">From food need to dignified meal delivery</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ANN_FLOW_STEPS.map((step) => (
            <article key={step.step} className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
              <div className="inline-flex rounded-full bg-[var(--campaign-accent)]/15 px-4 py-2 text-sm font-black tracking-[0.2em] text-[var(--campaign-accent)]">
                {step.step}
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[var(--campaign-text)] md:text-lg">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Where Ann Seva Reaches</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Communities and lives nourished through meal support</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ANN_REACH_AREAS.map((item) => (
            <ReachCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <JalSevaDonationHub mode="ann" />

      <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] px-6 py-10 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8">
        <div className="text-center">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">Ann Seva FAQ</p>
          <h2 className="mt-2 text-[14px] font-black text-white md:text-[20px]">Common questions about food support</h2>
        </div>

        <div className="mt-8 grid gap-4">
          {ANN_FAQS.map((item, index) => (
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
