import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SKILLS } from "../../lib/constants";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";

export function SkillChipInput({
  value,
  onChange,
  options = SKILLS,
}: {
  value: string[];
  onChange: (skills: string[]) => void;
  options?: string[];
}) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const toggle = (skill: string) => {
    if (value.includes(skill)) onChange(value.filter((s) => s !== skill));
    else onChange([...value, skill]);
  };

  const addCustom = () => {
    const trimmed = customValue.trim();
    if (!trimmed) return;
    if (!value.includes(trimmed)) onChange([...value, trimmed]);
    setCustomValue("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map((skill) => {
          const selected = value.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggle(skill)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                selected
                  ? "bg-teal-500 border-teal-500 text-white"
                  : "bg-white border-[#e5e7eb] text-[#6b7280] hover:border-teal-500 hover:text-teal-500"
              )}
            >
              {skill}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setCustomOpen((v) => !v)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors inline-flex items-center gap-1",
            customOpen
              ? "bg-teal-500 border-teal-500 text-white"
              : "bg-white border-dashed border-[#9ca3af] text-[#6b7280] hover:border-teal-500 hover:text-teal-500"
          )}
        >
          <Plus className="size-3.5" />
          Outra
        </button>
      </div>

      {customOpen && (
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma habilidade"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
          />
          <button
            type="button"
            onClick={addCustom}
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
            >
              {skill}
              <button type="button" onClick={() => toggle(skill)} aria-label={`Remover ${skill}`}>
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
