import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  FileSearch,
  Globe2,
  LockKeyhole,
  MessageSquareText,
  Network,
  Ship,
  Sparkles,
  TrendingUp
} from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { dictionaries } from "@/messages";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const pillars = [
  {
    icon: FileSearch,
    iconKey: "buyers"
  },
  {
    icon: Boxes,
    iconKey: "suppliers"
  },
  {
    icon: Ship,
    iconKey: "logistics"
  },
  {
    icon: BadgeCheck,
    iconKey: "trust"
  }
];

const flywheelIcons = [FileSearch, BadgeCheck, TrendingUp];

export function HomePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="relative overflow-hidden border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#fff2e5_100%)]">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-signal/25 bg-cloud px-3 py-2 text-sm font-semibold leading-5 text-copper">
                <Globe2 className="shrink-0" size={16} />
                <span className="min-w-0">{t.home.eyebrow}</span>
              </div>
              <h1 className="mt-7 max-w-4xl text-balance text-4xl font-bold leading-[1.04] text-ink xs:text-5xl sm:text-6xl lg:text-7xl">
                {t.home.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-steel sm:text-lg sm:leading-8">{t.home.subhead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/${locale}/auth/register`}>
                  {t.home.primary}
                  <ArrowRight className="ml-2" size={17} />
                </Button>
                <Button href={`/${locale}/dashboard`} variant="secondary">
                  {t.home.secondary}
                </Button>
              </div>
              <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-4">
                {t.home.stats.map(([value, label]) => (
                  <div key={label} className="rounded-md border border-ink/10 bg-white/82 p-4">
                    <p className="text-2xl font-bold text-ink">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.08em] text-steel">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0 rounded-md border border-ink/10 bg-white p-3 shadow-soft sm:p-4">
              <div className="rounded-md bg-ink p-5 text-white">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 font-semibold">{t.home.cockpitTitle}</p>
                  <Sparkles className="shrink-0 text-signal" size={20} />
                </div>
                <div className="mt-6 grid gap-3">
                  {t.home.workflows.map((item, index) => (
                    <div key={item} className="flex items-start justify-between gap-3 rounded-md bg-white/9 px-4 py-3">
                      <span className="min-w-0 text-sm leading-5">{item}</span>
                      <span className="shrink-0 text-xs text-white/62">0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-ink/10 p-4">
                  <LockKeyhole className="text-signal" size={20} />
                  <p className="mt-3 font-semibold text-ink">{t.home.featureCards[0]?.title}</p>
                  <p className="mt-2 text-sm leading-6 text-steel">{t.home.featureCards[0]?.text}</p>
                </div>
                <div className="rounded-md border border-ink/10 p-4">
                  <MessageSquareText className="text-copper" size={20} />
                  <p className="mt-3 font-semibold text-ink">{t.home.featureCards[1]?.title}</p>
                  <p className="mt-2 text-sm leading-6 text-steel">{t.home.featureCards[1]?.text}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ink py-14 text-white sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-9 px-4 sm:px-5 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-signal">
                <Network size={16} />
                {t.home.flywheelEyebrow}
              </div>
              <h2 className="mt-5 max-w-xl text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">{t.home.flywheelTitle}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {t.home.flywheel.map(([title, text], index) => {
                const Icon = flywheelIcons[index] ?? FileSearch;
                return (
                  <article key={title} className="rounded-md border border-white/12 bg-white/8 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-signal text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{t.home.foundationEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">{t.home.foundationTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {t.home.pillars.map((pillar, index) => {
                const Icon = pillars[index]?.icon ?? FileSearch;
                return (
                <article id={pillar.id} key={pillar.title} className="rounded-md border border-ink/10 bg-cloud p-5">
                  <Icon className="text-signal" size={24} />
                  <h3 className="mt-5 text-lg font-bold text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-steel">{pillar.text}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{t.home.proofEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl">{t.home.proofTitle}</h2>
            </div>
            <div className="grid gap-3">
              {t.home.proof.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-ink/10 bg-cloud p-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-signal/10 text-copper">
                    <CheckCircle2 size={17} />
                  </span>
                  <p className="text-sm font-semibold leading-6 text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y border-signal/20 bg-cloud py-14 text-ink sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-copper">{t.home.commercialEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{t.home.commercialTitle}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {t.home.plans.map((plan) => (
                <div key={plan} className="rounded-md border border-signal/20 bg-white p-5">
                  <p className="font-semibold">{plan}</p>
                  <p className="mt-2 text-sm leading-6 text-steel">{t.home.planNote}</p>
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
