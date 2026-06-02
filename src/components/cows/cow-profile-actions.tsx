"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { cowStatusLabels } from "@/lib/cows/status";
import { updateCowProfile, updateCowStatus } from "@/lib/cows/cow-service";
import type { Cow, CowStatus } from "@/types/cow";

type CowProfileActionsProps = {
  cow: Cow;
  onChanged: () => void;
};

const cowStatuses = Object.keys(cowStatusLabels) as CowStatus[];

export function CowProfileActions({ cow, onChanged }: CowProfileActionsProps) {
  const { user, isLoading } = useAuth();
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading || user?.role !== "admin") {
    return null;
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const cowNumber = String(formData.get("cowNumber") ?? "").trim();
    const breed = String(formData.get("breed") ?? "").trim();

    if (!cowNumber || !breed) {
      setError("Cow ID number and breed are required.");
      return;
    }

    setIsSaving(true);

    try {
      await updateCowProfile(cow.id, {
        cowNumber,
        breed,
        name: String(formData.get("name") ?? "").trim() || undefined,
        birthDate: String(formData.get("birthDate") ?? "") || undefined,
        status: String(formData.get("status") ?? "active") as CowStatus,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });
      setIsEditing(false);
      onChanged();
    } catch {
      setError("Could not update cow profile. Check permissions and Firestore rules.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(status: CowStatus) {
    const confirmed = window.confirm(`Mark this cow as ${status}?`);

    if (!confirmed) {
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      await updateCowStatus(cow.id, status);
      onChanged();
    } catch {
      setError("Could not update cow status. Check permissions and Firestore rules.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">Admin actions</p>
          <p className="mt-1 text-sm text-slate-600">Edit profile details or archive this cow.</p>
        </div>
        <button
          className="h-10 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          onClick={() => {
            setError("");
            setIsEditing((current) => !current);
          }}
          type="button"
        >
          {isEditing ? "Close editor" : "Edit profile"}
        </button>
      </div>

      {isEditing ? (
        <form className="mt-4 grid gap-3 rounded-md bg-slate-50 p-3" onSubmit={handleUpdate}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field defaultValue={cow.cowNumber} label="Cow ID number" name="cowNumber" required />
            <Field defaultValue={cow.name ?? ""} label="Cow name" name="name" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Field defaultValue={cow.breed} label="Breed" name="breed" required />
            <Field defaultValue={cow.birthDate ?? ""} label="Birth date" name="birthDate" type="date" />
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor="cowStatus">
                Status
              </label>
              <select
                className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                defaultValue={cow.status}
                id="cowStatus"
                name="status"
              >
                {cowStatuses.map((status) => (
                  <option key={status} value={status}>
                    {cowStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="cowNotes">
              Notes
            </label>
            <textarea
              className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              defaultValue={cow.notes ?? ""}
              id="cowNotes"
              name="notes"
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
            {isSaving ? "Saving..." : "Save cow profile"}
          </button>
        </form>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          className="h-10 rounded-md border border-amber-200 px-4 text-sm font-semibold text-amber-700 hover:bg-amber-50 disabled:text-slate-400"
          disabled={isSaving || cow.status === "inactive"}
          onClick={() => handleStatusChange("inactive")}
          type="button"
        >
          Mark inactive
        </button>
        <button
          className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:text-slate-400"
          disabled={isSaving || cow.status === "sold"}
          onClick={() => handleStatusChange("sold")}
          type="button"
        >
          Mark sold
        </button>
      </div>

      {!isEditing && error ? (
        <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p>
      ) : null}
    </section>
  );
}

function Field({
  defaultValue,
  label,
  name,
  required = false,
  type = "text",
}: {
  defaultValue: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-slate-800" htmlFor={name}>
        {label}
      </label>
      <input
        className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}
