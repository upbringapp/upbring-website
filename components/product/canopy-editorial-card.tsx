type CanopyEditorialCardProps = {
  label: string;
  supportingLine?: string;
  variant?: "anchor" | "standard" | "conversation" | "activity" | "reflection";
};

export function CanopyEditorialCard({
  label,
  supportingLine,
  variant = "standard",
}: CanopyEditorialCardProps) {
  const variantClasses = {
    anchor: "min-h-72 md:min-h-80 lg:col-span-2",
    standard: "min-h-48",
    conversation: "min-h-64 lg:col-span-2",
    activity: "min-h-56",
    reflection: "min-h-56",
  } as const;

  return (
    <article
      className={`flex flex-col rounded-[var(--card-radius)] border border-[var(--border)] bg-white p-6 md:p-8 ${variantClasses[variant]}`}
    >
      <h3 className="text-xl md:text-2xl">{label}</h3>

      {supportingLine ? (
        <p className="mt-4 max-w-xl text-[var(--text-secondary)]">
          {supportingLine}
        </p>
      ) : null}

      <div
        aria-hidden="true"
        className="mt-auto space-y-3 pt-10 text-[var(--border)]"
      >
        <span className="block h-px w-full bg-current" />
        <span className="block h-px w-3/4 bg-current" />
      </div>
    </article>
  );
}
