"use client";

import { useAuth } from "@/components/auth/auth-provider";

type AdminOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user?.role !== "admin") {
    return fallback;
  }

  return children;
}
