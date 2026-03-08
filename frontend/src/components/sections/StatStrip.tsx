import { memo } from "react";

export interface StatItem {
  label: string;
  value: string;
}

interface StatStripProps {
  items: StatItem[];
}

export const StatStrip = memo(function StatStrip({ items }: StatStripProps) {
  return (
    <div className="rounded-3xl border border-[#f1c899] bg-gradient-to-r from-[#fff8ee] via-[#fff5e8] to-[#ffefdc] p-5 md:p-7 shadow-[0_14px_30px_rgba(177,96,23,0.14)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <article key={item.label} className="rounded-xl border border-[#efcfab] bg-white p-4 text-center">
            <p className="text-xl md:text-2xl font-black text-[#8a3f09]">{item.value}</p>
            <p className="text-xs md:text-sm text-[#7a5634]">{item.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
});
