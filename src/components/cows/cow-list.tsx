"use client";

import { useEffect, useState } from "react";
import { CowCard } from "@/components/cows/cow-card";
import { mockCows } from "@/lib/cows/mock-cows";
import type { Cow } from "@/types/cow";

export function CowList() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCows() {
      try {
        const { getCowProfiles } = await import("@/lib/cows/cow-service");
        const cowProfiles = await getCowProfiles();

        if (isMounted) {
          setCows(cowProfiles);
        }
      } catch {
        if (isMounted) {
          setError(
            "Could not load Firestore cows yet. Showing sample cow profiles."
          );
          setCows(mockCows);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCows();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">Loading cow profiles...</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Animals
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {cows.length} animals in farm
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <input
          type="text"
          placeholder="Search by cow name, ID or breed..."
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
        />

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            All
          </button>

          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            Active
          </button>

          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            Pregnant
          </button>

          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            Sick
          </button>

          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            Sold
          </button>
        </div>
      </div>

      {cows.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {cows.map((cow) => (
            <CowCard key={cow.id} cow={cow} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            No cows added yet
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Add your first cow profile to start tracking milk, health,
            vaccination and pregnancy records.
          </p>
        </div>
      )}
    </section>
  );
}