import { notFound } from "next/navigation";
import { CheckCircle2, Factory, PackageSearch } from "lucide-react";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MobileBottomNav } from "@/components/marketplace/mobile-bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";

export default async function IWallSupplierPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const tr = locale === "tr";
  const products = ["i-WALL Marble Look Wall Panel", "i-WALL Wood Texture Panel", "i-WALL 3D Decorative Panel", "i-WALL Custom Pattern Surface"];

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale as Locale} />
      </div>
      <main className="min-h-screen bg-white pb-20 md:pb-0">
        <section className="bg-[linear-gradient(135deg,#0b0b0c,#1f2937)] px-4 py-10 text-white md:px-5">
          <div className="mx-auto max-w-7xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Factory size={28} className="text-signal" />
            </div>
            <h1 className="mt-5 text-3xl font-bold md:text-5xl">i-WALL Surface Systems</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 md:text-lg">
              {tr
                ? "Rootfablink mobil deneyiminde ilk gerçek tedarikçi markası için yapı malzemeleri, duvar paneli numune ve fabrika eşleşme vitrini."
                : "Building materials, wall panel samples and factory matching showcase for the first real supplier brand in the Rootfablink mobile experience."}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-6 md:px-5">
          <div className="grid gap-4 md:grid-cols-4">
            {products.map((product) => (
              <article key={product} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                <div className="aspect-square rounded-xl bg-[linear-gradient(135deg,#fff8f1,#e5edf7)]" />
                <h2 className="mt-4 text-sm font-bold text-ink">{product}</h2>
                <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-steel">
                  <CheckCircle2 size={15} className="text-copper" />
                  {tr ? "Numune ve özel üretim hazırlığı" : "Sample and custom production ready"}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-cloud p-5">
            <PackageSearch className="text-copper" size={24} />
            <h2 className="mt-3 text-xl font-bold text-ink">{tr ? "Tedarikçi profil CTA" : "Supplier profile CTA"}</h2>
            <p className="mt-2 text-sm leading-6 text-steel">
              {tr ? "i-WALL için ürün kataloğu, numune merkezi ve RFQ bağlantısı sonraki backend aşamasına hazırdır." : "Product catalog, sample center and RFQ connection for i-WALL are ready for the next backend phase."}
            </p>
          </div>
        </section>
      </main>
      <div className="md:hidden">
        <MobileBottomNav locale={locale as Locale} active="categories" />
      </div>
      <div className="hidden md:block">
        <SiteFooter locale={locale as Locale} />
      </div>
    </>
  );
}
