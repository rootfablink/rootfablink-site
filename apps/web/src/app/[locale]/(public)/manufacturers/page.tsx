import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MarketplacePlaceholderPage } from "@/components/marketplace/marketplace-placeholder-page";
import { getMarketplaceCopy } from "@/components/marketplace/marketplace-copy";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const [title = "Manufacturers", description = "Discover manufacturers and supplier profiles on Rootfablink."] = getMarketplaceCopy(locale as Locale).routes.manufacturers;
  return createSeoMetadata(locale as Locale, "/manufacturers", `${title} | Rootfablink`, description, ["manufacturers", "B2B suppliers", "factories"]);
}

export default async function ManufacturersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MarketplacePlaceholderPage locale={locale as Locale} routeKey="manufacturers" />;
}
