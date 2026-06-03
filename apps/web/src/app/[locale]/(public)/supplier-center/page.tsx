import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MarketplacePlaceholderPage } from "@/components/marketplace/marketplace-placeholder-page";

export default async function SupplierCenterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MarketplacePlaceholderPage locale={locale as Locale} routeKey="supplier-center" />;
}
