import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { SiteHeader } from "@/components/layout/site-header";

const roles = [
  ["buyer", "Alıcı", "Buyer"],
  ["supplier", "Tedarikçi", "Supplier"],
  ["logistics", "Lojistik", "Logistics"],
  ["customs", "Gümrük", "Customs"]
] as const;

export default async function ChooseRolePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const tr = locale === "tr";

  return (
    <>
      <SiteHeader locale={locale as Locale} />
      <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-12 sm:px-5">
        <h1 className="text-3xl font-bold text-ink">{tr ? "Hesap türünüzü seçin" : "Choose your account type"}</h1>
        <p className="mt-3 text-sm leading-6 text-steel">{tr ? "RootFabLink deneyiminizi doğru iş akışlarıyla başlatın." : "Start your RootFabLink experience with the right workflows."}</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {roles.map(([role, labelTr, labelEn]) => (
            <Link key={role} href={`/${locale}/onboarding/${role}`} className="rounded-md border border-ink/10 bg-white p-5 text-lg font-bold text-ink shadow-soft hover:border-signal/35">
              {tr ? labelTr : labelEn}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
