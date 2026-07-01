"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CowCard } from "@/components/cows/cow-card";
import { AppCard } from "@/components/ui/app-card";
import { mockCows } from "@/lib/cows/mock-cows";
import type { Cow, CowStatus } from "@/types/cow";

const statusFilters: Array<{ value: "all" | CowStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pregnant", label: "Pregnant" },
  { value: "sick", label: "Sick" },
  { value: "sold", label: "Sold" },
];

export function CowList() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | CowStatus>("all");

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

  const filteredCows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return cows.filter((cow) => {
      const matchesFilter = activeFilter === "all" || cow.status === activeFilter;
      if (!matchesFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [cow.name, cow.cowNumber, cow.breed, cow.lastHealthNote, cow.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeFilter, cows, searchQuery]);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Animals</p>
          <h1 className="text-3xl font-black text-slate-950">Find the cow you need fast</h1>
          <p className="text-sm text-slate-600">Loading your herd and the most useful details.</p>
        </div>

        <AppCard className="p-4 sm:p-5">
          <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-44 animate-pulse rounded-[24px] bg-slate-100" />
            ))}
          </div>
        </AppCard>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Animals</p>
        <h1 className="text-3xl font-black text-slate-950">Find the cow you need fast</h1>
        <p className="text-sm text-slate-600">
          {filteredCows.length} of {cows.length} animals ready to review
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {error}
        </div>
      ) : null}

      <AppCard className="p-4 sm:p-5">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#fcfbf7] px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            aria-label="Search cows"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name, ID or breed"
            type="text"
            value={searchQuery}
          />
          {searchQuery ? (
            <button
              aria-label="Clear search"
              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setSearchQuery("")}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {statusFilters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:text-emerald-700"
                }`}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </AppCard>

      {filteredCows.length ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCows.map((cow) => (
            <CowCard key={cow.id} cow={cow} />
          ))}
        </div>
      ) : (
        <AppCard className="border-dashed border-slate-300 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-950">No cows match this view</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Try another search term or switch filters to find the right cow quickly.
          </p>
        </AppCard>
      )}
    </section>
  );
}