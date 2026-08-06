export type ArticleStatus = "draft" | "approved" | "published" | "withdrawn";

export type ArticleApprovalStatus =
  | "approved"
  | "requires-editorial-approval";

export type ArticleSourceType =
  | "locked-app-copy"
  | "approved-editorial-library"
  | "approved-marketing-copy"
  | "founder-approved-long-form";

export type ArticleBodyBlock = {
  type: "heading" | "paragraph";
  text: string;
};

export type ArticleRecord = {
  slug: string;
  title: string;
  description: string;
  status: ArticleStatus;
  publishedAt: string | null;
  updatedAt: string | null;
  author: string;
  category: string;
  readingTimeMinutes: number;
  body: readonly ArticleBodyBlock[];
  sourceType: ArticleSourceType;
  sourceReference: string;
  approvalStatus: ArticleApprovalStatus;
  socialImage: string | null;
  canonicalPath: `/blog/${string}`;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const placeholderBodyPattern =
  /(?:lorem ipsum|placeholder|requires editorial approval|coming soon)/i;

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}

export function validateArticleRecords(
  records: readonly ArticleRecord[],
): readonly ArticleRecord[] {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const article of records) {
    const reference = article.slug || "<missing slug>";

    if (!slugPattern.test(article.slug)) {
      errors.push(`${reference}: slug must use lowercase URL-safe words`);
    }

    if (slugs.has(article.slug)) {
      errors.push(`${reference}: duplicate slug`);
    }
    slugs.add(article.slug);

    if (article.canonicalPath !== `/blog/${article.slug}`) {
      errors.push(`${reference}: canonical path must match the slug`);
    }

    for (const [field, value] of [
      ["title", article.title],
      ["description", article.description],
      ["author", article.author],
      ["category", article.category],
      ["sourceReference", article.sourceReference],
    ] as const) {
      if (!value.trim()) {
        errors.push(`${reference}: ${field} is required`);
      }
    }

    if (
      !Number.isInteger(article.readingTimeMinutes) ||
      article.readingTimeMinutes < 1
    ) {
      errors.push(`${reference}: reading time must be a positive integer`);
    }

    for (const [field, value] of [
      ["publishedAt", article.publishedAt],
      ["updatedAt", article.updatedAt],
    ] as const) {
      if (value !== null && !isIsoDate(value)) {
        errors.push(`${reference}: ${field} must be a valid YYYY-MM-DD date`);
      }
    }

    if (
      article.publishedAt &&
      article.updatedAt &&
      article.updatedAt < article.publishedAt
    ) {
      errors.push(`${reference}: updatedAt cannot precede publishedAt`);
    }

    if (article.socialImage === "/og-image.jpg") {
      errors.push(`${reference}: stale social artwork cannot be connected`);
    }

    const bodyText = article.body.map((block) => block.text).join(" ").trim();
    const hasInvalidBlock = article.body.some((block) => !block.text.trim());

    if (article.status === "published") {
      if (article.approvalStatus !== "approved") {
        errors.push(`${reference}: published articles must be approved`);
      }

      if (!article.publishedAt) {
        errors.push(`${reference}: published articles require publishedAt`);
      }

      if (!bodyText || hasInvalidBlock) {
        errors.push(`${reference}: published articles require a complete body`);
      }

      if (placeholderBodyPattern.test(bodyText)) {
        errors.push(`${reference}: placeholder article bodies cannot be published`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid article records:\n${errors.join("\n")}`);
  }

  return records;
}

export function isPublishedArticle(article: ArticleRecord) {
  return article.status === "published" && article.approvalStatus === "approved";
}

export function getPublishedArticles(
  records: readonly ArticleRecord[] = articles,
) {
  return records.filter(isPublishedArticle);
}

export function getPublishedArticleBySlug(
  slug: string,
  records: readonly ArticleRecord[] = articles,
) {
  return records.find(
    (article) => article.slug === slug && isPublishedArticle(article),
  );
}

// Production remains intentionally empty until complete, traceable articles
// have both published status and explicit editorial approval.
const articleRecords = [] as const satisfies readonly ArticleRecord[];

export const articles = validateArticleRecords(articleRecords);
