"use client";

import { useEffect, useState } from "react";
import { MilkRecordForm } from "@/components/milk/milk-record-form";
import { getRecentMilkRecords } from "@/lib/milk/milk-service";
import type { MilkRecord } from "@/types/milk";

type MilkRecordsPanelProps = {
  cowId: string;
};

export function MilkRecordsPanel({ cowId }: MilkRecordsPanelProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<MilkRecord[]>([]);

  async function loadRecords() {
    setError("");
    setIsLoading(true);

    try {
      const recentRecords = await getRecentMilkRecords(cowId);
      setRecords(recentRecords);
    } catch {
      setError("Could not load milk records yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialRecords() {
      try {
        const recentRecords = await getRecentMilkRecords(cowId);

        if (isMounted) {
          setRecords(recentRecords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load milk records yet.");
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

  const analytics = getMilkAnalytics(records);

  return (
   <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-emerald-700">Milk production</p>
        <h3 className="text-2xl font-bold text-slate-950">Recent milk records</h3>
        <p className="text-sm leading-6 text-slate-600">
          Track morning and evening milk for this cow.
        </p>
      </div>

      <div className="mt-4">
        <MilkRecordForm cowId={cowId} onSaved={loadRecords} />
      </div>

      {isLoading ? (
        <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Loading milk records...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && records.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-sm text-slate-600">
          No milk records added yet.
        </p>
      ) : null}

      {records.length > 0 ? (
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <AnalyticsCard
              label={`Last ${analytics.recordCount} records`}
              value={`${analytics.totalLiters.toFixed(1)} L`}
            />
            <AnalyticsCard label="Daily average" value={`${analytics.averageLiters.toFixed(1)} L`} />
            <AnalyticsCard label="Highest day" value={`${analytics.highestLiters.toFixed(1)} L`} />
            <AnalyticsCard label="Latest day" value={formatDisplayDate(analytics.latestDate)} />
          </div>

          {records.map((record) => (
            <article key={record.id} className="rounded-2xl border border-slate-200 bg-[#fcfbf7] p-4 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {formatDisplayDate(record.recordDate)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Morning {record.morningLiters} L + Evening {record.eveningLiters} L
                  </p>
                </div>
                <p className="text-lg font-semibold text-slate-950">{record.totalLiters} L</p>
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

function AnalyticsCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-emerald-900">
        {value}
      </p>
    </div>
  );
}

function getMilkAnalytics(records: MilkRecord[]) {
  const totalLiters = records.reduce((sum, record) => sum + record.totalLiters, 0);
  const highestLiters = records.reduce(
    (highest, record) => Math.max(highest, record.totalLiters),
    0,
  );
  const latestDate = records[0]?.recordDate ?? new Date().toISOString();

  return {
    recordCount: records.length,
    totalLiters,
    averageLiters: records.length > 0 ? totalLiters / records.length : 0,
    highestLiters,
    latestDate,
  };
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
