"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { ArrowRight, BadgeCheck, Boxes, Camera, Factory, FileSearch, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { FloatingActionBar } from "./floating-action-bar";
import { getMarketplaceCopy, marketplaceProducts, marketplaceSuppliers } from "./marketplace-copy";
import { MarketplaceHeader } from "./marketplace-header";
import { RFQQuickModal, RootFabLinkLensModal } from "./marketplace-modals";
import { ProductCard } from "./product-card";
import { SupplierCard } from "./supplier-card";

export function MarketplaceHome({ locale }: { locale: Locale }) {
  const copy = getMarketplaceCopy(locale);
  const [lensOpen, setLensOpen] = useState(false);
  const [rfqOpen, setRfqOpen] = useState(false);
  const primaryCategories = copy.categories.groups.slice(0, 6);

  return (
    <>
      <MarketplaceHeader locale={locale} onOpenLens={() => setLensOpen(true)} />
      <main className="bg-white">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_52%,#fff2e5_100%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-5 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="rounded-md border border-ink/10 bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{copy.home.recommended}</p>
              <div className="mt-4 grid gap-1">
                {primaryCategories.map(([name, subitems]) => (
                  <a key={name} href={`/${locale}/categories`} className="rounded-md px-3 py-2 text-sm font-semibold text-ink hover:bg-cloud">
                    {name}
                    <span className="mt-1 block text-xs font-medium text-steel">{subitems.slice(0, 3).join(" · ")}</span>
                  </a>
                ))}
              </div>
            </aside>

            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-signal/25 bg-cloud px-3 py-2 text-sm font-semibold leading-5 text-copper">
                <Sparkles size={16} />
                <span>{copy.home.heroEyebrow}</span>
              </div>
              <h1 className="mt-6 max-w-5xl text-balance text-4xl font-bold leading-[1.04] text-ink sm:text-5xl lg:text-6xl">
                {copy.home.heroTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-steel sm:text-lg sm:leading-8">{copy.home.heroText}</p>

              <div className="mt-7 rounded-md border border-ink/10 bg-white p-3 shadow-soft">
                <div className="flex flex-wrap gap-2">
                  {copy.home.searchTabs.map((tab) => (
                    <span key={tab} className="rounded-md bg-cloud px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-ink">
                      {tab}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input className="min-h-12 flex-1 rounded-md border border-ink/10 px-4 text-sm font-medium outline-none focus:border-signal" placeholder={copy.header.search} />
                  <button type="button" onClick={() => setLensOpen(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-ink/10 px-4 text-sm font-bold text-ink hover:bg-cloud">
                    <Camera size={17} />
                    {copy.header.lens}
                  </button>
                  <Button href={`/${locale}/products`}>
                    {copy.header.products}
                    <ArrowRight className="ml-2" size={17} />
                  </Button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <MarketplaceMiniCard icon={FileSearch} title={copy.home.welcome} text={copy.home.rfqCallout} />
                <MarketplaceMiniCard icon={Factory} title={copy.verifiedMenu.explore} text={copy.verifiedMenu.text} />
                <MarketplaceMiniCard icon={ShieldCheck} title={copy.protectionMenu.title} text={copy.protectionMenu.text} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <SectionHeading eyebrow="RootFabLink" title={copy.home.mostSearched} />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marketplaceProducts.map((product) => (
                <ProductCard key={product.title} product={product} copy={copy} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-cloud py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <SectionHeading eyebrow={copy.header.verified} title={copy.home.verifiedDiscovery} />
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {marketplaceSuppliers.map((supplier) => (
                <SupplierCard key={supplier.company} supplier={supplier} copy={copy} />
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {copy.home.discoveryCards.map((item) => (
                <InfoTile key={item} icon={BadgeCheck} text={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-12 text-white sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-signal">{copy.protectionMenu.title}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">{copy.home.tradeProtection}</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">{copy.protectionMenu.text}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.home.protectionCards.map((item) => (
                <div key={item} className="rounded-md border border-white/12 bg-white/8 p-5">
                  <ShieldCheck size={21} className="text-signal" />
                  <p className="mt-4 font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <SectionHeading eyebrow={copy.header.buyerCenter} title={copy.home.businessRecommendations} />
                <div className="mt-5 grid gap-2">
                  {copy.buyerCenter.slice(0, 5).map((item) => (
                    <a key={item} href={`/${locale}/buyer-center`} className="rounded-md border border-ink/10 px-4 py-3 text-sm font-semibold text-ink hover:bg-cloud">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {copy.home.businessCards.map((item, index) => (
                  <article key={item} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                    {index === 0 ? <FileSearch className="text-copper" size={24} /> : index === 1 ? <Sparkles className="text-copper" size={24} /> : index === 2 ? <BadgeCheck className="text-copper" size={24} /> : <Truck className="text-copper" size={24} />}
                    <h3 className="mt-4 text-lg font-bold text-ink">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{copy.home.heroEyebrow}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-[linear-gradient(135deg,#fff8f1,#ffffff)] py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <SectionHeading eyebrow={copy.header.supplierCenter} title={copy.home.supplierGrowth} />
            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {copy.home.growth.map(([title, text]) => (
                <article key={title} className="rounded-md border border-signal/20 bg-white p-5">
                  <Boxes className="text-copper" size={22} />
                  <h3 className="mt-4 font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/supplier/onboarding`}>{copy.header.supplierOnboarding}</Button>
              <Button href={`/${locale}/pricing`} variant="secondary">{copy.header.startTrading}</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
      <FloatingActionBar copy={copy} locale={locale} onOpenLens={() => setLensOpen(true)} onOpenRfq={() => setRfqOpen(true)} />
      <RootFabLinkLensModal copy={copy} open={lensOpen} onClose={() => setLensOpen(false)} />
      <RFQQuickModal copy={copy} open={rfqOpen} onClose={() => setRfqOpen(false)} />
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function MarketplaceMiniCard({ icon: Icon, title, text }: { icon: ComponentType<{ size?: number; className?: string }>; title: string; text: string }) {
  return (
    <article className="rounded-md border border-ink/10 bg-white/80 p-4">
      <Icon size={20} className="text-copper" />
      <h3 className="mt-3 font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
    </article>
  );
}

function InfoTile({ icon: Icon, text }: { icon: ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-4">
      <Icon size={18} className="text-copper" />
      <p className="mt-3 text-sm font-semibold leading-6 text-ink">{text}</p>
    </div>
  );
}
