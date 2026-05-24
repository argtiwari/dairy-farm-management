"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createExpense } from "@/lib/expenses/expense-service";
import type { ExpenseCategory } from "@/types/expense";

type ExpenseFormProps = {
  onSaved: () => void;
};

const categories: ExpenseCategory[] = ["feed", "medicine", "worker", "vet", "maintenance", "other"];

export function ExpenseForm({ onSaved }: ExpenseFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add expenses.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const expenseDate = String(formData.get("expenseDate") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const amount = Number(formData.get("amount") ?? 0);
    const category = String(formData.get("category") ?? "other") as ExpenseCategory;

    if (!expenseDate || !title || amount <= 0) {
      setError("Date, title, and positive amount are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createExpense({
        expenseDate,
        title,
        amount,
        category,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save expense. Check permissions and Firestore rules.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <p className="rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
        Viewer mode: expense entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="expenseDate">
            Date
          </label>
          <input className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id="expenseDate" name="expenseDate" required type="date" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="category">
            Category
          </label>
          <select className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id="category" name="category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="title">
            Expense title
          </label>
          <input className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id="title" name="title" placeholder="Feed purchase, vet visit, salary" required type="text" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="amount">
            Amount
          </label>
          <input className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id="amount" min="1" name="amount" required step="0.01" type="number" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="expenseNotes">
            Notes
          </label>
          <input className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id="expenseNotes" name="notes" placeholder="Optional" type="text" />
        </div>
      </div>

      {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}

      <button className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300" disabled={isSaving} type="submit">
        {isSaving ? "Saving expense..." : "Add expense"}
      </button>
    </form>
  );
}
