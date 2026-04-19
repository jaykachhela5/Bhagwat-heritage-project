import { memo } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";

const quickLinks = [
  { label: "About", to: ROUTES.about.index },
  { label: "Events", to: ROUTES.eventsKatha.index },
  { label: "Gallery", to: ROUTES.media.photos },
  { label: "Contact", to: ROUTES.contact },
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1AtpQtn1SL/",
    accent: "bg-[#2d5fbd]",
    short: "f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bhagwat.heritage",
    accent: "bg-[#c83f86]",
    short: "ig",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@bhagwatheritage",
    accent: "bg-[#e63636]",
    short: "yt",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918668897445",
    accent: "bg-[#25a95a]",
    short: "wa",
  },
] as const;

export const Footer = memo(function Footer() {
  return (
    <footer className="footer relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,216,122,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(85,176,255,0.16),transparent_24%)]"
      />

      <div className="relative">
        <div className="rounded-[28px] border border-white/12 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold">Trust Overview</h3>
              <p className="mt-4 max-w-[320px] text-base leading-7 text-white/86">
                Bhagwat Heritage is dedicated to spiritual upliftment, temple culture, compassionate seva, and preserving sacred traditions for future generations.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">Faith</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">Culture</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">Seva</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Contact Info</h3>
              <div className="mt-4 space-y-3 text-base leading-7 text-white/90">
                <p>Swaminarayan Temple Kasturaba Road,</p>
                <p>ChandraPur, Maharastra, India</p>
                <a href="mailto:info@bhagwatheritage.org" className="block transition-colors hover:text-[#ffd67f]">
                  info@bhagwatheritage.org
                </a>
                <a href="tel:+910000000000" className="block transition-colors hover:text-[#ffd67f]">
                  +91 xxxxxxxxxx
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Quick Links</h3>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {quickLinks.map((item) => (
                  <Link key={item.label} to={item.to} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold">
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/14"
                  >
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${item.accent}`}>
                      {item.short}
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Temple Timing</h3>
              <div className="mt-4 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-white/60">Darshan Hours</p>
                <p className="mt-4 text-base font-medium text-white/92">Morning: 09:00 AM - 12:00 PM</p>
                <p className="mt-2 text-base font-medium text-white/92">Evening: 04:00 PM - 09:00 PM</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.media.photos}
                  className="btn inline-flex min-w-[120px] items-center justify-center text-sm font-semibold"
                >
                  Gallery
                </Link>
                <a
                  href={EXTERNAL_RAZORPAY_DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex min-w-[120px] items-center justify-center text-sm font-semibold"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>

          <div className="divider mt-8 flex flex-col gap-3 pt-5 text-sm text-white/72 md:flex-row md:items-center md:justify-between">
            <p>Bhagwat Heritage Service Foundation Trust</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/14"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});
