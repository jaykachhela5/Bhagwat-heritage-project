import { memo } from "react";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";

const OFFICIAL_ADDRESS = "Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICIAL_ADDRESS)}`;
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(OFFICIAL_ADDRESS)}&z=16&output=embed`;

const quickLinks = [
  { label: "About", to: ROUTES.about.index },
  { label: "Events", to: ROUTES.eventsKatha.index },
  { label: "Gallery", to: ROUTES.media.photos },
  { label: "Contact", to: ROUTES.contact },
] as const;

const socialLinks = [
  {
    label: "YouTube",
    href: "https://youtube.com/@bhagwatheritage",
    accent: "bg-[#e63636]",
    icon: "youtube",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918668897445",
    accent: "bg-[#25a95a]",
    icon: "whatsapp",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1AtpQtn1SL/",
    accent: "bg-[#2d5fbd]",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bhagwat.heritage",
    accent: "bg-[#c83f86]",
    icon: "instagram",
  },
] as const;

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  switch (icon) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M13.5 21v-7.2h2.4l.36-2.8H13.5V9.2c0-.82.23-1.37 1.4-1.37H16.5V5.32c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 4v2.24H8v2.8h2.3V21h3.2Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current">
          <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="4.25" strokeWidth="1.9" />
          <circle cx="12" cy="12" r="3.55" strokeWidth="1.9" />
          <circle cx="17.4" cy="6.7" r="1.05" className="fill-current stroke-none" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M21.6 8.55a2.95 2.95 0 0 0-2.08-2.08C17.69 6 12 6 12 6s-5.69 0-7.52.47A2.95 2.95 0 0 0 2.4 8.55 30.6 30.6 0 0 0 2 12a30.6 30.6 0 0 0 .4 3.45 2.95 2.95 0 0 0 2.08 2.08C6.31 18 12 18 12 18s5.69 0 7.52-.47a2.95 2.95 0 0 0 2.08-2.08c.27-1.14.4-2.29.4-3.45s-.13-2.31-.4-3.45ZM10 15.2V8.8L15.2 12 10 15.2Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.52 0 .2 5.3.2 11.83c0 2.08.54 4.11 1.56 5.91L0 24l6.45-1.69a11.81 11.81 0 0 0 5.6 1.43h.01c6.54 0 11.86-5.3 11.86-11.83 0-3.16-1.23-6.14-3.4-8.43Zm-8.46 18.2h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.76 9.76 0 0 1-1.51-5.16C2.12 6.43 6.58 2 12.06 2c2.61 0 5.05 1.01 6.9 2.86a9.7 9.7 0 0 1 2.84 6.97c0 5.4-4.47 9.84-9.74 9.84Zm5.4-7.36c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.45-2.36-1.44-.87-.77-1.46-1.73-1.63-2.02-.17-.3-.02-.45.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.22 5.08 4.51.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.11.57-.09 1.77-.72 2.02-1.42.25-.69.25-1.27.17-1.42-.07-.15-.27-.22-.57-.37Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ContactIcon({ type }: { type: "location" | "email" | "phone" }) {
  switch (type) {
    case "location":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
          <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
          <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8">
          <path d="M8.2 4.5h2.1l1 4-1.6 1.6a13.2 13.2 0 0 0 4.2 4.2l1.6-1.6 4 1v2.1c0 .8-.6 1.4-1.4 1.4A15.2 15.2 0 0 1 6.8 5.9c0-.8.6-1.4 1.4-1.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export const Footer = memo(function Footer() {
  return (
    <footer className="footer relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,142,70,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,79,116,0.24),transparent_28%)]"
      />

      <div className="relative">
        <div className="rounded-[28px] border border-white/14 bg-white/7 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-md sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]" style={{ color: "#F9F2A9" }}>Trust Overview</h3>
              <p className="mt-4 max-w-[320px] text-justify text-base leading-7 text-white/86">
                Bhagwat Heritage is dedicated to spiritual upliftment, temple culture, compassionate seva, and preserving sacred traditions for future generations.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to={ROUTES.mission.spiritual}
                  className="rounded-full border border-white/14 bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/22"
                >
                  SPIRITUAL
                </Link>
                <Link
                  to={ROUTES.mission.social}
                  className="rounded-full border border-white/14 bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/22"
                >
                  SOCIAL
                </Link>
                <Link
                  to={ROUTES.mission.cultural}
                  className="rounded-full border border-white/14 bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/22"
                >
                  CULTURAL
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]" style={{ color: "#F9F2A9" }}>Contact Info</h3>
              <div className="mt-4 space-y-3 text-base leading-7 text-white/95">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-[#f6e8bc]">
                    <ContactIcon type="location" />
                  </span>
                  <div>
                    <p>Bhagwat Dham - Shree Swaminarayan Mandir,</p>
                    <p>Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</p>
                  </div>
                </div>
                <a href="mailto:join@bhagwatheritage.org" className="flex items-center gap-3 text-white/95 transition-colors hover:text-[#ffe19c]">
                  <span className="text-[#f6e8bc]">
                    <ContactIcon type="email" />
                  </span>
                  <span>join@bhagwatheritage.org</span>
                </a>
                <a href="tel:+918668897445" className="flex items-center gap-3 text-white/95 transition-colors hover:text-[#ffe19c]">
                  <span className="text-[#f6e8bc]">
                    <ContactIcon type="phone" />
                  </span>
                  <span>+91-866-889-7445</span>
                </a>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 block overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] shadow-[0_18px_38px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="relative h-[160px] overflow-hidden sm:h-[175px]">
                  <iframe
                    title="Bhagwat Dham location map"
                    src={GOOGLE_MAPS_EMBED_URL}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f2236] via-[#0f2236]/76 to-transparent p-3">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd67f]">Google Maps</p>
                        <p className="mt-1 text-[13px] font-semibold text-white sm:text-sm">Open location and directions</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-white/12 bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors group-hover:bg-white/18 sm:px-3 sm:text-xs">
                        View Map
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]" style={{ color: "#F9F2A9" }}>Quick Links</h3>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {quickLinks.map((item) => (
                  <Link key={item.label} to={item.to} className="rounded-2xl border border-white/16 bg-white/12 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/18">
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/12 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/18"
                  >
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white ${item.accent}`}>
                      <SocialIcon icon={item.icon} />
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)]" style={{ color: "#F9F2A9" }}>Temple Timing</h3>
              <div className="mt-4 rounded-3xl border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.06))] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[#f6e8bc]/85">Darshan Hours</p>
                <p className="mt-4 text-base font-semibold text-white">Morning: 09:00 AM - 12:00 PM</p>
                <p className="mt-2 text-base font-semibold text-white">Evening: 04:00 PM - 09:00 PM</p>
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

          <div className="divider mt-8 grid gap-3 pt-5 text-sm text-white/82 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="hidden md:block" />
            <p className="text-center">Bhagwat Heritage Service Foundation Trust</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center justify-self-center rounded-full border border-white/18 bg-white/14 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/22 md:justify-self-end"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});
