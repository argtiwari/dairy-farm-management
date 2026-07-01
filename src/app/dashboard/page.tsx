import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Beef,
  BellRing,
  CalendarClock,
  HeartPulse,
  Milk,
  TrendingUp,
  Wallet,
  ShieldAlert,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#fdf9f4] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <Beef className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-emerald-700">
                    Dairy Farm Management System
                  </p>
                  <p className="text-xs text-slate-500">Owner dashboard</p>
                </div>
              </div>

              <AuthActions />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                  <Sparkles className="h-4 w-4" />
                  Today at a glance
                </div>

                <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Manage milk, animals, alerts, and profit in one clean place.
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Quickly see what matters today: milk totals, active animals,
                  pending vaccines, pregnancy follow-ups, and daily expenses.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/cows"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
                  >
                    Open Animals
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/reminders"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-emerald-200 bg-white px-5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    View Alerts
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-emerald-100 bg-white p-4 shadow-lg">
                <div className="rounded-[1.4rem] bg-[#fcfbf7] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Farm snapshot</p>
                      <h2 className="text-xl font-bold text-slate-950">Live summary</h2>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Live
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <MiniStat icon={Milk} label="Milk" value="315 L" />
                    <MiniStat icon={Wallet} label="Expense" value="₹45k" />
                    <MiniStat icon={BellRing} label="Alerts" value="3" />
                    <MiniStat icon={Users} label="Workers" value="5" />
                  </div>

                  <div className="mt-4 rounded-2xl bg-emerald-600 p-4 text-white shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Estimated profit</p>
                        <p className="text-2xl font-black">₹21,500</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <AlertRow
                      icon={ShieldAlert}
                      tone="amber"
                      text="Vaccination due tomorrow for Gauri"
                    />
                    <AlertRow
                      icon={HeartPulse}
                      tone="rose"
                      text="Pregnancy checkup pending for Radha"
                    />
                    <AlertRow
                      icon={CalendarClock}
                      tone="slate"
                      text="Worker salary reminder due this week"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <AppCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Today’s work</p>
                <h2 className="text-2xl font-bold text-slate-950">What needs attention now</h2>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-5 space-y-3">
              <TodayWorkCard title="Check animals" subtitle="Review cows that need attention today" href="/cows" />
              <TodayWorkCard title="Review reminders" subtitle="Vaccines and follow-ups due soon" href="/reminders" />
              <TodayWorkCard title="Add expense" subtitle="Keep feed, medicine, and worker costs current" href="/expenses" />
            </div>
          </AppCard>

          <AppCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Quick actions</p>
                <h2 className="text-2xl font-bold text-slate-950">Daily work</h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <QuickAction href="/cows" label="Open Animals" />
              <QuickAction href="/expenses" label="Add Expense" />
              <QuickAction href="/reminders" label="View Reminders" />
              <QuickAction href="/workers" label="Manage Workers" />
            </div>
          </AppCard>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total Animals" value="42" subtitle="38 active" icon={Beef} />
          <SummaryCard title="Pregnant" value="8" subtitle="2 due soon" icon={HeartPulse} />
          <SummaryCard title="Vaccines Due" value="3" subtitle="Immediate attention" icon={BellRing} />
          <SummaryCard title="Open Alerts" value="2" subtitle="Today" icon={ShieldAlert} />
        </section>

        <AppCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Recent activity</p>
              <h2 className="text-2xl font-bold text-slate-950">What happened recently</h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <ActivityRow title="Morning milk entered" detail="Gauri • 6:30 AM" />
            <ActivityRow title="Vaccination reminder updated" detail="Radha • Yesterday" />
            <ActivityRow title="Expense recorded" detail="Feed purchase • Today" />
          </div>
        </AppCard>

        <AppCard className="border-emerald-100 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Next step</p>
              <h2 className="text-2xl font-bold text-slate-950">
                Login to start managing your dairy farm
              </h2>
            </div>

            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </AppCard>
      </section>
    </main>
  );
}

function TodayWorkCard({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#fcfbf7] px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}

function ActivityRow({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#fcfbf7] px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{detail}</p>
      </div>
      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        New
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-[1.6rem] border border-emerald-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
          <p className="mt-2 text-sm text-emerald-700">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-[#fcfbf7] p-3 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function AlertRow({
  icon: Icon,
  tone,
  text,
}: {
  icon: LucideIcon;
  tone: "amber" | "rose" | "slate";
  text: string;
}) {
  const toneClasses = {
    amber: "bg-amber-50 text-amber-800",
    rose: "bg-rose-50 text-rose-800",
    slate: "bg-slate-50 text-slate-700",
  }[tone];

  return (
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${toneClasses}`}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function QuickAction({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center justify-between rounded-2xl bg-emerald-600 px-4 font-semibold text-white transition hover:bg-emerald-700"
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}