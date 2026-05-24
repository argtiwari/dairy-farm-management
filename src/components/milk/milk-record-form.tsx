"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createMilkRecord } from "@/lib/milk/milk-service";

type MilkRecordFormProps = {
  cowId: string;
  onSaved: () => void;
};

export function MilkRecordForm({ cowId, onSaved }: MilkRecordFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add milk records.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const recordDate = String(formData.get("recordDate") ?? "");
    const morningLiters = Number(formData.get("morningLiters") ?? 0);
    const eveningLiters = Number(formData.get("eveningLiters") ?? 0);

    if (!recordDate) {
      setError("Record date is required.");
      return;
    }

    if (morningLiters < 0 || eveningLiters < 0) {
      setError("Milk liters cannot be negative.");
      return;
    }

    setIsSaving(true);

    try {
      await createMilkRecord({
        cowId,
        recordDate,
        morningLiters,
        eveningLiters,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save milk record. Check permissions and Firestore rules.");
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
        Viewer mode: milk record entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="recordDate">
            Date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="recordDate"
            name="recordDate"
            required
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="morningLiters">
            Morning liters
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="morningLiters"
            min="0"
            name="morningLiters"
            required
            step="0.1"
            type="number"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="eveningLiters">
            Evening liters
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="eveningLiters"
            min="0"
            name="eveningLiters"
            required
            step="0.1"
            type="number"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="notes">
          Notes
        </label>
        <textarea
          className="min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="notes"
          name="notes"
          placeholder="Optional feed, health, or milking note"
        />
      </div>

      {error ? (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p>
      ) : null}

      <button
        className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isSaving}
        type="submit"
      >
        {isSaving ? "Saving milk record..." : "Add milk record"}
      </button>
    </form>
  );
}
