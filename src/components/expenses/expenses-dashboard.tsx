"use client";

import { useEffect, useState } from "react";
import { ExpenseCard } from "@/components/expenses/expense-card";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { getRecentExpenses } from "@/lib/expenses/expense-service";
import type { Expense } from "@/types/expense";

export function ExpensesDashboard() {
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadExpenses() {
    setError("");
    setIsLoading(true);

    try {
      const nextExpenses = await getRecentExpenses();
      setExpenses(nextExpenses);
    } catch {
      setError("Could not load expenses yet.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialExpenses() {
      try {
        const nextExpenses = await getRecentExpenses();

        if (isMounted) {
          setExpenses(nextExpenses);
        }
      } catch {
        if (isMounted) {
          setError("Could not load expenses yet.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const latest = expenses[0];

  return (
    <section className="grid gap-4">
      <ExpenseForm onSaved={loadExpenses} />

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label="Recent total" value={formatMoney(total)} />
        <SummaryCard label="Records" value={String(expenses.length)} />
        <SummaryCard label="Latest" value={latest ? latest.category : "None"} />
      </div>

      {isLoading ? <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Loading expenses...</p> : null}
      {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}

      {!isLoading && expenses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">No expenses added yet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Feed, medicine, worker, and vet costs will appear here.</p>
        </div>
      ) : null}

      <div className="grid gap-3">
        {expenses.map((expense) => (
          <ExpenseCard expense={expense} key={expense.id} onChanged={loadExpenses} />
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
