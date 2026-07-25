import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import type { Opportunity } from "../../lib/types";
import { OpportunityRow } from "../../components/offerer/OpportunityRow";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../components/ui/table";

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applicationCounts, setApplicationCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const refetch = () => {
    if (!user) return;
    Promise.all([api.getOpportunitiesByOfferer(user.id), api.getApplicationCountsByOfferer(user.id)]).then(
      ([list, counts]) => {
        setOpportunities(list);
        setApplicationCounts(counts);
        setLoading(false);
      }
    );
  };

  useEffect(refetch, [user]);

  const handleClose = async (id: string) => {
    await api.setOpportunityStatus(id, "closed");
    refetch();
  };

  const handleRepublish = async (id: string) => {
    await api.setOpportunityStatus(id, "active");
    refetch();
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[#111827]">Minhas Vagas</h1>
        <Button asChild size="lg">
          <Link to="/offerer/opportunities/new">
            <Plus className="size-5" />
            Nova Oportunidade
          </Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-[#6b7280]">Carregando...</p>
      ) : opportunities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#e5e7eb] py-16 text-center">
          <p className="text-[#1f2937] font-semibold mb-1">Você ainda não publicou nenhuma vaga</p>
          <p className="text-sm text-[#6b7280] mb-4">Publique sua primeira oportunidade para começar a receber candidaturas.</p>
          <Button asChild>
            <Link to="/offerer/opportunities/new">Nova Oportunidade</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Candidaturas</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opportunity) => (
                <OpportunityRow
                  key={opportunity.id}
                  opportunity={opportunity}
                  applicationCount={applicationCounts[opportunity.id] ?? 0}
                  onClose={handleClose}
                  onRepublish={handleRepublish}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
