"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import type { MarketplaceCopy } from "@/components/marketplace/marketplace-copy";
import { ProductCard } from "@/components/marketplace/product-card";
import type { IWallProduct } from "./i-wall-data";

export function IWallProductCatalog({
  locale,
  products,
  copy
}: {
  locale: Locale;
  products: IWallProduct[];
  copy: MarketplaceCopy;
}) {
  const tr = locale === "tr";
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) => {
        const searchable = [
          product.title,
          product.titleTr,
          product.sku,
          product.category,
          product.categoryTr,
          product.subcategory,
          product.subcategoryTr,
          product.shortDescription,
          product.shortDescriptionTr,
          ...product.tags
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
    : products;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 rounded-md border border-ink/10 bg-cloud p-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-steel" size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-md border border-ink/10 bg-white pl-10 pr-3 text-sm font-semibold text-ink outline-none transition focus:border-signal"
            placeholder={tr ? "i-WALL katalog içinde ara" : "Search inside i-WALL catalog"}
          />
        </label>
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
          {tr ? `${filteredProducts.length} ürün` : `${filteredProducts.length} products`}
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} copy={copy} locale={locale} />
        ))}
      </div>
    </>
  );
}
