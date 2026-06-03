import { getTextDirection, isLocale, locales, type Locale } from "@rootfablink/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";

  return (
    <div lang={locale} dir={getTextDirection(locale)}>
      {children}
    </div>
  );
}
