import { cowStatusHindiLabels, cowStatusLabels } from "@/lib/cows/status";
import type { CowStatus } from "@/types/cow";

type CowStatusBadgeProps = {
  status: CowStatus;
};

const statusStyles: Record<CowStatus, string> = {
  active:
    "bg-emerald-100 text-emerald-800 border border-emerald-200",

  pregnant:
    "bg-blue-100 text-blue-800 border border-blue-200",

  sick:
    "bg-red-100 text-red-800 border border-red-200",

  sold:
    "bg-slate-100 text-slate-700 border border-slate-200",

  inactive:
    "bg-amber-100 text-amber-800 border border-amber-200",
};

export function CowStatusBadge({ status }: CowStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide shadow-sm ${statusStyles[status]}`}
    >
      {cowStatusLabels[status]} • {cowStatusHindiLabels[status]}
    </span>
  );
}