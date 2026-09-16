import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Product } from "@/types/product";
import { getGradient } from "@/utils/gradient";

type ProductsProps = {
  products: Product[];
  bestSellingByCategory: Record<string, Product>;
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
  filters: string[];
  categoryCounts: Record<string, number>;
};

function ProductCard({
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

  const imagePath = `/products/${formatPath(
    product.category,
  )}/${formatPath(product.name)}/${selectedColor.name}.webp`;

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
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={selectedColor.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={imagePath}
                alt={`${product.name} - ${formatColor(
                  selectedColor.name,
                )}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
            </motion.div>
          </AnimatePresence>

          {/* BADGE */}
          {isBestSelling && (
            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-md">
              Mais vendido
            </div>
          )}
        </div>

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
              Cores disponíveis
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
                  className={`h-6 w-6 cursor-pointer rounded-full border-2 border-background shadow-sm transition-all duration-200 ${
                    hoveredColor === color.name
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

export default function Products({
  products,
  bestSellingByCategory,
  formatPath,
  formatColor,
  filters,
  categoryCounts,
}: ProductsProps) {
  const [category, setCategory] = useState("Tapetes");

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <motion.section
      id="produtos"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* CABEÇALHO */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
          Feito ponto por ponto
        </p>

        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Peças para fazer parte da sua casa
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
          Crochês feitos à mão para trazer textura, cor e aconchego aos
          espaços que fazem parte da sua rotina.
        </p>
      </div>

      {/* FILTROS */}
      <div className="mt-10 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 rounded-full bg-muted/10 p-1.5">
          {filters.map((filter) => {
            const active = category === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted hover:text-primary"
                }`}
              >
                {filter}

                <span
                  className={`ml-1.5 text-xs ${
                    active ? "text-primary-foreground/75" : "text-muted"
                  }`}
                >
                  {categoryCounts[filter] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            bestSellingByCategory={bestSellingByCategory}
            formatPath={formatPath}
            formatColor={formatColor}
          />
        ))}
      </div>

      {/* ESTADO VAZIO */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-xl text-foreground">
            Nenhuma peça encontrada.
          </p>

          <p className="mt-2 text-sm text-muted">
            Em breve teremos novidades por aqui.
          </p>
        </div>
      )}
    </motion.section>
  );
}