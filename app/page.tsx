import Script from "next/script";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSequence } from "@/components/sections/trust-sequence";
import { HomeSection } from "@/components/sections/home-section";
import { CanopySection } from "@/components/sections/canopy-section";

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

      <section
        id="within"
        aria-labelledby="within-heading"
        className="page-container section-spacing scroll-mt-24"
      >
        <div className="editorial-width">
          <h2 id="within-heading" className="text-4xl md:text-5xl">
            Within
          </h2>
          <p className="mt-5 text-lg text-[var(--text-secondary)] md:text-xl">
            What we’ve noticed so far — without rushing to conclusions.
          </p>

          <ol className="mt-10 overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-white">
            {[
              "Patterns Over Time",
              "Pause",
              "Just Arjun",
              "Moments",
              "Arjun’s Story So Far",
            ].map((label, index) => (
              <li
                key={label}
                className="flex min-h-16 items-center gap-4 border-b border-[var(--border)] px-6 py-4 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="text-sm tabular-nums text-[var(--text-tertiary)]"
                >
                  {index + 1}
                </span>
                <span className="font-heading text-lg text-[var(--text-primary)]">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
    </>
  );
}
