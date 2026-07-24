"use client";

import { HeroProductPreview } from "@/components/product/hero-product-preview";
import { WaitlistForm } from "@/components/forms/waitlist-form";

export function HeroSection() {
  function focusWaitlistForm() {
    document
      .querySelector<HTMLInputElement>("#waitlist-form input[type='email']")
      ?.focus();
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="hero-heading"
      className="page-container scroll-mt-24 py-16 md:py-24 lg:py-28"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(25rem,0.8fr)] lg:gap-20">
        <div className="max-w-2xl">
          <p className="text-lg text-[var(--text-secondary)]">
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

          <button
            type="button"
            onClick={focusWaitlistForm}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--text-primary)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:bg-[var(--text-primary)] hover:text-white"
          >
            Start quietly.
          </button>

          <WaitlistForm />
        </div>

        <HeroProductPreview />
      </div>
    </section>
  );
}
