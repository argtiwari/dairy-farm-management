type StatusChipProps = {
  label: string;
  color?: "green" | "red" | "yellow" | "blue";
};

const colors = {
  green:
    "bg-green-100 text-green-700",

  red:
    "bg-red-100 text-red-700",

  yellow:
    "bg-amber-100 text-amber-700",

  blue:
    "bg-blue-100 text-blue-700",
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