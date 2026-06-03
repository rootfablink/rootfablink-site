import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { HomePage } from "@/components/sections/home-page";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale as Locale} />;
}
