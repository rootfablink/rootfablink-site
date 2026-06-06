"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Box, Camera, Factory, FileText, Grid2X2, Mail, Mic, PackageSearch, Search, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { getMobileMarketplaceCopy, mobileSeedProducts, mobileSuppliers } from "./mobile-marketplace-copy";
import { MobileUtilityHeader } from "./mobile-utility-header";

export function MobileMarketplaceHome({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);
  const [query, setQuery] = useState("");

  const saveSearch = () => {
    if (!query.trim() || typeof window === "undefined") return;
    const key = "rootfablink.mobile.searches";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    window.localStorage.setItem(key, JSON.stringify([query.trim(), ...current.filter((item) => item !== query.trim())].slice(0, 6)));
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-20 md:hidden">
      <MobileUtilityHeader locale={locale} />
      <div className="sticky top-[53px] z-40 border-b border-ink/10 bg-white px-3 pt-1">
        <MobilePrimaryTabs locale={locale} labels={copy.tabs} active="products" />
      </div>

      <main className="px-4 py-4">
        <section className="rounded-2xl bg-white p-3 shadow-[0_8px_22px_rgba(11,11,12,0.05)]">
          <div className="flex min-h-13 items-center gap-2 rounded-xl border-2 border-signal/45 bg-white px-3">
            <button type="button" aria-label={copy.lens} className="text-copper">
              <Camera size={21} />
            </button>
            <input
              aria-label={copy.searchPlaceholder}
              className="h-12 min-w-0 flex-1 text-sm font-semibold outline-none placeholder:text-steel"
              placeholder={copy.searchPlaceholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveSearch();
              }}
            />
            <button type="button" aria-label={copy.voiceSearch} className="text-steel">
              <Mic size={20} />
            </button>
            <a onClick={saveSearch} href={`/${locale}/products${query ? `?q=${encodeURIComponent(query)}` : ""}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal text-white">
              <Search size={18} />
            </a>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {copy.searchExamples.map((item) => (
              <button key={item} type="button" onClick={() => setQuery(item)} className="shrink-0 rounded-full bg-cloud px-3 py-1.5 text-xs font-semibold text-ink">
                {item}
              </button>
            ))}
          </div>
        </section>

        <ShortcutRail labels={copy.shortcuts} locale={locale} />
        <ProductsSection copy={copy} locale={locale} />
      </main>

      <MobileBottomNav locale={locale} active="home" />
    </div>
  );
}

function MobilePrimaryTabs({ locale, labels, active }: { locale: Locale; labels: string[]; active: "logistics" | "products" | "manufacturers" | "customs" }) {
  const items = [
    { key: "manufacturers" as const, label: labels[0] ?? "Manufacturers", href: `/${locale}/manufacturers`, icon: Factory },
    { key: "products" as const, label: labels[1] ?? "Products", href: `/${locale}/products`, icon: Box },
    { key: "customs" as const, label: labels[2] ?? "Customs", href: `/${locale}/customs`, icon: ShieldCheck },
    { key: "logistics" as const, label: labels[3] ?? "Logistics", href: `/${locale}/logistics`, icon: Truck }
  ];

  return (
    <nav aria-label={locale === "tr" ? "Mobil ana pazar navigasyonu" : "Mobile marketplace navigation"} className="mt-3 grid grid-cols-4 gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === active;
        return (
          <a
            key={item.key}
            href={item.href}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 border-b-2 px-1 pb-2 pt-1 text-center text-[10px] font-bold leading-tight ${isActive ? "border-signal text-ink" : "border-transparent text-steel"}`}
            title={item.label}
          >
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ${isActive ? "bg-signal/10 text-copper" : "bg-cloud text-steel"}`}>
              <Icon size={17} />
            </span>
            <span className="block max-w-full truncate whitespace-nowrap">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function ShortcutRail({ labels, locale }: { labels: string[]; locale: Locale }) {
  const icons = [Grid2X2, FileText, ShieldCheck, Sparkles, PackageSearch, Factory, Mail];
  const hrefs = ["categories", "rfq", "products", "products", "products", "products", "contact"];
  return (
    <section className="mt-4 flex gap-3 overflow-x-auto pb-1">
      {labels.map((label, index) => {
        const Icon = icons[index] ?? Grid2X2;
        return (
          <a key={label} href={`/${locale}/${hrefs[index] ?? "products"}`} className="flex min-w-24 flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cloud text-copper">
              <Icon size={19} />
            </span>
            <span className="text-xs font-bold leading-4 text-ink">{label}</span>
          </a>
        );
      })}
    </section>
  );
}

function ProductsSection({ copy, locale }: { copy: ReturnType<typeof getMobileMarketplaceCopy>; locale: Locale }) {
  return (
    <>
      <HorizontalTabs items={copy.categoryTabs} />
      <MobileProductCarousel title={copy.sections.featured} locale={locale} />
      <MobileProductCarousel title={copy.sections.recommended} locale={locale} offset={2} />
      <MobileProductCarousel title={copy.sections.samples} locale={locale} offset={4} />
      <SupplierRail title={copy.sections.recent} locale={locale} />
    </>
  );
}

function HorizontalTabs({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
      {items.map((item, index) => (
        <button key={item} type="button" className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${index === 0 ? "bg-ink text-white" : "bg-white text-ink"}`}>
          {item}
        </button>
      ))}
    </div>
  );
}

function MobileProductCarousel({ title, locale, offset = 0 }: { title: string; locale: Locale; offset?: number }) {
  const tr = locale === "tr";

  return (
    <section className="mt-5">
      <SectionTitle title={title} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {mobileSeedProducts.slice(offset).concat(mobileSeedProducts.slice(0, offset)).slice(0, 4).map((product) => (
          <a key={`${title}-${product.title}`} href={`/${locale}/products/${product.slug}`} className="min-w-44 overflow-hidden rounded-2xl bg-white shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            <div className="flex h-44 items-center justify-center bg-white p-3">
              <img src={product.image} alt={tr ? product.titleTr : product.title} className="h-full w-full object-contain" />
            </div>
            <div className="p-3">
              <span className="rounded-full bg-signal/10 px-2 py-1 text-[10px] font-bold text-copper">{product.country}</span>
              <h3 className="mt-2 line-clamp-2 min-h-9 text-xs font-bold leading-4 text-ink">{tr ? product.titleTr : product.title}</h3>
              <p className="mt-2 text-sm font-bold text-copper">{tr ? product.priceTr : product.price}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SupplierRail({ title, locale }: { title: string; locale: Locale }) {
  return (
    <section className="mt-5">
      <SectionTitle title={title} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {mobileSuppliers.map((supplier) => (
          <a key={supplier.name} href={`/${locale}${supplier.cta}`} className="min-w-64 rounded-2xl bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            {supplier.logo ? (
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-ink/10 bg-white p-1">
                <img src={supplier.logo} alt={`${supplier.name} logo`} className="h-full w-full object-contain" />
              </span>
            ) : (
              <Factory size={22} className="text-copper" />
            )}
            <h3 className="mt-3 text-sm font-bold text-ink">{supplier.name}</h3>
            <p className="mt-1 text-xs font-semibold text-steel">{locale === "tr" ? supplier.categoryTr ?? supplier.category : supplier.category} · {supplier.country}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-lg font-bold leading-tight text-ink">{title}</h2>;
}
