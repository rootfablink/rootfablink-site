"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import type { Locale } from "@rootfablink/i18n";

export function GoogleOAuthButton({ locale, callbackUrl, configured }: { locale: Locale; callbackUrl: string; configured: boolean }) {
  const [loading, setLoading] = useState(false);
  const tr = locale === "tr";

  if (!configured) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      aria-label={tr ? "Google ile devam et" : "Continue with Google"}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-ink/15 bg-white px-4 text-sm font-bold text-ink transition hover:border-signal/40 hover:bg-cloud disabled:cursor-wait disabled:opacity-65"
    >
      <GoogleMark />
      {loading ? (tr ? "Google'a yönlendiriliyor..." : "Redirecting to Google...") : tr ? "Google ile devam et" : "Continue with Google"}
    </button>
  );
}

export function AuthDivider({ locale }: { locale: Locale }) {
  return (
    <div className="my-5 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-ink/10" />
      <span className="text-xs font-bold uppercase text-steel">{locale === "tr" ? "veya" : "or"}</span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

function GoogleMark() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-sm font-black text-[#4285f4]" aria-hidden="true">
      G
    </span>
  );
}
