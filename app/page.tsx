"use client";

import About from "@/components/About";
import ColorsPreview from "@/components/colors/ColorsPreview";
import Footer from "@/components/Footer";
import Hero from "@/components/hero/Hero";
import Products from "@/components/products/Products";
import WhyFlorisse from "@/components/WhyFlorisse";

import {
  getBestSelling,
  getBestSellingByCategory,
  getCatalogCategories,
  getCategoryCounts,
  getProducts,
  getReadyProducts,
} from "@/lib/products";

import GalleryPreview from "@/components/gallery/GalleryPreview";
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
      <Footer />
    </div>
  );
}
