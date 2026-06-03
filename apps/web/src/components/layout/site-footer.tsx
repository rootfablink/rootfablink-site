import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { dictionaries } from "@/messages";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-5 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <RootFabLinkWordmark size="large" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-steel">
            {t.footer.text}
          </p>
        </div>
        {t.footer.groups.map((group) => (
          <div key={group.title}>
            <p className="font-semibold text-ink">{group.title}</p>
            <div className="mt-3 grid gap-2 text-sm text-steel">
              {group.links.map((link) => (
                <a key={link} href={`/${locale}`}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
