import { APPLICATION_STATUS_LABELS } from "../../lib/constants";
import { cn } from "../ui/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-info-bg text-info-fg",
  approved: "bg-success-bg text-success-fg",
  rejected: "bg-danger-bg text-danger-fg",
  submitted: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground",
        className
      )}
    >
      {APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}
