"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Droplets,
  HeartPulse,
  Syringe,
  Sparkles,
  Stethoscope,
  Baby,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CowProfileActions } from "@/components/cows/cow-profile-actions";
import { CowStatusBadge } from "@/components/cows/cow-status-badge";
import { HealthRecordsPanel } from "@/components/health/health-records-panel";
import { MedicineRecordsPanel } from "@/components/medicine/medicine-records-panel";
import { MilkRecordsPanel } from "@/components/milk/milk-records-panel";
import { PregnancyRecordsPanel } from "@/components/pregnancy/pregnancy-records-panel";
import { VaccinationRecordsPanel } from "@/components/vaccination/vaccination-records-panel";
import { AppCard } from "@/components/ui/app-card";
import { mockCows } from "@/lib/cows/mock-cows";
import type { Cow } from "@/types/cow";

type CowDetailPanelProps = {
  cowId: string;
};

export function CowDetailPanel({ cowId }: CowDetailPanelProps) {
  const [cow, setCow] = useState<Cow | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadCow() {
      try {
        const { getCowProfileById } = await import("@/lib/cows/cow-service");
        const cowProfile = await getCowProfileById(cowId);
        if (isMounted) setCow(cowProfile);
      } catch {
        const sampleCow = mockCows.find((item) => item.id === cowId) ?? null;
        if (isMounted) {
          setError("Could not load this cow from Firestore. Showing sample data if available.");
          setCow(sampleCow);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCow();
    return () => { isMounted = false; };
  }, [cowId, refreshKey]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        Loading cow profile...
      </div>
    );
  }

  if (!cow) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Cow not found</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This cow profile may have been deleted or the ID may be incorrect.
        </p>
        <Link
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          href="/cows"
        >
          Back to cow profiles
        </Link>
      </div>
    );
  }

  const displayName = cow.name ? `${cow.name} (${cow.cowNumber})` : cow.cowNumber;

  return (
    <div className="grid gap-4">
      {error ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          {error}
        </p>
      ) : null}

      <section className="overflow-hidden rounded-[30px] border border-emerald-100 bg-white shadow-lg">
        <div className="h-44 bg-gradient-to-r from-emerald-100 via-amber-50 to-emerald-50" />

        <div className="relative px-4 pb-5 sm:px-5 sm:pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border-4 border-white bg-emerald-100 text-3xl font-black text-emerald-800 shadow-lg">
                {cow.cowNumber.slice(0, 2).toUpperCase()}
              </div>

              <div className="pb-1">
                <h2 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{displayName}</h2>
                <p className="mt-1 text-sm text-slate-600">{cow.breed || "Breed not set"}</p>
              </div>
            </div>

            <CowStatusBadge status={cow.status} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickActionButton href="#milk" label="Milk" caption="Add or review" icon={Droplets} />
            <QuickActionButton href="#health" label="Health" caption="Recent care" icon={HeartPulse} />
            <QuickActionButton href="#vaccination" label="Vaccination" caption="Upcoming shots" icon={Syringe} />
            <QuickActionButton href="#pregnancy" label="Pregnancy" caption="Breeding notes" icon={Baby} />
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <AppCard className="border-emerald-100 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <Sparkles className="h-4 w-4" />
                Quick snapshot
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SummaryTile label="Last milk" value={cow.lastMilkLiters ? `${cow.lastMilkLiters} L` : "Not added"} detail={cow.lastMilkRecordDate ? formatDisplayDate(cow.lastMilkRecordDate) : "No recent entry"} />
                <SummaryTile label="Health" value={cow.lastHealthNote ? cow.lastHealthNote : "No note"} detail={cow.lastHealthNote ? "Recent update" : "No recent update"} />
                <SummaryTile label="Pregnancy" value={cow.lastPregnancyStatus ? cow.lastPregnancyStatus : "Not recorded"} detail={cow.expectedDeliveryDate ? `Due ${formatDisplayDate(cow.expectedDeliveryDate)}` : "No current note"} />
                <SummaryTile label="Vaccination" value={cow.lastHealthNote ? "Review due items" : "No recent data"} detail="Use the records below" />
              </div>
            </AppCard>

            <AppCard className="border-slate-200 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Stethoscope className="h-4 w-4" />
                What matters most
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-[#fcfbf7] p-3 text-sm text-slate-700">
                  <p className="font-semibold text-slate-950">Today’s focus</p>
                  <p className="mt-1 leading-6">Keep milk, health, and reminder follow-ups easy to access from one place.</p>
                </div>
                {cow.notes ? (
                  <div className="rounded-2xl border border-slate-100 bg-white p-3 text-sm text-slate-700">
                    <p className="font-semibold text-slate-950">Notes</p>
                    <p className="mt-1 leading-6">{cow.notes}</p>
                  </div>
                ) : null}
              </div>
            </AppCard>
          </div>
        </div>
      </section>

      <CowProfileActions cow={cow} onChanged={() => setRefreshKey((c) => c + 1)} />

      <div id="milk">
        <MilkRecordsPanel cowId={cow.id} />
      </div>
      <div id="health">
        <HealthRecordsPanel cowId={cow.id} />
      </div>
      <div id="medicine">
        <MedicineRecordsPanel cowId={cow.id} />
      </div>
      <div id="pregnancy">
        <PregnancyRecordsPanel cowId={cow.id} />
      </div>
      <div id="vaccination">
        <VaccinationRecordsPanel cowId={cow.id} />
      </div>
    </div>
  );
}

function QuickActionButton({
  href,
  label,
  caption,
  icon: Icon,
}: {
  href: string;
  label: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-[#fcfbf7] px-3 py-3 text-left shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div>
        <p className="text-sm font-semibold text-slate-950">{label}</p>
        <p className="text-xs text-slate-500">{caption}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <Icon className="h-4 w-4" />
      </div>
    </a>
  );
}

function SummaryTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}
