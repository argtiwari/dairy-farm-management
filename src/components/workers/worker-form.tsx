"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createWorker } from "@/lib/workers/worker-service";
import type { WorkerStatus } from "@/types/worker";

type WorkerFormProps = {
  onSaved: () => void;
};

export function WorkerForm({ onSaved }: WorkerFormProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (user?.role !== "admin") {
      setError("Only admins can add workers.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const monthlySalaryValue = String(formData.get("monthlySalary") ?? "");
    const status = String(formData.get("status") ?? "active") as WorkerStatus;

    if (!name || !role) {
      setError("Worker name and role are required.");
      return;
    }

    setIsSaving(true);

    try {
      await createWorker({
        name,
        role,
        status,
        phone: String(formData.get("phone") ?? "").trim() || undefined,
        monthlySalary: monthlySalaryValue ? Number(monthlySalaryValue) : undefined,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      form.reset();
      onSaved();
    } catch {
      setError("Could not save worker. Check permissions and Firestore rules.");
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
        Viewer mode: worker entry is admin-only.
      </p>
    );
  }

  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Worker name" name="name" placeholder="Example: Ramesh" required />
        <Field label="Phone" name="phone" placeholder="Optional" type="tel" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Role" name="role" placeholder="Milking, feeding, cleaning" required />
        <Field label="Monthly salary" name="monthlySalary" placeholder="Optional" type="number" />
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="status">
            Status
          </label>
          <select className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" defaultValue="active" id="status" name="status">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
      </div>

      <Field label="Notes" name="notes" placeholder="Attendance, payment, responsibility notes" />

      {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p> : null}

      <button className="h-11 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300" disabled={isSaving} type="submit">
        {isSaving ? "Saving worker..." : "Add worker"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-slate-800" htmlFor={name}>
        {label}
      </label>
      <input className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" id={name} name={name} placeholder={placeholder} required={required} type={type} />
    </div>
  );
}
