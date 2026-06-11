import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upbring | Raising Curious Minds",
  description:
    "Helping families nurture curiosity, character and a lifelong love of learning.",

  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/apple-touch-icon.png",
},

  openGraph: {
    title: "Upbring | Raising Curious Minds",
    description:
      "Helping families nurture curiosity, character and a lifelong love of learning.",
    url: "https://upbringapp.com",
    siteName: "Upbring",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Upbring",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Upbring | Raising Curious Minds",
    description:
      "Helping families nurture curiosity, character and a lifelong love of learning.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-ZJEPH34628"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-ZJEPH34628');
  `}
</Script>
        {children}
      </body>
    </html>
  );
}