import { CanopyEditorialCard } from "@/components/product/canopy-editorial-card";
import { canopyContent } from "@/content/editorial";

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
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <CanopyEditorialCard label="Weekly Letter" content={canopyContent[0]} variant="anchor" />
          <CanopyEditorialCard label="Family Rhythms" content={canopyContent[1]} />
        </div>
      </div>

      <div className="mt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
          For Arjun
        </p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
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

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        <CanopyEditorialCard
          label="Dinner Table Conversation"
          content={canopyContent[5]}
          variant="conversation"
        />
        <CanopyEditorialCard label="Do This Together" content={canopyContent[6]} variant="activity" />
        <CanopyEditorialCard
          label="One Thing Worth Talking About"
          content={canopyContent[7]}
          variant="reflection"
        />
      </div>
    </section>
  );
}
