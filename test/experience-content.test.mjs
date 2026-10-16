import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const content = readFileSync(join(root, "content/experience/index.ts"), "utf8");
const page = readFileSync(join(root, "app/experience/page.tsx"), "utf8");
const coldGlass = readFileSync(
  join(root, "app/experience/cold-glass-observation.tsx"),
  "utf8",
);
const experienceStyles = readFileSync(
  join(root, "app/experience/experience.module.css"),
  "utf8",
);
const header = readFileSync(join(root, "components/layout/site-header.tsx"), "utf8");
const mobileNavigation = readFileSync(
  join(root, "components/layout/mobile-navigation.tsx"),
  "utf8",
);

function expectInOrder(source, fragments) {
  let cursor = -1;

  for (const fragment of fragments) {
    const next = source.indexOf(fragment, cursor + 1);
    assert.notEqual(next, -1, `Missing expected content: ${fragment}`);
    assert.ok(next > cursor, `Content is out of order: ${fragment}`);
    cursor = next;
  }
}

test("Home preserves the approved editorial order and exact copy", () => {
  expectInOrder(content, [
    'title: "Aaj Ka Saar"',
    'body: "The ice cube, the tea steam, and the cold water in your glass are the exact same water—just wearing three different suits."',
    'title: "Aaj Kya Seekha"',
    '"Water is a shape-shifter, but it never stops being water."',
    '"When it gets cold enough, its tiny particles settle into a fixed arrangement, turning liquid water into hard ice."',
    '"At room temperature, it flows freely as liquid water."',
    '"When liquid water warms, some of it can escape from the surface into the air as invisible water vapour. This change is called evaporation."',
    '"It can change its shape, how freely it moves, and the form we see—but through every change, it remains water."',
    'title: "The Steel Glass Isn\'t Leaking"',
  ]);

  assert.match(page, /home\.aajKyaSeekha\.paragraphs\.map/);
});

test("Worth Revisiting has exactly five approved subsections in order", () => {
  const worth = content.slice(
    content.indexOf("export const worthRevisiting"),
    content.indexOf("export const canopy"),
  );
  const labels = [...worth.matchAll(/label: "([^"]+)"/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(labels, [
    "Worth Revisiting",
    "The Real Idea",
    "Common Misunderstanding",
    "Beautiful Connection",
    "Parent Lens",
    "Future Beyond the Chapter",
  ]);

  expectInOrder(worth, [
    'title: "Hand Them the Tissue First"',
    '"When those water beads appear, resist the urge to announce, “Dekho, this is called condensation.”"',
    '"Hand your child a dry tissue and ask:"',
    '"“Ek baar poora sukha do. Ab thodi der dekho—paani wapas kahan se aaya?”"',
    '"Let the drops return."',
    '"A little wonder can teach more than a quick answer."',
  ]);
  assert.match(page, /worthRevisiting\.sections\.map/);
  assert.doesNotMatch(page, /Future Beyond the Chapter/);
});

test("Real Life and Dinner Table preserve their approved content", () => {
  const realLife = content.slice(
    content.indexOf("export const realLife"),
    content.indexOf("export const dinnerTable"),
  );
  assert.match(realLife, /The Mirror After a Bath/);
  assert.match(realLife, /Draw a smiley face through the mist/);
  assert.doesNotMatch(realLife, /cold glass|ice cubes|condensation/i);

  expectInOrder(content, [
    'label: "DINNER TABLE CONVERSATION"',
    'heading: "Aaj raat poochiye:"',
    'question: "If clouds are made of water, why don\'t they fall out of the sky?"',
    'footer: "Not to test them.\\nJust to wander together."',
  ]);
});

test("Look closer restores the reversible cold-glass observation accessibly", () => {
  assert.match(page, /<ColdGlassObservation/);
  assert.match(page, /home\.parentSummary\.paragraphs\.slice\(3\)\.join/);
  assert.match(coldGlass, /useState\(false\)/);
  assert.match(coldGlass, /revealed \? "Close" : "Look closer"/);
  assert.match(coldGlass, /aria-expanded=\{revealed\}/);
  assert.match(coldGlass, /aria-controls=\{explanationId\}/);
  assert.match(coldGlass, /setRevealed\(\(current\) => !current\)/);
  assert.match(coldGlass, /styles\.glassRevealed/);
  assert.match(coldGlass, /id=\{explanationId\}/);
  assert.match(experienceStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(experienceStyles, /\.drops \{ transition: none; \}/);
});

test("Canopy contains the two fixed cards with their approved audiences", () => {
  const canopy = content.slice(
    content.indexOf("activities: ["),
    content.indexOf("provenance: publicExample", content.indexOf("activities: [")),
  );

  assert.equal((canopy.match(/label: "FOR YOUR FAMILY"/g) ?? []).length, 1);
  assert.equal((canopy.match(/label: "FOR CHILD"/g) ?? []).length, 1);
  assert.doesNotMatch(canopy, /FOR ARJUN/);
  expectInOrder(canopy, [
    'label: "FOR YOUR FAMILY"',
    'title: "Reverse Spark"',
    'prompt: "What did you love doing when I was your age?"',
    'closing: "Ask at dinner. Every grown-up has a story waiting to unfold."',
    'label: "FOR CHILD"',
    'title: "Open Canvas"',
    'prompt: "When people compare you to a cousin or classmate, write down 3 things you bring to this world that a marksheet or report card will never be able to measure."',
    'closing: "Put it on paper—there’s no wrong way to wonder."',
  ]);
});

test("Start Quietly is placed in the hero and removed from navigation", () => {
  const opening = page.slice(
    page.indexOf("styles.opening"),
    page.indexOf("styles.home"),
  );

  expectInOrder(opening, [
    "opening.title",
    "opening.subtitle",
    "Join the waitlist",
    "Start Quietly",
    'aria-hidden="true">→</span>',
  ]);
  assert.doesNotMatch(header, /Start quietly|Start Quietly/);
  assert.doesNotMatch(mobileNavigation, /Start quietly|Start Quietly/);
});

test("Patterns Over Time uses unequal illustrative examples without family data", () => {
  expectInOrder(content, [
    'title: "Patterns Over Time"',
    'caption: "Themes that keep returning.\\nNot scores. Directions. Arcs."',
    'examples: ["Sky & Space", "Living World"]',
    'disclosure: "An example, not a record of your family."',
  ]);
  assert.doesNotMatch(content, /Patterns aren't found in a single moment/);
  assert.match(page, /within\.patterns\.examples\.map/);
  assert.match(experienceStyles, /\.patternExample:first-child span \{ width: min\(44%, 8rem\); \}/);
  assert.doesNotMatch(page, /score|count|percentage|frequency/i);
});
