"use client";

import { BadgeCheck, Box, CheckCircle2, Factory, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MarketplaceCopy } from "./marketplace-copy";

export function CategoryMegaMenu({ copy, locale }: { copy: MarketplaceCopy; locale: string }) {
  const featured = copy.categories.groups[2] ?? copy.categories.groups[0] ?? ["Categories", []];

  return (
    <div className="grid gap-4 lg:grid-cols-[0.74fr_1.26fr]">
      <div className="max-h-[62vh] overflow-y-auto rounded-md border border-ink/10 bg-white p-2">
        {copy.categories.groups.map(([name]) => (
          <a key={name} href={`/${locale}/categories`} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-ink hover:bg-cloud">
            <Box size={17} className="text-copper" />
            {name}
          </a>
        ))}
      </div>
      <div className="grid gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{copy.categories.title}</p>
          <h3 className="mt-2 text-xl font-bold text-ink">{featured[0]}</h3>
          <p className="mt-2 text-sm leading-6 text-steel">{copy.categories.subtitle}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {featured[1].map((item) => (
            <a key={item} href={`/${locale}/products`} className="rounded-md border border-ink/10 bg-cloud px-3 py-2 text-sm font-medium text-ink hover:border-signal/40">
              {item}
            </a>
          ))}
        </div>
        <div className="grid gap-3 rounded-md border border-signal/20 bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-bold text-ink">{copy.categories.featuredSupplier}</p>
            <p className="mt-1 text-sm leading-6 text-steel">{copy.categories.featuredText}</p>
          </div>
          <Button href={`/${locale}/categories`} variant="secondary">
            {copy.categories.viewAll}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function VerifiedManufacturersMenu({ copy, locale }: { copy: MarketplaceCopy; locale: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-copper">
          <Factory size={22} />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-ink">{copy.verifiedMenu.title}</h3>
        <p className="mt-3 text-sm leading-6 text-steel">{copy.verifiedMenu.text}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href={`/${locale}/verified-manufacturers`}>{copy.verifiedMenu.explore}</Button>
          <Button href={`/${locale}/supplier/onboarding`} variant="secondary">
            {copy.verifiedMenu.become}
          </Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {copy.verifiedMenu.items.map((item) => (
          <div key={item} className="rounded-md border border-ink/10 bg-white p-4">
            <BadgeCheck size={18} className="text-copper" />
            <p className="mt-3 text-sm font-semibold leading-6 text-ink">{item}</p>
          </div>
        ))}
        {copy.verifiedMenu.stats.map((item) => (
          <div key={item} className="rounded-md bg-ink p-4 text-white">
            <p className="text-sm font-semibold leading-6">{item}</p>
            <p className="mt-2 text-xs text-white/62">Designed for marketplace scale</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TradeProtectionMenu({ copy, locale }: { copy: MarketplaceCopy; locale: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <ShieldCheck size={22} />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-ink">{copy.protectionMenu.title}</h3>
        <p className="mt-3 text-sm leading-6 text-steel">{copy.protectionMenu.text}</p>
        <div className="mt-5">
          <Button href={`/${locale}/trade-protection`} variant="secondary">
            {copy.protectionMenu.cta}
          </Button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {copy.protectionMenu.items.map((item) => (
          <div key={item} className="rounded-md border border-ink/10 bg-cloud p-4">
            <CheckCircle2 size={18} className="text-blue-700" />
            <p className="mt-3 text-sm font-semibold leading-6 text-ink">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignInDropdown({ copy, locale }: { copy: MarketplaceCopy; locale: string }) {
  return (
    <div className="w-full max-w-sm">
      <h3 className="text-lg font-bold text-ink">{copy.signIn.welcome}</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button href={`/${locale}/auth/login`}>{copy.signIn.signIn}</Button>
        <Button href={`/${locale}/auth/register`} variant="secondary">
          {copy.signIn.create}
        </Button>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-steel">{copy.signIn.social}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {["Google", "LinkedIn", "Facebook"].map((item) => (
          <button key={item} type="button" className="rounded-md border border-ink/10 px-2 py-2 text-xs font-semibold text-ink hover:bg-cloud">
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-1 border-t border-ink/10 pt-3">
        {copy.signIn.items.map((item) => (
          <a key={item} href={`/${locale}/account`} className="rounded-md px-2 py-2 text-sm font-medium text-steel hover:bg-cloud hover:text-ink">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

export function CenterMenu({ items, locale, supplier = false }: { items: string[]; locale: string; supplier?: boolean }) {
  return (
    <div className="grid w-full max-w-md gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <a key={item} href={`/${locale}/${supplier ? "supplier-center" : "buyer-center"}`} className="rounded-md border border-ink/10 bg-white p-3 text-sm font-semibold leading-5 text-ink hover:border-signal/40 hover:bg-cloud">
          <Globe2 size={16} className="mb-2 text-copper" />
          {item}
        </a>
      ))}
    </div>
  );
}
