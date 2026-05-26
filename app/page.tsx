"use client";

import Cart from "@/components/Cart";
import Cuidados from "@/components/Cuidados";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModalProduct from "@/components/ModalProduct";
import Numbers from "@/components/Numbers";
import Products from "@/components/Products";
import Raffle from "@/components/Raffle";
import Sobre from "@/components/Sobre";

import { useCart } from "@/hooks/useCart";
import { useProductModal } from "@/hooks/useProductModal";
import { useProducts } from "@/hooks/useProducts";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useState } from "react";

import { formatColor, formatPath } from "@/utils/format";
import { FaArrowUp } from "react-icons/fa";
import Cores from "@/components/Cores";

export default function Home() {
  const rafflePrice = 5;
  const raffleIsOn = false;

  const [numbersOpen, setNumbersOpen] = useState(false);
  const [raffleOpen, setRaffleOpen] = useState(true);

  const { products, bestSelling } = useProducts();
  const { showTop, scrollToTop } = useScrollTop();

  const { cart, addToCart, removeFromCart } = useCart();

  const {
    selectedProduct,
    selectedColor,
    selectedSize,
    setSelectedColor,
    setSelectedSize,
    openProduct,
    closeProduct,
  } = useProductModal();

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header
        cartLength={cart.length}
        openCart={() => setCartOpen(true)}
        raffleIsOn={raffleIsOn}
        openRaffle={() => setRaffleOpen(true)}
      />

      <Hero bestSelling={bestSelling} />

      <Products
        products={products}
        bestSelling={bestSelling}
        formatColor={formatColor}
        formatPath={formatPath}
        openProduct={openProduct}
      />

      <Cores
        formatColor={formatColor} />
      <Cuidados />
      <Sobre />
      <Footer />

      {selectedProduct && (
        <ModalProduct
          product={selectedProduct}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          setSelectedProduct={closeProduct}
          addToCart={addToCart}
          formatColor={formatColor}
          formatPath={formatPath}
        />
      )}

      {cartOpen && (
        <Cart
          cart={cart}
          setCartOpen={setCartOpen}
          removeFromCart={removeFromCart}
          formatColor={formatColor}
        />
      )}
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

      {showTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </main>
  );
}
