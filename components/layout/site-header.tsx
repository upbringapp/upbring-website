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
            className="inline-flex min-h-11 appearance-none items-center justify-center rounded-2xl border border-[#111111] bg-[#111111] px-5 text-sm !text-white shadow-none transition-colors duration-[var(--transition-duration)] ease-[var(--transition-easing)] hover:border-[#2f2f2f] hover:bg-[#2f2f2f] active:border-[#111111] active:bg-[#111111]"
          >
            Start quietly.
          </Link>
        </div>

        <MobileNavigation />
      </PageContainer>
    </header>
  );
}
