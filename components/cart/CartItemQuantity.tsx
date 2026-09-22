"use client";

import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import type { CartItemType } from "@/components/cart/types";

type CartItemQuantityProps = {
  item: CartItemType;
  onDecrease: (item: CartItemType) => void;
  onIncrease: (item: CartItemType) => void;
  onSetQuantity: (item: CartItemType, quantity: number) => void;
};

export default function CartItemQuantity({
  item,
  onDecrease,
  onIncrease,
  onSetQuantity,
}: CartItemQuantityProps) {
  const [value, setValue] = useState(String(item.quantity));

  // Mantém o campo sincronizado caso a quantidade seja alterada
  // pelos botões ou por outra parte do carrinho.
  useEffect(() => {
    setValue(String(item.quantity));
  }, [item.quantity]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value;

    // Permite apagar temporariamente o campo enquanto a pessoa digita.
    setValue(rawValue);

    if (rawValue === "") {
      return;
    }

    const quantity = Number(rawValue);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    onSetQuantity(item, quantity);
  }

  function handleBlur() {
    const quantity = Number(value);

    if (!Number.isInteger(quantity) || quantity < 1) {
      setValue(String(item.quantity));
      return;
    }

    setValue(String(quantity));

    if (quantity !== item.quantity) {
      onSetQuantity(item, quantity);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  return (
    <div className="border-border bg-background flex items-center overflow-hidden rounded-full border shadow-sm">
      <button
        type="button"
        onClick={() => onDecrease(item)}
        disabled={item.quantity <= 1}
        className="text-muted hover:bg-primary/10 hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
        aria-label="Diminuir quantidade"
      >
        <FaMinus size={10} />
      </button>

      <input
        type="number"
        min={1}
        step={1}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-label={`Quantidade de ${item.name}`}
        className="border-border focus:bg-primary/5 h-10 w-14 [appearance:textfield] border-x bg-transparent px-1 text-center text-sm font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

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
