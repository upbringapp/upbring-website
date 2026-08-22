import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "./page-container";
import { footerNavigation, socialNavigation } from "./site-navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white py-12 md:py-16">
      <PageContainer>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-14">
          <div className="max-w-sm">
            <Link href="/" aria-label="Nasbring home" className="inline-flex">
              <Image
                src="/logo.jpg"
                alt="Nasbring"
                width={1536}
                height={1024}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 text-sm text-[var(--text-secondary)]">
              A quiet companion for growing up.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-[var(--text-secondary)]">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social">
            <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
              {socialNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-tertiary)]">
          © 2026 Upbring
        </div>
      </PageContainer>
    </footer>
  );
}
