import type { EditorialContentRecord } from "@/content/editorial";

type CanopyEditorialCardProps = {
  label: string;
  content: EditorialContentRecord;
  variant?: "anchor" | "standard" | "conversation" | "activity" | "reflection";
};

export function CanopyEditorialCard({
  label,
  content,
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

      <div className="mt-auto pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          {content.approvalStatus === "approved" ? "Illustrative example" : "Requires editorial approval"}
        </p>
        <p className="mt-3 max-w-xl text-[var(--text-secondary)]">{content.exactText}</p>
      </div>
    </article>
  );
}
