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

export const homeContent = [
  { id: "home-aaj-kya-seekha", exactText: "A short reflection on what your child explored today — not only the topic, but the way they approached it.\n\nInstead of repeating textbook points, this section helps you understand the larger idea behind the day’s learning.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Home / Aaj Kya Seekha", illustrative: false },
  { id: "home-parent-summary", exactText: "A calm explanation written for parents.\n\nIt connects the day’s learning with everyday life, helping you understand why it may matter beyond homework.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Home / Parent Summary", illustrative: false },
  { id: "home-real-life-mein-dekho", exactText: "A gentle way to notice the day’s learning outside the notebook.\n\nIt offers simple things you can look for in everyday life, without turning the moment into another lesson.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Home / Real Life Mein Dekho", illustrative: false },
  { id: "home-dinner-table-conversation", exactText: "One thoughtful question to help the conversation begin naturally.\n\nThere is no correct answer to reach — only a chance to hear how your child is thinking.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Home / Dinner Table Conversation", illustrative: false },
  { id: "home-worth-revisiting", exactText: "A few ideas that may quietly return in the days ahead.\n\nThere is no need to revise them formally. Simply notice when your child meets them again in a new context.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Home / Worth Revisiting", illustrative: false },
] as const satisfies readonly EditorialContentRecord[];

export const canopyContent = [
  { id: "canopy-weekly-letter", exactText: "Quiet weeks are part of growing too.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, yourWeeklyLetter.body", approvalStatus: "approved", placement: "Canopy / Weekly Letter", illustrative: true },
  { id: "canopy-family-rhythms", exactText: "Small rituals.\n\nDeep roots.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, familyRhythms", approvalStatus: "approved", placement: "Canopy / Family Rhythms", illustrative: true },
  { id: "canopy-curiosities", exactText: "Short ideas that invite children and parents to wonder about the world together.\n\nThey begin with familiar things and leave room for one more question.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Canopy / Curiosities", illustrative: false },
  { id: "canopy-thinkers", exactText: "Stories and ideas from people who kept questioning, imagining, and looking again.\n\nThe focus is not on achievement alone, but on the thinking that made something new possible.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Canopy / Thinkers", illustrative: false },
  { id: "canopy-create", exactText: "Simple invitations to make, test, draw, build, or explore something together.\n\nThe activity matters, but so does the conversation that happens while doing it.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Canopy / Create", illustrative: false },
  { id: "canopy-dinner-table-conversation", exactText: "What made you smile today?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / Dinner Table Conversation", illustrative: true },
  { id: "canopy-do-this-together", exactText: "Curiosity doesn’t keep a schedule.", sourceType: "locked-app-copy", sourceReference: "upbring-lite/constants/emptyStates.ts, doThisTogether.body", approvalStatus: "approved", placement: "Canopy / Do This Together", illustrative: true },
  { id: "canopy-one-thing-worth-talking-about", exactText: "If you had to teach me just one question from today’s paper, which one would it be?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / One Thing Worth Talking About", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const withinContent = [
  { id: "within-patterns-over-time", exactText: "One moment rarely tells the whole story.\n\nOver time, small observations may begin to show what your child returns to, notices, or explores in different situations.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Within / Patterns Over Time", illustrative: false },
  { id: "within-pause", exactText: "Not every observation needs an immediate conclusion.\n\nPause offers a quiet question for the parent — something to carry for a while without rushing to answer it.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Within / Pause", illustrative: false },
  { id: "within-just-arjun", exactText: "A space centred only on your child.\n\nNo comparison with other children. No fixed labels. Just what has been gently noticed so far.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Within / Just Arjun", illustrative: false },
  { id: "within-moments", exactText: "Small moments that felt worth remembering.\n\nNot milestones or achievements — simply parts of family life that may mean more when looked back on later.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Within / Moments", illustrative: false },
  { id: "within-story-so-far", exactText: "Over time, separate observations and moments begin to sit beside one another.\n\nThis section brings them together carefully, without turning your child into a score, profile, or conclusion.", sourceType: "founder-approved-explanatory-copy", sourceReference: "Group 11 founder correction", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far", illustrative: false },
  { id: "within-story-gratitude", exactText: "Thank you for noticing what often goes unseen.", sourceType: "locked-app-copy", sourceReference: "components/product/within-reflection-card.tsx at Group 9 start", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far / closing line", illustrative: false },
] as const satisfies readonly EditorialContentRecord[];
