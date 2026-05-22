import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import productsData from "@/data/products";
import { Product } from "@/types/product";

type ProductsProps = {
  products: Product[];
  bestSelling: Product;
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
  openProduct: (product: Product) => void;
};

const filters = ["Tapetes", "Mesa Posta", "Jogos"];

const labels = {
  Tapetes: "Tapetes",
  "Mesa Posta": "Mesa Posta",
  Jogos: "Jogos",
};

export default function Products({
  products,
  bestSelling,
  formatPath,
  formatColor,
  openProduct,
}: ProductsProps) {
  const [category, setCategory] = useState("Tapetes");

  const discount = Math.round((productsData.discount * 100 - 100) * -1);

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
              className={`relative cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                active
                  ? "border-transparent bg-primary text-white shadow-md"
                  : "border-border bg-card text-muted hover:border-primary/30 hover:text-primary"
              }`}
            >
              {labels[filter as keyof typeof labels]}

              {filter === "Jogos" && (
                <span className="absolute -right-1 -top-2 z-10 rounded-full bg-red-500 px-2 py-0.5 text-sm font-bold leading-none text-white shadow-md">
                  -{discount}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => {
          const firstSize = product.sizes[0];

          return (
            <button
              key={product.name}
              onClick={() => openProduct(product)}
              className="group relative overflow-hidden rounded-4xl border border-border bg-card text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
              </div>

              <div className="relative overflow-hidden">
                <Image
                  src={`/products/${formatPath(product.category)}/${formatPath(product.name)}/${product.colors[0].name}.webp`}
                  alt={product.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:rotate-1 group-hover:scale-110"
                />

                {product.total_sales >= bestSelling.total_sales && (
                  <div className="absolute left-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-card shadow-md backdrop-blur">
                    Popular
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div>
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {product.name}
                  </h3>

                  <span className="text-sm font-medium text-muted">
                    {firstSize.label}
                  </span>

                  <div className="mt-3 flex items-center gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.name}
                        title={formatColor(color.name)}
                        className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
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
                                : `linear-gradient(135deg, ${color.hex.join(", ")})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

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

                  <div className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    Ver detalhes
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
