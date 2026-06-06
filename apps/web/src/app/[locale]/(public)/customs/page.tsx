import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { PlatformFrameworkPage } from "@/components/marketplace/platform-framework-page";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const tr = locale === "tr";
  return createSeoMetadata(
    locale as Locale,
    "/customs",
    tr ? "Gümrük Operasyonları | RootFabLink" : "Customs Operations | RootFabLink",
    tr ? "Gümrük müşavirliği, ithalat-ihracat süreçleri, GTİP ve dış ticaret uyum desteğini keşfedin." : "Explore customs brokerage, import-export procedures, HS code and trade compliance support.",
    ["customs brokers", "customs clearance", "trade compliance"]
  );
}

export default async function CustomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PlatformFrameworkPage locale={locale as Locale} moduleKey="customs" />;
}
