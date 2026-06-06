"use client";

import Link from "next/link";
import { Check, Globe2 } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/96 px-3 py-2 backdrop-blur md:hidden">
      <div className="flex min-w-0 items-center justify-between gap-1.5">
        <Link href={`/${locale}`} className="min-w-0 shrink overflow-hidden">
          <RootfablinkWordmark
            size="compact"
            className="max-w-full text-[22px] font-semibold [--rfl-scale:1] [--rfl-tracking:0.035em]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <details className="group">
            <summary
              aria-label={copy.header.languageCurrency}
              className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-signal/20 bg-cloud text-copper"
            >
              <Globe2 size={18} strokeWidth={2.2} />
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
          <Link href={`/${locale}/auth/login`} className="inline-flex h-9 items-center rounded-md px-1.5 text-[11px] font-bold whitespace-nowrap text-ink hover:bg-cloud xs:px-2 xs:text-xs">
            {copy.header.signIn}
          </Link>
          <Link href={`/${locale}/auth/register`} className="inline-flex h-9 items-center rounded-md bg-ink px-2 text-[11px] font-bold whitespace-nowrap text-white xs:px-2.5 xs:text-xs">
            {copy.header.createAccount}
          </Link>
        </div>
      </div>
      {title && <h1 className="mt-2 truncate border-t border-ink/8 pt-2 text-sm font-bold text-ink">{title}</h1>}
    </header>
  );
}
