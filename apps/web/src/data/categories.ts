import type { Locale } from "@rootfablink/i18n";

type SupportedCategoryLocale = "en" | "tr";
type LocalizedText = Record<SupportedCategoryLocale, string>;
type LocalizedList = Record<SupportedCategoryLocale, string[]>;

export type MarketplaceCategory = {
  id: string;
  slug: LocalizedText;
  name: LocalizedText;
  parentId: string;
  icon: "shoe" | "smartphone" | "scooter" | "phone" | "laptop" | "car" | "shirt" | "drone" | "dress" | "bottle" | "panel" | "solar" | "box" | "factory" | "spark";
  keywords: LocalizedList;
  relatedProducts: string[];
  relatedSuppliers: string[];
  description: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
};

export type MarketplaceCategoryGroup = {
  id: string;
  slug: LocalizedText;
  name: LocalizedText;
  categoryIds: string[];
};

export function categoryLocale(locale: Locale): SupportedCategoryLocale {
  return locale === "tr" ? "tr" : "en";
}

export function categoryPath(locale: Locale, category: MarketplaceCategory) {
  const language = categoryLocale(locale);
  return `/${locale}/categories/${category.slug[language]}`;
}

export function groupPath(locale: Locale, group: MarketplaceCategoryGroup) {
  const language = categoryLocale(locale);
  return `/${locale}/categories?group=${group.slug[language]}`;
}

export function getCategoryBySlug(locale: Locale, slug: string) {
  const language = categoryLocale(locale);
  return marketplaceCategories.find((category) => category.slug[language] === slug);
}

export function getCategoryByAnySlug(slug: string) {
  return marketplaceCategories.find((category) => category.slug.en === slug || category.slug.tr === slug);
}

export function getCategoryById(id: string) {
  return marketplaceCategories.find((category) => category.id === id);
}

export function getGroupBySlug(locale: Locale, slug?: string | null) {
  const language = categoryLocale(locale);
  return categoryGroups.find((group) => group.slug[language] === slug) ?? categoryGroups[0]!;
}

export function categoriesForGroup(groupId: string) {
  const group = categoryGroups.find((item) => item.id === groupId) ?? categoryGroups[0]!;
  return group.categoryIds.map(getCategoryById).filter((category): category is MarketplaceCategory => Boolean(category));
}

export const categoryGroups: MarketplaceCategoryGroup[] = [
  {
    id: "for-you",
    slug: { en: "for-you", tr: "sizin-icin" },
    name: { en: "For You", tr: "Sizin için" },
    categoryIds: ["wall-panels", "solar-panels", "packaging-boxes", "electric-scooters", "5g-smartphones", "men-shoes"]
  },
  {
    id: "featured",
    slug: { en: "featured", tr: "one-cikan" },
    name: { en: "Featured", tr: "Öne Çıkan" },
    categoryIds: ["wall-panels", "solar-panels", "packaging-boxes", "hoodies", "mobile-phones", "laptops"]
  },
  {
    id: "discounted",
    slug: { en: "discounted", tr: "indirimli-urunler" },
    name: { en: "Discounted Products", tr: "İndirimli ürünler" },
    categoryIds: ["men-shoes", "hoodies", "women-sets", "perfume-bottles", "electric-scooters", "mobile-phones"]
  },
  {
    id: "apparel-accessories",
    slug: { en: "apparel-accessories", tr: "giyim-aksesuar" },
    name: { en: "Apparel & Accessories", tr: "Giyim & Aksesuar" },
    categoryIds: ["hoodies", "evening-dresses", "women-sets", "men-shoes"]
  },
  {
    id: "personal-electronics",
    slug: { en: "personal-electronics", tr: "kisisel-elektronik-cihazlar" },
    name: { en: "Personal Electronics", tr: "Kişisel Elektronik Cihazlar" },
    categoryIds: ["5g-smartphones", "mobile-phones", "laptops", "drones"]
  },
  {
    id: "home-garden",
    slug: { en: "home-garden", tr: "ev-bahce" },
    name: { en: "Home & Garden", tr: "Ev & Bahçe" },
    categoryIds: ["wall-panels", "solar-panels", "perfume-bottles", "packaging-boxes"]
  },
  {
    id: "sports-entertainment",
    slug: { en: "sports-entertainment", tr: "spor-eglence" },
    name: { en: "Sports & Entertainment", tr: "Spor & Eğlence" },
    categoryIds: ["electric-scooters", "scooters", "drones", "hoodies"]
  },
  {
    id: "parenting-kids-toys",
    slug: { en: "parenting-kids-toys", tr: "ebeveyn-cocuk-oyuncaklar" },
    name: { en: "Parenting, Kids & Toys", tr: "Ebeveyn & Çocuk & Oyuncaklar" },
    categoryIds: ["scooters", "drones", "hoodies", "packaging-boxes"]
  },
  {
    id: "sportswear-outdoor",
    slug: { en: "sportswear-outdoor", tr: "spor-giyim-acik-hava-kiyafetleri" },
    name: { en: "Sportswear & Outdoor", tr: "Spor Giyim & Açık Hava Kıyafetleri" },
    categoryIds: ["hoodies", "electric-scooters", "scooters", "drones"]
  },
  {
    id: "cosmetics",
    slug: { en: "cosmetics", tr: "kozmetik" },
    name: { en: "Cosmetics", tr: "Kozmetik" },
    categoryIds: ["perfume-bottles", "packaging-boxes"]
  },
  {
    id: "jewelry-eyewear-watches",
    slug: { en: "jewelry-eyewear-watches", tr: "taki-gozluk-saat" },
    name: { en: "Jewelry, Eyewear & Watches", tr: "Takı & Gözlük & Saat" },
    categoryIds: ["perfume-bottles", "packaging-boxes", "women-sets"]
  },
  {
    id: "shoes-bags",
    slug: { en: "shoes-bags", tr: "ayakkabi-canta" },
    name: { en: "Shoes & Bags", tr: "Ayakkabı & Çanta" },
    categoryIds: ["men-shoes", "women-sets"]
  },
  {
    id: "building-materials",
    slug: { en: "building-materials", tr: "yapi-malzemeleri" },
    name: { en: "Building Materials", tr: "Yapı Malzemeleri" },
    categoryIds: ["wall-panels", "solar-panels", "packaging-boxes", "construction-chemicals", "door-window-systems", "floor-coverings", "insulation-materials"]
  },
  {
    id: "industrial-machinery",
    slug: { en: "industrial-machinery", tr: "endustriyel-makineler" },
    name: { en: "Industrial Machinery", tr: "Endüstriyel Makineler" },
    categoryIds: ["packaging-boxes", "solar-panels", "laptops"]
  }
];

