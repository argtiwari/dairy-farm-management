"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createHealthRecord } from "@/lib/health/health-service";
import type { HealthSeverity } from "@/types/health";

type HealthRecordFormProps = {
  cowId: string;
  onSaved: () => void;
};

const severityOptions: HealthSeverity[] = ["low", "medium", "high"];

export function HealthRecordForm({ cowId, onSaved }: HealthRecordFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add health records.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const recordDate = String(formData.get("recordDate") ?? "");
    const issue = String(formData.get("issue") ?? "").trim();
    const severity = String(formData.get("severity") ?? "low") as HealthSeverity;

    if (!recordDate || !issue) {
      setError("Record date and issue are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createHealthRecord({
        cowId,
        recordDate,
        issue,
        severity,
        treatment: String(formData.get("treatment") ?? "").trim() || undefined,
        followUpDate: String(formData.get("followUpDate") ?? "") || undefined,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save health record. Check permissions and Firestore rules.");
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
        Viewer mode: health record entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="healthRecordDate">
            Date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="healthRecordDate"
            name="recordDate"
            required
            type="date"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="issue">
            Issue
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="issue"
            name="issue"
            placeholder="Fever, injury, weakness"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="severity">
            Severity
          </label>
          <select
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            defaultValue="low"
            id="severity"
            name="severity"
          >
            {severityOptions.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="treatment">
            Treatment
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="treatment"
            name="treatment"
            placeholder="Medicine or treatment given"
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="followUpDate">
            Follow-up date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="followUpDate"
            name="followUpDate"
            type="date"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="healthNotes">
          Notes
        </label>
        <textarea
          className="min-h-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="healthNotes"
          name="notes"
          placeholder="Symptoms, vet advice, observation"
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
        {isSaving ? "Saving health record..." : "Add health record"}
      </button>
    </form>
  );
}
