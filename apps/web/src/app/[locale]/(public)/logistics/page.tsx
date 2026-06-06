import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { PublicInfoPage } from "@/components/sections/public-info-page";
import { dictionaries } from "@/messages";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = dictionaries[locale as Locale].pages.logistics;
  return createSeoMetadata(locale as Locale, "/logistics", `${page.title} | RootFabLink`, page.intro, ["B2B logistics", "freight forwarding", "international shipping"]);
}

export default async function LogisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PublicInfoPage locale={locale as Locale} pageKey="logistics" />;
}
