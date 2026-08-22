import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service — Nasbring",
  description: "Read the Nasbring Terms of Service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-5xl font-bold mb-10">Terms of Service</h1>

      <p className="mb-8">
        By using Nasbring, you agree to these terms and conditions.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Use of the Platform
      </h2>

      <p className="mb-8">
        Nasbring is designed to provide educational and family-focused content.
        Users are expected to use the platform responsibly.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Intellectual Property
      </h2>

      <p className="mb-8">
        Nasbring is a product of Nurava Technologies Private Limited, which
        owns its content, branding and materials unless otherwise stated.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Changes to Terms
      </h2>

      <p className="mb-8">
        These terms may be updated from time to time. Continued use of the
        platform constitutes acceptance of any changes.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Contact
      </h2>

      <p>
        For any questions regarding these terms, contact us at
        hello@nasbring.com
      </p>
    </main>
  );
}
