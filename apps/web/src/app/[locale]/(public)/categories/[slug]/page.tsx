import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@rootfablink/i18n";
import { CategoryDetailPage } from "@/components/marketplace/category-detail-page";
import { categoryLocale, categoryPath, categoryStaticParams, getCategoryByAnySlug, getCategoryBySlug } from "@/data/categories";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return categoryStaticParams(locales);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const language = categoryLocale(locale);
  const category = getCategoryBySlug(locale, slug) ?? getCategoryByAnySlug(slug);

  if (!category) return {};
  const languages = Object.fromEntries(locales.map((supportedLocale) => [supportedLocale, `${siteUrl}${categoryPath(supportedLocale, category)}`]));

  return {
    title: category.seoTitle[language],
    description: category.seoDescription[language],
    alternates: {
      canonical: `${siteUrl}${categoryPath(locale, category)}`,
      languages: {
        ...languages,
        "x-default": `${siteUrl}${categoryPath("en", category)}`
      }
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: category.seoTitle[language],
      description: category.seoDescription[language],
      url: `${siteUrl}${categoryPath(locale, category)}`,
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
