import Link from "next/link";
import { AdminOnly } from "@/components/auth/admin-only";
import { AuthActions } from "@/components/auth/auth-actions";
import { CowList } from "@/components/cows/cow-list";

export default function CowsPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <header className="flex flex-col gap-4 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Link className="text-sm font-medium text-emerald-700" href="/">
                Dashboard
              </Link>
              <AuthActions />
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">Cow profiles</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Manage cow ID, breed, milk summary, health status, and important notes.
            </p>
          </div>
          <AdminOnly
            fallback={
              <p className="rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                Viewer mode: cow editing is admin-only.
              </p>
            }
          >
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
              href="/cows/new"
            >
              Add cow
            </Link>
          </AdminOnly>
        </header>

        <CowList />
      </section>
    </main>
  );
}
