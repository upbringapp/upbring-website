import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy — Nasbring",
  description:
    "Read the Nasbring Privacy Policy, including information about waitlist email collection and how information is used.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-5xl font-bold mb-10">Privacy Policy</h1>

      <p className="mb-8">
        Nasbring is operated by Nurava Technologies Private Limited. Nasbring
        respects your privacy. We only collect information you voluntarily
        provide, such as your email address when joining our waitlist.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Information We Collect
      </h2>

      <p className="mb-8">
        We may collect your email address and basic analytics data to improve
        our services.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        How We Use Information
      </h2>

      <p className="mb-8">
        We use information to communicate updates and improve the Nasbring
        experience.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-4">
        Contact
      </h2>

      <p>
        For privacy-related questions, contact us at hello@nasbring.com
      </p>
    </main>
  );
}
