import type { MetadataRoute } from "next";
import { locales, type Locale } from "@rootfablink/i18n";
import { marketplaceSeedProducts } from "@/components/marketplace/marketplace-copy";
import { categoryLocale, marketplaceCategories } from "@/data/categories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://rootfablink.com";
const publicRoutes = [
  "",
  "/products",
  "/manufacturers",
  "/categories",
  "/logistics",
  "/customs",
  "/suppliers",
  "/buyers",
  "/rfq",
  "/pricing",
  "/trust",
  "/about",
  "/contact",
  "/help-center",
  "/company"
];
const iWallRoutes = ["/suppliers/i-wall", "/manufacturers/i-wall", "/brands/i-wall"];

function localizedUrl(locale: Locale, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homepageEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1
    }
  ];

  const routeEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: localizedUrl(locale, route),
      lastModified,
      changeFrequency: route === "" || route === "/products" || route === "/manufacturers" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : route === "/products" || route === "/manufacturers" ? 0.9 : 0.7
    }))
  );

  const productEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    marketplaceSeedProducts.map((product) => ({
      url: localizedUrl(locale, `/products/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: product.brandName === "i-WALL" ? 0.8 : 0.6
    }))
  );

  const categoryEntries: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    const language = categoryLocale(locale);
    return marketplaceCategories.map((category) => ({
      url: localizedUrl(locale, `/categories/${category.slug[language]}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }));
  });

  const supplierEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    iWallRoutes.map((route) => ({
      url: localizedUrl(locale, route),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  );

  return [...homepageEntries, ...routeEntries, ...productEntries, ...categoryEntries, ...supplierEntries];
}
