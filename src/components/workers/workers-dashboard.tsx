"use client";

import { useEffect, useState } from "react";
import { WorkerForm } from "@/components/workers/worker-form";
import { getWorkers } from "@/lib/workers/worker-service";
import type { Worker } from "@/types/worker";

export function WorkersDashboard() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [workers, setWorkers] = useState<Worker[]>([]);

  async function loadWorkers() {
    setError("");
    setIsLoading(true);

    try {
      const nextWorkers = await getWorkers();
      setWorkers(nextWorkers);
    } catch {
      setError("Could not load workers yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialWorkers() {
      try {
        const nextWorkers = await getWorkers();

        if (isMounted) {
          setWorkers(nextWorkers);
        }
      } catch {
        if (isMounted) {
          setError("Could not load workers yet.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialWorkers();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeWorkers = workers.filter((worker) => worker.status === "active").length;
  const salaryTotal = workers.reduce((sum, worker) => sum + (worker.monthlySalary ?? 0), 0);

  return (
    <section className="grid gap-4">
      <WorkerForm onSaved={loadWorkers} />

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Active workers" value={String(activeWorkers)} />
        <SummaryCard label="Total workers" value={String(workers.length)} />
        <SummaryCard label="Monthly salary" value={formatMoney(salaryTotal)} />
      </div>

      {isLoading ? <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Loading workers...</p> : null}
      {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}

      {!isLoading && workers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">No workers added yet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Worker contact, salary, and role details will appear here.</p>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {workers.map((worker) => (
          <article key={worker.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-950">{worker.name}</p>
                <p className="mt-1 text-sm text-slate-600">{worker.role}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {worker.status}
              </span>
            </div>
            <div className="mt-3 grid gap-1 text-sm text-slate-600">
              {worker.phone ? <p>Phone: {worker.phone}</p> : null}
              {worker.monthlySalary ? <p>Salary: {formatMoney(worker.monthlySalary)}</p> : null}
              {worker.notes ? <p>{worker.notes}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}
