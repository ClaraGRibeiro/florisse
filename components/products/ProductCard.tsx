"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

import FreightBadge from "@/components/freight/FreightBadge";

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
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  /*
   * Cor efetivamente selecionada pelo clique.
   *
   * Para produtos de Pronta Entrega, a cor já começa
   * selecionada em readyColor.
   */
  const [selectedColorName, setSelectedColorName] = useState<string | null>(
    readyColor ?? null,
  );

  const firstSize = product.sizes[0];

  /*
   * Tamanho utilizado para o cálculo do frete.
   *
   * Se for uma pronta entrega e houver readySize,
   * procura o tamanho correspondente.
   *
   * Caso não encontre ou não exista readySize,
   * utiliza o primeiro tamanho do produto.
   *
   * O teste `readySize ?` evita que o TypeScript
   * considere `""` como possível resultado.
   */
  const freightSize = readySize
    ? (product.sizes.find((size) => size.label === readySize) ?? firstSize)
    : firstSize;

  /*
   * A cor exibida segue esta prioridade:
   *
   * 1. Cor em hover, para permitir pré-visualização;
   * 2. Cor que o usuário clicou;
   * 3. Primeira cor do produto.
   */
  const displayedColorName =
    hoveredColor ?? selectedColorName ?? product.colors[0]?.name;

  const selectedColor =
    product.colors.find((color) => color.name === displayedColorName) ??
    product.colors[0];

  const isBestSelling =
    bestSellingByCategory[product.category]?.name === product.name &&
    (product.total_sales ?? 0) > 0;

  const isReadyProduct = readyQuantity !== undefined;

  const handleReadyProductClick = () => {
    const message = encodeURIComponent(
      `Olá, Florisse! Quero essa pronta entrega:

${product.name}
Cor: ${formatColor(readyColor ?? "")}
Tamanho: ${readySize}
Valor: R$ ${readyPrice?.toFixed(2).replace(".", ",")}`,
    );

    window.open(WHATSAPP + `?text=${message}`, "_blank", "noopener,noreferrer");
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

  const cardContent = (
    <article
      className={
        "border-border/80 bg-card relative overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      }
    >
      <ProductImage
        product={product}
        selectedColor={selectedColor}
        formatColor={formatColor}
      />

      {readyQuantity !== undefined && (
        <div className="bg-background/90 text-primary absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md">
          Pronta Entrega
        </div>
      )}

      {readyQuantity === undefined && isBestSelling && (
        <div className="bg-background/70 text-primary absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md">
          Mais vendido <span className="lowercase">({product.category})</span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div>
          <h3 className="text-foreground font-serif text-xl leading-tight font-semibold tracking-tight">
            {product.name}
          </h3>

          {readyQuantity !== undefined ? (
            <div className="mt-2 space-y-1">
              <p className="text-muted text-sm font-medium">
                Tamanho: {readySize}
              </p>
            </div>
          ) : (
            <p className="text-muted mt-1 text-sm">{firstSize.label}</p>
          )}
        </div>

        <div className="mt-5">
          <p className="text-muted mb-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
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
                title={formatColor(readyColor ?? "")}
                className="border-background h-6 w-6 rounded-full border-2 shadow-sm"
                style={{
                  background: getGradient(selectedColor?.hex ?? []),
                }}
              />

              <span className="text-muted text-xs font-medium">
                {formatColor(readyColor ?? "")}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {product.colors.slice(0, 7).map((color) => {
                const isSelected = selectedColorName === color.name;
                const isHovered = hoveredColor === color.name;

                return (
                  <button
                    key={color.name}
                    type="button"
                    title={`Selecionar ${formatColor(color.name)}`}
                    aria-label={`Selecionar ${product.name} na cor ${formatColor(
                      color.name,
                    )}`}
                    aria-pressed={isSelected}
                    onMouseEnter={() => setHoveredColor(color.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                    onClick={(event) => handleColorClick(event, color.name)}
                    className={`border-background h-6 w-6 cursor-pointer rounded-full border-2 shadow-sm transition-all duration-200 ${
                      isSelected
                        ? "ring-primary/40 scale-125 ring-2"
                        : isHovered
                          ? "ring-primary/20 scale-110 ring-2"
                          : "hover:scale-110"
                    }`}
                    style={{
                      background: getGradient(color.hex),
                    }}
                  />
                );
              })}

              {product.colors.length > 7 && (
                <span className="text-muted ml-1 text-xs font-medium">
                  +{product.colors.length - 7}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="border-border/70 mt-6 flex items-end justify-between gap-4 border-t pt-5">
          <div>
            <p className="text-muted text-[11px] font-medium tracking-wide uppercase">
              {isReadyProduct ? "Valor da peça" : "A partir de"}
            </p>

            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="text-primary font-serif text-xl font-semibold">
                R${" "}
                {(isReadyProduct ? (readyPrice ?? 0) : firstSize.price)
                  .toFixed(2)
                  .replace(".", ",")}
              </span>

              {!isReadyProduct && firstSize.no_discount && (
                <span className="text-muted text-xs line-through">
                  R$ {firstSize.no_discount}
                </span>
              )}
            </div>
          </div>

          {isReadyProduct ? (
            <span className="bg-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <FaWhatsapp className="text-base" />
              Quero!
            </span>
          ) : (
            <span className="text-primary shrink-0 text-sm font-semibold transition-all duration-300 group-hover:translate-x-1">
              Ver peça →
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return isReadyProduct ? (
    <div
      className="group block cursor-pointer"
      onClick={handleReadyProductClick}
    >
      {cardContent}
    </div>
  ) : (
    <Link
      href={`/produto/${formatPath(product.name)}`}
      className="group block cursor-pointer"
    >
      {cardContent}
    </Link>
  );
}
