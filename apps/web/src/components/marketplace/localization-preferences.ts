import type { Locale } from "@rootfablink/i18n";

export type CountryCode = "TR" | "US" | "DE" | "FR" | "ES" | "CN" | "SA" | "AE" | "IQ" | "SY" | "GB" | "RU";

export type LocalizationPreference = {
  country: CountryCode;
  language: Locale;
  currency: string;
  locale: string;
  manuallySelected: boolean;
};

export const localizationStorageKey = "rootfablink.localization";

export const countryLocalizationMap: Record<CountryCode, Omit<LocalizationPreference, "country" | "manuallySelected">> = {
  TR: { language: "tr", currency: "TRY", locale: "tr-TR" },
  US: { language: "en", currency: "USD", locale: "en-US" },
  DE: { language: "de", currency: "EUR", locale: "de-DE" },
  FR: { language: "fr", currency: "EUR", locale: "fr-FR" },
  ES: { language: "es", currency: "EUR", locale: "es-ES" },
  CN: { language: "zh", currency: "CNY", locale: "zh-CN" },
  SA: { language: "ar", currency: "SAR", locale: "ar-SA" },
  AE: { language: "ar", currency: "AED", locale: "ar-AE" },
  IQ: { language: "ar", currency: "USD", locale: "ar-IQ" },
  SY: { language: "ar", currency: "USD", locale: "ar-SY" },
  GB: { language: "en", currency: "GBP", locale: "en-GB" },
  RU: { language: "ru", currency: "RUB", locale: "ru-RU" }
};

export const countryOptions: Array<{ code: CountryCode; label: string }> = [
  { code: "TR", label: "Türkiye" },
  { code: "US", label: "United States" },
  { code: "DE", label: "Germany" },
  { code: "GB", label: "United Kingdom" },
  { code: "CN", label: "China" },
  { code: "IQ", label: "Iraq" },
  { code: "SY", label: "Syria" },
  { code: "AE", label: "UAE" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "FR", label: "France" },
  { code: "ES", label: "Spain" },
  { code: "RU", label: "Russia" }
];

export const languageOptions: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" }
];

export const currencyOptions = ["USD", "EUR", "TRY", "GBP", "CNY", "AED", "SAR", "RUB"];

export function preferenceFromCountry(country: CountryCode, manuallySelected: boolean): LocalizationPreference {
  const mapped = countryLocalizationMap[country];
  return {
    country,
    language: mapped.language,
    currency: mapped.currency,
    locale: mapped.locale,
    manuallySelected
  };
}

export function countryFromLocale(locale: Locale): CountryCode {
  if (locale === "tr") return "TR";
  if (locale === "de") return "DE";
  if (locale === "fr") return "FR";
  if (locale === "es") return "ES";
  if (locale === "zh") return "CN";
  if (locale === "ar") return "SA";
  if (locale === "ru") return "RU";
  return "US";
}

export function detectCountryFromBrowser(): CountryCode {
  if (typeof navigator === "undefined") return "US";

  const language = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
  if (language.includes("tr")) return "TR";
  if (language.includes("de")) return "DE";
  if (language.includes("fr")) return "FR";
  if (language.includes("es")) return "ES";
  if (language.includes("zh")) return "CN";
  if (language.includes("ru")) return "RU";
  if (language.includes("ar-ae")) return "AE";
  if (language.includes("ar-sa") || language.startsWith("ar")) return "SA";
  if (language.includes("en-gb")) return "GB";
  return "US";
}

export function readStoredPreference(): LocalizationPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(localizationStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalizationPreference;
    if (!parsed.country || !countryLocalizationMap[parsed.country]) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredPreference(preference: LocalizationPreference) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(localizationStorageKey, JSON.stringify(preference));
}

export function replaceLocaleInPath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1 && languageOptions.some((item) => item.code === parts[1])) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}
