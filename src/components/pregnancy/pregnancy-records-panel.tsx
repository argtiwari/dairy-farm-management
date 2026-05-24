"use client";

import { useEffect, useState } from "react";
import { PregnancyRecordForm } from "@/components/pregnancy/pregnancy-record-form";
import { getRecentPregnancyRecords } from "@/lib/pregnancy/pregnancy-service";
import type { PregnancyRecord, PregnancyStatus } from "@/types/pregnancy";

type PregnancyRecordsPanelProps = {
  cowId: string;
};

const statusClasses: Record<PregnancyStatus, string> = {
  bred: "bg-sky-50 text-sky-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  delivered: "bg-violet-50 text-violet-700",
  failed: "bg-rose-50 text-rose-700",
};

export function PregnancyRecordsPanel({ cowId }: PregnancyRecordsPanelProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<PregnancyRecord[]>([]);

  async function loadRecords() {
    setError("");
    setIsLoading(true);

    try {
      const recentRecords = await getRecentPregnancyRecords(cowId);
      setRecords(recentRecords);
    } catch {
      setError("Could not load pregnancy records yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialRecords() {
      try {
        const recentRecords = await getRecentPregnancyRecords(cowId);

        if (isMounted) {
          setRecords(recentRecords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load pregnancy records yet.");
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

  const activePregnancies = records.filter(
    (record) => record.status === "bred" || record.status === "confirmed",
  ).length;
  const upcomingDeliveries = records.filter((record) =>
    isWithinNextDays(record.expectedDeliveryDate, 30),
  ).length;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-emerald-700">Pregnancy tracking</p>
        <h3 className="text-lg font-semibold text-slate-950">Pregnancy history</h3>
        <p className="text-sm leading-6 text-slate-600">
          Track breeding date, expected delivery, checkups, and delivery outcome.
        </p>
      </div>

      <div className="mt-4">
        <PregnancyRecordForm cowId={cowId} onSaved={loadRecords} />
      </div>

      {isLoading ? (
        <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Loading pregnancy records...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && records.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-sm text-slate-600">
          No pregnancy records added yet.
        </p>
      ) : null}

      {records.length > 0 ? (
        <div className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard label="Recent records" value={String(records.length)} />
            <SummaryCard label="Active pregnancies" value={String(activePregnancies)} />
            <SummaryCard label="Due within 30 days" value={String(upcomingDeliveries)} />
          </div>

          {records.map((record) => (
            <article key={record.id} className="rounded-md border border-slate-200 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Breeding: {formatDisplayDate(record.breedingDate)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Expected delivery:{" "}
                    {record.expectedDeliveryDate
                      ? formatDisplayDate(record.expectedDeliveryDate)
                      : "Not added"}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[record.status]}`}
                >
                  {record.status}
                </span>
              </div>

              <div className="mt-2 grid gap-1 text-sm text-slate-600">
                {record.bullName ? <p>Bull/semen: {record.bullName}</p> : null}
                {record.checkupDate ? <p>Checkup: {formatDisplayDate(record.checkupDate)}</p> : null}
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

function isWithinNextDays(value: string | undefined, days: number) {
  if (!value) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(value);
  const future = new Date(today);
  future.setDate(today.getDate() + days);

  return target >= today && target <= future;
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
