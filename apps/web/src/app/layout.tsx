import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RootFabLink | Global B2B Marketplace for Manufacturers, Buyers and Trade Services",
    template: "%s | RootFabLink"
  },
  description:
    "RootFabLink connects buyers, manufacturers, verified suppliers, logistics providers and trade service teams through a global B2B marketplace for sourcing, RFQs, product discovery and secure trade workflows.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "RootFabLink | Global B2B Marketplace for Manufacturers, Buyers and Trade Services",
    description:
      "RootFabLink connects buyers, manufacturers, verified suppliers, logistics providers and trade service teams through a global B2B marketplace for sourcing, RFQs, product discovery and secure trade workflows.",
    siteName: "RootFabLink",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RootFabLink | Global B2B Marketplace for Manufacturers, Buyers and Trade Services",
    description:
      "RootFabLink connects buyers, manufacturers, verified suppliers, logistics providers and trade service teams through a global B2B marketplace for sourcing, RFQs, product discovery and secure trade workflows."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
