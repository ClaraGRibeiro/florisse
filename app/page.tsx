"use client";

import Cores from "@/components/Cores";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PorQueFlorisse from "@/components/Porque";
import Products from "@/components/products/Products";
import Sobre from "@/components/Sobre";

import { useScrollTop } from "@/hooks/useScrollTop";
import {
  getBestSelling,
  getBestSellingByCategory,
  getCatalogCategories,
  getCategoryCounts,
  getProducts,
  getReadyProducts,
} from "@/lib/products";

import { WHATSAPP } from "@/data/config";
import { formatColor, formatPath } from "@/utils/format";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const products = getProducts();
  const readyProducts = getReadyProducts();
  const bestSelling = getBestSelling();
  const bestSellingByCategory = getBestSellingByCategory();
  const categories = getCatalogCategories();
  const categoryCounts = getCategoryCounts();

  const { showTop, scrollToTop } = useScrollTop();

  return (
    <div className="bg-background text-foreground min-h-screen">
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

      <Cores formatColor={formatColor} />
      <PorQueFlorisse />
      <Sobre />
      <Footer />

      {showTop && (
        <button
          title="Voltar para o início"
          onClick={scrollToTop}
          className="bg-primary fixed right-6 bottom-6 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 md:flex"
        >
          <FaArrowUp size={18} />
        </button>
      )}

      {showTop && (
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          title="Contatar pelo WhatsApp"
          aria-label="Contatar pelo WhatsApp"
          className="bg-primary focus-visible:ring-primary fixed bottom-6 left-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <FaWhatsapp size={18} />
        </a>
      )}
    </div>
  );
}
