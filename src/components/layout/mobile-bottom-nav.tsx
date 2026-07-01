"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Beef, Wallet, Bell, Users } from "lucide-react";

const items = [
  {
    href: "/dashboard",
    icon: House,
    label: "आज",
  },
  {
    href: "/cows",
    icon: Beef,
    label: "गाय",
  },
  {
    href: "/expenses",
    icon: Wallet,
    label: "खर्च",
  },
  {
    href: "/reminders",
    icon: Bell,
    label: "याद",
  },
  {
    href: "/workers",
    icon: Users,
    label: "Staff",
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex w-[94%] max-w-md -translate-x-1/2 items-center justify-around rounded-[28px] border border-white/70 bg-white/95 px-2 py-3 shadow-xl backdrop-blur-xl md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || (item.href === "/dashboard" && pathname.startsWith("/dashboard"));

        return (
          <Link key={item.href} href={item.href} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <div
              aria-current={active ? "page" : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
                active ? "bg-emerald-600 text-white shadow-md" : "text-slate-500"
              }`}
            >
              <Icon size={20} />
            </div>

            <span className={`text-[11px] ${active ? "font-semibold text-emerald-700" : "text-slate-500"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}