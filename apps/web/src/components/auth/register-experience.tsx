"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Factory, Landmark, Ship, ShoppingBasket, Sparkles, UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const supplierDraftKey = "rootfablink_supplier_draft_iwall";
const registrationDraftsKey = "rootfablink_registration_drafts";

type AccountType = "buyer" | "supplier" | "logistics" | "customs";
type FormValues = Record<string, string | string[]>;

const accountTypeIds: AccountType[] = ["buyer", "supplier", "logistics", "customs"];

const fieldSets: Record<AccountType, string[]> = {
  buyer: ["fullName", "companyName", "country", "city", "email", "phone", "sourcingInterest", "purchasingVolume", "message"],
  supplier: ["brandName", "legalCompanyName", "country", "city", "website", "businessType", "mainCategory", "companyDescription", "contactPerson", "email", "phone", "position"],
  logistics: ["companyName", "country", "city", "operatingRegions", "contactPerson", "email", "phone", "companyDescription"],
  customs: ["companyName", "country", "city", "licenseNumber", "tradeRoutes", "contactPerson", "email", "phone", "description"]
};

const serviceOptions: Record<AccountType, string[]> = {
  buyer: [],
  supplier: ["Manufacturer", "Supplier", "Exporter", "Wholesaler", "Design Brand", "OEM Available", "ODM Available", "Private Label Available"],
  logistics: ["Sea freight", "Air freight", "Land freight", "Warehouse", "Customs support"],
  customs: ["Import customs", "Export customs", "HS code consulting", "Document preparation", "Compliance support"]
};

const uploadPlaceholders = ["Business license", "Tax certificate", "Product catalog", "Company logo"];

const labels = {
  en: {
    accountDescriptions: [
      "Create sourcing requests, compare suppliers and prepare protected trade workflows.",
      "Create a company profile, list products and receive RFQ opportunities.",
      "Join freight, warehousing and shipment quote workflows.",
      "Support customs documentation, HS-code and trade service requests."
    ],
    selectedNote: "Selected onboarding flow",
    quickTitle: "Register the first supplier brand",
    quickText: "Pre-fill a verification-ready supplier draft for i-WALL surface systems.",
    quickButton: "Pre-fill i-WALL supplier profile",
    successTitle: {
      buyer: "Buyer account draft created",
      supplier: "Supplier profile draft created",
      logistics: "Logistics provider profile draft created",
      customs: "Customs broker profile draft created"
    },
    successText: {
      buyer: "Your buyer account draft has been saved locally. Backend account creation can be connected in the next phase.",
      supplier: "Supplier profile draft created. You are ready to add products and pattern collections.",
      logistics: "Your logistics provider draft has been saved locally for review and onboarding preparation.",
      customs: "Your customs broker draft has been saved locally for review and onboarding preparation."
    },
    buttons: {
      profile: "Go to supplier profile",
      product: "Add first product",
      pattern: "Add pattern collection",
      save: {
        buyer: "Create buyer account",
        supplier: "Create supplier profile",
        logistics: "Create logistics provider profile",
        customs: "Create customs broker profile"
      }
    },
    sections: { buyer: "Buyer information", supplier: "Supplier information", logistics: "Logistics provider information", customs: "Customs broker information", verification: "Verification preparation", capabilities: "Capabilities and services" },
    required: "This field is required.",
    email: "Enter a valid email address.",
    savedKey: "Draft storage key"
  },
  tr: {
    accountDescriptions: [
      "Tedarik talepleri oluşturun, tedarikçileri karşılaştırın ve güvenli ticaret akışlarına hazırlanın.",
      "Şirket profili oluşturun, ürünlerinizi listeleyin ve RFQ fırsatları alın.",
      "Deniz, hava, kara, depo ve sevkiyat teklif akışlarına katılın.",
      "Gümrük belgeleri, HS kodu ve dış ticaret hizmet taleplerini destekleyin."
    ],
    selectedNote: "Seçilen onboarding akışı",
    quickTitle: "İlk gerçek tedarikçi markasını kaydet",
    quickText: "i-WALL yüzey sistemleri için doğrulamaya hazır tedarikçi taslağını otomatik doldurun.",
    quickButton: "i-WALL bilgilerini otomatik doldur",
    successTitle: {
      buyer: "Alıcı hesap taslağı oluşturuldu",
      supplier: "Tedarikçi profil taslağı oluşturuldu",
      logistics: "Lojistik firma profil taslağı oluşturuldu",
      customs: "Gümrük müşaviri profil taslağı oluşturuldu"
    },
    successText: {
      buyer: "Alıcı hesap taslağınız yerel olarak kaydedildi. Backend hesap oluşturma akışı sonraki aşamada bağlanabilir.",
      supplier: "Tedarikçi profil taslağı oluşturuldu. Ürünlerinizi ve desen koleksiyonlarınızı eklemeye hazırsınız.",
      logistics: "Lojistik firma taslağınız inceleme ve onboarding hazırlığı için yerel olarak kaydedildi.",
      customs: "Gümrük müşaviri taslağınız inceleme ve onboarding hazırlığı için yerel olarak kaydedildi."
    },
    buttons: {
      profile: "Tedarikçi profiline git",
      product: "İlk ürünü ekle",
      pattern: "Desen koleksiyonu ekle",
      save: {
        buyer: "Alıcı hesabı oluştur",
        supplier: "Tedarikçi profili oluştur",
        logistics: "Lojistik firma profili oluştur",
        customs: "Gümrük müşaviri profili oluştur"
      }
    },
    sections: { buyer: "Alıcı bilgileri", supplier: "Tedarikçi bilgileri", logistics: "Lojistik firma bilgileri", customs: "Gümrük müşaviri bilgileri", verification: "Doğrulama hazırlığı", capabilities: "Kabiliyetler ve hizmetler" },
    required: "Bu alan zorunludur.",
    email: "Geçerli bir email adresi girin.",
    savedKey: "Taslak kayıt anahtarı"
  }
};

