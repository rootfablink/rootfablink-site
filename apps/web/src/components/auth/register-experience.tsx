"use client";

import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, CheckCircle2, Factory, PackageSearch, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const supplierDraftKey = "rootfablink_supplier_draft_iwall";

type SupplierFormState = {
  brandName: string;
  legalCompanyName: string;
  country: string;
  city: string;
  website: string;
  businessType: string;
  mainCategory: string;
  companyDescription: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  capabilities: string[];
};

const emptySupplierForm: SupplierFormState = {
  brandName: "",
  legalCompanyName: "",
  country: "",
  city: "",
  website: "",
  businessType: "",
  mainCategory: "",
  companyDescription: "",
  fullName: "",
  email: "",
  phone: "",
  position: "",
  capabilities: []
};

const iWallSupplierForm: SupplierFormState = {
  brandName: "i-WALL",
  legalCompanyName: "i-WALL",
  country: "Türkiye",
  city: "",
  website: "",
  businessType: "Manufacturer / Supplier / Design Brand",
  mainCategory: "Building Materials / Interior Decoration / Wall Panels",
  companyDescription:
    "i-WALL provides decorative wall systems, patterned wall panels and interior surface design solutions for residential, commercial, hotel, office and architectural projects.",
  fullName: "",
  email: "",
  phone: "",
  position: "",
  capabilities: ["Manufacturer", "Design Brand", "OEM Available", "ODM Available", "Private Label Available"]
};

const capabilityOptions = ["Manufacturer", "Exporter", "Wholesaler", "Design Brand", "OEM Available", "ODM Available", "Private Label Available"];

