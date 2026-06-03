"use client";

import Link from "next/link";
import { ArrowUp, Camera, CircleHelp, FileText, MessageSquareText } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import type { MarketplaceCopy } from "./marketplace-copy";

export function FloatingActionBar({
  copy,
  locale,
  onOpenLens,
  onOpenRfq
}: {
  copy: MarketplaceCopy;
  locale: Locale;
  onOpenLens: () => void;
  onOpenRfq: () => void;
}) {
  const actions = [
    { label: copy.quick.messages, icon: MessageSquareText, href: `/${locale}/messages` },
    { label: copy.quick.lens, icon: Camera, onClick: onOpenLens },
    { label: copy.quick.rfq, icon: FileText, onClick: onOpenRfq },
    { label: copy.quick.help, icon: CircleHelp, href: `/${locale}/help-center` }
  ];

  return (
    <>
      <div className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-md border border-ink/10 bg-white shadow-soft lg:block">
        {actions.map((action) => {
          const Icon = action.icon;
          const className = "flex h-12 w-12 items-center justify-center border-b border-ink/10 text-ink hover:bg-cloud";
          if (action.href) {
            return (
              <Link key={action.label} href={action.href} className={className} aria-label={action.label} title={action.label}>
                <Icon size={19} />
              </Link>
            );
          }
          return (
            <button key={action.label} type="button" onClick={action.onClick} className={className} aria-label={action.label} title={action.label}>
              <Icon size={19} />
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-12 w-12 items-center justify-center text-ink hover:bg-cloud"
          aria-label={copy.quick.top}
          title={copy.quick.top}
        >
          <ArrowUp size={19} />
        </button>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-md border border-ink/10 bg-white shadow-soft lg:hidden">
        {actions.map((action) => {
          const Icon = action.icon;
          const className = "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-bold text-ink";
          if (action.href) {
            return (
              <Link key={action.label} href={action.href} className={className}>
                <Icon size={17} />
                <span className="max-w-full truncate px-1">{action.label}</span>
              </Link>
            );
          }
          return (
            <button key={action.label} type="button" onClick={action.onClick} className={className}>
              <Icon size={17} />
              <span className="max-w-full truncate px-1">{action.label}</span>
            </button>
          );
        })}
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-bold text-ink">
          <ArrowUp size={17} />
          <span className="max-w-full truncate px-1">{copy.quick.top}</span>
        </button>
      </div>
    </>
  );
}
