"use client";

import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import type { Locale } from "@rootfablink/i18n";
import { LogOut, UserRound } from "lucide-react";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function AuthenticatedAccount({ locale, session }: { locale: Locale; session: Session }) {
  const tr = locale === "tr";

  return (
    <>
      <MarketplaceHeader locale={locale} />
      <main className="min-h-[70vh] bg-cloud px-4 py-10 sm:px-5">
        <section className="mx-auto max-w-3xl rounded-md border border-ink/10 bg-white p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-ink text-white">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <UserRound size={25} />
                )}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-copper">{tr ? "Güvenli hesap oturumu" : "Secure account session"}</p>
                <h1 className="mt-1 text-2xl font-bold text-ink">{tr ? "Hesabım" : "My Account"}</h1>
              </div>
            </div>
            <button type="button" onClick={() => signOut({ callbackUrl: `/${locale}/auth/login` })} className="inline-flex items-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-bold text-ink hover:border-signal/35 hover:bg-cloud">
              <LogOut size={16} />
              {tr ? "Çıkış yap" : "Sign out"}
            </button>
          </div>
          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            <AccountDetail label={tr ? "Ad Soyad" : "Name"} value={session.user?.name ?? "-"} />
            <AccountDetail label={tr ? "E-posta" : "Email"} value={session.user?.email ?? "-"} />
            <AccountDetail label={tr ? "Sağlayıcı" : "Provider"} value={session.user?.provider ?? "google"} />
            <AccountDetail label={tr ? "Oturum" : "Session"} value={tr ? "Aktif" : "Active"} />
          </dl>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function AccountDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-ink/10 bg-cloud p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.08em] text-steel">{label}</dt>
      <dd className="mt-2 break-words text-sm font-bold text-ink">{value}</dd>
    </div>
  );
}
