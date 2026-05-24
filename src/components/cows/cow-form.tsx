"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cowStatusLabels } from "@/lib/cows/status";
import type { CowStatus } from "@/types/cow";

const cowStatuses = Object.keys(cowStatusLabels) as CowStatus[];

export function CowForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      const { createCowProfile } = await import("@/lib/cows/cow-service");

      await createCowProfile({
        cowNumber,
        name: String(formData.get("name") ?? "").trim() || undefined,
        breed,
        birthDate: String(formData.get("birthDate") ?? "") || undefined,
        status: String(formData.get("status") ?? "active") as CowStatus,
        notes: String(formData.get("notes") ?? "").trim() || undefined,
      });

      router.push("/cows");
      router.refresh();
    } catch {
      setError("Could not save cow profile. Please check Firebase setup and try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="cowNumber">
          Cow ID number
        </label>
        <input
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="cowNumber"
          name="cowNumber"
          placeholder="Example: G-001"
          required
          type="text"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="name">
          Cow name
        </label>
        <input
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="name"
          name="name"
          placeholder="Example: Gauri"
          type="text"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="breed">
            Breed
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="breed"
          name="breed"
          placeholder="Sahiwal, Jersey, HF"
          required
          type="text"
        />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-800" htmlFor="birthDate">
            Birth date
          </label>
          <input
            className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="birthDate"
            name="birthDate"
            type="date"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="status">
          Status
        </label>
        <select
          className="h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          defaultValue="active"
          id="status"
          name="status"
        >
          {cowStatuses.map((status) => (
            <option key={status} value={status}>
              {cowStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-800" htmlFor="notes">
          Notes
        </label>
        <textarea
          className="min-h-28 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          id="notes"
          name="notes"
          placeholder="Health, behavior, feeding, or owner notes"
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
  );
}
