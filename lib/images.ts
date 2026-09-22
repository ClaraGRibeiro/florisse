import { Product, ProductImage } from "@/types/product";
import { formatPath } from "@/utils/format";

export function getProductImage(
  product: Product,
  color: string,
): ProductImage[] {
  return product.images[color] ?? [];
}

export function getProductOgImage(product: Product): string {
  return `/products/${formatPath(product.category)}/${formatPath(product.name)}/image.jpg`;
}
