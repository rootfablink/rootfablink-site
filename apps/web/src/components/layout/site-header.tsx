import { Globe2, ShieldCheck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { dictionaries } from "@/messages";
import { Button } from "@/components/ui/button";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" }
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <a href={`/${locale}`} className="rootfablink-wordmark truncate text-ink">
          <span>ROOTFABLINK</span>
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
                {languageOptions.map((item) => (
                  <a
                    key={item.code}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-cloud"
                    href={`/${item.code}`}
                  >
                    {item.label}
                  </a>
                ))}
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
