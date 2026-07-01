"use client";

import {
  Bell,
  Sun,
  Beef,
  Milk,
  Wallet,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export function DashboardHero() {
  const { user } = useAuth();

  const name =
    user?.name ||
    user?.email?.split("@")[0] ||
    "Farmer";

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 p-6 text-white shadow-xl">

      <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">

              <Sun size={14} />

              Good Morning

            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight">

              {name}

            </h1>

            <p className="mt-2 max-w-sm text-sm text-emerald-50">

              Welcome back to your dairy farm.

            </p>

          </div>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-white/25">

            <Bell size={20} />

          </button>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">

          <HeroCard
            icon={<Milk size={22} />}
            title="Today's Milk"
            value="315 L"
          />

          <HeroCard
            icon={<Wallet size={22} />}
            title="Profit"
            value="₹21.5K"
          />

          <HeroCard
            icon={<Beef size={22} />}
            title="Animals"
            value="42"
          />

          <HeroCard
            icon={<ShieldAlert size={22} />}
            title="Alerts"
            value="3"
          />

        </div>

      </div>

    </section>
  );
}

function HeroCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">

          {icon}

        </div>

        <span className="text-xs text-emerald-100">
          Today
        </span>

      </div>

      <p className="mt-5 text-3xl font-black">

        {value}

      </p>

      <p className="mt-1 text-sm text-emerald-100">

        {title}

      </p>

    </div>
  );
}