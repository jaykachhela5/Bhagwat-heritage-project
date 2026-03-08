import { memo } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

export const FAQSection = memo(function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <div className="rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-black text-[#123753] mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="rounded-xl border border-[#e4edf7] bg-[#fbfdff] p-4">
            <summary className="cursor-pointer font-semibold text-[#1b4d75]">{item.q}</summary>
            <p className="mt-2 text-sm text-[#4f6272]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
});
