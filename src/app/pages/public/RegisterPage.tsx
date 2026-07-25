import { GraduationCap, Building2 } from "lucide-react";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-center text-[#111827] mb-2">Criar Conta</h1>
      <p className="text-center text-[#6b7280] mb-10">Como você quer usar a ITERI?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/register/student"
          className="flex flex-col items-center gap-4 rounded-2xl border-2 border-[#e5e7eb] hover:border-teal-500 bg-white p-8 text-center transition-colors"
        >
          <div className="flex items-center justify-center size-16 rounded-full bg-teal-50 text-teal-500">
            <GraduationCap className="size-8" strokeWidth={2} />
          </div>
          <h3 className="text-[#1f2937]">Sou Estudante</h3>
          <p className="text-sm text-[#6b7280]">
            Quero encontrar monitorias, iniciação científica, eventos e vagas em laboratórios.
          </p>
        </Link>

        <Link
          to="/register/offerer"
          className="flex flex-col items-center gap-4 rounded-2xl border-2 border-[#e5e7eb] hover:border-teal-500 bg-white p-8 text-center transition-colors"
        >
          <div className="flex items-center justify-center size-16 rounded-full bg-coral-50 text-coral-500">
            <Building2 className="size-8" strokeWidth={2} />
          </div>
          <h3 className="text-[#1f2937]">Sou Professor/Coordenador</h3>
          <p className="text-sm text-[#6b7280]">
            Quero publicar oportunidades e gerenciar candidaturas de estudantes.
          </p>
        </Link>
      </div>

      <p className="mt-10 text-center text-sm text-[#6b7280]">
        Já tem conta?{" "}
        <Link to="/login" className="text-teal-500 font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
