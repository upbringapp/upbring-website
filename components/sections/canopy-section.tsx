import {
  CanopyEditorialCard,
  FamilyRhythmsCard,
} from "@/components/product/canopy-editorial-card";
import { canopyContent } from "@/content/editorial";

const familyRhythms = [
  { label: "Dinner Table Conversation", content: canopyContent[5] },
  { label: "Do This Together", content: canopyContent[6] },
  { label: "One Thing Worth Talking About", content: canopyContent[7] },
] as const;

export function CanopySection() {
  return (
    <section
      id="canopy"
      aria-labelledby="canopy-heading"
      className="page-container section-spacing scroll-mt-24"
    >
      <div className="editorial-width">
        <h2 id="canopy-heading" className="text-4xl md:text-5xl">
          Canopy
        </h2>
        <p className="mt-5 text-lg text-[var(--text-secondary)] md:text-xl">
          Questions, stories and moments that shape great humans.
        </p>
      </div>

      <div className="mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
          For your family
        </p>
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)]">
          <CanopyEditorialCard label="Weekly Letter" content={canopyContent[0]} />
          <FamilyRhythmsCard experiences={familyRhythms} />
        </div>
      </div>

      <div className="mt-12 md:mt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
          For Arjun*
        </p>
        <div className="mt-5 grid items-start gap-5 md:grid-cols-3">
          <CanopyEditorialCard
            label="Curiosities"
            content={canopyContent[2]}
          />
          <CanopyEditorialCard
            label="Thinkers"
            content={canopyContent[3]}
          />
          <CanopyEditorialCard
            label="Create"
            content={canopyContent[4]}
          />
        </div>
      </div>

      {/*
        Content-governance boundary: Family Rhythms above is the sole Canopy
        home for its three weekly experiences. A future publishing integration
        must resolve one approved edition and replace indices 5-7 atomically,
        at most once per week. Never render or rotate those records elsewhere.
      */}
    </section>
  );
}
