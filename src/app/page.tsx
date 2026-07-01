import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Beef,
  BellRing,
  CalendarClock,
  HeartPulse,
  Milk,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";

const quickActions = [
  {
    href: "/dashboard",
    label: "आज का काम",
    caption: "Open today's action list",
    icon: Sparkles,
  },
  {
    href: "/cows",
    label: "गाय देखें",
    caption: "Check animals",
    icon: Beef,
  },
  {
    href: "/expenses",
    label: "खर्च जोड़ें",
    caption: "Add a new expense",
    icon: Wallet,
  },
  {
    href: "/reminders",
    label: "याद रखें",
    caption: "See alerts",
    icon: BellRing,
  },
] as const;

const todayItems = [
  {
    title: "Vaccination due tomorrow",
    detail: "Gauri needs a follow-up",
    icon: BellRing,
  },
  {
    title: "Pregnancy check",
    detail: "Radha needs a visit soon",
    icon: HeartPulse,
  },
  {
    title: "Milk entry",
    detail: "Add today's milk before evening",
    icon: Milk,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7ed] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-5xl flex-col gap-4">
        <header className="rounded-[28px] border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <Beef className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Dairy Farm</p>
                <p className="text-xs text-slate-500">Simple for daily farm work</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <AuthActions />
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 p-4 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-100">Aaj kya karna hai?</p>
            <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
              Milk, cows, reminders — sab ek jagah.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
              Sirf 4 buttons. Bas karna hai kya, woh dikh raha hai.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{action.label}</p>
                      <p className="text-sm text-slate-600">{action.caption}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
          <AppCard className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <BellRing className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Aaj ke yaad</p>
                <h2 className="text-lg font-black text-slate-950">Jo dhyan dena hai</h2>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {todayItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3 rounded-[20px] bg-[#fcfbf7] px-3 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AppCard>

          <AppCard className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <Milk className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">Aaj ka kaam</p>
                <h2 className="text-lg font-black text-slate-950">Ek hi screen mein sab</h2>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SimpleTile icon={Beef} label="Gaiyan" value="Cows" />
              <SimpleTile icon={Users} label="Kaamkarta" value="Workers" />
              <SimpleTile icon={Wallet} label="Kharcha" value="Expense" />
              <SimpleTile icon={CalendarClock} label="Yaad" value="Reminders" />
            </div>
          </AppCard>
        </section>

        <AppCard className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Shuru karo</p>
              <h2 className="text-lg font-black text-slate-950">Login karke apna farm khol lo</h2>
            </div>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
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