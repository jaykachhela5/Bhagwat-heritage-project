import { memo } from "react";
import { Card } from "../ui/Card";

export interface SectionCardItem {
  title: string;
  desc: string;
  iconClass?: string;
}

interface InfoCardGridProps {
  title?: string;
  items: SectionCardItem[];
  columnsClass?: string;
  variant?: "default" | "gauseva";
}

export const InfoCardGrid = memo(function InfoCardGrid({
  title,
  items,
  columnsClass = "grid grid-cols-1 md:grid-cols-3 gap-4",
  variant = "default",
}: InfoCardGridProps) {
  const titleClass =
    variant === "gauseva"
      ? "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] text-center mb-5"
      : "text-2xl md:text-4xl font-black tracking-tight text-tealDeep text-center mb-5";

  const iconClass =
    variant === "gauseva"
      ? "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]"
      : "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(39,101,122,0.08)] text-saffron";

  const headingClass =
    variant === "gauseva" ? "text-[14px] font-black text-white md:text-[20px]" : "text-xl font-black tracking-tight text-tealDeep";

  const descClass = variant === "gauseva" ? "text-sm leading-6 text-[var(--campaign-text)] mt-2" : "mt-2 text-sm leading-relaxed text-brownSoft";

  return (
    <div>
      {title ? <h2 className={titleClass}>{title}</h2> : null}
      <div className={columnsClass}>
        {items.map((item) => (
          variant === "gauseva" ? (
            <article
              key={item.title}
              className="rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
            >
              <div className={iconClass}>
                <i className={item.iconClass ?? "fas fa-hands-helping"} />
              </div>
              <h3 className={headingClass}>{item.title}</h3>
              <p className={descClass}>{item.desc}</p>
            </article>
          ) : (
            <Card key={item.title}>
              <div className={iconClass}>
                <i className={item.iconClass ?? "fas fa-hands-helping"} />
              </div>
              <h3 className={headingClass}>{item.title}</h3>
              <p className={descClass}>{item.desc}</p>
            </Card>
          )
        ))}
      </div>
    </div>
  );
});

