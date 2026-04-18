import { lazy, Suspense, useState, useRef, useEffect, useLayoutEffect, type ReactElement, type RefObject } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./app/providers/AuthProvider";
import { CartProvider } from "./app/providers/CartProvider";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";
import { LEGACY_ROUTES, ROUTES } from "./app/routes/routes";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { MarqueeBar } from "./components/common/MarqueeBar";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { InnerPageLayout } from "./components/layout/InnerPageLayout";
import {
  AboutAwardsPage,
  DigitalMembershipPage,
  DigitalSatsangPage,
  DigitalServicesHubPage,
  EventsAnnakutPage,
  EventsBhagwatKathaPage,
  EventsFestivalsPage,
  EventsGuruPurnimaPage,
  EventsKathaHubPage,
  EventsSpiritualPage,
  EventsYouthProgramsPage,
  GetInvolvedHubPage,
  InvolvedPartnerPage,
  InvolvedSponsorPage,
  KnowledgeChildrenPage,
  KnowledgeDailyQuotesPage,
  KnowledgeTodayQuotePage,
  KnowledgeHubPage,
  KnowledgeStudyResourcesPage,
  MandirAvatarsPage,
  MandirConstructionPage,
  MandirTeerthHubPage,
  MediaEventHighlightsPage,
  MediaGalleryHubPage,
  MediaPublicationsPage,
  MediaSocialFeedPage,
  MediaVideoGalleryPage,
  MediaVideoPlayerPage,
  MissionHubPage,
  NotFoundPage,
  SevaDisasterReliefPage,
  SevaHubPage,
} from "./features/architecture/ArchitecturePages";

