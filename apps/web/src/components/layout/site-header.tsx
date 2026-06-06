"use client";

import { Check, Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { RootfablinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { dictionaries } from "@/messages";
import { Button } from "@/components/ui/button";
import { languageOptions, preferenceFromLanguage, replaceLocaleInPath, writeStoredPreference } from "@/components/marketplace/localization-preferences";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const pathname = usePathname();

  const handleLanguageClick = (language: Locale) => {
    writeStoredPreference(preferenceFromLanguage(language, true));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-5">
        <a href={`/${locale}`} className="min-w-0 shrink overflow-hidden md:shrink-0">
          <RootfablinkWordmark size="compact" className="text-[22px] font-semibold [--rfl-scale:1] [--rfl-tracking:0.035em] sm:text-[23px]" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-steel md:flex">
          <a href={`/${locale}/manufacturers`}>{t.nav.manufacturers}</a>
          <a href={`/${locale}/products`}>{t.nav.products}</a>
          <a href={`/${locale}/customs`}>{t.nav.customs}</a>
          <a href={`/${locale}/logistics`}>{t.nav.logistics}</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <details className="group relative">
            <summary aria-label={t.language.label} className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-signal/20 bg-cloud text-copper hover:border-signal/45 sm:h-auto sm:w-auto sm:gap-1 sm:px-3 sm:py-2">
              <Globe2 size={18} strokeWidth={2.2} />
              <span className="hidden text-sm font-medium sm:inline">{t.language.label}</span>
            </summary>
            <div className="fixed inset-x-3 top-16 z-[80] max-h-[min(72vh,30rem)] overflow-y-auto rounded-md border border-ink/10 bg-white p-3 shadow-[0_18px_42px_rgba(11,11,12,0.18)] sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-72">
              <p className="px-2 pb-2 text-xs leading-5 text-steel">{t.language.note}</p>
              <div className="grid gap-1">
                {languageOptions.map((item) => (
                  <a
                    key={item.code}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-cloud"
                    href={replaceLocaleInPath(pathname, item.code as Locale)}
                    onClick={() => handleLanguageClick(item.code as Locale)}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {item.label}
                      {item.code === locale && <Check size={15} className="text-copper" />}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </details>
          <Button href={`/${locale}/auth/login`} variant="ghost" aria-label={t.nav.signIn} className="h-9 min-h-9 px-1.5 text-[11px] whitespace-nowrap sm:h-auto sm:min-h-11 sm:px-4 sm:text-sm">
            {t.nav.signIn}
          </Button>
          <Button href={`/${locale}/auth/register`} className="h-9 min-h-9 px-2 text-[11px] whitespace-nowrap sm:h-auto sm:min-h-11 sm:px-5 sm:text-sm">
            {t.nav.start}
          </Button>
        </div>
      </div>
    </header>
  );
}
