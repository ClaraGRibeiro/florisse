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

    /*
     * ---------------------------------------------------------
     * FUNÇÕES AUXILIARES
     * ---------------------------------------------------------
     */

    // Extrai todas as palavras/cores presentes nas cores do produto.
    const getProductColors = (item: Product): Set<string> => {
      const colorSet = new Set<string>();

      if (!item.colors) {
        return colorSet;
      }

      item.colors.forEach((color) => {
        const formatted = formatColor(color.name);

        formatted
          .split(/[-/,+]/)
          .map((part) => part.trim().toLowerCase())
          .filter(Boolean)
          .forEach((part) => {
            colorSet.add(part);
          });
      });

      return colorSet;
    };

    // Obtém o menor preço disponível do produto.
    const getLowestPrice = (item: Product): number => {
      if (!item.sizes || item.sizes.length === 0) {
        return Infinity;
      }

      return Math.min(
        ...item.sizes
          .map((size) => Number(size.price))
          .filter((price) => Number.isFinite(price)),
      );
    };

    /*
     * ---------------------------------------------------------
     * DADOS DO PRODUTO ATUAL
     * ---------------------------------------------------------
     */

    const currentColors = getProductColors(product);
    const currentPrice = getLowestPrice(product);

    /*
     * ---------------------------------------------------------
     * CALCULA A PONTUAÇÃO DE CADA PRODUTO
     * ---------------------------------------------------------
     *
     * Quanto maior a pontuação, mais relacionado o produto é.
     *
     * Categoria:       +100
     * Cor semelhante:   +30 por cor em comum
     * Preço próximo:    +20
     * Mais vendido:     usado como desempate
     */

    const scoredProducts = products
      .filter(
        (candidate) =>
          candidate.name !== product.name,
      )
      .map((candidate) => {
        let score = 0;

        /*
         * 1. MESMA CATEGORIA
         */
        if (
          candidate.category &&
          product.category &&
          candidate.category.toLowerCase() ===
            product.category.toLowerCase()
        ) {
          score += 100;
        }

        /*
         * 2. CORES SEMELHANTES
         */
        const candidateColors =
          getProductColors(candidate);

        let sharedColors = 0;

        currentColors.forEach((color) => {
          if (candidateColors.has(color)) {
            sharedColors += 1;
          }
        });

        score += sharedColors * 30;

        /*
         * 3. FAIXA DE PREÇO SEMELHANTE
         */
        const candidatePrice =
          getLowestPrice(candidate);

        if (
          Number.isFinite(currentPrice) &&
          Number.isFinite(candidatePrice) &&
          currentPrice > 0
        ) {
          const priceDifference =
            Math.abs(
              candidatePrice - currentPrice,
            ) / currentPrice;

          /*
           * Até 20% de diferença:
           * +20 pontos
           *
           * Até 40%:
           * +10 pontos
           */
          if (priceDifference <= 0.2) {
            score += 20;
          } else if (priceDifference <= 0.4) {
            score += 10;
          }
        }

        /*
         * 4. VENDAS
         *
         * Não usamos vendas como principal critério.
         * Elas servem apenas para desempatar produtos
         * que já possuem características semelhantes.
         */
        const totalSales =
          candidate.total_sales ?? 0;

        return {
          product: candidate,
          score,
          totalSales,
        };
      });

    /*
     * ---------------------------------------------------------
     * ORDENAÇÃO
     * ---------------------------------------------------------
     *
     * Primeiro pela relevância.
     * Em caso de empate, pelo número de vendas.
     */

    scoredProducts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.totalSales - a.totalSales;
    });

    /*
     * ---------------------------------------------------------
     * SELEÇÃO PRINCIPAL
     * ---------------------------------------------------------
     *
     * Pegamos os 4 produtos mais relacionados.
     */

    const selected = scoredProducts
      .slice(0, 4)
      .map((item) => item.product);

    /*
     * ---------------------------------------------------------
     * FALLBACK
     * ---------------------------------------------------------
     *
     * Se houver menos de 4 produtos relacionados,
     * completamos com outros produtos.
     */

    if (selected.length < 4) {
      const selectedNames = new Set(
        selected.map((item) => item.name),
      );

      const fallbackProducts = products.filter(
        (candidate) =>
          candidate.name !== product.name &&
          !selectedNames.has(candidate.name),
      );

      /*
       * Produtos de fallback também priorizam
       * os mais vendidos.
       */
      fallbackProducts.sort(
        (a, b) =>
          (b.total_sales ?? 0) -
          (a.total_sales ?? 0),
      );

      for (const candidate of fallbackProducts) {
        if (selected.length >= 4) {
          break;
        }

        selected.push(candidate);
      }
    }

    /*
     * ---------------------------------------------------------
     * EMBARALHAMENTO
     * ---------------------------------------------------------
     *
     * Depois de escolher os produtos relevantes,
     * embaralhamos somente os 4 selecionados.
     *
     * Isso evita que a seção fique sempre exatamente
     * na mesma ordem.
     */

    return [...selected].sort(
      () => Math.random() - 0.5,
    );
  }, [product, products]);

  if (relatedProducts.length === 0) {
    return null;
  }

  /*
   * Produto mais vendido dentro de cada categoria.
   * Usado pelo ProductCard para o selo "Mais vendido".
   */
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