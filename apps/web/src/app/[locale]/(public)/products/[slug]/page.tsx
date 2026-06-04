import type { Locale } from "@rootfablink/i18n";
import { ProductDetailPage } from "@/components/marketplace/product-detail-page";

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return <ProductDetailPage locale={locale as Locale} slug={slug} />;
}
