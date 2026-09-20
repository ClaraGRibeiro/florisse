"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import CartItemEditor from "./CartItemEditor";
import CartItemImage from "./CartItemImage";
import CartItemInfo from "./CartItemInfo";
import CartItemQuantity from "./CartItemQuantity";
import type { CartItemEditorValues, CartItemProps } from "./types";

type Props = CartItemProps;

export default function CartItem({
  item,
  product,
  onDecrease,
  onIncrease,
  onRemove,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleSave(values: CartItemEditorValues) {
    onUpdate(item.id, values);
    setIsEditing(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.75rem] border border-border/80 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row">
        <CartItemImage item={item} />

        <div className="flex flex-1 flex-col justify-between">
          <CartItemInfo item={item} />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <CartItemQuantity
              item={item}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
            />

            {product && (
              <button
                type="button"
                onClick={() => setIsEditing((current) => !current)}
                className="cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                {isEditing ? "Fechar edição" : "Editar opções"}
              </button>
            )}

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="cursor-pointer rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted transition-all duration-300 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
            >
              Remover
            </button>
          </div>
        </div>
      </div>

      {isEditing && product && (
        <CartItemEditor
          item={item}
          product={product}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </motion.div>
  );
}

