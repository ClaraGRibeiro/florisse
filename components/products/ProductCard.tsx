import Link from "next/link";
import { useState } from "react";

import { Product } from "@/types/product";
import { getGradient } from "@/utils/gradient";
import ProductImage from "./ProductImage";


export function ProductCard({
  product,
  bestSellingByCategory,
  formatPath,
  formatColor,
}: {
  product: Product;
  bestSellingByCategory: Record<string, Product>;
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
}) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const firstSize = product.sizes[0];

  const selectedColor =
    product.colors.find((color) => color.name === hoveredColor) ??
    product.colors[0];

  const isBestSelling =
    bestSellingByCategory[product.category]?.name === product.name &&
    (product.total_sales ?? 0) > 0;

  return (
    <Link
      href={`/produto/${formatPath(product.name)}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">


        {/* IMAGEM */}
        <ProductImage
          product={product}
          selectedColor={selectedColor}
          formatPath={formatPath}
          formatColor={formatColor}
        />
        {isBestSelling && (
          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-md">
            Mais vendido
          </div>
        )}
        {/* INFORMAÇÕES */}

        <div className="p-5 sm:p-6">
          <div>
            <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight text-foreground">
              {product.name}
            </h3>

            <p className="mt-1 text-sm text-muted">
              {firstSize.label}
            </p>
          </div>

          {/* CORES */}
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {product.sizes.length} tamanhos disponíveis
            </p>

            <div className="flex items-center gap-2">
              {product.colors.slice(0, 7).map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={formatColor(color.name)}
                  aria-label={`Ver ${product.name} na cor ${formatColor(
                    color.name,
                  )}`}
                  onMouseEnter={() => setHoveredColor(color.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onClick={(event) => event.preventDefault()}
                  className={`h-6 w-6 cursor-pointer rounded-full border-2 border-background shadow-sm transition-all duration-200 ${hoveredColor === color.name
                    ? "scale-125 ring-2 ring-primary/30"
                    : "hover:scale-110"
                    }`}
                  style={{
                    background: getGradient(color.hex),
                  }}
                />
              ))}

              {product.colors.length > 7 && (
                <span className="ml-1 text-xs font-medium text-muted">
                  +{product.colors.length - 7}
                </span>
              )}
            </div>
          </div>

          {/* PREÇO + AÇÃO */}
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-border/70 pt-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                A partir de
              </p>

              <div className="mt-0.5 flex items-baseline gap-2">
                <span className="font-serif text-xl font-semibold text-primary">
                  R$ {firstSize.price.toFixed(2)}
                </span>

                {firstSize.no_discount && (
                  <span className="text-xs text-muted line-through">
                    R$ {firstSize.no_discount}
                  </span>
                )}
              </div>
            </div>

            <span className="shrink-0 text-sm font-semibold text-primary transition-all duration-300 group-hover:translate-x-1">
              Ver peça →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}