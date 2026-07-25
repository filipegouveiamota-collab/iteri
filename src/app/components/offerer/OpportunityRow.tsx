import { Link } from "react-router";
import type { Opportunity } from "../../lib/types";
import { formatDateOnlyBR } from "../../lib/format";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

const STATUS_LABEL: Record<Opportunity["status"], string> = {
  active: "Ativa",
  draft: "Rascunho",
  closed: "Encerrada",
};

const STATUS_STYLE: Record<Opportunity["status"], string> = {
  active: "bg-success-bg text-success-fg",
  draft: "bg-[#f3f4f6] text-[#6b7280]",
  closed: "bg-[#f3f4f6] text-[#9ca3af]",
};

export function OpportunityRow({
  opportunity,
  applicationCount,
  onClose,
  onRepublish,
}: {
  opportunity: Opportunity;
  applicationCount: number;
  onClose: (id: string) => void;
  onRepublish: (id: string) => void;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium text-[#1f2937]">{opportunity.title}</TableCell>
      <TableCell className="text-[#6b7280]">{opportunity.category}</TableCell>
      <TableCell>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[opportunity.status]}`}>
          {STATUS_LABEL[opportunity.status]}
        </span>
      </TableCell>
      <TableCell className="text-[#6b7280]">{applicationCount}</TableCell>
      <TableCell className="text-[#6b7280]">
        {formatDateOnlyBR(opportunity.applicationDeadline)}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to={`/offerer/opportunities/${opportunity.id}/edit`}>Editar</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to={`/offerer/opportunities/${opportunity.id}/candidates`}>Ver Candidatos</Link>
          </Button>
          {opportunity.status === "active" ? (
            <Button size="sm" variant="outline" onClick={() => onClose(opportunity.id)}>
              Encerrar
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => onRepublish(opportunity.id)}>
              Republicar
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
