import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Product, ReadyProduct } from "@/types/product";

import { ProductCard } from "../products/ProductCard";
import ProductFilters from "../products/ProductFilters";

type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "az" | "za";

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
  const [search, setSearch] = useState("");
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
    const searchFromUrl = params.get("busca") ?? "";

    setSearch(searchFromUrl);

    if (categoryFromUrl && filters.includes(categoryFromUrl)) {
      setCategory(categoryFromUrl);
    } else {
      setCategory("Todos");
    }
  }, [filters]);

  const categoryProducts =
    category === "Todos"
      ? products
      : category === "Pronta Entrega"
        ? readyProducts
        : products.filter((product) => product.category === category);

  const normalizeSearch = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/×/g, "x")
      .replace(/\s*x\s*/g, "x")
      .replace(/[^a-z0-9x]+/g, " ")
      .trim();

  const searchTerms = normalizeSearch(search).split(/\s+/).filter(Boolean);

  const filteredProducts = categoryProducts.filter((product) => {
    if (searchTerms.length === 0) return true;

    const readyProduct = product as ReadyProduct;
    const searchableText = normalizeSearch(
      [
        product.name,
        product.category,
        ...product.colors.map((color) => color.name),
        ...product.sizes.map((size) => size.label),
        category === "Pronta Entrega" ? readyProduct.readyColor : "",
        category === "Pronta Entrega" ? readyProduct.readySize : "",
        category === "Pronta Entrega" ? "Pronta Entrega" : "",
      ].join(" "),
    );

    return searchTerms.every((term) => searchableText.includes(term));
  });

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

      case "za":
        return b.name.localeCompare(a.name, "pt-BR", {
          sensitivity: "base",
        });

      case "relevancia":
      default:
        return (b.totalSales ?? 0) - (a.totalSales ?? 0);
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
        search={search}
        setSearch={(value) => {
          setSearch(value);

          const url = new URL(window.location.href);

          if (value.trim()) {
            url.searchParams.set("busca", value);
          } else {
            url.searchParams.delete("busca");
          }

          window.history.replaceState({}, "", url);
        }}
        resultCount={filteredProducts.length}
        sort={sort}
        setSort={setSort}
      />

      <div className="mt-12 grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product, index) => {
          const readyProduct =
            category === "Pronta Entrega" ? (product as ReadyProduct) : null;

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
