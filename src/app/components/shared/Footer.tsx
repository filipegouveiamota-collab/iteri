import { Link } from "react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#1f2937] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="max-w-[320px] flex flex-col gap-4">
            <Logo dark />
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Conectando talentos universitários a demandas reais das instituições de ensino no Brasil.
            </p>
            <div>
              <h4 className="text-white text-sm font-bold mb-2">Fale Conosco</h4>
              <p className="text-sm text-[#9ca3af]">suporte@iteri.com.br</p>
              <p className="text-sm text-[#9ca3af]">(19) 3521-7000</p>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-4">Estudantes</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li><Link to="/student/feed" className="hover:text-white transition-colors">Buscar Oportunidades</Link></li>
              <li><Link to="/#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
              <li><Link to="/#sobre" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold mb-4">Universidades</h4>
            <ul className="flex flex-col gap-3 text-sm text-[#9ca3af]">
              <li><Link to="/register/offerer" className="hover:text-white transition-colors">Publicar Oportunidade</Link></li>
              <li><Link to="/register/offerer" className="hover:text-white transition-colors">Convênios de Parceria</Link></li>
              <li><Link to="/register/offerer" className="hover:text-white transition-colors">Soluções de Renda</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[#2d3748] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#9ca3af]">
          <p>© {new Date().getFullYear()} ITERI. Todos os direitos reservados.</p>
          <p className="text-teal-500 font-medium">Teal &amp; Coral — Conexão Universitária</p>
        </div>
      </div>
    </footer>
  );
}
