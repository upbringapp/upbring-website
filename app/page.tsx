import type { Metadata } from "next";
import ExperiencePage from "@/app/experience/page";
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
      name: "Nurava Technologies Private Limited",
      url: `${siteOrigin}/`,
      logo: `${siteOrigin}/logo.png`,
      sameAs: [
        "https://instagram.com/withnasbring",
        "https://facebook.com/withnasbring",
        "https://x.com/withnasbring",
        "https://youtube.com/@withnasbring",
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

      <ExperiencePage />
    </>
  );
}
