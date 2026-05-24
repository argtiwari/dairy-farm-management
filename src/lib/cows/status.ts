import type { CowStatus } from "@/types/cow";

export const cowStatusLabels: Record<CowStatus, string> = {
  active: "Active",
  pregnant: "Pregnant",
  sick: "Sick",
  sold: "Sold",
  inactive: "Inactive",
};

export const cowStatusHindiLabels: Record<CowStatus, string> = {
  active: "सक्रिय",
  pregnant: "गर्भवती",
  sick: "बीमार",
  sold: "बेची गई",
  inactive: "निष्क्रिय",
};

export const cowStatusClasses: Record<CowStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  pregnant: "bg-sky-50 text-sky-700 ring-sky-100",
  sick: "bg-rose-50 text-rose-700 ring-rose-100",
  sold: "bg-slate-100 text-slate-600 ring-slate-200",
  inactive: "bg-amber-50 text-amber-700 ring-amber-100",
};
