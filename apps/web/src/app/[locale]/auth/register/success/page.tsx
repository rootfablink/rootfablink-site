import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default async function RegisterSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const tr = locale === "tr";

  return (
    <>
      <SiteHeader locale={locale as Locale} />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-4 py-10 sm:px-5">
        <section className="w-full rounded-md border border-signal/25 bg-white p-6 text-center shadow-soft">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-signal/10 text-copper">
            <CheckCircle2 size={28} />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-ink">{tr ? "Kayıt taslağı oluşturuldu" : "Registration draft created"}</h1>
          <p className="mt-3 text-sm leading-6 text-steel">
            {tr
              ? "Bilgileriniz frontend demo akışı için yerel taslak olarak kaydedildi. Gerçek kimlik doğrulama ve veritabanı bağlantısı sonraki backend aşamasında eklenecektir."
              : "Your information was saved as a local draft for the frontend demo flow. Real authentication and database persistence will be connected in the backend phase."}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={`/${locale}/account`}>{tr ? "Hesaba git" : "Go to account"}</Button>
            <Button href={`/${locale}/auth/register`} variant="secondary">{tr ? "Yeni kayıt başlat" : "Start another registration"}</Button>
          </div>
        </section>
      </main>
    </>
  );
}
