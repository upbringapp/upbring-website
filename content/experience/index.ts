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
  aajKaSaar: {
    title: "Aaj Ka Saar",
    body: "The ice cube, the tea steam, and the cold water in your glass are the exact same water—just wearing three different suits.",
    provenance: sciencePreview,
  },
  aajKyaSeekha: {
    title: "Aaj Kya Seekha",
    paragraphs: [
      "Water is a shape-shifter, but it never stops being water.",
      "When it gets cold enough, its tiny particles settle into a fixed arrangement, turning liquid water into hard ice.",
      "At room temperature, it flows freely as liquid water.",
      "When liquid water warms, some of it can escape from the surface into the air as invisible water vapour. This change is called evaporation.",
      "It can change its shape, how freely it moves, and the form we see—but through every change, it remains water.",
    ],
    provenance: sciencePreview,
  },
  parentSummary: {
    label: "2-Minute Parent Summary",
    title: "The Steel Glass Isn't Leaking",
    paragraphs: [
      "When you take a chilled steel glass of water out of the fridge, beads of water soon appear on the outside.",
      "Most people think: Paani glass ke andar se chhan ke bahar aa raha hai.",
      "It isn't. Water cannot pass through solid steel.",
      "The air around us carries invisible water vapour. When this vapour touches the ice-cold glass, it cools and turns into tiny liquid water droplets on the surface.",
      "The water outside didn't escape from the glass. It came from the air around you.",
    ],
    provenance: sciencePreview,
  },
};

export const realLife = {
  label: "Real Life Mein Dekho",
  heading: "The Mirror After a Bath",
  paragraphs: [
    "After a warm bath, look at the bathroom mirror. Tiny droplets may have gathered across its surface.",
    "Draw a smiley face through the mist with your finger. A mirror that looked clear a moment ago has become a little canvas for water.",
  ],
  provenance: sciencePreview,
};

export const dinnerTable = {
  label: "DINNER TABLE CONVERSATION",
  heading: "Aaj raat poochiye:",
  question: "If clouds are made of water, why don't they fall out of the sky?",
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
    {
      label: "The Real Idea",
      title: "The Glass That Started Sweating",
      paragraphs: [
        "Water vapour is completely invisible, and it floats around our rooms all day. When water vapour in the air touches a cold surface and cools enough, it turns back into tiny, visible liquid water droplets.",
      ],
    },
    {
      label: "Common Misunderstanding",
      paragraphs: [
        "“Glass andar se leak ho raha hai!”",
        "Looks convincing. Sounds logical. But water cannot walk through steel—those drops came straight out of thin air.",
      ],
    },
    {
      label: "Beautiful Connection",
      title: "The Park Grass Wears Jewels",
      paragraphs: [
        "Step onto the grass early in the morning, and your slippers might get wet—even when it hasn't rained for days.",
        "As the grass cools overnight, water vapour in the air can turn into tiny droplets on its blades, leaving them sparkling with dew.",
        "The glass on your table and the grass beneath your feet share the same little water trick.",
      ],
    },
    {
      label: "Parent Lens",
      title: "Hand Them the Tissue First",
      paragraphs: [
        "When those water beads appear, resist the urge to announce, “Dekho, this is called condensation.”",
        "Hand your child a dry tissue and ask:",
        "“Ek baar poora sukha do. Ab thodi der dekho—paani wapas kahan se aaya?”",
        "Let the drops return.",
        "A little wonder can teach more than a quick answer.",
      ],
    },
    {
      label: "Future Beyond the Chapter",
      paragraphs: [
        "The tiny sweat drops on your cold glass have a giant cousin in the sky: clouds.",
        "High above us, water vapour cools and turns into billions of tiny water droplets or ice crystals, building clouds that can grow into monsoon rain clouds.",
        "As these droplets and ice crystals grow, some become large enough to fall as rain.",
        "From a little glass on your table to the monsoon sky above—water has a much bigger story to tell.",
      ],
    },
  ],
  provenance: sciencePreview,
};

export const canopy = {
  label: "Canopy",
  heading: "Curiosity, given room to breathe.",
  rhythm: "A Story → A Question → A Doing",
  create: { label: "Create", title: "The Melt Test", body: "Put one ice cube on a steel plate and one on a wooden chopping board.\nWhich one turns to water first, and why does the steel feel colder if both are in the same room?" },
  talk: {
    label: "One Thing Worth Talking About",
    topic: "Changing Your Mind",
    sections: [
      { label: "Big Question", body: "Why is it so hard to say ‘I was wrong’ — even when we already know we are?" },
      { label: "A Gentle Thought", body: "Sometimes changing our mind can feel like losing.\nWe may hold on to an idea because we have already defended it.\nMaybe the other person noticed something we had missed.\nBeing willing to see it doesn't make us weaker — it helps us grow." },
      { label: "Another Door Opens", body: "Does holding on to a wrong idea sometimes take more effort than changing your mind?\nWhat happens when we are too afraid to admit we might be wrong?\nIs there something you believe differently about today than you did a few years ago?" },
      { label: "Around the Table", body: "Has someone ever changed your mind without making you feel bad about being wrong?\nWhat did they do that made it easier to listen?\nIf you disagree with someone at home, what helps you keep the conversation respectful?" },
    ],
    thoughtLabel: "A Thought to Carry",
    thought: "Being wrong isn't the problem.\nBeing unwilling to change is.",
  },
  activities: [
    {
      label: "FOR YOUR FAMILY",
      title: "Reverse Spark",
      tagline: "Turn the tables tonight.",
      prompt: "What did you love doing when I was your age?",
      closing: "Ask at dinner. Every grown-up has a story waiting to unfold.",
    },
    {
      label: "FOR CHILD",
      title: "Open Canvas",
      tagline: "No rules. No wrong answers.",
      prompt: "When people compare you to a cousin or classmate, write down 3 things you bring to this world that a marksheet or report card will never be able to measure.",
      closing: "Put it on paper—there’s no wrong way to wonder.",
    },
  ],
  provenance: publicExample,
};

export const askTogether = {
  label: "Ask",
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
  patterns: {
    title: "Patterns Over Time",
    caption: "Themes that keep returning.\nNot scores. Directions. Arcs.",
    examples: ["Sky & Space", "Living World"],
    disclosure: "An example, not a record of your family.",
  },
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
