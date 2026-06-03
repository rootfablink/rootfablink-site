import { Factory, Globe2, ShieldCheck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { dictionaries } from "@/messages";
import { Button } from "@/components/ui/button";

const languageOptions = [
  { code: "en", label: "English", ready: true },
  { code: "tr", label: "Türkçe", ready: true },
  { code: "ar", label: "العربية", ready: false },
  { code: "zh", label: "中文", ready: false },
  { code: "ru", label: "Русский", ready: false },
  { code: "de", label: "Deutsch", ready: false },
  { code: "fr", label: "Français", ready: false },
  { code: "es", label: "Español", ready: false }
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <a href={`/${locale}`} className="flex min-w-0 items-center gap-2 font-bold tracking-[0.02em] text-ink sm:gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-white ring-2 ring-signal/25">
            <Factory size={19} />
          </span>
          <span className="truncate text-sm sm:text-base">ROOTFABLINK</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-steel md:flex">
          <a href={`/${locale}/buyers`}>{t.nav.buyers}</a>
          <a href={`/${locale}/suppliers`}>{t.nav.suppliers}</a>
          <a href={`/${locale}/logistics`}>{t.nav.logistics}</a>
          <a href={`/${locale}/trust`}>{t.nav.trust}</a>
          <a href={`/${locale}/rfq`}>{t.nav.rfq}</a>
          <a href={`/${locale}/pricing`}>{t.nav.pricing}</a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <details className="group relative hidden sm:block">
            <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md border border-ink/10 px-3 py-2 text-sm font-medium text-steel hover:border-signal/35 hover:text-ink">
              <Globe2 size={16} />
              {t.language.label}
            </summary>
            <div className="absolute right-0 mt-2 w-72 rounded-md border border-ink/10 bg-white p-3 shadow-soft">
              <p className="px-2 pb-2 text-xs leading-5 text-steel">{t.language.note}</p>
              <div className="grid gap-1">
                {languageOptions.map((item) =>
                  item.ready ? (
                    <a
                      key={item.code}
                      className="flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-ink hover:bg-cloud"
                      href={`/${item.code}`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-copper">{t.language.ready}</span>
                    </a>
                  ) : (
                    <div key={item.code} className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-steel">
                      <span>{item.label}</span>
                      <span className="text-right text-xs">{t.language.preparing}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </details>
          <Button href={`/${locale}/auth/login`} variant="ghost" className="hidden sm:inline-flex">
            {t.nav.signIn}
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
