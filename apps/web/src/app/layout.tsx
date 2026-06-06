import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://rootfablink.com";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const title = "RootFabLink | Türkiye B2B Marketplace";
const description = "RootFabLink connects manufacturers, suppliers, logistics providers and customs brokers through a global B2B marketplace.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | RootFabLink"
  },
  description,
  keywords: ["RootFabLink", "B2B marketplace", "manufacturers", "suppliers", "industrial sourcing", "logistics", "customs brokers", "Türkiye export"],
  metadataBase: new URL(siteUrl),
  applicationName: "RootFabLink",
  authors: [{ name: "RootFabLink", url: siteUrl }],
  creator: "RootFabLink",
  publisher: "RootFabLink",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "RootFabLink",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 300, alt: "RootFabLink" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RootFabLink",
    alternateName: "Rootfablink",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    email: "info@rootfablink.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@rootfablink.com",
        availableLanguage: ["English", "Turkish", "Arabic", "German", "French", "Spanish", "Chinese", "Russian", "Japanese"]
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@rootfablink.com"
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
