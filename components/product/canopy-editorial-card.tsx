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
    anchor: "lg:col-span-2",
    standard: "",
    conversation: "lg:col-span-2",
    activity: "",
    reflection: "",
  } as const;

  return (
    <article
      className={`flex flex-col rounded-[var(--card-radius)] border border-[var(--border)] bg-white p-6 md:p-8 ${variantClasses[variant]}`}
    >
      <h3 className="text-xl md:text-2xl">{label}</h3>

      <div className="mt-auto pt-8">
        {content.approvalStatus === "approved" ? (
          <p className="max-w-xl whitespace-pre-line text-[var(--text-secondary)]">
            {content.exactText}
          </p>
        ) : null}
      </div>
    </article>
  );
}
