"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Camera, Check, ChevronDown, Globe2, Search, UserRound } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { RootfablinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { cn } from "@/lib/utils";
import type { LocalizationPreference } from "./localization-preferences";
import { languageOptions, preferenceFromLanguage, readStoredPreference, replaceLocaleInPath, writeStoredPreference } from "./localization-preferences";
import { getMarketplaceCopy } from "./marketplace-copy";
import { CategoryMegaMenu, CenterMenu, SignInDropdown, TradeProtectionMenu, VerifiedManufacturersMenu } from "./marketplace-panels";

type OpenPanel = "categories" | "verified" | "protection" | "buyer" | "supplier" | "language" | "signin" | null;

export function MarketplaceHeader({ locale, onOpenLens }: { locale: Locale; onOpenLens?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const [preference, setPreference] = useState<LocalizationPreference>(() => preferenceFromLanguage(locale, false));
  const copy = getMarketplaceCopy(locale);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const primaryNavItems = [
    { label: copy.header.manufacturers, href: `/${locale}/manufacturers` },
    { label: copy.header.products, href: `/${locale}/products` },
    { label: copy.header.customs, href: `/${locale}/customs` },
    { label: copy.header.logistics, href: `/${locale}/logistics` }
  ];

  const isPrimaryActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const stored = readStoredPreference();
    const initialPreference = stored ?? preferenceFromLanguage(locale, false);
    setPreference(initialPreference);
  }, [locale]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const toggle = (panel: OpenPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const handleLanguageSelect = (language: Locale) => {
    const nextPreference = preferenceFromLanguage(language, true);
    setPreference(nextPreference);
    writeStoredPreference(nextPreference);
    setOpenPanel(null);

    if (nextPreference.language !== locale) {
      router.push(replaceLocaleInPath(pathname, nextPreference.language));
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-ink/10 bg-white/96 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="min-w-0 shrink overflow-hidden lg:shrink-0">
            <RootfablinkWordmark size="compact" className="text-[22px] font-semibold [--rfl-scale:1] [--rfl-tracking:0.035em] sm:text-[23px]" />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold text-ink lg:flex" aria-label={locale === "tr" ? "Ana pazar navigasyonu" : "Main marketplace navigation"}>
            {primaryNavItems.map((item) => {
              const active = isPrimaryActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md border-b-2 px-3 py-2 font-bold transition hover:bg-cloud hover:text-ink",
                    active ? "border-signal text-copper" : "border-transparent text-steel"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <button
                type="button"
                onClick={() => toggle("language")}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-semibold text-ink hover:border-signal/35 hover:bg-cloud",
                  openPanel === "language" && "border-signal/35 bg-cloud text-copper"
                )}
              >
                <Globe2 size={18} className="text-copper" strokeWidth={2.2} />
                {copy.header.languageCurrency}
                <ChevronDown size={14} />
              </button>
              {openPanel === "language" && <LanguageDropdown current={preference.language} onSelect={handleLanguageSelect} />}
            </div>
            <button type="button" onClick={() => toggle("signin")} className="flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-semibold text-ink hover:border-signal/35 hover:bg-cloud">
              <UserRound size={16} />
              {copy.header.signIn}
            </button>
            <Link href={`/${locale}/auth/register?type=supplier`} className="inline-flex rounded-md bg-signal px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
              {copy.header.createAccount}
            </Link>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <button type="button" onClick={() => toggle("language")} aria-label={copy.header.languageCurrency} className={cn("flex h-9 w-9 items-center justify-center rounded-md border border-signal/20 bg-cloud text-copper", openPanel === "language" && "border-signal/45")}>
              <Globe2 size={18} strokeWidth={2.2} />
            </button>
            <Link href={`/${locale}/auth/login`} aria-label={copy.header.signIn} className="flex h-9 items-center justify-center rounded-md px-1.5 text-[11px] font-bold whitespace-nowrap text-ink hover:bg-cloud xs:px-2 xs:text-xs">
              {copy.header.signIn}
            </Link>
            <Link href={`/${locale}/auth/register?type=supplier`} className="flex h-9 items-center rounded-md bg-signal px-2 text-[11px] font-bold whitespace-nowrap text-white xs:px-2.5 xs:text-xs">
              {copy.header.createAccount}
            </Link>
          </div>
        </div>

        <div className="mt-2">
          <div className="rounded-md border border-ink/12 bg-white p-1.5 shadow-[0_8px_22px_rgba(11,11,12,0.05)]">
            <div className="flex gap-1 overflow-x-auto px-1 pb-1">
              {primaryNavItems.map((item) => {
                const active = isPrimaryActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em]",
                      active ? "bg-ink text-white" : "text-steel hover:bg-cloud hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <Search className="ml-2 shrink-0 text-steel" size={19} />
              <input className="h-11 min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-steel" placeholder={copy.header.search} />
              <button type="button" onClick={onOpenLens} className="hidden items-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold text-ink hover:border-signal/35 hover:bg-cloud sm:inline-flex">
                <Camera size={17} />
                {copy.header.lens}
              </button>
              <button type="button" className="rounded-md bg-signal px-4 py-2.5 text-sm font-bold text-white hover:bg-copper">
                {copy.header.searchButton}
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label={locale === "tr" ? "Ana pazar navigasyonu" : "Main marketplace navigation"}>
            {primaryNavItems.map((item) => {
              const active = isPrimaryActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex shrink-0 items-center rounded-md border px-3 py-2 text-sm font-bold whitespace-nowrap",
                    active ? "border-signal/35 bg-cloud text-copper" : "border-ink/10 text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {openPanel && openPanel !== "language" && (
        <div className="border-t border-ink/10 bg-white shadow-soft">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5">
            {openPanel === "categories" && <CategoryMegaMenu copy={copy} locale={locale} />}
            {openPanel === "verified" && <VerifiedManufacturersMenu copy={copy} locale={locale} />}
            {openPanel === "protection" && <TradeProtectionMenu copy={copy} locale={locale} />}
            {openPanel === "buyer" && <CenterMenu items={copy.buyerCenter} locale={locale} />}
            {openPanel === "supplier" && <CenterMenu items={copy.supplierCenter} locale={locale} supplier />}
            {openPanel === "signin" && <SignInDropdown copy={copy} locale={locale} />}
          </div>
        </div>
      )}

      {openPanel === "language" && (
        <div className="fixed inset-x-3 top-14 z-[70] lg:hidden">
          <div className="mx-auto max-w-7xl">
            <LanguageDropdown current={preference.language} onSelect={handleLanguageSelect} mobile />
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageDropdown({ current, onSelect, mobile = false }: { current: Locale; onSelect: (language: Locale) => void; mobile?: boolean }) {
  return (
    <div className={cn("rounded-md border border-ink/10 bg-white p-1.5 shadow-[0_18px_42px_rgba(11,11,12,0.18)]", mobile ? "max-h-[min(72vh,30rem)] w-full overflow-y-auto" : "absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(72vh,30rem)] w-52 overflow-y-auto")}>
      {languageOptions.map((option) => {
        const active = option.code === current;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onSelect(option.code)}
            className={cn("flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-ink hover:bg-cloud", active && "bg-cloud text-copper")}
          >
            <span>{option.label}</span>
            {active && <Check size={15} />}
          </button>
        );
      })}
    </div>
  );
}
