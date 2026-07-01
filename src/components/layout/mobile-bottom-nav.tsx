"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Beef,
  Wallet,
  Bell,
  Users,
} from "lucide-react";

const items = [
  {
    href: "/dashboard",
    icon: House,
    label: "Today",
  },
  {
    href: "/cows",
    icon: Beef,
    label: "Animals",
  },
  {
    href: "/expenses",
    icon: Wallet,
    label: "Expenses",
  },
  {
    href: "/reminders",
    icon: Bell,
    label: "Alerts",
  },
  {
    href: "/workers",
    icon: Users,
    label: "Workers",
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
      fixed
      bottom-4
      left-1/2
      z-50
      flex
      w-[92%]
      max-w-md
      -translate-x-1/2
      items-center
      justify-around
      rounded-[28px]
      border
      border-white/70
      bg-white/90
      px-3
      py-3
      shadow-xl
      backdrop-blur-xl
      md:hidden
      "
    >
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href ||
          (item.href === "/dashboard" && pathname.startsWith("/dashboard"));

        return (
          <Link
            key={item.href}
            href={item.href}
            className="
            flex
            flex-col
            items-center
            gap-1
            "
          >
            <div
              aria-current={active ? "page" : undefined}
              className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              transition-all
              ${
                active
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-500"
              }
              `}
            >
              <Icon size={20} />
            </div>

            <span
              className={`text-[11px] ${
                active
                  ? "font-semibold text-emerald-700"
                  : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}