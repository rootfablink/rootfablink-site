import { Suspense } from "react";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { LoginExperience } from "@/components/auth/login-experience";
import { SiteHeader } from "@/components/layout/site-header";
import { dictionaries } from "@/messages";
import { googleOAuthConfigured } from "@/lib/auth";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionaries[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl content-start gap-7 px-4 pb-10 pt-24 sm:px-5 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:pt-16">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-signal">{t.auth.loginEyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-bold leading-[1.08] text-ink sm:text-4xl">{locale === "tr" ? "RootFabLink hesabınıza giriş yapın" : "Sign in to your RootFabLink account"}</h1>
          <p className="mt-4 text-sm leading-6 text-steel sm:text-base">{locale === "tr" ? "Tedarik, teklif, mesajlaşma ve şirket yönetimi işlemlerinize devam edin." : t.auth.loginText}</p>
        </section>
        <Suspense fallback={<div className="min-h-80 rounded-md border border-ink/10 bg-white shadow-soft" />}>
          <LoginExperience locale={locale} googleConfigured={googleOAuthConfigured} />
        </Suspense>
      </main>
    </>
  );
}
