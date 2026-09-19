"use client";

import { useState } from "react";

import { useCart } from "@/hooks/useCart";

type CartItem = ReturnType<typeof useCart>["cart"][number];
import { getProductByName } from "@/lib/products";
import { formatColor } from "@/utils/format";

import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import RemoveConfirmationModal, {
  type Confirmation,
} from "@/components/cart/RemoveConfirmationModal";
import { WHATSAPP } from "@/data/config";

export default function Carrinho() {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity,
    updateItem,
    totalItems,
  } = useCart();

  const [confirmationModal, setConfirmationModal] =
    useState<Confirmation | null>(null);

  function openRemoveModal(itemId: string) {
    setConfirmationModal({
      type: "remove",
      itemId,
    });
  }

  function openClearCartModal() {
    if (!cart.length) return;

    setConfirmationModal({ type: "clear" });
  }

  function closeConfirmationModal() {
    setConfirmationModal(null);
  }

  function confirmRemoval() {
    if (!confirmationModal) return;

    if (confirmationModal.type === "remove") {
      removeFromCart(confirmationModal.itemId);
    } else {
      clearCart();
    }

    setConfirmationModal(null);
  }

  function handleDecrease(item: CartItem) {
    if (item.quantity <= 1) {
      openRemoveModal(item.id);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
  }

  function handleIncrease(item: CartItem) {
    updateQuantity(item.id, item.quantity + 1);
  }

  function finishOrder() {
    if (!cart.length) return;

    const total = cart.reduce(
      (acc, item) =>
        item.type === "product"
          ? acc + item.price * item.quantity
          : acc,
      0,
    );

    const hasCustomOrders = cart.some(
      (item) => item.type === "custom-order",
    );

    const items = cart
      .map((item) => {
        const customSize =
          item.customLength && item.customWidth
            ? ` (${item.customLength} × ${item.customWidth} cm)`
            : "";

        const value =
          item.type === "custom-order"
            ? "Sob consulta"
            : `R$ ${(item.price * item.quantity)
                .toFixed(2)
                .replace(".", ",")}`;

        return `🧶 ${item.name}
• Tamanho: ${item.size}${customSize}
• Cor: ${formatColor(item.color)}
• Quantidade: ${item.quantity}
• Valor: ${value}`;
      })
      .join("\n\n");

    const totalText = `R$ ${total.toFixed(2).replace(".", ",")}`;

    const text = `Olá! 💛

Gostaria de fazer um pedido na Florisse:

${items}

──────────────
${
      hasCustomOrders
        ? `Subtotal dos itens com preço definido: ${totalText}

Alguns itens são personalizados e estão com valor sob consulta. O valor final será confirmado pela Florisse.`
        : `Total: ${totalText}`
    }

Gostaria de confirmar a disponibilidade e combinar a entrega. 😊`;

    window.open(
      WHATSAPP+`?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RemoveConfirmationModal
        confirmation={confirmationModal}
        onClose={closeConfirmationModal}
        onConfirm={confirmRemoval}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 md:py-14">
        <CartHeader totalItems={totalItems} />

        {!cart.length ? (
          <EmptyCart />
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">
              <span className="h-px w-8 bg-primary/40" />
              <span>Suas escolhas</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => {
                const product = getProductByName(item.name) ?? null;

                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    product={product}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    onRemove={openRemoveModal}
                    onUpdate={updateItem}
                  />
                );
              })}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              Pedidos com tamanho personalizado têm valor sob consulta. A Florisse confirma o preço final pelo WhatsApp antes da produção.
            </p>

            <CartSummary
              cart={cart}
              onClear={openClearCartModal}
              onFinish={finishOrder}
            />
          </>
        )}
      </div>
    </div>
  );
}
