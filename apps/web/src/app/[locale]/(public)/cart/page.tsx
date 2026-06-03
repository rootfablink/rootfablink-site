import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MobileInquiryBasketPage } from "@/components/marketplace/mobile-marketplace-pages";
import { MarketplacePlaceholderPage } from "@/components/marketplace/marketplace-placeholder-page";

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <MobileInquiryBasketPage locale={locale as Locale} />
      <div className="hidden md:block">
        <MarketplacePlaceholderPage locale={locale as Locale} routeKey="products" />
      </div>
    </>
  );
}
