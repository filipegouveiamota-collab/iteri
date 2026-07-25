import { Link, NavLink, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/shared/Logo";
import { Footer } from "../components/shared/Footer";
import { NotificationSheet } from "../components/shared/NotificationSheet";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const NAV_LINKS = [
  { to: "/student/feed", label: "Explorar Vagas" },
  { to: "/student/applications", label: "Candidaturas" },
  { to: "/student/profile", label: "Perfil Acadêmico" },
];

export default function StudentLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-20 py-4">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[15px]">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "font-semibold text-teal-500" : "font-medium text-[#6b7280] hover:text-teal-500 transition-colors"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <NotificationSheet />
            <Link to="/student/profile" className="flex items-center gap-2.5">
              <Avatar className="size-9">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-semibold text-[#1f2937]">{user?.name}</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
