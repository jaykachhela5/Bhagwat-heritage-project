import { memo } from "react";
import { useTranslation } from "react-i18next";

export const MarqueeBar = memo(function MarqueeBar() {
  const { t } = useTranslation();
  const message = t("marquee.message");

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#0a5375] via-[#1788ac] to-[#ef9a1e] py-2 text-white">
      <div className="marquee-wrapper">
        <p className="animate-marquee whitespace-nowrap font-bold text-sm tracking-wide inline-block">
          {message} &nbsp;&nbsp;&nbsp;&nbsp; {message}
        </p>
      </div>
      <style>{`
        .marquee-wrapper { overflow: hidden; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
});
