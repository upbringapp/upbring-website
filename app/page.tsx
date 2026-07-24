import Script from "next/script";
import {
  Telescope,
  Shield,
  Heart,
  Tent,
  Infinity,
  Pencil,
} from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustSequence } from "@/components/sections/trust-sequence";

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
{/* What is Upbring */}

<section className="max-w-5xl mx-auto px-6 py-24">

  <div className="text-center">

    <h2 className="text-4xl md:text-5xl font-bold mb-8">
      What is Upbring?
    </h2>

    <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">

      Upbring is an AI-powered learning companion for curious families.

      <br /><br />

      Helping parents and children learn together through conversations,
      curiosity and meaningful guidance.

      <br /><br />

     Less pressure.
<br />
More conversations.

<br /><br />

Less comparison.
<br />
More curiosity.

<br /><br />

Less fear.
<br />
More confidence.
    </p>

  </div>

</section>
{/* Parent Companion */}

<section className="max-w-5xl mx-auto px-6 py-24">

  <div className="text-center mb-16">

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Parent Companion
    </h2>

    <p className="text-gray-500 text-lg">
      Small questions. Big conversations.
    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-8">

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • Sabse tough question kaun sa laga aaj?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
      • Galti se aaj tumhe kya seekh mili?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • What made you smile today?
    </div>

    <div className="bg-white p-8 rounded-3xl border shadow-sm">
       • If you had to teach me just one question from today&apos;s paper, which one would it be?
    </div>

  </div>

</section>
      {/* Canopy Community */}

      <section
        id="canopy"
        className="max-w-6xl mx-auto scroll-mt-24 px-6 pb-28"
      >

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">
  Canopy Community
</h2>

          <p className="text-gray-500 mt-5">
  Parenting is better when families learn and grow together.
</p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Curiosity */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300">

            <Telescope className="w-8 h-8 text-blue-500 mb-6" />

            <h3 className="text-3xl font-bold mb-4">
              Curiosity
            </h3>

            <p className="text-gray-600">
              Looking further and discovering the unknown.
              Every child is born curious—we nurture that spark.
            </p>

          </div>


          {/* Character */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <div className="relative w-10 h-10 mb-6">

              <Shield className="w-10 h-10 text-rose-500" />

              <Heart className="absolute w-3 h-3 text-rose-500 fill-rose-500 top-[13px] left-[13px]" />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Character
            </h3>

            <p className="text-gray-600">
              Strong values with a caring heart.
              Empathy and integrity matter more than marks.
            </p>

          </div>


          {/* Canopy */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <Tent className="w-8 h-8 text-green-600 mb-6" />

            <h3 className="text-3xl font-bold mb-4">
              Canopy
            </h3>

            <p className="text-gray-600">
              A safe ecosystem where families support,
              connect and grow together.
            </p>

          </div>


          {/* Lifelong Learning */}

          <div className="bg-white p-10 rounded-3xl border shadow-sm">

            <div className="flex gap-2 mb-6">

              <Infinity className="w-7 h-7 text-purple-500" />

              <Pencil className="w-5 h-5 text-amber-500" />

            </div>

            <h3 className="text-3xl font-bold mb-4">
              Lifelong Learning
            </h3>

            <p className="text-gray-600">
              Learning never ends. Growth and reflection continue for life.
            </p>

          </div>

        </div>

      </section>

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
