import { ArrowRight, CheckCircle2, Factory, FileText, Globe2, ShieldCheck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { dictionaries } from "@/messages";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { Button } from "@/components/ui/button";

type PageKey = keyof typeof dictionaries.en.pages;

const pageIcons: Record<PageKey, React.ComponentType<{ className?: string; size?: number }>> = {
  buyers: Globe2,
  suppliers: Factory,
  logistics: ArrowRight,
  trust: ShieldCheck,
  rfq: FileText,
  pricing: CheckCircle2
};

export function PublicInfoPage({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const t = dictionaries[locale];
  const page = t.pages[pageKey];
  const HeroIcon = pageIcons[pageKey];

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main>
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_55%,#fff2e5_100%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 lg:grid-cols-[0.9fr_1.1fr] lg:py-18">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-signal/25 bg-cloud px-3 py-2 text-sm font-semibold text-copper">
                <HeroIcon size={16} />
                {page.eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-5xl">{page.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-steel sm:text-lg sm:leading-8">{page.intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${locale}/auth/register`}>
                  {page.primary}
                  <ArrowRight className="ml-2" size={17} />
                </Button>
                <Button href={`/${locale}/dashboard`} variant="secondary">
                  {page.secondary}
                </Button>
              </div>
            </div>
            <div className="grid gap-3">
              {page.highlights.map(([title, text]) => (
                <article key={title} className="rounded-md border border-ink/10 bg-white p-5 shadow-soft">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-signal/10 text-copper">
                      <CheckCircle2 size={17} />
                    </span>
                    <div>
                      <h2 className="font-bold text-ink">{title}</h2>
                      <p className="mt-2 text-sm leading-6 text-steel">{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">ROOTFABLINK</p>
              <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{page.stepsTitle}</h2>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-5">
              {page.steps.map((step, index) => (
                <div key={step} className="rounded-md border border-ink/10 bg-cloud p-4">
                  <p className="text-xs font-bold text-copper">0{index + 1}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
