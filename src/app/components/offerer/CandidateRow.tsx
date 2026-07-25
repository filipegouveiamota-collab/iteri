import { Link } from "react-router";
import type { Candidate } from "../../hooks/useCandidates";
import { StatusBadge } from "../shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";

export function CandidateRow({
  candidate,
  opportunityId,
  selected,
  onToggleSelect,
  onApprove,
  onReject,
}: {
  candidate: Candidate;
  opportunityId: string;
  selected: boolean;
  onToggleSelect: (checked: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const decided = candidate.status !== "pending";

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={selected} onCheckedChange={(v) => onToggleSelect(!!v)} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={candidate.student?.avatar} alt={candidate.student?.name} />
            <AvatarFallback>{candidate.student?.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-[#1f2937]">{candidate.student?.name ?? "Estudante"}</span>
        </div>
      </TableCell>
      <TableCell className="text-[#6b7280]">{candidate.profile?.university ?? "—"}</TableCell>
      <TableCell>
        {candidate.profile?.cr ? (
          <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs font-semibold text-[#4b5563]">
            CR: {candidate.profile.cr.toFixed(1)}
          </span>
        ) : (
          "—"
        )}
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1 max-w-[220px]">
          {(candidate.profile?.skills ?? []).slice(0, 3).map((skill) => (
            <span key={skill} className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-700">
              {skill}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-[#6b7280]">
        {new Date(candidate.appliedAt).toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell>
        <StatusBadge status={candidate.status} />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to={`/offerer/opportunities/${opportunityId}/candidates/${candidate.id}`}>Ver Perfil</Link>
          </Button>
          <Button size="sm" onClick={onApprove} disabled={decided}>
            Aprovar
          </Button>
          <Button size="sm" variant="destructive" onClick={onReject} disabled={decided}>
            Rejeitar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
