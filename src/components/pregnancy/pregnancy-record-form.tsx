"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createPregnancyRecord } from "@/lib/pregnancy/pregnancy-service";
import type { PregnancyStatus } from "@/types/pregnancy";

type PregnancyRecordFormProps = {
  cowId: string;
  onSaved: () => void;
};

const statusOptions: PregnancyStatus[] = ["bred", "confirmed", "delivered", "failed"];

export function PregnancyRecordForm({ cowId, onSaved }: PregnancyRecordFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add pregnancy records.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const breedingDate = String(formData.get("breedingDate") ?? "");
    const status = String(formData.get("status") ?? "bred") as PregnancyStatus;

    if (!breedingDate) {
      setError("Breeding date is required.");
      return;
    }

    setIsSaving(true);

    try {
      await createPregnancyRecord({
        cowId,
        breedingDate,
        status,
        expectedDeliveryDate: String(formData.get("expectedDeliveryDate") ?? "") || undefined,
        bullName: String(formData.get("bullName") ?? "").trim() || undefined,
        checkupDate: String(formData.get("checkupDate") ?? "") || undefined,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save pregnancy record. Check permissions and Firestore rules.");
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
        Viewer mode: pregnancy record entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="breedingDate">
            Breeding date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="breedingDate"
            name="breedingDate"
            required
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="expectedDeliveryDate">
            Expected delivery
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="expectedDeliveryDate"
            name="expectedDeliveryDate"
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="checkupDate">
            Checkup date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="checkupDate"
            name="checkupDate"
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="pregnancyStatus">
            Status
          </label>
          <select
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            defaultValue="bred"
            id="pregnancyStatus"
            name="status"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="bullName">
          Bull name / semen details
        </label>
        <input
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="bullName"
          name="bullName"
          placeholder="Optional"
          type="text"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="pregnancyNotes">
          Notes
        </label>
        <textarea
          className="min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="pregnancyNotes"
          name="notes"
          placeholder="Pregnancy check, vet note, delivery observation"
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
        {isSaving ? "Saving pregnancy record..." : "Add pregnancy record"}
      </button>
    </form>
  );
}
