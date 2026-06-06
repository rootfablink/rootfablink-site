"use client";

import { Camera, FileUp, X } from "lucide-react";
import type { ReactNode } from "react";
import type { MarketplaceCopy } from "./marketplace-copy";

export function RootfablinkLensModal({ copy, open, onClose }: { copy: MarketplaceCopy; open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <ModalFrame title={copy.lens.title} onClose={onClose}>
      <div className="rounded-md border border-dashed border-signal/40 bg-cloud p-6 text-center">
        <Camera className="mx-auto text-copper" size={34} />
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-steel">{copy.lens.text}</p>
        <label className="mx-auto mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white">
          <FileUp size={17} />
          {copy.lens.upload}
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>
    </ModalFrame>
  );
}

export function RFQQuickModal({ copy, open, onClose }: { copy: MarketplaceCopy; open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <ModalFrame title={copy.rfqModal.title} onClose={onClose}>
      <div className="grid gap-3">
        {[copy.rfqModal.product, copy.rfqModal.quantity, copy.rfqModal.destination].map((placeholder) => (
          <input key={placeholder} className="h-11 rounded-md border border-ink/10 px-3 text-sm" placeholder={placeholder} />
        ))}
        <textarea className="min-h-28 rounded-md border border-ink/10 p-3 text-sm" placeholder={copy.rfqModal.message} />
        <div className="rounded-md border border-dashed border-ink/15 bg-cloud p-4 text-sm font-semibold text-steel">{copy.rfqModal.attachment}</div>
        <p className="text-sm leading-6 text-steel">{copy.rfqModal.note}</p>
        <button type="button" disabled className="cursor-not-allowed rounded-md bg-ink/35 px-4 py-2 text-sm font-bold text-white">
          {copy.rfqModal.submit}
        </button>
      </div>
    </ModalFrame>
  );
}

function ModalFrame({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/55 px-4 py-6">
      <div className="w-full max-w-xl rounded-md bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-md border border-ink/10 text-ink hover:bg-cloud">
            <X size={18} />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
