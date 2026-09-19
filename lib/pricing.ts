import { Product } from "@/types/product";

export function getProductPrice(product: Product): number {
  if (!product.sizes?.length) {
    return Infinity;
  }

  const prices = product.sizes
    .map((size) => Number(size.price))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) {
    return Infinity;
  }

  return Math.min(...prices);
}

export function getTotalSales(
  product: Pick<Product, "sizes">,
): number {
  return product.sizes.reduce(
    (total, size) => total + (size.sales ?? 0),
    0,
  );
}