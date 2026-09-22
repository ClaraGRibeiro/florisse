import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";

export type CartItemType = ReturnType<typeof useCart>["cart"][number];

export type CartItemEditorValues = {
  type: CartItemType["type"];
  color: string;
  size: string;
  customLength?: string;
  customWidth?: string;
  price: number;
  no_discount?: number;
  image: string;
};

export type CartItemProps = {
  item: CartItemType;
  product: Product | null;
  onDecrease: (item: CartItemType) => void;
  onIncrease: (item: CartItemType) => void;
  onRemove: (itemId: string) => void;
  onUpdate: (itemId: string, updates: Partial<CartItemType>) => void;
};
