import { memo } from "react";

export interface StatItem {
  label: string;
  value: string;
}

interface StatStripProps {
  items: StatItem[];
  variant?: "default" | "gauseva";
}

export const StatStrip = memo(function StatStrip({ items, variant = "default" }: StatStripProps) {
  const rootClass =
    variant === "gauseva"
      ? "rounded-3xl border border-white/10 bg-[var(--campaign-bg)] p-5 md:p-7 shadow-[0_14px_30px_rgba(0,0,0,0.18)]"
      : "rounded-3xl border border-[#f1c899] bg-gradient-to-r from-[#fff8ee] via-[#fff5e8] to-[#ffefdc] p-5 md:p-7 shadow-[0_14px_30px_rgba(177,96,23,0.14)]";

  const cardClass =
    variant === "gauseva"
      ? "rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-center"
      : "rounded-xl border border-[#efcfab] bg-white p-4 text-center";

  const valueClass = variant === "gauseva" ? "text-[20px] md:text-[28px] font-black text-white" : "text-xl md:text-2xl font-black text-[#8a3f09]";
  const labelClass = variant === "gauseva" ? "text-xs md:text-sm text-[var(--campaign-text)]" : "text-xs md:text-sm text-[#7a5634]";

  return (
    <div className={rootClass}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <article key={item.label} className={cardClass}>
            <p className={valueClass}>{item.value}</p>
            <p className={labelClass}>{item.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
});
