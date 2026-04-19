import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";

const QUICK_LINKS = [
  { key: "footer.links.about", href: ROUTES.about.index },
  { key: "footer.links.mission", href: ROUTES.mission.index },
  { key: "footer.links.seva", href: ROUTES.seva.index },
  { key: "footer.links.events", href: ROUTES.eventsKatha.index },
  { key: "footer.links.knowledge", href: ROUTES.knowledge.index },
  { key: "footer.links.mandir", href: ROUTES.mandirTeerth.index },
  { key: "footer.links.media", href: ROUTES.media.index },
  { key: "footer.links.digital", href: ROUTES.digital.index },
  { key: "footer.links.getInvolved", href: ROUTES.involved.index },
  { key: "footer.links.contact", href: ROUTES.contact },
];

export const Footer = memo(function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-l from-[#0F3F5A] via-[#1F5F84] to-[#529CB0] text-[#F8FCFF]">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(9,30,43,0.28),transparent_30%)]" />
      <div aria-hidden="true" className="absolute left-[-5rem] top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden="true" className="absolute right-[-4rem] bottom-12 h-52 w-52 rounded-full bg-[#12394A]/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full bg-gradient-to-r from-[#1A5676] via-[#2A6E94] to-[#3D86AE] text-[#F8FCFF]"
      >
        <div className="flex flex-col items-center justify-between gap-5 px-4 py-6 text-center sm:px-6 md:flex-row md:px-10 md:text-left lg:px-16 xl:px-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">{t("footer.ctaEyebrow")}</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">Support a noble cause today</h3>
            <p className="mt-2 text-sm font-medium text-white/85 md:text-base">Be Part of Seva and Spiritual Growth</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/90 px-6 py-3 text-sm font-semibold text-[#2E5F7B] transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_14px_28px_rgba(46,95,123,0.18)]"
            >
              {t("footer.becomeVolunteer")}
            </Link>
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#4F94BD] px-6 py-3 text-sm font-semibold text-[#F8FCFF] transition-all duration-300 hover:scale-105 hover:bg-[#3F84AE] hover:shadow-[0_14px_28px_rgba(63,132,174,0.24)]"
            >
              {t("footer.makeDonation")}
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 }}
        className="relative px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16 xl:px-24"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-2xl font-bold text-[#FFF6D8]">Bhagwat Heritage</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/88">{t("footer.aboutText")}</p>
            <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF2D6]">
                {t("footer.templeTiming")}
              </p>
              <p className="mt-3 text-sm text-white/90">{t("footer.morning")}</p>
              <p className="mt-1 text-sm text-white/90">{t("footer.evening")}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FFF6D8]">{t("footer.contactInfo")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-[#FFF2D6]" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope mt-1 text-[#FFF2D6]" />
                <span>bhagwatheritage@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone mt-1 text-[#FFF2D6]" />
                <span>+91 8668897445</span>
              </li>
            </ul>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF6D8]"
            >
              <i className="fas fa-location-arrow" />
              {t("footer.openLocation")}
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FFF6D8]">{t("footer.quickLinks")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex items-center text-white/90 transition-all duration-300 hover:translate-x-1 hover:text-[#FFF6D8]"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FFF6D8]">{t("footer.followUs")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/share/1AtpQtn1SL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/92 transition-all duration-300 hover:scale-[1.03] hover:text-[#FFF6D8]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-social-facebook)] text-white shadow-[0_10px_24px_rgba(24,119,242,0.26)]">
                    <i className="fab fa-facebook-f text-sm" />
                  </span>
                  <span className="font-semibold tracking-wide">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bhagwat.heritage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/92 transition-all duration-300 hover:scale-[1.03] hover:text-[#FFF6D8]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-social-instagram-start)] via-[var(--color-social-instagram-mid)] to-[var(--color-social-instagram-end)] text-white shadow-[0_10px_24px_rgba(225,48,108,0.22)]">
                    <i className="fab fa-instagram text-sm" />
                  </span>
                  <span className="font-semibold tracking-wide">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918668897445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/92 transition-all duration-300 hover:scale-[1.03] hover:text-[#FFF6D8]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-social-whatsapp)] text-white shadow-[0_10px_24px_rgba(37,211,102,0.22)]">
                    <i className="fab fa-whatsapp text-sm" />
                  </span>
                  <span className="font-semibold tracking-wide">WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@bhagwatheritage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/92 transition-all duration-300 hover:scale-[1.03] hover:text-[#FFF6D8]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-social-youtube)] text-white shadow-[0_10px_24px_rgba(255,0,0,0.22)]">
                    <i className="fab fa-youtube text-sm" />
                  </span>
                  <span className="font-semibold tracking-wide">YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="relative border-t border-white/20 px-4 py-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/88 md:flex-row">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-medium text-white/92 transition-all duration-300 hover:text-[#FFF6D8]"
          >
            <i className="fas fa-arrow-up" />
            {t("footer.backToTop")}
          </button>
        </div>
      </div>
    </footer>
  );
});
