import { memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";
import { ROUTES } from "../../app/routes/routes";

export default memo(function DashboardPage() {
  const { user } = useAuth();

  const dashboardLinks =
    user?.role === "admin"
      ? [
          { label: "Admin Panel", href: ROUTES.dashboards.admin, icon: "AP" },
          { label: "Gallery Admin", href: ROUTES.dashboards.galleryAdmin, icon: "GA" },
        ]
      : user?.role === "donor"
        ? [{ label: "Donor Panel", href: ROUTES.dashboards.donor, icon: "DP" }]
        : [{ label: "Volunteer Panel", href: ROUTES.dashboards.volunteer, icon: "VP" }];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#0f678c] mb-2">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mb-8 capitalize">Role: {user?.role}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition-shadow"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#edf3fb] text-[#0f678c] text-xs font-bold">
                {link.icon}
              </span>
              <span className="text-xl font-bold text-[#0f678c]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

