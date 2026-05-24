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
      <Link className="text-sm font-semibold text-emerald-700" href="/login">
        Login
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm text-slate-600">
        {user.email} <span className="font-semibold text-slate-900">({user.role})</span>
      </p>
      <button className="text-sm font-semibold text-rose-700" onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
}
