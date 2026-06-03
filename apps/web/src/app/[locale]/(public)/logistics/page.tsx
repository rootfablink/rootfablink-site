import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { PublicInfoPage } from "@/components/sections/public-info-page";

export default async function LogisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PublicInfoPage locale={locale as Locale} pageKey="logistics" />;
}
