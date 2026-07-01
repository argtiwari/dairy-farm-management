import Link from "next/link";
import { Beef } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-4">
        <header className="rounded-[28px] border border-emerald-100 bg-white p-5 shadow-sm">
          <Link className="text-sm font-semibold text-emerald-700" href="/">
            ← Home
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Beef className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">Farm account</p>
              <h1 className="text-xl font-black text-slate-950">Login karo</h1>
            </div>
          </div>

          <div className="mt-4 rounded-[20px] bg-emerald-50 p-3 text-sm text-emerald-800">
            <p className="font-semibold">Sirf 2 cheezein chahiye</p>
            <p className="mt-1">Email aur password. Phir aapka kaam shuru.</p>
          </div>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
