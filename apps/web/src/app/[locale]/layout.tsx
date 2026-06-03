import type { Metadata } from "next";
import { getTextDirection, isLocale, locales, type Locale } from "@rootfablink/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";

  if (locale === "tr") {
    const title = "RootFabLink | Küresel B2B Üretici, Tedarik ve Ticaret Platformu";
    const description =
      "RootFabLink; üreticileri, tedarikçileri, alıcıları, lojistik firmalarını ve ticaret hizmet ekiplerini küresel B2B tedarik, RFQ, doğrulama ve uluslararası ticaret altyapısında buluşturur.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        siteName: "RootFabLink",
        type: "website"
      },
      twitter: {
        card: "summary_large_image",
        title,
        description
      }
    };
  }

  return {};
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
