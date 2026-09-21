import type { MetadataRoute } from "next";

import productsData from "@/data/products";
import { formatPath } from "@/utils/format";
import { SITE } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = productsData.products.map(
    (product) => ({
      url: `${SITE}/produto/${formatPath(product.name)}`,
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

    ...productUrls,
  ];
}
