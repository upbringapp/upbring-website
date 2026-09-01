import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/article-card";
import { EmptyJournalState } from "@/components/blog/empty-journal-state";
import { getPublishedArticles } from "@/content/articles";
import { createPageMetadata } from "@/lib/site-metadata";

const publishedArticles = getPublishedArticles();
const hasPublishedArticles = publishedArticles.length > 0;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Blog — Nasbring",
    description: hasPublishedArticles
      ? "Thoughtful articles for parents about curiosity, family conversation, everyday learning, and noticing a child without rushing to conclusions."
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
          <h1 className="text-4xl md:text-5xl">Notes for growing alongside them</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Thoughtful reflections on curiosity, family conversation, everyday
            learning, and what becomes visible when we take time to notice.
          </p>
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
