import { useState } from "react";
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";
import * as api from "../../lib/api";
import type { Opportunity } from "../../lib/types";
import { OpportunityForm, type OpportunityDraft } from "../../components/offerer/OpportunityForm";

export async function editOpportunityLoader({ params }: LoaderFunctionArgs) {
  const opportunity = await api.getOpportunityById(params.id!);
  if (!opportunity) throw new Response("Vaga não encontrada", { status: 404 });
  const applications = await api.getApplicationsForOpportunity(opportunity.id);
  return { opportunity, applicationCount: applications.length };
}

export default function EditOpportunityPage() {
  const { opportunity, applicationCount } = useLoaderData() as {
    opportunity: Opportunity;
    applicationCount: number;
  };
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (draft: OpportunityDraft, publish: boolean) => {
    setSubmitting(true);
    try {
      await api.updateOpportunity(opportunity.id, { ...draft, status: publish ? "active" : "draft" });
      toast.success("Vaga atualizada com sucesso!");
      navigate("/offerer/opportunities");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <h1 className="text-[#111827] mb-8">Editar Vaga</h1>
      <OpportunityForm
        initial={opportunity}
        initialPublished={opportunity.status !== "draft"}
        submitting={submitting}
        submitLabel="Salvar alterações"
        impactWarning={
          applicationCount > 0
            ? `Esta vaga já recebeu ${applicationCount} candidatura(s). Alterações nos requisitos podem impactar candidatos já inscritos.`
            : undefined
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
}
