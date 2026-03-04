import { memo } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export const HeroSection = memo(function HeroSection({
  title,
  subtitle,
  backgroundImage,
  children,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[400px] flex items-center justify-center bg-cover bg-center"
      style={
        backgroundImage
          ? { backgroundImage: `url('${backgroundImage}')` }
          : { background: "linear-gradient(135deg, #0d3b66 0%, #1a5276 50%, #0f6c8d 100%)" }
      }
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-gray-200 mb-8">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
});
