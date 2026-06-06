import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { PublicInfoPage } from "@/components/sections/public-info-page";
import { dictionaries } from "@/messages";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = dictionaries[locale as Locale].pages.suppliers;
  return createSeoMetadata(locale as Locale, "/suppliers", `${page.title} | RootFabLink`, page.intro, ["B2B suppliers", "global suppliers", "supplier directory"]);
}

export default async function SuppliersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PublicInfoPage locale={locale as Locale} pageKey="suppliers" />;
}
