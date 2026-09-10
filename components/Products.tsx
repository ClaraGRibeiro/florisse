import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import productsData from "@/data/products";
import { Product } from "@/types/product";

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

  return (
    <Link
      href={`/produto/${formatPath(product.name)}`}
      className="block"
    >
      <div className="group relative overflow-hidden rounded-4xl border border-border bg-card text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
        </div>

        {/* IMAGEM */}
        <div className="relative h-96 w-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={selectedColor.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={imagePath}
                alt={`${product.name} - ${formatColor(selectedColor.name)}`}
                width={600}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {bestSellingByCategory[product.category]?.name === product.name &&
            (product.total_sales ?? 0) > 0 && (
              <div className="absolute left-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-card shadow-md backdrop-blur">
                Mais vendido
              </div>
            )}
        </div>

        {/* INFORMAÇÕES */}
        <div className="flex flex-col gap-4 p-5">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold">
              {product.name}
            </h3>

            <span className="text-sm font-medium text-muted">
              {firstSize.label}
            </span>

            {/* CORES */}
            <div className="mt-3 flex items-center gap-2">
              {product.colors.slice(0, 7).map((color) => (
                <div
                  key={color.name}
                  title={formatColor(color.name)}
                  onMouseEnter={() => setHoveredColor(color.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={`h-6 w-6 cursor-pointer rounded-full border-2 border-white shadow-sm transition-all duration-200 ${hoveredColor === color.name
                    ? "scale-125 ring-2 ring-primary/30"
                    : "hover:scale-110"
                    }`}
                  style={{
                    background:
                      color.hex.length === 1
                        ? color.hex[0]
                        : color.hex.length === 2
                          ? `linear-gradient(
                            135deg,
                            ${color.hex[0]} 0%,
                            ${color.hex[0]} 50%,
                            ${color.hex[1]} 50%,
                            ${color.hex[1]} 100%
                          )`
                          : `linear-gradient(135deg, ${color.hex.join(
                            ", ",
                          )})`,
                  }}
                />
              ))}

              {product.colors.length > 7 && (
                <span className="ml-1 text-sm text-muted">...</span>
              )}
            </div>
          </div>

          {/* PREÇO */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">
                R$ {firstSize.price.toFixed(2)}
              </span>

              {firstSize.no_discount && (
                <span className="text-sm text-muted line-through">
                  R$ {firstSize.no_discount}
                </span>
              )}
            </div>

            <div className="cursor-pointer rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              Ver detalhes
            </div>
          </div>
        </div>
      </div>
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="mb-10 text-center">
        <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
          Produtos em Destaque
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Feitos à mão com muito amor, carinho e atenção em cada detalhe.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => {
          const active = category === filter;

          return (
            <button
              key={filter}
              onClick={() => setCategory(filter)}
              className={`relative cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${active
                ? "border-transparent bg-primary text-white shadow-md"
                : "border-border bg-card text-muted hover:border-primary/30 hover:text-primary"
                }`}
            >
              {filter} ({categoryCounts[filter] ?? 0})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </motion.section>
  );
}
