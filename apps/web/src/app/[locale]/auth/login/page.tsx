import { isLocale, type Locale } from "@rootfablink/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { dictionaries } from "@/messages";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionaries[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 px-4 py-10 sm:px-5 sm:py-12 md:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-signal">{t.auth.loginEyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">{t.auth.loginTitle}</h1>
          <p className="mt-4 text-steel">{t.auth.loginText}</p>
        </section>
        <form className="rounded-md border border-ink/10 bg-white p-6 shadow-soft">
          <label className="grid gap-2 text-sm font-semibold text-ink">
            {t.auth.email}
            <input className="h-11 rounded-md border border-ink/15 px-3 font-normal" type="email" placeholder={t.auth.emailPlaceholder} />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">
            {t.auth.password}
            <input className="h-11 rounded-md border border-ink/15 px-3 font-normal" type="password" placeholder={t.auth.passwordPlaceholder} />
          </label>
          <button className="mt-6 h-11 w-full rounded-md bg-signal font-semibold text-white shadow-[0_12px_26px_rgba(249,115,22,0.24)] hover:bg-copper" type="button">
            {t.auth.signIn}
          </button>
        </form>
      </main>
    </>
  );
}
