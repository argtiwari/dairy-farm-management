"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    let isMounted = true;

    async function loadCow() {
      try {
        const { getCowProfileById } = await import("@/lib/cows/cow-service");
        const cowProfile = await getCowProfileById(cowId);

        if (isMounted) {
          setCow(cowProfile);
        }
      } catch {
        const sampleCow = mockCows.find((item) => item.id === cowId) ?? null;

        if (isMounted) {
          setError("Could not load this cow from Firestore. Showing sample data if available.");
          setCow(sampleCow);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCow();

    return () => {
      isMounted = false;
    };
  }, [cowId]);

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
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          {error}
        </p>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xl font-bold text-emerald-800">
              {cow.cowNumber.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">{displayName}</h2>
              <p className="mt-1 text-sm text-slate-600">{cow.breed}</p>
              <div className="mt-3">
                <CowStatusBadge status={cow.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoItem label="Cow ID" value={cow.cowNumber} />
          <InfoItem label="Breed" value={cow.breed} />
          <InfoItem label="Birth date" value={cow.birthDate ?? "Not added"} />
          <InfoItem
            label="Last milk"
            value={
              cow.lastMilkLiters
                ? `${cow.lastMilkLiters} L${cow.lastMilkRecordDate ? ` on ${formatDisplayDate(cow.lastMilkRecordDate)}` : ""}`
                : "Not added"
            }
          />
          <InfoItem label="Health note" value={cow.lastHealthNote ?? "No note"} />
          <InfoItem
            label="Pregnancy"
            value={
              cow.lastPregnancyStatus
                ? `${cow.lastPregnancyStatus}${cow.expectedDeliveryDate ? ` - due ${formatDisplayDate(cow.expectedDeliveryDate)}` : ""}`
                : "Not added"
            }
          />
          <InfoItem label="Updated" value={formatDisplayDate(cow.updatedAt)} />
        </div>

        {cow.notes ? (
          <div className="mt-5 rounded-md bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase text-slate-500">Notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{cow.notes}</p>
          </div>
        ) : null}
      </section>

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
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
