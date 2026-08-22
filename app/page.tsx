import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSequence } from "@/components/sections/trust-sequence";
import { HomeSection } from "@/components/sections/home-section";
import { CanopySection } from "@/components/sections/canopy-section";
import { WithinSection } from "@/components/sections/within-section";
import { PrivacyTrustSection } from "@/components/sections/privacy-trust-section";
import { ClosingConversionSection } from "@/components/sections/closing-conversion-section";
import {
  createPageMetadata,
  homepageDescription,
  homepageTitle,
  siteOrigin,
} from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: homepageTitle,
  description: homepageDescription,
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: "Upbring",
      url: `${siteOrigin}/`,
      logo: `${siteOrigin}/logo.jpg`,
      sameAs: [
        "https://instagram.com/officialupbring",
        "https://youtube.com/@officialupbring",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: "Nasbring",
      url: `${siteOrigin}/`,
      publisher: {
        "@id": `${siteOrigin}/#organization`,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <main className="text-gray-900">
        <HeroSection />
        <TrustSequence />
        <HomeSection />
        <CanopySection />
        <WithinSection />
        <PrivacyTrustSection />
        <ClosingConversionSection />
      </main>
    </>
  );
}
