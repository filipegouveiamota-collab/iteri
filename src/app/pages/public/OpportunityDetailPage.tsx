import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";
import { Check, Bookmark } from "lucide-react";
import * as api from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";
import { CATEGORY_ACTIVITIES, CATEGORY_BENEFITS } from "../../lib/constants";
import type { Application, OffererProfile, Opportunity } from "../../lib/types";
import { CategoryBadge } from "../../components/shared/CategoryBadge";
import { ConfirmDialog } from "../../components/shared/ConfirmDialog";
import { JobCard } from "../../components/shared/JobCard";
import { NewsletterBand } from "../../components/landing/NewsletterBand";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export async function opportunityDetailLoader({ params }: LoaderFunctionArgs) {
  const opportunity = await api.getOpportunityById(params.id!);
  if (!opportunity) throw new Response("Vaga não encontrada", { status: 404 });
  return { opportunity };
}

function formatDate(dateOnly: string): string {
  const [year, month, day] = dateOnly.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function OpportunityDetailPage() {
  const { opportunity } = useLoaderData() as { opportunity: Opportunity };
  const { user } = useAuth();
  const navigate = useNavigate();
  const [existingApplication, setExistingApplication] = useState<Application | null>(null);
  const [checkingApplication, setCheckingApplication] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [offererProfile, setOffererProfile] = useState<OffererProfile | undefined>();
  const [related, setRelated] = useState<Opportunity[]>([]);

  useEffect(() => {
    let active = true;
    if (!user || user.role !== "student") {
      setCheckingApplication(false);
      return;
    }
    api.getApplicationForStudentAndOpportunity(user.id, opportunity.id).then((app) => {
      if (active) {
        setExistingApplication(app ?? null);
        setCheckingApplication(false);
      }
    });
    return () => {
      active = false;
    };
  }, [user, opportunity.id]);

  useEffect(() => {
    api.getOffererProfile(opportunity.offererId).then(setOffererProfile);
    api.getOpportunities({ category: opportunity.category }).then((list) =>
      setRelated(list.filter((o) => o.id !== opportunity.id).slice(0, 3))
    );
  }, [opportunity.offererId, opportunity.category, opportunity.id]);

  const isFilled = opportunity.status === "closed";
  const isOwner = user?.role === "offerer" && user.id === opportunity.offererId;

  const handleApplyClick = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/opportunities/${opportunity.id}`)}`);
      return;
    }
    setConfirmOpen(true);
  };

  const confirmApply = async () => {
    if (!user) return;
    setApplying(true);
    try {
      const application = await api.applyToOpportunity(opportunity.id, user.id);
      setExistingApplication(application);
      toast.success("Candidatura enviada com sucesso!");
    } finally {
      setApplying(false);
      setConfirmOpen(false);
    }
  };

  const payLabel = `R$ ${opportunity.payRate.toFixed(2).replace(".", ",")}${
    opportunity.payType === "month" ? "/mês" : "/hora"
  }`;

  const checklist = [
    `${payLabel} · ${opportunity.workload}`,
    `Início: ${formatDate(opportunity.startDate)}`,
    `Prazo de candidatura: ${formatDate(opportunity.applicationDeadline)}`,
    `Universidade: ${opportunity.university}`,
    `Publicado por: ${opportunity.offererName}`,
  ];

  const stats: { label: string; value: string }[] = [
    { label: "Carga Horária", value: opportunity.workload },
    { label: "Remuneração", value: payLabel },
    { label: "Início", value: formatDate(opportunity.startDate) },
    { label: "Prazo de Candidatura", value: formatDate(opportunity.applicationDeadline) },
  ];
  if (opportunity.minCR) stats.push({ label: "CR Mínimo", value: opportunity.minCR.toFixed(1) });
  if (opportunity.requiredCourse) stats.push({ label: "Curso Exigido", value: opportunity.requiredCourse });

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/student/feed">Feed</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/student/feed?category=${encodeURIComponent(opportunity.category)}`}>
                {opportunity.category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{opportunity.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {isOwner && (
        <div className="mb-6 rounded-xl bg-teal-50 border border-teal-300 px-4 py-3 text-sm text-teal-700">
          Você está vendo a prévia pública desta vaga.{" "}
          <Link to={`/offerer/opportunities/${opportunity.id}/candidates`} className="font-semibold underline">
            Ver candidatos
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 mb-10">
        <div className="rounded-2xl overflow-hidden h-[280px] lg:h-full">
          <ImageWithFallback src={opportunity.image} alt={opportunity.title} className="size-full object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <CategoryBadge category={opportunity.category} />
          <h1 className="text-[#111827]">{opportunity.title}</h1>
          <p className="text-[#6b7280]">
            {opportunity.offererName} — {opportunity.university}
          </p>

          <ul className="flex flex-col gap-2 border-t border-b border-[#e5e7eb] py-4">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#4b5563]">
                <Check className="size-4 text-teal-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {!isOwner && (
            <div className="flex flex-col sm:flex-row gap-3">
              {isFilled ? (
                <Button size="lg" disabled className="flex-1">
                  Vaga Preenchida
                </Button>
              ) : existingApplication ? (
                <Button size="lg" disabled className="flex-1 bg-success-fg hover:bg-success-fg">
                  Candidatura Enviada
                </Button>
              ) : (
                <Button size="lg" className="flex-1" onClick={handleApplyClick} disabled={checkingApplication}>
                  Candidatar-se Agora
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setSaved((s) => !s);
                  toast.success(saved ? "Vaga removida dos salvos." : "Vaga salva!");
                }}
              >
                <Bookmark className={saved ? "fill-current" : undefined} />
                {saved ? "Vaga Salva" : "Salvar Vaga"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="requirements">Requisitos</TabsTrigger>
          <TabsTrigger value="department">Sobre o Departamento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8 flex flex-col gap-10">
          <div>
            <h3 className="text-[#1f2937] mb-3">Sobre a Vaga</h3>
            <p className="text-[#4b5563] leading-relaxed whitespace-pre-line">{opportunity.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 rounded-2xl bg-[#f9fafb] p-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs text-[#6b7280] uppercase tracking-wide">{stat.label}</p>
                <p className="font-semibold text-[#1f2937] mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#1f2937] mb-3">Atividades</h3>
              <ul className="flex flex-col gap-2">
                {CATEGORY_ACTIVITIES[opportunity.category].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4b5563]">
                    <span className="size-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#1f2937] mb-3">Benefícios</h3>
              <ul className="flex flex-col gap-2">
                {CATEGORY_BENEFITS[opportunity.category].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4b5563]">
                    <span className="size-1.5 rounded-full bg-coral-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="mt-8">
          {opportunity.requiredSkills.length > 0 && (
            <div className="flex flex-col gap-4 mb-6">
              {opportunity.requiredSkills.some((s) => s.mandatory) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-2">
                    Habilidades obrigatórias
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requiredSkills
                      .filter((s) => s.mandatory)
                      .map((s) => (
                        <span
                          key={s.skill}
                          className="rounded-full bg-coral-50 px-3 py-1.5 text-sm text-coral-700"
                        >
                          {s.skill}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              {opportunity.requiredSkills.some((s) => !s.mandatory) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280] mb-2">
                    Diferenciais
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requiredSkills
                      .filter((s) => !s.mandatory)
                      .map((s) => (
                        <span key={s.skill} className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm text-[#4b5563]">
                          {s.skill}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {opportunity.minCR && (
              <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm text-[#4b5563]">
                CR mínimo: {opportunity.minCR}
              </span>
            )}
            {opportunity.requiredCourse && (
              <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm text-[#4b5563]">
                {opportunity.requiredCourse}
              </span>
            )}
            {opportunity.requiredSemester && (
              <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm text-[#4b5563]">
                {opportunity.requiredSemester}
              </span>
            )}
          </div>
          {opportunity.otherNotes && (
            <p className="text-sm text-[#4b5563] mt-4 leading-relaxed">{opportunity.otherNotes}</p>
          )}
        </TabsContent>

        <TabsContent value="department" className="mt-8">
          <div className="rounded-2xl border border-[#e5e7eb] p-6 max-w-xl">
            <p className="font-semibold text-[#1f2937] mb-1">
              {offererProfile?.department || opportunity.offererName}
            </p>
            <p className="text-sm text-[#6b7280] mb-4">{opportunity.university}</p>
            {offererProfile?.unitDescription && (
              <p className="text-sm text-[#4b5563] leading-relaxed mb-4">{offererProfile.unitDescription}</p>
            )}
            {offererProfile?.contactEmail && (
              <p className="text-sm text-[#4b5563]">Contato: {offererProfile.contactEmail}</p>
            )}
            {offererProfile?.contactPhone && (
              <p className="text-sm text-[#4b5563]">{offererProfile.contactPhone}</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {related.length > 0 && (
        <div className="mt-16">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-500 mb-2">Oportunidades Relacionadas</p>
          <h2 className="text-[#111827] mb-8">Vagas Recomendadas para Você</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((o) => (
              <JobCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Confirmar candidatura"
        description={`Deseja enviar sua candidatura para "${opportunity.title}"? O ofertante poderá ver seu perfil acadêmico.`}
        confirmLabel={applying ? "Enviando..." : "Confirmar candidatura"}
        onConfirm={confirmApply}
      />

      <div className="mt-16 -mx-6 lg:-mx-20">
        <NewsletterBand
          title="Receba novas vagas por email"
          subtitle="Receba alertas de novas publicações diretamente no seu email universitário cadastrado."
        />
      </div>
    </div>
  );
}
