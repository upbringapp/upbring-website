import Link from "next/link";

const privacyPrinciples = [
  "Nasbring does not use marks, rankings, or comparisons.",
  "The waitlist currently collects an email address.",
  "Parents can access the full Privacy Policy.",
  "Privacy & Trust is treated as a first-class product area.",
] as const;

export function PrivacyTrustSection() {
  return (
    <section
      aria-labelledby="privacy-trust-heading"
      className="border-y border-[var(--border)] bg-white"
    >
      <div className="page-container section-spacing">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="max-w-md">
            <h2
              id="privacy-trust-heading"
              className="text-4xl md:text-5xl"
            >
              Privacy &amp; Trust
            </h2>
            <p className="mt-5 text-lg text-[var(--text-secondary)]">
              Clear principles, stated simply.
            </p>
            <Link
              href="/privacy"
              className="mt-7 inline-flex min-h-11 items-center border-b border-[var(--text-primary)] text-sm font-medium"
            >
              Read the full Privacy Policy
            </Link>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
            {privacyPrinciples.map((principle) => (
              <li
                key={principle}
                className="min-h-36 bg-white p-6 text-base leading-relaxed text-[var(--text-secondary)] md:p-8 md:text-lg"
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
