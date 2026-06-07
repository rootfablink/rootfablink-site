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

const englishHomepageTitle = "Rootfablink | Global B2B Platform for Manufacturers and Buyers";
const turkishHomepageTitle = "Rootfablink | Üreticiler ve Alıcılar için Global B2B Platform";
const socialTitle = "Rootfablink | Global B2B Platform";
const englishHomepageDescription = "Rootfablink connects manufacturers, buyers, logistics providers and customs brokers through a global B2B platform for sourcing, RFQ management and international trade operations.";
const turkishHomepageDescription = "Rootfablink, üreticileri, alıcıları, lojistik firmalarını ve gümrük müşavirlerini küresel bir B2B platformda buluşturur.";

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
  const homepageTitle = locale === "tr" ? turkishHomepageTitle : englishHomepageTitle;
  const homepageDescription = locale === "tr" ? turkishHomepageDescription : englishHomepageDescription;

  return {
    title: {
      absolute: homepageTitle
    },
    description: homepageDescription,
    keywords: ["Rootfablink", "Global B2B Platform", "manufacturers", "buyers", "RFQ", "logistics providers", "customs brokers", "international trade operations"],
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
