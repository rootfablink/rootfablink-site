import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { AuthenticatedAccount } from "@/components/auth/authenticated-account";
import { authOptions, googleOAuthConfigured } from "@/lib/auth";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  if (!googleOAuthConfigured) {
    redirect(`/${locale}/auth/login?oauthError=1&error=Configuration`);
  }

  let session = null;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("[auth] Account session lookup failed", {
      route: `/${locale}/account`,
      error: error instanceof Error ? error.message : "Unknown session error"
    });
    redirect(`/${locale}/auth/login?oauthError=1&error=SessionUnavailable`);
  }

  if (!session?.user) {
    redirect(`/${locale}/auth/login?next=/${locale}/account`);
  }

  return <AuthenticatedAccount locale={locale as Locale} session={session} />;
}
