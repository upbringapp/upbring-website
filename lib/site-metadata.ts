import type { Metadata } from "next";

export const siteOrigin = "https://upbringapp.com";

export const homepageTitle =
  "Nasbring — Beyond marks. Closer to who they are becoming.";

export const homepageDescription =
  "Nasbring is a quiet companion for parents, bringing together everyday learning, thoughtful questions, family conversations, and patterns noticed over time.";

export const socialPreviewImagePath = "/og-image.png";

export function createSocialPreviewImageMetadata(
  imagePath: string | undefined = socialPreviewImagePath,
) {
  if (!imagePath) {
    return {};
  }

  return {
    images: [
      {
        url: new URL(imagePath, siteOrigin).toString(),
        width: 1200,
        height: 630,
        alt: "Nasbring",
      },
    ],
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
      siteName: "Nasbring",
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
