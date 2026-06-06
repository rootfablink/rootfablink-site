"use client";

import { Globe2, ShieldCheck, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { dictionaries } from "@/messages";
import { Button } from "@/components/ui/button";
import { preferenceFromLanguage, replaceLocaleInPath, writeStoredPreference } from "@/components/marketplace/localization-preferences";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ja", label: "Japanese" }
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const pathname = usePathname();

  const handleLanguageClick = (language: Locale) => {
    writeStoredPreference(preferenceFromLanguage(language, true));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-5">
        <a href={`/${locale}`} className="min-w-0 shrink-0">
          <RootFabLinkWordmark size="compact" />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-steel md:flex">
          <a href={`/${locale}/manufacturers`}>{t.nav.manufacturers}</a>
          <a href={`/${locale}/products`}>{t.nav.products}</a>
          <a href={`/${locale}/customs`}>{t.nav.customs}</a>
          <a href={`/${locale}/logistics`}>{t.nav.logistics}</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <details className="group relative">
            <summary aria-label={t.language.label} className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-ink/10 text-steel hover:border-signal/35 hover:text-ink sm:h-auto sm:w-auto sm:gap-1 sm:px-3 sm:py-2">
              <Globe2 size={16} />
              <span className="hidden text-sm font-medium sm:inline">{t.language.label}</span>
            </summary>
            <div className="absolute right-0 mt-2 w-64 rounded-md border border-ink/10 bg-white p-3 shadow-soft sm:w-72">
              <p className="px-2 pb-2 text-xs leading-5 text-steel">{t.language.note}</p>
              <div className="grid gap-1">
                {languageOptions.map((item) => (
                  <a
                    key={item.code}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-cloud"
                    href={replaceLocaleInPath(pathname, item.code as Locale)}
                    onClick={() => handleLanguageClick(item.code as Locale)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </details>
          <Button href={`/${locale}/auth/login`} variant="ghost" aria-label={t.nav.signIn} className="h-9 w-9 px-0 sm:h-auto sm:w-auto sm:px-4">
            <UserRound size={16} className="sm:hidden" />
            <span className="hidden sm:inline">{t.nav.signIn}</span>
          </Button>
          <Button href={`/${locale}/auth/register`}>
            <ShieldCheck size={16} />
            <span className="ml-2 hidden xs:inline sm:inline">{t.nav.start}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
