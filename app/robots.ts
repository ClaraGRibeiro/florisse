import type { MetadataRoute } from "next";

const BASE_URL = "https://florisse.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/carrinho",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
