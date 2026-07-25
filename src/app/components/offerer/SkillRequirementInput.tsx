import { useState } from "react";
import { X } from "lucide-react";
import { SKILLS } from "../../lib/constants";
import type { SkillRequirement } from "../../lib/types";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../ui/utils";

export function SkillRequirementInput({
  value,
  onChange,
}: {
  value: SkillRequirement[];
  onChange: (skills: SkillRequirement[]) => void;
}) {
  const [customValue, setCustomValue] = useState("");

  const addSkill = (skill: string, mandatory: boolean) => {
    const trimmed = skill.trim();
    if (!trimmed || value.some((s) => s.skill === trimmed)) return;
    onChange([...value, { skill: trimmed, mandatory }]);
  };

  const remove = (skill: string) => onChange(value.filter((s) => s.skill !== skill));

  const setMandatory = (skill: string, mandatory: boolean) =>
    onChange(value.map((s) => (s.skill === skill ? { ...s, mandatory } : s)));

  const availableOptions = SKILLS.filter((s) => !value.some((v) => v.skill === s));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {availableOptions.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => addSkill(skill, true)}
            className="rounded-full border px-3 py-1.5 text-sm font-medium bg-white border-[#e5e7eb] text-[#6b7280] hover:border-teal-500 hover:text-teal-500 transition-colors"
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Digite outra habilidade"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(customValue, true);
              setCustomValue("");
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            addSkill(customValue, true);
            setCustomValue("");
          }}
          className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition-colors shrink-0"
        >
          Adicionar
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-col gap-2">
          {value.map((req) => (
            <div
              key={req.skill}
              className="flex items-center justify-between gap-3 rounded-lg border border-[#e5e7eb] px-3 py-2"
            >
              <span className="text-sm font-medium text-[#1f2937]">{req.skill}</span>
              <div className="flex items-center gap-2">
                <Select
                  value={req.mandatory ? "mandatory" : "differential"}
                  onValueChange={(v) => setMandatory(req.skill, v === "mandatory")}
                >
                  <SelectTrigger
                    className={cn("h-8 w-40 text-xs", req.mandatory ? "text-coral-700" : "text-[#6b7280]")}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mandatory">Obrigatória</SelectItem>
                    <SelectItem value="differential">Diferencial</SelectItem>
                  </SelectContent>
                </Select>
                <button type="button" onClick={() => remove(req.skill)} aria-label={`Remover ${req.skill}`}>
                  <X className="size-4 text-[#9ca3af] hover:text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
