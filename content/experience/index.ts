export type ExperienceProvenance = {
  source: "science-class6-ch08" | "founder-authored-website-demo" | "public-safe-curated-example";
  status: "preview";
  publicSafe: true;
};

const sciencePreview = {
  source: "science-class6-ch08",
  status: "preview",
  publicSafe: true,
} as const satisfies ExperienceProvenance;

const founderDemo = {
  source: "founder-authored-website-demo",
  status: "preview",
  publicSafe: true,
} as const satisfies ExperienceProvenance;

const publicExample = {
  source: "public-safe-curated-example",
  status: "preview",
  publicSafe: true,
} as const satisfies ExperienceProvenance;

export const opening = {
  title: "One idea from one school day.",
  subtitle: "Class 6 Science · A Journey through States of Water.",
  provenance: sciencePreview,
};

export const home = {
  label: "Home",
  aajKyaSeekha: {
    title: "Aaj Kya Seekha",
    body: "Water is a shape-shifter, but it never stops being water.\nIt can be ice, liquid water or invisible water vapour.\nHeating and cooling can change water from one state to another.\nYou see this in melting ice, drying puddles and forming droplets.",
    provenance: sciencePreview,
  },
  parentSummary: {
    title: "Parent Summary",
    body: "Water is changing around us all the time.\nWet clothes drying, ice melting and droplets forming on a cold glass are all signs of this.\nThese everyday moments help us understand how water changes from one state to another.\nSometimes, looking closely is enough to turn an ordinary moment into science.",
    provenance: sciencePreview,
  },
};

export const realLife = {
  label: "Real Life Mein Dekho",
  heading: "Try this:",
  body: "Fill a glass with cold water and a few ice cubes.\nLeave it untouched for five minutes and look closely at the outside.\nWhere did those droplets come from?",
  explanationHeading: "What’s happening?",
  explanation: "The droplets did not come through the glass.\nWater vapour in the air touched the cold glass and cooled down.\nIt changed from gas into tiny drops of liquid water.\nThis change is called condensation.",
  provenance: sciencePreview,
};

export const dinnerTable = {
  label: "Dinner Table Conversation",
  heading: "Aaj raat poochiye:",
  question: "Where do you think the water on the outside of a cold glass comes from?",
  footer: "Not to test them.\nJust to wander together.",
  provenance: sciencePreview,
};

export const worthRevisiting = {
  label: "Worth Revisiting",
  heading: "The chapter doesn't have to end in one day.",
  subline: "Some ideas slowly find their place.",
  title: "The Water Wasn't Seeping Through the Glass",
  teaser: "The obvious explanation felt right. But was it right?",
  sections: [
    { label: "The real idea", body: "The water on the glass didn't come from inside it.\nWater vapour in the air cooled against the cold glass and became tiny drops of water.\nYou see the same thing when dew forms on cool grass in the morning.\nThis change from gas to liquid is called condensation." },
    { label: "Common misunderstanding", body: "It looks like the water has somehow come through the glass.\nBut the glass isn't leaking, and the water inside hasn't escaped.\nThe droplets actually came from water vapour already present in the air.\nCooling made that invisible vapour become liquid water." },
    { label: "Future beyond the chapter", body: "Condensation is one small step toward understanding how weather works.\nHigh up in the sky, water vapour cools and condenses into tiny water droplets.\nThese droplets gather to form clouds, which are part of the water cycle.\nSo the drops on a cold glass are connected to something much bigger: rain and weather." },
  ],
  provenance: sciencePreview,
};

export const canopy = {
  label: "Canopy",
  heading: "Curiosity, given room to breathe.",
  rhythm: "A Story → A Question → A Doing",
  create: { label: "Create", title: "The Melt Test", body: "Put one ice cube on a steel plate and one on a wooden chopping board.\nWhich one turns to water first, and why does the steel feel colder if both are in the same room?" },
  talk: { label: "One Thing Worth Talking About", topic: "Changing Your Mind", thoughtLabel: "A Thought to Carry", thought: "Being wrong isn't the problem.\nBeing unwilling to change is." },
  provenance: publicExample,
};

