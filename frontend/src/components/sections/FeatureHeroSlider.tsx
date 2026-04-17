import { memo, useEffect, useState } from "react";

export interface FeatureHeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface FeatureHeroSliderProps {
  slides: FeatureHeroSlide[];
  className?: string;
  variant?: "default" | "gauseva";
}

export const FeatureHeroSlider = memo(function FeatureHeroSlider({ slides, className = "", variant = "default" }: FeatureHeroSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const rootClass =
    variant === "gauseva"
      ? `relative h-[260px] md:h-[430px] rounded-[34px] overflow-hidden border border-white/10 bg-[var(--campaign-bg)] shadow-[0_20px_44px_rgba(0,0,0,0.22)] ${className}`
      : `relative h-[260px] md:h-[430px] rounded-[28px] overflow-hidden border border-[#dbe7f4] shadow-[0_14px_35px_rgba(13,59,102,0.22)] ${className}`;

  const contentClass =
    variant === "gauseva" ? "px-5 pb-7 md:px-10 md:pb-10 text-white max-w-3xl" : "px-5 pb-7 md:px-10 md:pb-10 text-white max-w-3xl";

  const titleClass = variant === "gauseva" ? "text-3xl md:text-6xl font-black leading-tight" : "text-3xl md:text-6xl font-black leading-tight";

  const subtitleClass = variant === "gauseva" ? "mt-2 text-[15px] md:text-lg text-[var(--campaign-accent)] font-medium" : "mt-2 md:text-lg text-white/95";

  return (
    <div className={rootClass}>
      {slides.map((slide, index) => (
        <img
          key={`${slide.image}-${index}`}
          src={slide.image}
          alt={slide.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 flex items-end justify-center text-center">
        <div className={contentClass}>
          <h1 className={titleClass}>{slides[activeSlide].title}</h1>
          <p className={subtitleClass}>{slides[activeSlide].subtitle}</p>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${activeSlide === idx ? "w-6 bg-white" : "w-2.5 bg-white/50"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});
