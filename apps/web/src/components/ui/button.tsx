import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition sm:px-5",
    variant === "primary" && "bg-signal text-white shadow-[0_12px_26px_rgba(249,115,22,0.24)] hover:bg-copper",
    variant === "secondary" && "border border-signal/25 bg-white text-ink hover:border-signal/60 hover:bg-cloud",
    variant === "ghost" && "text-ink hover:bg-cloud",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
