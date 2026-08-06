import type { ArticleRecord } from "@/content/articles";

export function ArticleBody({ article }: { article: ArticleRecord }) {
  return (
    <div className="mt-10 space-y-6 text-lg leading-8 text-[var(--text-secondary)]">
      {article.body.map((block, index) =>
        block.type === "heading" ? (
          <h2
            key={`${block.type}-${index}`}
            className="pt-4 text-2xl text-[var(--text-primary)] md:text-3xl"
          >
            {block.text}
          </h2>
        ) : (
          <p key={`${block.type}-${index}`}>{block.text}</p>
        ),
      )}
    </div>
  );
}
