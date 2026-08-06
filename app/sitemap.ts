import { MetadataRoute } from "next";
import { createArticleSitemapEntries } from "@/lib/blog";
import { siteOrigin } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/contact", "/privacy", "/terms"];

  return [
    ...routes.map((route) => ({
      url: new URL(route, siteOrigin).toString(),
    })),
    ...createArticleSitemapEntries(),
  ];
}
