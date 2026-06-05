import type { Metadata } from "next";
import { locales, type Locale } from "@rootfablink/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://rootfablink.com";

export function localizedAlternates(path: string) {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;

  return {
    ...Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${normalizedPath}`])),
    "x-default": `${siteUrl}${normalizedPath || "/"}`
  };
}

export function createSeoMetadata(locale: Locale, path: string, title: string, description: string, keywords: string[] = []): Metadata {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteUrl}/${locale}${normalizedPath}`;

  return {
    title: {
      absolute: title
    },
    description,
    keywords,
    alternates: {
      canonical,
      languages: localizedAlternates(normalizedPath)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "RootFabLink",
      type: "website",
      images: [`${siteUrl}/logo.png`]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/logo.png`]
    }
  };
}
