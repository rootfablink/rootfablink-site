import type { Locale } from "@rootfablink/i18n";

export type LocalizedValue = string | Partial<Record<Locale, string>> & { en?: string };

export function getLocalizedValue(value: LocalizedValue | null | undefined, locale: Locale, fallback = "") {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[locale] ?? value.en ?? Object.values(value).find(Boolean) ?? fallback;
}

const countryNamesTr: Record<string, string> = {
  Turkey: "Türkiye",
  Türkiye: "Türkiye",
  Germany: "Almanya",
  China: "Çin",
  "United States": "Amerika Birleşik Devletleri",
  "United Kingdom": "Birleşik Krallık",
  Italy: "İtalya",
  France: "Fransa",
  Spain: "İspanya",
  Poland: "Polonya",
  UAE: "Birleşik Arap Emirlikleri",
  India: "Hindistan",
  Vietnam: "Vietnam",
  "Saudi Arabia": "Suudi Arabistan"
};

const industryNamesTr: Record<string, string> = {
  Packaging: "Ambalaj",
  Machinery: "Makine",
  Workwear: "İş Kıyafetleri",
  "Building Materials": "Yapı Malzemeleri",
  Textile: "Tekstil",
  Logistics: "Lojistik",
  Customs: "Gümrük",
  Furniture: "Mobilya",
  Construction: "İnşaat",
  Food: "Gıda",
  Automotive: "Otomotiv"
};

export function getLocalizedCountry(country: string, locale: Locale) {
  return locale === "tr" ? countryNamesTr[country] ?? country : country;
}

export function getLocalizedIndustry(industry: string, locale: Locale) {
  return locale === "tr" ? industryNamesTr[industry] ?? industry : industry;
}
