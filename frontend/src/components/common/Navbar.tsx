import { memo, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { EXTERNAL_RAZORPAY_DONATE_URL, ROUTES } from "../../app/routes/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavChildConfig {
  id: string;
  labelKey: string;
  href: string;
}

interface NavItemConfig {
  id: string;
  labelKey: string;
  href?: string;
  children?: NavChildConfig[];
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", labelKey: "navbar.items.home", href: ROUTES.home },
  { id: "about", labelKey: "navbar.items.about", href: ROUTES.about.index },
  { id: "founder", labelKey: "navbar.items.founder", href: ROUTES.about.founder },
  { id: "hanuman-murti", labelKey: "navbar.items.hanuman", href: ROUTES.mandirTeerth.hanuman },
  /* COMMENTED OUT — Section 6: all other nav items
  {
    id: "about-dropdown",
    labelKey: "navbar.items.about",
    children: [
      { id: "about-overview", labelKey: "navbar.items.aboutOverview", href: ROUTES.about.index },
      { id: "about-objectives", labelKey: "navbar.items.trustObjectives", href: ROUTES.about.objectives },
      { id: "about-founder", labelKey: "navbar.items.founder", href: ROUTES.about.founder },
      { id: "about-awards", labelKey: "navbar.items.awards", href: ROUTES.about.awards },
      { id: "about-structure", labelKey: "navbar.items.structure", href: ROUTES.about.structure },
      { id: "about-activities", labelKey: "navbar.items.activities", href: ROUTES.about.activities },
    ],
  },
  {
    id: "mission",
    labelKey: "navbar.items.mission",
    children: [
      { id: "mission-spiritual", labelKey: "navbar.items.spiritualMission", href: ROUTES.mission.spiritual },
      { id: "mission-social", labelKey: "navbar.items.socialMission", href: ROUTES.mission.social },
      { id: "mission-cultural", labelKey: "navbar.items.culturalRenaissance", href: ROUTES.mission.cultural },
      { id: "mission-global", labelKey: "navbar.items.globalOutreach", href: ROUTES.mission.global },
    ],
  },
  {
    id: "seva",
    labelKey: "navbar.items.seva",
    children: [
      { id: "seva-gau", labelKey: "navbar.items.gauSeva", href: ROUTES.seva.gau },
      { id: "seva-ann-jal", labelKey: "navbar.items.annJalSeva", href: ROUTES.seva.annJal },
      { id: "seva-medicine", labelKey: "navbar.items.medicineDistribution", href: ROUTES.seva.medicine },
      { id: "seva-education", labelKey: "navbar.items.educationSupport", href: ROUTES.seva.education },
      { id: "seva-scholarship", labelKey: "navbar.items.scholarshipProgram", href: ROUTES.seva.scholarship },
      { id: "seva-kanyadaan", labelKey: "navbar.items.kanyadaanSeva", href: ROUTES.seva.kanyadaan },
      { id: "seva-vyasan", labelKey: "navbar.items.vyasanmukti", href: ROUTES.seva.vyasanmukti },
      { id: "seva-disaster", labelKey: "navbar.items.disasterRelief", href: ROUTES.seva.disasterRelief },
    ],
  },
  {
    id: "events",
    labelKey: "navbar.items.events",
    children: [
      { id: "events-bhagwat-katha", labelKey: "navbar.items.bhagwatKatha", href: ROUTES.eventsKatha.bhagwatKatha },
      { id: "events-spiritual", labelKey: "navbar.items.spiritualEvents", href: ROUTES.eventsKatha.spiritualEvents },
      { id: "events-festivals", labelKey: "navbar.items.festivals", href: ROUTES.eventsKatha.festivals },
      { id: "events-guru-purnima", labelKey: "navbar.items.guruPurnima", href: ROUTES.eventsKatha.guruPurnima },
      { id: "events-annakut", labelKey: "navbar.items.annakut", href: ROUTES.eventsKatha.annakut },
      { id: "events-youth", labelKey: "navbar.items.youthPrograms", href: ROUTES.eventsKatha.youthPrograms },
    ],
  },
  {
    id: "knowledge",
    labelKey: "navbar.items.knowledge",
    children: [
      { id: "knowledge-pathshala", labelKey: "navbar.items.pathshala", href: ROUTES.knowledge.pathshala },
      { id: "knowledge-library", labelKey: "navbar.items.library", href: ROUTES.knowledge.library },
      { id: "knowledge-study", labelKey: "navbar.items.studyResources", href: ROUTES.knowledge.studyResources },
      { id: "knowledge-children", labelKey: "navbar.items.childrenLearning", href: ROUTES.knowledge.children },
      { id: "knowledge-quotes", labelKey: "navbar.items.dailyQuotes", href: ROUTES.knowledge.dailyQuotes },
    ],
  },
  {
    id: "mandir",
    labelKey: "navbar.items.mandirTeerth",
    children: [
      { id: "mandir-bhagwat-dham", labelKey: "navbar.items.bhagwatDham", href: ROUTES.mandirTeerth.bhagwatDham },
      { id: "mandir-mahamandir", labelKey: "navbar.items.mahamandir", href: ROUTES.mandirTeerth.mahamandir },
      { id: "mandir-avatars", labelKey: "navbar.items.avatars", href: ROUTES.mandirTeerth.avatars },
      { id: "mandir-hanuman", labelKey: "navbar.items.hanuman", href: ROUTES.mandirTeerth.hanuman },
      { id: "mandir-construction", labelKey: "navbar.items.construction", href: ROUTES.mandirTeerth.construction },
      { id: "mandir-pilgrimage", labelKey: "navbar.items.pilgrimage", href: ROUTES.mandirTeerth.pilgrimage },
    ],
  },
  {
    id: "media",
    labelKey: "navbar.items.mediaGallery",
    children: [
      { id: "media-photos", labelKey: "navbar.items.photoGallery", href: ROUTES.media.photos },
      { id: "media-videos", labelKey: "navbar.items.videoGallery", href: ROUTES.media.videos },
      { id: "media-highlights", labelKey: "navbar.items.eventHighlights", href: ROUTES.media.highlights },
      { id: "media-publications", labelKey: "navbar.items.publications", href: ROUTES.media.publications },
      { id: "media-social-feed", labelKey: "navbar.items.socialFeed", href: ROUTES.media.socialFeed },
    ],
  },
  {
    id: "digital",
    labelKey: "navbar.items.digitalServices",
    children: [
      { id: "digital-store", labelKey: "navbar.items.estore", href: ROUTES.digital.store },
      { id: "digital-donation", labelKey: "navbar.items.donationSystem", href: ROUTES.digital.donation },
      { id: "digital-satsang", labelKey: "navbar.items.onlineSatsang", href: ROUTES.digital.satsang },
      { id: "digital-membership", labelKey: "navbar.items.membershipPortal", href: ROUTES.digital.membership },
      { id: "digital-kundli", labelKey: "navbar.items.kundli", href: ROUTES.digital.kundli },
    ],
  },
  {
    id: "involved",
    labelKey: "navbar.items.getInvolved",
    children: [
      { id: "involved-overview", labelKey: "navbar.items.involvedOverview", href: ROUTES.involved.index },
      { id: "involved-volunteer", labelKey: "navbar.items.volunteerRegistration", href: ROUTES.involved.volunteer },
      { id: "involved-donor", labelKey: "navbar.items.becomeDonor", href: ROUTES.involved.donor },
      { id: "involved-partner", labelKey: "navbar.items.partner", href: ROUTES.involved.partner },
      { id: "involved-sponsor", labelKey: "navbar.items.sponsorPrograms", href: ROUTES.involved.sponsor },
    ],
  },
  { id: "contact", labelKey: "navbar.items.contact", href: ROUTES.contact },
  */
];

