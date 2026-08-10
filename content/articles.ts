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

// Drafts may be prepared here, but public selectors expose only records with
// both published status and explicit editorial approval.
const articleRecords = [
  {
    slug: "noticing-without-concluding",
    title: "Noticing without concluding",
    description:
      "A reflection on noticing repeated moments over time without turning observations into fixed conclusions about a child.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "A child lingers over a question after the homework is finished. At dinner, they return to something mentioned earlier in the day. Another time, they move quickly past the same idea. A parent notices each of these moments, often without trying to. The moments are small, but they can feel as though they are telling us something.",
      },
      {
        type: "paragraph",
        text: "Perhaps they are. But one moment rarely tells the whole story. The challenge is not whether to notice. It is how to stay close to what happened without deciding too quickly what it means about the child.",
      },
      {
        type: "heading",
        text: "The space between seeing and deciding",
      },
      {
        type: "paragraph",
        text: "Noticing begins with the moment itself. A child asked three questions about how two ideas connect. They returned to a drawing after leaving it unfinished. They listened for a while before joining a conversation. These descriptions hold what could be seen or heard. They do not need to explain the child in order to preserve something worth remembering.",
      },
      {
        type: "paragraph",
        text: "Interpretation begins when we consider what a moment might mean. It can be useful, provided it remains a possibility. The questions may suggest an interest in relationships between ideas. Returning to the drawing may show that something about it stayed with them. Listening first may have mattered in that particular conversation. The language stays open because the evidence is still limited.",
      },
      {
        type: "paragraph",
        text: "A conclusion goes further. It settles on an explanation: this is what the moment means. A label goes further still. It turns the explanation into a fixed account of who the child is. The movement can happen quietly—from “they spent time connecting these ideas” to “they are an analytical child,” or from “they found this task difficult today” to “they are not interested in this subject.” The first statement describes an event. The later statements ask one event to carry much more.",
      },
      {
        type: "heading",
        text: "One moment is still one moment",
      },
      {
        type: "paragraph",
        text: "The same behaviour can appear in different circumstances. A child may stay with a question because the subject caught their attention, because the wording was unfamiliar, because they wanted more time, or for a reason that is not visible at all. A moment can be genuine without being a complete explanation.",
      },
      {
        type: "paragraph",
        text: "This is why context matters. What was happening around the observation? Was the moment familiar or unusual? Has something similar appeared elsewhere, or is this the first time? The purpose of those questions is not to solve the child. It is to keep the observation from becoming larger than the evidence beneath it.",
      },
      {
        type: "paragraph",
        text: "Consider a child who asks to begin an activity again after making a mistake. On its own, the moment does not establish persistence, worry, confidence, or perfectionism. It tells us that, on this occasion, they wanted to start again. If a similar response appears across different activities and over a longer period, a pattern may become worth noticing. Even then, the pattern describes what has recurred. It does not define a personality or predict what comes next.",
      },
      {
        type: "heading",
        text: "What repetition can show",
      },
      {
        type: "paragraph",
        text: "Patterns become meaningful through consistency rather than intensity. A vivid moment can stay in the mind, yet what repeats quietly across months may offer a steadier view. A child might return to questions that connect one idea with another in science, mathematics, and everyday conversation. Seen together, those moments may suggest that relationships between ideas often hold their attention.",
      },
      {
        type: "paragraph",
        text: "The careful word is “may.” Repetition gives an observation more context, but it does not turn it into certainty. A pattern can say, “This has appeared more than once.” It cannot, by itself, say, “This is who the child is.” It can make space for recognition without becoming a profile, a prediction, or a final account.",
      },
      {
        type: "paragraph",
        text: "Looking over time also makes room for variation. A child may return to an idea in one setting and leave it quickly in another. They may speak readily on one day and remain quiet on the next. These moments do not have to cancel one another out. They can sit beside each other as parts of a story that is still unfolding.",
      },
      {
        type: "heading",
        text: "The place of Pause",
      },
      {
        type: "paragraph",
        text: "Not every observation needs an immediate conclusion. Sometimes the most faithful response is to let a thought remain unfinished. Pause creates that space: not another explanation, but a moment in which the parent does not have to decide what the observation means.",
      },
      {
        type: "paragraph",
        text: "This is not a refusal to understand. It is an acknowledgement that understanding may need more than the present moment can offer. A quiet question can be carried for a while. Does this return in another context? What changes around it? What stays consistent? The answer does not have to be produced on demand.",
      },
      {
        type: "paragraph",
        text: "Pause also allows the original detail to remain visible. “They looked back at the diagram twice before answering” holds a different kind of truth from “they learn visually.” “They asked how this idea connects to yesterday’s lesson” is more precise than “they always think deeply.” The detail can be remembered without being turned into an identity.",
      },
      {
        type: "heading",
        text: "Keeping the story open",
      },
      {
        type: "paragraph",
        text: "A parent does not need to stop interpreting altogether. Interpretation is part of trying to understand what we see. The distinction lies in how firmly we hold it. “I wonder whether…” leaves room for another moment. “This proves…” closes that room. One treats meaning as something that may emerge; the other treats it as already settled.",
      },
      {
        type: "paragraph",
        text: "Over time, separate observations can begin to sit beside one another. Some will repeat. Some will remain singular. Some may look different when a new context appears. The aim is not to assemble them into a score or a fixed profile. It is to recognise what has genuinely been present while leaving the child larger than any description of them.",
      },
      {
        type: "paragraph",
        text: "Noticing, then, is both attentive and humble. It says: this happened, and it felt worth remembering. Interpretation says: this may be part of something. A conclusion should wait for evidence that can carry its weight. A label is not required at all.",
      },
      {
        type: "paragraph",
        text: "Patterns may become meaningful over time, but one moment rarely tells the whole story. There is value in seeing what is there—and in leaving enough space for what has not yet appeared.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: within-patterns-over-time, within-pause, within-just-arjun, within-story-so-far; upbring-lite/docs/02_editorial_bible/25_patterns_over_time.md, 14_pause.md, and 26_his_story_so_far.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/noticing-without-concluding",
  },
] as const satisfies readonly ArticleRecord[];

export const articles = validateArticleRecords(articleRecords);
