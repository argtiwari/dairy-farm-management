type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className = "",
}: AppCardProps) {
  return (
    <div
      className={`
        rounded-[32px]
        border
        border-[rgba(15,23,42,0.08)]
        bg-white
        p-6
        shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.32)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}