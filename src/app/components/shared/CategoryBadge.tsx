import { CATEGORY_STYLES } from "../../lib/constants";
import type { OpportunityCategory } from "../../lib/types";
import { cn } from "../ui/utils";

export function CategoryBadge({
  category,
  className,
}: {
  category: OpportunityCategory;
  className?: string;
}) {
  const style = CATEGORY_STYLES[category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style.bg,
        style.fg,
        className
      )}
    >
      {style.label}
    </span>
  );
}
