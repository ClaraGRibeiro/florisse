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

const VISITED_PRODUCTS_KEY = "florisse-related-visited-products";

export default function ProductRelated({
  product,
  products,
}: ProductRelatedProps) {
  /*
   * IMPORTANTE:
   * Não lemos sessionStorage durante a renderização inicial.
   *
   * O servidor não possui window/sessionStorage, enquanto o
   * navegador possui. Ler o storage diretamente no useState
   * fazia o servidor renderizar uma lista diferente da lista
   * renderizada pelo cliente durante a hidratação.
   */
  const [visitedProducts, setVisitedProducts] = useState<Set<string>>(
    () => new Set(),
  );

  /*
   * Carrega os produtos visitados somente depois da hidratação.
   *
   * Isso garante que o HTML inicial do servidor e o HTML inicial
   * do cliente sejam iguais.
   */
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

      /*
       * A página atual também passa a ser considerada visitada.
       */
      visited.add(product.name);

      setVisitedProducts(visited);

      sessionStorage.setItem(
        VISITED_PRODUCTS_KEY,
        JSON.stringify(Array.from(visited)),
      );
    } catch {
      /*
       * Se o sessionStorage estiver indisponível ou
       * corrompido, mantemos o comportamento determinístico.
       */
      const fallback = new Set<string>();

      fallback.add(product.name);

      setVisitedProducts(fallback);
    }
  }, [product?.name]);

  const relatedProducts = useMemo(() => {
    if (!product || products.length <= 1) {
      return [];
    }

    const currentColors = getProductColors(product);

    const currentPrice = getProductPrice(product);

    const scoredProducts = products
      .filter((candidate) => candidate.name !== product.name)
      .map((candidate, originalIndex) => {
        let score = 0;

        /*
         * Mesma categoria.
         */
        if (candidate.category === product.category) {
          score += 100;
        }

        /*
         * Cores em comum.
         */
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

        /*
         * Faixa de preço semelhante.
         */
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

    /*
     * Ordenação totalmente determinística.
     *
     * Não usamos Math.random(), Date.now() ou qualquer
     * comportamento que possa gerar listas diferentes
     * entre servidor e cliente.
     */
    scoredProducts.sort((a, b) => {
      /*
       * Produtos ainda não visitados vêm primeiro.
       */
      if (a.wasVisited !== b.wasVisited) {
        return a.wasVisited ? 1 : -1;
      }

      /*
       * Maior relevância primeiro.
       */
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      /*
       * Desempate determinístico.
       *
       * Usar o índice original também é determinístico,
       * pois products é uma lista estável recebida como prop.
       */
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

    /*
     * Primeiro: até 3 produtos com cores em comum.
     */
    sameColorFresh.slice(0, 3).forEach((item) => {
      if (selected.length < 3) {
        selected.push(item.product);
      }
    });

    /*
     * Depois: pelo menos 1 produto de cor diferente,
     * quando disponível.
     */
    if (selected.length < 4 && differentColorFresh.length > 0) {
      selected.push(differentColorFresh[0].product);
    }

    /*
     * Completa até 4 produtos.
     */
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

        /*
         * Evita que os quatro cards acabem excessivamente
         * concentrados nas mesmas cores.
         */
        if (item.sharedColors > 0 && sameColorCount >= 3) {
          continue;
        }

        selected.push(item.product);

        selectedNames.add(item.product.name);
      }
    }

    /*
     * Se não houver 4 produtos novos, completa com
     * produtos já visitados.
     */
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
  }, [product, products, visitedProducts]);

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
