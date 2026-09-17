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

    /*
     * Extrai as cores de um produto.
     *
     * Exemplo:
     * "cru/militar/alecrim"
     *
     * vira:
     * Set {
     *   "cru",
     *   "militar",
     *   "alecrim"
     * }
     */
    const getProductColors = (
      item: Product,
    ): Set<string> => {
      const colorSet = new Set<string>();

      if (!item.colors) {
        return colorSet;
      }

      item.colors.forEach((color) => {
        const formatted = formatColor(color.name);

        formatted
          .split(/[-/,+]/)
          .map((part) =>
            part.trim().toLowerCase(),
          )
          .filter(Boolean)
          .forEach((part) => {
            colorSet.add(part);
          });
      });

      return colorSet;
    };

    /*
     * Obtém o menor preço disponível do produto.
     */
    const getLowestPrice = (
      item: Product,
    ): number => {
      if (
        !item.sizes ||
        item.sizes.length === 0
      ) {
        return Infinity;
      }

      const prices = item.sizes
        .map((size) => Number(size.price))
        .filter((price) =>
          Number.isFinite(price),
        );

      if (prices.length === 0) {
        return Infinity;
      }

      return Math.min(...prices);
    };

    /*
     * ---------------------------------------------------------
     * DADOS DO PRODUTO ATUAL
     * ---------------------------------------------------------
     */

    const currentColors =
      getProductColors(product);

    const currentPrice =
      getLowestPrice(product);

    /*
     * ---------------------------------------------------------
     * CALCULA A PONTUAÇÃO DOS PRODUTOS
     * ---------------------------------------------------------
     *
     * Quanto maior a pontuação, mais relacionado
     * o produto é ao produto atual.
     *
     * MESMA CATEGORIA
     * +100 pontos
     *
     * CADA COR EM COMUM
     * +30 pontos
     *
     * PREÇO ATÉ 20% DE DIFERENÇA
     * +20 pontos
     *
     * PREÇO ATÉ 40% DE DIFERENÇA
     * +10 pontos
     *
     * VENDAS
     * usadas somente como desempate
     */

    const scoredProducts = products
      .filter(
        (candidate) =>
          candidate.name !== product.name,
      )
      .map((candidate, originalIndex) => {
        let score = 0;

        /*
         * -----------------------------------------------------
         * 2. CORES SEMELHANTES
         * -----------------------------------------------------
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
         * -----------------------------------------------------
         * 3. FAIXA DE PREÇO SEMELHANTE
         * -----------------------------------------------------
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
           */
          if (priceDifference <= 0.2) {
            score += 20;
          }

          /*
           * Entre 20% e 40%:
           * +10 pontos
           */
          else if (priceDifference <= 0.4) {
            score += 10;
          }
        }

        /*
         * -----------------------------------------------------
         * 4. VENDAS
         * -----------------------------------------------------
         *
         * Não entram diretamente no score.
         *
         * Servem apenas para desempatar produtos
         * que já possuem o mesmo nível de relação.
         */

        const totalSales =
          candidate.total_sales ?? 0;

        return {
          product: candidate,
          score,
          totalSales,
          originalIndex,
        };
      });

    /*
     * ---------------------------------------------------------
     * ORDENAÇÃO POR RELEVÂNCIA
     * ---------------------------------------------------------
     *
     * Primeiro:
     * maior pontuação
     *
     * Depois:
     * maior número de vendas
     *
     * Por último:
     * ordem original do array
     *
     * Assim, a posição no array deixa de determinar
     * quais produtos aparecem como relacionados.
     */

    scoredProducts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (b.totalSales !== a.totalSales) {
        return b.totalSales - a.totalSales;
      }

      return (
        a.originalIndex -
        b.originalIndex
      );
    });

    /*
     * ---------------------------------------------------------
     * SELEÇÃO PRINCIPAL
     * ---------------------------------------------------------
     *
     * Pegamos os 4 produtos com maior relevância.
     */

    const selected = scoredProducts
      .slice(0, 4)
      .map((item) => item.product);

    /*
     * ---------------------------------------------------------
     * FALLBACK
     * ---------------------------------------------------------
     *
     * Caso existam menos de 4 produtos disponíveis,
     * completamos com outros produtos.
     */

    if (selected.length < 4) {
      const selectedNames = new Set(
        selected.map(
          (item) => item.name,
        ),
      );

      const fallbackProducts = products
        .filter(
          (candidate) =>
            candidate.name !==
              product.name &&
            !selectedNames.has(
              candidate.name,
            ),
        )
        .sort(
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
     * Não embaralhamos os produtos.
     *
     * A ordem agora representa a relevância:
     * primeiro = mais relacionado
     * último = menos relacionado
     */

    return selected;
  }, [product, products]);

  /*
   * -----------------------------------------------------------
   * SE NÃO HOUVER PRODUTOS RELACIONADOS
   * -----------------------------------------------------------
   */

  if (relatedProducts.length === 0) {
    return null;
  }

  /*
   * -----------------------------------------------------------
   * PRODUTO MAIS VENDIDO POR CATEGORIA
   * -----------------------------------------------------------
   *
   * Usado pelo ProductCard para determinar qual produto
   * recebe o selo "Mais vendido".
   */

  const bestSellingByCategory =
    products.reduce<
      Record<string, Product>
    >((acc, item) => {
      const currentBest =
        acc[item.category];

      if (
        !currentBest ||
        (item.total_sales ?? 0) >
          (currentBest.total_sales ?? 0)
      ) {
        acc[item.category] = item;
      }

      return acc;
    }, {});

  /*
   * -----------------------------------------------------------
   * RENDER
   * -----------------------------------------------------------
   */

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