import { memo } from "react";
import { Card } from "../ui/Card";

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
      : "";

  const titleClass =
    variant === "gauseva"
      ? "text-[24px] font-semibold uppercase tracking-[0.18em] text-[var(--campaign-accent)] mb-4"
      : "text-2xl md:text-3xl font-black tracking-tight text-tealDeep mb-4";

  const detailsClass =
    variant === "gauseva"
      ? "rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-4"
      : "rounded-xl border border-borderCard bg-bgSoft p-4";

  const questionClass = variant === "gauseva" ? "cursor-pointer font-semibold text-white" : "cursor-pointer font-semibold text-tealDeep";
  const answerClass = variant === "gauseva" ? "mt-2 text-sm leading-6 text-[var(--campaign-text)]" : "mt-2 text-sm leading-relaxed text-brownSoft";

  const content = (
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

  return variant === "gauseva" ? content : <Card className="rounded-3xl md:p-8">{content}</Card>;
});

