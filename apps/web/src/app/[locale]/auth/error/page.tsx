import { redirect } from "next/navigation";
import { isLocale } from "@rootfablink/i18n";

export default async function LocalizedAuthErrorPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ locale: rawLocale }] = await Promise.all([params, searchParams]);
  const locale = isLocale(rawLocale) ? rawLocale : "tr";
  redirect(`/${locale}/auth/login?error=google_auth_failed`);
}
