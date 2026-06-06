import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { AuthenticatedAccount } from "@/components/auth/authenticated-account";
import { MobileAccountPage } from "@/components/marketplace/mobile-marketplace-pages";
import { MarketplacePlaceholderPage } from "@/components/marketplace/marketplace-placeholder-page";
import { authOptions } from "@/lib/auth";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const session = await getServerSession(authOptions);

  if (session) {
    return <AuthenticatedAccount locale={locale as Locale} session={session} />;
  }

  return (
    <>
      <MobileAccountPage locale={locale as Locale} />
      <div className="hidden md:block">
        <MarketplacePlaceholderPage locale={locale as Locale} routeKey="account" />
      </div>
    </>
  );
}
