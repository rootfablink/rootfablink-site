import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { AccountSessionGate } from "@/components/auth/account-session-gate";
import { googleOAuthConfigured } from "@/lib/auth";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <AccountSessionGate locale={locale as Locale} authConfigured={googleOAuthConfigured} />;
}
