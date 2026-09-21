import { FaMinus, FaPlus } from "react-icons/fa";

import type { CartItemType } from "@/components/cart/types";

type CartItemQuantityProps = {
  item: CartItemType;
  onDecrease: (item: CartItemType) => void;
  onIncrease: (item: CartItemType) => void;
};

export default function CartItemQuantity({
  item,
  onDecrease,
  onIncrease,
}: CartItemQuantityProps) {
  return (
    <div className="border-border bg-background flex items-center overflow-hidden rounded-full border shadow-sm">
      <button
        type="button"
        onClick={() => onDecrease(item)}
        className="text-muted hover:bg-primary/10 hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition"
        aria-label="Diminuir quantidade"
      >
        <FaMinus size={10} />
      </button>

      <span className="border-border flex h-10 min-w-11 items-center justify-center border-x px-3 text-sm font-semibold">
        {item.quantity}
      </span>

      <button
        type="button"
        onClick={() => onIncrease(item)}
        className="text-muted hover:bg-primary/10 hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition"
        aria-label="Aumentar quantidade"
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}
