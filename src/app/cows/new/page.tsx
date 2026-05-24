import Link from "next/link";
import { AdminPageGuard } from "@/components/auth/admin-page-guard";
import { CowForm } from "@/components/cows/cow-form";

export default function NewCowPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <Link className="text-sm font-medium text-emerald-700" href="/cows">
            Cow profiles
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Add cow profile</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Start with the basic profile. Milk, medicine, pregnancy, and vaccination history will be
            added as separate records.
          </p>
        </header>

        <AdminPageGuard>
          <CowForm />
        </AdminPageGuard>
      </section>
    </main>
  );
}
