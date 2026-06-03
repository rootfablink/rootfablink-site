"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, HelpCircle, KeyRound } from "lucide-react";
import type { Locale } from "@rootfablink/i18n";
import { saveDemoSession } from "@/lib/auth-demo-storage";
import { cn } from "@/lib/utils";

export function LoginExperience({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [googleMessage, setGoogleMessage] = useState("");

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = tr ? "E-posta zorunludur." : "Email is required.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = tr ? "Geçerli bir e-posta girin." : "Enter a valid email.";
    if (!password) nextErrors.password = tr ? "Şifre zorunludur." : "Password is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    saveDemoSession({
      email: email.trim(),
      demoSession: true,
      createdAt: new Date().toISOString()
    });
    setMessage(tr ? "Demo oturum oluşturuldu. Gerçek kimlik doğrulama backend bağlantısı sonraki aşamada eklenecektir." : "Demo session created. Real authentication backend integration will be added in the next phase.");
  };

  return (
    <div className="rounded-md border border-ink/10 bg-white p-6 shadow-soft">
      <button
        type="button"
        onClick={() => setGoogleMessage(tr ? "Google ile giriş altyapısı hazırlanmıştır. OAuth bağlantısı backend kimlik doğrulama aşamasında etkinleştirilecektir." : "Google sign-in is prepared. OAuth will be enabled during the backend authentication phase.")}
        className="flex h-11 w-full items-center justify-center rounded-md border border-ink/15 bg-white text-sm font-bold text-ink hover:border-signal/40 hover:bg-cloud"
      >
        {tr ? "Google ile devam et" : "Continue with Google"}
      </button>
      {googleMessage && <p className="mt-3 rounded-md bg-cloud p-3 text-xs font-semibold leading-5 text-steel">{googleMessage}</p>}

      <div className="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-steel">
        <span className="h-px flex-1 bg-ink/10" />
        {tr ? "veya" : "or"}
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        {tr ? "E-posta" : "Email"}
        <input value={email} onChange={(event) => setEmail(event.target.value)} className={cn("h-11 rounded-md border px-3 font-normal outline-none focus:border-signal", errors.email ? "border-red-400" : "border-ink/15")} type="email" />
        {errors.email && <span className="text-xs font-semibold text-red-600">{errors.email}</span>}
      </label>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">
        {tr ? "Şifre" : "Password"}
        <input value={password} onChange={(event) => setPassword(event.target.value)} className={cn("h-11 rounded-md border px-3 font-normal outline-none focus:border-signal", errors.password ? "border-red-400" : "border-ink/15")} type="password" />
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

      <Link href={`/${locale}/auth/register`} className="mt-3 flex h-11 w-full items-center justify-center rounded-md border border-ink/10 text-sm font-bold text-ink hover:bg-cloud">
        {tr ? "Hesabınız yok mu? Hesap oluşturun" : "No account yet? Create account"}
      </Link>

      {message && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold leading-6 text-green-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            {message}
          </div>
          <Link href={`/${locale}/account`} className="mt-3 inline-flex rounded-md bg-ink px-3 py-2 text-xs font-bold text-white">
            {tr ? "Hesaba git" : "Go to account"}
          </Link>
        </div>
      )}
    </div>
  );
}
