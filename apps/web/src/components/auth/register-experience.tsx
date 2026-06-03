"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AccountType = "buyer" | "supplier" | "logistics" | "customs";
type SupplierFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  brandName: string;
  legalCompanyName: string;
  country: string;
  city: string;
  businessType: string;
  mainCategory: string;
  companyDescription: string;
};

const accountTypes: Array<{ id: AccountType; tr: string; en: string; textTr: string; textEn: string }> = [
  { id: "buyer", tr: "Alıcı", en: "Buyer", textTr: "Ürün arayın, RFQ oluşturun ve tedarikçileri karşılaştırın.", textEn: "Source products, post RFQs and compare suppliers." },
  { id: "supplier", tr: "Tedarikçi", en: "Supplier", textTr: "Şirket profilinizi oluşturun ve ürünlerinizi listelemeye hazırlanın.", textEn: "Create a company profile and prepare product listings." },
  { id: "logistics", tr: "Lojistik firması", en: "Logistics provider", textTr: "Lojistik hizmetlerinizi alıcı ve tedarikçi akışlarına bağlayın.", textEn: "Connect logistics services to buyer and supplier workflows." },
  { id: "customs", tr: "Gümrük müşaviri", en: "Customs broker", textTr: "Gümrük, evrak ve uyum hizmetleri için profil hazırlayın.", textEn: "Prepare a profile for customs, documents and compliance services." }
];

const emptySupplierForm: SupplierFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  brandName: "",
  legalCompanyName: "",
  country: "",
  city: "",
  businessType: "",
  mainCategory: "",
  companyDescription: ""
};

const iWallSupplierForm: SupplierFormData = {
  ...emptySupplierForm,
  brandName: "i-WALL",
  legalCompanyName: "i-WALL",
  country: "Türkiye",
  city: "İstanbul",
  businessType: "Üretici / Tedarikçi / Tasarım Markası",
  mainCategory: "Yapı Malzemeleri / İç Dekorasyon / Duvar Panelleri",
  companyDescription:
    "i-WALL; konut, ticari alan, otel, ofis ve mimari projeler için dekoratif duvar sistemleri, desenli duvar panelleri ve iç mekan yüzey tasarım çözümleri sunar."
};

const simpleFormFields: Record<Exclude<AccountType, "supplier">, string[]> = {
  buyer: ["Ad Soyad", "E-posta", "Şifre", "Şifre Tekrar", "Telefon", "Şirket Adı", "Ülke", "Şehir", "Aradığınız ürün kategorileri", "Tahmini alım hacmi", "Mesaj"],
  logistics: ["Ad Soyad", "E-posta", "Şifre", "Şifre Tekrar", "Telefon", "Firma Adı", "Ülke", "Şehir", "Hizmet türleri", "Hizmet verilen bölgeler", "Firma açıklaması"],
  customs: ["Ad Soyad", "E-posta", "Şifre", "Şifre Tekrar", "Telefon", "Firma Adı", "Ülke", "Şehir", "Yetki / lisans numarası", "Hizmetler", "Firma açıklaması"]
};

