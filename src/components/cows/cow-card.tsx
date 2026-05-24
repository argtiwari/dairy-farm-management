import Link from "next/link";
import { CowStatusBadge } from "@/components/cows/cow-status-badge";
import type { Cow } from "@/types/cow";

type CowCardProps = {
  cow: Cow;
};

export function CowCard({ cow }: CowCardProps) {
  const displayName = cow.name ? `${cow.name} (${cow.cowNumber})` : cow.cowNumber;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-lg font-bold text-emerald-800">
          {cow.cowNumber.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                className="text-base font-semibold text-slate-950 hover:text-emerald-700"
                href={`/cows/${cow.id}`}
              >
                {displayName}
              </Link>
              <p className="mt-1 text-sm text-slate-600">{cow.breed}</p>
            </div>
            <CowStatusBadge status={cow.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Last milk</p>
              <p className="mt-1 font-semibold text-slate-950">
                {cow.lastMilkLiters ? `${cow.lastMilkLiters} L` : "Not added"}
              </p>
              {cow.lastMilkRecordDate ? (
                <p className="mt-1 text-xs text-slate-500">{formatDisplayDate(cow.lastMilkRecordDate)}</p>
              ) : null}
            </div>
            <div className="rounded-md bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase text-slate-500">Health</p>
              <p className="mt-1 font-semibold text-slate-950">{cow.lastHealthNote ?? "No note"}</p>
            </div>
          </div>

          {cow.notes ? <p className="mt-3 text-sm leading-5 text-slate-600">{cow.notes}</p> : null}

          <Link
            className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            href={`/cows/${cow.id}`}
          >
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}
