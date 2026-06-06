import { Building2, ChevronRight, Globe2, Headphones, Info, Mail, Megaphone, ShieldCheck, Ship, Truck } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "@rootfablink/i18n";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { createSeoMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";
import { contactCopy, contactDepartmentOrder, contactEmails, type ContactDepartmentKey } from "./contact-copy";

const departmentIcons: Record<ContactDepartmentKey, typeof Headphones> = {
  support: Headphones,
  information: Info,
  sales: Megaphone,
  logistics: Truck,
  customs: ShieldCheck
};

export function contactMetadata(locale: Locale): Metadata {
  const copy = contactCopy[locale];
  return createSeoMetadata(locale, "/contact", `${copy.title} | Rootfablink`, copy.subtitle, ["Rootfablink contact", "B2B platform support", "logistics contact", "customs support"]);
}

export function companyMetadata(locale: Locale): Metadata {
  const copy = contactCopy[locale];
  return createSeoMetadata(locale, "/company", `${copy.company.title} | Rootfablink`, copy.company.subtitle, ["Rootfablink company", "global B2B platform", "manufacturing sourcing platform"]);
}

export function ContactCenterPage({ locale, variant = "contact" }: { locale: Locale; variant?: "contact" | "company" }) {
  const copy = contactCopy[locale];
  const isCompany = variant === "company";
  const platformScope = copy.company.details[1]?.[1] ?? copy.company.subtitle;

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="bg-white">
        <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#fff2e5_100%)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-5 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-signal/25 bg-white px-3 py-2 text-sm font-bold text-copper shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                <Mail size={16} />
                {copy.heroEyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-5xl">{isCompany ? copy.company.title : copy.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-steel sm:text-lg sm:leading-8">{isCompany ? copy.company.subtitle : copy.subtitle}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#contact-form" className="inline-flex h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(249,115,22,0.22)] hover:bg-copper">
                  {copy.form.submit}
                </a>
                <a href={`/${locale}/company`} className="inline-flex h-11 items-center justify-center rounded-md border border-ink/12 px-5 text-sm font-bold text-ink hover:border-signal/30 hover:bg-cloud">
                  {copy.companyNavLabel}
                </a>
              </div>
            </div>

            <div className="rounded-md border border-ink/10 bg-white p-5 shadow-soft">
              <RootFabLinkWordmark size="large" />
              <p className="mt-4 text-sm leading-6 text-steel">{copy.responseNote}</p>
              <div className="mt-5 grid gap-3">
                {copy.company.details.map(([label, value]) => (
                  <div key={label} className="rounded-md border border-ink/8 bg-cloud p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {contactDepartmentOrder.map((department) => {
                const Icon = departmentIcons[department];
                const [title, description] = copy.cards[department];
                const email = contactEmails[department];

                return (
                  <article key={department} className="group flex h-full flex-col rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)] transition hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-soft">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-copper">
                      <Icon size={20} />
                    </span>
                    <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-steel">{description}</p>
                    <a href={`mailto:${email}`} className="mt-5 inline-flex items-center justify-between gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-bold text-ink transition group-hover:border-signal/30 group-hover:text-copper">
                      <span className="truncate">{email}</span>
                      <ChevronRight size={15} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact-form" className="border-t border-ink/10 bg-cloud py-12 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-5 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-md border border-ink/10 bg-ink p-6 text-white shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-signal">
                <Building2 size={22} />
              </div>
              <h2 className="mt-5 text-2xl font-bold">{copy.company.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/72">{copy.company.subtitle}</p>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-start gap-3 rounded-md bg-white/6 p-3">
                  <Globe2 className="mt-0.5 shrink-0 text-signal" size={18} />
                  <a href="https://rootfablink.com" className="font-semibold text-white hover:text-signal">
                    https://rootfablink.com
                  </a>
                </div>
                <div className="flex items-start gap-3 rounded-md bg-white/6 p-3">
                  <Ship className="mt-0.5 shrink-0 text-signal" size={18} />
                  <p className="font-semibold text-white">{platformScope}</p>
                </div>
              </div>
            </aside>
            <ContactForm locale={locale} />
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
