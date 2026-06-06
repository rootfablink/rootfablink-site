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
  ja: "/ja",
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
    const title = "RootFabLink | Türkiye B2B Marketplace";
    const description =
      "RootFabLink connects manufacturers, suppliers, logistics providers and customs brokers through a global B2B marketplace.";

    return {
      title: {
        absolute: title
      },
      description,
      keywords: ["Türkiye B2B marketplace", "üreticiler", "tedarikçiler", "lojistik", "gümrük müşavirleri", "RootFabLink"],
      robots: {
        index: true,
        follow: true
      },
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
