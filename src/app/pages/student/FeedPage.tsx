import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { SearchX } from "lucide-react";
import * as api from "../../lib/api";
import { useOpportunities } from "../../hooks/useOpportunities";
import type { OpportunityFilters } from "../../lib/api";
import { OPPORTUNITY_CATEGORIES, KNOWLEDGE_AREAS } from "../../lib/constants";
import type { Opportunity } from "../../lib/types";
import { SearchFilterBar } from "../../components/shared/SearchFilterBar";
import { JobCard } from "../../components/shared/JobCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const PAGE_SIZE = 6;

export default function FeedPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<OpportunityFilters>({
    category: searchParams.get("category") ?? undefined,
  });
  const { opportunities, loading } = useOpportunities(filters);
  const [allActive, setAllActive] = useState<Opportunity[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.getOpportunities().then((list) => setAllActive(list.filter((o) => o.status === "active")));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const category of OPPORTUNITY_CATEGORIES) {
      counts[category] = allActive.filter((o) => o.category === category).length;
    }
    return counts;
  }, [allActive]);

  const knowledgeAreaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const area of KNOWLEDGE_AREAS) {
      counts[area] = allActive.filter((o) => o.knowledgeArea === area).length;
    }
    return counts;
  }, [allActive]);

  const totalPages = Math.max(1, Math.ceil(opportunities.length / PAGE_SIZE));
  const pageItems = opportunities.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
        <div>
          <h1 className="text-[#111827] mb-1">Oportunidades Disponíveis</h1>
          <p className="text-[#6b7280]">Encontre a vaga ideal para conciliar com sua rotina de estudos.</p>
        </div>
        <p className="text-sm text-[#6b7280]">
          Mostrando <span className="font-semibold text-[#1f2937]">{pageItems.length}</span> de{" "}
          <span className="font-semibold text-[#1f2937]">{opportunities.length}</span> vagas
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <SearchFilterBar
          filters={filters}
          onChange={setFilters}
          categoryCounts={categoryCounts}
          knowledgeAreaCounts={knowledgeAreaCounts}
        />

        <div className="flex-1">
          {loading ? (
            <p className="text-[#6b7280]">Carregando oportunidades...</p>
          ) : opportunities.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <SearchX className="size-10 text-[#9ca3af]" strokeWidth={1.5} />
              <p className="text-[#1f2937] font-semibold">Nenhuma oportunidade encontrada</p>
              <p className="text-sm text-[#6b7280]">Tente ajustar os filtros de busca.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pageItems.map((opportunity) => (
                  <JobCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-10 justify-start">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.max(1, p - 1));
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((p) => Math.min(totalPages, p + 1));
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