const HomePage = lazy(() => import("./features/home/HomePage"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const GetInvolvedPage = lazy(() => import("./features/contact/GetInvolvedPage"));
const AboutPage = lazy(() => import("./features/about/AboutPage"));
const AboutActivitiesOverviewPage = lazy(() => import("./features/about/AboutActivitiesOverviewPage"));
const SansthaParichayPage = lazy(() => import("./features/about/SansthaParichayPage"));
const VisionMissionPage = lazy(() => import("./features/about/VisionMissionPage"));
const ManishBhaijiPage = lazy(() => import("./features/about/ManishBhaijiPage"));
const ObjectivesPage = lazy(() => import("./features/about/ObjectivesPage"));
const ContactPage = lazy(() => import("./features/contact/ContactPage"));
const DonatePage = lazy(() => import("./features/contact/DonatePage"));
const KundliPage = lazy(() => import("./features/digital/KundliPage"));
const GuidancePage = lazy(() => import("./features/digital/GuidancePage"));
const VolunteerFormPage = lazy(() => import("./features/contact/VolunteerFormPage"));
const AdminDashboardPage = lazy(() => import("./features/dashboard/AdminDashboardPage"));
const DashboardPage = lazy(() => import("./features/dashboard/DashboardPage"));
const DonorDashboardPage = lazy(() => import("./features/dashboard/DonorDashboardPage"));
const VolunteerDashboardPage = lazy(() => import("./features/dashboard/VolunteerDashboardPage"));
const LibraryPage = lazy(() => import("./features/events/LibraryPage"));
const PathshalaPage = lazy(() => import("./features/events/PathshalaPage"));
const StorePage = lazy(() => import("./features/events/StorePage"));
const MandirGalleryPage = lazy(() => import("./features/mandir/MandirGalleryPage"));
const GhanshyamPage = lazy(() => import("./features/mandir/GhanshyamPage"));
const MahamandirPage = lazy(() => import("./features/mandir/MahamandirPage"));
const PilgrimageInfoPage = lazy(() => import("./features/mandir/PilgrimageInfoPage"));
const CulturalPage = lazy(() => import("./features/mission/CulturalPage"));
const GlobalOutreachPage = lazy(() => import("./features/mission/GlobalOutreachPage"));
const SocialPage = lazy(() => import("./features/mission/SocialPage"));
const SpiritualPage = lazy(() => import("./features/mission/SpiritualPage"));
const EducationPage = lazy(() => import("./features/seva/EducationPage"));
const MedicinePage = lazy(() => import("./features/seva/MedicinePage"));
const ScholarshipPage = lazy(() => import("./features/seva/ScholarshipPage"));
const GauSevaPage = lazy(() => import("./features/seva/GauSevaPage"));
const JalSevaPage = lazy(() => import("./features/seva/JalSevaPage"));
const AnnSevaPage = lazy(() => import("./features/seva/AnnSevaPage"));
const KanyaPage = lazy(() => import("./features/seva/KanyaPage"));
const VyasanPage = lazy(() => import("./features/seva/VyasanPage"));
const GalleryAdminPage = lazy(() => import("./features/gallery/GalleryAdminPage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function SiteHeader({ headerRef }: { headerRef: RefObject<HTMLDivElement | null> }) {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll.current && current > 10);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <MarqueeBar />
      <Navbar />
    </div>
  );
}

const THEME_CLASS_NAMES = ["home-theme", "inner-theme"] as const;

function resolveThemeClass(pathname: string) {
  return pathname === ROUTES.home ? "home-theme" : "inner-theme";
}

const withInnerPageLayout = (element: ReactElement) => <InnerPageLayout>{element}</InnerPageLayout>;

function ThemeClassController() {
  const location = useLocation();

  useEffect(() => {
    const themeClass = resolveThemeClass(location.pathname);
    document.body.classList.remove(...THEME_CLASS_NAMES);
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [location.pathname]);

  return null;
}

export default function App() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(128);

  useLayoutEffect(() => {
    const recalc = () => {
      const h = headerRef.current?.offsetHeight;
      if (h == null) return;
      setHeaderHeight((prev) => (Math.abs(prev - h) > 0.5 ? h : prev));
    };

    // Initial measure + measure after first paint (fonts/images may affect layout).
    recalc();
    const raf = window.requestAnimationFrame(recalc);
    window.addEventListener("resize", recalc);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", recalc);
    };
  }, []);

  return (
    <BrowserRouter>
      <ThemeClassController />
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <SiteHeader headerRef={headerRef} />
            <main style={{ paddingTop: headerHeight }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path={ROUTES.home} element={<HomePage />} />
                  <Route path={ROUTES.login} element={<LoginPage />} />
                  <Route path={ROUTES.contact} element={withInnerPageLayout(<ContactPage />)} />
                  <Route path={ROUTES.donate} element={withInnerPageLayout(<DonatePage />)} />
                  <Route path={ROUTES.volunteer} element={withInnerPageLayout(<VolunteerFormPage />)} />
                  <Route path="/events" element={<Navigate to={ROUTES.eventsKatha.index} replace />} />
                  <Route path="/media" element={<Navigate to={ROUTES.media.index} replace />} />
                  <Route path="/media/videos" element={<Navigate to={ROUTES.media.videos} replace />} />
                  <Route path={ROUTES.about.founderAlias} element={<Navigate to={ROUTES.about.founder} replace />} />
                  <Route path={ROUTES.digital.guidance} element={withInnerPageLayout(<GuidancePage />)} />
                  <Route path="/get-involved/invite-maharaj-ji" element={<Navigate to={ROUTES.contact} replace />} />
                  <Route path="/help-request" element={<Navigate to={ROUTES.contact} replace />} />

                  <Route path={ROUTES.about.index} element={withInnerPageLayout(<AboutPage />)} />
                  <Route path={ROUTES.about.sansthaParichay} element={withInnerPageLayout(<SansthaParichayPage />)} />
                  <Route path={ROUTES.about.visionMission} element={withInnerPageLayout(<VisionMissionPage />)} />
                  <Route path={ROUTES.about.objectives} element={withInnerPageLayout(<ObjectivesPage />)} />
                  <Route path={ROUTES.about.founder} element={withInnerPageLayout(<ManishBhaijiPage />)} />
                  <Route path={ROUTES.about.awards} element={withInnerPageLayout(<AboutAwardsPage />)} />
                  <Route path={ROUTES.about.activities} element={withInnerPageLayout(<AboutActivitiesOverviewPage />)} />

                  <Route path={ROUTES.mission.index} element={withInnerPageLayout(<MissionHubPage />)} />
                  <Route path={ROUTES.mission.spiritual} element={withInnerPageLayout(<SpiritualPage />)} />
                  <Route path={ROUTES.mission.social} element={withInnerPageLayout(<SocialPage />)} />
                  <Route path={ROUTES.mission.cultural} element={withInnerPageLayout(<CulturalPage />)} />
                  <Route path={ROUTES.mission.global} element={withInnerPageLayout(<GlobalOutreachPage />)} />

                  <Route path={ROUTES.seva.index} element={withInnerPageLayout(<SevaHubPage />)} />
                  <Route path={ROUTES.seva.gau} element={withInnerPageLayout(<GauSevaPage />)} />
                  <Route path={ROUTES.seva.jal} element={withInnerPageLayout(<JalSevaPage />)} />
                  <Route path={ROUTES.seva.ann} element={withInnerPageLayout(<AnnSevaPage />)} />
                  <Route path={ROUTES.seva.annJal} element={<Navigate to={ROUTES.seva.index} replace />} />
                  <Route path={ROUTES.seva.medicine} element={withInnerPageLayout(<MedicinePage />)} />
                  <Route path={ROUTES.seva.education} element={withInnerPageLayout(<EducationPage />)} />
                  <Route path={ROUTES.seva.scholarship} element={withInnerPageLayout(<ScholarshipPage />)} />
                  <Route path={ROUTES.seva.kanyadaan} element={withInnerPageLayout(<KanyaPage />)} />
                  <Route path={ROUTES.seva.vyasanmukti} element={withInnerPageLayout(<VyasanPage />)} />
                  <Route path={ROUTES.seva.disasterRelief} element={withInnerPageLayout(<SevaDisasterReliefPage />)} />
                  <Route path={ROUTES.seva.volunteerPrograms} element={withInnerPageLayout(<VolunteerFormPage />)} />

                  <Route path={ROUTES.eventsKatha.index} element={withInnerPageLayout(<EventsKathaHubPage />)} />
                  <Route path={ROUTES.eventsKatha.bhagwatKatha} element={withInnerPageLayout(<EventsBhagwatKathaPage />)} />
                  <Route path={ROUTES.eventsKatha.spiritualEvents} element={withInnerPageLayout(<EventsSpiritualPage />)} />
                  <Route path="/events-katha/festivals-celebration" element={<Navigate to={ROUTES.eventsKatha.festivals} replace />} />
                  <Route path={ROUTES.eventsKatha.festivals} element={withInnerPageLayout(<EventsFestivalsPage />)} />
                  <Route path={ROUTES.eventsKatha.guruPurnima} element={withInnerPageLayout(<EventsGuruPurnimaPage />)} />
                  <Route path={ROUTES.eventsKatha.annakut} element={withInnerPageLayout(<EventsAnnakutPage />)} />
                  <Route path={ROUTES.eventsKatha.youthPrograms} element={withInnerPageLayout(<EventsYouthProgramsPage />)} />

                  <Route path={ROUTES.knowledge.index} element={withInnerPageLayout(<KnowledgeHubPage />)} />
                  <Route path={ROUTES.knowledge.pathshala} element={withInnerPageLayout(<PathshalaPage />)} />
                  <Route path={ROUTES.knowledge.library} element={withInnerPageLayout(<LibraryPage />)} />
                  <Route path={ROUTES.knowledge.studyResources} element={withInnerPageLayout(<KnowledgeStudyResourcesPage />)} />
                  <Route path={ROUTES.knowledge.children} element={withInnerPageLayout(<KnowledgeChildrenPage />)} />
                  <Route path={ROUTES.knowledge.dailyQuotes} element={withInnerPageLayout(<KnowledgeDailyQuotesPage />)} />
                  <Route path={ROUTES.knowledge.dailyQuotesToday} element={withInnerPageLayout(<KnowledgeTodayQuotePage />)} />

                  <Route path={ROUTES.mandirTeerth.index} element={withInnerPageLayout(<MandirTeerthHubPage />)} />
                  <Route path={ROUTES.mandirTeerth.bhagwatDham} element={withInnerPageLayout(<GhanshyamPage />)} />
                  <Route path={ROUTES.mandirTeerth.mahamandir} element={withInnerPageLayout(<MahamandirPage />)} />
                  <Route path={ROUTES.mandirTeerth.avatars} element={withInnerPageLayout(<MandirAvatarsPage />)} />
                  <Route path={ROUTES.mandirTeerth.hanuman} element={withInnerPageLayout(<MahamandirPage />)} />
                  <Route path={ROUTES.mandirTeerth.construction} element={withInnerPageLayout(<MandirConstructionPage />)} />
                  <Route path={ROUTES.mandirTeerth.pilgrimage} element={withInnerPageLayout(<PilgrimageInfoPage />)} />

                  <Route path={ROUTES.media.index} element={withInnerPageLayout(<MediaGalleryHubPage />)} />
                  <Route path={ROUTES.media.photos} element={withInnerPageLayout(<MandirGalleryPage />)} />
                  <Route path={ROUTES.media.videos} element={withInnerPageLayout(<MediaVideoGalleryPage />)} />
                  <Route path={`${ROUTES.media.videos}/:videoId`} element={withInnerPageLayout(<MediaVideoPlayerPage />)} />
                  <Route path={ROUTES.media.highlights} element={withInnerPageLayout(<MediaEventHighlightsPage />)} />
                  <Route path={ROUTES.media.publications} element={withInnerPageLayout(<MediaPublicationsPage />)} />
                  <Route path={ROUTES.media.socialFeed} element={withInnerPageLayout(<MediaSocialFeedPage />)} />

                  <Route path={ROUTES.digital.index} element={withInnerPageLayout(<DigitalServicesHubPage />)} />
                  <Route path={ROUTES.digital.store} element={withInnerPageLayout(<StorePage />)} />
                  <Route path={ROUTES.digital.donation} element={withInnerPageLayout(<DonatePage />)} />
                  <Route path={ROUTES.digital.satsang} element={withInnerPageLayout(<DigitalSatsangPage />)} />
                  <Route path={ROUTES.digital.membership} element={withInnerPageLayout(<DigitalMembershipPage />)} />
                  <Route path={ROUTES.digital.kundli} element={withInnerPageLayout(<KundliPage />)} />

                  <Route path={ROUTES.involved.index} element={withInnerPageLayout(<GetInvolvedPage />)} />
                  <Route path={ROUTES.involved.volunteer} element={withInnerPageLayout(<VolunteerFormPage />)} /> 
                  <Route path={ROUTES.involved.donor} element={withInnerPageLayout(<DonatePage />)} />
                  <Route path={ROUTES.involved.partner} element={withInnerPageLayout(<InvolvedPartnerPage />)} />
                  <Route path={ROUTES.involved.sponsor} element={withInnerPageLayout(<InvolvedSponsorPage />)} />
                  <Route path="/get-involved/overview" element={withInnerPageLayout(<GetInvolvedHubPage />)} />

                  <Route
                    path={ROUTES.dashboards.root}
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.dashboards.admin}
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.dashboards.galleryAdmin}
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <GalleryAdminPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.dashboards.donor}
                    element={
                      <ProtectedRoute requiredRole="donor">
                        <DonorDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.dashboards.volunteer}
                    element={
                      <ProtectedRoute requiredRole="volunteer">
                        <VolunteerDashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route path={LEGACY_ROUTES.founderOld} element={<Navigate to={ROUTES.about.founder} replace />} />
                  <Route path={LEGACY_ROUTES.spiritualOld} element={<Navigate to={ROUTES.mission.spiritual} replace />} />
                  <Route path={LEGACY_ROUTES.socialOld} element={<Navigate to={ROUTES.mission.social} replace />} />
                  <Route path={LEGACY_ROUTES.culturalOld} element={<Navigate to={ROUTES.mission.cultural} replace />} />
                  <Route path={LEGACY_ROUTES.pathshalaOld} element={<Navigate to={ROUTES.knowledge.pathshala} replace />} />
                  <Route path={LEGACY_ROUTES.libraryOld} element={<Navigate to={ROUTES.knowledge.library} replace />} />
                  <Route path={LEGACY_ROUTES.storeOld} element={<Navigate to={ROUTES.digital.store} replace />} />
                  <Route path={LEGACY_ROUTES.requestSevaOld} element={<Navigate to={ROUTES.contact} replace />} />
                  <Route path={LEGACY_ROUTES.mandirOld} element={<Navigate to={ROUTES.mandirTeerth.bhagwatDham} replace />} />
                  <Route path={LEGACY_ROUTES.ghanshyamOld} element={<Navigate to={ROUTES.mandirTeerth.bhagwatDham} replace />} />
                  <Route path={LEGACY_ROUTES.galleryOldPublic} element={<Navigate to={ROUTES.media.photos} replace />} />
                  <Route path={LEGACY_ROUTES.galleryOldAdmin} element={<Navigate to={ROUTES.dashboards.galleryAdmin} replace />} />

                  <Route path="*" element={withInnerPageLayout(<NotFoundPage />)} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
