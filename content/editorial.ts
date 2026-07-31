export type EditorialSourceType =
  | "locked-app-copy"
  | "approved-editorial-library"
  | "approved-marketing-copy"
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

export const homeContent = [
  { id: "home-aaj-kya-seekha", exactText: "Science begins with paying attention.\n\nToday, the chapter introduced three quiet habits that scientists return to again and again:\n\nnoticing carefully,\n\nasking thoughtful questions,\n\nand testing ideas instead of simply assuming them.\n\nMore than learning a definition, the child began seeing how curiosity slowly becomes understanding.", sourceType: "approved-editorial-library", sourceReference: "upbring-lite/functions/src/editorial/goldChapters/scienceClass6Chapter1.ts, metadata.status approved, runtime.aajKyaSeekha", approvalStatus: "approved", placement: "Home / Aaj Kya Seekha", illustrative: true },
  { id: "home-parent-summary", exactText: "Curiosity often begins quietly.\n\nA child who pauses to notice, wonders why, or asks one more question is already practising the habits that Science depends on.\n\nNot every question needs an immediate answer.\n\nSometimes, staying curious a little longer is where learning truly begins.", sourceType: "approved-editorial-library", sourceReference: "upbring-lite/functions/src/editorial/goldChapters/scienceClass6Chapter1.ts, metadata.status approved, runtime.parentSummary", approvalStatus: "approved", placement: "Home / Parent Summary", illustrative: true },
  { id: "home-real-life-mein-dekho", exactText: "Today, try noticing one ordinary thing that usually goes unnoticed.\n\nDon't rush to explain it.\n\nSimply ask,\n\n\"What did you notice today?\"", sourceType: "approved-editorial-library", sourceReference: "upbring-lite/functions/src/editorial/goldChapters/scienceClass6Chapter1.ts, metadata.status approved, runtime.realLifeMeinDekho.paragraphs", approvalStatus: "approved", placement: "Home / Real Life Mein Dekho", illustrative: true },
  { id: "home-dinner-table-conversation", exactText: "What's something you noticed today that you had never really paid attention to before?", sourceType: "approved-editorial-library", sourceReference: "upbring-lite/functions/src/editorial/goldChapters/scienceClass6Chapter1.ts, metadata.status approved, runtime.dinnerTableConversation", approvalStatus: "approved", placement: "Home / Dinner Table Conversation", illustrative: true },
  { id: "home-worth-revisiting", exactText: "During the coming week, you may naturally notice your child returning to:\n\nNo need to revise these formally.\n\nJust notice when curiosity shows up on its own.\n\nObservation\nCuriosity\nExploration", sourceType: "approved-editorial-library", sourceReference: "upbring-lite/functions/src/editorial/goldChapters/scienceClass6Chapter1.ts, metadata.status approved, runtime.worthRevisiting", approvalStatus: "approved", placement: "Home / Worth Revisiting", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const canopyContent = [
  { id: "canopy-weekly-letter", exactText: "Quiet weeks are part of growing too.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, yourWeeklyLetter.body", approvalStatus: "approved", placement: "Canopy / Weekly Letter", illustrative: true },
  { id: "canopy-family-rhythms", exactText: "Small rituals.\n\nDeep roots.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, familyRhythms", approvalStatus: "approved", placement: "Canopy / Family Rhythms", illustrative: true },
  { id: "canopy-curiosities", exactText: "The world becomes more interesting when we keep asking why.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Curiosities", illustrative: true },
  { id: "canopy-thinkers", exactText: "Questions bigger than answers.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Thinkers", illustrative: true },
  { id: "canopy-create", exactText: "Build it. Break it. Understand it.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Create", illustrative: true },
  { id: "canopy-dinner-table-conversation", exactText: "What made you smile today?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / Dinner Table Conversation", illustrative: true },
  { id: "canopy-do-this-together", exactText: "Curiosity doesn’t keep a schedule.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, doThisTogether.body", approvalStatus: "approved", placement: "Canopy / Do This Together", illustrative: true },
  { id: "canopy-one-thing-worth-talking-about", exactText: "If you had to teach me just one question from today’s paper, which one would it be?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / One Thing Worth Talking About", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const withinContent = [
  { id: "within-patterns-over-time", exactText: "Patterns aren’t found in a single moment. They appear gently over time.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, patternsOverTime.body", approvalStatus: "approved", placement: "Within / Patterns Over Time", illustrative: true },
  { id: "within-pause", exactText: "Galti se aaj tumhe kya seekh mili?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Within / Pause", illustrative: true },
  { id: "within-just-arjun", exactText: "Not everything needs a label today.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, whatWeSeeInHim.body", approvalStatus: "approved", placement: "Within / Just Arjun", illustrative: true },
  { id: "within-moments", exactText: "Some moments stay for reasons no one notices at first.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, aMomentThatStayed.body", approvalStatus: "approved", placement: "Within / Moments", illustrative: true },
  { id: "within-story-so-far", exactText: "Every family story has a first line. Yours is waiting to be written.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, hisStorySoFar.body", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far", illustrative: true },
  { id: "within-story-gratitude", exactText: "Thank you for noticing what often goes unseen.", sourceType: "locked-app-copy", sourceReference: "components/product/within-reflection-card.tsx at Group 9 start", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far / closing line", illustrative: false },
] as const satisfies readonly EditorialContentRecord[];
