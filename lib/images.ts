import { Product, ProductImage } from "@/types/product";

export function getProductImage(
  product: Product,
  color: string,
): ProductImage[] {
  return product.images[color] ?? [];
}

export function getProductOgImage(
  product: Product,
  color?: string | null,
): string | null {
  const selectedColor =
    color && product.images[color] ? color : product.colors[0]?.name;
  const image = selectedColor ? product.images[selectedColor]?.[0] : undefined;

  return image?.url ?? null;
}