const fieldLabels: Record<string, { en: string; tr: string }> = {
  fullName: { en: "Full Name", tr: "Ad Soyad" },
  companyName: { en: "Company Name", tr: "Şirket Adı" },
  country: { en: "Country", tr: "Ülke" },
  city: { en: "City", tr: "Şehir" },
  email: { en: "Email", tr: "Email" },
  phone: { en: "Phone", tr: "Telefon" },
  sourcingInterest: { en: "Main sourcing interest", tr: "Ana tedarik ilgisi" },
  purchasingVolume: { en: "Expected purchasing volume", tr: "Tahmini alım hacmi" },
  message: { en: "Message", tr: "Mesaj" },
  brandName: { en: "Brand Name", tr: "Marka Adı" },
  legalCompanyName: { en: "Legal Company Name", tr: "Resmi Şirket Adı" },
  website: { en: "Website", tr: "Website" },
  businessType: { en: "Business Type", tr: "İşletme Türü" },
  mainCategory: { en: "Main Category", tr: "Ana Kategori" },
  companyDescription: { en: "Company Description", tr: "Şirket Açıklaması" },
  contactPerson: { en: "Contact Person", tr: "Yetkili Kişi" },
  position: { en: "Position", tr: "Görev" },
  operatingRegions: { en: "Operating Regions", tr: "Operasyon Bölgeleri" },
  licenseNumber: { en: "License / Authorization number", tr: "Lisans / Yetki numarası" },
  tradeRoutes: { en: "Supported trade routes", tr: "Desteklenen ticaret rotaları" },
  description: { en: "Description", tr: "Açıklama" }
};

const requiredFields: Record<AccountType, string[]> = {
  buyer: ["fullName", "companyName", "country", "email"],
  supplier: ["brandName", "country", "businessType", "mainCategory", "contactPerson", "email"],
  logistics: ["companyName", "country", "contactPerson", "email"],
  customs: ["companyName", "country", "contactPerson", "email"]
};

