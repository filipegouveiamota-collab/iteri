import { useState } from "react";
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";
import * as api from "../../lib/api";
import type { Application, Opportunity, StudentProfile, User } from "../../lib/types";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";

export async function candidateProfileLoader({ params }: LoaderFunctionArgs) {
  const [opportunity, application] = await Promise.all([
    api.getOpportunityById(params.id!),
    api.getApplicationById(params.candidateId!),
  ]);
  if (!opportunity || !application) throw new Response("Candidatura não encontrada", { status: 404 });
  const [student, profile] = await Promise.all([
    api.getUserById(application.studentId),
    api.getStudentProfile(application.studentId),
  ]);
  return { opportunity, application, student, profile };
}

export default function CandidateProfilePage() {
  const { opportunity, application, student, profile } = useLoaderData() as {
    opportunity: Opportunity;
    application: Application;
    student?: User;
    profile?: StudentProfile;
  };
  const navigate = useNavigate();
  const [status, setLocalStatus] = useState(application.status);
  const [updating, setUpdating] = useState(false);

  const handleDecision = async (next: "approved" | "rejected") => {
    setUpdating(true);
    try {
      await api.updateApplicationStatus(application.id, next);
      setLocalStatus(next);
      toast.success(next === "approved" ? "Candidatura aprovada!" : "Candidatura rejeitada.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-28">
      <button onClick={() => navigate(-1)} className="text-sm text-[#6b7280] hover:text-teal-500 mb-6">
        ← Voltar
      </button>

      <div className="flex items-center gap-4 mb-8">
        <Avatar className="size-16">
          <AvatarImage src={profile?.photo || student?.avatar} alt={student?.name} />
          <AvatarFallback>{student?.name?.[0] ?? "?"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-[#111827]">{student?.name}</h1>
          <p className="text-[#6b7280]">
            {profile?.course} · {profile?.university}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>

      <p className="text-sm text-[#6b7280] mb-6">
        Candidatura para <span className="font-semibold text-[#1f2937]">{opportunity.title}</span>
      </p>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 mb-6">
        <h3 className="text-[#1f2937] mb-4">Dados Acadêmicos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[#6b7280]">CR</p>
            <p className="font-semibold text-[#1f2937]">{profile?.cr?.toFixed(1) ?? "—"}</p>
          </div>
          <div>
            <p className="text-[#6b7280]">Semestre</p>
            <p className="font-semibold text-[#1f2937]">{profile?.semester ?? "—"}</p>
          </div>
          <div>
            <p className="text-[#6b7280]">Matrícula</p>
            <p className="font-semibold text-[#1f2937]">{profile?.registration ?? "—"}</p>
          </div>
          <div>
            <p className="text-[#6b7280]">LinkedIn</p>
            <p className="font-semibold text-[#1f2937]">{profile?.linkedin ? "Disponível" : "—"}</p>
          </div>
        </div>
      </section>

      {profile?.bio && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 mb-6">
          <h3 className="text-[#1f2937] mb-3">Bio</h3>
          <p className="text-[#4b5563] leading-relaxed">{profile.bio}</p>
        </section>
      )}

      {profile?.skills && profile.skills.length > 0 && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 mb-6">
          <h3 className="text-[#1f2937] mb-3">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {profile?.languages && profile.languages.length > 0 && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 mb-6">
          <h3 className="text-[#1f2937] mb-3">Idiomas</h3>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang, i) => (
              <span key={i} className="rounded-full bg-[#f3f4f6] px-3 py-1 text-sm text-[#4b5563]">
                {lang.language} · {lang.level}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] px-6 py-4 flex justify-end gap-3">
        <Button variant="outline" asChild>
          <a href={`mailto:${student?.email}`}>Entrar em Contato</a>
        </Button>
        <Button variant="destructive" disabled={status !== "pending" || updating} onClick={() => handleDecision("rejected")}>
          Rejeitar
        </Button>
        <Button disabled={status !== "pending" || updating} onClick={() => handleDecision("approved")}>
          Aprovar Candidatura
        </Button>
      </div>
    </div>
  );
}
