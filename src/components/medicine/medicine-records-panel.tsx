"use client";

import { useEffect, useState } from "react";
import { MedicineRecordForm } from "@/components/medicine/medicine-record-form";
import { getRecentMedicineRecords } from "@/lib/medicine/medicine-service";
import type { MedicineRecord } from "@/types/medicine";

type MedicineRecordsPanelProps = {
  cowId: string;
};

export function MedicineRecordsPanel({ cowId }: MedicineRecordsPanelProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<MedicineRecord[]>([]);

  async function loadRecords() {
    setError("");
    setIsLoading(true);

    try {
      const recentRecords = await getRecentMedicineRecords(cowId);
      setRecords(recentRecords);
    } catch {
      setError("Could not load medicine records yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialRecords() {
      try {
        const recentRecords = await getRecentMedicineRecords(cowId);

        if (isMounted) {
          setRecords(recentRecords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load medicine records yet.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialRecords();

    return () => {
      isMounted = false;
    };
  }, [cowId]);

  const activeCourses = records.filter((record) => isActiveMedicine(record.endDate)).length;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-emerald-700">Medicine tracking</p>
        <h3 className="text-lg font-semibold text-slate-950">Medicine history</h3>
        <p className="text-sm leading-6 text-slate-600">
          Track medicine name, dosage, reason, and course dates.
        </p>
      </div>

      <div className="mt-4">
        <MedicineRecordForm cowId={cowId} onSaved={loadRecords} />
      </div>

      {isLoading ? (
        <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Loading medicine records...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && records.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-sm text-slate-600">
          No medicine records added yet.
        </p>
      ) : null}

      {records.length > 0 ? (
        <div className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard label="Recent records" value={String(records.length)} />
            <SummaryCard label="Active courses" value={String(activeCourses)} />
            <SummaryCard label="Latest medicine" value={records[0]?.medicineName ?? "None"} />
          </div>

          {records.map((record) => (
            <article key={record.id} className="rounded-md border border-slate-200 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{record.medicineName}</p>
                  <p className="mt-1 text-sm text-slate-600">{record.dosage}</p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {isActiveMedicine(record.endDate) ? "active" : "completed"}
                </span>
              </div>

              <div className="mt-2 grid gap-1 text-sm text-slate-600">
                <p>Reason: {record.reason}</p>
                <p>
                  Course: {formatDisplayDate(record.startDate)}
                  {record.endDate ? ` - ${formatDisplayDate(record.endDate)}` : " - ongoing"}
                </p>
              </div>

              {record.notes ? (
                <p className="mt-2 text-sm leading-5 text-slate-600">{record.notes}</p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function isActiveMedicine(endDate?: string) {
  if (!endDate) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(endDate) >= today;
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
