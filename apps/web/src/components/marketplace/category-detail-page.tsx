import Link from "next/link";
import { ArrowRight, Filter, Search, SlidersHorizontal } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { categoryGroups, categoryLocale, type MarketplaceCategory } from "@/data/categories";
import { CategoryIcon } from "./category-icon";
import { MarketplaceHeader } from "./marketplace-header";
import { getMarketplaceCopy, marketplaceSeedProducts, marketplaceSuppliers } from "./marketplace-copy";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { ProductCard } from "./product-card";
import { SupplierCard, type SupplierCardData } from "./supplier-card";

export function CategoryDetailPage({ locale, category }: { locale: Locale; category: MarketplaceCategory }) {
  const copy = getMarketplaceCopy(locale);
  const language = categoryLocale(locale);
  const tr = language === "tr";
  const products = productsForCategory(category, language);
  const suppliers = suppliersForCategory(category, language, products);
  const relatedCategories = categoryGroups
    .find((group) => group.id === category.parentId)
    ?.categoryIds.map((id) => categoryGroups.flatMap((group) => group.categoryIds).includes(id) ? id : id)
    .slice(0, 8);

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale} />
      </div>
      <main className="min-h-screen bg-white pb-20 md:pb-0">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff7ed)] px-4 py-6 md:px-5 md:py-10">
          <div className="mx-auto max-w-7xl">
            <nav className="text-xs font-bold text-steel">
              <Link href={`/${locale}`} className="hover:text-copper">{tr ? "Anasayfa" : "Home"}</Link>
              <span className="mx-2">/</span>
              <Link href={`/${locale}/categories`} className="hover:text-copper">{tr ? "Kategoriler" : "Categories"}</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{category.name[language]}</span>
            </nav>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-[0_8px_22px_rgba(11,11,12,0.06)]">
                    <CategoryIcon icon={category.icon} size={24} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{tr ? "Kategori" : "Category"}</p>
                    <h1 className="mt-1 text-3xl font-bold text-ink sm:text-4xl">{category.name[language]}</h1>
                  </div>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-steel sm:text-base">{category.description[language]}</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button href={`/${locale}/rfq/new`}>
                  {tr ? "RFQ oluştur" : "Create RFQ"}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button href={`/${locale}/products?q=${encodeURIComponent(category.name[language])}`} variant="secondary">
                  {tr ? "Ürünlerde ara" : "Search products"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-5 lg:grid-cols-[16rem_1fr]">
          <aside className="rounded-md border border-ink/10 bg-cloud p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Filter size={17} className="text-copper" />
              {tr ? "Filtreler" : "Filters"}
            </div>
            <div className="mt-4 grid gap-2">
              {(tr ? ["Tüm ürünler", "Tedarikçiler", "RFQ hazır", "Türkiye"] : ["All products", "Suppliers", "RFQ ready", "Türkiye"]).map((item, index) => (
                <button key={item} type="button" className={`rounded-md px-3 py-2 text-left text-xs font-bold ${index === 0 ? "bg-white text-copper" : "text-steel hover:bg-white"}`}>
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-ink">
              <SlidersHorizontal size={17} className="text-copper" />
              {tr ? "Sıralama" : "Sort"}
            </div>
            <select className="mt-3 h-10 w-full rounded-md border border-ink/10 bg-white px-3 text-xs font-bold text-ink">
              <option>{tr ? "En ilgili" : "Most relevant"}</option>
              <option>{tr ? "RFQ uyumu" : "RFQ fit"}</option>
              <option>{tr ? "Yeni listelemeler" : "Newest listings"}</option>
            </select>
          </aside>

          <div>
            <div className="rounded-md border border-ink/10 bg-white p-3">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" size={17} />
                <input className="h-11 w-full rounded-md border border-ink/10 bg-cloud pl-10 pr-3 text-sm font-semibold outline-none focus:border-signal" placeholder={tr ? `${category.name.tr} içinde ara` : `Search ${category.name.en}`} />
              </label>
            </div>

            <section className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-ink">{tr ? "İlgili ürünler" : "Related products"}</h2>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{products.length} {tr ? "listeleme" : "listings"}</p>
              </div>
              {products.length > 0 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.slice(0, 12).map((product) => (
                    <ProductCard key={product.slug} product={product} copy={copy} />
                  ))}
                </div>
              ) : (
                <EmptyState locale={locale} category={category} />
              )}
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold text-ink">{tr ? "İlgili tedarikçiler" : "Related suppliers"}</h2>
              {suppliers.length > 0 ? (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {suppliers.map((supplier) => (
                    <SupplierCard key={supplier.company} supplier={supplier} copy={copy} locale={locale} />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-md border border-dashed border-ink/15 bg-cloud p-5 text-sm font-semibold text-steel">
                  {tr ? "Bu kategori için tedarikçi profilleri hazırlanıyor." : "Supplier profiles for this category are being prepared."}
                </div>
              )}
            </section>

            {relatedCategories && relatedCategories.length > 0 && (
              <section className="mt-8 rounded-md border border-ink/10 bg-cloud p-5">
                <h2 className="text-lg font-bold text-ink">{tr ? "İlgili aramalar" : "Related searches"}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.keywords[language].map((keyword) => (
                    <Link key={keyword} href={`/${locale}/products?q=${encodeURIComponent(keyword)}`} className="rounded-md bg-white px-3 py-2 text-xs font-bold text-ink hover:text-copper">
                      {keyword}
                    </Link>
                  ))}
                </div>
              </section>
            )}
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

function productsForCategory(category: MarketplaceCategory, language: "en" | "tr") {
  const terms = [...category.keywords.en, ...category.keywords.tr, category.name[language]].map((item) => item.toLowerCase());
  return marketplaceSeedProducts.filter((product) => {
    const haystack = [
      product.title,
      product.titleTr,
      product.category,
      product.categoryTr,
      product.subcategory,
      product.subcategoryTr,
      product.shortDescription,
      product.shortDescriptionTr,
      product.supplierName,
      ...(product.tags ?? [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.some((term) => haystack.includes(term));
  });
}

function suppliersForCategory(category: MarketplaceCategory, language: "en" | "tr", products: ReturnType<typeof productsForCategory>): SupplierCardData[] {
  const productSupplierNames = new Set(products.map((product) => product.supplierName).filter(Boolean));
  return marketplaceSuppliers
    .filter((supplier) => category.relatedSuppliers.includes(supplier.company) || productSupplierNames.has(supplier.company))
    .map((supplier) => {
      if (supplier.company !== "i-WALL") return supplier;
      return {
        ...supplier,
        country: language === "tr" ? "Türkiye" : "Turkey",
        category: language === "tr" ? "Polimer Lambiri" : "PS Wall Panels"
      };
    });
}

function EmptyState({ locale, category }: { locale: Locale; category: MarketplaceCategory }) {
  const tr = locale === "tr";
  return (
    <div className="mt-4 rounded-md border border-dashed border-ink/15 bg-cloud p-6">
      <h3 className="text-lg font-bold text-ink">{category.name[categoryLocale(locale)]}</h3>
      <p className="mt-2 text-sm leading-6 text-steel">
        {tr
          ? "Bu kategori için tedarikçi ve ürünler hazırlanıyor. Talebinizi RFQ olarak oluşturabilirsiniz."
          : "Suppliers and products for this category are being prepared. You can submit an RFQ for this category."}
      </p>
      <Link href={`/${locale}/rfq/new`} className="mt-4 inline-flex rounded-md bg-signal px-4 py-3 text-sm font-bold text-white hover:bg-copper">
        {tr ? "RFQ oluştur" : "Submit RFQ"}
      </Link>
    </div>
  );
}
