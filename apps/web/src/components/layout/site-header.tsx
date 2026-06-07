"use client";

import { Check, ChevronDown, Globe2 } from "lucide-react";
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
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-1 px-1.5 py-2 min-[420px]:px-2 sm:min-h-14 sm:gap-3 sm:px-5">
        <a href={`/${locale}`} className="shrink-0 whitespace-nowrap">
          <RootfablinkWordmark text="ROOTFABLINK" size="compact" className="text-[24px] font-bold leading-none [--rfl-scale:1] [--rfl-tracking:2px] md:text-[32px]" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-steel md:flex">
          <a href={`/${locale}/manufacturers`}>{t.nav.manufacturers}</a>
          <a href={`/${locale}/products`}>{t.nav.products}</a>
          <a href={`/${locale}/customs`}>{t.nav.customs}</a>
          <a href={`/${locale}/logistics`}>{t.nav.logistics}</a>
        </nav>
        <div className="flex shrink-0 items-center gap-0.5 min-[420px]:gap-1 sm:gap-2">
          <details className="group relative shrink-0">
            <summary
              aria-label={locale === "tr" ? "Dil seç" : "Select Language"}
              className="flex h-10 shrink-0 cursor-pointer list-none items-center gap-1 rounded-xl border border-signal/20 bg-cloud px-1.5 text-[10px] font-semibold whitespace-nowrap text-ink hover:border-signal/45 xs:h-11 xs:px-2 xs:text-[11px] min-[420px]:h-12 min-[420px]:gap-1.5 min-[420px]:px-2.5 min-[420px]:text-[13px] sm:h-auto sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
            >
              <Globe2 size={17} className="shrink-0 text-copper sm:h-[21px] sm:w-[21px]" strokeWidth={2.2} />
              <span className="inline-block shrink-0">{t.language.label}</span>
              <ChevronDown size={12} className="shrink-0 text-steel sm:h-[14px] sm:w-[14px]" />
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
          <Button href={`/${locale}/auth/login`} variant="ghost" aria-label={t.nav.signIn} className="h-10 min-h-10 px-1 text-[11px] font-semibold whitespace-nowrap xs:h-11 xs:min-h-11 xs:px-1.5 xs:text-[13px] min-[420px]:h-12 min-[420px]:min-h-12 min-[420px]:px-2 min-[420px]:text-[15px] sm:h-auto sm:min-h-11 sm:px-4 sm:text-sm">
            {t.nav.signIn}
          </Button>
          <Button href={`/${locale}/auth/register`} className="h-10 min-h-10 rounded-xl px-2 text-[11px] font-bold whitespace-nowrap xs:h-11 xs:min-h-11 xs:px-2.5 xs:text-[13px] min-[420px]:h-12 min-[420px]:min-h-12 min-[420px]:px-3 min-[420px]:text-[15px] sm:h-auto sm:min-h-11 sm:px-5 sm:text-sm">
            {t.nav.start}
          </Button>
        </div>
      </div>
    </header>
  );
}
