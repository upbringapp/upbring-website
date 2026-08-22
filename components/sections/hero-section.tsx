import { HeroProductPreview } from "@/components/product/hero-product-preview";
import { WaitlistForm } from "@/components/forms/waitlist-form";

export function HeroSection() {
  return (
    <section
      id="waitlist"
      aria-labelledby="hero-heading"
      className="page-container scroll-mt-24 py-16 md:py-24 lg:py-28"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(25rem,0.8fr)] lg:gap-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[var(--text-tertiary)]">
            nasbring
          </p>
          <p className="mt-3 text-lg text-[var(--text-secondary)]">
            A quiet companion for growing up.
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-5xl leading-[1.04] sm:text-6xl md:text-7xl"
          >
            Beyond marks.
            <br />
            Closer to who they are becoming.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
            Every parent wants to understand their child. Not just know them.
          </p>

          <WaitlistForm />
        </div>

        <HeroProductPreview />
      </div>
    </section>
  );
}
