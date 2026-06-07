"use client";

/* eslint-disable @next/next/no-img-element */

import { Heart, MessageSquareText, ShieldCheck, Store } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { getLocalizedCountry, getLocalizedIndustry } from "@/lib/localization";
import type { MarketplaceCopy } from "./marketplace-copy";
import { MarketplaceImage } from "./marketplace-image";

export type ProductCardData = {
  slug?: string;
  title: string;
  titleTr?: string;
  price: string;
  priceRange?: string;
  priceRangeTr?: string;
  moq: string;
  moqTr?: string;
  country: string;
  countryTr?: string;
  verified: boolean;
  sponsored?: boolean;
  mainImage?: string;
  imageFit?: "cover" | "contain";
  leadTime?: string;
  leadTimeTr?: string;
  category?: string;
  categoryTr?: string;
  subcategory?: string;
  subcategoryTr?: string;
  shortDescription?: string;
  shortDescriptionTr?: string;
  imageAlt?: string;
  imageAltTr?: string;
  visualCategory?: string;
  source?: "marketplace_seed_data" | string;
  supplierName?: string;
  supplierType?: string;
  supplierTypeTr?: string;
  brandName?: string;
  brandLogo?: string;
  sku?: string;
  tags?: string[];
  tradeTerms?: string[];
  tradeTermsTr?: string[];
  capabilities?: string[];
  reviewCount?: number;
  review_count?: number;
  rating?: number | null;
};

export function ProductCard({ product, copy, locale = "en" }: { product: ProductCardData; copy: MarketplaceCopy; locale?: Locale }) {
  const contactLabel = copy.productCard.contact ?? "Contact supplier";
  const tr = locale === "tr";
  const title = tr ? product.titleTr ?? product.title : product.title;
  const category = tr ? product.categoryTr ?? (product.category ? getLocalizedIndustry(product.category, locale) : product.category) : product.category;
  const country = tr ? product.countryTr ?? getLocalizedCountry(product.country, locale) : product.country;
  const description = tr ? product.shortDescriptionTr ?? product.shortDescription : product.shortDescription;
  const supplierType = tr ? product.supplierTypeTr ?? product.supplierType : product.supplierType;
  const leadTime = tr ? product.leadTimeTr : product.leadTime;
  const imageAlt = tr ? product.imageAltTr ?? product.imageAlt ?? title : product.imageAlt ?? title;
  const priceRange = tr ? product.priceRangeTr ?? product.priceRange ?? product.price : product.priceRange ?? product.price;
  const visibleTags = tr ? product.tags?.filter(isTurkishTag) : product.tags;
  const detailHref = product.slug ? `/${tr ? "tr" : "en"}/products/${product.slug}` : undefined;

  return (
    <article className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_8px_22px_rgba(11,11,12,0.04)] transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f8fafc,#fff2e5)]">
        <MarketplaceImage src={product.mainImage} alt={imageAlt} visualCategory={product.visualCategory} title={title} fit={product.imageFit} />
        {product.sponsored && (
          <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 text-xs font-bold text-white">
            {copy.productCard.sponsored}
          </span>
        )}
        <button type="button" aria-label={tr ? "Favorilere ekle" : "Add to favorites"} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white text-ink shadow-sm">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        {category && <p className="mb-2 line-clamp-1 text-[11px] font-bold uppercase tracking-[0.08em] text-steel">{category}</p>}
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-ink">
          {detailHref ? <a href={detailHref} className="hover:text-copper">{title}</a> : title}
        </h3>
        {description && <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-steel">{description}</p>}
        {product.brandLogo && (
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-ink/10 bg-white">
              <img src={product.brandLogo} alt={`${product.brandName ?? product.supplierName ?? "Supplier"} logo`} className="h-full w-full object-contain p-1" />
            </span>
            <span className="text-xs font-bold text-ink">{product.brandName ?? product.supplierName}</span>
          </div>
        )}
        <p className="mt-2 text-lg font-bold text-copper">{priceRange}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-steel">
          <span>{copy.productCard.moq}: {tr ? product.moqTr ?? product.moq : product.moq}</span>
          <span>{country}</span>
          {leadTime && <span>{leadTime}</span>}
        </div>
        {visibleTags && visibleTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleTags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded bg-cloud px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-steel">{tag}</span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-ink/10 pt-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink">
            {product.verified ? <ShieldCheck size={15} className="text-blue-700" /> : <Store size={15} className="text-steel" />}
            {product.verified ? copy.productCard.verified : supplierType ?? (tr ? "Üretici profili" : "Supplier profile")}
          </span>
          <button type="button" className="rounded-md bg-signal px-3 py-2 text-xs font-bold text-white hover:bg-copper">
            {copy.productCard.inquiry}
          </button>
        </div>
        <button type="button" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-xs font-bold text-ink hover:bg-cloud">
          <MessageSquareText size={14} />
          {contactLabel}
        </button>
      </div>
    </article>
  );
}

function isTurkishTag(tag: string) {
  const value = tag.toLocaleLowerCase("tr");
  return ["duvar", "panel", "polimer", "lambiri", "yapı", "malzeme", "dekoratif", "ambalaj", "güneş", "telefon", "scooter", "giyim"].some((term) => value.includes(term));
}
