import colorsData from "@/data/colors.json";
import productsData from "@/data/products";
import { Product } from "@/types/product";

export function useProducts() {
  const colorMap = new Map(colorsData.map((c) => [c.name, c.hex]));

  const products: Product[] = productsData.products.map((product) => {
    const total_sales = product.sizes.reduce(
      (acc, size) => acc + ("sales" in size ? size.sales : 0),
      0,
    );

    return {
      ...product,
      total_sales,
      colors: product.colors.map((color) => {
        const hex = color
          .split("-")
          .map((part) => colorMap.get(part) || "#000000");

        return {
          name: color,
          hex,
        };
      }),
    };
  });

  const bestSelling = [...products].sort(
    (a, b) => (b.total_sales ?? 0) - (a.total_sales ?? 0),
  )[0];

  return { products, bestSelling };
}
