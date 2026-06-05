import { Building2, ChevronRight, CircleHelp, Globe2, Headphones, Info, Mail, Megaphone, ShieldCheck, Truck, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "@rootfablink/i18n";
import { ContactForm } from "@/components/contact/contact-form";
import { contactDepartmentOrder, contactEmails, type ContactDepartmentKey } from "@/components/contact/contact-copy";
import { SiteFooter } from "@/components/layout/site-footer";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { createSeoMetadata } from "@/lib/seo";
import { getCorporateCopy } from "./corporate-copy";

const departmentIcons: Record<ContactDepartmentKey, typeof Headphones> = {
  support: Headphones,
  information: Info,
  sales: Megaphone,
  logistics: Truck,
  customs: ShieldCheck
};

export function corporateMetadata(locale: Locale, page: "about" | "contact" | "help-center"): Metadata {
  const copy = getCorporateCopy(locale);
  const metadata = {
    about: {
      title: locale === "tr" ? "Hakkımızda | RootFabLink" : "About Us | RootFabLink",
      description: copy.about.intro[0]
    },
    contact: {
      title: locale === "tr" ? "İletişim | RootFabLink" : "Contact | RootFabLink",
      description:
        locale === "tr"
          ? "RootFabLink destek, satış, lojistik, gümrük ve genel bilgi iletişim kanalları."
          : "Contact RootFabLink for support, sales, logistics, customs and general information."
    },
    "help-center": {
      title: locale === "tr" ? "Yardım Merkezi | RootFabLink" : "Help Center | RootFabLink",
      description: copy.help.subtitle
    }
  }[page] ?? {
    title: "RootFabLink",
    description: copy.about.intro[0] ?? "RootFabLink global B2B marketplace infrastructure."
  };

  return createSeoMetadata(
    locale,
    `/${page}`,
    metadata.title ?? "RootFabLink",
    metadata.description ?? "RootFabLink global B2B marketplace infrastructure.",
    ["RootFabLink", page, "B2B marketplace"]
  );
}

export function CorporateContactPage({ locale }: { locale: Locale }) {
  const copy = getCorporateCopy(locale);

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="bg-white">
        <CorporateHero eyebrow={copy.nav.contact} title={copy.contact.title} subtitle={copy.contact.subtitle} icon={Mail} />
        <section className="bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {contactDepartmentOrder.map((department) => {
                const Icon = departmentIcons[department];
                const [title, description] = copy.contact.cards[department];
                const email = contactEmails[department];

                return (
                  <article key={department} className="group flex h-full flex-col rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)] transition hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-soft">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-copper">
                      <Icon size={20} />
                    </span>
                    <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-steel">{description}</p>
                    <a href={`mailto:${email}`} className="mt-5 inline-flex items-center justify-between gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-bold text-ink transition group-hover:border-signal/30 group-hover:text-copper">
                      <span className="break-all">{email}</span>
                      <ChevronRight className="shrink-0" size={15} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="border-t border-ink/10 bg-cloud py-12 sm:py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-5">
            <ContactForm locale={locale} />
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

export function CorporateAboutPage({ locale }: { locale: Locale }) {
  const copy = getCorporateCopy(locale);

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="bg-white">
        <CorporateHero eyebrow={copy.nav.company} title={copy.about.title} subtitle={copy.about.intro[0] ?? copy.about.mission} icon={Building2} />
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-md border border-ink/10 bg-cloud p-6">
              <Globe2 className="text-copper" size={24} />
              <h2 className="mt-5 text-2xl font-bold text-ink">{copy.about.missionTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-steel">{copy.about.mission}</p>
              <p className="mt-4 text-sm leading-7 text-steel">{copy.about.intro[1]}</p>
            </article>
            <div>
              <div className="flex items-center gap-3">
                <UsersRound className="text-copper" size={24} />
                <h2 className="text-2xl font-bold text-ink">{copy.about.audienceTitle}</h2>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {copy.about.audiences.map(([title, description]) => (
                  <article key={title} className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
                    <h3 className="font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-ink/10 bg-ink py-12 text-white sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-5 md:grid-cols-2">
            <article className="rounded-md border border-white/12 bg-white/6 p-6">
              <ShieldCheck className="text-signal" size={24} />
              <h2 className="mt-5 text-xl font-bold">{copy.about.trustTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">{copy.about.trust}</p>
            </article>
            <article className="rounded-md border border-white/12 bg-white/6 p-6">
              <Globe2 className="text-signal" size={24} />
              <h2 className="mt-5 text-xl font-bold">{copy.about.visionTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-white/72">{copy.about.vision}</p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

export function CorporateHelpPage({ locale }: { locale: Locale }) {
  const copy = getCorporateCopy(locale);

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="bg-white">
        <CorporateHero eyebrow={copy.nav.help} title={copy.help.title} subtitle={copy.help.subtitle} icon={CircleHelp} />
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-5">
            {copy.help.groups.map(([group, question, answer]) => (
              <details key={question} className="group rounded-md border border-ink/10 bg-white p-5 shadow-[0_8px_22px_rgba(11,11,12,0.04)] open:border-signal/30">
                <summary className="cursor-pointer list-none">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">{group}</p>
                  <h2 className="mt-2 font-bold text-ink">{question}</h2>
                </summary>
                <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-7 text-steel">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function CorporateHero({
  eyebrow,
  title,
  subtitle,
  icon: Icon
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: typeof Mail;
}) {
  return (
    <section className="border-b border-ink/10 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_58%,#fff2e5_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-md border border-signal/25 bg-white px-3 py-2 text-sm font-bold text-copper shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
          <Icon size={16} />
          {eyebrow}
        </div>
        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-steel sm:text-lg sm:leading-8">{subtitle}</p>
      </div>
    </section>
  );
}
