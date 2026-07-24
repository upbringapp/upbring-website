import Image from "next/image";
import Link from "next/link";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="relative z-50 border-b border-[var(--border)] bg-white">
      <PageContainer className="flex min-h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Upbring home" className="shrink-0">
          <Image
            src="/logo.jpg"
            alt="Upbring"
            width={1536}
            height={1024}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <DesktopNavigation />
          <Link
            href="/#waitlist"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--text-primary)] px-5 text-sm text-[var(--text-primary)] transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:bg-[var(--text-primary)] hover:text-white"
          >
            Start quietly.
          </Link>
        </div>

        <MobileNavigation />
      </PageContainer>
    </header>
  );
}
