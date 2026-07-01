import {
  Beef,
  Milk,
  Wallet,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Animals",
    value: "42",
    subtitle: "38 Active • 4 Dry",
    icon: Beef,
    color: "emerald",
    progress: 90,
  },
  {
    title: "Today's Milk",
    value: "315 L",
    subtitle: "+12L from yesterday",
    icon: Milk,
    color: "blue",
    progress: 78,
  },
  {
    title: "Monthly Income",
    value: "₹68,500",
    subtitle: "Excellent Growth",
    icon: Wallet,
    color: "violet",
    progress: 84,
  },
  {
    title: "Farm Growth",
    value: "+18%",
    subtitle: "Compared to last month",
    icon: TrendingUp,
    color: "amber",
    progress: 68,
  },
];

const colors = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    progress: "bg-emerald-500",
  },
  blue: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    progress: "bg-sky-500",
  },
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-700",
    progress: "bg-violet-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    progress: "bg-amber-500",
  },
};

export function FarmOverview() {
  return (
    <section className="mt-8">

      <div className="mb-5 flex items-end justify-between">

        <div>

          <p className="text-sm font-semibold text-emerald-600">
            Farm Snapshot
          </p>

          <h2 className="mt-1 text-3xl font-black text-slate-900">
            Today's Overview
          </h2>

        </div>

        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          View Report
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {stats.map((item) => {
          const Icon = item.icon;
          const theme = colors[item.color as keyof typeof colors];

          return (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[30px] border border-[#E8EFE8] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-slate-900">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.subtitle}
                  </p>

                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-3xl ${theme.bg}`}
                >
                  <Icon
                    size={28}
                    className={theme.text}
                  />
                </div>

              </div>

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-xs font-medium text-slate-500">
                    Progress
                  </span>

                  <span className="flex items-center gap-1 text-xs font-bold text-slate-700">

                    {item.progress}%

                    <ArrowUpRight
                      size={14}
                      className="text-emerald-600"
                    />

                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${theme.progress}`}
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}