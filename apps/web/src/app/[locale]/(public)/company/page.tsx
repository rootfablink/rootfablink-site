import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { CorporateAboutPage, corporateMetadata } from "@/components/corporate/corporate-pages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return corporateMetadata(locale as Locale, "about");
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <CorporateAboutPage locale={locale as Locale} />;
}
