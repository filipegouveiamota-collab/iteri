import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Logo } from "../components/shared/Logo";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <p className="font-heading font-black text-6xl text-teal-500">404</p>
      <h1 className="text-[#111827]">Página não encontrada</h1>
      <p className="text-[#6b7280] max-w-sm">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Button asChild size="lg">
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  );
}
