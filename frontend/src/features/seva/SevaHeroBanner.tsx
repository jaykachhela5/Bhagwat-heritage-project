import { memo, type ReactNode } from "react";

interface SevaHeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children?: ReactNode;
}

export const SevaHeroBanner = memo(function SevaHeroBanner({
  title,
  subtitle,
  backgroundImage,
  children,
}: SevaHeroBannerProps) {
  return (
    <section className="mt-[10px] pb-8">
      <div
        className="relative h-[360px] w-full overflow-hidden bg-cover bg-center md:h-[520px]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full flex-col justify-end px-4 py-16 text-center md:px-8 [&>h1]:mb-[10px] [&>p]:mb-[10px]">
          <h1 className="mb-4 text-4xl font-bold leading-tight !text-[#F9F2A9] md:text-5xl">{title}</h1>
          <p className="mb-8 whitespace-nowrap text-[18px] font-semibold !text-[#F9F2A9] sm:text-[24px] md:text-[34px]">
            {subtitle}
          </p>
          {children ? (
            <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-3">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
});
