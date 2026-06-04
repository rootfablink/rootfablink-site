"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type MarketplaceImageProps = {
  src?: string;
  alt: string;
  visualCategory?: string;
  title: string;
  className?: string;
};

function fallbackSvg(visualCategory: string, title: string) {
  const safeTitle = title.replace(/&/g, "and").slice(0, 34);
  const accent = visualCategory.includes("solar") ? "#2563eb" : visualCategory.includes("wall") ? "#f97316" : visualCategory.includes("truck") || visualCategory.includes("ship") ? "#0f766e" : "#111827";
  const shape = visualCategory.includes("solar")
    ? `<rect x="260" y="210" width="620" height="360" rx="22" fill="#123c69" stroke="${accent}" stroke-width="10"/><g stroke="#93c5fd" stroke-width="6">${[1, 2, 3, 4, 5].map((i) => `<line x1="${260 + i * 103}" y1="210" x2="${260 + i * 103}" y2="570"/>`).join("")}${[1, 2, 3].map((i) => `<line x1="260" y1="${210 + i * 90}" x2="880" y2="${210 + i * 90}"/>`).join("")}</g>`
    : visualCategory.includes("wall")
      ? `<rect x="210" y="180" width="780" height="430" rx="20" fill="#fff7ed" stroke="${accent}" stroke-width="10"/><path d="M250 280 C380 180 480 390 640 270 S820 300 950 210" fill="none" stroke="#a8a29e" stroke-width="20"/><path d="M250 440 C450 280 560 540 760 390 S880 420 950 360" fill="none" stroke="#d6d3d1" stroke-width="22"/>`
      : visualCategory.includes("truck")
        ? `<rect x="210" y="365" width="520" height="170" rx="16" fill="${accent}"/><rect x="730" y="410" width="210" height="125" rx="14" fill="#334155"/><circle cx="330" cy="575" r="55" fill="#111827"/><circle cx="805" cy="575" r="55" fill="#111827"/>`
        : visualCategory.includes("document")
          ? `<rect x="370" y="150" width="360" height="540" rx="20" fill="#fff" stroke="#94a3b8" stroke-width="10"/><path d="M430 270 H670 M430 350 H650 M430 430 H610" stroke="#64748b" stroke-width="18"/><circle cx="690" cy="580" r="86" fill="#fee2e2" stroke="${accent}" stroke-width="12"/>`
          : `<rect x="300" y="240" width="600" height="360" rx="38" fill="#e2e8f0" stroke="${accent}" stroke-width="12"/><path d="M390 360 H810 M390 455 H760 M390 535 H680" stroke="#94a3b8" stroke-width="22"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#f8fafc"/><rect x="70" y="70" width="1060" height="760" rx="34" fill="#fff" stroke="#e5e7eb" stroke-width="3"/>${shape}<text x="90" y="790" fill="#111827" font-family="Arial" font-size="38" font-weight="700">${safeTitle}</text><text x="90" y="840" fill="#64748b" font-family="Arial" font-size="24">B2B product visual</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function MarketplaceImage({ src, alt, visualCategory = "catalog_product", title, className }: MarketplaceImageProps) {
  const [failed, setFailed] = useState(false);
  const fallback = useMemo(() => fallbackSvg(visualCategory, title), [title, visualCategory]);
  const imageSrc = !failed && src ? src : fallback;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
