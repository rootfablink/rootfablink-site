import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { CorporateContactPage, corporateMetadata } from "@/components/corporate/corporate-pages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return corporateMetadata(locale as Locale, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <CorporateContactPage locale={locale as Locale} />;
}
