"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { deleteExpense, updateExpense } from "@/lib/expenses/expense-service";
import type { Expense, ExpenseCategory } from "@/types/expense";

type ExpenseCardProps = {
  expense: Expense;
  onChanged: () => void;
};

const categories: ExpenseCategory[] = ["feed", "medicine", "worker", "vet", "maintenance", "other"];

export function ExpenseCard({ expense, onChanged }: ExpenseCardProps) {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isAdmin = user?.role === "admin";

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
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
      await updateExpense(expense.id, {
        expenseDate,
        title,
        amount,
        category,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      setIsEditing(false);
      onChanged();
    } catch {
      setError("Could not update expense. Check permissions and Firestore rules.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete expense "${expense.title}"? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      await deleteExpense(expense.id);
      onChanged();
    } catch {
      setError("Could not delete expense. Check permissions and Firestore rules.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <article className="rounded-lg border border-emerald-200 bg-white p-4 shadow-sm">
        <form className="grid gap-3" onSubmit={handleUpdate}>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`expenseDate-${expense.id}`}>
                Date
              </label>
              <input
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={expense.expenseDate}
                id={`expenseDate-${expense.id}`}
                name="expenseDate"
                required
                type="date"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`category-${expense.id}`}>
                Category
              </label>
              <select
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={expense.category}
                id={`category-${expense.id}`}
                name="category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`title-${expense.id}`}>
                Expense title
              </label>
              <input
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={expense.title}
                id={`title-${expense.id}`}
                name="title"
                required
                type="text"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`amount-${expense.id}`}>
                Amount
              </label>
              <input
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={expense.amount}
                id={`amount-${expense.id}`}
                min="1"
                name="amount"
                required
                step="0.01"
                type="number"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`notes-${expense.id}`}>
                Notes
              </label>
              <input
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={expense.notes ?? ""}
                id={`notes-${expense.id}`}
                name="notes"
                type="text"
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              className="h-10 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
            <button
              className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => {
                setError("");
                setIsEditing(false);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">{expense.title}</p>
          <p className="mt-1 text-sm text-slate-600">
            {expense.category} - {formatDisplayDate(expense.expenseDate)}
          </p>
          {expense.notes ? <p className="mt-2 text-sm leading-5 text-slate-600">{expense.notes}</p> : null}
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <p className="text-lg font-semibold text-slate-950">{formatMoney(expense.amount)}</p>
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                onClick={() => setIsEditing(true)}
                type="button"
              >
                Edit
              </button>
              <button
                className="text-sm font-semibold text-rose-700 hover:text-rose-800 disabled:text-slate-400"
                disabled={isDeleting}
                onClick={handleDelete}
                type="button"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {error ? <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}
    </article>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
