import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { isLocale } from "@rootfablink/i18n";
import { ProductDetailPage } from "@/components/marketplace/product-detail-page";
import { marketplaceSeedProducts } from "@/components/marketplace/marketplace-copy";
import { localizedAlternates, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = locale === "tr";
  const product = marketplaceSeedProducts.find((item) => item.slug === slug);
  const title = product ? (tr ? product.titleTr ?? product.title : product.title) : "RootFabLink Product";
  const description = product
    ? tr
      ? product.shortDescriptionTr ?? product.shortDescription
      : product.shortDescription
    : "RootFabLink B2B product detail page.";

  return {
    title: `${title} | RootFabLink`,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${slug}`,
      languages: localizedAlternates(`/products/${slug}`)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: `${title} | RootFabLink`,
      description,
      url: `${siteUrl}/${locale}/products/${slug}`,
      images: product?.mainImage ? [product.mainImage] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | RootFabLink`,
      description,
      images: product?.mainImage ? [product.mainImage] : undefined
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductDetailPage locale={locale as Locale} slug={slug} />;
}
