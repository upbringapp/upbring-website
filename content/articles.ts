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
        text: "Not every observation needs an immediate conclusion. Sometimes a thought can remain unfinished. Pause creates that space: not another explanation, but a moment in which the parent does not have to decide what the observation means.",
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
  {
    slug: "learning-beyond-the-notebook",
    title: "Learning beyond the notebook",
    description:
      "A reflection on how learning can continue through everyday observation, conversation, and shared family experiences without becoming more homework.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "There is a familiar moment when the notebook closes. The last question has been answered, the pencil is put down, and the work of the day is finished. For a family, that ending matters. Home does not need to become an extension of the school day, and a parent does not need to turn the evening into another lesson.",
      },
      {
        type: "paragraph",
        text: "Still, an idea encountered in a notebook does not always remain there. It may appear again in the kitchen, on a walk, in something seen from a window, or in a question that arrives much later. Learning beyond the notebook begins with recognising those moments. It does not require creating them.",
      },
      {
        type: "heading",
        text: "When the work is complete",
      },
      {
        type: "paragraph",
        text: "Extending homework and allowing learning to continue are not the same thing. Extending homework adds another task: one more explanation, exercise, demonstration, or check for understanding. The original work may be finished, but the expectation continues. The evening still carries the shape of a lesson.",
      },
      {
        type: "paragraph",
        text: "Everyday noticing has a different shape. It begins with ordinary life as it already is. Water comes to a boil while dinner is being made. Sunlight reaches one part of a balcony before another. A shadow moves across the floor. Something from the day’s learning may quietly become visible, but nobody has to prepare materials, produce an answer, or prove that they remember.",
      },
      {
        type: "paragraph",
        text: "The difference is not only in what the family does. It is in what the moment asks of them. A lesson usually has somewhere to arrive. An observation can remain open. It may lead to a comment, a question, or nothing at all. Its value does not depend on turning it into an educational outcome.",
      },
      {
        type: "heading",
        text: "Noticing life, not arranging it",
      },
      {
        type: "paragraph",
        text: "Real Life Mein Dekho is grounded in a simple question: where might an idea appear naturally outside school? The emphasis is on “naturally.” A parent may recognise something connected to the day’s chapter because it is already present in family life. There is no experiment to organise and no project to complete.",
      },
      {
        type: "paragraph",
        text: "This keeps the parent beside the child rather than placing them in front of the child as another teacher. They can notice the same thing together. “The light reaches that plant first” is enough. It does not have to be followed by a detailed explanation or a series of questions. The connection can be offered lightly and left where it is.",
      },
      {
        type: "paragraph",
        text: "The child may continue the thought, notice something else, or let the moment pass without conversation. None of these responses needs to be corrected. The observation was an invitation, not a test hidden inside everyday life.",
      },
      {
        type: "heading",
        text: "A thought can continue",
      },
      {
        type: "paragraph",
        text: "A question can be one way an idea returns in family life. It may arise at dinner or while something ordinary is happening, without asking the child to repeat the chapter. A comment can do the same. The idea may simply be recognised, shared for a moment, and allowed to sit beside whatever the family is already doing.",
      },
      {
        type: "paragraph",
        text: "Here, conversation is simply another shared encounter with an idea. It may move somewhere unexpected or end after one exchange. Another family member may add something, or the subject may change. It does not need to become another piece of work. The learning has entered another part of the day without asking the evening to carry a lesson. Its place in family life can remain light.",
      },
      {
        type: "heading",
        text: "Doing something together",
      },
      {
        type: "paragraph",
        text: "There are also evenings when an idea is better carried through a small shared experience. Stepping outside for five minutes to notice where nature is using sunlight asks very little of a family. There is no chart to make, no result to present, and no preparation before curiosity can begin. The experience belongs to the time spent together.",
      },
      {
        type: "paragraph",
        text: "That boundary matters. An activity can appear gentle while still behaving like an assignment. It can require materials, instructions, a finished product, or an adult directing each step. A shared experience remains lighter. It can be brief. It can unfold differently from what anyone expected. It can end without evidence that it was completed well.",
      },
      {
        type: "paragraph",
        text: "Doing something together is not a strategy for making every part of family life productive. The point is connection, not busyness. The learning idea offers a reason to look, make, wonder, or talk alongside one another. It does not turn the parent into a supervisor or the child into a student for the rest of the evening.",
      },
      {
        type: "heading",
        text: "Leaving room for curiosity",
      },
      {
        type: "paragraph",
        text: "Curiosity does not always announce itself as a question. It may be a second look, a surprising comparison, a story offered at bedtime, or a thought that returns days later. When learning is allowed to enter family life naturally, these moments do not need to be captured and converted into further work. They can simply be noticed.",
      },
      {
        type: "paragraph",
        text: "This also means that not every lesson needs a life beyond the notebook. Some evenings are full. Some ideas do not reappear. Some conversations go elsewhere. Nothing has been missed. Not every invitation needs to be taken up.",
      },
      {
        type: "paragraph",
        text: "Learning beyond the notebook is therefore less about adding and more about recognising. An idea may reappear in ordinary life, become a brief conversation, or lead to one simple experience together. The moment does not need to become more than that.",
      },
      {
        type: "paragraph",
        text: "The notebook can stay closed. Family life can remain family life. And sometimes, without another lesson being planned, curiosity will continue on its own.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: home-real-life-mein-dekho, home-dinner-table-conversation, canopy-family-rhythms, canopy-do-this-together; upbring-lite/docs/02_editorial_bible/03_real_life_mein_dekho.md, 06_dinner_table_conversation.md, and 16_one_thing_worth_doing_together.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/learning-beyond-the-notebook",
  },
  {
    slug: "conversation-before-correctness",
    title: "Conversation before correctness",
    description:
      "A reflection on continuing a child’s learning through open conversation without turning the exchange into a test or revision session.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "After school, a familiar question often arrives easily: “What did you learn today?” It is a natural way for a parent to reach towards the part of the day they did not see. The question can begin with interest. Yet, depending on what follows, it can also begin to feel like a request for a report.",
      },
      {
        type: "paragraph",
        text: "A child may give a short answer, remember one detail, change the subject, or offer something that sounds incomplete. In that moment, the conversation can move in two directions. It can become a check on what was understood, or it can remain an invitation to keep thinking together.",
      },
      {
        type: "heading",
        text: "When interest starts to sound like checking",
      },
      {
        type: "paragraph",
        text: "The difference is not always in the first question. It often appears in the expectation underneath it. “Can you explain photosynthesis?” asks for something already learned to be produced correctly. “What are the raw materials?” asks for recall. Even without marks or a worksheet, the exchange has the shape of an assessment: the parent asks, the child answers, and the answer is judged against something known in advance.",
      },
      {
        type: "paragraph",
        text: "This can happen quietly. A follow-up such as “Are you sure?” may be intended to help, but it shifts the conversation towards correctness. Another question follows, then a clue, then the answer. What began as curiosity now has somewhere specific to arrive.",
      },
      {
        type: "paragraph",
        text: "A conversation stays open when the answer is not being used as evidence. The parent is not trying to find out how much the child remembers. They are making room for an idea to continue beyond the page. The question matters because of what it might open, not because of what it can verify.",
      },
      {
        type: "heading",
        text: "Understanding without examining",
      },
      {
        type: "paragraph",
        text: "Parents do not need every detail of a chapter in order to join a thoughtful exchange. A calm summary of the central idea can be enough. It offers a sense of what today’s learning meant without turning the parent into a second teacher or the conversation into revision.",
      },
      {
        type: "paragraph",
        text: "From there, a question can move away from the textbook and towards imagination. If people could make food using sunlight, how might an ordinary day change? There is no definition to retrieve and no single correct response. A child can begin with something improbable, reconsider it, or ask a different question in return. The conversation remains close to the idea while leaving the outcome unsettled.",
      },
      {
        type: "paragraph",
        text: "This is asking to understand rather than asking to test. The parent is listening for where the thought goes, not measuring it against an answer. They can take part as another person in the conversation—wondering, adding a possibility, or admitting that they do not know.",
      },
      {
        type: "heading",
        text: "The unfinished answer",
      },
      {
        type: "paragraph",
        text: "An answer does not have to be complete to keep a conversation alive. “Maybe everything would be different” is not yet a detailed thought, but it contains somewhere to go. “What might be different?” continues the idea without turning it into a correction. The next response may bring greater clarity, or it may move the conversation somewhere unexpected.",
      },
      {
        type: "paragraph",
        text: "Uncertainty can remain part of the exchange. A child may say “I don’t know,” and the conversation may pause there. A parent may say the same. Neither response has to be repaired immediately. Not knowing can be an honest position rather than a gap that someone must quickly fill.",
      },
      {
        type: "paragraph",
        text: "There is also room for silence, for changing one’s mind, and for an idea that is still taking shape. Conversation does not require a polished answer. Its rhythm is different from a classroom response: people can circle back, interrupt themselves, notice a contradiction, or leave a thought unfinished without losing credit.",
      },
      {
        type: "heading",
        text: "Before correcting",
      },
      {
        type: "paragraph",
        text: "Sometimes a child will say something that does not fit the parent’s understanding of the idea. Correcting it immediately may feel useful. But not every family conversation needs to carry the full responsibility of explanation. The moment can first be understood on its own terms: what was the child trying to say, and what connection were they making?",
      },
      {
        type: "paragraph",
        text: "Listening a little longer does not mean that accuracy never matters. It means that the purpose of this particular exchange is kept clear. If the question was offered to begin a conversation, the first task is not to grade the response. A factual point can be returned to when it genuinely needs attention; the child’s thought does not have to be interrupted before it has been heard.",
      },
      {
        type: "paragraph",
        text: "“What made you think of that?” leaves the child’s idea in view. It does not promise agreement, and it does not require the parent to disguise a quiz as a friendly question. It simply allows the meaning behind the answer to become clearer.",
      },
      {
        type: "heading",
        text: "What is worth revisiting",
      },
      {
        type: "paragraph",
        text: "Some ideas deserve another encounter, but revisiting is not the same as immediate revision. An idea can return because it connects with something seen later, because another chapter gives it new context, or because a family conversation happens to touch it again. The return does not need to be scheduled or formal.",
      },
      {
        type: "paragraph",
        text: "Worth Revisiting identifies a small number of ideas that may continue to matter. It does not add explanations, rank them, or turn them into a list of instructions for the parent. There is no demand to cover them again that evening. They can remain in the background until a natural context brings one forward.",
      },
      {
        type: "paragraph",
        text: "That restraint protects the difference between keeping an idea available and placing pressure around it. If something returns, the parent may recognise it. If it does not, family life does not need to be reorganised to make it appear.",
      },
      {
        type: "heading",
        text: "A thought shared, not assessed",
      },
      {
        type: "paragraph",
        text: "Conversation before correctness is not a rule against facts, explanations, or answers. It is a way of recognising what a family conversation is for. There are times to look something up and times to return to a difficult idea. But the parent’s interest does not have to become an examination simply because learning is present.",
      },
      {
        type: "paragraph",
        text: "One thoughtful question can be enough. It can offer a child the freedom to answer without worrying about being right, and it can give the parent a chance to hear how the idea is moving rather than how accurately it can be repeated. If the first answer leads to another thought, the learning has continued without the conversation becoming a test.",
      },
      {
        type: "paragraph",
        text: "A conversation can stay close to learning without becoming an assessment. An answer may remain unfinished, a correction can wait, and an idea may return in its own time. What carries it forward is not pressure, but the simple fact that it was worth talking about.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: home-parent-summary, home-dinner-table-conversation, home-worth-revisiting, canopy-family-rhythms; upbring-lite/docs/02_editorial_bible/04_parent_summary.md, 05_worth_revisiting.md, and 06_dinner_table_conversation.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/conversation-before-correctness",
  },
  {
    slug: "making-as-a-form-of-understanding",
    title: "Making as a form of understanding",
    description:
      "A reflection on giving an idea a personal form through making without requiring a polished result, a correct answer, or another assignment.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "A child is given a simple invitation: if this idea had a colour, a sound, or a shape, what might it be? They might reach for a pencil, arrange a few objects, make a sound, write two lines, or decide that the idea needs something else entirely. The choice belongs to them before anything has been made.",
      },
      {
        type: "paragraph",
        text: "There is no model to copy and no finished example waiting to be matched. The idea has been offered another form, but the form has not been decided in advance.",
      },
      {
        type: "heading",
        text: "An invitation with no model answer",
      },
      {
        type: "paragraph",
        text: "Making can begin with a prompt, yet the prompt does not need to describe the result. “Draw and label the parts correctly” already contains an expected output. So does a set of steps that leads every child towards the same object. The work may involve paper, colour, or building, but the decisions have largely been made before the child begins.",
      },
      {
        type: "paragraph",
        text: "An open invitation leaves those decisions available. A colour could cover the page or appear as one small mark. A sound could be tapped, spoken, or only described. A shape could be drawn, folded, built, or abandoned for a different form. None of these choices needs to resemble what an adult pictured when offering the idea.",
      },
      {
        type: "paragraph",
        text: "This freedom is not an instruction to make something unusual. A child may choose the first material nearby and produce something very simple. Originality here means that the response has not been prescribed, not that it must surprise anyone.",
      },
      {
        type: "heading",
        text: "When creating becomes another task",
      },
      {
        type: "paragraph",
        text: "A creative activity can acquire the shape of an assignment quickly. Materials are gathered, steps are explained, and a result is expected by the end. The adult may have a clear picture of how it should look. Tidiness, detail, accuracy, and completion begin to matter, even if no mark will be given.",
      },
      {
        type: "paragraph",
        text: "The change is visible in small directions: use this colour, put that piece here, add the missing label, finish the background. Each suggestion may be practical on its own. Together, they can leave the child carrying out someone else’s plan.",
      },
      {
        type: "paragraph",
        text: "An invitation allows a different response, including a brief one. The child may make one part and stop. They may change materials halfway through. They may say what they intended without completing it. The activity has not failed simply because there is no polished object to keep.",
      },
      {
        type: "heading",
        text: "Expression without proof",
      },
      {
        type: "paragraph",
        text: "A finished creation can be tempting to read as evidence. A detailed drawing may appear to show a detailed understanding; a sparse response may appear to show less. The object cannot carry that conclusion on its own. It records choices made in one particular activity, with the time, materials, and interest that were present then.",
      },
      {
        type: "paragraph",
        text: "Making offers an idea somewhere else to go. A child who met a concept in words may choose to give it a shape. Another may arrange parts, invent a sound, or combine things that were not placed together in the original lesson. These responses do not prove what the child knows. They are forms the idea took on this occasion.",
      },
      {
        type: "paragraph",
        text: "The distinction keeps the creation from becoming an assessment in disguise. There is no need to search the finished piece for every expected detail or ask the child to defend each choice. If they want to describe what they made, the description can sit beside the work. If they do not, the work can remain without an explanation.",
      },
      {
        type: "heading",
        text: "What happens while something is being made",
      },
      {
        type: "paragraph",
        text: "The process may contain choices that are easy to see. A child returns to one part several times. They replace a piece, leave another untouched, or decide that the original plan no longer fits. These details can be noticed without being turned into a judgement about ability, patience, imagination, or personality.",
      },
      {
        type: "paragraph",
        text: "A parent might ask about a choice when the child appears ready to share it. The answer may be practical: that colour was closest, the paper would not fold, or the larger piece kept falling over. It may also open another part of the idea. Neither kind of answer needs to be treated as more valuable.",
      },
      {
        type: "paragraph",
        text: "Attention can stay with what is happening rather than what the activity is supposed to demonstrate. The child is choosing, changing, placing, removing, or stopping. Those actions belong to the making itself. They do not need an interpretation in order to matter in the moment.",
      },
      {
        type: "heading",
        text: "The unfinished piece",
      },
      {
        type: "paragraph",
        text: "Completion can become an expectation once an activity has begun. Once materials are out and time has been spent, leaving something unfinished can seem wasteful. Yet an open invitation has no required endpoint. The child may have reached the part they wanted to make, or their attention may simply have moved elsewhere.",
      },
      {
        type: "paragraph",
        text: "An unfinished piece does not need to be rescued. It can remain on the table, be taken apart, be returned to later, or be cleared away. Preserving every creation would add another expectation. The decision about what happens next can be as ordinary as the activity itself.",
      },
      {
        type: "paragraph",
        text: "The same is true of work that appears uneven, rough, or difficult to recognise. Polishing it on the child’s behalf would produce a different object. The original marks and joins show how this particular piece was made; they do not need to be corrected into a display version.",
      },
      {
        type: "heading",
        text: "Making alongside",
      },
      {
        type: "paragraph",
        text: "Doing something together does not require the adult to direct it. A parent can use the same materials, respond to the same invitation, or help with a practical step when asked. Their piece does not need to become the example, and their help does not need to determine the child’s choices.",
      },
      {
        type: "paragraph",
        text: "The shared part may be quiet. Two people can make different things at the same table, exchange materials, or look at what each has done. Conversation may arise, but it is not another required outcome. The time together is already present in the activity.",
      },
      {
        type: "paragraph",
        text: "Making as a form of understanding leaves the result open. An idea is given colour, sound, shape, movement, or another form chosen by the child. What appears may be complete or unfinished, easily explained or left without words. It does not have to prove anything beyond the choices that were made.",
      },
      {
        type: "paragraph",
        text: "The materials can be put away without a score, a correction, or a better version. Something was made, and for a while, the idea had a form of its own.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: canopy-create, canopy-do-this-together, canopy-family-rhythms; upbring-lite/docs/02_editorial_bible/17_create.md and 16_one_thing_worth_doing_together.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/making-as-a-form-of-understanding",
  },
  {
    slug: "a-weekly-letter-not-a-report",
    title: "A weekly letter, not a report",
    description:
      "A reflection on how a weekly record can preserve context and continuity without turning a child’s week into scores, rankings, or conclusions.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "A week can be recorded in many ways. Pages completed, chapters covered, questions answered, attendance marked. These details are clear and countable. They show what happened within a particular system, but they do not describe the days around them.",
      },
      {
        type: "paragraph",
        text: "A parent may want a different kind of record: something that brings the week into view without turning it into a judgement. A letter can do that by staying with what unfolded rather than calculating what was achieved.",
      },
      {
        type: "heading",
        text: "What a report is built to show",
      },
      {
        type: "paragraph",
        text: "Reports arrange information so that it can be read quickly. A mark places performance on a scale. A ranking places one result beside others. A dashboard displays movement through categories over time. Each format answers the questions it was designed to answer.",
      },
      {
        type: "paragraph",
        text: "The structure also decides what becomes prominent. What can be counted fits easily into a row, a percentage, or a chart. The context around it is harder to place: an idea that returned in different subjects, a question that stayed after the work was complete, or a week in which nothing dramatic changed.",
      },
      {
        type: "paragraph",
        text: "When those details are forced into a performance format, they can begin to sound like evidence for a verdict. A quiet return to a question becomes progress. A difficult day becomes decline. A short period is asked to show direction before enough time has passed.",
      },
      {
        type: "heading",
        text: "The week as one piece",
      },
      {
        type: "paragraph",
        text: "A weekly reflection waits until the week can be read together. Monday does not have to carry the meaning of Tuesday, and one unusually easy or difficult session does not have to define the whole. The distance is modest—only several days—but it is enough to stop every event from demanding its own interpretation.",
      },
      {
        type: "paragraph",
        text: "Reading the week as one piece does not mean collecting everything that happened. A thoughtful letter can leave most details where they occurred. It may hold one central theme and one observation that remained present after the rest was set aside.",
      },
      {
        type: "paragraph",
        text: "This selectiveness differs from recording every event as it happens. A daily record can try to preserve each movement so that nothing is missed. Weekly perspective accepts that a useful reflection does not need a complete account. It pays attention without building a minute-by-minute record of the child.",
      },
      {
        type: "heading",
        text: "Context before judgement",
      },
      {
        type: "paragraph",
        text: "A mark can state a result without describing the circumstances around it. A letter has room for those circumstances, though it need not explain them away. It can acknowledge that the week moved across different subjects, questions, and pieces of work. It can notice what appeared within that setting and remain careful about what the appearance means.",
      },
      {
        type: "paragraph",
        text: "The language matters. “This returned more than once this week” stays with the record. “This is now a strength” changes the observation into a judgement. “This seemed to hold their attention” leaves room for another week. “This is how they learn” closes that room before longer evidence exists.",
      },
      {
        type: "paragraph",
        text: "A weekly letter therefore does not need to evaluate the child in order to be useful to the parent. It can offer enough context to understand what the week felt like as a whole, without translating that understanding into a score, profile, or recommendation.",
      },
      {
        type: "heading",
        text: "What deserves a place",
      },
      {
        type: "paragraph",
        text: "Not every completed task belongs in a weekly reflection. Completion already has its own record. The letter can attend to something quieter: an idea revisited in more than one setting, a question that changed as the week continued, or an observation that seems worth carrying into the next week without resolving it.",
      },
      {
        type: "paragraph",
        text: "The detail needs support from the week itself. A single isolated event may be vivid, but vividness does not make it representative. If nothing recurred, the reflection does not have to manufacture a theme. A week can be described honestly without being presented as a turning point.",
      },
      {
        type: "paragraph",
        text: "Nor does the letter require academic progress to justify its existence. A quiet week may still contain continuity, hesitation, return, or simply the ordinary movement from one day to the next. The record can remain modest because the week itself may have been modest.",
      },
      {
        type: "heading",
        text: "One week is not a pattern",
      },
      {
        type: "paragraph",
        text: "Weekly perspective creates distance from the individual day, but it does not create long-term certainty. Recurring patterns belong to a longer view. They require history across months, attention to consistency, and the willingness to ignore short-term fluctuations.",
      },
      {
        type: "paragraph",
        text: "A letter can name what appeared during the week without promoting it into a lasting trait. The next letter may hold a similar observation, a different one, or no continuation at all. Each week contributes context; no week has to settle the child’s story.",
      },
      {
        type: "paragraph",
        text: "This boundary keeps continuity from becoming a premature conclusion. The record can grow while its language remains provisional. Weeks can sit beside one another before anyone decides whether they form a pattern.",
      },
      {
        type: "heading",
        text: "Continuity without a dashboard",
      },
      {
        type: "paragraph",
        text: "Placed together over time, weekly letters can preserve a sequence that isolated updates cannot. A parent can look back and recognise what was present, what changed, and what did not return. The sequence remains narrative rather than numerical; it does not need an upward line to make the history worth keeping.",
      },
      {
        type: "paragraph",
        text: "Some weeks will resist comparison. Their subjects, circumstances, and pace will differ. A letter can keep those differences visible instead of standardising every week against the same measures. Continuity comes from the regular act of reflecting, not from making each entry comparable.",
      },
      {
        type: "paragraph",
        text: "There is also a place for pause within that continuity. A letter may end with an observation still open, without advice about what the parent should do next. The absence of a recommendation is not an omission. It allows the week to be received before it is acted upon.",
      },
      {
        type: "heading",
        text: "A record that stays close",
      },
      {
        type: "paragraph",
        text: "A weekly letter does not need to replace the records that already serve practical purposes. Its work is quieter. It brings selected parts of the week together in language that offers context without judgement and continuity without prediction.",
      },
      {
        type: "paragraph",
        text: "The parent is left with a view of what has been unfolding, not a verdict on where the child stands. The week remains one part of a longer history—noticed carefully, written down, and allowed to remain incomplete.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: canopy-weekly-letter, within-patterns-over-time, within-pause, home-parent-summary; upbring-lite/docs/02_editorial_bible/23_weekly_letter.md, 25_patterns_over_time.md, 04_parent_summary.md, and 14_pause.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/a-weekly-letter-not-a-report",
  },
  {
    slug: "curiosity-without-an-agenda",
    title: "Curiosity without an agenda",
    description:
      "A reflection on allowing a child’s curiosity to remain interesting without converting every question into research, instruction, or a task.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "A question can arrive in the middle of something else. Why does this leaf have two colours? How did that sound reach the other room? The family may be walking, cooking, waiting, or already talking about another subject. Nothing has been prepared for the question, and nobody has decided what should follow it.",
      },
      {
        type: "paragraph",
        text: "The question may receive a short reply. It may lead to another question, or be left behind when attention moves on. Its value does not depend on producing a lesson before the moment ends.",
      },
      {
        type: "heading",
        text: "Before the question becomes a task",
      },
      {
        type: "paragraph",
        text: "Curiosity is easy to welcome and just as easy to organise. A parent hears a question and begins to gather explanations, suggest a search, plan an experiment, or ask the child to find out more. The original interest is still present, but it now has work attached to it.",
      },
      {
        type: "paragraph",
        text: "Research can be useful when someone wants to do it. The change occurs when finding the answer becomes the expected response to every question. A passing wonder starts to resemble an assignment: identify the topic, collect information, report back.",
      },
      {
        type: "paragraph",
        text: "A question need not earn its place by becoming productive. It can briefly alter how an ordinary thing is seen. The leaf, sound, shadow, machine, or word is no longer entirely unnoticed. That shift may be all the moment contains.",
      },
      {
        type: "heading",
        text: "Wonder before detail",
      },
      {
        type: "paragraph",
        text: "Curiosities begins with something connected to what is already being explored. The connection matters. A random fact may be surprising, but surprise alone can pull attention away from the idea that made the question possible.",
      },
      {
        type: "paragraph",
        text: "One carefully chosen detail can extend an idea without surrounding it with information. It offers enough to make the subject feel larger, then stops. A list of facts would change the pace. So would an explanation that closes every route the question might take.",
      },
      {
        type: "paragraph",
        text: "Restraint keeps the curiosity close to its source. The new detail belongs beside the chapter, object, or conversation that prompted it. It does not need clickbait, exaggeration, or a promise that something extraordinary is about to be discovered.",
      },
      {
        type: "heading",
        text: "When nobody knows",
      },
      {
        type: "paragraph",
        text: "A parent does not need to have an answer ready. “I don’t know” can describe the moment plainly. It does not require an immediate search to make the response complete.",
      },
      {
        type: "paragraph",
        text: "The family may decide to look later, but later is not a debt created by the question. Nobody needs to remember every unanswered thought or keep a list of topics to investigate. Curiosity can be genuine even when it is brief.",
      },
      {
        type: "paragraph",
        text: "Leaving a question unresolved also avoids replacing the child’s interest with the adult’s plan. The parent may be fascinated by a different part of the subject or ready to go much further. The question that was actually asked can remain small.",
      },
      {
        type: "heading",
        text: "No teaching opportunity required",
      },
      {
        type: "paragraph",
        text: "An everyday question can appear to offer a perfect teaching opportunity. The phrase carries a quiet expectation: the adult should use the moment well, explain the concept clearly, and make sure something has been learned.",
      },
      {
        type: "paragraph",
        text: "That response changes the roles in the room. One person begins delivering the idea while the other is expected to receive it. The original question may still be answered, but the exchange now has a direction and an intended result.",
      },
      {
        type: "paragraph",
        text: "A lighter response can stay beside the question. The parent might share one thought, notice the same thing, or simply acknowledge that it is interesting. None of these responses asks the child to continue once their attention has moved elsewhere.",
      },
      {
        type: "heading",
        text: "Interest that changes shape",
      },
      {
        type: "paragraph",
        text: "A question does not always remain in words. It may reappear when the same object is seen again, when a related detail turns up in another chapter, or when the child mentions it days later. It may also disappear completely.",
      },
      {
        type: "paragraph",
        text: "There is no need to decide which outcome would be better. A returning question can be noticed when it returns. A forgotten one does not represent an opportunity lost. Both belong to the ordinary movement of attention.",
      },
      {
        type: "paragraph",
        text: "Curiosity without an agenda makes no demand for continuity. It allows continuity when it occurs. The distinction is quiet, but practical: the question is not assigned a future before it has had time to find one.",
      },
      {
        type: "heading",
        text: "An interesting question can be enough",
      },
      {
        type: "paragraph",
        text: "The answer can arrive without becoming the reward for asking. A parent may know one part of it and share that part plainly. The exchange can stop before the subject has been fully explained.",
      },
      {
        type: "paragraph",
        text: "If the answer is easy to find, choosing not to search immediately is still available. The phone, book, or experiment can wait until someone genuinely wants to continue. Access to information does not create a duty to use it at once.",
      },
      {
        type: "paragraph",
        text: "An answer may also create another curiosity rather than closure. That new question belongs to the moment in the same way as the first: it can be followed, held briefly, or allowed to pass.",
      },
      {
        type: "paragraph",
        text: "Some questions lead to answers, experiments, books, or long conversations. Others last for less than a minute. The length of their life does not determine whether the moment was worth noticing.",
      },
      {
        type: "paragraph",
        text: "The question may never be mentioned again, yet the response to it can remain unhurried. Curiosity was allowed to appear without being enrolled into the rest of the day.",
      },
      {
        type: "paragraph",
        text: "A child asked because something caught their attention. For that moment, an ordinary part of the world became less ordinary. The family can let the question rest there, without adding a lesson to justify it.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: canopy-curiosities; upbring-lite/docs/02_editorial_bible/18_curiosities.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/curiosity-without-an-agenda",
  },
  {
    slug: "a-question-worth-keeping",
    title: "A question worth keeping",
    description:
      "A reflection on questions that remain valuable because they invite thought in more than one direction rather than requiring a predetermined answer.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "The apple in the Newton story is easy to remember. The question behind it matters more here: why do ordinary things fall? The event did not contain a complete explanation. It gave a question something concrete to stay with.",
      },
      {
        type: "paragraph",
        text: "A useful question can begin that simply. It directs attention towards something familiar and makes another look possible. Its life need not be measured by how quickly an answer follows.",
      },
      {
        type: "heading",
        text: "More than a route to an answer",
      },
      {
        type: "paragraph",
        text: "Many questions have a clear job. They ask for a name, date, definition, or calculation. Once the correct response is given, the exchange is complete. The question has carried someone to a known destination.",
      },
      {
        type: "paragraph",
        text: "Another kind of question remains useful after the first response. It may ask how an ordinary thing could be understood differently, what might change under another condition, or which possibility deserves attention. The answer does not end the question because another answer could follow.",
      },
      {
        type: "paragraph",
        text: "This openness need not make the question grand. “What else could this be?” or “Why might it happen that way?” can remain close to a single object or idea. The scale is small; the direction is unsettled.",
      },
      {
        type: "heading",
        text: "A question with more than one direction",
      },
      {
        type: "paragraph",
        text: "Predetermined questions narrow as they move forward. Each step removes possibilities until the expected answer remains. An open question can widen for a while. One thought introduces another condition, a different example, or a reason to reconsider the first response.",
      },
      {
        type: "paragraph",
        text: "Two people may take the same question in separate directions without needing to settle which direction is correct. They can be interested in different parts of it. Agreement is not required for the question to keep its shape.",
      },
      {
        type: "paragraph",
        text: "The question also survives a change of mind. A response offered today can be revised when a new detail appears. Changing the response does not make the earlier thought worthless; it records where the question led at that time.",
      },
      {
        type: "heading",
        text: "Keeping the wording light",
      },
      {
        type: "paragraph",
        text: "A long introduction can tell people how they are supposed to think before the question is asked. So can language that announces a moral, identifies the important lesson, or frames one answer as more thoughtful than another.",
      },
      {
        type: "paragraph",
        text: "A question worth keeping often needs less preparation. It names the idea clearly and leaves space around it. The person hearing it can enter from their own experience rather than first accepting an explanation.",
      },
      {
        type: "paragraph",
        text: "Keeping the wording light also makes it easier for the question to travel. It can return at another table, during a walk, or when a related idea appears. The words remain recognisable even as the answers change.",
      },
      {
        type: "heading",
        text: "Carried without being assigned",
      },
      {
        type: "paragraph",
        text: "To carry a question does not mean working on it continuously. It can stay at the edge of attention and return without a schedule. Nobody needs to announce that they are still considering it.",
      },
      {
        type: "paragraph",
        text: "Nor does keeping a question require a final discussion. A family may refer to it once, then leave it alone for weeks. It remains available because it was memorable, not because someone created an obligation to revisit it.",
      },
      {
        type: "paragraph",
        text: "A question can also be released. Some possibilities stop feeling interesting. Others are replaced by a better question. Keeping is an option offered by the question’s usefulness, not a rule imposed on the people who heard it.",
      },
      {
        type: "heading",
        text: "The thinker behind the name",
      },
      {
        type: "paragraph",
        text: "Thinkers are often introduced through achievements, dates, and famous results. Those details can make the person easier to place, while the question that occupied them disappears behind the summary.",
      },
      {
        type: "paragraph",
        text: "Focusing on how someone thought changes what is remembered. Newton’s name belongs with gravity, but the relevant detail is his continued attention to why ordinary things happen. The famous answer began with a question that was allowed to remain active.",
      },
      {
        type: "paragraph",
        text: "This does not require turning the thinker into a hero or asking a child to imitate them. The person offers one example of a question being taken seriously over time. The achievement can remain in the background.",
      },
      {
        type: "heading",
        text: "When the question remains",
      },
      {
        type: "paragraph",
        text: "Keeping a question does not preserve its first form unchanged. New wording may make the real interest clearer. A question about what happened can become a question about why it matters, or which condition would alter it.",
      },
      {
        type: "paragraph",
        text: "That movement is part of the question’s life. The earlier wording was not wrong; it made the later version possible. Each form records the direction of thought at a particular point.",
      },
      {
        type: "paragraph",
        text: "More than one question may emerge, and nobody has to choose the most important one. The original can remain alongside its variations without being replaced by a formal enquiry.",
      },
      {
        type: "paragraph",
        text: "A question is worth keeping when people still find something in it to consider. Its value is present in that continued use, not in a claim about what the question will eventually produce.",
      },
      {
        type: "paragraph",
        text: "A correct answer can be useful and complete. A question worth keeping serves another purpose. It can hold several responses, accept revision, and remain recognisable when it returns in a different setting.",
      },
      {
        type: "paragraph",
        text: "Its usefulness may be shared without becoming a group exercise. One person can mention the question, another can respond briefly, and a third can take it elsewhere. The question does not require equal attention from everyone in order to remain available.",
      },
      {
        type: "paragraph",
        text: "Nothing needs to be produced from it immediately. The question has already done something modest: it has made an ordinary idea available for another look. It can be taken up again, at another time or in another place, without anyone having assigned it.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: canopy-thinkers; upbring-lite/docs/02_editorial_bible/19_thinkers.md and 15_one_thing_worth_talking_about.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/a-question-worth-keeping",
  },
  {
    slug: "small-rituals-deep-roots",
    title: "Small rituals, deep roots",
    description:
      "A reflection on repeated family moments that provide gentle continuity without becoming schedules, productivity routines, or structured enrichment.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "Five minutes after dinner can look unimportant from the outside. A question is asked, two people step onto a balcony, or everyone names one thing from the day. The moment ends without a record, a result, or a plan for improvement.",
      },
      {
        type: "paragraph",
        text: "When a small moment returns, it can become familiar without becoming formal. The family recognises its place in the week even if the details change each time.",
      },
      {
        type: "heading",
        text: "Rhythm rather than timetable",
      },
      {
        type: "paragraph",
        text: "A schedule is designed to hold time in place. It assigns an activity to a day and hour, then makes completion visible. Rhythm is looser. It can recur around dinner, at the end of a week, or whenever the family naturally meets.",
      },
      {
        type: "paragraph",
        text: "The distinction matters when family life changes shape. A late evening, a visitor, tiredness, or another commitment may move the moment or remove it entirely. The rhythm can continue later without treating the missed occasion as failure.",
      },
      {
        type: "paragraph",
        text: "Regularity remains present, but precision does not become the point. The family knows the moment may return. It does not need a reminder that turns the practice into another item to complete.",
      },
      {
        type: "heading",
        text: "Repetition without optimisation",
      },
      {
        type: "paragraph",
        text: "Repeated practices are often given a purpose to improve something: attention, communication, organisation, learning, or wellbeing. The activity is then judged by whether that improvement appears.",
      },
      {
        type: "paragraph",
        text: "A family rhythm can have a simpler reason for returning. People enjoyed the question, the brief walk, or the time spent doing one small thing together. Repeating it does not require a claim about what the practice will produce.",
      },
      {
        type: "paragraph",
        text: "Without an improvement target, the moment can vary. A question may lead to a long exchange one week and almost no response the next. A shared activity may last five minutes or end sooner. The rhythm remains recognisable without demanding consistency from everyone inside it.",
      },
      {
        type: "heading",
        text: "The ritual is not the performance",
      },
      {
        type: "paragraph",
        text: "Ritual can sound ceremonial, but many family rituals are ordinary. Their meaning comes partly from recognition: this is something we have done before. The words, place, or people may change while the basic gesture remains.",
      },
      {
        type: "paragraph",
        text: "Nothing has to be photographed, recorded, or completed in a particular way. Turning the ritual into evidence of a well-run family would place another audience inside the moment. The practice can belong only to the people present.",
      },
      {
        type: "paragraph",
        text: "Nor does everyone need to value the ritual equally on every occasion. One person may be distracted; another may carry the conversation. Participation can be quiet without threatening the continuation of the rhythm.",
      },
      {
        type: "heading",
        text: "A question that returns",
      },
      {
        type: "paragraph",
        text: "Dinner Table Conversation and One Thing Worth Talking About offer one idea at a time. The question changes, but the family recognises the invitation: there is a little space here to talk about something together.",
      },
      {
        type: "paragraph",
        text: "The exchange does not need a summary at the end. Different answers can remain different. The recurring element is the act of making time for one question, rather than a requirement to reach agreement.",
      },
      {
        type: "paragraph",
        text: "On another evening, the rhythm may be an action instead of a conversation. Stepping outside, noticing something nearby, or doing one simple thing together keeps preparation low. The activity fits around family life rather than asking family life to fit around it.",
      },
      {
        type: "heading",
        text: "When a rhythm becomes an obligation",
      },
      {
        type: "paragraph",
        text: "A repeated moment changes when missing it creates pressure. The family begins to protect the streak, make up the skipped day, or continue after the practice has stopped feeling welcome. Repetition has become a measure of commitment.",
      },
      {
        type: "paragraph",
        text: "The rhythm can be allowed to loosen. It may happen less often, take a different form, or end. Its earlier value does not depend on continuing forever.",
      },
      {
        type: "paragraph",
        text: "This flexibility separates a ritual from a productivity routine. The practice is not maintained to show discipline. It returns while it still belongs naturally within the family’s time.",
      },
      {
        type: "heading",
        text: "What repetition can hold",
      },
      {
        type: "paragraph",
        text: "Repeated does not have to mean identical. The dinner question changes, the activity responds to another idea, and the people present bring a different day with them. Recognition comes from the shape of the time together, not from repeating exact words.",
      },
      {
        type: "paragraph",
        text: "Variation also prevents the rhythm from becoming a script. A family can shorten the moment, move it, or respond in an unexpected way. The practice remains theirs because they are free to alter it.",
      },
      {
        type: "paragraph",
        text: "A rhythm may be noticed only after it has happened several times. Nobody needs to declare the first occasion the beginning of a tradition. Repetition can accumulate without a launch, a name, or a rule.",
      },
      {
        type: "paragraph",
        text: "If the practice ends, the earlier moments remain part of family history. Their place does not depend on maintaining the pattern indefinitely or replacing it with another routine.",
      },
      {
        type: "paragraph",
        text: "A small family ritual may hold familiarity, a shared reference, and the expectation of a little time together. Those are descriptions of the practice, not promises about what it will achieve.",
      },
      {
        type: "paragraph",
        text: "The people inside the ritual may remember different parts of it. One recalls a question; another recalls the walk outside or the way an answer changed the subject. Repetition gives them a common point of reference without requiring a single account of what the time meant.",
      },
      {
        type: "paragraph",
        text: "That common reference can remain private and ordinary. It does not need to become a family principle, a public tradition, or proof that the time was used well.",
      },
      {
        type: "paragraph",
        text: "The question is asked, the brief activity happens, and the evening continues. The ritual does not have to improve anyone to have had a place in the day. Its repetition can remain unmeasured.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: canopy-family-rhythms, canopy-dinner-table-conversation, canopy-do-this-together, canopy-one-thing-worth-talking-about; upbring-lite/docs/02_editorial_bible/06_dinner_table_conversation.md, 15_one_thing_worth_talking_about.md, and 16_one_thing_worth_doing_together.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/small-rituals-deep-roots",
  },
  {
    slug: "worth-revisiting",
    title: "Worth revisiting",
    description:
      "A reflection on returning to an idea after time has passed without treating the return as correction, remediation, or evidence of weakness.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "A chapter can end while one of its ideas remains unfinished. The exercises are complete, the page has turned, and no mistake needs to be corrected. Even so, the idea may deserve another encounter.",
      },
      {
        type: "paragraph",
        text: "Returning later is different from extending the original work. Time has passed, the setting may have changed, and the idea can be met without recreating the lesson around it.",
      },
      {
        type: "heading",
        text: "Selection without diagnosis",
      },
      {
        type: "paragraph",
        text: "Worth Revisiting identifies a small number of concepts from a larger chapter. Selection can easily sound like a judgement: these are the parts the child did not understand, the weak areas, or the material that needs repair.",
      },
      {
        type: "paragraph",
        text: "The approved form makes no such claim. It names concepts without explanations, rankings, instructions, or performance notes. The list says that an idea may continue to matter, not that something went wrong.",
      },
      {
        type: "paragraph",
        text: "That boundary is important because the record may contain no evidence of difficulty at all. An idea can deserve another visit because it connects with later material, opens a broader subject, or cannot be exhausted in one chapter.",
      },
      {
        type: "heading",
        text: "Time between encounters",
      },
      {
        type: "paragraph",
        text: "Immediate repetition keeps the idea close to its original wording and task. A later encounter brings different surroundings. The child may meet the concept in another subject, in ordinary life, or through a question that was not available the first time.",
      },
      {
        type: "paragraph",
        text: "The interval is not a technique with a promised result. It simply prevents revisiting from becoming more of the same work on the same day. The return can happen when another context makes the idea relevant.",
      },
      {
        type: "paragraph",
        text: "Nothing requires the return to follow a timetable. Some ideas reappear quickly. Others remain in the background until much later. A concept can be kept available without placing another appointment on the family calendar.",
      },
      {
        type: "heading",
        text: "Returning without remediation",
      },
      {
        type: "paragraph",
        text: "Remediation begins from a gap that has been identified and a plan to address it. Revisiting, in this editorial sense, begins from the continuing value of the idea. The direction is not backwards towards the failed task; it is towards another encounter.",
      },
      {
        type: "paragraph",
        text: "The difference can be heard in the language around the return. “You need to go over this again” carries a correction. “This idea has appeared here too” recognises a connection. The concept is present without making the child defend an earlier response.",
      },
      {
        type: "paragraph",
        text: "A revisit also does not require a check at the end. There may be a conversation, an observation, or a new piece of material. The encounter can finish without asking whether mastery has increased.",
      },
      {
        type: "heading",
        text: "The idea, not the earlier performance",
      },
      {
        type: "paragraph",
        text: "Returning to the idea while carrying the earlier result can keep the first attempt at the centre. The child is reminded what was missed, where the answer stopped, or which part was incomplete.",
      },
      {
        type: "paragraph",
        text: "Worth Revisiting leaves those details out. A concept name such as Conservation of Energy or Mechanical Energy does not contain a score or an account of what happened before. It points towards the subject itself.",
      },
      {
        type: "paragraph",
        text: "This restraint keeps the earlier performance from defining the return. The parent and child can meet the idea that is present now rather than reconstructing the first encounter.",
      },
      {
        type: "heading",
        text: "What another encounter may hold",
      },
      {
        type: "paragraph",
        text: "The second encounter does not need to look like the first. A concept first met through written work may later appear in a practical example, a larger question, or another chapter. The connection can be recognised without repeating the original explanation.",
      },
      {
        type: "paragraph",
        text: "The child may approach it differently, or may show no particular interest. Revisiting does not guarantee a new response. Its purpose is to make another encounter possible, not to produce evidence that the concept has now settled.",
      },
      {
        type: "paragraph",
        text: "A parent summary can provide enough context for the adult to recognise why the idea matters beyond one task. It need not explain every detail or prepare the parent to teach it. Understanding the place of the idea is enough.",
      },
      {
        type: "heading",
        text: "A return can remain small",
      },
      {
        type: "paragraph",
        text: "Revisiting can be brief. The concept is noticed in a new setting, named, and left there. A longer conversation may follow, but length is not required to make the return genuine.",
      },
      {
        type: "paragraph",
        text: "The idea may return more than once. Each appearance can add context without becoming a progress sequence. There is no need to mark the first, second, and third encounter or compare the child’s response across them.",
      },
      {
        type: "paragraph",
        text: "The family can also decide that an idea no longer needs attention. Worth revisiting is a selection, not a permanent status. Another concept may become more relevant as learning moves forward.",
      },
      {
        type: "heading",
        text: "Meeting the idea again",
      },
      {
        type: "paragraph",
        text: "A concept may also be revisited by the adult alone. The parent can read a short explanation and understand why the idea will matter later, without turning that understanding into a new task for the child.",
      },
      {
        type: "paragraph",
        text: "This keeps the return proportionate. Not every idea selected for revisiting needs an activity, discussion, or scheduled follow-up. Naming it can be enough until another context appears.",
      },
      {
        type: "paragraph",
        text: "When that context arrives, the earlier selection helps the parent recognise the connection. Recognition is different from intervention; the idea can be present again without requiring the family to stop and work on it.",
      },
      {
        type: "paragraph",
        text: "Returning to an idea can preserve what was unfinished without treating unfinished as failure. The earlier encounter remains part of the history, while the new one is allowed to have its own context.",
      },
      {
        type: "paragraph",
        text: "No correction has to sit at the centre. The concept appears again because it still has something to offer, and the family can meet it without turning back towards a mistake.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: home-worth-revisiting, home-parent-summary; upbring-lite/docs/02_editorial_bible/05_worth_revisiting.md and 04_parent_summary.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/worth-revisiting",
  },
  {
    slug: "keeping-the-small-moments",
    title: "Keeping the small moments",
    description:
      "A reflection on preserving ordinary family moments as fragments of an unfinished story without turning them into milestones, evidence, or conclusions.",
    status: "draft",
    publishedAt: null,
    updatedAt: null,
    author: "Upbring",
    category: "Editorial",
    readingTimeMinutes: 6,
    body: [
      {
        type: "paragraph",
        text: "Some things are remembered without a date. A phrase repeated at breakfast, a drawing left beside a cup, a question asked from another room. They were not announced as important when they happened, and nobody paused to record them.",
      },
      {
        type: "paragraph",
        text: "Later, one of those details may return to mind more clearly than an organised occasion. The moment has no certificate, photograph, or finished account. It remains a small part of family life that felt worth keeping.",
      },
      {
        type: "heading",
        text: "Beyond the milestone",
      },
      {
        type: "paragraph",
        text: "Milestones arrive with names. Firsts, completions, achievements, and transitions are easy to place in a family record because everyone recognises what happened. They provide dates and headings.",
      },
      {
        type: "paragraph",
        text: "Ordinary moments are less organised. They may last only a few seconds and carry no obvious change. A child notices something, returns to an old joke, asks for the same story, or sits nearby while someone else works.",
      },
      {
        type: "paragraph",
        text: "Keeping these moments does not make milestones less meaningful. It broadens what the record can contain. Family life includes the named occasions and the quieter details between them.",
      },
      {
        type: "heading",
        text: "A fragment can remain a fragment",
      },
      {
        type: "paragraph",
        text: "A small memory often arrives without an explanation. The words are remembered, but not what prompted them. The gesture remains clear while the rest of the evening has disappeared.",
      },
      {
        type: "paragraph",
        text: "The missing context does not need to be supplied. A fragment can be written down as it was: one sentence, one detail, one brief exchange. It does not have to become a complete story before it is allowed into the record.",
      },
      {
        type: "paragraph",
        text: "Nor must the moment represent something larger. It can be kept because it was funny, tender, surprising, or simply recognisable. The record does not need to explain what the fragment says about the child.",
      },
      {
        type: "heading",
        text: "Memory without evidence",
      },
      {
        type: "paragraph",
        text: "Once a moment is preserved, it can be tempting to use it. The detail becomes proof that a quality was already present, that a change had begun, or that a later outcome could have been seen in advance.",
      },
      {
        type: "paragraph",
        text: "That use asks the memory to support more than it contained. The child’s sentence at breakfast was a sentence at breakfast. Its place in the family record need not depend on becoming evidence for a trait or achievement.",
      },
      {
        type: "paragraph",
        text: "A collection of moments can stay free of scoring for the same reason. Quantity does not create certainty. Several fragments may belong together, or may simply have happened near one another in time.",
      },
      {
        type: "heading",
        text: "Choosing what to keep",
      },
      {
        type: "paragraph",
        text: "No family can preserve every detail, and a complete record would change the experience of ordinary life. Choosing is unavoidable. A moment is kept because someone wants to remember it, not because a system has declared it significant.",
      },
      {
        type: "paragraph",
        text: "The selection can be personal. Another person present may have chosen a different detail. That difference does not make either memory inaccurate; each record holds what stayed with the person who made it.",
      },
      {
        type: "paragraph",
        text: "There is also no obligation to document a meaningful moment while it is happening. Remembering later is enough. Forgetting is part of family memory too, and does not mean the experience lacked value.",
      },
      {
        type: "heading",
        text: "Separate moments, placed together",
      },
      {
        type: "paragraph",
        text: "Over time, fragments begin to sit beside one another. A phrase from one year appears near a question from another. The collection creates continuity because the same family is present across the pages, even when the moments do not form a clear sequence.",
      },
      {
        type: "paragraph",
        text: "Story So Far brings observations and moments together carefully. The word “so far” matters. It keeps the collection attached to the history already lived without presenting that history as complete.",
      },
      {
        type: "paragraph",
        text: "A story can hold gaps, changes in tone, and details that never become themes. Continuity does not require every fragment to support one account of who the child is becoming.",
      },
      {
        type: "heading",
        text: "Centred on one child",
      },
      {
        type: "paragraph",
        text: "Just Arjun describes a space centred on one child without comparison or fixed labels. For memory, that means a moment does not need to be measured against what other children did at the same age or stage.",
      },
      {
        type: "paragraph",
        text: "The detail belongs to this family because it happened here. Its meaning is not increased by being early, unusual, advanced, or better than another child’s moment.",
      },
      {
        type: "paragraph",
        text: "Keeping the record close to the child also keeps real family data private. An illustrative public example can explain the form, while an actual family memory belongs within the family context in which it was created.",
      },
      {
        type: "heading",
        text: "What remains",
      },
      {
        type: "paragraph",
        text: "Memory also changes through retelling. One person remembers the words; another remembers where everyone was sitting. These versions can coexist without requiring the family to settle an official account.",
      },
      {
        type: "paragraph",
        text: "A written fragment fixes only a small part of what happened. Tone, movement, and the ordinary details around it may be lost. The record can acknowledge that limit instead of presenting itself as the whole event.",
      },
      {
        type: "paragraph",
        text: "Later additions do not have to make the collection more complete. They simply place another moment beside the ones already kept. The gaps remain part of the record.",
      },
      {
        type: "paragraph",
        text: "Small moments do not need to become milestones after the fact. They can remain ordinary and still have a place in memory.",
      },
      {
        type: "paragraph",
        text: "The act of keeping one moment does not rank it above all the moments that were forgotten. It gives this fragment a place without claiming that it was the most important part of the day.",
      },
      {
        type: "paragraph",
        text: "Years later, the record may offer only fragments: a sentence, a drawing, a question, a quiet evening. Together they do not define the child. They show parts of the life the family remembers, with many other parts left unrecorded.",
      },
    ],
    sourceType: "approved-editorial-library",
    sourceReference:
      "content/editorial.ts: within-moments, within-story-so-far, within-just-arjun; upbring-lite/docs/02_editorial_bible/22_this_is_child.md and 26_his_story_so_far.md; full article body pending founder/editorial approval",
    approvalStatus: "requires-editorial-approval",
    socialImage: null,
    canonicalPath: "/blog/keeping-the-small-moments",
  },
] as const satisfies readonly ArticleRecord[];

export const articles = validateArticleRecords(articleRecords);
