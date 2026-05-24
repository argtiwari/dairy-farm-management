import { cowStatusClasses, cowStatusHindiLabels, cowStatusLabels } from "@/lib/cows/status";
import type { CowStatus } from "@/types/cow";

type CowStatusBadgeProps = {
  status: CowStatus;
};

export function CowStatusBadge({ status }: CowStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cowStatusClasses[status]}`}
    >
      {cowStatusLabels[status]} / {cowStatusHindiLabels[status]}
    </span>
  );
}
