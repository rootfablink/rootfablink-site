"use client";

export const mockStorageKeys = {
  registrationDrafts: "rootfablink_registration_drafts",
  supplierDrafts: "rootfablink_supplier_drafts",
  buyerDrafts: "rootfablink_buyer_drafts",
  productDrafts: "rootfablink_product_drafts",
  patternDrafts: "rootfablink_pattern_drafts",
  rfqDrafts: "rootfablink_rfq_drafts",
  messagesMock: "rootfablink_messages_mock",
  preferences: "rootfablink_preferences"
} as const;

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getDrafts<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  return safeJsonParse<T[]>(window.localStorage.getItem(key), []);
}

export function saveDraft<T extends { id: string; updatedAt?: string }>(key: string, draft: T): T {
  if (typeof window === "undefined") return draft;
  const existing = getDrafts<T>(key);
  const nextDraft = { ...draft, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(key, JSON.stringify([nextDraft, ...existing.filter((item) => item.id !== draft.id)]));
  return nextDraft;
}

export function updateDraft<T extends { id: string }>(key: string, id: string, updater: (draft: T) => T): T | null {
  if (typeof window === "undefined") return null;
  const existing = getDrafts<T>(key);
  const current = existing.find((item) => item.id === id);
  if (!current) return null;
  const updated = updater(current);
  window.localStorage.setItem(key, JSON.stringify(existing.map((item) => (item.id === id ? updated : item))));
  return updated;
}

export function deleteDraft(key: string, id: string) {
  if (typeof window === "undefined") return;
  const existing = getDrafts<{ id: string }>(key);
  window.localStorage.setItem(key, JSON.stringify(existing.filter((item) => item.id !== id)));
}
