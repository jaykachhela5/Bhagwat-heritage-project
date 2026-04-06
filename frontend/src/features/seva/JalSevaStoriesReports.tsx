import { memo, useEffect, useState } from "react";
import type { TestimonialStory } from "./jalSevaContent";

function HeartIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 5 16.36 5 10.8C5 8.149 7.149 6 9.8 6C11.07 6 12.289 6.504 13.2 7.402C14.111 6.504 15.33 6 16.6 6C19.251 6 21.4 8.149 21.4 10.8C21.4 16.36 14.4 21 14.4 21H12Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

interface JalSevaStoriesReportsProps {
  ctaLines: string[];
  mode: "ann" | "jal";
  sectionTitle: string;
  stories: TestimonialStory[];
}


export const JalSevaStoriesReports = memo(function JalSevaStoriesReports({
  ctaLines,
  mode,
  sectionTitle,
  stories,
}: JalSevaStoriesReportsProps) {
  const [activeStory, setActiveStory] = useState(0);
  const isAnn = mode === "ann";

  useEffect(() => {
    if (stories.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % stories.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [stories]);

  if (stories.length === 0) {
    return null;
  }

  return (
    <>
      <section className={`mx-auto mt-8 max-w-[1180px] rounded-[30px] px-6 py-10 md:px-8 md:py-8 ${isAnn ? "border border-white/10 bg-[#0d6179] shadow-[0_16px_34px_rgba(0,0,0,0.22)]" : "border border-[#dceaf1] bg-[linear-gradient(180deg,#fafdff_0%,#eef8fd_100%)] shadow-[0_18px_40px_rgba(15,103,140,0.08)]"}`}>
        <div className="text-center">
          <p className={`text-[24px] font-semibold uppercase tracking-[0.18em] ${isAnn ? "text-[#ef9a1e]" : "text-[#1b799d]"}`}>Testimonials & Stories</p>
          <h2 className={`mt-2 text-[14px] font-black md:text-[20px] ${isAnn ? "text-white" : "text-[#0f678c]"}`}>{sectionTitle}</h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className={`rounded-[24px] p-6 ${isAnn ? "border border-white/10 bg-[#0c5871] shadow-sm" : "border border-[#d9e8ef] bg-white shadow-[0_18px_36px_rgba(15,103,140,0.08)]"}`}>
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isAnn ? "bg-[#ef9a1e]/15 text-[#ef9a1e]" : "bg-[#eef9ff] text-[#0f678c]"}`}>
              <HeartIcon className="h-8 w-8" />
            </div>
            <p className={`mt-5 text-base font-semibold leading-7 md:text-lg ${isAnn ? "text-[#dce7ec]" : "text-[#586670]"}`}>
              {stories[activeStory].quote}
            </p>
            <div className="mt-6">
              {stories[activeStory].name ? (
                <p className={`text-2xl font-black ${isAnn ? "text-white" : "text-[#0f678c]"}`}>
                  {stories[activeStory].name}
                </p>
              ) : null}
              <p className={`mt-2 text-base font-semibold uppercase tracking-[0.18em] md:text-lg ${isAnn ? "text-[#ef9a1e]" : "text-[#1b799d]"}`}>
                {stories[activeStory].role}
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              {stories.map((story, index) => (
                <button
                  key={`${story.role}-${index}`}
                  type="button"
                  onClick={() => setActiveStory(index)}
                  className={`h-2.5 rounded-full transition ${activeStory === index ? (isAnn ? "w-10 bg-[#ef9a1e]" : "w-10 bg-[#0f678c]") : (isAnn ? "w-2.5 bg-white/20" : "w-2.5 bg-[#bfd8e2]")}`}
                  aria-label={`Show story ${index + 1}`}
                />
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            {stories.map((story, index) => (
              <article
                key={`${story.role}-${index}`}
                className={`rounded-[24px] border p-5 transition ${activeStory === index ? (isAnn ? "border-[#ef9a1e] bg-[#0d6179] shadow-[0_14px_30px_rgba(0,0,0,0.22)]" : "border-[#d9e8ef] bg-[#f7fcff] shadow-[0_14px_30px_rgba(15,103,140,0.10)]") : (isAnn ? "border border-white/10 bg-[#0c5871]" : "border-[#d9e8ef] bg-white")}`}
              >
                <p className={`text-base font-semibold leading-7 md:text-lg ${isAnn ? "text-[#dce7ec]" : "text-[#5c6870]"}`}>
                  {story.quote}
                </p>
                {story.name ? (
                  <p className={`mt-4 text-2xl font-black ${isAnn ? "text-white" : "text-[#0f678c]"}`}>{story.name}</p>
                ) : null}
                <p className={`mt-2 text-base font-semibold uppercase tracking-[0.16em] md:text-lg ${isAnn ? "text-[#ef9a1e]" : "text-[#1b799d]"}`}>
                  {story.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`mx-auto mt-8 max-w-[1180px] px-6 py-10 text-white md:px-10 md:py-14 ${isAnn ? "rounded-[30px] border border-white/10 bg-[#0d6179] shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:px-8 md:py-8" : "rounded-[32px] bg-[linear-gradient(135deg,#0f678c_0%,#14445c_45%,#9b4f07_100%)] shadow-[0_24px_48px_rgba(15,103,140,0.20)]"}`}>
        <div className="grid gap-6 md:grid-cols-3">
          {ctaLines.map((line, index) => (
            <article key={line} className={`p-5 ${isAnn ? "rounded-[24px] border border-white/10 bg-[#0c5871]" : "rounded-[26px] border border-white/14 bg-white/8 backdrop-blur-sm"}`}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd37a]">Final CTA {index + 1}</p>
              <p className="mt-3 text-2xl font-black leading-10">{line}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
});
