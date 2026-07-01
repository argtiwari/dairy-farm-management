import Link from "next/link";
import {
  Milk,
  Beef,
  Wallet,
  Users,
  Bell,
  Plus,
} from "lucide-react";

const actions = [
  {
    title: "Add Milk",
    icon: Milk,
    href: "/milk",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Add Animal",
    icon: Beef,
    href: "/cows/new",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Expense",
    icon: Wallet,
    href: "/expenses",
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Workers",
    icon: Users,
    href: "/workers",
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Reminder",
    icon: Bell,
    href: "/reminders",
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "More",
    icon: Plus,
    href: "/",
    color: "bg-slate-100 text-slate-700",
  },
];

export function QuickActions() {
  return (
    <section className="mt-8">

      <div className="mb-4">

        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Most frequently used actions.
        </p>

      </div>

      <div className="grid grid-cols-3 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-3xl border border-[#E8EFE8] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <p className="mt-4 text-center text-sm font-semibold text-slate-900">
                {action.title}
              </p>
            </Link>
          );
        })}

      </div>

    </section>
  );
}