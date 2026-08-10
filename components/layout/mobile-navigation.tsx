"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isCurrentPage, primaryNavigation } from "./site-navigation";

export function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)]"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {isOpen ? (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-[var(--border)] bg-white"
        >
          <nav aria-label="Mobile">
            <ul className="page-container flex flex-col py-4">
              {primaryNavigation.map((item) => (
                <li
                  key={item.href}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  <Link
                    href={item.href}
                    aria-current={
                      isCurrentPage(pathname, item.href) ? "page" : undefined
                    }
                    className="flex min-h-12 items-center text-[var(--text-primary)]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="page-container pb-5">
            <Link
              href="/#waitlist"
              className="inline-flex min-h-11 w-full appearance-none items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-5 text-sm !text-white shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f] active:border-[#111111] active:bg-[#111111]"
              onClick={() => setIsOpen(false)}
            >
              Start quietly.
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
