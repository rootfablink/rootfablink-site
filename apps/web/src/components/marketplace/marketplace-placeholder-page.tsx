import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { getMarketplaceCopy, marketplaceSeedProducts } from "./marketplace-copy";
import { MarketplaceHeader } from "./marketplace-header";
import { ProductCard } from "./product-card";

export type MarketplaceRouteKey =
  | "categories"
  | "verified-manufacturers"
  | "trade-protection"
  | "buyer-center"
  | "supplier-center"
  | "messages"
  | "help-center"
  | "account"
  | "supplier/onboarding"
  | "products"
  | "manufacturers";

export function MarketplacePlaceholderPage({ locale, routeKey }: { locale: Locale; routeKey: MarketplaceRouteKey }) {
  const copy = getMarketplaceCopy(locale);
  const [title, intro] = copy.routes[routeKey];
  const seedCategories = Array.from(new Set(marketplaceSeedProducts.map((product) => product.category).filter((category): category is string => Boolean(category))));
  const relevantItems =
    routeKey === "categories"
      ? seedCategories
      : routeKey === "buyer-center"
        ? copy.buyerCenter
        : routeKey === "supplier-center" || routeKey === "supplier/onboarding"
          ? copy.supplierCenter
          : routeKey === "trade-protection"
            ? copy.protectionMenu.items
            : routeKey === "verified-manufacturers" || routeKey === "manufacturers"
              ? copy.verifiedMenu.items
              : copy.home.businessCards;

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main>
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff8f1)]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5">
            <RootFabLinkWordmark variant="accent" size="default" />
            <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-steel sm:text-lg">{intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/rfq`}>
                {copy.header.rfq}
                <ArrowRight className="ml-2" size={17} />
              </Button>
              <Button href={`/${locale}/supplier/onboarding`} variant="secondary">{copy.header.supplierOnboarding}</Button>
            </div>
          </div>
        </section>

        {routeKey === "products" ? (
          <section className="bg-white py-12 sm:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">Marketplace seed catalog</p>
                  <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">Product and service discovery</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">
                    Seed listings are visible marketplace structure data. They are not verified suppliers, do not include reviews and do not claim certifications.
                  </p>
                </div>
                <Button href={`/${locale}/rfq`} variant="secondary">{copy.header.rfq}</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {marketplaceSeedProducts.map((product) => (
                  <ProductCard key={product.title} product={product} copy={copy} />
                ))}
              </div>
            </div>
          </section>
        ) : (
        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid gap-4 md:grid-cols-3">
              {relevantItems.slice(0, routeKey === "categories" ? 24 : 9).map((item) => (
                <article key={item} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                  <CheckCircle2 className="text-copper" size={20} />
                  <h2 className="mt-4 text-base font-bold text-ink">{item}</h2>
                  <p className="mt-2 text-sm leading-6 text-steel">{copy.home.heroEyebrow}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        )}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
