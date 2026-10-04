"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { getBestSellingByCategory, getProducts } from "@/lib/products";
import { getRelatedProductsForCart } from "@/lib/relatedProducts";
import { formatColor, formatPath } from "@/utils/format";

import { ProductCard } from "../products/ProductCard";

type CartRelatedProps = {
  productNames: string[];
};

export default function CartRelated({ productNames }: CartRelatedProps) {
  const products = getProducts();

  const relatedProducts = useMemo(
    () => getRelatedProductsForCart(productNames, products),
    [productNames, products],
  );

  if (!relatedProducts.length) {
    return null;
  }

  const bestSellingByCategory = getBestSellingByCategory();

  return (
    <section className="border-border mt-16 border-t pt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Para continuar descobrindo
          </p>

          <h2 className="text-foreground mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Você também pode gostar
          </h2>

          <p className="text-muted mx-auto mt-3 max-w-xl text-sm leading-6 sm:text-base">
            Outras peças da Florisse que podem combinar com suas escolhas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              <ProductCard
                product={product}
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
