"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createVaccinationRecord } from "@/lib/vaccination/vaccination-service";
import type { VaccinationStatus } from "@/types/vaccination";

type VaccinationRecordFormProps = {
  cowId: string;
  onSaved: () => void;
};

const statusOptions: VaccinationStatus[] = ["pending", "done", "missed"];

export function VaccinationRecordForm({ cowId, onSaved }: VaccinationRecordFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add vaccination reminders.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const vaccineName = String(formData.get("vaccineName") ?? "").trim();
    const dueDate = String(formData.get("dueDate") ?? "");
    const status = String(formData.get("status") ?? "pending") as VaccinationStatus;

    if (!vaccineName || !dueDate) {
      setError("Vaccine name and due date are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createVaccinationRecord({
        cowId,
        vaccineName,
        dueDate,
        status,
        givenDate: String(formData.get("givenDate") ?? "") || undefined,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save vaccination reminder. Check permissions and Firestore rules.");
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
        Viewer mode: vaccination entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="vaccineName">
            Vaccine name
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="vaccineName"
            name="vaccineName"
            placeholder="Example: FMD, HS, BQ"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="dueDate">
            Due date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="dueDate"
            name="dueDate"
            required
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="vaccinationStatus">
            Status
          </label>
          <select
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            defaultValue="pending"
            id="vaccinationStatus"
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

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="givenDate">
            Given date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="givenDate"
            name="givenDate"
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="vaccinationNotes">
            Notes
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="vaccinationNotes"
            name="notes"
            placeholder="Batch, vet, location, reminder note"
            type="text"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p>
      ) : null}

      <button
        className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isSaving}
        type="submit"
      >
        {isSaving ? "Saving vaccination reminder..." : "Add vaccination reminder"}
      </button>
    </form>
  );
}
