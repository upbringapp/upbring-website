import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/contact", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: new URL(route, "https://upbringapp.com").toString(),
  }));
}
