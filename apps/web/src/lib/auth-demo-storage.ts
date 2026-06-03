"use client";

export type RegistrationDraft = {
  id: string;
  accountType: string;
  account: Record<string, string>;
  profile: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  status: "draft";
};

export type DemoSession = {
  email: string;
  locale?: string;
  authenticated?: true;
  provider?: "email" | "google";
  accountType?: string;
  companyName?: string;
  demoSession?: true;
  createdAt: string;
};

const registrationDraftsKey = "rootfablink_registration_drafts";
const demoSessionKey = "rootfablink_demo_session";
const demoUserKey = "rootfablink_demo_user";

function safeReadArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveRegistrationDraft(draft: RegistrationDraft) {
  if (typeof window === "undefined") return;
  const existing = safeReadArray<RegistrationDraft>(registrationDraftsKey);
  window.localStorage.setItem(registrationDraftsKey, JSON.stringify([draft, ...existing]));
}

export function getRegistrationDrafts() {
  return safeReadArray<RegistrationDraft>(registrationDraftsKey);
}

export function saveDemoSession(session: DemoSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(demoSessionKey, JSON.stringify(session));
  window.localStorage.setItem(demoUserKey, JSON.stringify(session));
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(demoSessionKey);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(demoSessionKey);
  window.localStorage.removeItem(demoUserKey);
}

export const authDemoStorageKeys = {
  registrationDrafts: registrationDraftsKey,
  demoSession: demoSessionKey,
  demoUser: demoUserKey,
  supplierIWall: "rootfablink_supplier_draft_iwall"
};
