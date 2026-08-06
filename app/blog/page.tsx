import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/article-card";
import { EmptyJournalState } from "@/components/blog/empty-journal-state";
import { getPublishedArticles } from "@/content/articles";
import { createPageMetadata } from "@/lib/site-metadata";

const publishedArticles = getPublishedArticles();
const hasPublishedArticles = publishedArticles.length > 0;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Blog — Upbring",
    description: hasPublishedArticles
      ? "Read published editorial articles from Upbring."
      : "Editorial articles will appear here once they are ready for publication.",
    path: "/blog",
  }),
  robots: {
    index: hasPublishedArticles,
    follow: hasPublishedArticles,
  },
};

export default function Blog() {
  return (
    <main className="page-container py-20 md:py-28">
      {hasPublishedArticles ? (
        <div className="editorial-width">
          <h1 className="text-4xl md:text-5xl">Blog</h1>
          <div className="mt-10">
            {publishedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyJournalState />
      )}
    </main>
  );
}
