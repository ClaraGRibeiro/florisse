"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import FreightBadge from "@/components/freight/FreightBadge";

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
  onSetQuantity,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleSave(values: CartItemEditorValues) {
    onUpdate(item.id, values);
    setIsEditing(false);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="border-border/80 bg-card rounded-[1.75rem] border p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <CartItemImage item={item} />

        <div className="flex flex-1 flex-col justify-between">
          <CartItemInfo item={item} />

          {item.type === "product" &&
            product &&
            (() => {
              const size = product.sizes.find(
                (productSize) => productSize.label === item.size,
              );

              if (!size) {
                return null;
              }

              return (
                <div className="bg-primary/5 mt-4 rounded-2xl px-3.5 py-3">
                  <FreightBadge
                    weight={size.peso}
                    width={size.largura}
                    length={size.comprimento}
                    height={size.altura}
                    compact
                  />

                  {item.quantity > 1 && (
                    <p className="text-muted mt-2 text-[11px]">
                      Frete <span className="font-semibold">aproximado</span>{" "}
                      considerado {item.quantity}{" "}
                      {item.quantity === 1 ? "unidade" : "unidades"} no resumo
                      do pedido.
                    </p>
                  )}
                </div>
              );
            })()}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <CartItemQuantity
              item={item}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              onSetQuantity={onSetQuantity}
            />

            {product && (
              <button
                type="button"
                onClick={() => setIsEditing((current) => !current)}
                className="border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300"
              >
                {isEditing ? "Fechar edição" : "Editar opções"}
              </button>
            )}

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="border-border text-muted hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300"
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
