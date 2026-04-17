import { memo } from "react";
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
    <footer className="text-white bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-footer-mid)] to-[var(--color-footer-end)]">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="mb-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-footer-accent-soft)]">{t("footer.ctaEyebrow")}</p>
            <h3 className="text-2xl font-bold leading-tight">{t("footer.ctaTitle")}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.involved.volunteer}
              className="inline-flex items-center justify-center rounded-lg bg-white text-[var(--color-secondary)] px-5 py-2.5 font-semibold hover:bg-[var(--color-bg-main)] transition-colors"
            >
              {t("footer.becomeVolunteer")}
            </Link>
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-footer-cta)] text-white px-5 py-2.5 font-semibold hover:bg-[var(--color-footer-cta-hover)] transition-colors"
            >
              {t("footer.makeDonation")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-[var(--color-footer-accent)]">{t("footer.aboutTitle")}</h3>
            <p className="text-sm text-white/85 leading-relaxed">{t("footer.aboutText")}</p>
            <p className="mt-4 text-sm text-white/75">
              {t("footer.templeTiming")}
              <br />
              {t("footer.morning")}
              <br />
              {t("footer.evening")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-[var(--color-footer-accent)]">{t("footer.contactInfo")}</h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li>
                <i className="fas fa-map-marker-alt mr-2" />
                {t("footer.address")}
              </li>
              <li>
                <i className="fas fa-envelope mr-2" />
                info@bhagwatheritage.org
              </li>
              <li>
                <i className="fas fa-phone mr-2" />
                +91 8668897445
              </li>
            </ul>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-sm text-[var(--color-footer-accent-soft)] hover:text-white transition-colors"
            >
              <i className="fas fa-location-arrow mr-2" />
              {t("footer.openLocation")}
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-[var(--color-footer-accent)]">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-white/85 hover:text-[var(--color-footer-accent-soft)] transition-colors">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-[var(--color-footer-accent)]">{t("footer.followUs")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/share/1AtpQtn1SL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-social-facebook)] text-white">
                    <i className="fab fa-facebook-f text-xs" />
                  </span>
                  <span className="font-semibold tracking-wide text-[var(--color-social-facebook-soft)]">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bhagwat.heritage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-social-instagram-start)] via-[var(--color-social-instagram-mid)] to-[var(--color-social-instagram-end)] text-white">
                    <i className="fab fa-instagram text-xs" />
                  </span>
                  <span className="font-semibold tracking-wide text-[var(--color-social-instagram-soft)]">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918668897445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-social-whatsapp)] text-white">
                    <i className="fab fa-whatsapp text-xs" />
                  </span>
                  <span className="font-semibold tracking-wide text-[var(--color-social-whatsapp-soft)]">WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@bhagwatheritage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-social-youtube)] text-white">
                    <i className="fab fa-youtube text-xs" />
                  </span>
                  <span className="font-semibold tracking-wide text-[var(--color-social-youtube-soft)]">YouTube</span>
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-4 inline-flex items-center rounded-md border border-white/30 px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-white transition-colors"
            >
              <i className="fas fa-arrow-up mr-2" />
              {t("footer.backToTop")}
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 text-center py-4 text-sm text-white/70">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
});
