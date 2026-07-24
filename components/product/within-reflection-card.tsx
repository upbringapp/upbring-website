type WithinReflectionCardProps = {
  label: string;
  variant: "patterns" | "pause" | "personal" | "moments" | "story";
};

export function WithinReflectionCard({
  label,
  variant,
}: WithinReflectionCardProps) {
  const layoutClasses = {
    patterns: "min-h-80 lg:col-span-2",
    pause: "min-h-64",
    personal: "min-h-72",
    moments: "min-h-64",
    story: "min-h-80 lg:col-span-2",
  } as const;

  return (
    <li
      className={`flex flex-col rounded-[var(--card-radius)] border border-[var(--border)] bg-white p-6 md:p-8 ${layoutClasses[variant]}`}
    >
      <h3 className="text-xl md:text-2xl">{label}</h3>

      <div aria-hidden="true" className="mt-auto pt-12">
        {variant === "patterns" ? (
          <div className="grid gap-5 md:grid-cols-3">
            <span className="block min-h-20 rounded-2xl border border-[var(--border)]" />
            <span className="block min-h-20 rounded-2xl border border-[var(--border)]" />
            <span className="block min-h-20 rounded-2xl border border-[var(--border)]" />
          </div>
        ) : null}

        {variant === "pause" ? (
          <div className="space-y-4">
            <span className="block h-px w-full bg-[var(--border)]" />
            <span className="block h-px w-2/3 bg-[var(--border)]" />
          </div>
        ) : null}

        {variant === "personal" ? (
          <div className="rounded-2xl border border-[var(--border)] p-5">
            <span className="block h-px w-1/2 bg-[var(--border)]" />
          </div>
        ) : null}

        {variant === "moments" ? (
          <div className="flex gap-3">
            <span className="block size-14 rounded-2xl border border-[var(--border)]" />
            <span className="block size-14 rounded-2xl border border-[var(--border)]" />
          </div>
        ) : null}

        {variant === "story" ? (
          <div className="space-y-4">
            <span className="block h-px w-full bg-[var(--border)]" />
            <span className="block h-px w-5/6 bg-[var(--border)]" />
            <span className="block h-px w-2/3 bg-[var(--border)]" />
          </div>
        ) : null}
      </div>

      {variant === "story" ? (
        <p className="mt-12 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
          Thank you for noticing what often goes unseen.
        </p>
      ) : null}
    </li>
  );
}
