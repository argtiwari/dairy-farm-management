"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

type AdminPageGuardProps = {
  children: React.ReactNode;
};

export function AdminPageGuard({ children }: AdminPageGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        Checking permissions...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Sign in required</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Please sign in before adding or editing cow profiles.
        </p>
        <Link
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
          href="/login"
        >
          Go to login
        </Link>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Admin access required</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your current account is set to viewer mode. You can browse farm records, but editing is reserved for admin accounts.
        </p>
        <Link
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          href="/cows"
        >
          Back to cow profiles
        </Link>
      </div>
    );
  }

  return children;
}
