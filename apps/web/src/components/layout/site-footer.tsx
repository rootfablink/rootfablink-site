import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { contactEmails } from "@/components/contact/contact-copy";
import { getCorporateCopy } from "@/components/corporate/corporate-copy";
import { dictionaries } from "@/messages";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const corporate = getCorporateCopy(locale);
  const footerRoutes = [
    ["/suppliers", "/rfq", "/trust"],
    ["/suppliers", "/trust", "/help-center"],
    ["/about", "/contact", "/help-center"]
  ];

  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <RootFabLinkWordmark size="large" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-steel">
            {t.footer.text}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-copper">
            <a href={`/${locale}/about`} className="rounded-md border border-signal/20 px-3 py-1.5 hover:bg-cloud">
              {corporate.nav.about}
            </a>
            <a href={`/${locale}/contact`} className="rounded-md border border-signal/20 px-3 py-1.5 hover:bg-cloud">
              {corporate.nav.contact}
            </a>
          </div>
        </div>
        {t.footer.groups.map((group, groupIndex) => (
          <div key={group.title}>
            <p className="font-semibold text-ink">{group.title}</p>
            <div className="mt-3 grid gap-2 text-sm text-steel">
              {group.links.map((link, linkIndex) => (
                <a key={link} href={`/${locale}${footerRoutes[groupIndex]?.[linkIndex] ?? ""}`} className="hover:text-copper">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="font-semibold text-ink">{corporate.nav.contact}</p>
          <div className="mt-3 grid gap-2 text-sm text-steel">
            {(["support", "information", "sales"] as const).map((department) => (
              <a key={department} href={`mailto:${contactEmails[department]}`} className="break-all hover:text-copper">
                {contactEmails[department]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
