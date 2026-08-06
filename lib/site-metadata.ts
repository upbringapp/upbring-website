import type { Metadata } from "next";

export const siteOrigin = "https://upbringapp.com";

export const homepageTitle =
  "Upbring — Beyond marks. Closer to who they are becoming.";

export const homepageDescription =
  "Upbring is a quiet companion for parents, bringing together everyday learning, thoughtful questions, family conversations, and patterns noticed over time.";

// Keep this unset until the final renamed social artwork is approved. This is
// the single integration point for future Open Graph and Twitter/X imagery.
export const socialPreviewImagePath: string | undefined = undefined;

export function createSocialPreviewImageMetadata(
  imagePath: string | undefined = socialPreviewImagePath,
) {
  if (!imagePath) {
    return {};
  }

  return {
    images: [new URL(imagePath, siteOrigin).toString()],
  };
}

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
      ...createSocialPreviewImageMetadata(),
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...createSocialPreviewImageMetadata(),
    },
  };
}
