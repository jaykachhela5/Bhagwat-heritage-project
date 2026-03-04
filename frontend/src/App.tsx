import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./app/providers/AuthProvider";
import { CartProvider } from "./app/providers/CartProvider";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { MarqueeBar } from "./components/common/MarqueeBar";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

const HomePage = lazy(() => import("./features/home/HomePage"));
const LoginPage = lazy(() => import("./features/auth/LoginPage"));
const GetInvolvedPage = lazy(() => import("./features/contact/GetInvolvedPage"));
const AboutPage = lazy(() => import("./features/about/AboutPage"));
const ManishBhaijiPage = lazy(() => import("./features/about/ManishBhaijiPage"));
const ObjectivesPage = lazy(() => import("./features/about/ObjectivesPage"));
const ContactPage = lazy(() => import("./features/contact/ContactPage"));
const DonatePage = lazy(() => import("./features/contact/DonatePage"));
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
const MahamanidirPage = lazy(() => import("./features/mandir/MahamanidirPage"));
const CulturalPage = lazy(() => import("./features/mission/CulturalPage"));
const SocialPage = lazy(() => import("./features/mission/SocialPage"));
const SpiritualPage = lazy(() => import("./features/mission/SpiritualPage"));
const EducationPage = lazy(() => import("./features/seva/EducationPage"));
const JalSevaPage = lazy(() => import("./features/seva/JalSevaPage"));
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

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <MarqueeBar />
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/get-involved" element={<GetInvolvedPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/manish-bhaiji" element={<ManishBhaijiPage />} />
                  <Route path="/about/objectives" element={<ObjectivesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/donate" element={<DonatePage />} />
                  <Route path="/volunteer" element={<VolunteerFormPage />} />
                  <Route path="/events/library" element={<LibraryPage />} />
                  <Route path="/events/pathshala" element={<PathshalaPage />} />
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/mandir/gallery" element={<MandirGalleryPage />} />
                  <Route path="/mandir/ghanshyam" element={<GhanshyamPage />} />
                  <Route path="/mandir" element={<MahamanidirPage />} />
                  <Route path="/mission/cultural" element={<CulturalPage />} />
                  <Route path="/mission/social" element={<SocialPage />} />
                  <Route path="/mission/spiritual" element={<SpiritualPage />} />
                  <Route path="/seva/education" element={<EducationPage />} />
                  <Route path="/seva/jal-seva" element={<JalSevaPage />} />
                  <Route path="/seva/kanya" element={<KanyaPage />} />
                  <Route path="/seva/vyasan" element={<VyasanPage />} />
                  <Route path="/gallery" element={<GalleryAdminPage />} />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/admin"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/donor"
                    element={
                      <ProtectedRoute requiredRole="donor">
                        <DonorDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/volunteer"
                    element={
                      <ProtectedRoute requiredRole="volunteer">
                        <VolunteerDashboardPage />
                      </ProtectedRoute>
                    }
                  />
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
