import { useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Objectives", href: "/about/objectives" },
      { label: "S.S. Manish Bhai Ji", href: "/about/manish-bhaiji" },
    ],
  },
  {
    label: "Our Mission",
    children: [
      { label: "Spiritual", href: "/mission/spiritual" },
      { label: "Social Service", href: "/mission/social" },
      { label: "Cultural", href: "/mission/cultural" },
    ],
  },
  {
    label: "Seva",
    children: [
      { label: "Jal/Ann Seva", href: "/seva/jal-seva" },
      { label: "Medicine & Education", href: "/seva/education" },
      { label: "Kanyadaan", href: "/seva/kanya" },
      { label: "Vyasanmukti", href: "/seva/vyasan" },
    ],
  },
  {
    label: "Events & Katha",
    children: [
      { label: "E-Pathshala", href: "/events/pathshala" },
      { label: "E-Library", href: "/events/library" },
      { label: "E-Store", href: "/store" },
    ],
  },
  {
    label: "Mandir & Teerth",
    children: [
      { label: "63-Ft Hanuman", href: "/mandir" },
      { label: "Mahamandir", href: "/mandir/ghanshyam" },
      { label: "Gallery", href: "/mandir/gallery" },
    ],
  },
  {
    label: "Contact",
    children: [{ label: "Get Involved", href: "/get-involved" }],
  },
];

const DropdownItem = memo(({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <li>
        <Link
          to={item.href ?? "/"}
          className="block px-4 py-2 text-[#0d3b66] font-semibold hover:text-[#f4a261] transition-colors"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-[#0d3b66] font-semibold hover:text-[#f4a261] transition-colors">
        {item.label}
        <i className="fas fa-chevron-down text-xs mt-0.5" />
      </button>
      {open && (
        <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md min-w-[200px] py-2 z-50">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                to={child.href}
                className="block px-4 py-2 text-[#0d3b66] hover:bg-gray-50 hover:text-[#f4a261] transition-colors text-sm"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

DropdownItem.displayName = "DropdownItem";

export const Navbar = memo(function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "donor"
        ? "/dashboard/donor"
        : "/dashboard/volunteer";

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="Logo" className="h-12 w-12 object-contain rounded-full" />
          <div>
            <h1 className="text-[#0d3b66] font-bold text-lg leading-tight">Bhagwat Heritage</h1>
            <p className="text-xs text-gray-500">Service Foundation Trust</p>
          </div>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => (
              <DropdownItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link to={dashboardPath} className="btn-primary text-sm">
                My Panel
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-[#0d3b66] border border-[#0d3b66] rounded-md hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-sm">
              Donate
            </Link>
          )}
        </div>

        <button
          className="lg:hidden p-2 text-[#0d3b66]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-xl`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-3 space-y-2">
          {NAV_ITEMS.flatMap((item) =>
            item.href
              ? [
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-2 text-[#0d3b66] font-semibold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>,
                ]
              : (item.children ?? []).map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className="block py-1.5 pl-3 text-[#0d3b66] text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))
          )}
          {user ? (
            <button onClick={handleLogout} className="block py-2 text-red-600 font-semibold">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-primary block text-center">
              Login / Donate
            </Link>
          )}
        </div>
      )}
    </header>
  );
});
