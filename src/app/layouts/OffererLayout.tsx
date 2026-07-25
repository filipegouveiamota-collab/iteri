import { LayoutDashboard, Briefcase, Users, FileText } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/shared/Logo";
import { NotificationSheet } from "../components/shared/NotificationSheet";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const NAV_ITEMS = [
  { to: "/offerer/dashboard", label: "Painel Geral", icon: LayoutDashboard },
  { to: "/offerer/opportunities", label: "Vagas Ativas", icon: Briefcase },
  { to: "/offerer/opportunities", label: "Candidaturas", icon: Users },
];

export default function OffererLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      <aside className="hidden md:flex w-[280px] shrink-0 flex-col justify-between bg-white border-r border-[#e5e7eb] p-6">
        <div className="flex flex-col gap-8">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/offerer/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-teal-50 text-teal-500" : "text-[#6b7280] hover:bg-[#f9fafb]"
                  }`
                }
              >
                <item.icon className="size-[18px]" strokeWidth={2} />
                {item.label}
              </NavLink>
            ))}
            <span className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#9ca3af] cursor-not-allowed">
              <FileText className="size-[18px]" strokeWidth={2} />
              Documentos
            </span>
          </nav>
        </div>
        <Link
          to="/offerer/profile"
          className="pt-4 border-t border-[#e5e7eb] flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar className="size-9">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-[#1f2937]">{user?.name}</p>
          </div>
        </Link>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6 lg:px-10 py-4">
          <Link to="/" className="md:hidden">
            <Logo />
          </Link>
          <span className="hidden md:block" />
          <NotificationSheet />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
