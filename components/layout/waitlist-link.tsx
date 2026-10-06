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

    if (
      event.defaultPrevented ||
      pathname !== "/experience" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
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
