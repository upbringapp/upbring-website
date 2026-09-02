import type { EditorialContentRecord } from "@/content/editorial";

type HomeOutputCardProps = {
  index: number;
  label: string;
  content: EditorialContentRecord;
  variant?: "standard" | "revisiting";
};

export function HomeOutputCard({
  index,
  label,
  content,
  variant = "standard",
}: HomeOutputCardProps) {
  const layoutClasses = {
    standard: "",
    revisiting: "lg:col-span-3",
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

      <div className="ml-8 mt-7">
        {content.approvalStatus === "approved" ? (
          <p className="max-w-xl whitespace-pre-line text-[var(--text-secondary)]">
            {content.exactText}
          </p>
        ) : null}
      </div>
    </li>
  );
}
