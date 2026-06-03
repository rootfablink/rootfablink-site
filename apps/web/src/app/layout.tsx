import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ROOTFABLINK | Global B2B Manufacturing and Trade Platform",
    template: "%s | ROOTFABLINK"
  },
  description:
    "ROOTFABLINK connects manufacturers, buyers, logistics providers, and trade service companies through one trusted global B2B infrastructure.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
