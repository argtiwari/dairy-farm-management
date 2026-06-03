import Image from "next/image";
import Link from "next/link";
import { CowStatusBadge } from "@/components/cows/cow-status-badge";
import type { Cow } from "@/types/cow";

type CowCardProps = {
  cow: Cow;
};

export function CowCard({ cow }: CowCardProps) {
  const displayName = cow.name ? `${cow.name} (${cow.cowNumber})` : cow.cowNumber;
  const initials = getCowInitials(cow);

  return (
    <article className="group overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative bg-gradient-to-br from-emerald-50 via-amber-50 to-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-2xl bg-[#fdf9f4] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
            Cow Profile
          </div>
          <CowStatusBadge status={cow.status} />
        </div>

        <div className="mt-5 flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl ring-4 ring-white shadow-md">
            {cow.profileImageUrl ? (
              <Image
                src={cow.profileImageUrl}
                alt={displayName}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-3xl font-bold text-emerald-800">
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              href={`/cows/${cow.id}`}
              className="block truncate text-xl font-bold text-slate-950 transition-colors hover:text-emerald-700"
            >
              {displayName}
            </Link>
            <p className="mt-1 text-base font-medium text-slate-600">
              {cow.breed || "Breed not set"}
            </p>
            <p className="mt-1 text-xs text-slate-500">ID: {cow.cowNumber}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          <InfoTile
            label="Last milk"
            value={cow.lastMilkLiters ? `${cow.lastMilkLiters} L` : "Not added"}
            subValue={cow.lastMilkRecordDate ? formatDisplayDate(cow.lastMilkRecordDate) : undefined}
          />
          <InfoTile
            label="Health"
            value={cow.lastHealthNote ?? "No note"}
            subValue={cow.lastHealthNote ? "Latest update" : undefined}
          />
        </div>

        {cow.notes ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700">{cow.notes}</p>
          </div>
        ) : null}

        <Link
          href={`/cows/${cow.id}`}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}

function InfoTile({
  label,
  value,
  subValue,
}: {
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-[#fcfbf7] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950">{value}</p>
      {subValue ? <p className="mt-1 text-xs text-slate-500">{subValue}</p> : null}
    </div>
  );
}

function getCowInitials(cow: Cow) {
  const source = cow.name?.trim() || cow.cowNumber.trim();
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}