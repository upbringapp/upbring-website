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
        text: "Sometimes the child will continue the thought. Sometimes they will notice something else. Sometimes the moment will pass without conversation. None of these responses needs to be corrected. The observation was an invitation, not a test hidden inside everyday life.",
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
        text: "Completion often arrives as an adult expectation. Once materials are out and time has been spent, leaving something unfinished can seem wasteful. Yet an open invitation has no required endpoint. The child may have reached the part they wanted to make, or their attention may simply have moved elsewhere.",
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
] as const satisfies readonly ArticleRecord[];

export const articles = validateArticleRecords(articleRecords);
