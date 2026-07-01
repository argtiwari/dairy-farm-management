import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5">
        <header className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <Link className="text-sm font-medium text-emerald-700" href="/">
            Back to home
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use your farm account to open cow profiles, records, reminders, and other daily operations.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Admin users can update records, while viewer accounts can still review the farm dashboard.
          </p>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
