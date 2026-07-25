import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/shared/Logo";
import { Footer } from "../components/shared/Footer";
import { NotificationSheet } from "../components/shared/NotificationSheet";
import { Button } from "../components/ui/button";

function PublicNavbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-40">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-20 py-4">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#6b7280]">
          <Link to="/#como-funciona" className="hover:text-teal-500 transition-colors">
            Como Funciona
          </Link>
          <Link to="/register/student" className="hover:text-teal-500 transition-colors">
            Para Estudantes
          </Link>
          <Link to="/register/offerer" className="hover:text-teal-500 transition-colors">
            Para Universidades
          </Link>
          <Link to="/#sobre" className="hover:text-teal-500 transition-colors">
            Sobre Nós
          </Link>
        </nav>
        {user ? (
          <div className="flex items-center gap-4">
            <NotificationSheet />
            <Button asChild size="sm">
              <Link to={user.role === "student" ? "/student/feed" : "/offerer/dashboard"}>
                {user.role === "student" ? "Ir para o Feed" : "Ir para o Painel"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-[#6b7280] hover:text-teal-500 transition-colors">
              Entrar
            </Link>
            <Button asChild size="sm">
              <Link to="/register">Criar Conta</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [location.pathname, location.hash]);
}

export default function PublicLayout() {
  useScrollToHash();

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
