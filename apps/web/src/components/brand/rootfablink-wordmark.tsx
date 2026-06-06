import { cn } from "@/lib/utils";

type RootfablinkWordmarkProps = {
  variant?: "light" | "dark" | "accent";
  size?: "compact" | "default" | "large" | "hero";
  className?: string;
  showSubline?: boolean;
  subline?: string;
};

export function RootfablinkWordmark({
  variant = "light",
  size = "default",
  className,
  showSubline = false,
  subline = "GLOBAL B2B MANUFACTURING INFRASTRUCTURE"
}: RootfablinkWordmarkProps) {
  return (
    <span
      className={cn(
        "rootfablink-brand",
        `rootfablink-brand-${size}`,
        variant === "light" && "text-ink",
        variant === "dark" && "text-white",
        variant === "accent" && "text-copper",
        className
      )}
      aria-label="Rootfablink"
    >
      <span className="rootfablink-brand-line" aria-hidden="true">
        Rootfablink
      </span>
      {showSubline && <span className="rootfablink-brand-subline">{subline}</span>}
    </span>
  );
}
