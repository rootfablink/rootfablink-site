import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MobileBottomNav } from "@/components/marketplace/mobile-bottom-nav";
import { IWallDraftForm } from "@/components/suppliers/i-wall-draft-form";
import { SiteFooter } from "@/components/layout/site-footer";

export default async function IWallPatternDraftPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <div className="hidden md:block">
        <MarketplaceHeader locale={locale as Locale} />
      </div>
      <main className="min-h-screen bg-cloud px-4 py-6 pb-20 md:px-5 md:pb-10">
        <div className="mx-auto max-w-5xl">
          <IWallDraftForm locale={locale} type="pattern" />
        </div>
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
