import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Briefcase, Inbox, Clock, CheckCircle2, Plus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import type { Application, Opportunity, User } from "../../lib/types";
import { StatCard } from "../../components/offerer/StatCard";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

interface RecentRow {
  application: Application;
  opportunity?: Opportunity;
  student?: User;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ activeOpportunities: 0, totalApplications: 0, pendingReview: 0, approved: 0 });
  const [recent, setRecent] = useState<RecentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([api.getOffererStats(user.id), api.getApplicationsForOfferer(user.id)]).then(
      async ([statsResult, applications]) => {
        setStats(statsResult);
        const sorted = [...applications].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)).slice(0, 6);
        const rows = await Promise.all(
          sorted.map(async (application) => ({
            application,
            opportunity: await api.getOpportunityById(application.opportunityId),
            student: await api.getUserById(application.studentId),
          }))
        );
        setRecent(rows);
        setLoading(false);
      }
    );
  }, [user]);

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#111827] mb-1">Painel Geral</h1>
          <p className="text-[#6b7280]">Bem-vindo(a) de volta, {user?.name}.</p>
        </div>
        <Button asChild size="lg">
          <Link to="/offerer/opportunities/new">
            <Plus className="size-5" />
            Nova Oportunidade
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={Briefcase} label="Vagas ativas" value={stats.activeOpportunities} accent="teal" />
        <StatCard icon={Inbox} label="Candidaturas recebidas" value={stats.totalApplications} accent="coral" />
        <StatCard icon={Clock} label="Pendentes de revisão" value={stats.pendingReview} accent="amber" />
        <StatCard icon={CheckCircle2} label="Aprovados" value={stats.approved} accent="success" />
      </div>

      <div className="rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e5e7eb]">
          <h3 className="text-[#1f2937]">Candidaturas Recentes</h3>
        </div>
        {loading ? (
          <p className="p-6 text-[#6b7280]">Carregando...</p>
        ) : recent.length === 0 ? (
          <p className="p-6 text-[#6b7280]">Nenhuma candidatura recebida ainda.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Vaga</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((row) => (
                <TableRow key={row.application.id}>
                  <TableCell className="font-medium text-[#1f2937]">{row.student?.name ?? "—"}</TableCell>
                  <TableCell className="text-[#6b7280]">{row.opportunity?.title ?? "—"}</TableCell>
                  <TableCell className="text-[#6b7280]">{formatDate(row.application.appliedAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.application.status} />
                  </TableCell>
                  <TableCell>
                    {row.opportunity && (
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/offerer/opportunities/${row.opportunity.id}/candidates/${row.application.id}`}>
                          Revisar
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
