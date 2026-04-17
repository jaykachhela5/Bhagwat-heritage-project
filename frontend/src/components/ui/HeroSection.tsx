import { memo, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

export interface HeroSlide {
  id: number | string;
  image: string;
  title?: string;
  subtitle?: string;
  link: string;
  ariaLabel?: string;
}

interface HeroSectionProps {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  backgroundImage?: string;
  children?: ReactNode;
  singleLine?: boolean;
  boxed?: boolean;
  heightClass?: string;
  backgroundPositionClass?: string;
  overlayClass?: string;
  slides?: HeroSlide[];
  autoplayDelayMs?: number;
}

export const HeroSection = memo(function HeroSection({
  eyebrow,
  eyebrowClassName,
  title,
  subtitle,
  subtitleClassName,
  contentClassName,
  backgroundImage,
  children,
  singleLine = false,
  boxed = false,
  heightClass,
  backgroundPositionClass = "bg-center",
  overlayClass = "bg-black/50",
  slides,
  autoplayDelayMs = 5500,
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasSlides = Boolean(slides && slides.length > 0);
  const safeSlides = useMemo(() => slides ?? [], [slides]);
  const currentHeightClass = heightClass ?? (boxed ? "h-[360px] md:h-[520px]" : "min-h-[420px] md:min-h-[520px]");

  useEffect(() => {
    if (!hasSlides || safeSlides.length <= 1 || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % safeSlides.length);
    }, autoplayDelayMs);

    return () => window.clearInterval(timer);
  }, [autoplayDelayMs, hasSlides, isPaused, safeSlides.length]);

  useEffect(() => {
    if (!hasSlides) {
      return;
    }

    setActiveSlide((prev) => (prev >= safeSlides.length ? 0 : prev));
  }, [hasSlides, safeSlides.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + safeSlides.length) % safeSlides.length);
  };

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % safeSlides.length);
  };

  const staticBgStyle = backgroundImage
    ? { backgroundImage: `url('${backgroundImage}')` }
    : { background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--campaign-bg) 50%, var(--color-footer-mid) 100%)" };

  const staticHeroContent = (
    <>
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div
        className={`relative z-10 text-center text-white px-4 mx-auto py-16 ${
          singleLine ? "max-w-[95vw]" : "max-w-3xl"
        } ${contentClassName ?? ""}`}
      >
        {eyebrow && (
          <p className={`text-[20px] font-semibold text-gray-200 md:text-[24px] ${eyebrowClassName ?? ""}`}>
            {eyebrow}
          </p>
        )}
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
            } ${subtitleClassName ?? ""}`}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </>
  );

  const sliderContent = hasSlides ? (
    <div
      className="hero-slider absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homepage highlights"
    >
      {safeSlides.map((slide, index) => {
        const isActive = index === activeSlide;

        return (
          <Link
            key={slide.id}
            to={slide.link}
            aria-label={slide.ariaLabel ?? slide.title ?? `Hero slide ${index + 1}`}
            className={`hero-slider__slide ${isActive ? "hero-slider__slide--active" : ""}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
            tabIndex={isActive ? 0 : -1}
          >
            <div className="hero-slider__overlay" />
            <div className="hero-slider__content-wrap">
              <div className={`hero-slider__content ${boxed ? "hero-slider__content--boxed" : ""} ${contentClassName ?? ""}`}>
                {slide.title ? <h1 className="hero-slider__title">{slide.title}</h1> : null}
                {slide.subtitle ? <p className="hero-slider__subtitle">{slide.subtitle}</p> : null}
              </div>
            </div>
          </Link>
        );
      })}

      {safeSlides.length > 1 ? (
        <>
          <button
            type="button"
            className="hero-slider__nav hero-slider__nav--prev"
            onClick={goToPreviousSlide}
            aria-label="Previous hero slide"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="hero-slider__nav hero-slider__nav--next"
            onClick={goToNextSlide}
            aria-label="Next hero slide"
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="hero-slider__pagination" aria-label="Hero slide pagination">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.id}-dot`}
                type="button"
                className={`hero-slider__dot ${index === activeSlide ? "hero-slider__dot--active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  ) : null;

  const rootContent = hasSlides ? sliderContent : staticHeroContent;
  const rootStyle = hasSlides ? undefined : staticBgStyle;

  if (boxed) {
    return (
      <section className="px-4 md:px-6 pt-6 md:pt-8">
        <div
          className={`relative w-full max-w-[1240px] mx-auto ${hasSlides ? "rounded-2xl overflow-hidden" : "rounded-2xl overflow-hidden bg-cover"} ${backgroundPositionClass} ${currentHeightClass}`}
          style={rootStyle}
        >
          {rootContent}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex items-center justify-center ${hasSlides ? "overflow-hidden" : "bg-cover"} ${backgroundPositionClass} ${currentHeightClass}`}
      style={rootStyle}
    >
      {rootContent}
    </section>
  );
});
