export const locales = ["en", "tr", "ar", "zh", "ru", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = ["ar"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getTextDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
