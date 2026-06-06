import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { IWallShowroom } from "@/components/suppliers/i-wall-showroom";
import { localizedAlternates, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";

  return {
    title: tr ? "i-WALL | Polimer Lambiri Üretici Showroom | RootFabLink" : "i-WALL | PS Wall Panel Manufacturer Showroom | RootFabLink",
    description: tr
      ? "i-WALL polimer lambiri modellerini gerçek ürün görselleriyle keşfedin, RFQ gönderin ve tedarikçiyle iletişime geçin."
      : "Discover i-WALL PS wall panel models with real product images, send RFQs and contact the manufacturer.",
    alternates: {
      canonical: `${siteUrl}/${locale}/suppliers/i-wall`,
      languages: localizedAlternates("/suppliers/i-wall")
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: tr ? "i-WALL Polimer Lambiri Showroom" : "i-WALL PS Wall Panel Showroom",
      description: tr
        ? "RootFabLink üzerinde i-WALL üretici showroom ve ürün kataloğu."
        : "i-WALL manufacturer showroom and product catalog on RootFabLink.",
      url: `${siteUrl}/${locale}/suppliers/i-wall`,
      images: ["/brands/i-wall/no1.jpeg"]
    },
    twitter: {
      card: "summary_large_image",
      title: tr ? "i-WALL Polimer Lambiri Showroom" : "i-WALL PS Wall Panel Showroom",
      description: tr ? "Gerçek i-WALL ürün görselleriyle RFQ tabanlı üretici katalog deneyimi." : "RFQ-based manufacturer catalog with real i-WALL product assets.",
      images: ["/brands/i-wall/no1.jpeg"]
    }
  };
}

export default async function IWallSupplierPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <IWallShowroom locale={locale as Locale} />;
}
