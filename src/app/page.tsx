"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Beef,
  BellRing,
  CheckCircle2,
  HeartPulse,
  Milk,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";
import { useAuth } from "@/components/auth/auth-provider";

const featureCards = [
  {
    title: "Cows",
    description: "Health, milk, and notes for every animal.",
    icon: Beef,
  },
  {
    title: "Milk",
    description: "Record daily yield fast and clearly.",
    icon: Milk,
  },
  {
    title: "Alerts",
    description: "Vaccines, checks, and reminders stay visible.",
    icon: BellRing,
  },
  {
    title: "Expenses",
    description: "Track costs for feed, medicine, and labor.",
    icon: Wallet,
  },
] as const;

const workSteps = [
  {
    title: "Start your day",
    detail: "Open your farm dashboard and see the next actions.",
    icon: Sparkles,
  },
  {
    title: "Track fast",
    detail: "Add milk, vaccination, expense and worker updates quickly.",
    icon: CheckCircle2,
  },
  {
    title: "Stay on top",
    detail: "Follow reminders and complete urgent farm tasks.",
    icon: HeartPulse,
  },
] as const;

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [isLoading, router, user]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-4xl flex-col gap-4">
          <div className="rounded-[28px] border border-emerald-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Resuming your farm</p>
            <h1 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Loading your daily assistant</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              One moment while we restore your farm session.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (user) {
    return (
      <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
        <section className="mx-auto flex max-w-4xl flex-col gap-4">
          <div className="rounded-[28px] border border-emerald-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-700">Welcome back</p>
            <h1 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Taking you to your farm</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Redirecting to your dashboard so you can continue where you left off.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-[32px] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Dairy Farm Assistant</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Manage cows, milk, reminders, and expenses without extra noise.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                A friendly farm app built for Indian dairy owners and managers. See today’s work, update records, and keep your herd healthy from one simple place.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-[28px] border border-emerald-100 bg-[#f4fff5] p-5 shadow-sm sm:max-w-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-md">
                <Beef className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-950">Farm-ready workflow</p>
                <p className="mt-1 text-sm text-slate-600">Start with your daily farm tasks and stay on top of every update.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Login to your farm
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white px-6 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Explore the dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[0.9fr_0.95fr]">
          <AppCard className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Why dairy farms love it</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Built to fit daily farm rhythm</h2>
              </div>
              <div className="rounded-3xl bg-emerald-50 p-3 text-emerald-700">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-[24px] border border-slate-200 bg-[#fcfbf7] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-950">{feature.title}</p>
                        <p className="text-sm text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AppCard>

          <AppCard className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">How it works</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Farm tasks in three simple steps</h2>
              </div>
              <div className="rounded-3xl bg-sky-50 p-3 text-sky-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {workSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-start gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{step.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AppCard>
        </section>

        <AppCard className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Ready for your first farm day?</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">Start managing with a tap.</h2>
            </div>
            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Login and begin
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AppCard>
      </section>
    </main>
  );
}

function SimpleTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-[#fcfbf7] p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          <p className="text-sm text-slate-600">{value}</p>
        </div>
      </div>
    </div>
  );
}
