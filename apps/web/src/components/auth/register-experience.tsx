"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthDivider, GoogleOAuthButton } from "./google-oauth-button";

type AccountType = "buyer" | "supplier" | "logistics" | "customs";
type SimpleField = {
  id: string;
  tr: string;
  en: string;
  type?: "text" | "email" | "password" | "tel";
  required?: boolean;
  span?: boolean;
};
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

const simpleFormFields: Record<Exclude<AccountType, "supplier">, SimpleField[]> = {
  buyer: [
    { id: "fullName", tr: "Ad Soyad", en: "Full Name", required: true },
    { id: "email", tr: "E-posta", en: "Email", type: "email", required: true },
    { id: "password", tr: "Şifre", en: "Password", type: "password", required: true },
    { id: "confirmPassword", tr: "Şifre tekrar", en: "Confirm Password", type: "password", required: true },
    { id: "phone", tr: "Telefon", en: "Phone", type: "tel" },
    { id: "country", tr: "Ülke", en: "Country", required: true },
    { id: "city", tr: "Şehir", en: "City" }
  ],
  logistics: [
    { id: "fullName", tr: "Ad Soyad", en: "Full Name", required: true },
    { id: "email", tr: "E-posta", en: "Email", type: "email", required: true },
    { id: "password", tr: "Şifre", en: "Password", type: "password", required: true },
    { id: "confirmPassword", tr: "Şifre tekrar", en: "Confirm Password", type: "password", required: true },
    { id: "phone", tr: "Telefon", en: "Phone", type: "tel" },
    { id: "companyName", tr: "Firma Adı", en: "Company Name" },
    { id: "country", tr: "Ülke", en: "Country" },
    { id: "city", tr: "Şehir", en: "City" },
    { id: "serviceTypes", tr: "Hizmet türleri", en: "Service Types" },
    { id: "coverage", tr: "Hizmet verilen bölgeler", en: "Coverage Regions" },
    { id: "description", tr: "Firma açıklaması", en: "Company Description", span: true }
  ],
  customs: [
    { id: "fullName", tr: "Ad Soyad", en: "Full Name", required: true },
    { id: "email", tr: "E-posta", en: "Email", type: "email", required: true },
    { id: "password", tr: "Şifre", en: "Password", type: "password", required: true },
    { id: "confirmPassword", tr: "Şifre tekrar", en: "Confirm Password", type: "password", required: true },
    { id: "phone", tr: "Telefon", en: "Phone", type: "tel" },
    { id: "companyName", tr: "Firma Adı", en: "Company Name" },
    { id: "country", tr: "Ülke", en: "Country" },
    { id: "city", tr: "Şehir", en: "City" },
    { id: "licenseNumber", tr: "Yetki / lisans numarası", en: "Authorization / License Number" },
    { id: "services", tr: "Hizmetler", en: "Services" },
    { id: "description", tr: "Firma açıklaması", en: "Company Description", span: true }
  ]
};

