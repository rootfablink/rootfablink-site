import { cn } from "@/lib/utils";

type RootFabLinkWordmarkProps = {
  variant?: "light" | "dark" | "accent";
  size?: "compact" | "default" | "large" | "hero";
  className?: string;
  showSubline?: boolean;
  subline?: string;
};

export function RootFabLinkWordmark({
  variant = "light",
  size = "default",
  className,
  showSubline = false,
  subline = "GLOBAL B2B MANUFACTURING INFRASTRUCTURE"
}: RootFabLinkWordmarkProps) {
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
      aria-label="RootFabLink"
    >
      <span className="rootfablink-brand-line" aria-hidden="true">
        <span className="rootfablink-brand-root">ROOT</span>
        <span className="rootfablink-brand-fab">FABLINK</span>
      </span>
      {showSubline && <span className="rootfablink-brand-subline">{subline}</span>}
    </span>
  );
}
