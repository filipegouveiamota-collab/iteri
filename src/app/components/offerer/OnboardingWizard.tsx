import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { UNIVERSITIES } from "../../lib/constants";
import type { OffererProfile } from "../../lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const STEP_TITLES = ["Perfil Institucional", "Contato"];

export function OffererOnboardingWizard() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState<Omit<OffererProfile, "userId">>({
    roleTitle: "Professor",
    university: "",
    department: "",
    siape: "",
    unitName: "",
    unitLogo: "",
    unitDescription: "",
    contactEmail: user?.email ?? "",
    contactPhone: "",
    departmentUrl: "",
  });

  useEffect(() => {
    if (!user) return;
    api.getOffererProfile(user.id).then((existing) => {
      if (existing) {
        const { userId, ...rest } = existing;
        setProfile((prev) => ({ ...prev, ...rest }));
      }
      setLoading(false);
    });
  }, [user]);

  const set = <K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const canAdvanceStep1 = profile.university && profile.department.trim() && profile.unitDescription.trim();
  const canFinish = profile.contactEmail.trim() && profile.contactPhone.trim();

  const handleFinish = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      await api.upsertOffererProfile({ ...profile, userId: user.id });
      await completeOnboarding();
      toast.success("Perfil institucional completo!");
      navigate("/offerer/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-teal-500">
            Etapa {step} de 2 — {STEP_TITLES[step - 1]}
          </p>
          <p className="text-sm text-[#6b7280]">{Math.round((step / 2) * 100)}%</p>
        </div>
        <Progress value={(step / 2) * 100} />
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Universidade</Label>
            <Select value={profile.university} onValueChange={(v) => set("university", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {UNIVERSITIES.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="department">Nome da unidade/departamento</Label>
            <Input id="department" value={profile.department} onChange={(e) => set("department", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="unitName">Nome de exibição da unidade (opcional)</Label>
            <Input id="unitName" value={profile.unitName ?? ""} onChange={(e) => set("unitName", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="unitLogo">Logo (URL opcional)</Label>
            <Input id="unitLogo" value={profile.unitLogo ?? ""} onChange={(e) => set("unitLogo", e.target.value)} placeholder="https://..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="unitDescription">Descrição</Label>
            <Textarea id="unitDescription" rows={4} value={profile.unitDescription} onChange={(e) => set("unitDescription", e.target.value)} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactEmail">E-mail de contato</Label>
            <Input id="contactEmail" type="email" value={profile.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactPhone">Telefone</Label>
            <Input id="contactPhone" value={profile.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} placeholder="(11) 99999-9999" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="departmentUrl">URL do departamento (opcional)</Label>
            <Input id="departmentUrl" value={profile.departmentUrl ?? ""} onChange={(e) => set("departmentUrl", e.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      <div className="flex justify-between mt-10">
        <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          Voltar
        </Button>
        {step < 2 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canAdvanceStep1}>
            Próximo
          </Button>
        ) : (
          <Button onClick={handleFinish} disabled={submitting || !canFinish}>
            {submitting ? "Salvando..." : "Concluir"}
          </Button>
        )}
      </div>
    </div>
  );
}
