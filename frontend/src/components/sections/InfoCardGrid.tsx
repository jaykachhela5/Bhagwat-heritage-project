import { memo } from "react";

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
      : "text-2xl md:text-4xl font-black text-[#0c5b7d] text-center mb-5";

  const articleClass =
    variant === "gauseva"
      ? "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
      : "rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition";

  const iconClass =
    variant === "gauseva"
      ? "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]"
      : "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0da] text-[#a85b10]";

  const headingClass =
    variant === "gauseva" ? "text-[14px] font-black text-white md:text-[20px]" : "text-xl font-black text-[#0c5b7d]";

  const descClass = variant === "gauseva" ? "text-sm leading-6 text-[var(--campaign-text)] mt-2" : "text-sm text-[#4f6272] mt-2";

  return (
    <div>
      {title ? <h2 className={titleClass}>{title}</h2> : null}
      <div className={columnsClass}>
        {items.map((item) => (
          <article key={item.title} className={articleClass}>
            <div className={iconClass}>
              <i className={item.iconClass ?? "fas fa-hands-helping"} />
            </div>
            <h3 className={headingClass}>{item.title}</h3>
            <p className={descClass}>{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
});

