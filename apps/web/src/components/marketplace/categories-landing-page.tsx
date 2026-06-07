import Link from "next/link";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { categoryGroups, categoryLocale, categoryPath, categoriesForGroup } from "@/data/categories";
import { CategoryIcon } from "./category-icon";
import { MarketplaceHeader } from "./marketplace-header";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function CategoriesLandingPage({ locale }: { locale: Locale }) {
  const language = categoryLocale(locale);
  const tr = language === "tr";

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale} />
      </div>
      <main className="min-h-screen bg-white pb-20 md:pb-0">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff7ed)] px-4 py-8 md:px-5 md:py-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">Rootfablink</p>
            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">{tr ? "Tüm kategoriler" : "All categories"}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-steel">
              {tr
                ? "Ürünleri, üreticileri ve RFQ hazır tedarik akışlarını kategoriye göre keşfedin."
                : "Browse products, manufacturers and RFQ-ready sourcing flows by B2B platform category."}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-5">
          <div className="grid gap-7">
            {categoryGroups.map((group) => (
              <section key={group.id} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-ink">{group.name[language]}</h2>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{categoriesForGroup(group.id).length}</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {categoriesForGroup(group.id).map((category) => (
                    <Link key={category.id} href={categoryPath(locale, category)} className="flex items-center gap-3 rounded-md border border-ink/10 bg-cloud p-4 transition hover:border-signal/40 hover:bg-white">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white">
                        <CategoryIcon icon={category.icon} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink">{category.name[language]}</span>
                        <span className="mt-1 block text-xs font-semibold text-steel">{category.keywords[language][0]}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
      <div className="md:hidden">
        <MobileBottomNav locale={locale} active="categories" />
      </div>
      <div className="hidden md:block">
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}
