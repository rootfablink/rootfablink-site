"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, PackageSearch, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DraftFormProps = {
  locale: string;
  type: "product" | "pattern";
};

type FieldConfig = {
  key: string;
  en: string;
  tr: string;
  required?: boolean;
};

const productFields: FieldConfig[] = [
  { key: "productTitle", en: "Product Title", tr: "Ürün başlığı", required: true },
  { key: "productCode", en: "Product Code", tr: "Ürün kodu", required: true },
  { key: "patternName", en: "Pattern Name", tr: "Desen adı" },
  { key: "patternCode", en: "Pattern Code", tr: "Desen kodu" },
  { key: "material", en: "Material", tr: "Malzeme", required: true },
  { key: "thickness", en: "Thickness", tr: "Kalınlık" },
  { key: "dimensions", en: "Dimensions", tr: "Ölçüler" },
  { key: "surfaceFinish", en: "Surface Finish", tr: "Yüzey tipi" },
  { key: "colorFamily", en: "Color Family", tr: "Renk ailesi" },
  { key: "usageArea", en: "Usage Area", tr: "Kullanım alanı", required: true },
  { key: "moq", en: "MOQ", tr: "Minimum sipariş miktarı" },
  { key: "leadTime", en: "Lead Time", tr: "Teslim süresi" },
  { key: "packaging", en: "Packaging", tr: "Paketleme" },
  { key: "oem", en: "OEM availability", tr: "OEM uygunluğu" },
  { key: "odm", en: "ODM availability", tr: "ODM uygunluğu" },
  { key: "customDesign", en: "Custom design availability", tr: "Özel tasarım uygunluğu" }
];

const patternFields: FieldConfig[] = [
  { key: "patternName", en: "Pattern Name", tr: "Desen adı", required: true },
  { key: "patternCode", en: "Pattern Code", tr: "Desen kodu" },
  { key: "collectionName", en: "Collection Name", tr: "Koleksiyon adı", required: true },
  { key: "colorFamily", en: "Color Family", tr: "Renk ailesi" },
  { key: "style", en: "Style", tr: "Stil", required: true },
  { key: "surfaceTexture", en: "Surface Texture", tr: "Yüzey dokusu" },
  { key: "recommendedUsageArea", en: "Recommended Usage Area", tr: "Önerilen kullanım alanı" },
  { key: "availableMaterials", en: "Available Materials", tr: "Uygun malzemeler" },
  { key: "customizable", en: "Customizable", tr: "Özelleştirilebilir mi?" }
];

const patternCollections = ["Mermer Koleksiyonu", "Ahşap Koleksiyonu", "Taş Koleksiyonu", "Modern Geometri Koleksiyonu", "Lüks İç Mekan Koleksiyonu", "Minimal Yüzey Koleksiyonu", "Ticari Alan Koleksiyonu", "Özel Tasarım Koleksiyonu"];

export function IWallDraftForm({ locale, type }: DraftFormProps) {
  const tr = locale === "tr";
  const fields = type === "product" ? productFields : patternFields;
  const storageKey = type === "product" ? "rootfablink_iwall_product_drafts" : "rootfablink_iwall_pattern_drafts";
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSaved(false);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      if (field.required && !String(values[field.key] ?? "").trim()) {
        nextErrors[field.key] = tr ? "Bu alan zorunludur." : "This field is required.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveDraft = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    const draft = {
      id: `iwall_${type}_${Date.now()}`,
      supplier: "i-WALL",
      type,
      data: values,
      status: "draft",
      createdAt: now,
      updatedAt: now
    };
    const existing = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as unknown[];
    window.localStorage.setItem(storageKey, JSON.stringify([draft, ...existing]));
    setSaved(true);
  };

  return (
    <div className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">i-WALL draft workspace</p>
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{type === "product" ? (tr ? "İlk ürünü ekle" : "Add first product") : tr ? "Desen koleksiyonu ekle" : "Add pattern collection"}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
            {type === "product"
              ? tr
                ? "Dekoratif duvar sistemleri, duvar panelleri ve iç mekan yüzey çözümleri için ürün taslağı hazırlayın."
                : "Prepare a product listing draft for decorative wall systems, wall panels and interior surface solutions."
              : tr
                ? "i-WALL yüzey tasarımları, dokular ve mimari kullanım alanları için desen koleksiyonu taslağı hazırlayın."
                : "Prepare a pattern collection draft for i-WALL surface design, textures and architectural applications."}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-signal/10 text-copper">
          {type === "product" ? <PackageSearch size={24} /> : <Palette size={24} />}
        </div>
      </div>

      {type === "pattern" && (
        <div className="mt-5 rounded-md border border-ink/10 bg-cloud p-4">
          <p className="text-sm font-bold text-ink">{tr ? "Önerilen koleksiyonlar" : "Suggested collections"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {patternCollections.map((collection) => (
              <button key={collection} type="button" onClick={() => update("collectionName", collection)} className="rounded-md border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-ink hover:border-signal/40">
                {collection}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
              {tr ? field.tr : field.en}
              {field.required && <span className="text-copper"> *</span>}
            </span>
            <input value={values[field.key] ?? ""} onChange={(event) => update(field.key, event.target.value)} className={cn("h-11 rounded-md border px-3 text-sm font-medium text-ink outline-none focus:border-signal", errors[field.key] ? "border-red-400" : "border-ink/10")} />
            {errors[field.key] && <span className="text-xs font-semibold text-red-600">{errors[field.key]}</span>}
          </label>
        ))}
        <div className="rounded-md border border-dashed border-ink/20 bg-cloud p-5 md:col-span-2">
          <ImagePlus size={24} className="text-copper" />
          <p className="mt-3 text-sm font-bold text-ink">{type === "product" ? (tr ? "Ürün görselleri yükleme alanı" : "Product image upload placeholder") : tr ? "Desen görseli yükleme alanı" : "Pattern image upload placeholder"}</p>
          <p className="mt-1 text-xs leading-5 text-steel">{tr ? "Backend medya depolama sistemi daha sonra bağlanacak. Bu taslak şimdilik localStorage içinde tutulur." : "Backend media storage will be connected later. This draft currently stores text fields in localStorage."}</p>
        </div>
        {type === "product" && (
          <div className="rounded-md border border-dashed border-ink/20 bg-cloud p-5 md:col-span-2">
            <ImagePlus size={24} className="text-copper" />
            <p className="mt-3 text-sm font-bold text-ink">{tr ? "Teknik föy yükleme alanı" : "Technical sheet upload placeholder"}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold leading-5 text-steel">Draft storage key: {storageKey}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button href={`/${locale}/suppliers/i-wall`} variant="secondary">{tr ? "i-WALL profiline git" : "View i-WALL profile"}</Button>
          <button type="button" onClick={saveDraft} className="inline-flex min-h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
            {type === "product" ? (tr ? "Taslak olarak kaydet" : "Save draft") : tr ? "Desen taslağını kaydet" : "Save draft"}
          </button>
        </div>
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">
          <CheckCircle2 size={17} />
          {type === "product" ? (tr ? "Ürün taslağı kaydedildi." : "Product draft saved.") : tr ? "Desen taslağı kaydedildi." : "Pattern draft saved."}
        </div>
      )}
    </div>
  );
}
