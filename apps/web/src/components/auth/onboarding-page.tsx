import Link from "next/link";
import type { Session } from "next-auth";
import type { Locale } from "@rootfablink/i18n";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { SiteFooter } from "@/components/layout/site-footer";

const roleCopy = {
  buyer: { tr: "Alıcı", en: "Buyer" },
  supplier: { tr: "Üretici", en: "Supplier" },
  logistics: { tr: "Lojistik Sağlayıcısı", en: "Logistics Provider" },
  customs: { tr: "Gümrük Müşaviri", en: "Customs Broker" }
} as const;

export type OnboardingRole = keyof typeof roleCopy;

export function isOnboardingRole(value: string): value is OnboardingRole {
  return value in roleCopy;
}

export function OnboardingPage({ locale, role, session }: { locale: Locale; role: OnboardingRole; session: Session }) {
  const tr = locale === "tr";
  const roleLabel = roleCopy[role][tr ? "tr" : "en"];

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="min-h-[70vh] bg-cloud px-4 py-10 sm:px-5">
        <section className="mx-auto max-w-3xl rounded-md border border-ink/10 bg-white p-6 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
            <CheckCircle2 size={22} />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-copper">{tr ? "Google hesabı bağlandı" : "Google account connected"}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{tr ? `${roleLabel} onboarding` : `${roleLabel} onboarding`}</h1>
          <p className="mt-4 text-sm leading-7 text-steel">
            {tr
              ? `${session.user?.email ?? "Google hesabınız"} ile güvenli oturum açıldı. ${roleLabel} profilinizi tamamlamak için sonraki adımlara geçebilirsiniz.`
              : `You are securely signed in as ${session.user?.email ?? "your Google account"}. Continue to complete your ${roleLabel.toLowerCase()} profile.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${locale}/account`} className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-white hover:bg-copper">
              {tr ? "Hesabıma git" : "Go to my account"}
              <ArrowRight size={16} />
            </Link>
            <Link href={`/${locale}/${role === "buyer" ? "products" : role === "supplier" ? "supplier-center" : role}`} className="inline-flex items-center rounded-md border border-ink/10 px-5 py-3 text-sm font-bold text-ink hover:bg-cloud">
              {tr ? "Platformu keşfet" : "Explore platform"}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
