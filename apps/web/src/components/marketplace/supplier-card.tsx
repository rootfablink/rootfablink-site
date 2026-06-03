"use client";

import { BadgeCheck, Globe2 } from "lucide-react";
import type { MarketplaceCopy } from "./marketplace-copy";

export type SupplierCardData = {
  company: string;
  country: string;
  category: string;
  response: string;
  markets: string;
};

export function SupplierCard({ supplier, copy }: { supplier: SupplierCardData; copy: MarketplaceCopy }) {
  return (
    <article className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink">{supplier.company}</h3>
          <p className="mt-1 text-sm font-medium text-steel">{supplier.country} · {supplier.category}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <BadgeCheck size={20} />
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <p className="inline-flex items-center gap-2 font-semibold text-ink">
          <BadgeCheck size={16} className="text-copper" />
          {copy.supplierCard.verified}
        </p>
        <p className="inline-flex items-center gap-2 text-steel">
          <Globe2 size={16} />
          {copy.supplierCard.response}: {supplier.response} · {copy.supplierCard.markets}: {supplier.markets}
        </p>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button type="button" className="rounded-md bg-ink px-3 py-2 text-sm font-bold text-white">{copy.supplierCard.contact}</button>
        <button type="button" className="rounded-md border border-ink/10 px-3 py-2 text-sm font-bold text-ink hover:bg-cloud">{copy.supplierCard.profile}</button>
      </div>
    </article>
  );
}
