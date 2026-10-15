import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="relative z-50 bg-white">
      <PageContainer className="flex min-h-20 items-center justify-between gap-6">
        <div className="ml-auto hidden items-center lg:flex">
          <DesktopNavigation />
        </div>

        <MobileNavigation />
      </PageContainer>
    </header>
  );
}
