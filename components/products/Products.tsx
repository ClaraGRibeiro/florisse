import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Product, ReadyProduct } from "@/types/product";

import { ProductCard } from "./ProductCard";
import ProductFilters from "./ProductFilters";

type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "az";

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
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState<SortOption>("relevancia");

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);

    const url = new URL(window.location.href);

    if (newCategory === "Todos") {
      url.searchParams.delete("categoria");
    } else {
      url.searchParams.set("categoria", newCategory);
    }

    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const categoryFromUrl = params.get("categoria");

    if (categoryFromUrl && filters.includes(categoryFromUrl)) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("Todos");
    }
  }, [filters]);

  const filteredProducts =
    category === "Todos"
      ? products
      : category === "Pronta entrega"
        ? readyProducts
        : products.filter((product) => product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "menor-preco":
        return a.sizes[0].price - b.sizes[0].price;

      case "maior-preco":
        return b.sizes[0].price - a.sizes[0].price;

      case "az":
        return a.name.localeCompare(b.name, "pt-BR", {
          sensitivity: "base",
        });

      case "relevancia":
      default:
        return (b.total_sales ?? 0) - (a.total_sales ?? 0);
    }
  });

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
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
          Feito ponto por ponto
        </p>

        <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Peças para transformar seu ambiente
        </h2>

        <p className="text-muted mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base">
          Crochês feitos à mão para trazer textura, cor e aconchego aos espaços
          que fazem parte da sua rotina.
        </p>
      </div>

      <ProductFilters
        category={category}
        setCategory={handleCategoryChange}
        filters={filters}
        categoryCounts={categoryCounts}
        sort={sort}
        setSort={setSort}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product, index) => {
          const readyProduct =
            category === "Pronta entrega" ? (product as ReadyProduct) : null;

          return (
            <ProductCard
              key={
                readyProduct
                  ? `${readyProduct.name}-${readyProduct.readyColor}-${readyProduct.readySize}-${index}`
                  : product.name
              }
              product={product}
              bestSellingByCategory={bestSellingByCategory}
              formatPath={formatPath}
              formatColor={formatColor}
              readyColor={readyProduct?.readyColor}
              readySize={readyProduct?.readySize}
              readyPrice={readyProduct?.readyPrice}
              readyQuantity={readyProduct?.readyQuantity}
            />
          );
        })}
      </div>

      {sortedProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-foreground font-serif text-xl">
            Nenhuma peça encontrada.
          </p>

          <p className="text-muted mt-2 text-sm">
            Em breve teremos novidades por aqui.
          </p>
        </div>
      )}
    </motion.section>
  );
}
