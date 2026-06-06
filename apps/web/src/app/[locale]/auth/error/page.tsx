import { redirect } from "next/navigation";
import { isLocale } from "@rootfablink/i18n";

export default async function LocalizedAuthErrorPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ locale: rawLocale }, { error }] = await Promise.all([params, searchParams]);
  const locale = isLocale(rawLocale) ? rawLocale : "tr";
  const query = new URLSearchParams({ oauthError: "1" });

  if (error) {
    query.set("error", error);
  }

  redirect(`/${locale}/auth/login?${query.toString()}`);
}
