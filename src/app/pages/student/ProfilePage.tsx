import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import * as api from "../../lib/api";
import { LANGUAGE_LEVELS, SCHOLARSHIP_TYPES, UNIVERSITIES } from "../../lib/constants";
import type { Experience, Opportunity, StudentProfile } from "../../lib/types";
import { SkillChipInput } from "../../components/shared/SkillChipInput";
import { JobCard } from "../../components/shared/JobCard";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

type ProfileDraft = Omit<StudentProfile, "userId">;

const EMPTY_PROFILE: ProfileDraft = {
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
  languages: [],
  bio: "",
  linkedin: "",
  experiences: [],
  isScholarshipHolder: false,
  scholarshipType: "",
};

function completeness(name: string, profile: ProfileDraft): number {
  const fields = [
    name,
    profile.cpf,
    profile.phone,
    profile.birthDate,
    profile.university,
    profile.course,
    profile.semester,
    profile.registration,
    profile.cr > 0 ? "x" : "",
    profile.bio,
    profile.skills.length > 0 ? "x" : "",
    profile.languages.length > 0 ? "x" : "",
  ];
  const filled = fields.filter((f) => f && f.toString().trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

function formatMonthYear(dateOnly: string): string {
  const [year, month] = dateOnly.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
}

const EMPTY_EXPERIENCE = { title: "", location: "", startDate: "", endDate: "", description: "" };

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [profile, setProfile] = useState<ProfileDraft>(EMPTY_PROFILE);
  const [languageInput, setLanguageInput] = useState({ language: "", level: LANGUAGE_LEVELS[0] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingExperience, setAddingExperience] = useState(false);
  const [experienceDraft, setExperienceDraft] = useState(EMPTY_EXPERIENCE);
  const [recommended, setRecommended] = useState<Opportunity[]>([]);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [scholarshipChoice, setScholarshipChoice] = useState("");

  useEffect(() => {
    if (!user) return;
    api.getStudentProfile(user.id).then((existing) => {
      if (existing) {
        const { userId, ...rest } = existing;
        setProfile({ ...EMPTY_PROFILE, ...rest });
        if (rest.scholarshipType) {
          setScholarshipChoice(SCHOLARSHIP_TYPES.includes(rest.scholarshipType) ? rest.scholarshipType : "Outra");
        }
      }
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    api.getOpportunities({ sort: "recent" }).then((list) =>
      setRecommended(list.filter((o) => o.status === "active").slice(0, 3))
    );
  }, []);

  const set = <K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const addLanguage = () => {
    if (!languageInput.language.trim()) return;
    set("languages", [...profile.languages, languageInput]);
    setLanguageInput({ language: "", level: LANGUAGE_LEVELS[0] });
  };

  const removeLanguage = (index: number) => {
    set("languages", profile.languages.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!user) return;
    setCpfError(null);
    if (profile.cpf.trim()) {
      const taken = await api.isCpfRegistered(profile.cpf, user.id);
      if (taken) {
        setCpfError("Este CPF já está cadastrado em outra conta.");
        return;
      }
    }
    setSaving(true);
    try {
      await api.upsertStudentProfile({ ...profile, userId: user.id });
      if (name.trim() && name !== user.name) updateUser({ name: name.trim() });
      toast.success("Perfil atualizado com sucesso!");
      setEditing(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar seu perfil.";
      if (message.includes("CPF")) setCpfError(message);
      else toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const saveExperience = async () => {
    if (!user || !experienceDraft.title.trim() || !experienceDraft.startDate) return;
    const entry: Experience = { id: `exp-${Date.now()}`, ...experienceDraft };
    const nextProfile = { ...profile, experiences: [entry, ...profile.experiences] };
    setProfile(nextProfile);
    setAddingExperience(false);
    setExperienceDraft(EMPTY_EXPERIENCE);
    await api.upsertStudentProfile({ ...nextProfile, userId: user.id });
    toast.success("Experiência adicionada!");
  };

  const removeExperience = async (id: string) => {
    if (!user) return;
    const nextProfile = { ...profile, experiences: profile.experiences.filter((e) => e.id !== id) };
    setProfile(nextProfile);
    await api.upsertStudentProfile({ ...nextProfile, userId: user.id });
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto px-6 py-10 text-[#6b7280]">Carregando perfil...</div>;
  }

  const pct = completeness(name, profile);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={profile.photo || user?.avatar} alt={name} />
          <AvatarFallback>{name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-[#111827]">{name || "Meu Currículo"}</h1>
          <p className="text-[#6b7280]">
            {[profile.course, profile.university].filter(Boolean).join(" — ")}
            {profile.semester ? ` · ${profile.semester}` : ""}
          </p>
          <div className="flex gap-2 mt-2">
            {profile.cr > 0 && (
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                CR: {profile.cr.toFixed(1)}
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Perfil {pct}% Completo
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Exportação de PDF em breve.")}>
            Baixar PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Sair
          </Button>
          {editing ? (
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar Perfil"}
            </Button>
          ) : (
            <Button onClick={() => setEditing(true)}>Editar Perfil</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="academic">
        <TabsList>
          <TabsTrigger value="academic">Dados Acadêmicos</TabsTrigger>
          <TabsTrigger value="experiences">Experiências</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="mt-6">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
            <h3 className="text-[#1f2937] mb-4">Dados Acadêmicos Oficiais</h3>
            {editing ? (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="photo">URL da foto</Label>
                  <Input id="photo" value={profile.photo} onChange={(e) => set("photo", e.target.value)} placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={profile.cpf}
                      onChange={(e) => {
                        set("cpf", e.target.value);
                        setCpfError(null);
                      }}
                    />
                    {cpfError && <p className="text-sm text-destructive">{cpfError}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" value={profile.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="birthDate">Data de nascimento</Label>
                  <Input id="birthDate" type="date" value={profile.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
                </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="course">Curso</Label>
                    <Input id="course" value={profile.course} onChange={(e) => set("course", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="semester">Período Atual</Label>
                    <Input id="semester" value={profile.semester} onChange={(e) => set("semester", e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cr">CR Oficial</Label>
                    <Input id="cr" type="number" step="0.1" min="0" max="10" value={profile.cr || ""} onChange={(e) => set("cr", Number(e.target.value))} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="registration">Matrícula</Label>
                    <Input id="registration" value={profile.registration} onChange={(e) => set("registration", e.target.value)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">Universidade</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.university || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">Curso</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.course || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">Período Atual</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.semester || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">CR Oficial</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.cr > 0 ? profile.cr.toFixed(1) : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">Matrícula</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.registration || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide">Telefone</p>
                  <p className="font-semibold text-[#1f2937] mt-1">{profile.phone || "—"}</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="experiences" className="mt-6">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1f2937]">Experiências Recentes</h3>
              <Button size="sm" variant="outline" onClick={() => setAddingExperience((v) => !v)}>
                <Plus className="size-4" />
                Adicionar Nova
              </Button>
            </div>

            {addingExperience && (
              <div className="flex flex-col gap-3 mb-6 rounded-xl bg-[#f9fafb] p-4">
                <Input
                  placeholder="Título da experiência"
                  value={experienceDraft.title}
                  onChange={(e) => setExperienceDraft((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Local / Departamento"
                  value={experienceDraft.location}
                  onChange={(e) => setExperienceDraft((prev) => ({ ...prev, location: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    value={experienceDraft.startDate}
                    onChange={(e) => setExperienceDraft((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                  <Input
                    type="date"
                    placeholder="Data de término (opcional)"
                    value={experienceDraft.endDate}
                    onChange={(e) => setExperienceDraft((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
                <Textarea
                  rows={3}
                  placeholder="Descrição"
                  value={experienceDraft.description}
                  onChange={(e) => setExperienceDraft((prev) => ({ ...prev, description: e.target.value }))}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setAddingExperience(false)}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={saveExperience}>
                    Salvar
                  </Button>
                </div>
              </div>
            )}

            {profile.experiences.length === 0 && !addingExperience && (
              <p className="text-sm text-[#6b7280]">Nenhuma experiência adicionada ainda.</p>
            )}

            <div className="flex flex-col divide-y divide-[#e5e7eb]">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="py-4 first:pt-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-[#1f2937]">{exp.title}</p>
                    <button onClick={() => removeExperience(exp.id)} aria-label="Remover experiência">
                      <X className="size-4 text-[#9ca3af] hover:text-destructive" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6b7280] mt-1">
                    {formatMonthYear(exp.startDate)} — {exp.endDate ? formatMonthYear(exp.endDate) : "Atual"}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  {exp.description && <p className="text-sm text-[#4b5563] mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-6">
            <h3 className="text-[#1f2937]">Habilidades Técnicas e Interpessoais</h3>

            {editing ? (
              <SkillChipInput value={profile.skills} onChange={(skills) => set("skills", skills)} />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.length === 0 && <p className="text-sm text-[#6b7280]">Nenhuma habilidade adicionada.</p>}
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm text-[#4b5563]">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label>Idiomas</Label>
              {editing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Idioma"
                    value={languageInput.language}
                    onChange={(e) => setLanguageInput((prev) => ({ ...prev, language: e.target.value }))}
                  />
                  <Select value={languageInput.level} onValueChange={(v) => setLanguageInput((prev) => ({ ...prev, level: v }))}>
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
              )}
              {profile.languages.length === 0 && !editing && (
                <p className="text-sm text-[#6b7280]">Nenhum idioma adicionado.</p>
              )}
              {profile.languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.languages.map((lang, i) => (
                    <span key={`${lang.language}-${i}`} className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                      {lang.language} · {lang.level}
                      {editing && (
                        <button type="button" onClick={() => removeLanguage(i)} aria-label="Remover idioma">
                          <X className="size-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {editing ? (
              <>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={4} value={profile.bio} onChange={(e) => set("bio", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
                  <Input id="linkedin" value={profile.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
                </div>
              </>
            ) : (
              profile.bio && <p className="text-sm text-[#4b5563] leading-relaxed">{profile.bio}</p>
            )}

            <div className="flex flex-col gap-3 rounded-xl bg-[#f9fafb] p-4">
              {editing ? (
                <>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="scholarship">Sou bolsista</Label>
                    <Switch
                      id="scholarship"
                      checked={profile.isScholarshipHolder}
                      onCheckedChange={(checked) => {
                        set("isScholarshipHolder", checked);
                        if (!checked) {
                          set("scholarshipType", "");
                          setScholarshipChoice("");
                        }
                      }}
                    />
                  </div>
                  {profile.isScholarshipHolder && (
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
                          value={profile.scholarshipType}
                          onChange={(e) => set("scholarshipType", e.target.value)}
                        />
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-[#4b5563]">
                  {profile.isScholarshipHolder
                    ? `Bolsista${profile.scholarshipType ? ` · ${profile.scholarshipType}` : ""}`
                    : "Não bolsista"}
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {recommended.length > 0 && (
        <div>
          <h2 className="text-[#111827] mb-6">Oportunidades recomendadas para o seu Perfil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommended.map((o) => (
              <JobCard key={o.id} opportunity={o} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
