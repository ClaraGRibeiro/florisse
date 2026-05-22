"use client";

import { useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  no_discount?: number;
  image: string;
  quantity: number;
};

type AddToCartParams = {
  name: string;
  color: string;
  size: string;
  price: number;
  no_discount?: number;
  image: string;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.name === item.name &&
          p.color === item.color &&
          p.size === item.size,
      );

      if (existing) {
        return prev.map((p) =>
          p.id === existing.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };
}
