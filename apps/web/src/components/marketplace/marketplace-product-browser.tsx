"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { Button } from "@/components/ui/button";
import type { MarketplaceCopy } from "./marketplace-copy";
import { marketplaceSeedProducts } from "./marketplace-copy";
import { ProductCard } from "./product-card";

type Product = (typeof marketplaceSeedProducts)[number];

function matchesProduct(product: Product, keyword: string) {
  if (!keyword) return true;
  const value = keyword.toLowerCase();
  const haystack = [
    product.title,
    product.category,
    product.subcategory,
    product.country,
    product.supplierName,
    product.supplierType,
    ...(product.tags ?? [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(value);
}

export function MarketplaceProductBrowser({ locale, copy }: { locale: Locale; copy: MarketplaceCopy }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const initialKeyword = searchParams.get("q") ?? "";
  const [category, setCategory] = useState(initialCategory);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [visibleCount, setVisibleCount] = useState(24);
  const categories = useMemo(() => Array.from(new Set(marketplaceSeedProducts.map((product) => product.category))).sort(), []);
  const filteredProducts = useMemo(
    () =>
      marketplaceSeedProducts.filter((product) => {
        const categoryMatch = category === "all" || product.category === category;
        return categoryMatch && matchesProduct(product, keyword.trim());
      }),
    [category, keyword]
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const tr = locale === "tr";

  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">RootFabLink Marketplace</p>
            <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{tr ? "Ürün ve hizmet keşfi" : "Product and service discovery"}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">
              {tr
                ? "Bütün ana sektörlerde RFQ hazırlığına uygun ürün ve hizmet kartlarını keşfedin."
                : "Explore product and service cards across every major sector, prepared for RFQ workflows."}
            </p>
          </div>
          <Button href={`/${locale}/rfq`} variant="secondary">{copy.header.rfq}</Button>
        </div>

        <div className="mb-6 grid gap-3 rounded-md border border-ink/10 bg-cloud p-3 md:grid-cols-[1fr_18rem]">
          <input
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setVisibleCount(24);
            }}
            className="h-12 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-signal"
            placeholder={tr ? "Ürün, kategori, ülke veya tedarikçi tipi ara" : "Search product, category, country or supplier type"}
          />
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setVisibleCount(24);
            }}
            className="h-12 rounded-md border border-ink/10 bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-signal"
          >
            <option value="all">{tr ? "Tüm kategoriler" : "All categories"}</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-steel">
          <span>{filteredProducts.length} {tr ? "listeleme" : "listings"}</span>
          <span>{categories.length} {tr ? "ana kategori" : "main categories"}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} copy={copy} />
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setVisibleCount((current) => current + 24)} className="rounded-md border border-ink/10 px-5 py-3 text-sm font-bold text-ink hover:bg-cloud">
              {tr ? "Daha fazla göster" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
