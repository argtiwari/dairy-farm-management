import Link from "next/link";
import { AdminOnly } from "@/components/auth/admin-only";
import { AuthActions } from "@/components/auth/auth-actions";
import { CowList } from "@/components/cows/cow-list";

export default function CowsPage() {
  return (
    <main className="min-h-screen bg-[#fdf9f4] px-4 py-6 text-slate-900 sm:px-6">
      <section className="mx-auto w-full max-w-7xl">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
              href="/"
            >
              ← Dashboard
            </Link>

            <AuthActions />
          </div>

          <AdminOnly
            fallback={
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                Viewer Mode
              </div>
            }
          >
            <Link
              href="/cows/new"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white shadow-md transition hover:bg-emerald-700"
            >
              +
            </Link>
          </AdminOnly>
        </header>

        <CowList />
      </section>
    </main>
  );
}