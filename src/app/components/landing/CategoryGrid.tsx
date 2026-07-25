import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, ChartColumn, Calendar, Layers } from "lucide-react";
import * as api from "../../lib/api";
import { OPPORTUNITY_CATEGORIES } from "../../lib/constants";
import type { OpportunityCategory } from "../../lib/types";

const CATEGORY_META: Record<
  OpportunityCategory,
  { icon: typeof BookOpen; description: string; iconBg: string; iconFg: string }
> = {
  Monitoria: {
    icon: BookOpen,
    description: "Ajude alunos de períodos anteriores em disciplinas práticas ou teóricas.",
    iconBg: "bg-teal-50",
    iconFg: "text-teal-500",
  },
  "Iniciação Científica": {
    icon: ChartColumn,
    description: "Pesquise ao lado de doutores e mestres com fomento institucional.",
    iconBg: "bg-coral-50",
    iconFg: "text-coral-500",
  },
  Eventos: {
    icon: Calendar,
    description: "Participe do staff de congressos, simpósios e feiras acadêmicas.",
    iconBg: "bg-amber-50",
    iconFg: "text-amber-700",
  },
  Laboratórios: {
    icon: Layers,
    description: "Apoie na manutenção técnica de laboratórios de informática ou ciências.",
    iconBg: "bg-purple-50",
    iconFg: "text-purple-500",
  },
};

export function CategoryGrid() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    api.getOpportunities().then((list) => {
      const next: Record<string, number> = {};
      for (const category of OPPORTUNITY_CATEGORIES) {
        next[category] = list.filter((o) => o.category === category && o.status === "active").length;
      }
      setCounts(next);
    });
  }, []);

  return (
    <section id="categorias" className="bg-[#f9fafb] py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-500 mb-2">Seção 01</p>
        <h2 className="text-[#111827] mb-2">Explore por Categoria</h2>
        <p className="text-[#6b7280] mb-8">Navegue entre os diferentes tipos de frentes de trabalho acadêmico disponíveis.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {OPPORTUNITY_CATEGORIES.map((category) => {
            const meta = CATEGORY_META[category];
            return (
              <Link
                key={category}
                to={`/student/feed?category=${encodeURIComponent(category)}`}
                className="flex flex-col gap-3 rounded-2xl bg-white border border-[#e5e7eb] p-6 transition-shadow hover:shadow-md"
              >
                <div className={`flex items-center justify-center size-10 rounded-lg ${meta.iconBg} ${meta.iconFg}`}>
                  <meta.icon className="size-5" strokeWidth={2} />
                </div>
                <h3 className="text-[#1f2937]">{category}</h3>
                <p className="text-sm text-[#6b7280]">{meta.description}</p>
                <p className="text-sm font-semibold text-teal-500 mt-auto">
                  {counts[category] ?? 0} vagas disponíveis
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
