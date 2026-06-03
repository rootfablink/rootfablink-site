"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelpCircle, KeyRound, X } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { saveDemoSession } from "@/lib/auth-demo-storage";
import { cn } from "@/lib/utils";

export function LoginExperience({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = tr ? "E-posta zorunludur." : "Email is required.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = tr ? "Geçerli bir e-posta girin." : "Enter a valid email.";
    if (!password) nextErrors.password = tr ? "Şifre zorunludur." : "Password is required.";
    if (password && password.length < 8) nextErrors.password = tr ? "Şifre en az 8 karakter olmalıdır." : "Password must be at least 8 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    saveDemoSession({
      email: email.trim(),
      locale,
      authenticated: true,
      provider: "email",
      createdAt: new Date().toISOString()
    });
    router.push(`/${locale}/account`);
  };

  return (
    <div className="rounded-md border border-ink/10 bg-white p-4 shadow-soft sm:p-6">
      <button
        type="button"
        onClick={() => setShowGoogleModal(true)}
        className="flex h-11 w-full items-center justify-center rounded-md border border-ink/15 bg-white text-sm font-bold text-ink hover:border-signal/40 hover:bg-cloud"
      >
        {tr ? "Google ile devam et" : "Continue with Google"}
      </button>

      <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-steel">
        <span className="h-px flex-1 bg-ink/10" />
        {tr ? "veya" : "or"}
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        {tr ? "E-posta" : "Email"}
        <input value={email} onChange={(event) => setEmail(event.target.value)} className={cn("h-11 rounded-md border px-3 font-normal outline-none focus:border-signal", errors.email ? "border-red-400" : "border-ink/15")} type="email" autoComplete="email" />
        {errors.email && <span className="text-xs font-semibold text-red-600">{errors.email}</span>}
      </label>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">
        {tr ? "Şifre" : "Password"}
        <input value={password} onChange={(event) => setPassword(event.target.value)} className={cn("h-11 rounded-md border px-3 font-normal outline-none focus:border-signal", errors.password ? "border-red-400" : "border-ink/15")} type="password" autoComplete="current-password" />
        {errors.password && <span className="text-xs font-semibold text-red-600">{errors.password}</span>}
      </label>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <Link href={`/${locale}/help-center`} className="inline-flex items-center gap-1 font-semibold text-steel hover:text-ink">
          <HelpCircle size={15} />
          {tr ? "Yardım merkezi" : "Help center"}
        </Link>
        <button type="button" className="font-semibold text-copper">{tr ? "Şifremi unuttum" : "Forgot password"}</button>
      </div>

      <button onClick={submit} className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-signal font-semibold text-white shadow-[0_12px_26px_rgba(249,115,22,0.24)] hover:bg-copper" type="button">
        <KeyRound size={17} />
        {tr ? "Giriş yap" : "Sign in"}
      </button>

      <Link href={`/${locale}/auth/register`} className="mt-3 flex min-h-11 w-full items-center justify-center rounded-md border border-ink/10 px-3 py-2 text-center text-sm font-bold text-ink hover:bg-cloud">
        {tr ? "Hesabınız yok mu? Hesap oluşturun" : "No account yet? Create account"}
      </Link>

      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-md bg-white p-5 shadow-[0_24px_80px_rgba(11,11,12,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-ink">{tr ? "Google ile devam et" : "Continue with Google"}</h2>
              <button type="button" onClick={() => setShowGoogleModal(false)} className="rounded-md p-1 text-steel hover:bg-cloud hover:text-ink" aria-label={tr ? "Kapat" : "Close"}>
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-steel">
              {tr ? "Google ile devam et özelliği yakında aktif olacaktır. Şimdilik e-posta ve şifre ile devam edebilirsiniz." : "Continue with Google will be available soon. For now, please continue with email and password."}
            </p>
            <button type="button" onClick={() => setShowGoogleModal(false)} className="mt-5 flex h-10 w-full items-center justify-center rounded-md bg-ink text-sm font-bold text-white hover:bg-copper">
              {tr ? "Tamam" : "OK"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
