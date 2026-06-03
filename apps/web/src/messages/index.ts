import { en } from "./en";
import { tr } from "./tr";

export const dictionaries = {
  en,
  tr,
  ar: en,
  zh: en,
  ru: en,
  de: en,
  fr: en,
  es: en
};

export type Dictionary = typeof en;
