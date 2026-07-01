import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Beef,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  LineChart,
  Milk,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import { AuthActions } from "@/components/auth/auth-actions";
import { AppCard } from "@/components/ui/app-card";


const features = [
  {
    title: "Animal Profiles",
    description: "See every cow with name, breed, milk, health, and pregnancy status in one clean card.",
    icon: Beef,
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Milk Tracking",
    description: "Enter morning and evening milk fast, then see daily and monthly totals instantly.",
    icon: Milk,
    accent: "bg-sky-100 text-sky-700",
  },
  {
    title: "Health Alerts",
    description: "Get follow-up reminders, treatment notes, and medicine history without searching notebooks.",
    icon: HeartPulse,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    title: "Vaccination Reminders",
    description: "Know which animal is due today, tomorrow, or overdue so nothing gets missed.",
    icon: BellRing,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    title: "Profit & Expense View",
    description: "Track feed, medicine, workers, and vet costs with a simple money snapshot.",
    icon: Wallet,
    accent: "bg-violet-100 text-violet-700",
  },
  {
    title: "Mobile Friendly",
    description: "Use it comfortably on phone with big buttons, clear cards, and simple navigation.",
    icon: Smartphone,
    accent: "bg-orange-100 text-orange-700",
  },
];

const benefits = [
  "See daily milk and profit in seconds",
  "Never miss a vaccine or pregnancy checkup",
  "Track each cow separately with full history",
  "Keep all dairy records in one place",
  "Use easily on mobile while standing in the shed",
  "Give workers view-only access when needed",
];

const highlights = [
  {
    value: "42+",
    label: "animals managed smoothly",
  },
  {
    value: "24/7",
    label: "farm data access from mobile",
  },
  {
    value: "3 taps",
    label: "to add milk, health, or expense",
  },
];



export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf9f4] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 px-5 py-5 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <Beef className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-emerald-700">
                    Dairy Farm Management System
                  </p>
                  <p className="text-xs text-slate-500">Built for real dairy farmers</p>
                </div>
              </div>
{/* <HomeHero /> */}
{/* <FarmOverview /> */}

              <div className="hidden sm:block">
                <AuthActions />
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                  <Sparkles className="h-4 w-4" />
                  Made for daily dairy work
                </div>

                <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Your daily farm assistant for milk, cows, health, and profit.
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  From morning milk checks to vaccination reminders and expense tracking, keep the farm moving without notebooks or missed tasks.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
                  >
                    Sign in to your farm
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-emerald-200 bg-white px-5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Open your dashboard
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur"
                    >
                      <p className="text-2xl font-black text-slate-950">{item.value}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-lg">
                  <div className="rounded-[1.6rem] bg-[#fcfbf7] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Today</p>
                        <h2 className="text-xl font-bold text-slate-950">Farm Snapshot</h2>
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
                          <LineChart className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Estimated profit</p>
                          <p className="text-2xl font-black">₹21,500</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        <CalendarClock className="h-4 w-4 shrink-0" />
                        Vaccination due tomorrow for Gauri
                      </div>
                      <div className="flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-800">
                        <HeartPulse className="h-4 w-4 shrink-0" />
                        Pregnancy checkup pending for Radha
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-2 hidden rounded-2xl border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 shadow-md sm:block">
                  Built for the shed
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <AppCard key={feature.title} className="p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accent}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </AppCard>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <AppCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">Why farmers like it</h2>
                <p className="text-sm text-slate-500">Less stress. More control.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-[#fcfbf7] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </AppCard>

          <AppCard className="bg-gradient-to-br from-emerald-50 to-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">What the farmer sees</h2>
                <p className="text-sm text-slate-500">Clear numbers, not confusion.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailCard title="Today’s milk" value="315 L" note="+12% from yesterday" />
              <DetailCard title="Monthly expense" value="₹45,230" note="-8% from last month" />
              <DetailCard title="Pregnant animals" value="8" note="2 due soon" />
              <DetailCard title="Open reminders" value="3" note="Vaccines + follow-ups" />
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold text-emerald-300">Goal</p>
              <p className="mt-2 text-lg font-bold">
                Give the farmer a fast daily view of milk, health, reminders, and profit.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The app should feel calm, easy, and trustworthy on mobile first.
              </p>
            </div>
          </AppCard>
        </section>

        <AppCard className="mt-8 border-emerald-100 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Next step</p>
              <h2 className="text-2xl font-bold text-slate-950">
                Open your farm dashboard after login
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

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-2 text-emerald-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{note}</p>
    </div>
  );
}