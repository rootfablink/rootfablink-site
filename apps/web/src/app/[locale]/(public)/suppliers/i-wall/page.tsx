import { notFound } from "next/navigation";
import { BadgeCheck, CheckCircle2, Factory, FileText, Layers3, MessageSquareText, PackageSearch } from "lucide-react";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MobileBottomNav } from "@/components/marketplace/mobile-bottom-nav";
import { Button } from "@/components/ui/button";

export default async function IWallSupplierPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const products = ["Marble look wall panel", "Wood texture wall panel", "3D decorative panel", "Custom patterned surface"];
  const patterns = ["Stone Surface Collection", "Linear Wood Collection", "Hotel Accent Collection", "Architectural Texture Set"];

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale as Locale} />
      </div>
      <main className="min-h-screen bg-white pb-20 md:pb-0">
        <section className="bg-[linear-gradient(135deg,#0b0b0c,#1f2937)] px-4 py-12 text-white md:px-5 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/82">
                <BadgeCheck size={16} className="text-signal" />
                Verification-ready supplier profile
              </div>
              <h1 className="mt-5 text-3xl font-bold md:text-5xl">i-WALL</h1>
              <p className="mt-3 text-lg font-semibold text-white/88">Decorative wall systems and patterned interior surface solutions</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 md:text-lg">
                i-WALL provides decorative wall systems, patterned wall panels and interior surface design solutions for residential, commercial, hotel, office and architectural projects.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
                {["Türkiye", "Manufacturer", "Design Brand", "Wall Panels"].map((item) => (
                  <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-white/86">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${locale}/auth/register`}>Contact Supplier</Button>
                <Button href={`/${locale}/rfq`} variant="secondary">Request Quotation</Button>
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-white/8 p-5">
              <Factory size={30} className="text-signal" />
              <h2 className="mt-4 text-xl font-bold">Supplier capability snapshot</h2>
              <div className="mt-4 grid gap-3 text-sm">
                {["Decorative wall systems", "Patterned wall panels", "Interior surface design", "Residential and commercial projects"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-white/78">
                    <CheckCircle2 size={16} className="text-signal" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Country", "Türkiye"],
              ["Business type", "Manufacturer / Supplier / Design Brand"],
              ["Main category", "Building Materials / Interior Decoration / Wall Panels"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-ink/10 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{label}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <section>
              <div className="flex items-center gap-2">
                <PackageSearch size={22} className="text-copper" />
                <h2 className="text-2xl font-bold text-ink">Product catalog preview</h2>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {products.map((product) => (
                  <article key={product} className="rounded-md border border-ink/10 bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                    <div className="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#fff8f1,#e5edf7)]" />
                    <h3 className="mt-4 text-sm font-bold text-ink">{product}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-steel">
                      <CheckCircle2 size={15} className="text-copper" />
                      Sample and custom production ready
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-4">
                <Button href={`/${locale}/suppliers/i-wall/products/new`} variant="secondary">Add first product</Button>
              </div>
            </section>

            <section className="rounded-md border border-ink/10 bg-cloud p-5">
              <div className="flex items-center gap-2">
                <Layers3 size={22} className="text-copper" />
                <h2 className="text-2xl font-bold text-ink">Pattern collections</h2>
              </div>
              <div className="mt-4 grid gap-3">
                {patterns.map((pattern) => (
                  <div key={pattern} className="rounded-md bg-white p-4">
                    <p className="font-bold text-ink">{pattern}</p>
                    <p className="mt-1 text-sm leading-6 text-steel">Prepared for pattern image, material options and recommended usage areas.</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button href={`/${locale}/suppliers/i-wall/patterns/new`} variant="secondary">Add pattern collection</Button>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-4 rounded-md bg-ink p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-signal" />
                <h2 className="text-xl font-bold">RFQ and supplier contact workspace</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/68">Buyers can request quotations for wall panels, decorative surface systems, custom patterns and project-based interior applications.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href={`/${locale}/auth/register`} variant="secondary">
                <MessageSquareText size={16} />
                <span className="ml-2">Contact Supplier</span>
              </Button>
              <Button href={`/${locale}/rfq`}>Request Quotation</Button>
            </div>
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
