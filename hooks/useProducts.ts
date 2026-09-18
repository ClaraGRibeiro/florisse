import colorsData from "@/data/colors.json";
import productsData from "@/data/products";
import { Product } from "@/types/product";
import { formatPath } from "@/utils/format";

export type ReadyProduct = Product & {
  readyColor: string;
  readySize: string;
  readyPrice: number;
  readyQuantity: number;
};

export function useProducts() {
  const colorMap = new Map(
    colorsData.map((c) => [c.name, c.hex]),
  );

  const products: Product[] = productsData.products.map(
    (product) => {
      const total_sales = product.sizes.reduce(
        (acc, size) => acc + (size.sales ?? 0),
        0,
      );

      return {
        ...product,
        total_sales,
        images: Object.fromEntries(
          Object.entries(product.images).filter(
            ([, images]) => Array.isArray(images),
          ),
        ),
        colors: product.colors.map((color) => {
          const hex = color
            .split("-")
            .map(
              (part) =>
                colorMap.get(part) || "#000000",
            );

          return {
            name: color,
            hex,
          };
        }),
      };
    },
  );

  const bestSelling = [...products].sort(
    (a, b) =>
      (b.total_sales ?? 0) -
      (a.total_sales ?? 0),
  )[0];

  /*
   * Categorias normais do catálogo.
   */
  const categories = Array.from(
    new Set(
      products.map((product) => product.category),
    ),
  );

  /*
   * Produtos de pronta entrega.
   *
   * productId funciona como uma chave estrangeira
   * baseada no slug do nome do produto.
   */
  const readyProducts: ReadyProduct[] =
    productsData.prontaEntrega
      .map((ready) => {
        const product = products.find(
          (item) =>
            formatPath(item.name) ===
            ready.productId,
        );

        if (!product) {
          console.warn(
            `Pronta entrega: produto "${ready.productId}" não encontrado.`,
          );

          return null;
        }

        return {
          ...product,
          readyColor: ready.color,
          readySize: ready.size,
          readyPrice: ready.price,
          readyQuantity: ready.quantity,
        };
      })
      .filter(
        (product): product is ReadyProduct =>
          product !== null,
      );

  /*
   * "Pronta entrega" aparece como uma categoria
   * adicional no catálogo.
   */
  const allCategories = [
    ...categories,
    "Pronta entrega",
  ];

  /*
   * Quantidade de produtos por categoria.
   */
  const categoryCounts =
    products.reduce(
      (acc, product) => {
        acc[product.category] =
          (acc[product.category] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );

  categoryCounts["Pronta entrega"] =
    readyProducts.length;

  const bestSellingByCategory =
    products.reduce(
      (acc, product) => {
        const current =
          acc[product.category];

        if (
          !current ||
          (product.total_sales ?? 0) >
          (current.total_sales ?? 0)
        ) {
          acc[product.category] = product;
        }

        return acc;
      },
      {} as Record<string, Product>,
    );

  const productsFromCategory = (
    category: string,
  ) => {
    return products
      .filter(
        (product) =>
          product.category === category,
      )
      .map((product) => product.name);
  };

  return {
    products,
    readyProducts,
    bestSelling,
    bestSellingByCategory,
    categories: allCategories,
    categoryCounts,
    productsFromCategory,
  };
}