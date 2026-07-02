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
    "inline-flex h-12 items-center justify-center rounded-[20px] bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)] transition duration-200 hover:bg-[var(--primary-strong)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(17,104,65,0.35)]";

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