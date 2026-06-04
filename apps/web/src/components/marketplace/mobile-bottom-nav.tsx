"use client";

import Link from "next/link";
import { Grid2X2, Home, MessageSquareText, ShoppingBasket, UserRound } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { cn } from "@/lib/utils";
import { getMobileMarketplaceCopy } from "./mobile-marketplace-copy";

type MobileNavKey = "manufacturers" | "products" | "customs" | "logistics" | "home" | "categories" | "messages" | "basket" | "account";

const navItems: Array<{ key: Exclude<MobileNavKey, "manufacturers" | "products" | "customs" | "logistics">; icon: typeof Home; href: string; badge?: string }> = [
  { key: "home", icon: Home, href: "" },
  { key: "categories", icon: Grid2X2, href: "/categories" },
  { key: "messages", icon: MessageSquareText, href: "/messages", badge: "3" },
  { key: "basket", icon: ShoppingBasket, href: "/inquiry-basket", badge: "0" },
  { key: "account", icon: UserRound, href: "/account" }
];

export function MobileBottomNav({ locale, active }: { locale: Locale; active: MobileNavKey }) {
  const copy = getMobileMarketplaceCopy(locale);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-ink/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_28px_rgba(11,11,12,0.08)] md:hidden">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.key === active;
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
            {item.badge && (
              <span className="absolute right-4 top-2 min-w-4 rounded-full bg-signal px-1 text-center text-[10px] leading-4 text-white">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
