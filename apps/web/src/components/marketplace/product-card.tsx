"use client";

import { Heart, ShieldCheck, Star } from "lucide-react";
import type { MarketplaceCopy } from "./marketplace-copy";

export type ProductCardData = {
  title: string;
  price: string;
  moq: string;
  country: string;
  verified: boolean;
  sponsored?: boolean;
};

export function ProductCard({ product, copy }: { product: ProductCardData; copy: MarketplaceCopy }) {
  return (
    <article className="group overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_8px_22px_rgba(11,11,12,0.04)] transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#f8fafc,#fff2e5)]">
        <div className="h-20 w-20 rounded-md border border-white/80 bg-white/70 shadow-[inset_0_0_0_1px_rgba(11,11,12,0.04)]" />
        {product.sponsored && (
          <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 text-xs font-bold text-white">
            {copy.productCard.sponsored}
          </span>
        )}
        <button type="button" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white text-ink shadow-sm">
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-ink">{product.title}</h3>
        <p className="mt-2 text-lg font-bold text-copper">{product.price}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-steel">
          <span>{copy.productCard.moq}: {product.moq}</span>
          <span>{product.country}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink">
            {product.verified ? <ShieldCheck size={15} className="text-blue-700" /> : <Star size={15} className="text-steel" />}
            {product.verified ? copy.productCard.verified : "Profile"}
          </span>
          <button type="button" className="rounded-md bg-signal px-3 py-2 text-xs font-bold text-white hover:bg-copper">
            {copy.productCard.inquiry}
          </button>
        </div>
      </div>
    </article>
  );
}
