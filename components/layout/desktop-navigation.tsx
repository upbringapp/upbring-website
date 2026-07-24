"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPage, primaryNavigation } from "./site-navigation";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNavigation.map((item) => {
          const isCurrent = isCurrentPage(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={[
                  "inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors",
                  "duration-[var(--transition-duration)] ease-[var(--transition-easing)]",
                  isCurrent
                    ? "bg-gray-100 text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
