import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

export type CartItem = ReturnType<typeof useCart>["cart"][number];

export type CartItemEditorValues = {
  type: CartItem["type"];
  color: string;
  size: string;
  customLength?: string;
  customWidth?: string;
  price: number;
  no_discount?: number;
  image: string;
};

export type CartItemProps = {
  item: CartItem;
  product: Product | null;
  onDecrease: (item: CartItem) => void;
  onIncrease: (item: CartItem) => void;
  onRemove: (itemId: string) => void;
  onUpdate: (
    itemId: string,
    updates: Partial<CartItem>,
  ) => void;
};
