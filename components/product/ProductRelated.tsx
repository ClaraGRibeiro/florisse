"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Product } from "@/types/product";
import { getProductColors } from "@/lib/colors";
import { getProductPrice } from "@/lib/pricing";
import { getBestSellingByCategory } from "@/lib/products";
import { formatColor, formatPath } from "@/utils/format";

import { ProductCard } from "../products/ProductCard";

type ProductRelatedProps = {
  product: Product;
  products: Product[];
};

/*
 * Histórico de produtos visitados durante a sessão.
 *
 * IMPORTANTE:
 * total_sales NÃO é usado aqui.
 */
const VISITED_PRODUCTS_KEY =
  "florisse-related-visited-products";

export default function ProductRelated({
  product,
  products,
}: ProductRelatedProps) {
  /*
   * =========================================================
   * PRODUTOS JÁ VISITADOS
   * =========================================================
   */

  const [visitedProducts, setVisitedProducts] =
    useState<Set<string>>(new Set());

  /*
   * ---------------------------------------------------------
   * CARREGA O HISTÓRICO DA SESSÃO
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = sessionStorage.getItem(
        VISITED_PRODUCTS_KEY,
      );

      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setVisitedProducts(
          new Set(
            parsed.filter(
              (item): item is string =>
                typeof item === "string",
            ),
          ),
        );
      }
    } catch {
      setVisitedProducts(new Set());
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * REGISTRA O PRODUTO ATUAL COMO VISITADO
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !product?.name
    ) {
      return;
    }

    setVisitedProducts((previous) => {
      if (previous.has(product.name)) {
        return previous;
      }

      const updated = new Set(previous);

      updated.add(product.name);

      try {
        sessionStorage.setItem(
          VISITED_PRODUCTS_KEY,
          JSON.stringify(
            Array.from(updated),
          ),
        );
      } catch {
        // Ignora erros de sessionStorage.
      }

      return updated;
    });
  }, [product]);

  /*
   * =========================================================
   * PRODUTOS RELACIONADOS
   * =========================================================
   */

  const relatedProducts = useMemo(() => {
    if (
      !product ||
      products.length <= 1
    ) {
      return [];
    }

    /*
     * =======================================================
     * DADOS DO PRODUTO ATUAL
     * =======================================================
     */

    const currentColors =
      getProductColors(product);

    const currentPrice = getProductPrice(product);

    /*
     * =======================================================
     * CALCULA A RELEVÂNCIA
     * =======================================================
     *
     * CRITÉRIOS DE RECOMENDAÇÃO:
     *
     * 1. Mesma categoria ........ +100
     *
     * 2. Pelo menos uma cor
     *    em comum ................ +30
     *
     * 3. Duas ou mais cores
     *    em comum ................ +10
     *
     * 4. Preço até 20% ........... +20
     *
     * 5. Preço até 40% ........... +10
     *
     * NÃO EXISTE:
     *
     * total_sales
     * vendas
     * popularidade
     * "mais vendido"
     *
     * como critério de recomendação.
     */

    const scoredProducts = products
      .filter(
        (candidate) =>
          candidate.name !==
          product.name,
      )
      .map(
        (candidate, originalIndex) => {
          let score = 0;

          /*
           * -------------------------------------------------
           * 1. MESMA CATEGORIA
           * -------------------------------------------------
           */

          if (
            candidate.category ===
            product.category
          ) {
            score += 100;
          }

          /*
           * -------------------------------------------------
           * 2. CORES SEMELHANTES
           * -------------------------------------------------
           */

          const candidateColors =
            getProductColors(candidate);

          let sharedColors = 0;

          currentColors.forEach(
            (color) => {
              if (
                candidateColors.has(color)
              ) {
                sharedColors += 1;
              }
            },
          );

          /*
           * Pelo menos uma cor em comum.
           */
          if (sharedColors > 0) {
            score += 30;
          }

          /*
           * Duas ou mais cores em comum.
           *
           * Bônus limitado a +10.
           *
           * Assim, um produto com várias
           * combinações de cores não domina
           * a recomendação.
           */
          if (sharedColors >= 2) {
            score += 10;
          }

          /*
           * -------------------------------------------------
           * 3. PREÇO SEMELHANTE
           * -------------------------------------------------
           */

          const candidatePrice =
            getProductPrice(candidate);

          if (
            Number.isFinite(
              currentPrice,
            ) &&
            Number.isFinite(
              candidatePrice,
            ) &&
            currentPrice > 0
          ) {
            const priceDifference =
              Math.abs(
                candidatePrice -
                  currentPrice,
              ) / currentPrice;

            /*
             * Até 20% de diferença.
             */
            if (
              priceDifference <= 0.2
            ) {
              score += 20;
            }

            /*
             * Entre 20% e 40%.
             */
            else if (
              priceDifference <= 0.4
            ) {
              score += 10;
            }
          }

          /*
           * -------------------------------------------------
           * RESULTADO
           * -------------------------------------------------
           *
           * Observe que NÃO existe:
           *
           * totalSales
           * candidate.total_sales
           *
           * aqui.
           */

          return {
            product: candidate,
            score,
            sharedColors,
            originalIndex,

            /*
             * Apenas verifica se já foi visitado.
             *
             * Isso serve para DIVERSIDADE,
             * não para popularidade.
             */
            wasVisited:
              visitedProducts.has(
                candidate.name,
              ),
          };
        },
      );

    /*
     * =======================================================
     * ORDENAÇÃO
     * =======================================================
     *
     * 1. Produtos ainda não visitados.
     *
     * 2. Maior relevância.
     *
     * 3. Ordem original do catálogo em caso de empate.
     *
     * total_sales NÃO participa.
     */

    scoredProducts.sort((a, b) => {
      /*
       * Produtos novos primeiro.
       */
      if (
        a.wasVisited !==
        b.wasVisited
      ) {
        return a.wasVisited ? 1 : -1;
      }

      /*
       * Depois, maior relevância.
       */
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      /*
       * Empate:
       * ordem original do catálogo.
       */
      return (
        a.originalIndex -
        b.originalIndex
      );
    });

    /*
     * =======================================================
     * PRODUTOS NOVOS
     * =======================================================
     */

    const freshProducts =
      scoredProducts.filter(
        (item) => !item.wasVisited,
      );

    /*
     * =======================================================
     * SEPARAÇÃO POR COR
     * =======================================================
     */

    /*
     * Produtos com pelo menos uma cor em comum.
     */
    const sameColorFresh =
      freshProducts.filter(
        (item) =>
          item.sharedColors > 0,
      );

    /*
     * Produtos sem nenhuma cor em comum.
     */
    const differentColorFresh =
      freshProducts.filter(
        (item) =>
          item.sharedColors === 0,
      );

    /*
     * =======================================================
     * SELEÇÃO
     * =======================================================
     */

    const selected: Product[] = [];

    /*
     * -------------------------------------------------------
     * PRIMEIRO:
     * até 3 produtos de cor semelhante.
     * -------------------------------------------------------
     */

    sameColorFresh
      .slice(0, 3)
      .forEach((item) => {
        if (selected.length < 3) {
          selected.push(
            item.product,
          );
        }
      });

    /*
     * -------------------------------------------------------
     * DEPOIS:
     * pelo menos 1 produto de cor diferente.
     * -------------------------------------------------------
     */

    if (
      selected.length < 4 &&
      differentColorFresh.length >
        0
    ) {
      selected.push(
        differentColorFresh[0]
          .product,
      );
    }

    /*
     * =======================================================
     * COMPLETA ATÉ 4
     * =======================================================
     */

    if (selected.length < 4) {
      const selectedNames =
        new Set(
          selected.map(
            (item) => item.name,
          ),
        );

      for (const item of freshProducts) {
        if (selected.length >= 4) {
          break;
        }

        if (
          selectedNames.has(
            item.product.name,
          )
        ) {
          continue;
        }

        /*
         * Descobre se o candidato possui
         * alguma cor em comum com os produtos
         * já selecionados.
         */
        const candidateColors =
          getProductColors(
            item.product,
          );

        const sameColorCount =
          selected.filter(
            (selectedProduct) => {
              const selectedColors =
                getProductColors(
                  selectedProduct,
                );

              for (
                const color of candidateColors
              ) {
                if (
                  selectedColors.has(
                    color,
                  )
                ) {
                  return true;
                }
              }

              return false;
            },
          ).length;

        /*
         * Nunca ultrapassa 3 recomendações
         * de cor semelhante.
         */
        if (
          item.sharedColors > 0 &&
          sameColorCount >= 3
        ) {
          continue;
        }

        selected.push(
          item.product,
        );

        selectedNames.add(
          item.product.name,
        );
      }
    }

    /*
     * =======================================================
     * FALLBACK
     * =======================================================
     *
     * Só usamos produtos já visitados se o catálogo
     * não tiver produtos novos suficientes.
     *
     * Mesmo aqui:
     *
     * NÃO usamos vendas.
     *
     * NÃO usamos total_sales.
     *
     * NÃO usamos "mais vendido".
     */

    if (selected.length < 4) {
      const selectedNames =
        new Set(
          selected.map(
            (item) => item.name,
          ),
        );

      const visitedRelevant =
        scoredProducts.filter(
          (item) =>
            item.wasVisited &&
            !selectedNames.has(
              item.product.name,
            ),
        );

      for (const item of visitedRelevant) {
        if (selected.length >= 4) {
          break;
        }

        selected.push(
          item.product,
        );

        selectedNames.add(
          item.product.name,
        );
      }
    }

    return selected;
  }, [
    product,
    products,
    visitedProducts,
  ]);

  /*
   * =========================================================
   * SEM PRODUTOS RELACIONADOS
   * =========================================================
   */

  if (
    relatedProducts.length === 0
  ) {
    return null;
  }

  const bestSellingByCategory = getBestSellingByCategory();

  /*
   * =========================================================
   * RENDER
   * =========================================================
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
            Outras peças da Florisse que
            podem conquistar um cantinho
            na sua casa.
          </p>
        </motion.div>

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map(
            (
              relatedProduct,
              index,
            ) => (
              <motion.div
                key={
                  relatedProduct.name
                }
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
                  delay:
                    index * 0.08,
                  ease: "easeOut",
                }}
              >
                <ProductCard
                  product={
                    relatedProduct
                  }
                  bestSellingByCategory={
                    bestSellingByCategory
                  }
                  formatPath={
                    formatPath
                  }
                  formatColor={
                    formatColor
                  }
                />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}