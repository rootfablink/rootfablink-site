"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, PackageSearch, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

type DraftFormProps = {
  locale: string;
  type: "product" | "pattern";
};

const productFields = [
  "Product Title",
  "Product Code",
  "Pattern Name",
  "Pattern Code",
  "Material",
  "Thickness",
  "Dimensions",
  "Surface Finish",
  "Color Family",
  "Usage Area",
  "MOQ",
  "Lead Time",
  "Packaging"
];

const patternFields = [
  "Pattern Name",
  "Pattern Code",
  "Collection Name",
  "Color Family",
  "Style",
  "Surface Texture",
  "Recommended Usage Area",
  "Available Materials",
  "Customizable"
];

export function IWallDraftForm({ locale, type }: DraftFormProps) {
  const fields = type === "product" ? productFields : patternFields;
  const storageKey = type === "product" ? "rootfablink_iwall_product_draft" : "rootfablink_iwall_pattern_draft";
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const update = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const saveDraft = () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        supplier: "i-WALL",
        type,
        values,
        status: "draft",
        updatedAt: new Date().toISOString()
      })
    );
    setSaved(true);
  };

  return (
    <div className="rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">i-WALL draft workspace</p>
          <h1 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{type === "product" ? "Add first product" : "Add pattern collection"}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
            {type === "product"
              ? "Prepare a product listing draft for decorative wall systems, wall panels and interior surface solutions."
              : "Prepare a pattern collection draft for i-WALL surface design, textures and architectural applications."}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-signal/10 text-copper">
          {type === "product" ? <PackageSearch size={24} /> : <Palette size={24} />}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field} className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{field}</span>
            <input value={values[field] ?? ""} onChange={(event) => update(field, event.target.value)} className="h-11 rounded-md border border-ink/10 px-3 text-sm font-medium text-ink outline-none focus:border-signal" />
          </label>
        ))}
        <div className="rounded-md border border-dashed border-ink/20 bg-cloud p-5 md:col-span-2">
          <ImagePlus size={24} className="text-copper" />
          <p className="mt-3 text-sm font-bold text-ink">{type === "product" ? "Image upload placeholder" : "Pattern image upload placeholder"}</p>
          <p className="mt-1 text-xs leading-5 text-steel">Backend media storage will be connected later. This draft currently stores text fields in localStorage.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold leading-5 text-steel">Draft storage key: {storageKey}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button href={`/${locale}/suppliers/i-wall`} variant="secondary">View i-WALL profile</Button>
          <button type="button" onClick={saveDraft} className="inline-flex min-h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
            Save draft
          </button>
        </div>
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">
          <CheckCircle2 size={17} />
          Draft saved locally for i-WALL.
        </div>
      )}
    </div>
  );
}