const iWallData: FormValues = {
  brandName: "i-WALL",
  legalCompanyName: "i-WALL",
  country: "Türkiye",
  city: "",
  website: "",
  businessType: "Manufacturer / Supplier / Design Brand",
  mainCategory: "Building Materials / Interior Decoration / Wall Panels",
  companyDescription:
    "i-WALL; konut, ticari alan, otel, ofis ve mimari projeler için dekoratif duvar sistemleri, desenli duvar panelleri ve iç mekan yüzey tasarım çözümleri sunar.",
  contactPerson: "",
  email: "",
  phone: "",
  position: "",
  capabilities: ["Manufacturer", "Supplier", "Design Brand", "OEM Available", "ODM Available", "Private Label Available"]
};

export function RegisterExperience({ locale, accountTypes, accountNote }: { locale: Locale; accountTypes: string[]; accountNote: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const copy = locale === "tr" ? labels.tr : labels.en;
  const [selectedType, setSelectedType] = useState<AccountType>("buyer");
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedType, setSubmittedType] = useState<AccountType | null>(null);

  useEffect(() => {
    const requestedType = searchParams.get("type") as AccountType | null;
    if (requestedType && accountTypeIds.includes(requestedType)) {
      setSelectedType(requestedType);
    }
  }, [searchParams]);

  const accountCards = useMemo(
    () =>
      accountTypeIds.map((id, index) => ({
        id,
        title: accountTypes[index] ?? id,
        description: copy.accountDescriptions[index],
        icon: [ShoppingBasket, Factory, Ship, Landmark][index] ?? ArrowRight
      })),
    [accountTypes, copy.accountDescriptions]
  );

  const selectType = (type: AccountType) => {
    setSelectedType(type);
    setSubmittedType(null);
    setErrors({});
    router.replace(`/${locale}/auth/register?type=${type}`, { scroll: false });
  };

  const updateField = (field: string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const toggleOption = (option: string) => {
    const key = selectedType === "supplier" ? "capabilities" : "services";
    const currentOptions = Array.isArray(values[key]) ? (values[key] as string[]) : [];
    setValues((current) => ({
      ...current,
      [key]: currentOptions.includes(option) ? currentOptions.filter((item) => item !== option) : [...currentOptions, option]
    }));
  };

  const prefillIWall = () => {
    selectType("supplier");
    setValues(iWallData);
    setErrors({});
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    for (const field of requiredFields[selectedType]) {
      const value = values[field];
      if (!String(value ?? "").trim()) nextErrors[field] = copy.required;
    }
    const email = String(values.email ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.email;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const now = new Date().toISOString();
    const draft = {
      id: `draft_${selectedType}_${Date.now()}`,
      type: selectedType,
      data: values,
      status: "draft",
      createdAt: now,
      updatedAt: now
    };

    if (typeof window !== "undefined") {
      const existing = JSON.parse(window.localStorage.getItem(registrationDraftsKey) ?? "[]") as unknown[];
      window.localStorage.setItem(registrationDraftsKey, JSON.stringify([draft, ...existing]));
      if (selectedType === "supplier" && String(values.brandName ?? "").toLowerCase() === "i-wall") {
        window.localStorage.setItem(supplierDraftKey, JSON.stringify(draft));
      }
    }
    setSubmittedType(selectedType);
  };

  if (submittedType) {
    return (
      <section className="mt-8 rounded-md border border-signal/25 bg-white p-6 shadow-[0_18px_42px_rgba(11,11,12,0.08)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-signal/10 text-copper">
          <CheckCircle2 size={24} />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">{copy.successTitle[submittedType]}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-steel">{copy.successText[submittedType]}</p>
        {submittedType === "supplier" && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={`/${locale}/suppliers/i-wall`}>{copy.buttons.profile}</Button>
            <Button href={`/${locale}/suppliers/i-wall/products/new`} variant="secondary">{copy.buttons.product}</Button>
            <Button href={`/${locale}/suppliers/i-wall/patterns/new`} variant="secondary">{copy.buttons.pattern}</Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {accountCards.map(({ id, title, description, icon: Icon }) => {
          const active = selectedType === id;
          return (
            <button
              key={id}
              className={cn("cursor-pointer rounded-md border bg-white p-5 text-left text-ink transition hover:border-signal hover:shadow-[0_12px_28px_rgba(11,11,12,0.08)]", active ? "border-signal shadow-[0_12px_28px_rgba(249,115,22,0.12)]" : "border-ink/10")}
              type="button"
              onClick={() => selectType(id)}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-bold">
                  <Icon size={18} className={active ? "text-copper" : "text-steel"} />
                  {title}
                </span>
                <ArrowRight size={16} className={active ? "text-copper" : "text-steel"} />
              </span>
              <span className="mt-3 block text-sm font-normal leading-6 text-steel">{description ?? accountNote}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-md border border-ink/10 bg-cloud p-4">
        <p className="text-sm font-bold text-ink">{copy.selectedNote}: {accountCards.find((item) => item.id === selectedType)?.title}</p>
      </div>

      {selectedType === "supplier" && (
        <div className="mt-8 flex flex-col gap-3 rounded-md border border-signal/25 bg-orange-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-bold text-ink">
              <Sparkles size={18} className="text-copper" />
              {copy.quickTitle}
            </p>
            <p className="mt-1 text-sm leading-6 text-steel">{copy.quickText}</p>
          </div>
          <button type="button" onClick={prefillIWall} className="rounded-md bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-copper">
            {copy.quickButton}
          </button>
        </div>
      )}

      <form onSubmit={submit} className="mt-8 grid gap-6 rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
        <FormSection icon={accountCards.find((item) => item.id === selectedType)?.icon ?? Factory} title={copy.sections[selectedType]}>
          {fieldSets[selectedType].map((field) => (
            <TextField key={field} label={fieldLabels[field]?.[locale === "tr" ? "tr" : "en"] ?? field} value={String(values[field] ?? "")} onChange={(value) => updateField(field, value)} error={errors[field]} required={requiredFields[selectedType].includes(field)} multiline={["message", "companyDescription", "description"].includes(field)} />
          ))}
        </FormSection>

        {serviceOptions[selectedType].length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-ink">{copy.sections.capabilities}</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {serviceOptions[selectedType].map((option) => {
                const key = selectedType === "supplier" ? "capabilities" : "services";
                const active = Array.isArray(values[key]) && (values[key] as string[]).includes(option);
                return (
                  <label key={option} className={cn("flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold", active ? "border-signal bg-orange-50 text-copper" : "border-ink/10 text-ink hover:bg-cloud")}>
                    <input type="checkbox" checked={active} onChange={() => toggleOption(option)} className="accent-orange-600" />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {selectedType === "supplier" && (
          <div>
            <h3 className="text-lg font-bold text-ink">{copy.sections.verification}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {uploadPlaceholders.map((item) => (
                <div key={item} className="rounded-md border border-dashed border-ink/20 bg-cloud p-4">
                  <UploadCloud size={20} className="text-copper" />
                  <p className="mt-2 text-sm font-bold text-ink">{item}</p>
                  <p className="mt-1 text-xs leading-5 text-steel">Upload placeholder</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold leading-5 text-steel">{copy.savedKey}: {selectedType === "supplier" ? `${registrationDraftsKey} / ${supplierDraftKey}` : registrationDraftsKey}</p>
          <button type="submit" className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
            {copy.buttons.save[selectedType]}
          </button>
        </div>
      </form>
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

function TextField({ label, value, onChange, error, required = false, multiline = false }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; multiline?: boolean }) {
  return (
    <label className={cn("grid gap-2", multiline && "md:col-span-2")}>
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className={cn("min-h-28 rounded-md border px-3 py-3 text-sm font-medium text-ink outline-none focus:border-signal", error ? "border-red-400" : "border-ink/10")} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={cn("h-11 rounded-md border px-3 text-sm font-medium text-ink outline-none focus:border-signal", error ? "border-red-400" : "border-ink/10")} />
      )}
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
