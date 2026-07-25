import { UserPlus, Search, MousePointerClick } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "Crie seu perfil", description: "Cadastre seus dados acadêmicos, habilidades e experiências em minutos." },
  { icon: Search, title: "Explore oportunidades", description: "Filtre vagas por categoria, área do conhecimento e remuneração." },
  { icon: MousePointerClick, title: "Candidate-se em 1 clique", description: "Envie sua candidatura direto pelo seu perfil, sem burocracia." },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="max-w-[1280px] mx-auto px-6 lg:px-20 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-500 mb-2 text-center">Como Funciona</p>
      <h2 className="text-center text-[#111827] mb-10">Três passos para sua próxima oportunidade</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STEPS.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center text-center gap-3">
            <div className="flex items-center justify-center size-14 rounded-full bg-teal-50 text-teal-500">
              <step.icon className="size-6" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold text-teal-500">PASSO {index + 1}</p>
            <h3 className="text-[#1f2937]">{step.title}</h3>
            <p className="text-sm text-[#6b7280] max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
