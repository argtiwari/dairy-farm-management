"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { loginWithEmailPassword } from "@/lib/auth/auth-service";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Email aur password dono likho.");
      return;
    }

    setIsSubmitting(true);

    try {
      await loginWithEmailPassword(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Login nahi hua. Email aur password check karo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 px-3 py-3">
        <p className="text-sm font-semibold text-emerald-800">Apna farm account khol kar aage badho</p>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-slate-800" htmlFor="email">
        Email
        <div className="flex h-12 items-center gap-2 rounded-[16px] border border-slate-300 px-3">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            autoComplete="email"
            className="w-full bg-transparent text-sm outline-none"
            id="email"
            name="email"
            placeholder="admin@farm.com"
            required
            type="email"
          />
        </div>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-slate-800" htmlFor="password">
        Password
        <div className="flex h-12 items-center gap-2 rounded-[16px] border border-slate-300 px-3">
          <Lock className="h-4 w-4 text-slate-400" />
          <input
            autoComplete="current-password"
            className="w-full bg-transparent text-sm outline-none"
            id="password"
            name="password"
            placeholder="Password likho"
            required
            type="password"
          />
        </div>
      </label>

      {error ? (
        <p className="rounded-[16px] bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        className="flex h-12 items-center justify-center gap-2 rounded-[16px] bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Login ho raha hai..." : "Login karo"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