export function RegisterExperience({ locale, accountTypes, accountNote }: { locale: Locale; accountTypes: string[]; accountNote: string }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [form, setForm] = useState<SupplierFormState>(emptySupplierForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const supplierLabel = accountTypes[1] ?? "Supplier";

  const cardDescriptions = useMemo(
    () => [
      "Create sourcing requests, compare suppliers and prepare protected trade workflows.",
      "Create a company profile, list products and receive RFQ opportunities.",
      "Join freight, warehousing and shipment quote workflows.",
      "Support customs documentation, HS-code and trade service requests."
    ],
    []
  );

  const updateField = (field: keyof SupplierFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const toggleCapability = (capability: string) => {
    setForm((current) => ({
      ...current,
      capabilities: current.capabilities.includes(capability) ? current.capabilities.filter((item) => item !== capability) : [...current.capabilities, capability]
    }));
  };

  const prefillIWall = () => {
    setSelectedType(supplierLabel);
    setForm(iWallSupplierForm);
    setErrors({});
    setSubmitted(false);
  };

  const openSupplierForm = () => {
    setSelectedType(supplierLabel);
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.brandName.trim()) nextErrors.brandName = "Brand name is required.";
    if (!form.country.trim()) nextErrors.country = "Country is required.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    window.localStorage.setItem(
      supplierDraftKey,
      JSON.stringify({
        ...form,
        status: "draft",
        source: "register",
        updatedAt: new Date().toISOString()
      })
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mt-8 rounded-md border border-signal/25 bg-white p-6 shadow-[0_18px_42px_rgba(11,11,12,0.08)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-signal/10 text-copper">
          <CheckCircle2 size={24} />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">Supplier profile draft created</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">
          Your i-WALL supplier profile draft has been prepared. You can now add products, upload pattern collections and prepare RFQ visibility.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/${locale}/suppliers/i-wall`}>View i-WALL profile</Button>
          <Button href={`/${locale}/suppliers/i-wall/products/new`} variant="secondary">Add first product</Button>
          <Button href={`/${locale}/suppliers/i-wall/patterns/new`} variant="secondary">Add pattern collection</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {accountTypes.map((type, index) => {
          const active = selectedType === type;
          return (
            <button
              key={type}
              className={cn("rounded-md border bg-white p-5 text-left text-ink transition hover:border-signal hover:shadow-[0_12px_28px_rgba(11,11,12,0.08)]", active ? "border-signal shadow-[0_12px_28px_rgba(249,115,22,0.12)]" : "border-ink/10")}
              type="button"
              onClick={() => (type === supplierLabel ? openSupplierForm() : setSelectedType(type))}
            >
              <span className="flex items-center justify-between gap-3 font-bold">
                {type}
                <ArrowRight size={16} className={active ? "text-copper" : "text-steel"} />
              </span>
              <span className="mt-3 block text-sm font-normal leading-6 text-steel">{cardDescriptions[index] ?? accountNote}</span>
            </button>
          );
        })}
      </div>

      {selectedType && selectedType !== supplierLabel && (
        <div className="mt-6 rounded-md border border-ink/10 bg-cloud p-5">
          <p className="font-bold text-ink">{selectedType}</p>
          <p className="mt-2 text-sm leading-6 text-steel">{accountNote} This account type is selected and will be connected to the full onboarding workflow in the next backend phase.</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 rounded-md border border-signal/25 bg-orange-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-bold text-ink">
            <Sparkles size={18} className="text-copper" />
            Register the first supplier brand
          </p>
          <p className="mt-1 text-sm leading-6 text-steel">Prefill a verification-ready supplier draft for i-WALL surface systems.</p>
        </div>
        <button type="button" onClick={prefillIWall} className="rounded-md bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-copper">
          Register i-WALL as supplier
        </button>
      </div>

      {selectedType === supplierLabel && (
        <form onSubmit={submit} className="mt-8 grid gap-6 rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
          <FormSection icon={Factory} title="Company">
            <TextField label="Brand Name" value={form.brandName} onChange={(value) => updateField("brandName", value)} error={errors.brandName} required />
            <TextField label="Legal Company Name" value={form.legalCompanyName} onChange={(value) => updateField("legalCompanyName", value)} />
            <TextField label="Country" value={form.country} onChange={(value) => updateField("country", value)} error={errors.country} required />
            <TextField label="City" value={form.city} onChange={(value) => updateField("city", value)} />
            <TextField label="Website" value={form.website} onChange={(value) => updateField("website", value)} />
            <TextField label="Business Type" value={form.businessType} onChange={(value) => updateField("businessType", value)} />
            <TextField label="Main Category" value={form.mainCategory} onChange={(value) => updateField("mainCategory", value)} />
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">Company Description</span>
              <textarea value={form.companyDescription} onChange={(event) => updateField("companyDescription", event.target.value)} className="min-h-28 rounded-md border border-ink/10 px-3 py-3 text-sm font-medium text-ink outline-none focus:border-signal" />
            </label>
          </FormSection>

          <FormSection icon={PackageSearch} title="Contact">
            <TextField label="Full Name" value={form.fullName} onChange={(value) => updateField("fullName", value)} />
            <TextField label="Email" value={form.email} onChange={(value) => updateField("email", value)} error={errors.email} />
            <TextField label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
            <TextField label="Position" value={form.position} onChange={(value) => updateField("position", value)} />
          </FormSection>

          <div>
            <h3 className="text-lg font-bold text-ink">Capabilities</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {capabilityOptions.map((capability) => (
                <label key={capability} className={cn("flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold", form.capabilities.includes(capability) ? "border-signal bg-orange-50 text-copper" : "border-ink/10 text-ink hover:bg-cloud")}>
                  <input type="checkbox" checked={form.capabilities.includes(capability)} onChange={() => toggleCapability(capability)} className="accent-orange-600" />
                  {capability}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold leading-5 text-steel">Backend is not required for this draft. The supplier profile is saved locally with key {supplierDraftKey}.</p>
            <button type="submit" className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
              Save supplier draft
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function FormSection({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Icon size={19} className="text-copper" />
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextField({ label, value, onChange, error, required = false }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={cn("h-11 rounded-md border px-3 text-sm font-medium text-ink outline-none focus:border-signal", error ? "border-red-400" : "border-ink/10")} />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
