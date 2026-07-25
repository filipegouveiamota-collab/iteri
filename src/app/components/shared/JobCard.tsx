import { Link } from "react-router";
import type { Opportunity } from "../../lib/types";
import { CategoryBadge } from "./CategoryBadge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../ui/utils";

export type JobCardVariant = "default" | "new" | "urgent" | "filled";

function variantFromOpportunity(opportunity: Opportunity): JobCardVariant {
  if (opportunity.status === "closed") return "filled";
  if (opportunity.isUrgent) return "urgent";
  if (opportunity.isNew) return "new";
  return "default";
}

const BORDER_BY_VARIANT: Record<JobCardVariant, string> = {
  default: "border-[#e5e7eb]",
  new: "border-teal-500 border-[1.5px]",
  urgent: "border-coral-500 border-[1.5px]",
  filled: "border-[#e5e7eb]",
};

export function JobCard({ opportunity }: { opportunity: Opportunity }) {
  const variant = variantFromOpportunity(opportunity);
  const filled = variant === "filled";

  return (
    <Link
      to={`/opportunities/${opportunity.id}`}
      className={cn(
        "flex flex-col rounded-2xl bg-white border overflow-hidden transition-shadow hover:shadow-lg",
        BORDER_BY_VARIANT[variant],
        filled && "opacity-60"
      )}
    >
      <div className="relative h-40 w-full">
        <ImageWithFallback
          src={opportunity.image}
          alt={opportunity.title}
          className="size-full object-cover"
        />
        {variant === "new" && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-[#1f2937]">
            NOVA
          </span>
        )}
        {variant === "urgent" && (
          <span className="absolute top-3 left-3 rounded-full bg-[#ef4444] px-3 py-1 text-xs font-bold text-white">
            URGENTE
          </span>
        )}
        {variant === "filled" && (
          <span className="absolute top-3 left-3 rounded-full bg-[#9ca3af] px-3 py-1 text-xs font-bold text-white">
            PREENCHIDA
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <CategoryBadge category={opportunity.category} />
        <h3 className="text-[#1f2937] line-clamp-2">{opportunity.title}</h3>
        <p className="text-sm text-[#6b7280]">
          {opportunity.offererName} · {opportunity.university}
        </p>
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-3">
          <p className="font-heading font-bold text-[#1f2937]">
            R$ {opportunity.payRate.toFixed(2).replace(".", ",")}
            {opportunity.payType === "month" ? "/mês" : "/h"}
          </p>
          <span
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold text-white",
              filled ? "bg-[#6b7280]" : "bg-teal-500"
            )}
          >
            Ver Detalhes
          </span>
        </div>
      </div>
    </Link>
  );
}
