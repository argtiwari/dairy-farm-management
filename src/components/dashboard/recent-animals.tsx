import Link from "next/link";
import {
  ChevronRight,
  HeartPulse,
  Milk,
  ShieldCheck,
} from "lucide-react";

const animals = [
  {
    id: "1",
    name: "Gauri",
    breed: "Sahiwal",
    milk: "12.5 L",
    health: "Healthy",
    color: "bg-emerald-100",
  },
  {
    id: "2",
    name: "Lakshmi",
    breed: "Gir",
    milk: "10.2 L",
    health: "Vaccination Due",
    color: "bg-amber-100",
  },
  {
    id: "3",
    name: "Radha",
    breed: "HF Cross",
    milk: "15.8 L",
    health: "Healthy",
    color: "bg-blue-100",
  },
];

export function RecentAnimals() {
  return (
    <section className="mt-8">

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Recent Animals
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your important animals.
          </p>

        </div>

        <Link
          href="/cows"
          className="text-sm font-semibold text-emerald-600"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {animals.map((animal) => (
          <Link
            key={animal.id}
            href={`/cows/${animal.id}`}
            className="group block rounded-[28px] border border-[#E8EFE8] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-3xl ${animal.color}`}
              >
                <span className="text-xl font-black text-slate-700">
                  🐄
                </span>
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-bold text-slate-900">
                    {animal.name}
                  </h3>

                  <ChevronRight
                    size={20}
                    className="text-slate-400 transition group-hover:translate-x-1"
                  />

                </div>

                <p className="text-sm text-slate-500">
                  {animal.breed}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">

                    <Milk
                      size={14}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-semibold text-blue-700">
                      {animal.milk}
                    </span>

                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">

                    <HeartPulse
                      size={14}
                      className="text-emerald-600"
                    />

                    <span className="text-xs font-semibold text-emerald-700">
                      {animal.health}
                    </span>

                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">

                    <ShieldCheck
                      size={14}
                      className="text-slate-600"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                      Active
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}