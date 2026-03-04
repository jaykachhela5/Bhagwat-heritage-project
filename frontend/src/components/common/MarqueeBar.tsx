import { memo } from "react";

export const MarqueeBar = memo(function MarqueeBar() {
  return (
    <div className="bg-gradient-to-r from-[#0f6c8d] via-[#1fa3b8] to-[#f4a825] text-white py-2 overflow-hidden">
      <div className="marquee-wrapper">
        <p className="animate-marquee whitespace-nowrap font-bold text-sm tracking-wide inline-block">
          🌼 BHAGWAT HERITAGE SERVICE FOUNDATION TRUST 🌼 &nbsp;|&nbsp; 📧
          info@bhagwatheritage.org &nbsp;|&nbsp; 📞 +91 9876543210 &nbsp;|&nbsp; 🙏 Preserving
          Faith • Culture • Humanity 🙏 &nbsp;&nbsp;&nbsp;&nbsp; 🌼 BHAGWAT HERITAGE SERVICE
          FOUNDATION TRUST 🌼 &nbsp;|&nbsp; 📧 info@bhagwatheritage.org &nbsp;|&nbsp; 📞 +91
          9876543210 &nbsp;|&nbsp; 🙏 Preserving Faith • Culture • Humanity 🙏
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
