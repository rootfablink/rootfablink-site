"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, Box, Car, CheckCircle2, ChevronRight, Clock, CreditCard, Footprints, Grid2X2, Heart, Laptop, MapPin, MessageSquareText, PackageSearch, PanelsTopLeft, Phone, ReceiptText, Shirt, ShieldCheck, ShoppingBasket, Smartphone, Sparkles, SunMedium, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { RootfablinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { categoriesForGroup, categoryGroups, categoryLocale, categoryPath, getGroupBySlug, groupPath, type MarketplaceCategory } from "@/data/categories";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { getMobileMarketplaceCopy, mobileMessages, mobileSeedProducts } from "./mobile-marketplace-copy";

export function MobileCategoriesPage({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);
  translateCategory("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = categoryLocale(locale);
  const selectedGroup = getGroupBySlug(locale, searchParams.get("group"));
  const visibleCategories = categoriesForGroup(selectedGroup.id);

  return (
    <MobilePageShell locale={locale} active="categories" title={copy.pages.categories}>
      <div className="grid min-h-[calc(100vh-9rem)] grid-cols-[7.5rem_1fr] gap-3">
        <aside className="overflow-y-auto rounded-2xl bg-white p-2">
          {categoryGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={selectedGroup.id === group.id}
              onClick={() => router.replace(groupPath(locale, group), { scroll: false })}
              className={`mb-1 w-full rounded-xl px-2 py-3 text-left text-xs font-bold leading-4 transition ${selectedGroup.id === group.id ? "bg-cloud text-copper" : "text-steel hover:bg-cloud"}`}
            >
              {group.name[language]}
            </button>
          ))}
        </aside>
        <section className="overflow-y-auto rounded-2xl bg-white p-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-ink">{selectedGroup.name[language]}</h2>
            <span className="rounded-full bg-cloud px-2 py-1 text-[10px] font-bold text-steel">{visibleCategories.length}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {visibleCategories.map((category) => {
              const Icon = iconForCategory(category);
              return (
              <Link key={category.id} href={categoryPath(locale, category)} aria-label={category.name[language]} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff8f1,#e5edf7)]">
                  <Icon size={20} className="text-copper" />
                </span>
                <span className="mt-2 block text-[11px] font-semibold leading-4 text-ink">{category.name[language]}</span>
              </Link>
              );
            })}
          </div>
        </section>
      </div>
    </MobilePageShell>
  );
}

