import { memo } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  singleLine?: boolean;
  boxed?: boolean;
  heightClass?: string;
}

export const HeroSection = memo(function HeroSection({
  title,
  subtitle,
  backgroundImage,
  children,
  singleLine = false,
  boxed = false,
  heightClass,
}: HeroSectionProps) {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url('${backgroundImage}')` }
    : { background: "linear-gradient(135deg, #0d3b66 0%, #1a5276 50%, #0f6c8d 100%)" };

  const heroContent = (
    <>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`relative z-10 text-center text-white px-4 mx-auto py-16 ${
          singleLine ? "max-w-[95vw]" : "max-w-3xl"
        }`}
      >
        <h1
          className={`font-bold mb-4 leading-tight ${
            singleLine ? "whitespace-nowrap text-[clamp(1.1rem,3vw,3rem)]" : "text-4xl md:text-5xl"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-gray-200 mb-8 ${
              singleLine ? "whitespace-nowrap text-[clamp(0.9rem,1.8vw,1.5rem)]" : "text-lg md:text-xl"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </>
  );

  if (boxed) {
    return (
      <section className="px-4 md:px-6 pt-6 md:pt-8">
        <div
          className={`relative w-full max-w-[1240px] mx-auto rounded-2xl overflow-hidden bg-cover bg-center ${
            heightClass ?? "h-[360px] md:h-[520px]"
          }`}
          style={bgStyle}
        >
          {heroContent}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex items-center justify-center bg-cover bg-center ${heightClass ?? "min-h-[400px]"}`}
      style={bgStyle}
    >
      {heroContent}
    </section>
  );
});
