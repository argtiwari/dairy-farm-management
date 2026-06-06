"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CowProfileActions } from "@/components/cows/cow-profile-actions";
import { CowStatusBadge } from "@/components/cows/cow-status-badge";
import { HealthRecordsPanel } from "@/components/health/health-records-panel";
import { MedicineRecordsPanel } from "@/components/medicine/medicine-records-panel";
import { MilkRecordsPanel } from "@/components/milk/milk-records-panel";
import { PregnancyRecordsPanel } from "@/components/pregnancy/pregnancy-records-panel";
import { VaccinationRecordsPanel } from "@/components/vaccination/vaccination-records-panel";
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
    <div className="grid gap-6">
      {error && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">{error}</p>
      )}

      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">

  <div className="h-52 bg-gradient-to-r from-emerald-100 via-amber-50 to-emerald-50" />

  <div className="relative px-6 pb-6">

    <div className="-mt-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

        <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-emerald-100 text-3xl font-bold text-emerald-800 shadow-lg">
          {cow.cowNumber.slice(0, 2).toUpperCase()}
        </div>

        <div className="pb-2">
         <h2 className="text-2xl font-bold leading-tight text-slate-950 sm:text-3xl">
            {displayName}
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            {cow.breed}
          </p>
        </div>

      </div>

      <CowStatusBadge status={cow.status} />
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

  <button className="rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white">
    + Milk
  </button>

  <button className="rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white">
    Health
  </button>

  <button className="rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-white">
    Vaccine
  </button>

  <button className="rounded-2xl bg-pink-500 py-3 text-sm font-semibold text-white">
    Pregnancy
  </button>

</div>

  </div>


        {cow.notes && (
          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-xs font-medium uppercase text-slate-500">Notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{cow.notes}</p>
          </div>
        )}
      </section>

      <CowProfileActions cow={cow} onChanged={() => setRefreshKey((c) => c + 1)} />

      <MilkRecordsPanel cowId={cow.id} />
      <HealthRecordsPanel cowId={cow.id} />
      <MedicineRecordsPanel cowId={cow.id} />
      <PregnancyRecordsPanel cowId={cow.id} />
      <VaccinationRecordsPanel cowId={cow.id} />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-[#fcfbf7] p-5 transition-all hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}
