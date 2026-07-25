import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { DEFAULT_KNOWLEDGE_AREA_BY_CATEGORY } from "../../lib/constants";
import { OpportunityForm, type OpportunityDraft } from "../../components/offerer/OpportunityForm";

export default function NewOpportunityPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (draft: OpportunityDraft, publish: boolean) => {
    if (!user) return;
    setSubmitting(true);
    try {
      const profile = await api.getOffererProfile(user.id);
      await api.createOpportunity({
        ...draft,
        knowledgeArea: DEFAULT_KNOWLEDGE_AREA_BY_CATEGORY[draft.category],
        status: publish ? "active" : "draft",
        isNew: true,
        isUrgent: false,
        offererId: user.id,
        offererName: user.name,
        university: profile?.university ?? "",
      });
      toast.success(publish ? "Vaga publicada com sucesso!" : "Vaga salva como rascunho.");
      navigate("/offerer/opportunities");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
      <h1 className="text-[#111827] mb-8">Publicar Vaga</h1>
      <OpportunityForm submitting={submitting} onSubmit={handleSubmit} />
    </div>
  );
}