export function MobileMessagesPage({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);
  const tabs = locale === "tr" ? ["Siparişler", "Bildirimler", "Diğerleri"] : ["Orders", "Notifications", "Others"];
  const filters = locale === "tr" ? ["Okunmamış", "Sipariş verildi", "Mesaj listesi"] : ["Unread", "Order placed", "Message list"];

  return (
    <MobilePageShell locale={locale} active="messages" title={copy.pages.messages}>
      <div className="rounded-2xl bg-cloud p-3 text-sm font-semibold leading-6 text-ink">
        <Bell size={18} className="mb-2 text-copper" />
        {copy.pages.signInRequired}
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button key={tab} type="button" className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${index === 1 ? "bg-ink text-white" : "bg-white text-ink"}`}>
            {tab}
          </button>
        ))}
      </div>
      <input className="mt-4 h-12 w-full rounded-2xl border border-ink/10 px-4 text-sm font-semibold outline-none" placeholder={locale === "tr" ? "Mesaj veya tedarikçi ara" : "Search messages or suppliers"} />
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <span key={filter} className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-steel">{filter}</span>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {mobileMessages.map((message) => (
          <article key={message.sender} className="rounded-2xl bg-white p-4 shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                <MessageSquareText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="truncate text-sm font-bold text-ink">{message.sender}</h2>
                  {message.unread > 0 && <span className="rounded-full bg-signal px-2 py-0.5 text-[10px] font-bold text-white">{message.unread}</span>}
                </div>
                <p className="mt-1 text-xs font-semibold leading-5 text-steel">{locale === "tr" ? message.subjectTr ?? message.subject : message.subject}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MobilePageShell>
  );
}

export function MobileInquiryBasketPage({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);
  const protection = locale === "tr" ? ["Güvenli işlem hazırlığı", "Teslimat desteği", "Para iadesi süreci hazırlığı", "7/24 destek hazırlığı"] : ["Secure transaction preparation", "Delivery support", "Refund process preparation", "24/7 support preparation"];

  return (
    <MobilePageShell locale={locale} active="basket" title={copy.pages.basket}>
      <section className="rounded-2xl bg-white p-5 text-center shadow-[0_8px_22px_rgba(11,11,12,0.04)]">
        <ShoppingBasket className="mx-auto text-copper" size={34} />
        <h2 className="mt-4 text-xl font-bold text-ink">{copy.pages.emptyBasket}</h2>
        <p className="mt-2 text-sm leading-6 text-steel">{locale === "tr" ? "Ürünleri teklif sepetinize ekleyerek tedarik akışınızı hazırlayın." : "Add products to your inquiry basket to prepare sourcing workflows."}</p>
        <Link href={`/${locale}/categories`} className="mt-5 inline-flex rounded-xl bg-signal px-4 py-3 text-sm font-bold text-white">
          {copy.pages.sourceByCategory}
        </Link>
      </section>
      <section className="mt-4 rounded-2xl bg-ink p-4 text-white">
        <ShieldCheck className="text-signal" size={24} />
        <h2 className="mt-3 text-lg font-bold">{copy.pages.tradeProtection}</h2>
        <div className="mt-3 grid gap-2">
          {protection.map((item) => (
            <p key={item} className="flex items-center gap-2 text-sm font-semibold text-white/78">
              <CheckCircle2 size={16} className="text-signal" />
              {item}
            </p>
          ))}
        </div>
      </section>
      <MobileRecommendedStrip locale={locale} />
    </MobilePageShell>
  );
}

export function MobileAccountPage({ locale }: { locale: Locale }) {
  const copy = getMobileMarketplaceCopy(locale);

  return (
    <MobilePageShell locale={locale} active="account" title={copy.pages.account}>
      <section className="rounded-2xl bg-ink p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <UserRound size={26} />
          </span>
          <div>
            <h2 className="text-lg font-bold">{copy.pages.accountPreview}</h2>
            <p className="mt-1 text-sm text-white/65">{locale === "tr" ? "Gerçek hesap için giriş yapın" : "Sign in for real account sync"}</p>
          </div>
        </div>
        <Link href={`/${locale}/auth/login`} className="mt-4 inline-flex rounded-xl bg-signal px-4 py-2 text-sm font-bold text-white">
          {copy.pages.signInCta}
        </Link>
      </section>
      <IconGrid items={copy.account.stats} icons={[Heart, Clock, ReceiptText, Sparkles]} />
      <MobileSectionCard title={locale === "tr" ? "Siparişlerim" : "My Orders"} items={copy.account.orders} icon={PackageSearch} />
      <MobileSectionCard title={locale === "tr" ? "Ödeme ve finansman" : "Payment & financing"} items={copy.account.payment} icon={CreditCard} />
      <MobileSectionCard title={locale === "tr" ? "Diğer özellikler" : "Other features"} items={copy.account.features} icon={MapPin} />
    </MobilePageShell>
  );
}

function MobilePageShell({ locale, active, title, children }: { locale: Locale; active: "home" | "categories" | "messages" | "basket" | "account"; title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-20 md:hidden">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <RootfablinkWordmark size="compact" />
          <h1 className="truncate text-base font-bold text-ink">{title}</h1>
        </div>
      </header>
      <main className="px-4 py-4">{children}</main>
      <MobileBottomNav locale={locale} active={active} />
    </div>
  );
}

function IconGrid({ items, icons }: { items: string[]; icons: Array<typeof Heart> }) {
  return (
    <section className="mt-4 grid grid-cols-4 gap-2">
      {items.map((item, index) => {
        const Icon = icons[index] ?? Heart;
        return (
          <div key={item} className="rounded-2xl bg-white p-3 text-center">
            <Icon className="mx-auto text-copper" size={19} />
            <p className="mt-2 text-[11px] font-bold leading-4 text-ink">{item}</p>
          </div>
        );
      })}
    </section>
  );
}

function MobileSectionCard({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof PackageSearch }) {
  return (
    <section className="mt-4 rounded-2xl bg-white p-4">
      <h2 className="text-base font-bold text-ink">{title}</h2>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <a key={item} href="#" className="flex items-center justify-between rounded-xl bg-[#f6f7f8] px-3 py-3 text-sm font-semibold text-ink">
            <span className="flex items-center gap-2">
              <Icon size={16} className="text-copper" />
              {item}
            </span>
            <ChevronRight size={16} className="text-steel" />
          </a>
        ))}
      </div>
    </section>
  );
}

function MobileRecommendedStrip({ locale }: { locale: Locale }) {
  return (
    <section className="mt-4">
      <h2 className="text-lg font-bold text-ink">{locale === "tr" ? "Önerilen ürünler" : "Recommended products"}</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {mobileSeedProducts.slice(0, 4).map((product) => (
          <article key={product.title} className="min-w-40 rounded-2xl bg-white p-3">
            <div className="flex h-36 items-center justify-center rounded-xl bg-white p-2">
              <img src={product.image} alt={locale === "tr" ? product.titleTr : product.title} className="h-full w-full object-contain" />
            </div>
            <h3 className="mt-2 line-clamp-2 text-xs font-bold leading-4 text-ink">{locale === "tr" ? product.titleTr : product.title}</h3>
            <p className="mt-2 text-sm font-bold text-copper">{locale === "tr" ? product.priceTr : product.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function translateCategory(item: string) {
  const map: Record<string, string> = {
    "Sizin için": "For you",
    "Öne Çıkan": "Featured",
    "İndirimli ürünler": "Discounted",
    "Giyim & Aksesuar": "Apparel & Accessories",
    "Kişisel Elektronik Cihazlar": "Personal electronics",
    "Ev & Bahçe": "Home & Garden",
    "Spor & Eğlence": "Sports & Entertainment",
    "Ebeveyn & Çocuk & Oyuncaklar": "Parenting, Kids & Toys",
    "Spor Giyim & Açık Hava Kıyafetleri": "Sportswear & Outdoor",
    Kozmetik: "Cosmetics",
    "Takı & Gözlük & Saat": "Jewelry, Eyewear & Watches",
    "Ayakkabı & Çanta": "Shoes & Bags",
    "Yapı Malzemeleri": "Building Materials",
    "Endüstriyel Makineler": "Industrial Machinery"
  };
  return map[item] ?? item;
}

function iconForCategory(category: MarketplaceCategory) {
  const iconMap = {
    shoe: Footprints,
    smartphone: Smartphone,
    scooter: Sparkles,
    phone: Phone,
    laptop: Laptop,
    car: Car,
    shirt: Shirt,
    drone: Sparkles,
    dress: Shirt,
    bottle: Sparkles,
    panel: PanelsTopLeft,
    solar: SunMedium,
    box: Box,
    factory: Grid2X2,
    spark: Sparkles
  } satisfies Record<MarketplaceCategory["icon"], typeof Grid2X2>;

  return iconMap[category.icon] ?? Grid2X2;
}
