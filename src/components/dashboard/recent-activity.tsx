import {
  BadgeCheck,
  HeartPulse,
  Milk,
  Wallet,
} from "lucide-react";

const activities = [
  {
    title: "Morning milk recorded",
    subtitle: "Gauri • Today 6:30 AM",
    icon: Milk,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Health check completed",
    subtitle: "Lakshmi • Today 9:15 AM",
    icon: HeartPulse,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Feed expense added",
    subtitle: "₹2,850 • Today 11:20 AM",
    icon: Wallet,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Vaccination completed",
    subtitle: "Radha • Yesterday",
    icon: BadgeCheck,
    color: "bg-amber-100 text-amber-700",
  },
];

export function RecentActivity() {
  return (
    <section className="mt-8">

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest updates from your dairy farm.
        </p>

      </div>

      <div className="rounded-[28px] border border-[#E8EFE8] bg-white p-5 shadow-sm">

        <div className="space-y-6">

          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="relative flex gap-4"
              >

                {index !== activities.length - 1 && (
                  <div className="absolute left-6 top-14 h-full w-px bg-slate-200" />
                )}

                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${activity.color}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex-1 pb-2">

                  <h3 className="font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.subtitle}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}