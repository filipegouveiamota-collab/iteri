import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { LANGUAGE_LEVELS, SCHOLARSHIP_TYPES, UNIVERSITIES } from "../../lib/constants";
import type { StudentProfile } from "../../lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SkillChipInput } from "../shared/SkillChipInput";

type Draft = Omit<StudentProfile, "userId" | "languages"> & {
  languages: { language: string; level: string }[];
};

const EMPTY_DRAFT: Draft = {
  cpf: "",
  phone: "",
  birthDate: "",
  photo: "",
  university: "",
  course: "",
  semester: "",
  cr: 0,
  registration: "",
  skills: [],
  experiences: [],
  bio: "",
  linkedin: "",
  languages: [],
  isScholarshipHolder: false,
  scholarshipType: "",
};

const STEP_TITLES = ["Dados Pessoais", "Perfil Acadêmico", "Currículo"];

export function OnboardingWizard() {
  const { user, completeOnboarding, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({ ...EMPTY_DRAFT });
  const [name, setName] = useState(user?.name ?? "");
  const [languageInput, setLanguageInput] = useState({ language: "", level: LANGUAGE_LEVELS[0] });
  const [submitting, setSubmitting] = useState(false);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [checkingCpf, setCheckingCpf] = useState(false);
  const [scholarshipChoice, setScholarshipChoice] = useState("");

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const canAdvanceStep1 = name.trim() && draft.cpf.trim() && draft.phone.trim() && draft.birthDate;
  const canAdvanceStep2 = draft.university && draft.course.trim() && draft.semester.trim() && draft.registration.trim();

  const handleAdvanceStep1 = async () => {
    setCpfError(null);
    setCheckingCpf(true);
    try {
      const taken = await api.isCpfRegistered(draft.cpf, user?.id);
      if (taken) {
        setCpfError("Este CPF já está cadastrado em outra conta.");
        return;
      }
      setStep(2);
    } finally {
      setCheckingCpf(false);
    }
  };

  const addLanguage = () => {
    if (!languageInput.language.trim()) return;
    set("languages", [...draft.languages, languageInput]);
    setLanguageInput({ language: "", level: LANGUAGE_LEVELS[0] });
  };

  const removeLanguage = (index: number) => {
    set("languages", draft.languages.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      await api.upsertStudentProfile({ ...draft, userId: user.id });
      if (name.trim() && name !== user.name) updateUser({ name: name.trim() });
      await completeOnboarding();
      toast.success("Perfil completo! Bem-vindo(a) à ITERI.");
      navigate("/student/feed");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar seu perfil.";
      if (message.includes("CPF")) {
        setStep(1);
        setCpfError(message);
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-teal-500">
            Etapa {step} de 3 — {STEP_TITLES[step - 1]}
          </p>
          <p className="text-sm text-[#6b7280]">{Math.round((step / 3) * 100)}%</p>
        </div>
        <Progress value={(step / 3) * 100} />
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={draft.cpf}
                onChange={(e) => {
                  set("cpf", e.target.value);
                  setCpfError(null);
                }}
                placeholder="000.000.000-00"
              />
              {cpfError && <p className="text-sm text-destructive">{cpfError}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={draft.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input id="birthDate" type="date" value={draft.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="photo">URL da foto (opcional)</Label>
            <Input id="photo" value={draft.photo} onChange={(e) => set("photo", e.target.value)} placeholder="https://..." />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Universidade</Label>
            <Select value={draft.university} onValueChange={(v) => set("university", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua universidade" />
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="course">Curso</Label>
              <Input id="course" value={draft.course} onChange={(e) => set("course", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="semester">Semestre</Label>
              <Input id="semester" value={draft.semester} onChange={(e) => set("semester", e.target.value)} placeholder="5º semestre" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cr">CR (Coeficiente de Rendimento)</Label>
              <Input
                id="cr"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={draft.cr || ""}
                onChange={(e) => set("cr", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="registration">Matrícula</Label>
              <Input id="registration" value={draft.registration} onChange={(e) => set("registration", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Habilidades</Label>
            <SkillChipInput value={draft.skills} onChange={(skills) => set("skills", skills)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Idiomas</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Idioma"
                value={languageInput.language}
                onChange={(e) => setLanguageInput((prev) => ({ ...prev, language: e.target.value }))}
              />
              <Select
                value={languageInput.level}
                onValueChange={(v) => setLanguageInput((prev) => ({ ...prev, level: v }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={addLanguage}>
                Adicionar
              </Button>
            </div>
            {draft.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {draft.languages.map((lang, i) => (
                  <span
                    key={`${lang.language}-${i}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                  >
                    {lang.language} · {lang.level}
                    <button type="button" onClick={() => removeLanguage(i)} aria-label="Remover idioma">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} value={draft.bio} onChange={(e) => set("bio", e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
            <Input id="linkedin" value={draft.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." />
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-[#f9fafb] p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="scholarship">Sou bolsista</Label>
              <Switch
                id="scholarship"
                checked={draft.isScholarshipHolder}
                onCheckedChange={(checked) => {
                  set("isScholarshipHolder", checked);
                  if (!checked) set("scholarshipType", "");
                }}
              />
            </div>
            {draft.isScholarshipHolder && (
              <div className="flex flex-col gap-2">
                <Label>Qual bolsa?</Label>
                <Select
                  value={scholarshipChoice}
                  onValueChange={(v) => {
                    setScholarshipChoice(v);
                    set("scholarshipType", v === "Outra" ? "" : v);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHOLARSHIP_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {scholarshipChoice === "Outra" && (
                  <Input
                    placeholder="Especifique a bolsa"
                    value={draft.scholarshipType}
                    onChange={(e) => set("scholarshipType", e.target.value)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-10">
        <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          Voltar
        </Button>
        {step < 3 ? (
          <Button
            onClick={step === 1 ? handleAdvanceStep1 : () => setStep((s) => s + 1)}
            disabled={
              (step === 1 && (!canAdvanceStep1 || checkingCpf)) || (step === 2 && !canAdvanceStep2)
            }
          >
            {step === 1 && checkingCpf ? "Verificando..." : "Próximo"}
          </Button>
        ) : (
          <Button onClick={handleFinish} disabled={submitting}>
            {submitting ? "Salvando..." : "Concluir"}
          </Button>
        )}
      </div>
    </div>
  );
}
