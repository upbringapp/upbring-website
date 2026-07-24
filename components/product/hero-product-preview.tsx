const homeOutputs = [
  "Aaj Kya Seekha",
  "Parent Summary",
  "Real Life Mein Dekho",
  "Dinner Table Conversation",
  "Worth Revisiting",
] as const;

export function HeroProductPreview() {
  return (
    <div
      aria-label="Home product preview"
      className="quiet-surface w-full max-w-xl justify-self-end"
    >
      <h2 className="text-2xl md:text-3xl">Home</h2>

      <ol className="mt-7">
        {homeOutputs.map((label, index) => (
          <li
            key={label}
            className="flex min-h-16 items-center gap-4 border-t border-[var(--border)] py-4 first:border-t-0 first:pt-0"
          >
            <span
              aria-hidden="true"
              className="text-sm tabular-nums text-[var(--text-tertiary)]"
            >
              {index + 1}
            </span>
            <span className="font-heading text-base text-[var(--text-primary)] md:text-lg">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
