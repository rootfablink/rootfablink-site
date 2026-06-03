import { isLocale, type Locale } from "@rootfablink/i18n";
import { AppShell } from "@/components/layout/app-shell";
import { dictionaries } from "@/messages";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = dictionaries[locale];

  return (
    <AppShell locale={locale} title={t.admin.title}>
      <div className="grid gap-4 md:grid-cols-4">
        {t.admin.queues.map(([label, value]) => (
          <section key={label} className="rounded-md border border-ink/10 bg-white p-5">
            <p className="text-sm font-medium text-steel">{label}</p>
            <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
          </section>
        ))}
      </div>
      <section className="mt-6 rounded-md border border-ink/10 bg-white p-5">
        <h2 className="text-xl font-bold text-ink">{t.admin.workflowTitle}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {t.admin.workflow.map((item) => (
            <div key={item} className="rounded-md border border-ink/10 p-4 text-sm font-semibold text-ink">
              {item}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
