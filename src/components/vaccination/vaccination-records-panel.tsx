"use client";

import { useEffect, useState } from "react";
import { VaccinationRecordForm } from "@/components/vaccination/vaccination-record-form";
import { getRecentVaccinationRecords } from "@/lib/vaccination/vaccination-service";
import type { VaccinationRecord, VaccinationStatus } from "@/types/vaccination";

type VaccinationRecordsPanelProps = {
  cowId: string;
};

const statusClasses: Record<VaccinationStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  done: "bg-emerald-50 text-emerald-700",
  missed: "bg-rose-50 text-rose-700",
};

export function VaccinationRecordsPanel({ cowId }: VaccinationRecordsPanelProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  async function loadRecords() {
    setError("");
    setIsLoading(true);

    try {
      const recentRecords = await getRecentVaccinationRecords(cowId);
      setRecords(recentRecords);
    } catch {
      setError("Could not load vaccination reminders yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialRecords() {
      try {
        const recentRecords = await getRecentVaccinationRecords(cowId);

        if (isMounted) {
          setRecords(recentRecords);
        }
      } catch {
        if (isMounted) {
          setError("Could not load vaccination reminders yet.");
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

  const overdue = records.filter((record) => record.status === "pending" && isOverdue(record.dueDate)).length;
  const dueSoon = records.filter((record) => record.status === "pending" && isWithinNextDays(record.dueDate, 15)).length;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-emerald-700">Vaccination reminders</p>
        <h3 className="text-lg font-semibold text-slate-950">Vaccination history</h3>
        <p className="text-sm leading-6 text-slate-600">
          Track vaccine due dates, completed vaccines, and missed reminders.
        </p>
      </div>

      <div className="mt-4">
        <VaccinationRecordForm cowId={cowId} onSaved={loadRecords} />
      </div>

      {isLoading ? (
        <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          Loading vaccination reminders...
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && records.length === 0 ? (
        <p className="mt-4 rounded-md border border-dashed border-slate-300 px-3 py-4 text-center text-sm text-slate-600">
          No vaccination reminders added yet.
        </p>
      ) : null}

      {records.length > 0 ? (
        <div className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard label="Upcoming" value={String(dueSoon)} />
            <SummaryCard label="Overdue" value={String(overdue)} />
            <SummaryCard label="Total reminders" value={String(records.length)} />
          </div>

          {records.map((record) => (
            <article key={record.id} className="rounded-md border border-slate-200 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{record.vaccineName}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Due: {formatDisplayDate(record.dueDate)}
                    {record.givenDate ? ` - Given: ${formatDisplayDate(record.givenDate)}` : ""}
                  </p>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[record.status]}`}
                >
                  {record.status}
                </span>
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

function isOverdue(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(value) < today;
}

function isWithinNextDays(value: string, days: number) {
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
