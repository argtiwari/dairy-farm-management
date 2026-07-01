import { Bell } from "lucide-react";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">

      <div>

        <p className="text-sm font-medium text-slate-500">
          {subtitle}
        </p>

        <h1 className="mt-1 text-4xl font-black text-slate-900">
          {title}
        </h1>

      </div>

      <div className="flex items-center gap-3">

        <button
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-white
          shadow-sm
          border
          border-slate-200
          "
        >
          <Bell size={20} />
        </button>

        {action}

      </div>

    </div>
  );
}