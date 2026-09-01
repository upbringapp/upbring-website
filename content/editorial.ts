export type EditorialSourceType =
  | "locked-app-copy"
  | "approved-editorial-library"
  | "approved-marketing-copy"
  | "founder-approved-explanatory-copy"
  | "frozen-product-terminology";

export type EditorialContentRecord = {
  id: string;
  exactText: string;
  sourceType: EditorialSourceType;
  sourceReference: string;
  approvalStatus: "approved" | "requires-editorial-approval";
  placement: string;
  illustrative: boolean;
};

/**
 * Founder-approved website content governance:
 *
 * This library explains the product; it does not mirror personalised app
 * output. Home, the Canopy introduction and Weekly Letter, Curiosities,
 * Thinkers, Create, all of Within (including Pause), and Privacy & Trust are
 * intentionally static. Do not connect those records to app assignments,
 * generated observations, or any other live editorial feed.
 *
 * Family Rhythms is the sole weekly editorial surface. Its Dinner Table
 * Conversation, Do This Together, and One Thing Worth Talking About records
 * form one indivisible published edition: they may update once per week only,
 * always together, and never through independent or partial rotation.
 */

export const homeContent = [
  { id: "home-aaj-kya-seekha", exactText: "Arjun explored why shadows change through the day.\n\nWhat stayed with him was not a definition, but the idea that the same object can look different as the light moves.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Home / Aaj Kya Seekha", illustrative: true },
  { id: "home-parent-summary", exactText: "Today’s work was about light, position, and change.\n\nThe larger idea is simple: what we see depends partly on where we are looking from — a thought that reaches well beyond science.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Home / Parent Summary", illustrative: true },
  { id: "home-real-life-mein-dekho", exactText: "On the way home, notice the shadow of a tree or a parked bicycle.\n\nYou do not need to explain it. See whether the shadow looks different when you pass the same place later.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Home / Real Life Mein Dekho", illustrative: true },
  { id: "home-dinner-table-conversation", exactText: "Can two people look at the same thing and notice something different?\n\nWhat might each person see?", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Home / Dinner Table Conversation", illustrative: true },
  { id: "home-worth-revisiting", exactText: "Light and shadow\nPoint of view\nHow position changes what we see", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Home / Worth Revisiting", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const canopyContent = [
  { id: "canopy-weekly-letter", exactText: "This week, Arjun kept returning to the idea that what we see can change with our point of view.\n\nIt appeared first in a lesson about shadows, then again in a story where two characters remembered the same afternoon differently.", sourceType: "approved-editorial-library", sourceReference: "Editorial example review, 2026-09-01; aligned with upbring-lite/docs/02_editorial_bible/23_weekly_letter.md", approvalStatus: "approved", placement: "Canopy / Weekly Letter", illustrative: true },
  { id: "canopy-family-rhythms", exactText: "Dinner Table Conversation\nWhat is something you noticed today that someone else may have missed?\n\nDo This Together\nChoose one everyday object and draw its shadow in the morning and again later in the day.\n\nOne Thing Worth Talking About\nWhen two people remember the same moment differently, can both memories still be honest?", sourceType: "approved-editorial-library", sourceReference: "Editorial example review, 2026-09-01; aligned with the approved Family Rhythms library", approvalStatus: "approved", placement: "Canopy / Family Rhythms", illustrative: true },
  { id: "canopy-curiosities", exactText: "A sunflower turns as it grows, following the light across the sky.\n\nIf a plant cannot see the sun, how might it know which way to turn?", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Canopy / Curiosities", illustrative: true },
  { id: "canopy-thinkers", exactText: "As a child, Jane Goodall watched a hen for hours because she wanted to know where eggs came from.\n\nWhat can patient watching reveal that a quick glance cannot?", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01; biographical detail from the Jane Goodall Institute", approvalStatus: "approved", placement: "Canopy / Thinkers", illustrative: true },
  { id: "canopy-create", exactText: "Place a small object near a lamp and trace its shadow. Move the lamp, then trace it again.\n\nWhat changed in your drawing — and what stayed the same?", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Canopy / Create", illustrative: true },
  { id: "canopy-dinner-table-conversation", exactText: "What is something you noticed today that someone else may have missed?", sourceType: "approved-editorial-library", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Canopy / Dinner Table Conversation", illustrative: true },
  { id: "canopy-do-this-together", exactText: "Choose one everyday object and draw its shadow in the morning.\n\nReturn later and draw the shadow again from the same place.\n\nPut the two drawings beside each other and notice what changed.", sourceType: "approved-editorial-library", sourceReference: "Editorial example review, 2026-09-01; aligned with upbring-lite/docs/02_editorial_bible/16_one_thing_worth_doing_together.md", approvalStatus: "approved", placement: "Canopy / Do This Together", illustrative: true },
  { id: "canopy-one-thing-worth-talking-about", exactText: "When two people remember the same moment differently, can both memories still be honest?", sourceType: "approved-editorial-library", sourceReference: "Editorial example review, 2026-09-01; aligned with upbring-lite/docs/02_editorial_bible/15_one_thing_worth_talking_about.md", approvalStatus: "approved", placement: "Canopy / One Thing Worth Talking About", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const withinContent = [
  { id: "within-patterns-over-time", exactText: "Across three different weeks, Arjun returned to questions about how light changes what we see.\n\nThe moments appeared in science, in a story, and while walking home. Together they suggest a recurring interest — not a conclusion about him.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Within / Patterns Over Time", illustrative: true },
  { id: "within-pause", exactText: "Arjun often notices what changes when he looks again.\n\nWhat might he be paying attention to that is easy for an adult to pass by?", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Within / Pause", illustrative: true },
  { id: "within-just-arjun", exactText: "Arjun sometimes stays with one small detail long after the activity has moved on. At other times, he is ready to leave it quickly.\n\nBoth moments belong here, without comparison or a fixed label.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Within / Just Arjun", illustrative: true },
  { id: "within-moments", exactText: "On the walk home, Arjun stopped beneath a tree and said, “My shadow is walking in front of me now.”\n\nNothing needed to follow. It was simply a moment worth keeping.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Within / Moments", illustrative: true },
  { id: "within-story-so-far", exactText: "Arjun’s questions often begin with something ordinary: a shadow, a sentence in a story, a difference he has noticed.\n\nSome return later in another form; others pass. The story so far holds both, without deciding what they must mean.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Editorial example review, 2026-09-01", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far", illustrative: true },
  { id: "within-story-gratitude", exactText: "Thank you for noticing what often goes unseen.", sourceType: "locked-app-copy", sourceReference: "components/product/within-reflection-card.tsx at Group 9 start", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far / closing line", illustrative: false },
] as const satisfies readonly EditorialContentRecord[];
