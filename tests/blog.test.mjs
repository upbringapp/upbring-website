import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  articles,
  getPublishedArticleBySlug,
  getPublishedArticles,
  validateArticleRecords,
} from "../content/articles.ts";
import {
  createArticleMetadata,
  createArticleSitemapEntries,
  createArticleStructuredData,
  getArticleUrl,
} from "../lib/blog.ts";
import { socialPreviewImagePath } from "../lib/site-metadata.ts";

function articleFixture(overrides = {}) {
  return {
    slug: "a-carefully-reviewed-article",
    title: "A Carefully Reviewed Article",
    description: "A complete description for a reviewed editorial article.",
    status: "published",
    publishedAt: "2026-08-06",
    updatedAt: null,
    author: "Upbring Editorial",
    category: "Families",
    readingTimeMinutes: 5,
    body: [
      {
        type: "paragraph",
        text: "This test-only body represents complete approved editorial material.",
      },
    ],
    sourceType: "founder-approved-long-form",
    sourceReference: "Test fixture only",
    approvalStatus: "approved",
    socialImage: null,
    canonicalPath: "/blog/a-carefully-reviewed-article",
    ...overrides,
  };
}

test("production contains fifteen traceable drafts and no public articles", () => {
  assert.deepEqual(
    articles.map((article) => article.slug),
    [
      "noticing-without-concluding",
      "learning-beyond-the-notebook",
      "conversation-before-correctness",
      "making-as-a-form-of-understanding",
      "a-weekly-letter-not-a-report",
      "curiosity-without-an-agenda",
      "a-question-worth-keeping",
      "small-rituals-deep-roots",
      "worth-revisiting",
      "keeping-the-small-moments",
      "before-we-decide-what-it-means",
      "more-than-a-pattern",
      "a-story-still-being-written",
      "one-thing-worth-talking-about",
      "what-a-summary-should-leave-out",
    ],
  );

  for (const article of articles) {
    assert.equal(article.status, "draft");
    assert.equal(article.approvalStatus, "requires-editorial-approval");
    assert.equal(article.publishedAt, null);
    assert.equal(article.socialImage, null);
  }

  assert.deepEqual(getPublishedArticles(), []);
});

test("only published approved articles are publicly selectable", () => {
  const records = [
    articleFixture(),
    articleFixture({
      slug: "draft-article",
      canonicalPath: "/blog/draft-article",
      status: "draft",
      approvalStatus: "approved",
    }),
    articleFixture({
      slug: "unapproved-article",
      canonicalPath: "/blog/unapproved-article",
      approvalStatus: "requires-editorial-approval",
    }),
    articleFixture({
      slug: "withdrawn-article",
      canonicalPath: "/blog/withdrawn-article",
      status: "withdrawn",
    }),
  ];

  assert.deepEqual(
    getPublishedArticles(records).map((article) => article.slug),
    ["a-carefully-reviewed-article"],
  );
});

test("unknown, draft, unapproved and withdrawn slugs are not public", () => {
  const records = [
    articleFixture({ status: "draft" }),
    articleFixture({
      slug: "unapproved-article",
      canonicalPath: "/blog/unapproved-article",
      approvalStatus: "requires-editorial-approval",
    }),
    articleFixture({
      slug: "withdrawn-article",
      canonicalPath: "/blog/withdrawn-article",
      status: "withdrawn",
    }),
  ];

  assert.equal(getPublishedArticleBySlug("unknown", records), undefined);
  assert.equal(
    getPublishedArticleBySlug("a-carefully-reviewed-article", records),
    undefined,
  );
  assert.equal(
    getPublishedArticleBySlug("unapproved-article", records),
    undefined,
  );
  assert.equal(
    getPublishedArticleBySlug("withdrawn-article", records),
    undefined,
  );
});

test("only published approved articles enter the sitemap", () => {
  const published = articleFixture();
  const entries = createArticleSitemapEntries([
    published,
    articleFixture({
      slug: "draft-article",
      canonicalPath: "/blog/draft-article",
      status: "draft",
    }),
  ]);

  assert.deepEqual(entries, [
    {
      url: getArticleUrl(published),
      lastModified: published.publishedAt,
    },
  ]);
});

test("metadata and JSON-LD share the canonical record", () => {
  const article = articleFixture();
  const url = getArticleUrl(article);
  const metadata = createArticleMetadata(article);
  const structuredData = createArticleStructuredData(article);

  assert.equal(metadata.alternates.canonical, url);
  assert.equal(metadata.openGraph.url, url);
  assert.equal(structuredData.mainEntityOfPage["@id"], url);
  assert.equal(metadata.openGraph.title, structuredData.headline);
  assert.equal(metadata.openGraph.description, structuredData.description);
});

test("duplicate slugs fail validation", () => {
  assert.throws(
    () => validateArticleRecords([articleFixture(), articleFixture()]),
    /duplicate slug/,
  );
});

test("published articles require valid dates", () => {
  assert.throws(
    () => validateArticleRecords([articleFixture({ publishedAt: null })]),
    /require publishedAt/,
  );
  assert.throws(
    () =>
      validateArticleRecords([
        articleFixture({ publishedAt: "2026-02-30" }),
      ]),
    /valid YYYY-MM-DD date/,
  );
});

test("canonical paths must match slugs", () => {
  assert.throws(
    () =>
      validateArticleRecords([
        articleFixture({ canonicalPath: "/blog/a-different-slug" }),
      ]),
    /canonical path must match/,
  );
});

test("placeholder bodies cannot be published", () => {
  assert.throws(
    () =>
      validateArticleRecords([
        articleFixture({
          body: [{ type: "paragraph", text: "Placeholder article body" }],
        }),
      ]),
    /placeholder article bodies cannot be published/,
  );
});

test("stale social artwork cannot be connected", () => {
  assert.notEqual(socialPreviewImagePath, "/og-image.jpg");
  assert.throws(
    () =>
      validateArticleRecords([
        articleFixture({ socialImage: "/og-image.jpg" }),
      ]),
    /stale social artwork cannot be connected/,
  );
});

async function productionTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await productionTextFiles(fullPath)));
    } else if (/\.(?:ts|tsx|txt)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

test("excluded and withdrawn placeholder copy remains absent", async () => {
  const roots = ["app", "components", "content", "lib", "public"];
  const files = (
    await Promise.all(roots.map((root) => productionTextFiles(root)))
  ).flat();
  const source = (
    await Promise.all(files.map((file) => readFile(file, "utf8")))
  ).join("\n");
  const excludedCopy = [
    "Requires editorial approval",
    "Lorem ipsum",
    "Coming soon",
    "Quiet weeks are part of growing too.",
    "Small rituals. Deep roots.",
    "Curiosity doesn't keep a schedule.",
    "Curiosity doesn’t keep a schedule.",
    "Parenting in the AI Age",
  ];

  for (const copy of excludedCopy) {
    assert.equal(source.includes(copy), false, `Found excluded copy: ${copy}`);
  }
});