const DropdownItem = memo(function DropdownItem({ item, t }: { item: NavItemConfig; t: TFunction }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <Link
          to={item.href ?? ROUTES.home}
          className="block whitespace-nowrap rounded-lg px-2.5 2xl:px-3 py-2 text-[13px] 2xl:text-[14px] text-[#0d3b66] font-semibold hover:text-[#f4a261] hover:bg-[#f7fbff] transition-colors"
        >
          {t(item.labelKey)}
        </Link>
      </li>
    );
  }

  const twoColumn = item.children.length > 6;

  return (
    <li className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 2xl:px-3 py-2 text-[13px] 2xl:text-[14px] text-[#0d3b66] font-semibold hover:text-[#f4a261] hover:bg-[#f7fbff] transition-colors">
        {t(item.labelKey)}
        <i className="fas fa-chevron-down text-xs mt-0.5" />
      </button>

      {open ? (
        <div className="absolute top-full left-0 z-50 mt-1 w-[350px] rounded-xl border border-[#d8e4f2] bg-white p-2 shadow-xl">
          <p className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-[#56708a] font-semibold">
            {t(item.labelKey)}
          </p>
          <ul className={`${twoColumn ? "grid grid-cols-2 gap-1" : "space-y-0.5"} max-h-[380px] overflow-y-auto pr-1`}>
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  to={child.href}
                  className="block rounded-md px-3 py-2 text-[13px] text-[#0d3b66] hover:bg-[#f3f8ff] hover:text-[#f4a261] transition-colors leading-snug"
                >
                  {t(child.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
});

export const Navbar = memo(function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.home);
  };

  const dashboardPath =
    user?.role === "admin"
      ? ROUTES.dashboards.admin
      : user?.role === "donor"
        ? ROUTES.dashboards.donor
        : ROUTES.dashboards.volunteer;

  return (
    <header className="bg-white shadow-md w-full">
      <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-6 2xl:px-8 py-3 flex items-center justify-between xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-3">
        <Link
          to={ROUTES.home}
          className="flex min-w-0 max-w-[340px] items-center gap-3 md:max-w-[410px] md:gap-4 xl:max-w-[430px]"
        >
          <div className="flex h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20 shrink-0 items-center justify-center overflow-hidden">
            <img src="/images/logo.jpg" alt={t("brand.logoAlt")} className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 leading-none">
            <p className="text-[0.82rem] sm:text-[0.98rem] lg:text-[1.22rem] text-[#0d3b66] font-extrabold leading-tight whitespace-normal">
              <span className="block">{t("brand.title")}</span>
              <span className="block text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-[#60758c]">
                {t("brand.subtitle")}
              </span>
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex xl:min-w-0 xl:justify-center">
          <ul className="flex items-center justify-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) => (
              <DropdownItem key={item.id} item={item} t={t} />
            ))}
          </ul>
        </nav>

        <div className="hidden xl:flex items-center justify-end gap-2 justify-self-end">
          {user ? (
            <>
              <Link to={dashboardPath} className="btn-primary text-sm whitespace-nowrap">
                {t("navbar.myPanel")}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm whitespace-nowrap text-[#0d3b66] border border-[#0d3b66] rounded-md hover:bg-gray-50"
              >
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-5 py-2.5 whitespace-nowrap"
            >
              {t("navbar.donate")}
            </a>
          )}
          <LanguageSwitcher compact />
        </div>

        <div className="xl:hidden ml-auto flex items-center gap-2">
          <LanguageSwitcher compact className="px-2.5 py-1.3 text-xs" />
          <button
            className="p-2 text-[#0d3b66]"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={t("navbar.toggleMenu")}
          >
            <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="xl:hidden bg-white border-t px-4 py-3 space-y-2 max-h-[75vh] overflow-y-auto">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                to={item.href}
                className="block py-2 text-[#0d3b66] font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <div key={item.id} className="rounded-lg border border-[#e4edf7] p-2">
                <p className="px-1 py-1 text-xs uppercase tracking-wide text-[#56708a] font-semibold">
                  {t(item.labelKey)}
                </p>
                <div className="space-y-0.5">
                  {(item.children ?? []).map((child) => (
                    <Link
                      key={child.id}
                      to={child.href}
                      className="block py-1.5 px-2 text-[#0d3b66] text-sm rounded hover:bg-[#f3f8ff]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(child.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}

          {user ? (
            <button onClick={handleLogout} className="block py-2 text-red-600 font-semibold">
              {t("navbar.logout")}
            </button>
          ) : (
            <a
              href={EXTERNAL_RAZORPAY_DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block text-center"
              onClick={() => setMobileOpen(false)}
            >
              {t("navbar.donate")}
            </a>
          )}
        </div>
      ) : null}
    </header>
  );
});
