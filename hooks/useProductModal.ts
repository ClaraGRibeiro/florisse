"use client";

import { Product } from "@/types/product";
import { useState } from "react";

export function useProductModal() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [selectedColor, setSelectedColor] = useState<number>(0);

  const [selectedSize, setSelectedSize] = useState<number>(0);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(0);
    setSelectedSize(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const resetSelection = () => {
    setSelectedColor(0);
    setSelectedSize(0);
  };

  return {
    selectedProduct,
    selectedColor,
    selectedSize,

    setSelectedColor,
    setSelectedSize,

    openProduct,
    closeProduct,
    resetSelection,
  };
}
