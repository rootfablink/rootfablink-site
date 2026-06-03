import type { Locale } from "@rootfablink/i18n";
import { MarketplaceHome } from "@/components/marketplace/marketplace-home";

export function HomePage({ locale }: { locale: Locale }) {
  return <MarketplaceHome locale={locale} />;
}
