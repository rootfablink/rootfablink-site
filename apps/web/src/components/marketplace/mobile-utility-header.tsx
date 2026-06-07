"use client";

import Link from "next/link";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { RootfablinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { cn } from "@/lib/utils";
import { languageOptions, preferenceFromLanguage, replaceLocaleInPath, writeStoredPreference } from "./localization-preferences";
import { getMarketplaceCopy } from "./marketplace-copy";

export function MobileUtilityHeader({ locale, title }: { locale: Locale; title?: string }) {
  const pathname = usePathname();
  const copy = getMarketplaceCopy(locale);

  const saveLanguage = (language: Locale) => {
    writeStoredPreference(preferenceFromLanguage(language, true));
  };

  return (
    <header className="sticky top-0 z-50 min-h-[72px] border-b border-ink/10 bg-white/96 px-1.5 py-2 backdrop-blur min-[420px]:px-2 md:hidden">
      <div className="flex items-center justify-between gap-1">
        <Link href={`/${locale}`} className="shrink-0 whitespace-nowrap">
          <RootfablinkWordmark
            text="ROOTFABLINK"
            size="compact"
            className="text-[24px] font-bold leading-none [--rfl-scale:1] [--rfl-tracking:2px]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-0.5 min-[420px]:gap-1">
          <details className="group shrink-0">
            <summary
              aria-label={locale === "tr" ? "Dil seç" : "Select Language"}
              className="flex h-10 shrink-0 cursor-pointer list-none items-center gap-1 rounded-xl border border-signal/20 bg-cloud px-1.5 text-[10px] font-semibold whitespace-nowrap text-ink xs:h-11 xs:px-2 xs:text-[11px] min-[420px]:h-12 min-[420px]:gap-1.5 min-[420px]:px-2.5 min-[420px]:text-[13px]"
            >
              <Globe2 size={17} className="shrink-0 text-copper" strokeWidth={2.2} />
              <span className="inline-block shrink-0">{copy.header.languageCurrency}</span>
              <ChevronDown size={12} className="shrink-0 text-steel" />
            </summary>
            <div className="fixed inset-x-3 top-14 z-[80] max-h-[min(70vh,28rem)] overflow-y-auto rounded-md border border-ink/10 bg-white p-2 shadow-[0_18px_42px_rgba(11,11,12,0.18)]">
              {languageOptions.map((option) => {
                const active = option.code === locale;
                return (
                  <Link
                    key={option.code}
                    href={replaceLocaleInPath(pathname, option.code)}
                    onClick={() => saveLanguage(option.code)}
                    className={cn(
                      "flex min-h-11 w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-ink hover:bg-cloud",
                      active && "bg-cloud text-copper"
                    )}
                  >
                    <span>{option.label}</span>
                    {active && <Check size={15} />}
                  </Link>
                );
              })}
            </div>
          </details>
          <Link href={`/${locale}/auth/login`} className="inline-flex h-10 items-center rounded-xl px-1 text-[11px] font-semibold whitespace-nowrap text-ink hover:bg-cloud xs:h-11 xs:px-1.5 xs:text-[13px] min-[420px]:h-12 min-[420px]:px-2 min-[420px]:text-[15px]">
            {copy.header.signIn}
          </Link>
          <Link href={`/${locale}/auth/register`} className="inline-flex h-10 items-center rounded-xl border-0 bg-signal px-2 text-[11px] font-bold whitespace-nowrap text-white transition hover:bg-copper xs:h-11 xs:px-2.5 xs:text-[13px] min-[420px]:h-12 min-[420px]:px-3 min-[420px]:text-[15px]">
            {copy.header.createAccount}
          </Link>
        </div>
      </div>
      {title && <h1 className="mt-2 truncate border-t border-ink/8 pt-2 text-sm font-bold text-ink">{title}</h1>}
    </header>
  );
}
