type StatusChipProps = {
  label: string;
  color?: "green" | "red" | "yellow" | "blue";
};

const colors = {
  green:
    "bg-[var(--primary-soft)] text-[var(--primary)] ring-1 ring-[rgba(17,104,65,0.18)]",

  red:
    "bg-[rgba(185,28,28,0.12)] text-[var(--danger)] ring-1 ring-[rgba(185,28,28,0.18)]",

  yellow:
    "bg-[#fffbeb] text-[#92400e] ring-1 ring-[#fef3c7]",

  blue:
    "bg-[#eff6ff] text-[#1d4ed8] ring-1 ring-[#bfdbfe]",
};

export function StatusChip({
  label,
  color = "green",
}: StatusChipProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[color]}`}
    >
      {label}
    </span>
  );
}