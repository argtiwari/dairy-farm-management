"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createMedicineRecord } from "@/lib/medicine/medicine-service";

type MedicineRecordFormProps = {
  cowId: string;
  onSaved: () => void;
};

export function MedicineRecordForm({ cowId, onSaved }: MedicineRecordFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add medicine records.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const medicineName = String(formData.get("medicineName") ?? "").trim();
    const dosage = String(formData.get("dosage") ?? "").trim();
    const reason = String(formData.get("reason") ?? "").trim();
    const startDate = String(formData.get("startDate") ?? "");

    if (!medicineName || !dosage || !reason || !startDate) {
      setError("Medicine name, dosage, reason, and start date are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createMedicineRecord({
        cowId,
        medicineName,
        dosage,
        reason,
        startDate,
        endDate: String(formData.get("endDate") ?? "") || undefined,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save medicine record. Check permissions and Firestore rules.");
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
        Viewer mode: medicine record entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="medicineName">
            Medicine name
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="medicineName"
            name="medicineName"
            placeholder="Example: Calcium, Antibiotic"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="dosage">
            Dosage
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="dosage"
            name="dosage"
            placeholder="Example: 10 ml twice daily"
            required
            type="text"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="reason">
            Reason
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="reason"
            name="reason"
            placeholder="Fever, weakness, recovery"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="startDate">
            Start date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="startDate"
            name="startDate"
            required
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="endDate">
            End date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="endDate"
            name="endDate"
            type="date"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="medicineNotes">
          Notes
        </label>
        <textarea
          className="min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="medicineNotes"
          name="notes"
          placeholder="Vet instruction, response, side effects"
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
        {isSaving ? "Saving medicine record..." : "Add medicine record"}
      </button>
    </form>
  );
}
