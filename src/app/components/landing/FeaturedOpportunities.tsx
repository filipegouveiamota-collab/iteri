import { useEffect, useState } from "react";
import * as api from "../../lib/api";
import type { Opportunity } from "../../lib/types";
import { JobCard } from "../shared/JobCard";

export function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    api.getOpportunities({ sort: "recent" }).then((list) =>
      setOpportunities(list.filter((o) => o.status === "active").slice(0, 3))
    );
  }, []);

  if (opportunities.length === 0) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-20 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-teal-500 mb-2">Seção 02</p>
      <h2 className="text-[#111827] mb-2">Oportunidades em Destaque</h2>
      <p className="text-[#6b7280] mb-8">Vagas recomendadas com inscrições abertas esta semana.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <JobCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}
