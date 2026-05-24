"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFarmReminders } from "@/lib/reminders/reminder-service";
import type { FarmReminder, ReminderPriority } from "@/types/reminder";

const priorityClasses: Record<ReminderPriority, string> = {
  overdue: "bg-rose-50 text-rose-700",
  "due-soon": "bg-amber-50 text-amber-700",
  upcoming: "bg-slate-50 text-slate-700",
};

export function RemindersDashboard() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState<FarmReminder[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadReminders() {
      try {
        const nextReminders = await getFarmReminders();

        if (isMounted) {
          setReminders(nextReminders);
        }
      } catch {
        if (isMounted) {
          setError("Could not load farm reminders yet.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReminders();

    return () => {
      isMounted = false;
    };
  }, []);

  const overdueCount = reminders.filter((reminder) => reminder.priority === "overdue").length;
  const dueSoonCount = reminders.filter((reminder) => reminder.priority === "due-soon").length;

  return (
    <section className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Overdue" value={String(overdueCount)} />
        <SummaryCard label="Due soon" value={String(dueSoonCount)} />
        <SummaryCard label="Total reminders" value={String(reminders.length)} />
      </div>

      {isLoading ? (
        <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Loading reminders...
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      {!isLoading && reminders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">No urgent reminders</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Upcoming vaccinations, pregnancy deliveries, and health follow-ups will appear here.
          </p>
        </div>
      ) : null}

      {reminders.length > 0 ? (
        <div className="grid gap-3">
          {reminders.map((reminder) => (
            <article key={reminder.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{reminder.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {reminder.cowLabel} - {reminder.category} - due {formatDisplayDate(reminder.dueDate)}
                  </p>
                  {reminder.note ? (
                    <p className="mt-2 text-sm leading-5 text-slate-600">{reminder.note}</p>
                  ) : null}
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${priorityClasses[reminder.priority]}`}
                >
                  {reminder.priority}
                </span>
              </div>
              <Link
                className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                href={`/cows/${reminder.cowId}`}
              >
                Open cow profile
              </Link>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
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
