import { MousePointerClick, FileText, ShieldCheck, Award } from "lucide-react";

const FEATURES = [
  {
    icon: MousePointerClick,
    title: "Candidatura em 1 Clique",
    description: "Use seu perfil universitário integrado para se candidatar sem burocracias desnecessárias.",
  },
  {
    icon: FileText,
    title: "Currículo Reutilizável",
    description: "Suas notas e CR oficiais do sistema são atualizados automaticamente na sua ficha de inscrição.",
  },
  {
    icon: ShieldCheck,
    title: "Vagas Verificadas",
    description: "Garantia de que todas as vagas de fomento e IC listadas pertencem a órgãos oficiais do campus.",
  },
  {
    icon: Award,
    title: "100% Gratuito para Alunos",
    description: "Não cobramos nenhuma taxa para estudantes se candidatarem ou assinarem o boletim de vagas.",
  },
];

export function WhyChooseSection() {
  return (
    <section id="sobre" className="max-w-[1280px] mx-auto px-6 lg:px-20 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-500 mb-2">Seção 03</p>
      <h2 className="text-[#111827] mb-2">Por que escolher o ITERI?</h2>
      <p className="text-[#6b7280] mb-8">
        Desenhamos uma plataforma pensada exclusivamente para a rotina do estudante universitário.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-3 rounded-2xl bg-white border border-[#e5e7eb] p-6">
            <div className="flex items-center justify-center size-10 rounded-lg bg-teal-50 text-teal-500">
              <feature.icon className="size-5" strokeWidth={2} />
            </div>
            <h3 className="text-[#1f2937]">{feature.title}</h3>
            <p className="text-sm text-[#6b7280]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
