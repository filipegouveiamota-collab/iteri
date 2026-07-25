import { Search } from "lucide-react";
import { KNOWLEDGE_AREAS, OPPORTUNITY_CATEGORIES } from "../../lib/constants";
import type { OpportunityFilters } from "../../lib/api";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../ui/utils";

export function SearchFilterBar({
  filters,
  onChange,
  categoryCounts,
  knowledgeAreaCounts,
}: {
  filters: OpportunityFilters;
  onChange: (filters: OpportunityFilters) => void;
  categoryCounts: Record<string, number>;
  knowledgeAreaCounts: Record<string, number>;
}) {
  const toggleKnowledgeArea = (area: string, checked: boolean) => {
    const current = filters.knowledgeAreas ?? [];
    onChange({
      ...filters,
      knowledgeAreas: checked ? [...current, area] : current.filter((a) => a !== area),
    });
  };

  return (
    <aside className="flex flex-col gap-6 w-full lg:w-[260px] shrink-0">
      <div>
        <h4 className="text-sm font-semibold text-[#1f2937] mb-3">Busca Rápida</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af]" />
          <Input
            placeholder="Ex: Monitoria de Cálculo..."
            className="pl-9"
            value={filters.search ?? ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-[#1f2937] mb-3">Categorias</h4>
        <div className="flex flex-col gap-1">
          {OPPORTUNITY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                onChange({ ...filters, category: filters.category === category ? undefined : category })
              }
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-left transition-colors",
                filters.category === category
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "text-[#6b7280] hover:bg-[#f9fafb]"
              )}
            >
              <span>{category}</span>
              <span>({categoryCounts[category] ?? 0})</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-[#1f2937] mb-3">Área do Conhecimento</h4>
        <div className="flex flex-col gap-3">
          {KNOWLEDGE_AREAS.map((area) => (
            <label key={area} className="flex items-center gap-2.5 text-sm text-[#4b5563] cursor-pointer">
              <Checkbox
                checked={(filters.knowledgeAreas ?? []).includes(area)}
                onCheckedChange={(checked) => toggleKnowledgeArea(area, !!checked)}
              />
              <span>
                {area} ({knowledgeAreaCounts[area] ?? 0})
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
