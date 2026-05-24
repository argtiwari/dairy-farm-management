"use client";

import { useEffect, useState } from "react";
import { HealthRecordForm } from "@/components/health/health-record-form";
import { getRecentHealthRecords } from "@/lib/health/health-service";
import type { HealthRecord, HealthSeverity } from "@/types/health";

type HealthRecordsPanelProps = {
  cowId: string;
};

const severityClasses: Record<HealthSeverity, string> = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

export function HealthRecordsPanel({ cowId }: HealthRecordsPanelProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<HealthRecord[]>([]);

  async function loadRecords() {
    setError("");
    setIsLoading(true);

    try {
      const recentRecords = await getRecentHealthRecords(cowId);
      setRecords(recentRecords);
    } catch {
      setError("Could not load health records yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialRecords() {
      try {
        const recentRecords = await getRecentHealthRecords(cowId);

        if (isMounted) {
          setRecords(recentRecords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load health records yet.");
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

  const followUpsDue = records.filter((record) => isFollowUpDue(record.followUpDate)).length;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-emerald-700">Health tracking</p>
        <h3 className="text-lg font-semibold text-slate-950">Health history</h3>
        <p className="text-sm leading-6 text-slate-600">
          Track sickness, treatment, vet advice, and follow-up dates.
        </p>
      </div>

      <div className="mt-4">
        <HealthRecordForm cowId={cowId} onSaved={loadRecords} />
      </div>

      {isLoading ? (
        <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Loading health records...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && records.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-sm text-slate-600">
          No health records added yet.
        </p>
      ) : null}

      {records.length > 0 ? (
        <div className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <HealthSummaryCard label="Recent records" value={String(records.length)} />
            <HealthSummaryCard label="Follow-ups due" value={String(followUpsDue)} />
            <HealthSummaryCard label="Latest issue" value={records[0]?.issue ?? "None"} />
          </div>

          {records.map((record) => (
            <article key={record.id} className="rounded-md border border-slate-200 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{record.issue}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {formatDisplayDate(record.recordDate)}
                    {record.followUpDate ? ` - Follow-up ${formatDisplayDate(record.followUpDate)}` : ""}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${severityClasses[record.severity]}`}
                >
                  {record.severity}
                </span>
              </div>

              {record.treatment ? (
                <p className="mt-2 text-sm leading-5 text-slate-700">Treatment: {record.treatment}</p>
              ) : null}

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

function HealthSummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function isFollowUpDue(value?: string) {
  if (!value) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(value) <= today;
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
