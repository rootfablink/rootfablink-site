import type { Metadata } from "next";
import { locales, type Locale } from "@rootfablink/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://rootfablink.com";
export const seoBrandName = "Rootfablink";

export function normalizePublicSeoText(value: string) {
  return value
    .replaceAll("Global B2B Marketplace", "Global B2B Platform")
    .replaceAll("global B2B marketplace", "global B2B platform")
    .replaceAll("B2B marketplace", "B2B platform");
}

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
  const normalizedTitle = normalizePublicSeoText(title);
  const normalizedDescription = normalizePublicSeoText(description);
  const normalizedKeywords = keywords.map(normalizePublicSeoText);

  return {
    title: {
      absolute: normalizedTitle
    },
    description: normalizedDescription,
    keywords: normalizedKeywords,
    alternates: {
      canonical,
      languages: localizedAlternates(normalizedPath)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: normalizedTitle,
      description: normalizedDescription,
      url: canonical,
      siteName: seoBrandName,
      type: "website",
      images: [`${siteUrl}/logo.png`]
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description: normalizedDescription,
      images: [`${siteUrl}/logo.png`]
    }
  };
}
