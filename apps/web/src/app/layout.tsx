import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RootFabLink | Global B2B Manufacturing, Sourcing and Trade Platform",
    template: "%s | RootFabLink"
  },
  description:
    "RootFabLink connects manufacturers, suppliers, buyers, logistics providers and trade service teams through a global B2B infrastructure for sourcing, RFQs, verification and international trade workflows.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "RootFabLink | Global B2B Manufacturing, Sourcing and Trade Platform",
    description:
      "RootFabLink connects manufacturers, suppliers, buyers, logistics providers and trade service teams through a global B2B infrastructure for sourcing, RFQs, verification and international trade workflows.",
    siteName: "RootFabLink",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RootFabLink | Global B2B Manufacturing, Sourcing and Trade Platform",
    description:
      "RootFabLink connects manufacturers, suppliers, buyers, logistics providers and trade service teams through a global B2B infrastructure for sourcing, RFQs, verification and international trade workflows."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
