import {
  ArrowRight,
  HeartPulse,
  Milk,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";

const tasks = [
  {
    title: "Morning Milk Collection",
    subtitle: "12 cows pending",
    icon: Milk,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Vaccination Due",
    subtitle: "2 animals today",
    icon: ShieldPlus,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Health Check",
    subtitle: "Lakshmi needs follow-up",
    icon: Stethoscope,
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "Pregnancy Check",
    subtitle: "Expected in 5 days",
    icon: HeartPulse,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export function TodayTasks() {
  return (
    <section className="mt-8">

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Today's Work
          </h2>

          <p className="text-sm text-slate-500">
            Complete these important farm tasks.
          </p>

        </div>

        <button className="text-sm font-semibold text-emerald-600">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {tasks.map((task) => {
          const Icon = task.icon;

          return (
            <button
              key={task.title}
              className="flex w-full items-center justify-between rounded-3xl border border-[#E8EFE8] bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${task.color}`}
                >
                  <Icon size={24} />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.subtitle}
                  </p>

                </div>

              </div>

              <ArrowRight
                size={20}
                className="text-slate-400"
              />

            </button>
          );
        })}

      </div>

    </section>
  );
}