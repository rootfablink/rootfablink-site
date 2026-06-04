import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@rootfablink/i18n";
import { PlatformFrameworkPage, type PlatformModuleKey } from "@/components/marketplace/platform-framework-page";

export function createFrameworkRoute(moduleKey: PlatformModuleKey) {
  return async function FrameworkRoute({ params }: { params: Promise<{ locale: string; slug?: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    return <PlatformFrameworkPage locale={locale as Locale} moduleKey={moduleKey} />;
  };
}
