import { isLocale, type Locale } from "@rootfablink/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
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

  return <div lang={locale}>{children}</div>;
}
