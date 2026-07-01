import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Beef,
  BellRing,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Milk,
  Plus,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";
import { mockCows } from "@/lib/cows/mock-cows";

const quickActions = [
  { href: "/cows", label: "Animals", caption: "Review cows", icon: Beef },
  { href: "/expenses", label: "Expenses", caption: "Log costs", icon: Wallet },
  { href: "/reminders", label: "Alerts", caption: "Check reminders", icon: BellRing },
  { href: "/workers", label: "Workers", caption: "View staff", icon: Users },
] as const;

const todayAlerts = [
  {
    title: "Vaccination due tomorrow",
    detail: "Gauri needs a follow-up check",
    icon: ShieldAlert,
    tone: "amber" as const,
  },
  {
    title: "Pregnancy follow-up",
    detail: "Radha needs a check soon",
    icon: HeartPulse,
    tone: "rose" as const,
  },
  {
    title: "Expense reminder",
    detail: "Feed and medicine costs need a quick update",
    icon: CalendarClock,
    tone: "slate" as const,
  },
];

const recentActivity = [
  {
    title: "Milk logged for Gauri",
    detail: "Updated this morning • ready for review",
    badge: "Review",
  },
  {
    title: "Vaccination reminder moved",
    detail: "Radha • follow up this afternoon",
    badge: "Follow up",
  },
  {
    title: "Feed expense saved",
    detail: "Added to keep the day simple",
    badge: "Budget",
  },
];

export default function DashboardPage() {
  const recentAnimals = mockCows.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f8faf3] px-3 py-4 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-4">
        <header className="rounded-[32px] border border-emerald-100 bg-white p-4 shadow-[0_16px_45px_-24px_rgba(6,78,59,0.45)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Good morning</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Your farm
              </h1>
            </div>
            <AuthActions />
          </div>

          <div className="mt-4 rounded-[28px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 p-4 text-white shadow-lg sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Daily farm assistant
                </div>
                <h2 className="mt-3 text-xl font-black leading-tight sm:text-2xl">
                  Everything you need today, in one place.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50">
                  Review animals, clear reminders, check milk, and stay on top of the day.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Beef className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/cows"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Open animals
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/expenses"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/30 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Add today’s record
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <AppCard className="border-emerald-100 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Today’s work</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">The next 3 things to do</h2>
              </div>
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <TodayWorkCard
                title="Check important animals"
                subtitle="Review cows that need attention first"
                href="/cows"
              />
              <TodayWorkCard
                title="Clear reminders"
                subtitle="Handle vaccines and follow-ups before they slip"
                href="/reminders"
              />
              <TodayWorkCard
                title="Log today’s expense"
                subtitle="Keep feed, medicine, and worker costs current"
                href="/expenses"
              />
            </div>
          </AppCard>

          <AppCard className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Quick actions</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">One-tap next steps</h2>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <QuickActionCard key={action.label} href={action.href} label={action.label} caption={action.caption} icon={Icon} />
                );
              })}
            </div>
          </AppCard>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <AppCard className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Today’s alerts</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">What needs attention</h2>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {todayAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <AlertRow key={alert.title} icon={Icon} tone={alert.tone} title={alert.title} detail={alert.detail} />
                );
              })}
            </div>
          </AppCard>

          <div className="grid gap-4">
            <AppCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Farm health</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">Today at a glance</h2>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <SummaryTile icon={Milk} label="Today’s milk" value="315 L" detail="Good morning milk" />
                <SummaryTile icon={BellRing} label="Pending vaccines" value="3" detail="Due soon" />
                <SummaryTile icon={HeartPulse} label="Pregnancy alerts" value="2" detail="Check notes" />
                <SummaryTile icon={Wallet} label="Expense reminder" value="₹45k" detail="Monthly spend" />
              </div>
            </AppCard>

            <AppCard className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Recent animals</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950">Keep an eye on them</h2>
                </div>
                <Link className="text-sm font-semibold text-emerald-700" href="/cows">
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
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#fcfbf7] px-3 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
                      href={`/cows/${cow.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-semibold text-emerald-700">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{shortName}</p>
                          <p className="text-sm text-slate-600">{cow.breed || "Breed not set"}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </AppCard>
          </div>
        </section>

        <AppCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Recent activity</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">What changed recently</h2>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <ActivityRow key={item.title} title={item.title} detail={item.detail} badge={item.badge} />
            ))}
          </div>
        </AppCard>

        <Link
          aria-label="Add a new record"
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:bg-emerald-700"
          href="/cows/new"
        >
          <Plus className="h-6 w-6" />
        </Link>
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
      className="flex items-center justify-between gap-4 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
    </Link>
  );
}

function QuickActionCard({
  href,
  label,
  caption,
  icon: Icon,
}: {
  href: string;
  label: string;
  caption: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-3 transition hover:border-emerald-200 hover:bg-emerald-50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">{label}</p>
          <p className="text-sm text-slate-600">{caption}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}

function AlertRow({
  icon: Icon,
  tone,
  title,
  detail,
}: {
  icon: LucideIcon;
  tone: "amber" | "rose" | "slate";
  title: string;
  detail: string;
}) {
  const toneClasses = {
    amber: "bg-amber-50 text-amber-800",
    rose: "bg-rose-50 text-rose-800",
    slate: "bg-slate-50 text-slate-700",
  }[tone];

  return (
    <div className={`flex items-start gap-3 rounded-[22px] px-4 py-3 text-sm ${toneClasses}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/70">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-semibold text-slate-950">{title}</p>
        <p className="mt-1 leading-6 text-slate-700">{detail}</p>
      </div>
    </div>
  );
}

function SummaryTile({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-[22px] border border-slate-100 bg-[#fcfbf7] p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{detail}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ title, detail, badge }: { title: string; detail: string; badge: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-[22px] border border-slate-200 bg-[#fcfbf7] px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
      </div>
      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        {badge}
      </div>
    </div>
  );
}