"use client";

import { useState } from "react";
import styles from "./experience.module.css";

type ColdGlassObservationProps = {
  label: string;
  heading: string;
  body: string;
  explanationHeading: string;
  explanation: string;
};

export function ColdGlassObservation({
  label,
  heading,
  body,
  explanationHeading,
  explanation,
}: ColdGlassObservationProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <article className={styles.observationCopy}>
        <p className={styles.eyebrow}>{label}</p>
        <h2 id="real-life-heading">{heading}</h2>
        <p>{body}</p>
        <button
          type="button"
          className={styles.lookCloser}
          aria-pressed={revealed}
          onClick={() => setRevealed((current) => !current)}
        >
          {revealed ? "Close" : "Look closer"}
        </button>
      </article>

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
          <path d="M42 128c-8 12-12 18-12 24a12 12 0 0 0 24 0c0-6-4-12-12-24Z" />
          <path d="M220 162c-7 10-10 15-10 20a10 10 0 0 0 20 0c0-5-3-10-10-20Z" />
          <path d="M37 219c-5 8-8 12-8 16a8 8 0 0 0 16 0c0-4-3-8-8-16Z" />
        </g>
      </svg>

      <div
        className={`${styles.condensationExplanation} ${revealed ? styles.condensationExplanationRevealed : ""}`}
      >
        <h3>{explanationHeading}</h3>
        <p>{explanation}</p>
      </div>
    </>
  );
}
