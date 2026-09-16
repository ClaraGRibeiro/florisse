"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { Product } from "@/types/product";
import { formatColor, formatPath } from "@/utils/format";

import { ProductCard } from "../products/ProductCard";

type ProductRelatedProps = {
  product: Product;
  products: Product[];
};

export default function ProductRelated({
  product,
  products,
}: ProductRelatedProps) {
  const relatedProducts = useMemo(() => {
    if (!product || products.length <= 1) {
      return [];
    }

    const currentIndex = products.findIndex(
      (item) => item.name === product.name,
    );

    if (currentIndex === -1) {
      return [];
    }

    /*
     * Começa 3 posições depois do produto atual.
     *
     * Exemplo:
     * Produto atual = índice 4
     * Começa no índice 7
     *
     * Se chegar ao final, continua do início.
     */
    const startIndex =
      (currentIndex + 3) % products.length;

    const selected: Product[] = [];

    for (let i = 0; i < products.length; i++) {
      const index =
        (startIndex + i) % products.length;

      const candidate = products[index];

      if (candidate.name === product.name) {
        continue;
      }

      selected.push(candidate);

      if (selected.length === 4) {
        break;
      }
    }

    /*
     * Embaralha apenas os produtos selecionados
     * para que a seção não fique sempre exatamente igual.
     */
    return selected;
  }, [product, products]);

  if (relatedProducts.length === 0) {
    return null;
  }

  const bestSellingByCategory =
    products.reduce<Record<string, Product>>(
      (acc, item) => {
        const currentBest = acc[item.category];

        if (
          !currentBest ||
          (item.total_sales ?? 0) >
            (currentBest.total_sales ?? 0)
        ) {
          acc[item.category] = item;
        }

        return acc;
      },
      {},
    );

  return (
    <section className="mt-16 border-t border-border pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* CABEÇALHO */}
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Para continuar descobrindo
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Você também pode gostar
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Outras peças da Florisse que podem
            conquistar um cantinho na sua casa.
          </p>
        </motion.div>

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map(
            (relatedProduct, index) => (
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
                  bestSellingByCategory={
                    bestSellingByCategory
                  }
                  formatPath={formatPath}
                  formatColor={formatColor}
                />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}