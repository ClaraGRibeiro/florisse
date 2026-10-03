import { formatPath } from "@/utils/format";

export function getProductUrl(
  productName: string,
  options?: {
    color?: string | null;
    size?: string | null;
  },
): string {
  const slug = formatPath(productName);
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
