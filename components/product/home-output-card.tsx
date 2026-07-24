type HomeOutputCardProps = {
  index: number;
  label: string;
  variant?: "standard" | "conversation" | "revisiting";
};

export function HomeOutputCard({
  index,
  label,
  variant = "standard",
}: HomeOutputCardProps) {
  const layoutClasses = {
    standard:
      "lg:col-start-1 lg:border-r lg:border-[var(--border)] lg:[&:nth-child(1)]:row-start-1 lg:[&:nth-child(2)]:row-start-2 lg:[&:nth-child(3)]:row-start-3",
    conversation:
      "min-h-48 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0",
    revisiting: "lg:col-start-2 lg:row-start-3",
  } as const;

  return (
    <li
      className={`border-t border-[var(--border)] p-6 first:border-t-0 md:p-8 ${layoutClasses[variant]}`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="pt-1 text-sm tabular-nums text-[var(--text-tertiary)]"
        >
          {index}
        </span>
        <h3 className="text-xl md:text-2xl">{label}</h3>
      </div>

      {variant === "conversation" ? (
        <div
          aria-hidden="true"
          className="ml-8 mt-10 space-y-3 border-l border-[var(--border)] pl-5"
        >
          <span className="block h-px w-full max-w-xs bg-[var(--border)]" />
          <span className="block h-px w-4/5 max-w-64 bg-[var(--border)]" />
        </div>
      ) : null}

      {variant === "revisiting" ? (
        <div aria-hidden="true" className="ml-8 mt-7 grid gap-3">
          <span className="block min-h-11 rounded-2xl border border-[var(--border)] bg-white" />
          <span className="block min-h-11 rounded-2xl border border-[var(--border)] bg-white" />
        </div>
      ) : null}
    </li>
  );
}
