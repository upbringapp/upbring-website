import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Blog — Upbring",
    description:
      "Editorial articles will appear here once they are ready for publication.",
    path: "/blog",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function Blog() {
  return (
    <main className="page-container py-20 md:py-28">
      <div className="editorial-width">
        <h1 className="text-4xl md:text-5xl">Blog</h1>
        <p className="mt-5 text-lg text-[var(--text-secondary)]">
          Editorial articles will appear here once they are ready for
          publication.
        </p>
      </div>
    </main>
  );
}
