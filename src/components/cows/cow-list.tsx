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
          setError("Could not load Firestore cows yet. Showing sample cow profiles.");
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
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
        Loading cow profiles...
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {error ? (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
          {error}
        </p>
      ) : null}

      {cows.length > 0 ? (
        cows.map((cow) => <CowCard key={cow.id} cow={cow} />)
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">No cows added yet</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add your first cow profile to start tracking milk, health, and farm history.
          </p>
        </div>
      )}
    </div>
  );
}
