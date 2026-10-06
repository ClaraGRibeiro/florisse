"use client";

import About from "@/components/layout/About";
import ColorsPreview from "@/components/layout/ColorsPreview";
import Hero from "@/components/layout/Hero";
import Products from "@/components/layout/Products";
import WhyFlorisse from "@/components/layout/WhyFlorisse";

import {
  getBestSelling,
  getBestSellingByCategory,
  getCatalogCategories,
  getCategoryCounts,
  getProducts,
  getReadyProducts,
} from "@/lib/products";

import GalleryPreview from "@/components/layout/GalleryPreview";
import { formatColor, formatPath } from "@/utils/format";

export default function Home() {
  const products = getProducts();
  const readyProducts = getReadyProducts();
  const bestSelling = getBestSelling();
  const bestSellingByCategory = getBestSellingByCategory();
  const categories = getCatalogCategories();
  const categoryCounts = getCategoryCounts();

  return (
    <div className="bg-card text-foreground min-h-screen">
      <Hero bestSelling={bestSelling} formatPath={formatPath} />

      <Products
        products={products}
        readyProducts={readyProducts}
        bestSellingByCategory={bestSellingByCategory}
        filters={categories}
        formatColor={formatColor}
        formatPath={formatPath}
        categoryCounts={categoryCounts}
      />

      <ColorsPreview />
      <GalleryPreview />
      <WhyFlorisse />
      <About />
    </div>
  );
}
