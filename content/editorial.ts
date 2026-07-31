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

const editorialApprovalRequired = (record: {
  id: string;
  placement: string;
  sourceReference: string;
}): EditorialContentRecord => ({
  ...record,
  exactText: "Editorial content required before this illustrative preview can be published.",
  sourceType: "approved-editorial-library",
  approvalStatus: "requires-editorial-approval",
  illustrative: true,
});

export const homeContent = [
  editorialApprovalRequired({ id: "home-aaj-kya-seekha", placement: "Home / Aaj Kya Seekha", sourceReference: "Approved Class 6 Gold chapter excerpt not present in repository" }),
  editorialApprovalRequired({ id: "home-parent-summary", placement: "Home / Parent Summary", sourceReference: "Approved Class 6 Gold chapter parent summary not present in repository" }),
  editorialApprovalRequired({ id: "home-real-life-mein-dekho", placement: "Home / Real Life Mein Dekho", sourceReference: "Approved Class 6 Gold chapter real-life prompt not present in repository" }),
  editorialApprovalRequired({ id: "home-dinner-table-conversation", placement: "Home / Dinner Table Conversation", sourceReference: "Approved Class 6 Gold chapter conversation prompt not present in repository" }),
  editorialApprovalRequired({ id: "home-worth-revisiting", placement: "Home / Worth Revisiting", sourceReference: "Approved Class 6 Gold chapter revisit prompt not present in repository" }),
] as const satisfies readonly EditorialContentRecord[];

export const canopyContent = [
  editorialApprovalRequired({ id: "canopy-weekly-letter", placement: "Canopy / Weekly Letter", sourceReference: "Approved Class 6 Weekly Letter excerpt not present in repository" }),
  editorialApprovalRequired({ id: "canopy-family-rhythms", placement: "Canopy / Family Rhythms", sourceReference: "Approved Class 6 Family Rhythms excerpt not present in repository" }),
  { id: "canopy-curiosities", exactText: "The world becomes more interesting when we keep asking why.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Curiosities", illustrative: true },
  { id: "canopy-thinkers", exactText: "Questions bigger than answers.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Thinkers", illustrative: true },
  { id: "canopy-create", exactText: "Build it. Break it. Understand it.", sourceType: "approved-marketing-copy", sourceReference: "components/sections/canopy-section.tsx at Group 9 start", approvalStatus: "approved", placement: "Canopy / Create", illustrative: true },
  { id: "canopy-dinner-table-conversation", exactText: "What made you smile today?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / Dinner Table Conversation", illustrative: true },
  editorialApprovalRequired({ id: "canopy-do-this-together", placement: "Canopy / Do This Together", sourceReference: "Approved Class 6 shared activity not present in repository" }),
  { id: "canopy-one-thing-worth-talking-about", exactText: "If you had to teach me just one question from today’s paper, which one would it be?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Canopy / One Thing Worth Talking About", illustrative: true },
] as const satisfies readonly EditorialContentRecord[];

export const withinContent = [
  editorialApprovalRequired({ id: "within-patterns-over-time", placement: "Within / Patterns Over Time", sourceReference: "Approved recurring illustrative moments for Arjun not present in repository" }),
  { id: "within-pause", exactText: "Galti se aaj tumhe kya seekh mili?", sourceType: "approved-editorial-library", sourceReference: "app/page.tsx at repository commit 30f2c84, Parent Companion", approvalStatus: "approved", placement: "Within / Pause", illustrative: true },
  editorialApprovalRequired({ id: "within-just-arjun", placement: "Within / Just Arjun", sourceReference: "Approved neutral illustrative observation for Arjun not present in repository" }),
  editorialApprovalRequired({ id: "within-moments", placement: "Within / Moments", sourceReference: "Approved privacy-safe illustrative moments for Arjun not present in repository" }),
  editorialApprovalRequired({ id: "within-story-so-far", placement: "Within / Arjun’s Story So Far", sourceReference: "Approved tentative cumulative narrative for Arjun not present in repository" }),
  { id: "within-story-gratitude", exactText: "Thank you for noticing what often goes unseen.", sourceType: "locked-app-copy", sourceReference: "components/product/within-reflection-card.tsx at Group 9 start", approvalStatus: "approved", placement: "Within / Arjun’s Story So Far / closing line", illustrative: false },
] as const satisfies readonly EditorialContentRecord[];
