import type { Metadata } from "next";
import { getTextDirection, isLocale, locales, type Locale } from "@rootfablink/i18n";

const hreflangAlternates = {
  en: "/en",
  tr: "/tr",
  de: "/de",
  fr: "/fr",
  es: "/es",
  ar: "/ar",
  zh: "/zh",
  ru: "/ru",
  "x-default": "/"
};

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
    const title = "RootFabLink | Üreticiler, Alıcılar ve Ticaret Hizmetleri İçin Küresel B2B Pazaryeri";
    const description =
      "RootFabLink; alıcıları, üreticileri, doğrulanmış tedarikçileri, lojistik firmalarını ve ticaret hizmet ekiplerini küresel B2B tedarik, RFQ, ürün keşfi ve güvenli ticaret iş akışlarında buluşturur.";

    return {
      title,
      description,
      alternates: {
        canonical: `/${locale}`,
        languages: hreflangAlternates
      },
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

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: hreflangAlternates
    }
  };
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
