"use client";

import Link from "next/link";
import { Beef, BellRing, CalendarClock, ChevronRight, HeartPulse, Milk, Sparkles, Users, Wallet } from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";
import { useAuth } from "@/components/auth/auth-provider";
import { mockCows } from "@/lib/cows/mock-cows";

const nextTasks = [
  {
    href: "/cows",
    title: "Review animals that need care",
    subtitle: "Check the top cows with alerts",
    icon: Beef,
  },
  {
    href: "/reminders",
    title: "Handle today’s reminders",
    subtitle: "Vaccines, follow-ups, and urgent alerts",
    icon: BellRing,
  },
  {
    href: "/expenses",
    title: "Log today’s expense",
    subtitle: "Capture feed, medicine, and worker costs",
    icon: Wallet,
  },
] as const;

const quickActions = [
  { href: "/cows", label: "Animals", icon: Beef },
  { href: "/reminders", label: "Alerts", icon: BellRing },
  { href: "/milk", label: "Milk", icon: Milk },
  { href: "/expenses", label: "Expenses", icon: Wallet },
] as const;

const todayAlerts = [
  {
    title: "Vaccine due",
    detail: "Radha needs her follow-up shot today.",
    href: "/reminders",
    icon: HeartPulse,
  },
  {
    title: "Milk entry missing",
    detail: "Gauri has no morning yield recorded.",
    href: "/milk",
    icon: Milk,
  },
  {
    title: "Expense note open",
    detail: "Yesterday’s feed cost still needs logging.",
    href: "/expenses",
    icon: Wallet,
  },
] as const;

const farmSnapshot = [
  {
    label: "Milk to record",
    value: "315 L",
    href: "/milk",
    icon: Milk,
  },
  {
    label: "Vaccines due",
    value: "3",
    href: "/reminders",
    icon: HeartPulse,
  },
  {
    label: "Alerts open",
    value: "2",
    href: "/reminders",
    icon: BellRing,
  },
  {
    label: "Pending expense",
    value: "₹45k",
    href: "/expenses",
    icon: Wallet,
  },
] as const;

const recentActivity = [
  {
    title: "Milk logged for Gauri",
    detail: "Added this morning",
    href: "/cows",
    icon: Sparkles,
  },
  {
    title: "Reminder updated",
    detail: "Radha’s vaccine moved to today",
    href: "/reminders",
    icon: CalendarClock,
  },
  {
    title: "Expense recorded",
    detail: "Feed cost saved",
    href: "/expenses",
    icon: Wallet,
  },
] as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const recentAnimals = mockCows.slice(0, 3);
  const farmName = user?.name ? `${user.name}'s dairy` : "Your dairy farm";

  return (
    <main className="min-h-screen bg-[#f8faf3] px-3 pb-28 pt-4 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-3xl flex-col gap-4">
        <AppCard className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Good morning</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{farmName}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">What are the next 3 things you should do?</p>
            </div>
            <AuthActions />
          </div>

          <div className="mt-5 space-y-3">
            {nextTasks.map((task) => {
              const Icon = task.icon;
              return (
                <Link
                  key={task.title}
                  href={task.href}
                  className="group flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{task.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{task.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-emerald-700" />
                </Link>
              );
            })}
          </div>
        </AppCard>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Quick actions</p>
              <p className="mt-1 text-sm text-slate-600">Tap the task you want to start.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Action
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{action.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </AppCard>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Today’s alerts</p>
              <p className="mt-1 text-sm text-slate-600">Choose what to fix first.</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Urgent
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {todayAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <Link
                  key={alert.title}
                  href={alert.href}
                  className="group flex items-center gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-950">{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{alert.detail}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-amber-700" />
                </Link>
              );
            })}
          </div>
        </AppCard>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Farm snapshot</p>
              <p className="mt-1 text-sm text-slate-600">See what needs a decision now.</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {farmSnapshot.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </AppCard>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Recent animals</p>
              <p className="mt-1 text-sm text-slate-600">Open the animals that need your attention.</p>
            </div>
            <Link href="/cows" className="text-sm font-semibold text-emerald-700">
              See all
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentAnimals.map((cow) => {
              const shortName = cow.name ? cow.name : cow.cowNumber;
              const initials = shortName.slice(0, 2).toUpperCase();
              return (
                <Link
                  key={cow.id}
                  href={`/cows/${cow.id}`}
                  className="group flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-sm font-semibold text-emerald-700">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{shortName}</p>
                      <p className="mt-1 text-sm text-slate-600">{cow.breed || "No breed info"}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-emerald-700" />
                </Link>
              );
            })}
          </div>
        </AppCard>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Recent activity</p>
              <p className="mt-1 text-sm text-slate-600">What changed last.</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-emerald-700" />
                </Link>
              );
            })}
          </div>
        </AppCard>
      </section>
    </main>
  );
}
