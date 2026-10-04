import { getProductColors } from "@/lib/colors";
import { getProductPrice } from "@/lib/pricing";
import { getProducts } from "@/lib/products";
import { Product } from "@/types/product";

export function getRelatedProducts(
  product: Product,
  products: Product[] = getProducts(),
  visitedProducts: Set<string> = new Set(),
): Product[] {
  if (!product || products.length <= 1) {
    return [];
  }

  const currentColors = getProductColors(product);
  const currentPrice = getProductPrice(product);

  const scoredProducts = products
    .filter((candidate) => candidate.name !== product.name)
    .map((candidate, originalIndex) => {
      let score = 0;

      if (candidate.category === product.category) {
        score += 100;
      }

      const candidateColors = getProductColors(candidate);

      let sharedColors = 0;

      currentColors.forEach((color) => {
        if (candidateColors.has(color)) {
          sharedColors += 1;
        }
      });

      if (sharedColors > 0) {
        score += 30;
      }

      if (sharedColors >= 2) {
        score += 10;
      }

      const candidatePrice = getProductPrice(candidate);

      if (
        Number.isFinite(currentPrice) &&
        Number.isFinite(candidatePrice) &&
        currentPrice > 0
      ) {
        const priceDifference =
          Math.abs(candidatePrice - currentPrice) / currentPrice;

        if (priceDifference <= 0.2) {
          score += 20;
        } else if (priceDifference <= 0.4) {
          score += 10;
        }
      }

      return {
        product: candidate,
        score,
        sharedColors,
        originalIndex,
        wasVisited: visitedProducts.has(candidate.name),
      };
    });

  scoredProducts.sort((a, b) => {
    if (a.wasVisited !== b.wasVisited) {
      return a.wasVisited ? 1 : -1;
    }

    if (b.score !== a.score) {
      return b.score - a.score;
    }

    return a.originalIndex - b.originalIndex;
  });

  const freshProducts = scoredProducts.filter((item) => !item.wasVisited);

  const sameColorFresh = freshProducts.filter(
    (item) => item.sharedColors > 0,
  );

  const differentColorFresh = freshProducts.filter(
    (item) => item.sharedColors === 0,
  );

  const selected: Product[] = [];

  sameColorFresh.slice(0, 3).forEach((item) => {
    if (selected.length < 3) {
      selected.push(item.product);
    }
  });

  if (selected.length < 4 && differentColorFresh.length > 0) {
    selected.push(differentColorFresh[0].product);
  }

  if (selected.length < 4) {
    const selectedNames = new Set(selected.map((item) => item.name));

    for (const item of freshProducts) {
      if (selected.length >= 4) {
        break;
      }

      if (selectedNames.has(item.product.name)) {
        continue;
      }

      const candidateColors = getProductColors(item.product);

      const sameColorCount = selected.filter((selectedProduct) => {
        const selectedColors = getProductColors(selectedProduct);

        for (const color of candidateColors) {
          if (selectedColors.has(color)) {
            return true;
          }
        }

        return false;
      }).length;

      if (item.sharedColors > 0 && sameColorCount >= 3) {
        continue;
      }

      selected.push(item.product);
      selectedNames.add(item.product.name);
    }
  }

  if (selected.length < 4) {
    const selectedNames = new Set(selected.map((item) => item.name));

    const visitedRelevant = scoredProducts.filter(
      (item) => item.wasVisited && !selectedNames.has(item.product.name),
    );

    for (const item of visitedRelevant) {
      if (selected.length >= 4) {
        break;
      }

      selected.push(item.product);
      selectedNames.add(item.product.name);
    }
  }

  return selected;
}

export function getRelatedProductsForCart(
  productNames: string[],
  products: Product[] = getProducts(),
): Product[] {
  const cartProducts = products.filter((product) =>
    productNames.includes(product.name),
  );

  if (!cartProducts.length || products.length <= cartProducts.length) {
    return [];
  }

  const cartNames = new Set(cartProducts.map((product) => product.name));
  const cartCategories = new Set(
    cartProducts.map((product) => product.category),
  );
  const cartColors = new Set(
    cartProducts.flatMap((product) => Array.from(getProductColors(product))),
  );

  return products
    .filter((product) => !cartNames.has(product.name))
    .map((product, index) => {
      const productColors = getProductColors(product);

      const sharedColors = Array.from(productColors).filter((color) =>
        cartColors.has(color),
      ).length;

      let score = 0;

      if (cartCategories.has(product.category)) {
        score += 100;
      }

      if (sharedColors > 0) {
        score += 30 + Math.min(sharedColors, 2) * 10;
      }

      score += Math.min(product.totalSales ?? 0, 20);

      return { product, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 4)
    .map(({ product }) => product);
}
