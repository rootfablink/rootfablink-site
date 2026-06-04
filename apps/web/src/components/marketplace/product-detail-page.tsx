/* eslint-disable @next/next/no-img-element */

import { ArrowRight, CheckCircle2, Download, Heart, MessageSquareText, PackageCheck, Send, Store } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { MarketplaceHeader } from "./marketplace-header";
import { MarketplaceImage } from "./marketplace-image";
import { getMarketplaceCopy, marketplaceSeedProducts } from "./marketplace-copy";
import { ProductCard } from "./product-card";

export function ProductDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const copy = getMarketplaceCopy(locale);
  const tr = locale === "tr";
  const product = marketplaceSeedProducts.find((item) => item.slug === slug) ?? marketplaceSeedProducts[0];

  if (!product) {
    return null;
  }

  const similar = marketplaceSeedProducts.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);
  const title = tr ? product.titleTr ?? product.title : product.title;
  const category = tr ? product.categoryTr ?? product.category : product.category;
  const subcategory = tr ? product.subcategoryTr ?? product.subcategory : product.subcategory;
  const country = tr ? product.countryTr ?? product.country : product.country;
  const description = tr ? product.shortDescriptionTr ?? product.shortDescription : product.shortDescription;
  const supplierType = tr ? product.supplierTypeTr ?? product.supplierType : product.supplierType;
  const specs = tr ? product.specificationsTr ?? product.specifications : product.specifications;
  const applications = tr ? product.applicationsTr ?? product.applications : product.applications;
  const packagingInfo = tr ? product.packagingInfoTr ?? product.packagingInfo : product.packagingInfo;
  const isIWall = product.supplierName === "i-WALL";
  const supplierDisplayName = product.brandName || product.supplierName;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    image: product.galleryImages?.length ? product.galleryImages : [product.mainImage],
    description,
    sku: product.sku,
    brand: product.brandName
      ? {
          "@type": "Brand",
          name: product.brandName
        }
      : undefined,
    manufacturer: product.supplierName
      ? {
          "@type": "Organization",
          name: product.supplierName,
          logo: product.brandLogo
        }
      : undefined,
    category,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: product.priceRange
      },
      availability: "https://schema.org/InStock",
      url: `/${locale}/products/${product.slug}`
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <MarketplaceHeader locale={locale} />
      <main className="bg-white">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff,#fff7ed)] py-10">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="overflow-hidden rounded-md border border-ink/10 bg-cloud">
                <MarketplaceImage src={product.mainImage} alt={product.imageAlt ?? title} visualCategory={product.visualCategory} title={title} className="aspect-[4/3]" fit={product.imageFit} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {product.galleryImages.slice(0, 3).map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-md border border-ink/10 bg-cloud">
                    <MarketplaceImage src={image} alt={`${product.imageAlt ?? title} ${index + 1}`} visualCategory={product.visualCategory} title={title} className="aspect-[4/3]" fit={product.imageFit} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{category} / {subcategory}</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-7 text-steel">{description}</p>
              {product.brandLogo && (
                <div className="mt-5 flex items-center gap-3 rounded-md border border-ink/10 bg-white p-3">
                  <img src={product.brandLogo} alt={`${supplierDisplayName} logo`} className="h-12 w-12 rounded-md object-contain" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-steel">{tr ? "Üretici" : "Manufacturer"}</p>
                    <p className="text-sm font-bold text-ink">{supplierDisplayName} · {country}</p>
                  </div>
                </div>
              )}
              <div className="mt-6 grid gap-3 rounded-md border border-ink/10 bg-white p-4 sm:grid-cols-2">
                <Info label={tr ? "Fiyat" : "Price"} value={product.priceRange} />
                <Info label="MOQ" value={product.moq} />
                <Info label={tr ? "Teslim süresi" : "Lead time"} value={product.leadTime} />
                <Info label={tr ? "Tedarikçi tipi" : "Supplier type"} value={supplierType ?? "Supplier profile"} />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${locale}/rfq/new`}>
                  {tr ? "RFQ oluştur" : "Request quote"}
                  <ArrowRight className="ml-2" size={17} />
                </Button>
                <Button href={`/${locale}/messages`} variant="secondary">
                  <MessageSquareText className="mr-2" size={17} />
                  {tr ? "Tedarikçi ile iletişime geç" : "Contact supplier"}
                </Button>
                <button type="button" className="inline-flex items-center justify-center rounded-md border border-ink/10 px-4 py-3 text-sm font-bold text-ink hover:bg-cloud">
                  <Heart className="mr-2" size={17} />
                  {tr ? "Favori" : "Favorite"}
                </button>
              </div>
              {isIWall && (
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button href={`/${locale}/supplier/i-wall`} variant="secondary">
                    <Store className="mr-2" size={17} />
                    {tr ? "i-WALL showroom" : "i-WALL showroom"}
                  </Button>
                  <Button href={`/${locale}/rfq/new`} variant="secondary">
                    <Download className="mr-2" size={17} />
                    {tr ? "Katalog talep et" : "Request catalog"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.7fr_0.3fr]">
            <div>
              <h2 className="text-2xl font-bold text-ink">{tr ? "Ürün özellikleri" : "Product specifications"}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {Object.entries(specs ?? {}).map(([key, value]) => (
                  <Info key={key} label={key} value={String(value)} />
                ))}
              </div>
              {applications && applications.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-ink">{tr ? "Uygulama alanları" : "Applications"}</h2>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {applications.map((item) => (
                      <p key={item} className="flex items-center gap-2 rounded-md border border-ink/10 bg-white p-3 text-sm font-semibold text-steel">
                        <CheckCircle2 size={16} className="text-copper" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {packagingInfo && (
                <div className="mt-8 rounded-md border border-ink/10 bg-cloud p-5">
                  <PackageCheck className="text-copper" size={22} />
                  <h2 className="mt-3 text-xl font-bold text-ink">{tr ? "Paketleme bilgisi" : "Packaging information"}</h2>
                  <p className="mt-2 text-sm leading-6 text-steel">{packagingInfo}</p>
                </div>
              )}
            </div>
            <aside className="rounded-md border border-ink/10 bg-cloud p-5">
              <h2 className="text-lg font-bold text-ink">{tr ? "Ticaret koşulları" : "Trade terms"}</h2>
              <div className="mt-4 grid gap-2">
                {product.tradeTerms.map((term) => (
                  <p key={term} className="flex items-center gap-2 text-sm font-semibold text-steel">
                    <CheckCircle2 size={16} className="text-copper" />
                    {term}
                  </p>
                ))}
              </div>
              <div className="mt-6 rounded-md bg-white p-4">
                <h3 className="font-bold text-ink">{tr ? "Hızlı RFQ" : "Quick RFQ"}</h3>
                <div className="mt-3 grid gap-2">
                  <input className="h-11 rounded-md border border-ink/10 px-3 text-sm outline-none focus:border-signal" placeholder={tr ? "Ad Soyad" : "Full name"} />
                  <input className="h-11 rounded-md border border-ink/10 px-3 text-sm outline-none focus:border-signal" placeholder={tr ? "E-posta" : "Email"} />
                  <textarea className="min-h-24 rounded-md border border-ink/10 p-3 text-sm outline-none focus:border-signal" placeholder={tr ? "Miktar, ülke ve proje detayları" : "Quantity, destination and project details"} />
                  <Button href={`/${locale}/rfq/new`}>
                    <Send className="mr-2" size={16} />
                    {tr ? "Teklif talebi gönder" : "Send RFQ"}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-cloud py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <h2 className="text-2xl font-bold text-ink">{tr ? "Benzer ürünler" : "Similar products"}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((item) => (
                <ProductCard key={item.slug} product={item} copy={copy} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{label}</p>
      <p className="mt-2 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
