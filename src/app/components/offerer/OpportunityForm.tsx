import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { CATEGORY_IMAGES } from "../../lib/mockData";
import { OPPORTUNITY_CATEGORIES, PAY_TYPE_LABELS } from "../../lib/constants";
import type { Opportunity, OpportunityCategory, PayType } from "../../lib/types";
import { SkillRequirementInput } from "./SkillRequirementInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type OpportunityDraft = Pick<
  Opportunity,
  | "title"
  | "category"
  | "image"
  | "description"
  | "workload"
  | "payRate"
  | "payType"
  | "startDate"
  | "applicationDeadline"
  | "requiredSkills"
  | "minCR"
  | "requiredCourse"
  | "requiredSemester"
  | "otherNotes"
>;

const EMPTY_DRAFT: OpportunityDraft = {
  title: "",
  category: "Monitoria",
  image: CATEGORY_IMAGES.Monitoria,
  description: "",
  workload: "",
  payRate: 0,
  payType: "hour",
  startDate: "",
  applicationDeadline: "",
  requiredSkills: [],
  minCR: undefined,
  requiredCourse: "",
  requiredSemester: "",
  otherNotes: "",
};

export function OpportunityForm({
  initial,
  initialPublished = true,
  submitting = false,
  submitLabel = "Publicar Vaga",
  impactWarning,
  onSubmit,
}: {
  initial?: Partial<OpportunityDraft>;
  initialPublished?: boolean;
  submitting?: boolean;
  submitLabel?: string;
  impactWarning?: string;
  onSubmit: (draft: OpportunityDraft, publish: boolean) => void;
}) {
  const [draft, setDraft] = useState<OpportunityDraft>({ ...EMPTY_DRAFT, ...initial });
  const [publish, setPublish] = useState(initialPublished);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof OpportunityDraft>(key: K, value: OpportunityDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => set("image", reader.result as string);
    reader.readAsDataURL(file);
  };

  const isValid =
    draft.title.trim() &&
    draft.description.trim() &&
    draft.workload.trim() &&
    draft.payRate > 0 &&
    draft.startDate &&
    draft.applicationDeadline;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(draft, publish);
      }}
      className="flex flex-col gap-8 max-w-3xl"
    >
      {impactWarning && (
        <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-sm text-amber-700">
          {impactWarning}
        </div>
      )}

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-5">
        <h3 className="text-[#1f2937]">Identificação</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={draft.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tipo</Label>
          <Select
            value={draft.category}
            onValueChange={(v) => {
              const category = v as OpportunityCategory;
              set("category", category);
              if (!initial?.image) set("image", CATEGORY_IMAGES[category]);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPPORTUNITY_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Imagem</Label>
          <div className="flex items-center gap-3">
            <div className="size-16 rounded-lg overflow-hidden bg-[#f3f4f6] shrink-0">
              {draft.image && <img src={draft.image} alt="" className="size-full object-cover" />}
            </div>
            <Input
              id="image"
              value={draft.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://..."
              className="flex-1"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="size-4" />
              Enviar foto
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-5">
        <h3 className="text-[#1f2937]">Detalhes</h3>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" rows={5} value={draft.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="workload">Carga horária</Label>
            <Input id="workload" value={draft.workload} onChange={(e) => set("workload", e.target.value)} placeholder="12h semanais" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payRate">Remuneração</Label>
            <div className="flex gap-2">
              <Input
                id="payRate"
                type="number"
                min="0"
                value={draft.payRate || ""}
                onChange={(e) => set("payRate", Number(e.target.value))}
                className="flex-1"
              />
              <Select value={draft.payType} onValueChange={(v) => set("payType", v as PayType)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAY_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Data de início</Label>
            <Input id="startDate" type="date" value={draft.startDate} onChange={(e) => set("startDate", e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="applicationDeadline">Prazo de candidatura</Label>
            <Input
              id="applicationDeadline"
              type="date"
              value={draft.applicationDeadline}
              onChange={(e) => set("applicationDeadline", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col gap-5">
        <h3 className="text-[#1f2937]">Requisitos</h3>
        <div className="flex flex-col gap-2">
          <Label>Habilidades</Label>
          <p className="text-xs text-[#6b7280]">
            Adicione as habilidades e marque cada uma como obrigatória ou diferencial.
          </p>
          <SkillRequirementInput value={draft.requiredSkills} onChange={(skills) => set("requiredSkills", skills)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="minCR">CR mínimo (opcional)</Label>
            <Input
              id="minCR"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={draft.minCR ?? ""}
              onChange={(e) => set("minCR", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="requiredCourse">Curso exigido (opcional)</Label>
            <Input id="requiredCourse" value={draft.requiredCourse ?? ""} onChange={(e) => set("requiredCourse", e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="requiredSemester">Semestre exigido (opcional)</Label>
          <Input id="requiredSemester" value={draft.requiredSemester ?? ""} onChange={(e) => set("requiredSemester", e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="otherNotes">Outras observações (opcional)</Label>
          <Textarea id="otherNotes" rows={3} value={draft.otherNotes ?? ""} onChange={(e) => set("otherNotes", e.target.value)} />
        </div>
      </section>

      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex items-center justify-between">
        <div>
          <h3 className="text-[#1f2937]">Publicação</h3>
          <p className="text-sm text-[#6b7280]">{publish ? "A vaga ficará visível imediatamente." : "A vaga ficará salva como rascunho."}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#6b7280]">Salvar como rascunho</span>
          <Switch checked={publish} onCheckedChange={setPublish} />
          <span className="text-sm text-[#6b7280]">Publicar agora</span>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={!isValid || submitting}>
          {submitting ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
