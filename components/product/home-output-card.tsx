import type { EditorialContentRecord } from "@/content/editorial";

type HomeOutputCardProps = {
  index: number;
  label: string;
  content: EditorialContentRecord;
  variant?: "standard" | "conversation" | "revisiting";
};

export function HomeOutputCard({
  index,
  label,
  content,
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

      <div className={`ml-8 mt-7 ${variant === "conversation" ? "border-l border-[var(--border)] pl-5" : ""}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          {content.approvalStatus === "approved" ? "Illustrative example" : "Requires editorial approval"}
        </p>
        <p className="mt-3 max-w-xl text-[var(--text-secondary)]">{content.exactText}</p>
      </div>
    </li>
  );
}
