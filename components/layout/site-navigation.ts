export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Canopy", href: "/#canopy" },
  { label: "Within", href: "/#within" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavigation = [
  ...primaryNavigation,
  { label: "Terms", href: "/terms" },
] as const;

export const socialNavigation = [
  { label: "Instagram", href: "https://instagram.com/officialupbring" },
  { label: "YouTube", href: "https://youtube.com/@officialupbring" },
] as const;

export function isCurrentPage(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.includes("#")) {
    return false;
  }

  return pathname === href;
}