export const askTogether = {
  label: "Ask",
  disclosure: "Founder-authored website demonstration",
  question: "If water vapour is invisible, how do we know it's there?",
  sections: [
    { label: "Gentle Thought", body: "Water vapour is invisible because its water molecules are spread out in the air.\nWe know it is there when it cools and turns into tiny water droplets we can see.\nThis is what happens when mist or fog forms.\nThe white cloud above hot water is also made of tiny droplets, not water vapour." },
    { label: "More to Wonder", body: "Water vapour is around us even when we cannot see it.\nWhen warm, moist air meets something cooler, tiny drops can appear.\nYou can notice this on a cold glass, a mirror or a cool window.\nWhat other places might show us invisible water?" },
    { label: "Ask Together", body: "Have you ever seen a mirror turn misty after a hot shower?\nWhere do you think those tiny drops come from?\nIs the water coming from the mirror — or from the air around it?" },
    { label: "Parent Lens", body: "Next time you notice water appearing where you didn't expect it, pause and wonder together.\nYou could ask: “Where do you think that water came from?”\nLook for it on a cold glass, in morning fog, or above a hot cup of water.\nNo need to give the answer straight away." },
    { label: "Try This", body: "Next time you take a hot shower, look closely at the mirror afterwards.\nNotice the tiny drops that appear on its surface.\nWhere did that water come from?\nWipe the mirror and watch what happens as it dries." },
  ],
  provenance: founderDemo,
};

export const within = {
  label: "Within",
  patterns: { title: "Patterns Over Time", caption: "Themes that keep returning.\nNot scores. Directions. Arcs.", empty: "Patterns aren't found in a single moment. They appear gently over time." },
  pause: { title: "Pause", caption: "A moment to notice yourself too.\nNot advice. Just quiet invitations.", prompt: "Did you knock on their bedroom door and wait for a reply before turning the handle and walking in today?", footer: "No answers required." },
  mirror: {
    title: "Mirror",
    subtitle: "A space to pause, reflect, and think differently about parenting moments.",
    structure: [
      {
        label: "This Week",
        body: "My child says they're studying, but I sometimes wonder if they're really focused. How do I stay involved without making them feel watched?",
      },
      {
        label: "What May Be Happening",
        body: "At this age, schoolwork and screen time can sometimes look almost identical from the outside.\nA child may be switching between work, messages, videos or simply taking a break.\nAnd sometimes, what looks like avoidance is actually a need for a little independence.",
      },
      {
        label: "Why It Feels Difficult",
        body: "You want to know they're okay without making them feel like they're being watched.\nChecking can bring reassurance for a moment, but too much checking can make trust harder to build.\nStepping back can feel uncomfortable when you don't know what is happening.",
      },
      {
        label: "What You Can Try",
        body: "Start with the work, not the screen.\nAsk what they're working on, what they need to finish, or whether they'd like help — before asking what they're doing on the device.\nYou might also agree on one simple expectation for study time and give them room to manage the rest.",
      },
      {
        label: "Something to Notice Next",
        body: "When you feel the urge to check, notice what feels harder: trusting that they can manage their own focus — or sitting with the uncertainty of not knowing.",
      },
    ],
  },
  child: { title: "Just [Child]", subtitle: "Things that stayed with him.", questionLabel: "A Quiet Question", question: "When a teacher explains something and you don't understand it at all, what stops you from raising your hand — the fear that it's a silly question, or the feeling that everyone else already gets it?", answerNote: "No right answer. Just his.", sayingsLabel: "Something They Often Say", sayings: ["Can we…?", "I wonder…?"], returnsLabel: "Things They Keep Returning To", returns: ["Questions", "Food", "Nature", "Maps", "Animals", "Stories", "Space"] },
  moments: { title: "Moments We Didn't Want to Forget", moment: "While walking home, we stopped to point out the moon — and then spent the next few minutes trying to follow it between the buildings.", reflection: "Some moments don't need to teach us anything.\nThey're just worth remembering.", footer: "Small memories worth keeping." },
  letter: { title: "Weekly Letter", subtitle: "This week's letter about your child.", cardTitle: "Curious Questions From Their Week", body: "This week brought a few questions about the natural world.\n\nA question about why the moon can sometimes be seen during the day opened one window into curiosity about space. Another, about why leaves change colour, turned attention towards the changing world around us.\n\nTwo very different questions, perhaps. But both invite the same kind of pause: What makes the world around us work the way it does?\n\nAnd sometimes, that is what a week leaves behind — not an answer, but a question worth carrying forward." },
  story: { title: "Story So Far", subtitle: "What we've noticed so far, without rushing to conclusions.", body: "A few curious threads came together.\n\nThis month, questions about food and living things opened up a closer look at the natural world.\n\nPlants became especially interesting — particularly how they make their own food using sunlight and air. The idea of photosynthesis came up more than once, making the hidden work happening inside a leaf a little less hidden.\n\nThe questions didn't always need an immediate answer. Some were simply worth staying with, looking at again, and wondering about a little more.\n\nAnd perhaps that is where the story stands for now: not finished, just beginning to take shape." },
  provenance: publicExample,
};

export const closing = "Nasbring doesn't give parents more information about their child.\nIt helps them see the connections between what their child learns, wonders, does, says and becomes over time.";

export { founderDemo, publicExample, sciencePreview };
