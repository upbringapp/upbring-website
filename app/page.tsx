import Script from "next/script";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSequence } from "@/components/sections/trust-sequence";
import { HomeSection } from "@/components/sections/home-section";
import { CanopySection } from "@/components/sections/canopy-section";
import { WithinSection } from "@/components/sections/within-section";
import { PrivacyTrustSection } from "@/components/sections/privacy-trust-section";
import { ClosingConversionSection } from "@/components/sections/closing-conversion-section";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Upbring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upbring helps families nurture curiosity, character and lifelong learning."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Upbring for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upbring is for parents, children and educators seeking meaningful growth."
        }
      },
      {
        "@type": "Question",
        "name": "Is Upbring free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Early access to Upbring is currently free."
        }
      },
      {
        "@type": "Question",
        "name": "How can I join Upbring?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply enter your email address and join the early access waitlist."
        }
      }
    ]
  };

  return (
  <>
<Script
  id="faq-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>
    <Script
id="schema-org"
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify({
"@context": "https://schema.org",
"@type": "Organization",
name: "Upbring",
url: "https://upbringapp.com",
logo: "https://upbringapp.com/logo.jpg",
description:
"Helping families nurture curiosity, character and a lifelong of learning.",
sameAs: [
  "https://instagram.com/officialupbring",
  "https://youtube.com/@officialupbring"
],

contactPoint: {
  "@type": "ContactPoint",
  email: "hello@upbringapp.com",
  contactType: "customer support"
},

}),
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
