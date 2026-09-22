import { SITE } from "@/data/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/carrinho",
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
