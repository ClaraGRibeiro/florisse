"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

import { WHATSAPP } from "@/data/config";
import { Product } from "@/types/product";
import { getGradient } from "@/utils/gradient";

import ProductImage from "./ProductImage";

export function ProductCard({
  product,
  bestSellingByCategory,
  formatPath,
  formatColor,
  readyColor,
  readySize,
  readyPrice,
  readyQuantity,
}: {
  product: Product;
  bestSellingByCategory: Record<string, Product>;
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
  readyColor?: string;
  readySize?: string;
  readyPrice?: number;
  readyQuantity?: number;
}) {
  /*
   * Cor que está sendo apenas pré-visualizada
   * enquanto o mouse está sobre a bolinha.
   */
  const [hoveredColor, setHoveredColor] =
    useState<string | null>(null);

  /*
   * Cor efetivamente selecionada pelo clique.
   *
   * Para produtos de pronta entrega, a cor já começa
   * selecionada em readyColor.
   */
  const [selectedColorName, setSelectedColorName] =
    useState<string | null>(
      readyColor ?? null,
    );

  const firstSize = product.sizes[0];

  /*
   * A cor exibida segue esta prioridade:
   *
   * 1. Cor em hover, para permitir pré-visualização;
   * 2. Cor que o usuário clicou;
   * 3. Primeira cor do produto.
   */
  const displayedColorName =
    hoveredColor ??
    selectedColorName ??
    product.colors[0]?.name;

  const selectedColor =
    product.colors.find(
      (color) =>
        color.name === displayedColorName,
    ) ?? product.colors[0];

  const isBestSelling =
    bestSellingByCategory[
      product.category
    ]?.name === product.name &&
    (product.total_sales ?? 0) > 0;

  const isReadyProduct =
    readyQuantity !== undefined;

  const handleReadyProductClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const message = encodeURIComponent(
      `Olá, Florisse! Quero essa pronta entrega:

${product.name}
Cor: ${formatColor(readyColor ?? "")}
Tamanho: ${readySize}
Valor: R$ ${readyPrice?.toFixed(2).replace(".", ",")}`,
    );

    window.open(
      WHATSAPP + `?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  /*
   * Quando o usuário clica em uma cor:
   *
   * - impede a navegação do Link;
   * - fixa a cor selecionada;
   * - a cor continua selecionada mesmo depois
   *   que o mouse sair da bolinha.
   */
  const handleColorClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    colorName: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedColorName(colorName);
  };

  return (
    <Link
      href={`/produto/${formatPath(product.name)}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <ProductImage
          product={product}
          selectedColor={selectedColor}
          formatColor={formatColor}
        />

        {readyQuantity !== undefined && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-md">
            Pronta entrega
          </div>
        )}

        {readyQuantity === undefined &&
          isBestSelling && (
            <div className="absolute left-4 top-4 rounded-full bg-background/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-md">
              Mais vendido{" "}
              <span className="lowercase">
                ({product.category})
              </span>
            </div>
          )}

        <div className="p-5 sm:p-6">
          <div>
            <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight text-foreground">
              {product.name}
            </h3>

            {readyQuantity !== undefined ? (
              <div className="mt-2 space-y-1">
                <p className="text-sm font-medium text-muted">
                  Tamanho: {readySize}
                </p>
              </div>
            ) : (
              <p className="mt-1 text-sm text-muted">
                {firstSize.label}
              </p>
            )}
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {readyQuantity !== undefined
                ? `${readyQuantity} ${
                    readyQuantity === 1
                      ? "unidade disponível"
                      : "unidades disponíveis"
                  }`
                : `${product.sizes.length} tamanhos disponíveis`}
            </p>

            {readyQuantity !== undefined ? (
              <div className="flex items-center gap-2">
                <span
                  title={formatColor(
                    readyColor ?? "",
                  )}
                  className="h-6 w-6 rounded-full border-2 border-background shadow-sm"
                  style={{
                    background: getGradient(
                      selectedColor?.hex ?? [],
                    ),
                  }}
                />

                <span className="text-xs font-medium text-muted">
                  {formatColor(
                    readyColor ?? "",
                  )}
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {product.colors
                  .slice(0, 7)
                  .map((color) => {
                    const isSelected =
                      selectedColorName ===
                      color.name;

                    const isHovered =
                      hoveredColor ===
                      color.name;

                    return (
                      <button
                        key={color.name}
                        type="button"
                        title={`Selecionar ${formatColor(
                          color.name,
                        )}`}
                        aria-label={`Selecionar ${product.name} na cor ${formatColor(
                          color.name,
                        )}`}
                        aria-pressed={
                          isSelected
                        }
                        onMouseEnter={() =>
                          setHoveredColor(
                            color.name,
                          )
                        }
                        onMouseLeave={() =>
                          setHoveredColor(
                            null,
                          )
                        }
                        onClick={(event) =>
                          handleColorClick(
                            event,
                            color.name,
                          )
                        }
                        className={`h-6 w-6 cursor-pointer rounded-full border-2 border-background shadow-sm transition-all duration-200 ${
                          isSelected
                            ? "scale-125 ring-2 ring-primary/40"
                            : isHovered
                              ? "scale-110 ring-2 ring-primary/20"
                              : "hover:scale-110"
                        }`}
                        style={{
                          background:
                            getGradient(
                              color.hex,
                            ),
                        }}
                      />
                    );
                  })}

                {product.colors.length >
                  7 && (
                  <span className="ml-1 text-xs font-medium text-muted">
                    +
                    {product.colors.length -
                      7}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-border/70 pt-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                {isReadyProduct
                  ? "Valor da peça"
                  : "A partir de"}
              </p>

              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="font-serif text-xl font-semibold text-primary">
                  R${" "}
                  {(
                    isReadyProduct
                      ? readyPrice ?? 0
                      : firstSize.price
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </span>

                {!isReadyProduct &&
                  firstSize.no_discount && (
                    <span className="text-xs text-muted line-through">
                      R${" "}
                      {firstSize.no_discount}
                    </span>
                  )}
              </div>
            </div>

            {isReadyProduct ? (
              <button
                type="button"
                onClick={
                  handleReadyProductClick
                }
                className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              >
                <FaWhatsapp className="text-base" />
                Quero!
              </button>
            ) : (
              <span className="shrink-0 text-sm font-semibold text-primary transition-all duration-300 group-hover:translate-x-1">
                Ver peça →
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}