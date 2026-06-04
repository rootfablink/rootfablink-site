import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@rootfablink/i18n";
import { CategoryDetailPage } from "@/components/marketplace/category-detail-page";
import { categoryLocale, categoryPath, categoryStaticParams, getCategoryByAnySlug, getCategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return categoryStaticParams(locales);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const language = categoryLocale(locale);
  const category = getCategoryBySlug(locale, slug) ?? getCategoryByAnySlug(slug);

  if (!category) return {};

  return {
    title: category.seoTitle[language],
    description: category.seoDescription[language],
    openGraph: {
      title: category.seoTitle[language],
      description: category.seoDescription[language],
      type: "website"
    }
  };
}

export default async function CategorySlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const category = getCategoryBySlug(locale, slug);
  if (category) {
    return <CategoryDetailPage locale={locale as Locale} category={category} />;
  }

  const fallbackCategory = getCategoryByAnySlug(slug);
  if (fallbackCategory) {
    redirect(categoryPath(locale as Locale, fallbackCategory));
  }

  notFound();
}
