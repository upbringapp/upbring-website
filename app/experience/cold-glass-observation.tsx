"use client";

import { useState } from "react";
import styles from "./experience.module.css";

type ColdGlassObservationProps = {
  heading: string;
  body: string;
  explanationHeading: string;
  explanation: string;
};

export function ColdGlassObservation({
  heading,
  body,
  explanationHeading,
  explanation,
}: ColdGlassObservationProps) {
  const [revealed, setRevealed] = useState(false);
  const explanationId = "cold-glass-explanation";

  return (
    <article className={styles.coldGlassObservation}>
      <div className={styles.observationCopy}>
        <h3>{heading}</h3>
        <p>{body}</p>
        <button
          type="button"
          className={styles.lookCloser}
          aria-expanded={revealed}
          aria-controls={explanationId}
          onClick={() => setRevealed((current) => !current)}
        >
          {revealed ? "Close" : "Look closer"}
        </button>
      </div>

      <svg
        className={`${styles.glass} ${revealed ? styles.glassRevealed : ""}`}
        viewBox="0 0 260 330"
        role="img"
        aria-labelledby="glass-title glass-description"
      >
        <title id="glass-title">A cold glass with condensation</title>
        <desc id="glass-description">
          Droplets form on the outside of a glass filled with water and ice.
        </desc>
        <path className={styles.glassOutline} d="M55 56h150l-15 237H70L55 56Z" />
        <path
          className={styles.waterLine}
          d="M66 136c39-8 89 8 128 0l-10 145H77L66 136Z"
        />
        <path
          className={styles.ice}
          d="m90 91 35-9 11 35-36 8-10-34Zm57 18 33-10 9 32-33 9-9-31Z"
        />
        <g className={styles.drops}>
          <circle cx="56" cy="101" r="2.5" />
          <circle cx="57.7" cy="124" r="1.8" />
          <circle cx="204" cy="94" r="2.6" />
          <circle cx="201.8" cy="121" r="2" />
          <circle cx="59.5" cy="160" r="2.8" />
          <circle cx="199.3" cy="166" r="2.5" />
          <circle cx="62" cy="188" r="2.2" />
          <circle cx="197" cy="210" r="2.5" />
          <circle cx="64.7" cy="240" r="2.6" />
          <circle cx="193.8" cy="251" r="2" />
        </g>
      </svg>

      <div
        id={explanationId}
        className={`${styles.condensationExplanation} ${revealed ? styles.condensationExplanationRevealed : ""}`}
      >
        <h3>{explanationHeading}</h3>
        <p>{explanation}</p>
      </div>
    </article>
  );
}
