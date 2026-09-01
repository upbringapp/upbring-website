import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { ArticleHeader } from "@/components/blog/article-header";
import {
  getPublishedArticleBySlug,
  getPublishedArticles,
  getRelatedPublishedArticles,
} from "@/content/articles";
import {
  createArticleMetadata,
  createArticleStructuredData,
} from "@/lib/blog";

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createArticleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const structuredData = createArticleStructuredData(article);
  const relatedArticles = getRelatedPublishedArticles(article.slug);

  return (
    <main className="page-container py-20 md:py-28">
      <article className="editorial-width">
        <script
          id="article-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ArticleHeader article={article} />
        <ArticleBody article={article} />
        <aside className="mt-16 border-t border-[var(--border)] pt-10">
          <h2 className="text-2xl md:text-3xl">Continue reading</h2>
          <div className="mt-6 space-y-4">
            {relatedArticles.map((relatedArticle) => (
              <p key={relatedArticle.slug}>
                <Link
                  className="text-lg text-[var(--text-primary)] underline decoration-[var(--border)] underline-offset-4"
                  href={relatedArticle.canonicalPath}
                >
                  {relatedArticle.title}
                </Link>
              </p>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--text-tertiary)]">
            <Link href="/blog">All Nasbring articles</Link>
            {" · "}
            <Link href="/">Explore Nasbring</Link>
          </p>
        </aside>
      </article>
    </main>
  );
}
