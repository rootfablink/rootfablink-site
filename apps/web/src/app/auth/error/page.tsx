import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@rootfablink/i18n";

export default async function AuthErrorPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  await searchParams;
  const storedLocale = cookieStore.get("rootfablink_locale")?.value;
  const locale = storedLocale && isLocale(storedLocale) ? storedLocale : "tr";
  redirect(`/${locale}/auth/login?error=google_auth_failed`);
}