export const marketplaceCategories: MarketplaceCategory[] = [
  category("men-shoes", "shoe", "shoes-bags", "Men Shoes", "Erkek Ayakkabıları", "men-shoes", "erkek-ayakkabilari", ["men shoes", "shoes", "footwear"], ["erkek ayakkabıları", "ayakkabı", "erkek spor ayakkabı"]),
  category("5g-smartphones", "smartphone", "personal-electronics", "5G Smartphones", "5G Akıllı Telefonlar", "5g-smartphones", "5g-akilli-telefonlar", ["5g smartphones", "smartphones", "mobile devices"], ["5g akıllı telefonlar", "akıllı telefon", "cep telefonu"]),
  category("electric-scooters", "scooter", "sports-entertainment", "Electric Scooters", "Elektrikli Scooterlar", "electric-scooters", "elektrikli-scooterlar", ["electric scooter", "scooter", "mobility"], ["elektrikli scooter", "scooter", "mikro mobilite"]),
  category("mobile-phones", "phone", "personal-electronics", "Mobile Phones", "Cep Telefonları", "mobile-phones", "cep-telefonlari", ["mobile phones", "phones", "smartphone"], ["cep telefonları", "telefon", "akıllı telefon"]),
  category("laptops", "laptop", "personal-electronics", "Laptops", "Dizüstü Bilgisayarlar", "laptops", "dizustu-bilgisayarlar", ["laptops", "notebook", "computer"], ["dizüstü bilgisayarlar", "laptop", "notebook"]),
  category("cars", "car", "featured", "Cars", "Otomobiller", "cars", "otomobiller", ["cars", "automotive", "vehicle"], ["otomobiller", "araç", "otomotiv"]),
  category("hoodies", "shirt", "apparel-accessories", "Hoodies", "Kapüşonlu Sweatshirtler", "hoodies", "kapusonlu-sweatshirtler", ["hoodies", "sweatshirt", "apparel"], ["kapüşonlu sweatshirt", "hoodie", "giyim"]),
  category("drones", "drone", "personal-electronics", "Drones", "Dronlar", "drones", "dronlar", ["drones", "uav", "camera drone"], ["dronlar", "drone", "kamera dronu"]),
  category("evening-dresses", "dress", "apparel-accessories", "Evening Dresses", "Abiye Elbiseler", "evening-dresses", "abiye-elbiseler", ["evening dress", "formal dress", "women apparel"], ["abiye elbiseler", "gece elbisesi", "kadın giyim"]),
  category("women-sets", "shirt", "apparel-accessories", "Women Sets", "Kadın Takımları", "women-sets", "kadin-takimlari", ["women sets", "women apparel", "two piece set"], ["kadın takımları", "kadın giyim", "takım"]),
  category("scooters", "scooter", "sports-entertainment", "Scooter", "Scooter", "scooter", "scooter", ["scooter", "kick scooter", "mobility"], ["scooter", "mikro mobilite"]),
  category("perfume-bottles", "bottle", "cosmetics", "Perfume Bottles", "Parfüm Şişeleri", "perfume-bottles", "parfum-siseleri", ["perfume bottle", "cosmetic bottle", "fragrance packaging"], ["parfüm şişeleri", "kozmetik ambalaj", "cam şişe"]),
  category("wall-panels", "panel", "building-materials", "Wall Panels", "Duvar Panelleri", "wall-panels", "duvar-panelleri", ["wall panel", "ps wall panel", "decorative panel", "i-wall", "building materials", "interior decoration"], ["duvar paneli", "polimer lambiri", "dekoratif panel", "i-wall", "yapı malzemeleri", "iç dekorasyon"], ["i-WALL"]),
  category("solar-panels", "solar", "building-materials", "Solar Panels", "Güneş Panelleri", "solar-panels", "gunes-panelleri", ["solar panels", "solar energy", "photovoltaic"], ["güneş panelleri", "solar enerji", "fotovoltaik"]),
  category("packaging-boxes", "box", "building-materials", "Packaging Boxes", "Ambalaj Kutuları", "packaging-boxes", "ambalaj-kutulari", ["packaging boxes", "shipping boxes", "corrugated boxes"], ["ambalaj kutuları", "kargo kutusu", "oluklu mukavva"]),
  category("construction-chemicals", "factory", "building-materials", "Construction Chemicals", "Yapı Kimyasalları", "construction-chemicals", "yapi-kimyasallari", ["construction chemicals", "waterproofing", "adhesive"], ["yapı kimyasalları", "su yalıtımı", "yapıştırıcı"]),
  category("door-window-systems", "factory", "building-materials", "Door & Window Systems", "Kapı & Pencere Sistemleri", "door-window-systems", "kapi-pencere-sistemleri", ["door systems", "window systems", "aluminium"], ["kapı sistemleri", "pencere sistemleri", "alüminyum"]),
  category("floor-coverings", "panel", "building-materials", "Floor Coverings", "Zemin Kaplamaları", "floor-coverings", "zemin-kaplamalari", ["floor coverings", "flooring", "tiles"], ["zemin kaplamaları", "yer döşemesi", "karo"]),
  category("insulation-materials", "panel", "building-materials", "Insulation Materials", "Yalıtım Malzemeleri", "insulation-materials", "yalitim-malzemeleri", ["insulation materials", "thermal insulation", "sound insulation"], ["yalıtım malzemeleri", "ısı yalıtımı", "ses yalıtımı"])
];

