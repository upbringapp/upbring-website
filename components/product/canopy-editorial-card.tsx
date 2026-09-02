import type { EditorialContentRecord } from "@/content/editorial";

type CanopyEditorialCardProps = {
  label: string;
  content: EditorialContentRecord;
};

export function CanopyEditorialCard({
  label,
  content,
}: CanopyEditorialCardProps) {
  return (
    <article className="flex flex-col rounded-[var(--card-radius)] border border-[var(--border)] bg-white p-6 md:p-8">
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

type FamilyRhythmsCardProps = {
  experiences: readonly {
    label: string;
    content: EditorialContentRecord;
  }[];
};

export function FamilyRhythmsCard({ experiences }: FamilyRhythmsCardProps) {
  return (
    <article className="rounded-[var(--card-radius)] border border-[var(--border)] bg-white p-6 md:p-8">
      <h3 className="text-xl md:text-2xl">Family Rhythms</h3>

      <div className="mt-8">
        {experiences.map(({ label, content }) => (
          <section
            key={content.id}
            className="border-t border-[color:color-mix(in_srgb,var(--divider-warm)_60%,transparent)] py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <h4 className="text-lg md:text-xl">{label}</h4>
            {content.approvalStatus === "approved" ? (
              <p className="mt-5 max-w-2xl whitespace-pre-line text-[var(--text-secondary)]">
                {content.exactText}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
