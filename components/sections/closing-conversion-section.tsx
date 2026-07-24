"use client";

import type { MouseEvent } from "react";

export function ClosingConversionSection() {
  function focusWaitlist(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const emailInput = document.querySelector<HTMLInputElement>(
      '#waitlist-form input[type="email"]',
    );
    const waitlistSection = document.querySelector<HTMLElement>("#waitlist");

    if (!emailInput || !waitlistSection) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", "#waitlist");
    waitlistSection.scrollIntoView();
    emailInput.focus({ preventScroll: true });
  }

  return (
    <section
      aria-labelledby="closing-heading"
      className="page-container section-spacing"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="closing-heading"
          className="text-4xl leading-tight md:text-5xl lg:text-6xl"
        >
          Thank you for noticing what often goes unseen.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
          Every parent wants to understand their child. Not just know them.
        </p>
        <a
          href="#waitlist"
          onClick={focusWaitlist}
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-7 text-sm font-medium !text-white transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f]"
        >
          Start quietly.
        </a>
      </div>
    </section>
  );
}
