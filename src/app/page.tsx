import { milestones, primaryModules } from "@/lib/project-plan";
import Link from "next/link";
import { AuthActions } from "@/components/auth/auth-actions";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-emerald-700">Dairy Farm Management System</p>
            <AuthActions />
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Simple dairy records for real farm owners
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Mobile-first, Hindi-friendly, and built feature by feature with cow profiles as our first
            production milestone.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { href: "/cows", label: "Cow profiles" },
              { href: "/reminders", label: "Reminders" },
              { href: "/expenses", label: "Expenses" },
              { href: "/workers", label: "Workers" },
            ].map((link) => (
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {primaryModules.map((module) => (
            <article key={module.title} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{module.title}</p>
              <p className="mt-2 text-sm leading-5 text-slate-600">{module.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-emerald-700">Current roadmap</p>
            <h2 className="text-lg font-semibold text-slate-950">Build in small, testable phases</h2>
          </div>

          <div className="mt-4 grid gap-3">
            {milestones.map((milestone, index) => (
              <div key={milestone.title} className="flex gap-3 rounded-md bg-slate-50 p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{milestone.title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
