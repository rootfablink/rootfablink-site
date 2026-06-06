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

const homepageTitle = "Rootfablink | Global B2B Platform for Manufacturers, Suppliers and Buyers";
const socialTitle = "Rootfablink | Global B2B Platform";
const homepageDescription = "Rootfablink connects manufacturers, suppliers and buyers through sourcing, RFQs, messaging, logistics, customs services and digital trade infrastructure.";

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

  return {
    title: {
      absolute: homepageTitle
    },
    description: homepageDescription,
    keywords: ["Rootfablink", "B2B platform", "manufacturers", "suppliers", "buyers", "RFQ", "logistics", "customs services", "digital trade"],
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/${locale}`,
      languages: hreflangAlternates
    },
    openGraph: {
      title: socialTitle,
      description: homepageDescription,
      siteName: "Rootfablink",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: homepageDescription
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
