const trustStatements = [
  "Not marks.",
  "Not rankings.",
  "Not comparisons.",
  "Not pressure.",
  "Not perfection.",
] as const;

export function TrustSequence() {
  return (
    <section
      aria-label="Nasbring principles"
      className="border-y border-[var(--border)]"
    >
      <div className="page-container py-10 md:py-12">
        <p className="sr-only">
          Not marks. Not rankings. Not comparisons. Not pressure. Not
          perfection.
        </p>
        <ul
          aria-hidden="true"
          className="flex flex-wrap gap-x-8 gap-y-3 text-base text-[var(--text-secondary)] md:justify-between md:text-lg"
        >
          {trustStatements.map((statement) => (
            <li key={statement}>{statement}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
