/* eslint-disable @next/next/no-img-element */

import { ArrowRight, CheckCircle2, FileText, Heart, MessageSquareText, PackageSearch, Send } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplaceImage } from "@/components/marketplace/marketplace-image";
import { getMarketplaceCopy } from "@/components/marketplace/marketplace-copy";
import { MobileBottomNav } from "@/components/marketplace/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { iWallLogo, iWallManufacturer, iWallProducts } from "./i-wall-data";
import { IWallProductCatalog } from "./i-wall-product-catalog";

export function IWallShowroom({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const copy = getMarketplaceCopy(locale);
  const featured = iWallProducts.slice(0, 6);
  const gallery = iWallProducts.slice(0, 8);

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale} />
      </div>
      <main className="min-h-screen bg-white pb-20 md:pb-0">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff7ed)] px-4 py-8 md:px-5 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border border-ink/10 bg-white p-2 shadow-[0_8px_22px_rgba(11,11,12,0.06)]">
                  <img src={iWallLogo} alt="i-WALL logo" className="h-full w-full object-contain" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{tr ? "Üretici showroom" : "Manufacturer showroom"}</p>
                  <h1 className="mt-2 text-4xl font-bold leading-tight text-ink sm:text-5xl">i-WALL</h1>
                  <p className="mt-1 text-sm font-bold text-steel">{tr ? "Türkiye · Yapı Malzemeleri · Polimer Lambiri" : "Turkey · Building Materials · PS Wall Panels"}</p>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-base leading-7 text-steel sm:text-lg">
                {tr ? iWallManufacturer.descriptionTr : iWallManufacturer.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(tr
                  ? ["Sahte sertifika yok", "RFQ ile fiyatlandırma", "27 gerçek ürün görseli", "İç mekan duvar paneli"]
                  : ["No fake certifications", "RFQ-based pricing", "27 real product images", "Interior wall panels"]
                ).map((item) => (
                  <span key={item} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-xs font-bold text-ink">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${locale}/rfq/new`}>
                  {tr ? "Teklif talebi gönder" : "Request Quote"}
                  <ArrowRight className="ml-2" size={17} />
                </Button>
                <Button href={`/${locale}/messages`} variant="secondary">
                  <MessageSquareText className="mr-2" size={17} />
                  {tr ? "Üretici ile iletişime geç" : "Contact Supplier"}
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-md border border-ink/10 bg-white p-3 shadow-soft sm:col-span-2">
                <MarketplaceImage src={iWallProducts[0]?.mainImage} alt={tr ? iWallProducts[0]?.imageAltTr ?? "i-WALL Polimer Lambiri" : iWallProducts[0]?.imageAlt ?? "i-WALL PS wall panel"} visualCategory="i_wall_ps_wall_panel" title="i-WALL PS Wall Panel" fit="contain" className="aspect-[16/9]" />
              </div>
              {featured.slice(1, 5).map((product) => (
                <a key={product.slug} href={`/${locale}/products/${product.slug}`} className="overflow-hidden rounded-md border border-ink/10 bg-white p-2 transition hover:border-signal/40">
                  <MarketplaceImage src={product.mainImage} alt={tr ? product.imageAltTr : product.imageAlt} visualCategory={product.visualCategory} title={tr ? product.titleTr : product.title} fit="contain" className="aspect-[4/3]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-5">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              [tr ? "Ülke" : "Country", tr ? iWallManufacturer.countryTr : iWallManufacturer.country],
              [tr ? "Ana kategori" : "Main category", tr ? iWallManufacturer.categoryTr : iWallManufacturer.category],
              [tr ? "Ürün adedi" : "Product count", String(iWallManufacturer.productCount)],
              [tr ? "Fiyatlandırma" : "Pricing", tr ? "Teklif ile" : "Request Quote"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-copper">{label}</p>
                <p className="mt-2 text-sm font-bold text-ink">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-ink/10 bg-cloud py-10">
          <div className="mx-auto max-w-7xl px-4 md:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">i-WALL</p>
                <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{tr ? "Gerçek ürün galerisi" : "Real product gallery"}</h2>
              </div>
              <Button href={`/${locale}/products?q=i-wall`} variant="secondary">{tr ? "Tüm ürünleri ara" : "Search all products"}</Button>
            </div>
            <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4">
              {gallery.map((product) => (
                <a key={product.slug} href={`/${locale}/products/${product.slug}`} className="rounded-md border border-ink/10 bg-white p-2 transition hover:border-signal/40">
                  <MarketplaceImage src={product.mainImage} alt={tr ? product.imageAltTr : product.imageAlt} visualCategory={product.visualCategory} title={tr ? product.titleTr : product.title} fit="contain" className="aspect-[4/3]" />
                  <p className="mt-2 line-clamp-1 text-xs font-bold text-ink">{tr ? product.titleTr : product.title}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <PackageSearch className="text-copper" size={22} />
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">{tr ? "PS Wall Panel ürün kataloğu" : "PS Wall Panel product catalog"}</h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-steel">
                {tr
                  ? "27 i-WALL polimer lambiri modeli gerçek yüklenen görsellerle listelenmiştir. Fiyatlar uydurulmaz; alıcılar RFQ ile teklif ister."
                  : "27 i-WALL PS wall panel models are listed with the real uploaded product assets. Prices are not invented; buyers request quotations through RFQ."}
              </p>
            </div>
            <Button href={`/${locale}/rfq/new`} variant="secondary">{tr ? "Toplu RFQ oluştur" : "Create bulk RFQ"}</Button>
          </div>
          <IWallProductCatalog locale={locale} products={iWallProducts} copy={copy} />
        </section>

        <section className="bg-ink px-4 py-10 text-white md:px-5">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="text-signal" size={22} />
                <h2 className="text-2xl font-bold">{tr ? "Alıcı iletişimi ve RFQ akışı" : "Buyer inquiry and RFQ workflow"}</h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
                {tr
                  ? "Alıcılar ürün modeli, miktar, teslimat ülkesi ve proje detaylarını paylaşarak i-WALL için teklif sürecini başlatabilir."
                  : "Buyers can start the i-WALL quotation process by sharing product model, quantity, destination country and project details."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/rfq/new`}>
                <Send className="mr-2" size={16} />
                {tr ? "RFQ gönder" : "Send RFQ"}
              </Button>
              <Button href={`/${locale}/account/favorites`} variant="secondary">
                <Heart className="mr-2" size={16} />
                {tr ? "Kaydet" : "Save"}
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-5">
          <h2 className="text-2xl font-bold text-ink">{tr ? "Teknik kapsam" : "Technical scope"}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(tr
              ? ["Uzunluk: 2.80 m", "Genişlik: 12-15 cm", "MOQ: 100 m²", "Teslim süresi: 10-20 gün", "Kategori: Dekoratif iç mekan duvar panelleri", "Fiyatlandırma: RFQ ile"]
              : ["Length: 2.80 m", "Width: 12-15 cm", "MOQ: 100 m²", "Lead time: 10-20 days", "Category: Decorative interior wall panels", "Pricing: Request Quote"]
            ).map((item) => (
              <p key={item} className="flex items-center gap-2 rounded-md border border-ink/10 bg-white p-4 text-sm font-semibold text-steel">
                <CheckCircle2 className="text-copper" size={16} />
                {item}
              </p>
            ))}
          </div>
        </section>
      </main>
      <div className="md:hidden">
        <MobileBottomNav locale={locale} active="categories" />
      </div>
      <div className="hidden md:block">
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}
