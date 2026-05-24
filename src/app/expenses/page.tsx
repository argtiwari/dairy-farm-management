import Link from "next/link";
import { ExpensesDashboard } from "@/components/expenses/expenses-dashboard";

export default function ExpensesPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <header className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <Link className="text-sm font-medium text-emerald-700" href="/">
            Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Expenses</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Track feed, medicine, worker, vet, maintenance, and other farm costs.
          </p>
        </header>

        <ExpensesDashboard />
      </section>
    </main>
  );
}
