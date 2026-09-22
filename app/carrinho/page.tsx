"use client";

import { useState } from "react";
import type { CartItemType } from "@/components/cart/types";
import { useCart } from "@/hooks/useCart";
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
import { formatStoredCep, useFreightCep } from "@/hooks/useFreight";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Carrinho() {
  const {
    cart,
    clearCart,
    removeFromCart,
    updateQuantity,
    updateItem,
    totalItems,
  } = useCart();

  const { cep } = useFreightCep();

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

  function handleDecrease(item: CartItemType) {
    if (item.quantity <= 1) {
      openRemoveModal(item.id);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
  }

  function handleIncrease(item: CartItemType) {
    updateQuantity(item.id, item.quantity + 1);
  }

  function finishOrder() {
    if (!cart.length) return;

    const total = cart.reduce(
      (acc, item) =>
        item.type === "product" ? acc + item.price * item.quantity : acc,
      0,
    );

    const hasCustomOrders = cart.some((item) => item.type === "custom-order");

    const items = cart
      .map((item) => {
        const customSize =
          item.customLength && item.customWidth
            ? ` (${item.customLength} × ${item.customWidth} cm)`
            : "";

        const value =
          item.type === "custom-order"
            ? "Sob consulta"
            : `R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`;

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
      WHATSAPP + `?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
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
            <div className="text-muted mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] uppercase">
              <span className="bg-primary/40 h-px w-8" />
              <span>Suas escolhas</span>
            </div>

            <div className="border-primary/10 bg-primary/5 mb-5 flex items-center gap-3 rounded-2xl border px-4 py-3">
              <FaMapMarkerAlt className="text-primary shrink-0" size={14} />
              <p className="text-muted text-xs leading-5">
                {cep ? (
                  <>
                    Os fretes exibidos abaixo estão baseados no CEP salvo{" "}
                    <strong className="text-foreground">
                      {formatStoredCep(cep)}
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Defina seu CEP no botão de localização do cabeçalho para
                    calcular os fretes automaticamente.
                  </>
                )}
              </p>
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

            <p className="text-muted mt-4 text-sm leading-relaxed">
              Pedidos com tamanho personalizado têm valor sob consulta. A
              Florisse confirma o preço final pelo WhatsApp antes da produção.
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
