import { FaMinus, FaPlus } from "react-icons/fa";

import { useCart } from "@/hooks/useCart";

type CartItem = ReturnType<typeof useCart>["cart"][number];

type CartItemQuantityProps = {
  item: CartItem;
  onDecrease: (item: CartItem) => void;
  onIncrease: (item: CartItem) => void;
};

export default function CartItemQuantity({
  item,
  onDecrease,
  onIncrease,
}: CartItemQuantityProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-border bg-background shadow-sm">
      <button
        type="button"
        onClick={() => onDecrease(item)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
        aria-label="Diminuir quantidade"
      >
        <FaMinus size={10} />
      </button>

      <span className="flex h-10 min-w-11 items-center justify-center border-x border-border px-3 text-sm font-semibold">
        {item.quantity}
      </span>

      <button
        type="button"
        onClick={() => onIncrease(item)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-muted transition hover:bg-primary/10 hover:text-primary"
        aria-label="Aumentar quantidade"
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}
