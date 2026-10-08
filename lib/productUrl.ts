import { formatPath } from "@/utils/format";

const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "tapete-hexagono": "tapete-hexagonos",
  "tapete-hexagonos": "tapete-hexagonos",
};

export function getProductSlug(productName: string): string {
  const normalizedSlug = formatPath(productName);

  return PRODUCT_SLUG_ALIASES[normalizedSlug] ?? normalizedSlug;
}

export function getProductUrl(
  productName: string,
  options?: {
    color?: string | null;
    size?: string | null;
  },
): string {
  const slug = getProductSlug(productName);
  const params = new URLSearchParams();

  if (options?.color) {
    params.set("cor", options.color);
  }

  if (options?.size) {
    params.set(
      "tamanho",
      options.size
        .replace(/\s*(?:×|x)\s*/gi, "x")
        .replace(/\s*cm\b/gi, "")
        .replace(/\s+/g, ""),
    );
  }

  const query = params.toString();
  return `/product/${slug}${query ? `?${query}` : ""}`;
}
