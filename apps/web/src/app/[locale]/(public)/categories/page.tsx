import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MobileCategoriesPage } from "@/components/marketplace/mobile-marketplace-pages";
import { CategoriesLandingPage } from "@/components/marketplace/categories-landing-page";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const tr = locale === "tr";
  return createSeoMetadata(
    locale as Locale,
    "/categories",
    tr ? "B2B Ürün Kategorileri | Rootfablink" : "B2B Product Categories | Rootfablink",
    tr ? "Rootfablink üzerinde endüstriyel ürün, üretici ve üretici kategorilerini keşfedin." : "Explore industrial product, manufacturer and supplier categories on Rootfablink.",
    ["B2B categories", "industrial sourcing", "product categories"]
  );
}

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
