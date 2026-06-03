import Link from "next/link";
import { AuthActions } from "@/components/auth/auth-actions";
import {
  Milk,
  Wallet,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Beef,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf9f4] px-4 py-6">
      <section className="mx-auto max-w-7xl space-y-6">

        <header className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Dairy Farm Management System
              </p>

              <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-950">
                Welcome Back 👋
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600">
                Here's what's happening in your farm today.
              </p>
            </div>

            <AuthActions />
          </div>
        </header>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <DashboardCard
  title="Total Animals"
  value="42"
  subtitle="Active: 38"
  icon={<Beef size={24} className="text-emerald-700" />}
  iconBg="bg-emerald-100"
/>

<DashboardCard
  title="Today's Milk"
  value="315 L"
  subtitle="+12% vs yesterday"
  icon={<Milk size={24} className="text-blue-700" />}
  iconBg="bg-blue-100"
/>

<DashboardCard
  title="Pregnant Animals"
  value="8"
  subtitle="+2 this month"
  icon={<HeartPulse size={24} className="text-pink-700" />}
  iconBg="bg-pink-100"
/>

<DashboardCard
  title="Due Vaccinations"
  value="3"
  subtitle="View reminders"
  icon={<ShieldAlert size={24} className="text-amber-700" />}
  iconBg="bg-amber-100"
/>

<DashboardCard
  title="Monthly Expense"
  value="₹45,230"
  subtitle="-8% vs last month"
  icon={<Wallet size={24} className="text-violet-700" />}
  iconBg="bg-violet-100"
/>

<DashboardCard
  title="Estimated Profit"
  value="₹21,500"
  subtitle="+15% vs last month"
  icon={<TrendingUp size={24} className="text-emerald-700" />}
  iconBg="bg-emerald-100"
/>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-950">
                Recent Alerts
              </h2>

              <Link
                href="/reminders"
                className="text-sm font-medium text-emerald-700"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              <AlertItem text="Gauri (G-001) - Vaccine due in 2 days" />
              <AlertItem text="Lakshmi (L-015) - Checkup pending" />
              <AlertItem text="2 deliveries expected next week" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">
              Recent Activity
            </h2>

            <div className="mt-4 space-y-3">
              <ActivityItem text="Milk record added - Gauri" />
              <ActivityItem text="Medicine added - Lakshmi" />
              <ActivityItem text="Expense recorded - Feed purchase" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-950">
              Quick Actions
            </h2>

            <div className="mt-4 grid gap-3">
              <QuickLink href="/cows" label="🐄 Animals" />
              <QuickLink href="/expenses" label="💰 Expenses" />
              <QuickLink href="/workers" label="👷 Workers" />
              <QuickLink href="/reminders" label="🔔 Reminders" />
            </div>
          </div>

        </section>
      </section>
    </main>
  );
}
function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
          <p className="mt-2 text-sm text-emerald-700">{subtitle}</p>
        </div>

        <div className={`rounded-2xl p-2.5 ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function AlertItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
      {text}
    </div>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
      {text}
    </div>
  );
}

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-12 items-center justify-center rounded-2xl bg-emerald-600 font-medium text-white transition hover:bg-emerald-700"
    >
      {label}
    </Link>
  );
}