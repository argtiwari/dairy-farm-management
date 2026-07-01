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
      rounded-[28px]
      border
      border-[#E8EFE8]
      bg-white
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      ${className}
      `}
    >
      {children}
    </div>
  );
}