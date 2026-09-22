"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  type: "product" | "custom-order";
  color: string;
  size: string;
  customLength?: string;
  customWidth?: string;
  price: number;
  no_discount?: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "florisse-cart";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.id !== "string" || value.id.trim() === "") {
    return false;
  }

  if (typeof value.name !== "string" || value.name.trim() === "") {
    return false;
  }

  if (value.type !== "product" && value.type !== "custom-order") {
    return false;
  }

  if (typeof value.color !== "string" || value.color.trim() === "") {
    return false;
  }

  if (typeof value.size !== "string" || value.size.trim() === "") {
    return false;
  }

  if (
    typeof value.price !== "number" ||
    !Number.isFinite(value.price) ||
    value.price < 0
  ) {
    return false;
  }

  if (
    typeof value.quantity !== "number" ||
    !Number.isFinite(value.quantity) ||
    !Number.isInteger(value.quantity) ||
    value.quantity <= 0
  ) {
    return false;
  }

  if (typeof value.image !== "string" || value.image.trim() === "") {
    return false;
  }

  if (
    value.customLength !== undefined &&
    typeof value.customLength !== "string"
  ) {
    return false;
  }

  if (
    value.customWidth !== undefined &&
    typeof value.customWidth !== "string"
  ) {
    return false;
  }

  if (
    value.no_discount !== undefined &&
    (typeof value.no_discount !== "number" ||
      !Number.isFinite(value.no_discount) ||
      value.no_discount < 0)
  ) {
    return false;
  }

  return true;
}

function parseStoredCart(savedCart: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

function areSameCartConfiguration(first: CartItem, second: CartItem): boolean {
  return (
    first.name === second.name &&
    first.type === second.type &&
    first.color === second.color &&
    first.size === second.size &&
    first.customLength === second.customLength &&
    first.customWidth === second.customWidth &&
    first.price === second.price &&
    first.no_discount === second.no_discount
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const validCart = parseStoredCart(savedCart);

        setCart(validCart);

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validCart));
        } catch {}
      }
    } catch {
      setCart([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, isLoaded]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  function addToCart(item: CartItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((currentItem) =>
        areSameCartConfiguration(currentItem, item),
      );

      if (!existingItem) {
        return [...currentCart, item];
      }

      return currentCart.map((currentItem) =>
        currentItem.id === existingItem.id
          ? {
              ...currentItem,
              quantity: currentItem.quantity + item.quantity,
            }
          : currentItem,
      );
    });
  }

  function removeFromCart(id: string) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  function updateItem(id: string, updates: Partial<CartItem>) {
    setCart((currentCart) => {
      const currentItem = currentCart.find((item) => item.id === id);

      if (!currentItem) {
        return currentCart;
      }

      const updatedItem: CartItem = {
        ...currentItem,
        ...updates,
      };

      const existingItem = currentCart.find(
        (item) => item.id !== id && areSameCartConfiguration(item, updatedItem),
      );

      if (!existingItem) {
        return currentCart.map((item) => (item.id === id ? updatedItem : item));
      }

      return currentCart
        .filter((item) => item.id !== id)
        .map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + updatedItem.quantity,
              }
            : item,
        );
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
