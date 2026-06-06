import { BarChart3, Bell, Building2, FileText, LayoutDashboard, PackageSearch, Settings, ShieldCheck } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { RootfablinkWordmark } from "@/components/brand/rootfablink-wordmark";
import { dictionaries } from "@/messages";

const navigationIcons = [
  LayoutDashboard,
  Building2,
  PackageSearch,
  FileText,
  BarChart3,
  ShieldCheck,
  Settings
];

export function AppShell({ locale, title, children }: { locale: Locale; title: string; children: React.ReactNode }) {
  const t = dictionaries[locale];

  return (
    <div className="min-h-screen bg-white">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-ink/10 bg-white p-4 lg:block">
        <a href={`/${locale}`} className="flex h-11 items-center overflow-hidden rounded-md bg-ink px-4 text-white ring-2 ring-signal/25">
          <RootfablinkWordmark variant="dark" size="compact" />
        </a>
        <nav className="mt-6 grid gap-1">
          {t.shell.navigation.map((label, index) => {
            const Icon = navigationIcons[index] ?? LayoutDashboard;
            return (
            <a key={label} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-steel hover:bg-cloud hover:text-ink" href="#">
              <Icon size={17} />
              {label}
            </a>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-ink/10 bg-white px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-signal">{t.shell.workspace}</p>
            <h1 className="truncate text-base font-bold text-ink sm:text-lg">{title}</h1>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 text-steel" aria-label={t.shell.notifications}>
            <Bell size={18} />
          </button>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-ink/10 bg-white px-4 py-3 lg:hidden" aria-label={t.shell.navigationLabel}>
          {t.shell.navigation.map((label, index) => {
            const Icon = navigationIcons[index] ?? LayoutDashboard;
            return (
            <a key={label} className="inline-flex shrink-0 items-center gap-2 rounded-md border border-ink/10 px-3 py-2 text-sm font-medium text-steel" href="#">
              <Icon size={16} />
              {label}
            </a>
            );
          })}
        </nav>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
