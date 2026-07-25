import type { Metadata } from "next";

export const siteOrigin = "https://upbringapp.com";

export const homepageTitle =
  "Upbring — Beyond marks. Closer to who they are becoming.";

export const homepageDescription =
  "Upbring is a quiet companion for parents, bringing together everyday learning, thoughtful questions, family conversations, and patterns noticed over time.";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const url = new URL(path, siteOrigin).toString();

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Upbring",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
