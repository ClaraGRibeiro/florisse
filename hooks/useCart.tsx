"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;

  // Cor cadastrada ou cores personalizadas separadas por "/"
  color: string;

  // Tamanho exibido no carrinho
  size: string;

  // Para tamanho personalizado
  customLength?: string;
  customWidth?: string;

  price: number;
  no_discount?: number;

  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (
    id: string,
    quantity: number,
  ) => void;

  updateItem: (
    id: string,
    updates: Partial<CartItem>,
  ) => void;

  clearCart: () => void;

  totalItems: number;
  totalPrice: number;
};

const CartContext =
  createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "florisse-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ============================================================
  // CARREGA O CARRINHO
  // ============================================================

  useEffect(() => {
    const savedCart =
      localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return;
    }

    try {
      setCart(JSON.parse(savedCart));
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // ============================================================
  // SALVA O CARRINHO
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart),
    );
  }, [cart]);

  // ============================================================
  // ADICIONAR
  // ============================================================

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.name === item.name &&
          p.color === item.color &&
          p.size === item.size &&
          p.customLength === item.customLength &&
          p.customWidth === item.customWidth,
      );

      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? {
              ...p,
              quantity:
                p.quantity + item.quantity,
            }
            : p,
        );
      }

      return [...prev, item];
    });
  }

  // ============================================================
  // REMOVER
  // ============================================================

  function removeFromCart(id: string) {
    setCart((prev) =>
      prev.filter((item) => item.id !== id),
    );
  }

  // ============================================================
  // ALTERAR QUANTIDADE
  // ============================================================

  function updateQuantity(
    id: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity,
          }
          : item,
      ),
    );
  }

  // ============================================================
  // ATUALIZAR ITEM
  // ============================================================

  function updateItem(
    id: string,
    updates: Partial<CartItem>,
  ) {
    setCart((prev) => {
      const currentItem = prev.find(
        (item) => item.id === id,
      );

      if (!currentItem) {
        return prev;
      }

      const updatedItem = {
        ...currentItem,
        ...updates,
      };

      // Se a nova configuração já existe em outro item,
      // junta as quantidades.
      const duplicatedItem = prev.find(
        (item) =>
          item.id !== id &&
          item.name === updatedItem.name &&
          item.color === updatedItem.color &&
          item.size === updatedItem.size &&
          item.customLength ===
          updatedItem.customLength &&
          item.customWidth ===
          updatedItem.customWidth,
      );

      if (duplicatedItem) {
        return prev
          .filter((item) => item.id !== id)
          .map((item) =>
            item.id === duplicatedItem.id
              ? {
                ...item,
                quantity:
                  item.quantity +
                  updatedItem.quantity,
                price: updatedItem.price,
                no_discount:
                  updatedItem.no_discount,
                image: updatedItem.image,
              }
              : item,
          );
      }

      return prev.map((item) =>
        item.id === id
          ? updatedItem
          : item,
      );
    });
  }

  // ============================================================
  // LIMPAR
  // ============================================================

  function clearCart() {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  // ============================================================
  // TOTAIS
  // ============================================================

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider",
    );
  }

  return context;
}