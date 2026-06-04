"use client";

import { Heart, MessageSquareText, ShieldCheck, Store } from "lucide-react";
import type { MarketplaceCopy } from "./marketplace-copy";

export type ProductCardData = {
  title: string;
  price: string;
  priceRange?: string;
  moq: string;
  country: string;
  verified: boolean;
  sponsored?: boolean;
  mainImage?: string;
  leadTime?: string;
  category?: string;
  subcategory?: string;
  shortDescription?: string;
  source?: "marketplace_seed_data" | string;
  supplierName?: string;
  supplierType?: string;
  tags?: string[];
  tradeTerms?: string[];
  capabilities?: string[];
  reviewCount?: number;
  review_count?: number;
  rating?: number | null;
};

export function ProductCard({ product, copy }: { product: ProductCardData; copy: MarketplaceCopy }) {
  const contactLabel = copy.productCard.contact ?? "Contact supplier";

  return (
    <article className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_8px_22px_rgba(11,11,12,0.04)] transition hover:-translate-y-0.5 hover:shadow-soft">
      <div
        className="relative flex aspect-[4/3] items-center justify-center bg-cover bg-center bg-[linear-gradient(135deg,#f8fafc,#fff2e5)]"
        style={product.mainImage ? { backgroundImage: `linear-gradient(180deg,rgba(11,11,12,0.02),rgba(11,11,12,0.18)),url(${product.mainImage})` } : undefined}
      >
        {product.sponsored && (
          <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 text-xs font-bold text-white">
            {copy.productCard.sponsored}
          </span>
        )}
        <button type="button" aria-label="Add to favorites" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white text-ink shadow-sm">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        {product.category && <p className="mb-2 line-clamp-1 text-[11px] font-bold uppercase tracking-[0.08em] text-steel">{product.category}</p>}
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-ink">{product.title}</h3>
        {product.shortDescription && <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-steel">{product.shortDescription}</p>}
        <p className="mt-2 text-lg font-bold text-copper">{product.priceRange ?? product.price}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-steel">
          <span>{copy.productCard.moq}: {product.moq}</span>
          <span>{product.country}</span>
          {product.leadTime && <span>{product.leadTime}</span>}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-ink/10 pt-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink">
            {product.verified ? <ShieldCheck size={15} className="text-blue-700" /> : <Store size={15} className="text-steel" />}
            {product.verified ? copy.productCard.verified : product.supplierType ?? "Supplier-ready profile"}
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
