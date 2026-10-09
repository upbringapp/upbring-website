"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

const waitlistHref = "/#waitlist";

type WaitlistLinkProps = Omit<ComponentProps<typeof Link>, "href">;

export function WaitlistLink({ onClick, ...props }: WaitlistLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    const isPrimaryClick =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;

    if (!event.defaultPrevented && pathname === "/" && isPrimaryClick) {
      const emailInput = document.querySelector<HTMLInputElement>(
        '#waitlist-form input[type="email"]',
      );

      if (emailInput) {
        event.preventDefault();
        window.history.pushState(null, "", "#waitlist");
        emailInput.focus({ preventScroll: true });
        emailInput.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
        return;
      }
    }

    if (
      event.defaultPrevented ||
      pathname !== "/experience" ||
      !isPrimaryClick ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const experience = document.querySelector<HTMLElement>("#main-content");

    if (!experience) {
      return;
    }

    event.preventDefault();

    const handoff = experience.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      {
        duration: 180,
        easing: "ease-out",
        fill: "forwards",
      },
    );

    let navigationStarted = false;
    const navigateToWaitlist = () => {
      if (navigationStarted) {
        return;
      }

      navigationStarted = true;
      window.location.assign(waitlistHref);
    };

    void handoff.finished.then(navigateToWaitlist, navigateToWaitlist);
    window.setTimeout(navigateToWaitlist, 250);
  }

  return <Link {...props} href={waitlistHref} onClick={handleClick} />;
}
