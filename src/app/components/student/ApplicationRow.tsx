import type { ApplicationWithOpportunity } from "../../hooks/useApplications";
import { CategoryBadge } from "../shared/CategoryBadge";
import { StatusBadge } from "../shared/StatusBadge";
import { TableCell, TableRow } from "../ui/table";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

export function ApplicationRow({
  application,
  onClick,
}: {
  application: ApplicationWithOpportunity;
  onClick: () => void;
}) {
  return (
    <TableRow onClick={onClick} className="cursor-pointer">
      <TableCell className="font-medium text-[#1f2937]">
        {application.opportunity?.title ?? "Vaga removida"}
      </TableCell>
      <TableCell>
        {application.opportunity && <CategoryBadge category={application.opportunity.category} />}
      </TableCell>
      <TableCell className="text-[#6b7280]">{application.opportunity?.university}</TableCell>
      <TableCell className="text-[#6b7280]">{formatDate(application.appliedAt)}</TableCell>
      <TableCell>
        <StatusBadge status={application.status} />
      </TableCell>
    </TableRow>
  );
}
