import Link from "next/link";

type PrimaryButtonProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export function PrimaryButton({
  href,
  children,
  onClick,
  type = "button",
  className = "",
}: PrimaryButtonProps) {
  const classes =
    "inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-md active:scale-95";

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  );
}