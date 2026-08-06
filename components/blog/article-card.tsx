import Link from "next/link";
import type { ArticleRecord } from "@/content/articles";

export function ArticleCard({ article }: { article: ArticleRecord }) {
  return (
    <article className="border-t border-[var(--border)] py-8 first:border-t-0 first:pt-0">
      <p className="text-sm text-[var(--text-tertiary)]">
        {article.category} · {article.readingTimeMinutes} min read
      </p>
      <h2 className="mt-3 text-2xl md:text-3xl">
        <Link href={article.canonicalPath}>{article.title}</Link>
      </h2>
      <p className="mt-3 text-base text-[var(--text-secondary)] md:text-lg">
        {article.description}
      </p>
    </article>
  );
}
