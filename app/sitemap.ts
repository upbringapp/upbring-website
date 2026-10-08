import { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteOrigin,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
