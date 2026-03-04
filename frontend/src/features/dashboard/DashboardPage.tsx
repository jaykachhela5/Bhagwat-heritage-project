import { memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default memo(function DashboardPage() {
  const { user } = useAuth();

  const dashboardLinks =
    user?.role === "admin"
      ? [
          { label: "Admin Panel", href: "/dashboard/admin", icon: "🛡️" },
          { label: "Media Upload", href: "/gallery", icon: "🖼️" },
        ]
      : user?.role === "donor"
        ? [{ label: "Donor Panel", href: "/dashboard/donor", icon: "💝" }]
        : [{ label: "Volunteer Panel", href: "/dashboard/volunteer", icon: "🤝" }];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#0d3b66] mb-2">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mb-8 capitalize">Role: {user?.role}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl">{link.icon}</span>
              <span className="text-xl font-bold text-[#0d3b66]">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
