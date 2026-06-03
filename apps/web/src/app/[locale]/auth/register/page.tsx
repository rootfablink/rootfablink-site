import { isLocale, type Locale } from "@rootfablink/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { dictionaries } from "@/messages";

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionaries[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-12">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{t.auth.registerEyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-ink sm:text-4xl">{t.auth.registerTitle}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.auth.accountTypes.map((type) => (
            <button key={type} className="rounded-md border border-ink/10 bg-white p-5 text-left font-semibold text-ink hover:border-signal" type="button">
              {type}
              <span className="mt-3 block text-sm font-normal leading-6 text-steel">{t.auth.accountNote}</span>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
