"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { getBestSellingByCategory } from "@/lib/products";
import { getRelatedProducts } from "@/lib/relatedProducts";
import { Product } from "@/types/product";
import { formatColor, formatPath } from "@/utils/format";

import { ProductCard } from "../products/ProductCard";

type ProductRelatedProps = {
  product: Product;
  products: Product[];
};

const VISITED_PRODUCTS_KEY = "florisse-related-visited-products";

export default function ProductRelated({
  product,
  products,
}: ProductRelatedProps) {
  const [visitedProducts, setVisitedProducts] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    if (!product?.name) {
      return;
    }

    try {
      const stored = sessionStorage.getItem(VISITED_PRODUCTS_KEY);

      let visited = new Set<string>();

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          visited = new Set(
            parsed.filter((item): item is string => typeof item === "string"),
          );
        }
      }

      visited.add(product.name);

      setVisitedProducts(visited);

      sessionStorage.setItem(
        VISITED_PRODUCTS_KEY,
        JSON.stringify(Array.from(visited)),
      );
    } catch {
      const fallback = new Set<string>();

      fallback.add(product.name);

      setVisitedProducts(fallback);
    }
  }, [product?.name]);

  const relatedProducts = useMemo(
    () => getRelatedProducts(product, products, visitedProducts),
    [product, products, visitedProducts],
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  const bestSellingByCategory = getBestSellingByCategory();

  return (
    <section className="border-border mt-16 border-t pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mb-10 text-center"
        >
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Para continuar descobrindo
          </p>

          <h2 className="text-foreground mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Você também pode gostar
          </h2>

          <p className="text-muted mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base">
            Outras peças da Florisse que podem conquistar um cantinho na sua
            casa.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct, index) => (
            <motion.div
              key={relatedProduct.name}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <ProductCard
                product={relatedProduct}
                bestSellingByCategory={bestSellingByCategory}
                formatPath={formatPath}
                formatColor={formatColor}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
