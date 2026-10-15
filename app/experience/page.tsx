import type { Metadata } from "next";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { WaitlistLink } from "@/components/layout/waitlist-link";
import { askTogether, canopy, closing, dinnerTable, home, opening, realLife, within, worthRevisiting } from "@/content/experience";
import { CanopyActivityCard } from "./canopy-activity-card";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "One idea from one school day",
  description: "Follow one Class 6 Science idea as it moves through the Nasbring experience.",
};

function Relationship({ label, detail, thematic = false }: { label?: string; detail?: string; thematic?: boolean }) {
  return <div className={`${styles.relationship} ${thematic ? styles.thematic : ""}`} aria-hidden={label ? undefined : true}><span aria-hidden="true" />{label ? <div><strong>{label}</strong>{detail ? <p>{detail}</p> : null}</div> : null}</div>;
}

export default function ExperiencePage() {
  return (
    <main className={styles.experience} data-experience-canvas>
      <section className={`${styles.screen} ${styles.opening}`} aria-labelledby="experience-opening"><div className={styles.openingCopy}><h1 id="experience-opening">{opening.title}</h1><p className={styles.openingSubtitle}>{opening.subtitle}</p><div className={styles.heroWaitlist}><p>Join the waitlist</p><WaitlistLink className={styles.heroWaitlistButton}>Start Quietly</WaitlistLink></div></div><svg className={styles.waterMark} viewBox="0 0 220 280" aria-hidden="true"><path d="M110 12C81 57 31 116 31 173c0 47 35 84 79 84s79-37 79-84c0-57-50-116-79-161Z" /><path d="M64 179c5 25 22 42 46 47" /></svg></section>

      <section className={`${styles.screen} ${styles.home}`} aria-labelledby="experience-home"><h2 id="experience-home" className={styles.eyebrow}>{home.label}</h2><div className={styles.chapterPair}><article className={`${styles.chapterCard} ${styles.chapterLead} ${styles.reveal}`}><p className={styles.cardIndex} aria-hidden="true">01</p><h3>{home.aajKaSaar.title}</h3><p>{home.aajKaSaar.body}</p></article><article className={`${styles.chapterCard} ${styles.reveal}`}><p className={styles.cardIndex} aria-hidden="true">02</p><h3>{home.aajKyaSeekha.title}</h3><div className={styles.editorialParagraphs}>{home.aajKyaSeekha.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><article className={`${styles.chapterCard} ${styles.reveal}`}><p className={styles.cardIndex} aria-hidden="true">03</p><p className={styles.microLabel}>{home.parentSummary.label}</p><h3>{home.parentSummary.title}</h3><div className={styles.editorialParagraphs}>{home.parentSummary.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></div><Relationship label="Reappears" detail="The first explanation is not always correct." /></section>

      <section className={`${styles.screen} ${styles.observation}`} aria-labelledby="real-life-heading"><div className={styles.observationGrid}><article className={`${styles.observationCopy} ${styles.reveal}`}><p className={styles.eyebrow}>{realLife.label}</p><h2 id="real-life-heading">{realLife.heading}</h2><div className={styles.editorialParagraphs}>{realLife.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><article className={`${styles.dinnerCard} ${styles.reveal}`}><p className={styles.eyebrow}>{dinnerTable.label}</p><h3>{dinnerTable.heading}</h3><blockquote>{dinnerTable.question}</blockquote><p>{dinnerTable.footer}</p></article></div></section>

      <section className={`${styles.screen} ${styles.worth}`} aria-labelledby="worth-heading"><div className={styles.sectionIntro}><p className={styles.eyebrow}>{worthRevisiting.label}</p><h2 id="worth-heading">{worthRevisiting.heading}</h2><p>{worthRevisiting.subline}</p></div><details className={`${styles.conceptTree} ${styles.reveal}`} open><summary><span>{worthRevisiting.title}</span><small>{worthRevisiting.teaser}</small></summary><div className={styles.conceptBody}>{worthRevisiting.sections.map((section) => <section key={section.label}><h3>{section.label}</h3>{section.title ? <h4>{section.title}</h4> : null}<div className={styles.editorialParagraphs}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.label === "The Real Idea" ? <Relationship label="Go deeper" detail="From droplets on glass to dew on grass." /> : null}</section>)}</div></details></section>

      <section id="canopy" className={`${styles.screen} ${styles.canopy}`} aria-labelledby="canopy-experience-heading"><div className={styles.sectionIntro}><p className={styles.eyebrow}>{canopy.label}</p><h2 id="canopy-experience-heading">{canopy.heading}</h2><p>{canopy.rhythm}</p></div><p className={styles.choiceNote}>Family choice and exploration.</p><div className={styles.canopyFlow}><article className={`${styles.createCard} ${styles.reveal}`}><p className={styles.eyebrow}>{canopy.create.label}</p><h3>{canopy.create.title}</h3><p>{canopy.create.body}</p></article><Relationship thematic label="Look again" detail="What we assume can change when we notice what actually happens." /><aside className={styles.peekCard}><p className={styles.eyebrow}>{canopy.talk.label}</p><h3>{canopy.talk.topic}</h3>{canopy.talk.sections.map((section) => <div key={section.label}><p className={styles.microLabel}>{section.label}</p><p>{section.body}</p></div>)}<p className={styles.microLabel}>{canopy.talk.thoughtLabel}</p><p>{canopy.talk.thought}</p></aside></div><div className={styles.activityGrid}>{canopy.activities.map((activity) => <CanopyActivityCard key={activity.title} {...activity} />)}</div><Relationship label="Reappears" detail="The water question returns from another angle." /></section>

      <section className={`${styles.screen} ${styles.ask}`} aria-labelledby="ask-heading"><div className={styles.askHero}><div><p className={styles.eyebrow}>{askTogether.label}</p></div><h2 id="ask-heading">{askTogether.question}</h2></div><div className={styles.askSections}>{askTogether.sections.map((section) => <article className={styles.reveal} key={section.label}><h3>{section.label}</h3><p>{section.body}</p></article>)}</div><Relationship label="Notice over time" detail="An invitation to wonder can become something gently noticed over time." /></section>

      <section id="within" className={`${styles.within} ${styles.screen}`} aria-labelledby="within-experience-heading"><div className={styles.sectionIntro}><h2 id="within-experience-heading">{within.label}</h2></div><div className={styles.withinStream}>
        <article className={`${styles.patterns} ${styles.reveal}`}><h3>{within.patterns.title}</h3><p>{within.patterns.caption}</p><p className={styles.emptyState}>{within.patterns.empty}</p></article>
        <article className={`${styles.pause} ${styles.reveal}`}><h3>{within.pause.title}</h3><p>{within.pause.caption}</p><blockquote>{within.pause.prompt}</blockquote><small>{within.pause.footer}</small></article>
        <article className={`${styles.mirror} ${styles.reveal}`}><h3>{within.mirror.title}</h3><p>{within.mirror.subtitle}</p><div className={styles.mirrorStructure}>{within.mirror.structure.map((section) => <section key={section.label}><h4>{section.label}</h4><p>{section.body}</p></section>)}</div></article>
        <article className={`${styles.justChild} ${styles.reveal}`}><h3>{within.child.title}</h3><p>{within.child.subtitle}</p><div><p className={styles.microLabel}>{within.child.questionLabel}</p><blockquote>{within.child.question}</blockquote><small>{within.child.answerNote}</small></div><div className={styles.childDetails}><div><p className={styles.microLabel}>{within.child.sayingsLabel}</p>{within.child.sayings.map((item) => <p key={item}>{item}</p>)}</div><div><p className={styles.microLabel}>{within.child.returnsLabel}</p><ul>{within.child.returns.map((item) => <li key={item}>{item}</li>)}</ul></div></div></article>
        <article className={`${styles.moments} ${styles.reveal}`}><h3>{within.moments.title}</h3><blockquote>{within.moments.moment}</blockquote><p>{within.moments.reflection}</p><small>{within.moments.footer}</small></article>
        <article className={`${styles.letter} ${styles.reveal}`}><h3>{within.letter.title}</h3><p>{within.letter.subtitle}</p><div className={styles.letterPaper}><h4>{within.letter.cardTitle}</h4><p>{within.letter.body}</p></div></article>
        <article className={`${styles.story} ${styles.reveal}`}><h3>{within.story.title}</h3><p>{within.story.subtitle}</p><div><p>{within.story.body}</p></div></article>
      </div></section>

      <section id="waitlist" className={`${styles.screen} ${styles.closing}`} aria-labelledby="closing-promise"><p className={styles.eyebrow}>Nasbring</p><h2 id="closing-promise">{closing}</h2><WaitlistForm /></section>
    </main>
  );
}
