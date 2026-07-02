import Link from "next/link";
import { Beef } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-xl flex-col gap-5">
        <div className="rounded-[32px] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <Link className="text-sm font-semibold text-emerald-700" href="/">
              ← Home
            </Link>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Farm login
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-[28px] bg-[#f4fff5] p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-md">
              <Beef className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">Your farm, one place</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950">Login to manage your dairy</h1>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-semibold">Quick note</p>
            <p className="mt-1 text-slate-700">Use your farm credentials to open the dashboard and continue managing cows, milk, expenses, and reminders.</p>
          </div>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
