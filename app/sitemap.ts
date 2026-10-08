import type { MetadataRoute } from "next";

import productsData from "@/data/products";
import { getProductSlug } from "@/lib/productUrl";
import { SITE } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = productsData.products.map(
    (product) => ({
      url: `${SITE}/product/${getProductSlug(product.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/cores`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...productUrls,
  ];
}
