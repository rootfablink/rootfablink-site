import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { authOptions } from "@/lib/auth";
import { isOnboardingRole, OnboardingPage } from "@/components/auth/onboarding-page";

export default async function RoleOnboardingPage({ params }: { params: Promise<{ locale: string; role: string }> }) {
  const { locale, role } = await params;
  if (!isLocale(locale) || !isOnboardingRole(role)) notFound();

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/auth/login?next=/${locale}/onboarding/${role}`);

  return <OnboardingPage locale={locale as Locale} role={role} session={session} />;
}
