import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MarketplacePlaceholderPage } from "@/components/marketplace/marketplace-placeholder-page";
import { getMarketplaceCopy } from "@/components/marketplace/marketplace-copy";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const [title = "Products", description = "Discover B2B products and suppliers on RootFabLink."] = getMarketplaceCopy(locale as Locale).routes.products;
  return createSeoMetadata(locale as Locale, "/products", `${title} | RootFabLink`, description, ["B2B products", "industrial products", "supplier products"]);
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MarketplacePlaceholderPage locale={locale as Locale} routeKey="products" />;
}
