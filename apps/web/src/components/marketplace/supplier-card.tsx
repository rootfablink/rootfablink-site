"use client";

/* eslint-disable @next/next/no-img-element */

import { BadgeCheck, Globe2 } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import type { MarketplaceCopy } from "./marketplace-copy";

export type SupplierCardData = {
  company: string;
  country: string;
  countryTr?: string;
  category: string;
  categoryTr?: string;
  response: string;
  markets: string;
  verified?: boolean;
  href?: string;
  logo?: string;
  productCount?: number;
};

export function SupplierCard({ supplier, copy, locale }: { supplier: SupplierCardData; copy: MarketplaceCopy; locale?: Locale }) {
  const tr = locale === "tr";
  const verified = supplier.verified ?? true;
  const href = supplier.company === "i-WALL" && locale ? `/${locale}/supplier/i-wall` : supplier.href;
  const country = tr ? supplier.countryTr ?? supplier.country : supplier.country;
  const category = tr ? supplier.categoryTr ?? supplier.category : supplier.category;

  return (
    <article className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink">{supplier.company}</h3>
          <p className="mt-1 text-sm font-medium text-steel">{country} · {category}</p>
          {supplier.productCount && <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-copper">{supplier.productCount} {tr ? "ürün" : "products"}</p>}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-blue-50 text-blue-700">
          {supplier.logo ? <img src={supplier.logo} alt={`${supplier.company} logo`} className="h-full w-full object-contain p-1" /> : <BadgeCheck size={20} />}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <p className="inline-flex items-center gap-2 font-semibold text-ink">
          <BadgeCheck size={16} className={verified ? "text-copper" : "text-steel"} />
          {verified ? copy.supplierCard.verified : tr ? "Üretici profili" : "Supplier profile"}
        </p>
        <p className="inline-flex items-center gap-2 text-steel">
          <Globe2 size={16} />
          {copy.supplierCard.response}: {supplier.response} · {copy.supplierCard.markets}: {supplier.markets}
        </p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button type="button" className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-white">{copy.supplierCard.contact}</button>
        {href ? (
          <a href={href} className="rounded-md border border-ink/10 px-3 py-2 text-center text-sm font-bold text-ink hover:bg-cloud">{copy.supplierCard.profile}</a>
        ) : (
          <button type="button" className="rounded-md border border-ink/10 px-3 py-2 text-sm font-bold text-ink hover:bg-cloud">{copy.supplierCard.profile}</button>
        )}
      </div>
    </article>
  );
}
