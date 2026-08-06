import type { ArticleRecord } from "@/content/articles";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00.000Z`));
}

export function ArticleHeader({ article }: { article: ArticleRecord }) {
  return (
    <header>
      <p className="text-sm text-[var(--text-tertiary)]">{article.category}</p>
      <h1 className="mt-4 text-4xl md:text-5xl">{article.title}</h1>
      <p className="mt-5 text-lg text-[var(--text-secondary)]">
        {article.description}
      </p>
      <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y border-[var(--border)] py-4 text-sm text-[var(--text-secondary)]">
        <div className="flex gap-2">
          <dt>By</dt>
          <dd>{article.author}</dd>
        </div>
        <div className="flex gap-2">
          <dt>Published</dt>
          <dd>
            <time dateTime={article.publishedAt ?? undefined}>
              {article.publishedAt ? formatDate(article.publishedAt) : null}
            </time>
          </dd>
        </div>
        {article.updatedAt ? (
          <div className="flex gap-2">
            <dt>Updated</dt>
            <dd>
              <time dateTime={article.updatedAt}>
                {formatDate(article.updatedAt)}
              </time>
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="sr-only">Reading time</dt>
          <dd>{article.readingTimeMinutes} min read</dd>
        </div>
      </dl>
    </header>
  );
}
