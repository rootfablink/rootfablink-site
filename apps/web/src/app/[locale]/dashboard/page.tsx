import { isLocale, type Locale } from "@rootfablink/i18n";
import { AppShell } from "@/components/layout/app-shell";
import { dictionaries } from "@/messages";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionaries[locale];

  return (
    <AppShell locale={locale} title={t.dashboard.title}>
      <div className="grid gap-4 md:grid-cols-4">
        {t.dashboard.cards.map(([label, value, note]) => (
          <section key={label} className="rounded-md border border-ink/10 bg-white p-5">
            <p className="text-sm font-medium text-steel">{label}</p>
            <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
            <p className="mt-2 text-sm text-steel">{note}</p>
          </section>
        ))}
      </div>
      <section className="mt-6 rounded-md border border-ink/10 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">{t.dashboard.prioritiesTitle}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {t.dashboard.priorities.map((item) => (
            <div key={item} className="rounded-md bg-cloud p-4 text-sm font-semibold text-ink">
              {item}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
