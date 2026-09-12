"use client";

import Cuidados from "@/components/Cuidados";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import Products from "@/components/Products";
import Raffle from "@/components/Raffle";
import Sobre from "@/components/Sobre";

import { useProducts } from "@/hooks/useProducts";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useState } from "react";

import Cores from "@/components/Cores";
import Personalized from "@/components/Personalized";
import { formatColor, formatPath } from "@/utils/format";
import { AnimatePresence } from "framer-motion";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const rafflePrice = 5;
  const raffleIsOn = false;

  const [numbersOpen, setNumbersOpen] = useState(false);
  const [raffleOpen, setRaffleOpen] = useState(true);

  const { products, bestSelling, bestSellingByCategory, categories, categoryCounts, productsFromCategory } = useProducts();
  const { showTop, scrollToTop } = useScrollTop();

  const [openPersonalized, setPersonalizedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {raffleIsOn && raffleOpen && (
        <Raffle
          setRaffleOpen={setRaffleOpen}
          rafflePrice={rafflePrice}
          setNumbersOpen={setNumbersOpen}
        />
      )}
      {raffleIsOn && numbersOpen && (
        <Numbers rafflePrice={rafflePrice} setNumbersOpen={setNumbersOpen} />
      )}
      <Hero bestSelling={bestSelling} openPersonalized={() => setPersonalizedOpen(true)} formatPath={formatPath} />
      <AnimatePresence>
        {openPersonalized && (
          <Personalized
            setPersonalizedOpen={setPersonalizedOpen}
            productsFromCategory={productsFromCategory}
            categories={categories}
          />
        )}
      </AnimatePresence>
      <Products
        products={products}
        bestSellingByCategory={bestSellingByCategory}
        filters={categories}
        formatColor={formatColor}
        formatPath={formatPath}
        categoryCounts={categoryCounts}
      />

      <Cores
        formatColor={formatColor} />
      <Cuidados />
      <Sobre />
      <Footer />

      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
        >
          <FaArrowUp size={18} />
        </button>
      )}

      {showTop && (
        <button
          onClick={() => window.open(`https://wa.me/5538992030710`, "_blank")}
          className="cursor-pointer fixed bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
        >
          <FaWhatsapp size={18} />
        </button>
      )}
    </div>
  );
}
