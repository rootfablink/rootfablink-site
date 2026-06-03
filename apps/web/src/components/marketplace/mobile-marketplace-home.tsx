"use client";

import { useState } from "react";
import { ArrowRight, Bot, Camera, Factory, FileText, Grid2X2, Mic, PackageSearch, Search, ShieldCheck, Sparkles } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { countrySourcingCards, getMobileMarketplaceCopy, mobileProducts, mobileSuppliers } from "./mobile-marketplace-copy";

type MobileTab = "AI Mode" | "Products" | "Manufacturers" | "Worldwide" | "AI Modu" | "Ürünler" | "Üreticiler" | "Dünya çapında";

export function MobileMarketplaceHome({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);
  const [activeTab, setActiveTab] = useState<MobileTab>(copy.tabs[1] as MobileTab);
  const [query, setQuery] = useState("");
  const isAi = activeTab === copy.tabs[0];
  const isManufacturers = activeTab === copy.tabs[2];
  const isWorldwide = activeTab === copy.tabs[3];

  const saveSearch = () => {
    if (!query.trim() || typeof window === "undefined") return;
    const key = "rootfablink.mobile.searches";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    window.localStorage.setItem(key, JSON.stringify([query.trim(), ...current.filter((item) => item !== query.trim())].slice(0, 6)));
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-20 md:hidden">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white px-4 pt-3">
        <div className="flex items-center justify-between">
          <RootFabLinkWordmark size="compact" />
          <a href={`/${locale}/supplier/onboarding`} className="rounded-md bg-ink px-3 py-2 text-xs font-bold text-white">
            {locale === "tr" ? "Tedarikçi ol" : "Supplier"}
          </a>
        </div>
        <div className="mt-3 flex gap-5 overflow-x-auto">
          {copy.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as MobileTab)}
              className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-bold ${activeTab === tab ? "border-signal text-ink" : "border-transparent text-steel"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

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

        {isAi ? <AiMode copy={copy} /> : isWorldwide ? <WorldwideSection copy={copy} /> : isManufacturers ? <ManufacturersSection copy={copy} locale={locale} /> : <ProductsSection copy={copy} locale={locale} />}
      </main>

      <MobileBottomNav locale={locale} active="home" />
    </div>
  );
}

function ShortcutRail({ labels, locale }: { labels: string[]; locale: Locale }) {
  const icons = [Grid2X2, FileText, ShieldCheck, Sparkles, PackageSearch, Factory];
  return (
    <section className="mt-4 flex gap-3 overflow-x-auto pb-1">
      {labels.map((label, index) => {
        const Icon = icons[index] ?? Grid2X2;
        return (
          <a key={label} href={`/${locale}/${index === 1 ? "rfq" : index === 0 ? "categories" : "products"}`} className="flex min-w-24 flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
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
      <MobileProductCarousel title={copy.sections.featured} />
      <MobileProductCarousel title={copy.sections.recommended} offset={2} />
      <MobileProductCarousel title={copy.sections.samples} offset={4} />
      <SupplierRail title={copy.sections.recent} locale={locale} />
    </>
  );
}

function ManufacturersSection({ copy, locale }: { copy: ReturnType<typeof getMobileMarketplaceCopy>; locale: Locale }) {
  return (
    <>
      <section className="mt-5 rounded-2xl bg-ink p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">RFQ</p>
        <h2 className="mt-2 text-xl font-bold">{copy.sections.supplierMatch}</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">i-WALL and verified factory programs are prepared for supplier matching.</p>
        <a href={`/${locale}/rfq`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-signal px-4 py-2 text-sm font-bold text-white">
          RFQ <ArrowRight size={16} />
        </a>
      </section>
      <SupplierRail title={copy.sections.manufacturers} locale={locale} />
      <MobileProductCarousel title={copy.sections.samples} />
    </>
  );
}

function WorldwideSection({ copy }: { copy: ReturnType<typeof getMobileMarketplaceCopy> }) {
  return (
    <section className="mt-5">
      <SectionTitle title={copy.worldwideTitle} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {countrySourcingCards.map((card) => (
          <article key={card.title} className="min-w-64 rounded-2xl bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{card.flag}</span>
              <ArrowRight size={18} className="text-copper" />
            </div>
            <h3 className="mt-3 text-base font-bold text-ink">{card.title}</h3>
            <p className="mt-1 text-xs font-semibold text-steel">{card.volume}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="aspect-square rounded-xl bg-[linear-gradient(135deg,#fff8f1,#e5edf7)]" />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiMode({ copy }: { copy: ReturnType<typeof getMobileMarketplaceCopy> }) {
  return (
    <section className="mt-5 rounded-2xl bg-ink p-5 text-white">
      <Bot className="text-signal" size={28} />
      <h2 className="mt-4 text-2xl font-bold">{copy.sections.aiTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-white/72">{copy.sections.aiText}</p>
      <textarea className="mt-4 min-h-28 w-full rounded-xl border border-white/10 bg-white/8 p-3 text-sm outline-none placeholder:text-white/45" placeholder={copy.sections.aiPlaceholder} />
      <button type="button" disabled className="mt-4 w-full cursor-not-allowed rounded-xl bg-white/20 px-4 py-3 text-sm font-bold text-white">
        {copy.sections.aiButton}
      </button>
    </section>
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

function MobileProductCarousel({ title, offset = 0 }: { title: string; offset?: number }) {
  return (
    <section className="mt-5">
      <SectionTitle title={title} />
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {mobileProducts.slice(offset).concat(mobileProducts.slice(0, offset)).slice(0, 4).map((product) => (
          <article key={`${title}-${product.title}`} className="min-w-40 overflow-hidden rounded-2xl bg-white shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            <div className="aspect-square bg-[linear-gradient(135deg,#fff8f1,#e5edf7)]" />
            <div className="p-3">
              <span className="rounded-full bg-signal/10 px-2 py-1 text-[10px] font-bold text-copper">{product.supplier === "i-WALL" ? "i-WALL" : product.country}</span>
              <h3 className="mt-2 line-clamp-2 min-h-9 text-xs font-bold leading-4 text-ink">{product.title}</h3>
              <p className="mt-2 text-sm font-bold text-copper">{product.price}</p>
            </div>
          </article>
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
            <Factory size={22} className="text-copper" />
            <h3 className="mt-3 text-sm font-bold text-ink">{supplier.name}</h3>
            <p className="mt-1 text-xs font-semibold text-steel">{supplier.category} · {supplier.country}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-lg font-bold leading-tight text-ink">{title}</h2>;
}
