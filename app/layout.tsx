import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  createSocialPreviewImageMetadata,
  homepageDescription,
  homepageTitle,
  siteOrigin,
} from "@/lib/site-metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: homepageTitle,
    template: "%s — Upbring",
  },
  description: homepageDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: `${siteOrigin}/`,
    siteName: "Upbring",
    locale: "en_US",
    type: "website",
    ...createSocialPreviewImageMetadata(),
  },
  twitter: {
    card: "summary",
    title: homepageTitle,
    description: homepageDescription,
    ...createSocialPreviewImageMetadata(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-ZJEPH34628"
  strategy="afterInteractive"
/>

<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-ZJEPH34628');
    `,
  }}
/>

        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
