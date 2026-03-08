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
}

export const InfoCardGrid = memo(function InfoCardGrid({
  title,
  items,
  columnsClass = "grid grid-cols-1 md:grid-cols-3 gap-4",
}: InfoCardGridProps) {
  return (
    <div>
      {title ? <h2 className="text-2xl md:text-4xl font-black text-[#123753] text-center mb-5">{title}</h2> : null}
      <div className={columnsClass}>
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0da] text-[#a85b10]">
              <i className={item.iconClass ?? "fas fa-hands-helping"} />
            </div>
            <h3 className="text-xl font-black text-[#123753]">{item.title}</h3>
            <p className="text-sm text-[#4f6272] mt-2">{item.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
});
