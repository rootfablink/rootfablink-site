import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://rootfablink.com";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const title = "Rootfablink | Global B2B Platform for Manufacturers and Buyers";
const socialTitle = "Rootfablink | Global B2B Platform";
const description = "Rootfablink connects manufacturers, buyers, logistics providers and customs brokers through a global B2B platform for sourcing, RFQ management and international trade operations.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Rootfablink"
  },
  description,
  keywords: ["Rootfablink", "Global B2B Platform", "manufacturers", "buyers", "industrial sourcing", "RFQ", "logistics providers", "customs brokers", "international trade operations"],
  metadataBase: new URL(siteUrl),
  applicationName: "Rootfablink",
  authors: [{ name: "Rootfablink", url: siteUrl }],
  creator: "Rootfablink",
  publisher: "Rootfablink",
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
    title: socialTitle,
    description,
    url: siteUrl,
    siteName: "Rootfablink",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 300, alt: "Rootfablink" }]
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    images: ["/logo.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rootfablink",
    description: "Global B2B Platform",
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
