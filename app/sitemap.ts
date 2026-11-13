import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      // Data real do conteúdo (não a do build), para o Google confiar no lastmod
      lastModified: new Date(CONTENT_UPDATED),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