export function RegisterExperience({ locale, googleConfigured }: { locale: Locale; accountTypes?: string[]; accountNote?: string; googleConfigured: boolean }) {
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

  const validateSupplier = () => {
    const nextErrors: Record<string, string> = {};
    const required: Array<keyof SupplierFormData> = ["fullName", "email", "password", "confirmPassword", "brandName", "country", "businessType", "mainCategory"];
    for (const field of required) {
      if (!supplierForm[field].trim()) {
        nextErrors[field] = tr ? "Bu alan zorunludur." : "This field is required.";
      }
    }
    if (supplierForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplierForm.email.trim())) {
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
      id: `supplier_${Date.now()}`,
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
    window.localStorage.setItem("rootfablink_supplier_draft", JSON.stringify(draft));
    if (supplierForm.brandName.trim().toLowerCase() === "i-wall") {
      window.localStorage.setItem("rootfablink_supplier_draft_iwall", JSON.stringify(draft));
    }
    const existingDrafts = JSON.parse(window.localStorage.getItem("rootfablink_registration_drafts") ?? "[]") as unknown[];
    window.localStorage.setItem("rootfablink_registration_drafts", JSON.stringify([draft, ...existingDrafts]));
    setSuccess(true);
  };

  const submitSimple = () => {
    if (selectedType === "supplier") return;
    const fields = simpleFormFields[selectedType];
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      if (field.required && !simpleValues[field.id]?.trim()) {
        nextErrors[field.id] = tr ? "Bu alan zorunludur." : "This field is required.";
      }
    }
    if (simpleValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(simpleValues.email.trim())) {
      nextErrors.email = tr ? "Geçerli bir e-posta girin." : "Enter a valid email.";
    }
    if (simpleValues.password && simpleValues.password.length < 8) {
      nextErrors.password = tr ? "Şifre en az 8 karakter olmalıdır." : "Password must be at least 8 characters.";
    }
    if (simpleValues.password !== simpleValues.confirmPassword) {
      nextErrors.confirmPassword = tr ? "Şifre tekrarı eşleşmelidir." : "Password confirmation must match.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const label = tr ? accountTypes.find((item) => item.id === selectedType)?.tr : accountTypes.find((item) => item.id === selectedType)?.en;
    const now = new Date().toISOString();
    const safeValues = Object.fromEntries(Object.entries(simpleValues).filter(([key]) => key !== "password" && key !== "confirmPassword"));
    const draft = {
      id: `${selectedType}_${Date.now()}`,
      accountType: selectedType,
      label,
      data: safeValues,
      status: "draft",
      createdAt: now,
      updatedAt: now
    };
    const existingDrafts = JSON.parse(window.localStorage.getItem("rootfablink_registration_drafts") ?? "[]") as unknown[];
    window.localStorage.setItem("rootfablink_registration_drafts", JSON.stringify([draft, ...existingDrafts]));
    if (selectedType === "buyer") {
      window.localStorage.setItem("rootfablink_buyer_draft", JSON.stringify(draft));
    }
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

      <section className="mx-auto mt-8 max-w-xl rounded-md border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-bold text-ink">{tr ? "RootFabLink hesabı oluşturun" : "Create your RootFabLink account"}</h2>
        <p className="mt-2 text-sm leading-6 text-steel">
          {tr ? "Seçtiğiniz hesap türüyle Google üzerinden güvenli şekilde devam edin veya e-posta formunu doldurun." : "Continue securely with Google for the selected account type or complete the email registration form."}
        </p>
        <div className="mt-5">
          <GoogleOAuthButton locale={locale} configured={googleConfigured} callbackUrl={`/${locale}/onboarding/${selectedType}?role=${selectedType}`} />
          {googleConfigured && <AuthDivider locale={locale} />}
          <p className="text-center text-xs font-bold uppercase text-steel">{tr ? "E-posta ile kayıt ol" : "Register with email"}</p>
        </div>
      </section>

      {selectedType === "supplier" ? (
        <section className="mt-8 rounded-md border border-ink/10 bg-white p-5 shadow-[0_14px_34px_rgba(11,11,12,0.06)]">
          <div className="border-b border-ink/10 pb-5">
            <h2 className="text-xl font-bold text-ink">{tr ? "Tedarikçi kayıt formu" : "Supplier registration form"}</h2>
            <p className="mt-2 text-sm leading-6 text-steel">
              {tr ? "Şirket bilgilerinizi manuel olarak girin. Kayıt taslağı güvenli şekilde yerel olarak saklanır; şifre kaydedilmez." : "Enter your company information manually. The registration draft is saved locally; passwords are never stored."}
            </p>
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
          <h2 className="text-xl font-bold text-ink">
            {selectedType === "buyer" ? tr ? "Alıcı" : "Buyer" : tr ? accountTypes.find((item) => item.id === selectedType)?.tr : accountTypes.find((item) => item.id === selectedType)?.en}
          </h2>
          {selectedType === "buyer" && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-steel">
              {tr
                ? "Ürün aramak, tedarikçilerle iletişime geçmek ve RFQ oluşturmak için alıcı hesabınızı oluşturun."
                : "Create your buyer account to search products, contact suppliers and create RFQs."}
            </p>
          )}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {simpleFormFields[selectedType].map((field) => (
              <label key={field.id} className={cn("grid gap-2", field.span ? "md:col-span-2" : "")}>
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-steel">
                  {tr ? field.tr : field.en}
                  {field.required && <span className="text-copper"> *</span>}
                </span>
                <input
                  type={field.type ?? "text"}
                  value={simpleValues[field.id] ?? ""}
                  onChange={(event) => {
                    setSimpleValues((current) => ({ ...current, [field.id]: event.target.value }));
                    setErrors((current) => ({ ...current, [field.id]: "" }));
                    setSuccess(false);
                  }}
                  className={cn("h-11 rounded-md border px-3 text-sm font-medium text-ink outline-none focus:border-signal", errors[field.id] ? "border-red-400" : "border-ink/10")}
                />
                {errors[field.id] && <span className="text-xs font-semibold text-red-600">{errors[field.id]}</span>}
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end border-t border-ink/10 pt-5">
            <button type="button" onClick={submitSimple} className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(249,115,22,0.22)] hover:bg-copper">
              {selectedType === "buyer"
                ? tr ? "Alıcı hesabı oluştur" : "Create buyer account"
                : selectedType === "logistics"
                  ? tr ? "Lojistik firma hesabı oluştur" : "Create logistics account"
                  : tr ? "Gümrük müşaviri hesabı oluştur" : "Create customs broker account"}
            </button>
          </div>
        </section>
      )}

      {success && (
        <section className="mt-8 rounded-md border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle2 size={20} />
            <h2 className="text-xl font-bold">
              {selectedType === "supplier"
                ? tr ? "Tedarikçi profil taslağı oluşturuldu" : "Supplier profile draft created"
                : selectedType === "buyer"
                  ? tr ? "Alıcı hesabı oluşturuldu" : "Buyer account created"
                  : tr ? "Kayıt taslağı oluşturuldu" : "Registration draft created"}
            </h2>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-green-800">
            {selectedType === "supplier"
              ? tr ? "Şirket profiliniz kaydedildi. Ürünlerinizi, desenlerinizi ve katalog bilgilerinizi eklemeye başlayabilirsiniz." : "Your company profile has been saved. You can start adding products, patterns and catalog information."
              : selectedType === "buyer"
                ? tr ? "Artık ürünleri keşfedebilir, tedarikçilerle iletişime geçebilir ve teklif talebi oluşturabilirsiniz." : "You can now discover products, contact suppliers and create RFQs."
                : tr ? "Bilgileriniz localStorage üzerinde taslak olarak kaydedildi." : "Your information has been saved as a local draft."}
          </p>
          {selectedType === "buyer" && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={`/${locale}/products`}>{tr ? "Ürünleri keşfet" : "Explore products"}</Button>
              <Button href={`/${locale}/rfq/new`} variant="secondary">{tr ? "RFQ oluştur" : "Create RFQ"}</Button>
              <Button href={`/${locale}/account`} variant="secondary">{tr ? "Hesabıma git" : "Go to my account"}</Button>
            </div>
          )}
          {selectedType === "supplier" && (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={supplierForm.brandName.trim().toLowerCase() === "i-wall" ? `/${locale}/suppliers/i-wall` : `/${locale}/supplier-center`}>
                {tr ? "Tedarikçi paneline git" : "Go to supplier dashboard"}
              </Button>
              <Button href={supplierForm.brandName.trim().toLowerCase() === "i-wall" ? `/${locale}/suppliers/i-wall/products/new` : `/${locale}/products`} variant="secondary">
                {tr ? "Ürün ekle" : "Add product"}
              </Button>
              <Button href={supplierForm.brandName.trim().toLowerCase() === "i-wall" ? `/${locale}/suppliers/i-wall/patterns/new` : `/${locale}/supplier-center`} variant="secondary">
                {tr ? "Desen koleksiyonu ekle" : "Add pattern collection"}
              </Button>
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
