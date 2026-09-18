import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Product } from "@/types/product";
import { ReadyProduct } from "@/hooks/useProducts";

import { ProductCard } from "./ProductCard";
import ProductFilters from "./ProductFilters";

type ProductsProps = {
  products: Product[];
  readyProducts: ReadyProduct[];
  bestSellingByCategory: Record<string, Product>;
  formatPath: (name: string) => string;
  formatColor: (name: string) => string;
  filters: string[];
  categoryCounts: Record<string, number>;
};

export default function Products({
  products,
  readyProducts,
  bestSellingByCategory,
  formatPath,
  formatColor,
  filters,
  categoryCounts,
}: ProductsProps) {
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);

    const url = new URL(window.location.href);

    if (newCategory === "Tapetes") {
      url.searchParams.delete("categoria");
    } else {
      url.searchParams.set("categoria", newCategory);
    }

    window.history.pushState({}, "", url);
  };
  const [category, setCategory] = useState("Tapetes");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("categoria");

    if (
      categoryFromUrl &&
      filters.includes(categoryFromUrl)
    ) {
      setCategory(categoryFromUrl);
    }
  }, [filters]);

  const filteredProducts =
    category === "Pronta entrega"
      ? readyProducts
      : products.filter(
        (product) =>
          product.category === category,
      );

  return (
    <motion.section
      id="produtos"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* CABEÇALHO */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
          Feito ponto por ponto
        </p>

        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Peças para transformar seu ambiente
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
          Crochês feitos à mão para trazer
          textura, cor e aconchego aos espaços
          que fazem parte da sua rotina.
        </p>
      </div>

      {/* FILTROS */}
      <ProductFilters
        category={category}
        setCategory={handleCategoryChange}
        filters={filters}
        categoryCounts={categoryCounts}
      />

      {/* PRODUTOS */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(
          (product, index) => {
            const readyProduct =
              category === "Pronta entrega"
                ? (product as ReadyProduct)
                : null;

            return (
              <ProductCard
                key={
                  readyProduct
                    ? `${readyProduct.name}-${readyProduct.readyColor}-${readyProduct.readySize}-${index}`
                    : product.name
                }
                product={product}
                bestSellingByCategory={
                  bestSellingByCategory
                }
                formatPath={formatPath}
                formatColor={formatColor}
                readyColor={
                  readyProduct?.readyColor
                }
                readySize={
                  readyProduct?.readySize
                }
                readyPrice={
                  readyProduct?.readyPrice
                }
                readyQuantity={
                  readyProduct?.readyQuantity
                }
              />
            );
          },
        )}
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