import styles from "./experience.module.css";

type CanopyActivityCardProps = {
  label: string;
  title: string;
  tagline: string;
  prompt: string;
  closing: string;
};

export function CanopyActivityCard({
  label,
  title,
  tagline,
  prompt,
  closing,
}: CanopyActivityCardProps) {
  return (
    <details className={`${styles.activityCard} ${styles.reveal}`}>
      <summary>
        <span className={styles.activitySummaryCopy}>
          <span className={styles.eyebrow}>{label}</span>
          <strong>{title}</strong>
          <span>{tagline}</span>
        </span>
        <span className={styles.activityToggle} aria-hidden="true">
          Open
        </span>
      </summary>
      <div className={styles.activityBody}>
        <blockquote>{prompt}</blockquote>
        <p>{closing}</p>
      </div>
    </details>
  );
}
