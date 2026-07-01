import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Droplets, HeartPulse, Sparkles } from "lucide-react";
import { CowStatusBadge } from "@/components/cows/cow-status-badge";
import type { Cow } from "@/types/cow";

type CowCardProps = {
  cow: Cow;
};

export function CowCard({ cow }: CowCardProps) {
  const displayName = cow.name ? `${cow.name} (${cow.cowNumber})` : cow.cowNumber;
  const initials = getCowInitials(cow);
  const hasPregnancyNote = cow.status === "pregnant" && (cow.lastPregnancyStatus || cow.expectedDeliveryDate);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Cow profile
          </div>
          <CowStatusBadge status={cow.status} />
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] ring-4 ring-white shadow-md">
            {cow.profileImageUrl ? (
              <Image src={cow.profileImageUrl} alt={displayName} fill className="object-cover" sizes="80px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-2xl font-bold text-emerald-800">
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <Link href={`/cows/${cow.id}`} className="block truncate text-lg font-bold text-slate-950 transition-colors hover:text-emerald-700">
              {displayName}
            </Link>
            <p className="mt-1 text-sm font-medium text-slate-600">{cow.breed || "Breed not set"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                ID {cow.cowNumber}
              </span>
              {cow.lastMilkLiters ? (
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                  {cow.lastMilkLiters} L last milk
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoTile
            icon={Droplets}
            label="Last milk"
            value={cow.lastMilkLiters ? `${cow.lastMilkLiters} L` : "Not added"}
            subValue={cow.lastMilkRecordDate ? formatDisplayDate(cow.lastMilkRecordDate) : "No recent entry"}
          />
          <InfoTile
            icon={HeartPulse}
            label="Health"
            value={cow.lastHealthNote ? cow.lastHealthNote : "No note"}
            subValue={cow.lastHealthNote ? "Latest update" : "No recent update"}
          />
        </div>

        {hasPregnancyNote ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800">
            <div className="flex items-center gap-2 font-semibold">
              <CalendarClock className="h-4 w-4" />
              Pregnancy update
            </div>
            <p className="mt-1 leading-6">
              {cow.lastPregnancyStatus || (cow.expectedDeliveryDate ? `Expected ${formatDisplayDate(cow.expectedDeliveryDate)}` : "Check pregnancy status")}
            </p>
          </div>
        ) : null}

        {cow.notes ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-700">{cow.notes}</p>
          </div>
        ) : null}

        <Link
          href={`/cows/${cow.id}`}
          className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Open profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subValue: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-[#fcfbf7] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      </div>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{subValue}</p>
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