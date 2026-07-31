import type { EditorialContentRecord } from "@/content/editorial";

type WithinReflectionCardProps = {
  label: string;
  content: EditorialContentRecord;
  closingContent?: EditorialContentRecord;
  variant: "patterns" | "pause" | "personal" | "moments" | "story";
};

export function WithinReflectionCard({
  label,
  content,
  closingContent,
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

      <div className="mt-auto pt-10">
        {content.approvalStatus === "approved" ? (
          <p className="max-w-2xl whitespace-pre-line text-[var(--text-secondary)]">
            {content.exactText}
          </p>
        ) : null}
      </div>

      {variant === "story" && closingContent ? (
        <p className="mt-12 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
          {closingContent.exactText}
        </p>
      ) : null}
    </li>
  );
}
