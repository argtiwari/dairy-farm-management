import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-5 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5">
        <header className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <Link className="text-sm font-medium text-emerald-700" href="/">
            Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use a Firebase Authentication user account to access farm records.
          </p>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
