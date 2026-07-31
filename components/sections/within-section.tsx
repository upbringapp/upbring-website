import { WithinReflectionCard } from "@/components/product/within-reflection-card";
import { withinContent } from "@/content/editorial";

const withinAreas = [
  { label: "Patterns Over Time", variant: "patterns" },
  { label: "Pause", variant: "pause" },
  { label: "Just Arjun", variant: "personal" },
  { label: "Moments", variant: "moments" },
  { label: "Arjun’s Story So Far", variant: "story" },
] as const;

export function WithinSection() {
  return (
    <section
      id="within"
      aria-labelledby="within-heading"
      className="page-container section-spacing scroll-mt-24"
    >
      <div className="editorial-width">
        <h2 id="within-heading" className="text-4xl md:text-5xl">
          Within
        </h2>
        <p className="mt-5 text-lg text-[var(--text-secondary)] md:text-xl">
          What we’ve noticed so far — without rushing to conclusions.
        </p>
      </div>

      <ol className="mt-12 grid gap-5 lg:grid-cols-2">
        {withinAreas.map((area, index) => (
          <WithinReflectionCard
            key={area.label}
            label={area.label}
            content={withinContent[index]}
            closingContent={area.variant === "story" ? withinContent[5] : undefined}
            variant={area.variant}
          />
        ))}
      </ol>
    </section>
  );
}
