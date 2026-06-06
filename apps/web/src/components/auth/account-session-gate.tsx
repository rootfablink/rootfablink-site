"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import type { Locale } from "@rootfablink/i18n";
import { AuthenticatedAccount } from "./authenticated-account";

export function AccountSessionGate({ locale, authConfigured }: { locale: Locale; authConfigured: boolean }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let active = true;

    if (!authConfigured) {
      router.replace(`/${locale}/auth/login?next=/${locale}/account`);
      return () => {
        active = false;
      };
    }

    getSession()
      .then((nextSession) => {
        if (!active) return;
        if (!nextSession?.user) {
          router.replace(`/${locale}/auth/login?next=/${locale}/account`);
          return;
        }
        setSession(nextSession);
      })
      .catch(() => {
        if (active) router.replace(`/${locale}/auth/login?next=/${locale}/account`);
      });

    return () => {
      active = false;
    };
  }, [authConfigured, locale, router]);

  if (!session?.user) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-cloud px-4">
        <p className="text-sm font-semibold text-steel">{locale === "tr" ? "Hesap oturumu kontrol ediliyor..." : "Checking account session..."}</p>
      </main>
    );
  }

  return <AuthenticatedAccount locale={locale} session={session} />;
}
