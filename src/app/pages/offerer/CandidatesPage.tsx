import { useMemo, useState } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";
import * as api from "../../lib/api";
import type { Opportunity } from "../../lib/types";
import { useCandidatesForOpportunity } from "../../hooks/useCandidates";
import { CandidateRow } from "../../components/offerer/CandidateRow";
import { CategoryBadge } from "../../components/shared/CategoryBadge";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export async function candidatesLoader({ params }: LoaderFunctionArgs) {
  const opportunity = await api.getOpportunityById(params.id!);
  if (!opportunity) throw new Response("Vaga não encontrada", { status: 404 });
  return { opportunity };
}

const TABS = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendente" },
  { value: "approved", label: "Aprovados" },
  { value: "rejected", label: "Rejeitados" },
];

export default function CandidatesPage() {
  const { opportunity } = useLoaderData() as { opportunity: Opportunity };
  const { candidates, setStatus } = useCandidatesForOpportunity(opportunity.id);
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(
    () => (tab === "all" ? candidates : candidates.filter((c) => c.status === tab)),
    [candidates, tab]
  );

  const toggleSelect = (id: string, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const bulkAction = async (status: "approved" | "rejected") => {
    await Promise.all(selected.map((id) => setStatus(id, status)));
    setSelected([]);
    toast.success(status === "approved" ? "Candidaturas aprovadas!" : "Candidaturas rejeitadas.");
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <CategoryBadge category={opportunity.category} />
          </div>
          <h1 className="text-[#111827]">{opportunity.title}</h1>
          <p className="text-[#6b7280]">{opportunity.university} · {candidates.length} candidatura(s)</p>
        </div>
        {selected.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={() => bulkAction("approved")}>Aprovar selecionados ({selected.length})</Button>
            <Button variant="destructive" onClick={() => bulkAction("rejected")}>
              Rejeitar selecionados
            </Button>
          </div>
        )}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab} className="mt-6">
          {filtered.length === 0 ? (
            <p className="text-[#6b7280] py-12 text-center">Nenhum candidato nesta categoria.</p>
          ) : (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead>Nome</TableHead>
                    <TableHead>Universidade</TableHead>
                    <TableHead>CR</TableHead>
                    <TableHead>Habilidades</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((candidate) => (
                    <CandidateRow
                      key={candidate.id}
                      candidate={candidate}
                      opportunityId={opportunity.id}
                      selected={selected.includes(candidate.id)}
                      onToggleSelect={(checked) => toggleSelect(candidate.id, checked)}
                      onApprove={async () => {
                        await setStatus(candidate.id, "approved");
                        toast.success("Candidatura aprovada!");
                      }}
                      onReject={async () => {
                        await setStatus(candidate.id, "rejected");
                        toast.success("Candidatura rejeitada.");
                      }}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
