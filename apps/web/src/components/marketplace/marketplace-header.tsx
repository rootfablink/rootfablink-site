"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Camera, ChevronDown, Globe2, Heart, MapPin, PackageSearch, Search, UserRound } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { RootFabLinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { cn } from "@/lib/utils";
import type { CountryCode, LocalizationPreference } from "./localization-preferences";
import { countryFromLocale, detectCountryFromBrowser, preferenceFromCountry, readStoredPreference, replaceLocaleInPath, writeStoredPreference } from "./localization-preferences";
import { getMarketplaceCopy } from "./marketplace-copy";
import {
  CategoryMegaMenu,
  CenterMenu,
  DeliverySelector,
  LanguageCurrencySelector,
  SignInDropdown,
  TradeProtectionMenu,
  VerifiedManufacturersMenu
} from "./marketplace-panels";

type OpenPanel = "categories" | "verified" | "protection" | "buyer" | "supplier" | "delivery" | "language" | "signin" | null;

export function MarketplaceHeader({ locale, onOpenLens }: { locale: Locale; onOpenLens?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [preference, setPreference] = useState<LocalizationPreference>(() => preferenceFromCountry(countryFromLocale(locale), false));
  const copy = getMarketplaceCopy(preference.language);
  const [activeTab, setActiveTab] = useState(copy.header.products);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  useEffect(() => {
    const stored = readStoredPreference();
    const initialPreference = stored ?? preferenceFromCountry(detectCountryFromBrowser(), false);
    setPreference(initialPreference);

    const shouldApplyStoredPreference = stored?.manuallySelected && initialPreference.language !== locale;
    const shouldApplyBrowserDefault = !stored && locale === "en" && initialPreference.language !== locale;

    if (shouldApplyStoredPreference || shouldApplyBrowserDefault) {
      router.replace(replaceLocaleInPath(pathname, initialPreference.language));
    }
  }, [locale, pathname, router]);

  useEffect(() => {
    setActiveTab(copy.header.products);
  }, [copy.header.products]);

  const toggle = (panel: OpenPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const handleCountryChange = (country: CountryCode) => {
    setPreference(preferenceFromCountry(country, true));
  };

  const savePreference = () => {
    const nextPreference = { ...preference, manuallySelected: true };
    writeStoredPreference(nextPreference);
    setOpenPanel(null);

    if (nextPreference.language !== locale) {
      router.push(replaceLocaleInPath(pathname, nextPreference.language));
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/96 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="shrink-0">
            <RootFabLinkWordmark size="compact" />
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-semibold text-ink lg:flex">
            <HeaderButton label={copy.header.categories} open={openPanel === "categories"} onClick={() => toggle("categories")} />
            <HeaderButton label={copy.header.verified} open={openPanel === "verified"} onClick={() => toggle("verified")} />
            <HeaderButton label={copy.header.protection} open={openPanel === "protection"} onClick={() => toggle("protection")} />
            <HeaderButton label={copy.header.buyerCenter} open={openPanel === "buyer"} onClick={() => toggle("buyer")} />
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <SmallPanelButton icon={<MapPin size={16} />} label={copy.header.delivery} value={`${preference.country} · ${preference.currency}`} onClick={() => toggle("delivery")} />
            <SmallPanelButton icon={<Globe2 size={16} />} label={copy.header.languageCurrency} onClick={() => toggle("language")} />
            <Link href={`/${locale}/inquiry-basket`} className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 text-ink hover:border-signal/35 hover:bg-cloud" aria-label={copy.header.basket}>
              <Heart size={17} />
            </Link>
            <button type="button" onClick={() => toggle("signin")} className="flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-sm font-semibold text-ink hover:border-signal/35 hover:bg-cloud">
              <UserRound size={16} />
              {copy.header.signIn}
            </button>
            <Link href={`/${locale}/auth/register`} className="hidden rounded-md bg-signal px-4 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper xl:inline-flex">
              {copy.header.createAccount}
            </Link>
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="rounded-md border border-ink/12 bg-white p-1.5 shadow-[0_8px_22px_rgba(11,11,12,0.05)]">
            <div className="flex gap-1 px-1 pb-1">
              {[copy.header.products, copy.header.manufacturers, copy.header.rfq].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em]",
                    activeTab === tab ? "bg-ink text-white" : "text-steel hover:bg-cloud hover:text-ink"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Search className="ml-2 shrink-0 text-steel" size={19} />
              <input className="h-11 min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-steel" placeholder={copy.header.search} />
              <button type="button" onClick={onOpenLens} className="hidden items-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold text-ink hover:border-signal/35 hover:bg-cloud sm:inline-flex">
                <Camera size={17} />
                {copy.header.lens}
              </button>
              <button type="button" className="rounded-md bg-signal px-4 py-2.5 text-sm font-bold text-white hover:bg-copper">
                {copy.header.products === "Products" ? "Search" : "Ara"}
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            <HeaderButton label={copy.header.categories} open={openPanel === "categories"} onClick={() => toggle("categories")} compact />
            <HeaderButton label={copy.header.verified} open={openPanel === "verified"} onClick={() => toggle("verified")} compact />
            <HeaderButton label={copy.header.protection} open={openPanel === "protection"} onClick={() => toggle("protection")} compact />
            <button type="button" onClick={() => toggle("signin")} className="shrink-0 rounded-md border border-ink/10 px-3 py-2 text-sm font-semibold text-ink">
              {copy.header.signIn}
            </button>
          </div>

          <div className="hidden min-w-max flex-col items-end gap-2 text-sm font-semibold text-ink lg:flex">
            <Link href={`/${locale}/supplier/onboarding`} className="inline-flex items-center gap-2 rounded-md border border-signal/25 px-3 py-2 text-copper hover:bg-cloud">
              <PackageSearch size={16} />
              {copy.header.supplierOnboarding}
            </Link>
            <button type="button" onClick={() => toggle("supplier")} className="text-xs font-bold uppercase tracking-[0.1em] text-steel hover:text-ink">
              {copy.header.supplierCenter}
            </button>
          </div>
        </div>
      </div>

      {openPanel && (
        <div className="border-t border-ink/10 bg-white shadow-soft">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-5">
            {openPanel === "categories" && <CategoryMegaMenu copy={copy} locale={locale} />}
            {openPanel === "verified" && <VerifiedManufacturersMenu copy={copy} locale={locale} />}
            {openPanel === "protection" && <TradeProtectionMenu copy={copy} locale={locale} />}
            {openPanel === "buyer" && <CenterMenu items={copy.buyerCenter} locale={locale} />}
            {openPanel === "supplier" && <CenterMenu items={copy.supplierCenter} locale={locale} supplier />}
            {openPanel === "delivery" && <DeliverySelector copy={copy} preference={preference} onCountryChange={handleCountryChange} onSave={savePreference} />}
            {openPanel === "language" && <LanguageCurrencySelector copy={copy} preference={preference} onChange={setPreference} onSave={savePreference} />}
            {openPanel === "signin" && <SignInDropdown copy={copy} locale={locale} />}
          </div>
        </div>
      )}
    </header>
  );
}

function HeaderButton({ label, open, onClick, compact = false }: { label: string; open: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-3 py-2 font-semibold hover:bg-cloud hover:text-ink",
        compact ? "border border-ink/10 text-sm text-ink" : "text-sm text-ink",
        open && "bg-cloud text-copper"
      )}
    >
      {label}
      <ChevronDown size={14} />
    </button>
  );
}

function SmallPanelButton({ icon, label, value, onClick }: { icon: ReactNode; label: string; value?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-10 items-center gap-2 rounded-md border border-ink/10 px-3 text-left text-xs font-semibold text-ink hover:border-signal/35 hover:bg-cloud">
      {icon}
      <span className="grid leading-4">
        <span className="text-[10px] uppercase tracking-[0.08em] text-steel">{label}</span>
        {value && <span>{value}</span>}
      </span>
    </button>
  );
}
