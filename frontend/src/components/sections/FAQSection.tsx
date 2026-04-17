import { memo } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
  variant?: "default" | "gauseva";
}

export const FAQSection = memo(function FAQSection({ title, items, variant = "default" }: FAQSectionProps) {
  const rootClass =
    variant === "gauseva"
      ? "rounded-3xl border border-white/10 bg-[var(--campaign-bg)] p-6 md:p-8 shadow-[0_16px_35px_rgba(0,0,0,0.18)]"
      : "rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-sm";

  const titleClass =
    variant === "gauseva"
      ? "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] mb-4"
      : "text-2xl md:text-3xl font-black text-[#0c5b7d] mb-4";

  const detailsClass =
    variant === "gauseva"
      ? "rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-4"
      : "rounded-xl border border-[#e2edf1] bg-[#fbfdff] p-4";

  const questionClass = variant === "gauseva" ? "cursor-pointer font-semibold text-white" : "cursor-pointer font-semibold text-[#1b4d75]";
  const answerClass = variant === "gauseva" ? "mt-2 text-sm leading-6 text-[var(--campaign-text)]" : "mt-2 text-sm text-[#4f6272]";

  return (
    <div className={rootClass}>
      <h2 className={titleClass}>{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className={detailsClass}>
            <summary className={questionClass}>{item.q}</summary>
            <p className={answerClass}>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
});

