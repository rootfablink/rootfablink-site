import { en } from "./en";
import { tr } from "./tr";
import { ar } from "./ar";
import { zh } from "./zh";
import { ru } from "./ru";
import { de } from "./de";
import { fr } from "./fr";
import { es } from "./es";

export const dictionaries = {
  en,
  tr,
  ar,
  zh,
  ru,
  de,
  fr,
  es
};

export type Dictionary = typeof en;
