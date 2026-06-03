import type { Locale } from "@rootfablink/i18n";

export type LocalizationPreference = {
  language: Locale;
  currency: string;
  country: string;
  locale: string;
  manuallySelected: boolean;
};

export const localizationStorageKey = "rootfablink.localization";

export const languageLocalizationMap: Record<Locale, Omit<LocalizationPreference, "language" | "manuallySelected">> = {
  en: { country: "US", currency: "USD", locale: "en-US" },
  tr: { country: "TR", currency: "TRY", locale: "tr-TR" },
  ar: { country: "SA", currency: "SAR", locale: "ar-SA" },
  zh: { country: "CN", currency: "CNY", locale: "zh-CN" },
  ru: { country: "RU", currency: "RUB", locale: "ru-RU" },
  de: { country: "DE", currency: "EUR", locale: "de-DE" },
  fr: { country: "FR", currency: "EUR", locale: "fr-FR" },
  es: { country: "ES", currency: "EUR", locale: "es-ES" },
  ja: { country: "JP", currency: "JPY", locale: "ja-JP" }
};

export const languageOptions: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ja", label: "日本語" }
];

export function preferenceFromLanguage(language: Locale, manuallySelected: boolean): LocalizationPreference {
  const mapped = languageLocalizationMap[language] ?? languageLocalizationMap.en;
  return {
    language,
    country: mapped.country,
    currency: mapped.currency,
    locale: mapped.locale,
    manuallySelected
  };
}

export function detectLanguageFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "en";

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const value of languages) {
    const language = value.toLowerCase();
    if (language.startsWith("tr")) return "tr";
    if (language.startsWith("ar")) return "ar";
    if (language.startsWith("zh")) return "zh";
    if (language.startsWith("ru")) return "ru";
    if (language.startsWith("de")) return "de";
    if (language.startsWith("fr")) return "fr";
    if (language.startsWith("es")) return "es";
    if (language.startsWith("ja")) return "ja";
  }

  return "en";
}

export function readStoredPreference(): LocalizationPreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(localizationStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LocalizationPreference>;
    if (!parsed.language || !languageLocalizationMap[parsed.language]) return null;
    return {
      ...preferenceFromLanguage(parsed.language, Boolean(parsed.manuallySelected)),
      manuallySelected: Boolean(parsed.manuallySelected)
    };
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
