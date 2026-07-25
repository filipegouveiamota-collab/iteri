import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useApplications, type ApplicationWithOpportunity } from "../../hooks/useApplications";
import { ApplicationRow } from "../../components/student/ApplicationRow";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { APPLICATION_STATUS_LABELS } from "../../lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../components/ui/sheet";

const TABS = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Em Análise" },
  { value: "approved", label: "Aprovadas" },
  { value: "rejected", label: "Rejeitadas" },
];

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function ApplicationsPage() {
  const { user } = useAuth();
  const { applications, loading } = useApplications(user?.id);
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<ApplicationWithOpportunity | null>(null);

  const filtered = tab === "all" ? applications : applications.filter((a) => a.status === tab);

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-10">
      <h1 className="text-[#111827] mb-6">Minhas Candidaturas</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-6">
          {loading ? (
            <p className="text-[#6b7280]">Carregando...</p>
          ) : filtered.length === 0 ? (
            <p className="text-[#6b7280] py-12 text-center">Nenhuma candidatura nesta categoria.</p>
          ) : (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vaga</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Instituição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((application) => (
                    <ApplicationRow
                      key={application.id}
                      application={application}
                      onClick={() => setSelected(application)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selected?.opportunity?.title}</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="px-4 pb-4 flex flex-col gap-6">
              <StatusBadge status={selected.status} className="w-fit" />
              <div className="flex flex-col gap-4">
                {selected.timeline.map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="size-2.5 rounded-full bg-teal-500" />
                      {i < selected.timeline.length - 1 && <span className="w-px flex-1 bg-[#e5e7eb]" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-[#1f2937]">
                        {APPLICATION_STATUS_LABELS[entry.status] ?? entry.status}
                      </p>
                      <p className="text-xs text-[#6b7280]">{formatDateTime(entry.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
