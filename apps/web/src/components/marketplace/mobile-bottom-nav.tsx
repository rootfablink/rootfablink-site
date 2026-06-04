"use client";

import Link from "next/link";
import { Box, Factory, ShieldCheck, Truck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { cn } from "@/lib/utils";
import { getMobileMarketplaceCopy } from "./mobile-marketplace-copy";

type MobileNavKey = "manufacturers" | "products" | "customs" | "logistics" | "home" | "categories" | "messages" | "basket" | "account";

const navItems: Array<{ key: Exclude<MobileNavKey, "home" | "categories" | "messages" | "basket" | "account">; icon: typeof Factory; href: string }> = [
  { key: "manufacturers", icon: Factory, href: "/manufacturers" },
  { key: "products", icon: Box, href: "/products" },
  { key: "customs", icon: ShieldCheck, href: "/customs" },
  { key: "logistics", icon: Truck, href: "/logistics" }
];

export function MobileBottomNav({ locale, active }: { locale: Locale; active: MobileNavKey }) {
  const copy = getMobileMarketplaceCopy(locale);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-ink/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_28px_rgba(11,11,12,0.08)] md:hidden">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.key === active || (active === "categories" && item.key === "products") || (active === "home" && item.key === "products");
        return (
          <Link
            key={item.key}
            href={`/${locale}${item.href}`}
            className={cn("relative flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] font-bold", isActive ? "text-copper" : "text-steel")}
          >
            <span className={cn("flex h-7 w-7 items-center justify-center rounded-md", isActive && "bg-signal/10")}>
              <Icon size={18} />
            </span>
            <span className="max-w-full truncate whitespace-nowrap px-1">{copy.bottomNav[index]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
