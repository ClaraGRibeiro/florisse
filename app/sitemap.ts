
import type { MetadataRoute } from "next";

import productsData from "@/data/products";
import { formatPath } from "@/utils/format";

const BASE_URL = "https://florisse.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = productsData.products.map(
    (product) => ({
      url: `${BASE_URL}/produto/${formatPath(product.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...productUrls,
  ];
}
