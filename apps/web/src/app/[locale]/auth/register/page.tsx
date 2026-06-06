import { Suspense } from "react";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { RegisterExperience } from "@/components/auth/register-experience";
import { SiteHeader } from "@/components/layout/site-header";
import { dictionaries } from "@/messages";
import { googleOAuthConfigured } from "@/lib/auth";

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
        <Suspense fallback={<div className="mt-8 rounded-md border border-ink/10 bg-white p-5 text-sm font-semibold text-steel">Loading registration options...</div>}>
          <RegisterExperience locale={locale} accountTypes={t.auth.accountTypes} accountNote={t.auth.accountNote} googleConfigured={googleOAuthConfigured} />
        </Suspense>
      </main>
    </>
  );
}
