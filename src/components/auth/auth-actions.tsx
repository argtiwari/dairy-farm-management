"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/auth-service";
import { useAuth } from "@/components/auth/auth-provider";

export function AuthActions() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  if (isLoading) {
    return <p className="text-sm text-slate-500">Checking login...</p>;
  }

  if (!user) {
    return (
      <Link
        className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
        href="/login"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="text-sm text-slate-600">
        <span className="font-semibold text-slate-900">{user.name ?? user.email}</span>
        <span className="ml-1 text-slate-500">({user.role})</span>
      </div>
      <button
        aria-label="Sign out of your farm account"
        className="text-sm font-semibold text-rose-700 transition hover:text-rose-800"
        onClick={handleLogout}
        type="button"
      >
        Sign out
      </button>
    </div>
  );
}
