import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MobileCategoriesPage } from "@/components/marketplace/mobile-marketplace-pages";
import { CategoriesLandingPage } from "@/components/marketplace/categories-landing-page";

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-[#f6f7f8] md:hidden" />}>
        <MobileCategoriesPage locale={locale as Locale} />
      </Suspense>
      <div className="hidden md:block">
        <CategoriesLandingPage locale={locale as Locale} />
      </div>
    </>
  );
}
