import type { Metadata } from "next";
import {
  getPublishedArticles,
  type ArticleRecord,
} from "../content/articles.ts";
import {
  createSocialPreviewImageMetadata,
  siteOrigin,
  socialPreviewImagePath,
} from "./site-metadata.ts";

export function getArticleUrl(article: ArticleRecord) {
  return new URL(article.canonicalPath, siteOrigin).toString();
}

export function createArticleSitemapEntries(
  records?: readonly ArticleRecord[],
) {
  return getPublishedArticles(records).map((article) => ({
    url: getArticleUrl(article),
    lastModified: article.updatedAt ?? article.publishedAt ?? undefined,
  }));
}

function getArticleSocialImage(article: ArticleRecord) {
  return article.socialImage ?? socialPreviewImagePath;
}

export function createArticleMetadata(article: ArticleRecord): Metadata {
  const url = getArticleUrl(article);
  const socialImageMetadata = createSocialPreviewImageMetadata(
    getArticleSocialImage(article),
  );

  return {
    title: {
      absolute: `${article.title} — Nasbring`,
    },
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "Nasbring",
      locale: "en_US",
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt ?? undefined,
      authors: [article.author],
      section: article.category,
      ...socialImageMetadata,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
      ...socialImageMetadata,
    },
  };
}

export function createArticleStructuredData(article: ArticleRecord) {
  const url = getArticleUrl(article);
  const socialImage = getArticleSocialImage(article);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: {
      "@type": "Person",
      name: article.author,
    },
    articleSection: article.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(socialImage
      ? { image: new URL(socialImage, siteOrigin).toString() }
      : {}),
  };
}