function category(
  id: string,
  icon: MarketplaceCategory["icon"],
  parentId: string,
  nameEn: string,
  nameTr: string,
  slugEn: string,
  slugTr: string,
  keywordsEn: string[],
  keywordsTr: string[],
  relatedSuppliers: string[] = []
): MarketplaceCategory {
  return {
    id,
    icon,
    parentId,
    slug: { en: slugEn, tr: slugTr },
    name: { en: nameEn, tr: nameTr },
    keywords: { en: keywordsEn, tr: keywordsTr },
    relatedProducts: [...keywordsEn, ...keywordsTr],
    relatedSuppliers,
    description: {
      en: `Browse ${nameEn.toLowerCase()} suppliers, product listings and RFQ-ready sourcing options on RootFabLink.`,
      tr: `RootFabLink üzerinde ${nameTr.toLowerCase()} tedarikçilerini, ürün listelerini ve RFQ hazır tedarik seçeneklerini keşfedin.`
    },
    seoTitle: {
      en: `${nameEn} Suppliers and Products | RootFabLink`,
      tr: `${nameTr} Tedarikçileri ve Ürünleri | RootFabLink`
    },
    seoDescription: {
      en: `Find ${nameEn.toLowerCase()} products, manufacturers and RFQ workflows through RootFabLink's global B2B marketplace.`,
      tr: `${nameTr.toLowerCase()} ürünlerini, üreticilerini ve RFQ akışlarını RootFabLink küresel B2B pazaryerinde bulun.`
    }
  };
}

export const categoryStaticParams = (allLocales: readonly Locale[]) =>
  allLocales.flatMap((locale) => {
    const language = categoryLocale(locale);
    return marketplaceCategories.map((category) => ({
      locale,
      slug: category.slug[language]
    }));
  });
