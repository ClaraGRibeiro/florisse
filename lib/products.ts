import productsData from "@/data/products";

import { getColorHex } from "@/lib/colors";
import { getTotalSales } from "@/lib/pricing";

import {
  Product,
  ReadyProduct,
} from "@/types/product";

import { formatPath } from "@/utils/format";

type RawProduct =
  (typeof productsData.products)[number];

function normalizeProduct(
  product: RawProduct,
): Product {
  const colors = product.colors.map(
    (color) => ({
      name: color,
      hex: getColorHex(color),
    }),
  );

  const images = Object.fromEntries(
    Object.entries(product.images).filter(
      ([, images]) =>
        Array.isArray(images),
    ),
  );

  return {
    name: product.name,
    category: product.category,
    sizes: product.sizes,
    colors,
    images,
    total_sales: getTotalSales(product),
  };
}

const products: Product[] =
  productsData.products.map(
    normalizeProduct,
  );


export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(
  slug: string,
): Product | undefined {
  return products.find(
    (product) =>
      formatPath(product.name) === slug,
  );
}

export function getProductByName(
  name: string,
): Product | undefined {
  return products.find(
    (product) =>
      product.name === name,
  );
}

export function getProductsByCategory(
  category: string,
): Product[] {
  return products.filter(
    (product) =>
      product.category === category,
  );
}

export function getBestSelling(): Product {
  return products.reduce(
    (best, product) => {
      if (
        (product.total_sales ?? 0) >
        (best.total_sales ?? 0)
      ) {
        return product;
      }

      return best;
    },
    products[0],
  );
}

export function getBestSellingByCategory():
  Record<string, Product> {
  return products.reduce<
    Record<string, Product>
  >((acc, product) => {
    const current =
      acc[product.category];

    if (
      !current ||
      (product.total_sales ?? 0) >
      (current.total_sales ?? 0)
    ) {
      acc[product.category] =
        product;
    }

    return acc;
  }, {});
}


export function getCategories(): string[] {
  return Array.from(
    new Set(
      products.map(
        (product) =>
          product.category,
      ),
    ),
  );
}

export function getCatalogCategories(): string[] {
  return [
    ...getCategories(),
    "Pronta entrega",
  ];
}

export function getCategoryCounts():
  Record<string, number> {
  const counts =
    products.reduce<
      Record<string, number>
    >((acc, product) => {
      acc[product.category] =
        (acc[product.category] ?? 0) +
        1;

      return acc;
    }, {});

  counts["Pronta entrega"] =
    getReadyProducts().length;

  return counts;
}


export function getReadyProducts():
  ReadyProduct[] {
  return productsData.prontaEntrega
    .map((ready) => {
      const product =
        products.find(
          (item) =>
            formatPath(
              item.name,
            ) === ready.productId,
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
        readyQuantity:
          ready.quantity,
      };
    })
    .filter(
      (
        product,
      ): product is ReadyProduct =>
        product !== null,
    );
}


export function getProductsFromCategory(
  category: string,
): string[] {
  return getProductsByCategory(
    category,
  ).map(
    (product) => product.name,
  );
}