export function RegisterExperience({ locale }: { locale: Locale; accountTypes?: string[]; accountNote?: string }) {
  const tr = locale === "tr";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<AccountType>("buyer");
  const [supplierForm, setSupplierForm] = useState<SupplierFormData>(emptySupplierForm);
  const [simpleValues, setSimpleValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type") as AccountType | null;
    if (type && accountTypes.some((item) => item.id === type)) {
      setSelectedType(type);
    }
  }, [searchParams]);

  const selectType = (type: AccountType) => {
    setSelectedType(type);
    setSuccess(false);
    setErrors({});
    router.replace(`/${locale}/auth/register?type=${type}`, { scroll: false });
  };

  const updateSupplier = (field: keyof SupplierFormData, value: string) => {
    setSupplierForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSuccess(false);
  };

  const prefillIWall = () => {
    setSelectedType("supplier");
    setSupplierForm((current) => ({
      ...iWallSupplierForm,
      fullName: current.fullName,
      email: current.email,
      password: current.password,
      confirmPassword: current.confirmPassword,
      phone: current.phone
    }));
    setErrors({});
    setSuccess(false);
  };

  const validateSupplier = () => {
    const nextErrors: Record<string, string> = {};
    const required: Array<keyof SupplierFormData> = ["fullName", "email", "password", "confirmPassword", "brandName", "country", "businessType", "mainCategory"];
    for (const field of required) {
      if (!supplierForm[field].trim()) {
        nextErrors[field] = tr ? "Bu alan zorunludur." : "This field is required.";
      }
    }
    if (supplierForm.email && !supplierForm.email.includes("@")) {
      nextErrors.email = tr ? "Geçerli bir e-posta girin." : "Enter a valid email.";
    }
    if (supplierForm.password && supplierForm.password.length < 8) {
      nextErrors.password = tr ? "Şifre en az 8 karakter olmalıdır." : "Password must be at least 8 characters.";
    }
    if (supplierForm.password !== supplierForm.confirmPassword) {
      nextErrors.confirmPassword = tr ? "Şifre tekrarı eşleşmelidir." : "Password confirmation must match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitSupplier = () => {
    if (!validateSupplier()) return;
    const now = new Date().toISOString();
    const draft = {
      id: `supplier_iwall_${Date.now()}`,
      accountType: "supplier",
      brandName: supplierForm.brandName,
      legalCompanyName: supplierForm.legalCompanyName,
      country: supplierForm.country,
      city: supplierForm.city,
      businessType: supplierForm.businessType,
      mainCategory: supplierForm.mainCategory,
      companyDescription: supplierForm.companyDescription,
      contact: {
        fullName: supplierForm.fullName,
        email: supplierForm.email,
        phone: supplierForm.phone
      },
      status: "draft",
      createdAt: now,
      updatedAt: now
    };
    window.localStorage.setItem("rootfablink_supplier_draft_iwall", JSON.stringify(draft));
    const existingDrafts = JSON.parse(window.localStorage.getItem("rootfablink_registration_drafts") ?? "[]") as unknown[];
    window.localStorage.setItem("rootfablink_registration_drafts", JSON.stringify([draft, ...existingDrafts]));
    setSuccess(true);
  };

  const submitSimple = () => {
    const label = tr ? accountTypes.find((item) => item.id === selectedType)?.tr : accountTypes.find((item) => item.id === selectedType)?.en;
    const now = new Date().toISOString();
    const draft = {
      id: `${selectedType}_${Date.now()}`,
      accountType: selectedType,
      label,
      data: simpleValues,
      status: "draft",
      createdAt: now,
      updatedAt: now
    };
    const existingDrafts = JSON.parse(window.localStorage.getItem("rootfablink_registration_drafts") ?? "[]") as unknown[];
    window.localStorage.setItem("rootfablink_registration_drafts", JSON.stringify([draft, ...existingDrafts]));
    setSuccess(true);
  };

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {accountTypes.map((type) => {
          const active = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => selectType(type.id)}
              className={cn("cursor-pointer rounded-md border bg-white p-5 text-left transition hover:border-signal hover:shadow-[0_12px_28px_rgba(11,11,12,0.08)]", active ? "border-signal shadow-[0_12px_28px_rgba(249,115,22,0.12)]" : "border-ink/10")}
            >
              <span className="flex items-center justify-between gap-3 font-bold text-ink">
                {tr ? type.tr : type.en}
                <ArrowRight size={16} className={active ? "text-copper" : "text-steel"} />
              </span>
              <span className="mt-3 block text-sm leading-6 text-steel">{tr ? type.textTr : type.textEn}</span>
            </button>
          );
        })}
      </div>

      {selectedType === "supplier" ? (
        <section className="mt-8 rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
          <div className="flex flex-col gap-3 rounded-md border border-signal/25 bg-orange-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-ink">{tr ? "i-WALL marka profilini otomatik doldur" : "Pre-fill i-WALL supplier profile"}</h2>
              <p className="mt-1 text-sm leading-6 text-steel">{tr ? "İlk tedarikçi marka taslağını hızlıca hazırlayın; tüm alanlar sonradan düzenlenebilir." : "Prepare the first supplier brand draft quickly; all fields remain editable."}</p>
            </div>
            <button type="button" onClick={prefillIWall} className="rounded-md bg-ink px-4 py-3 text-sm font-bold text-white hover:bg-copper">
              {tr ? "i-WALL bilgilerini otomatik doldur" : "Fill i-WALL details"}
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SupplierField label={tr ? "Ad Soyad" : "Full Name"} value={supplierForm.fullName} error={errors.fullName} onChange={(value) => updateSupplier("fullName", value)} required />
            <SupplierField label={tr ? "E-posta" : "Email"} value={supplierForm.email} error={errors.email} onChange={(value) => updateSupplier("email", value)} required />
            <SupplierField label={tr ? "Şifre" : "Password"} value={supplierForm.password} error={errors.password} onChange={(value) => updateSupplier("password", value)} required password />
            <SupplierField label={tr ? "Şifre Tekrar" : "Confirm Password"} value={supplierForm.confirmPassword} error={errors.confirmPassword} onChange={(value) => updateSupplier("confirmPassword", value)} required password />
            <SupplierField label={tr ? "Telefon" : "Phone"} value={supplierForm.phone} onChange={(value) => updateSupplier("phone", value)} />
            <SupplierField label={tr ? "Marka Adı" : "Brand Name"} value={supplierForm.brandName} error={errors.brandName} onChange={(value) => updateSupplier("brandName", value)} required />
            <SupplierField label={tr ? "Resmi Şirket Adı" : "Legal Company Name"} value={supplierForm.legalCompanyName} onChange={(value) => updateSupplier("legalCompanyName", value)} />
            <SupplierField label={tr ? "Ülke" : "Country"} value={supplierForm.country} error={errors.country} onChange={(value) => updateSupplier("country", value)} required />
            <SupplierField label={tr ? "Şehir" : "City"} value={supplierForm.city} onChange={(value) => updateSupplier("city", value)} />
            <SupplierField label={tr ? "İşletme Türü" : "Business Type"} value={supplierForm.businessType} error={errors.businessType} onChange={(value) => updateSupplier("businessType", value)} required />
            <SupplierField label={tr ? "Ana Kategori" : "Main Category"} value={supplierForm.mainCategory} error={errors.mainCategory} onChange={(value) => updateSupplier("mainCategory", value)} required />
            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{tr ? "Şirket Açıklaması" : "Company Description"}</span>
              <textarea value={supplierForm.companyDescription} onChange={(event) => updateSupplier("companyDescription", event.target.value)} className="min-h-28 rounded-md border border-ink/10 px-3 py-3 text-sm font-medium text-ink outline-none focus:border-signal" />
            </label>
          </div>

          <div className="mt-6 flex justify-end border-t border-ink/10 pt-5">
            <button type="button" onClick={submitSupplier} className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
              {tr ? "Tedarikçi hesabı oluştur" : "Create supplier account"}
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
          <h2 className="text-xl font-bold text-ink">{tr ? accountTypes.find((item) => item.id === selectedType)?.tr : accountTypes.find((item) => item.id === selectedType)?.en}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {simpleFormFields[selectedType].map((label) => (
              <label key={label} className={cn("grid gap-2", label === "Mesaj" || label.includes("açıklaması") ? "md:col-span-2" : "")}>
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{label}</span>
                <input value={simpleValues[label] ?? ""} onChange={(event) => setSimpleValues((current) => ({ ...current, [label]: event.target.value }))} className="h-11 rounded-md border border-ink/10 px-3 text-sm font-medium text-ink outline-none focus:border-signal" />
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end border-t border-ink/10 pt-5">
            <button type="button" onClick={submitSimple} className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
              {selectedType === "buyer" ? "Alıcı hesabı oluştur" : selectedType === "logistics" ? "Lojistik firma hesabı oluştur" : "Gümrük müşaviri hesabı oluştur"}
            </button>
          </div>
        </section>
      )}

      {success && (
        <section className="mt-8 rounded-md border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 size={20} />
            <h2 className="text-xl font-bold">{selectedType === "supplier" ? "Tedarikçi profil taslağı oluşturuldu" : "Kayıt taslağı oluşturuldu"}</h2>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-green-800">
            {selectedType === "supplier" ? "i-WALL tedarikçi profili hazırlandı. Şimdi ürünlerinizi ve desen koleksiyonlarınızı ekleyebilirsiniz." : "Bilgileriniz localStorage üzerinde taslak olarak kaydedildi."}
          </p>
          {selectedType === "supplier" && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/suppliers/i-wall`}>i-WALL profilini görüntüle</Button>
              <Button href={`/${locale}/suppliers/i-wall/products/new`} variant="secondary">İlk ürünü ekle</Button>
              <Button href={`/${locale}/suppliers/i-wall/patterns/new`} variant="secondary">Desen koleksiyonu ekle</Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SupplierField({ label, value, onChange, error, required, password }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; password?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <input type={password ? "password" : "text"} value={value} onChange={(event) => onChange(event.target.value)} className={cn("h-11 rounded-md border px-3 text-sm font-medium text-ink outline-none focus:border-signal", error ? "border-red-400" : "border-ink/10")} />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
