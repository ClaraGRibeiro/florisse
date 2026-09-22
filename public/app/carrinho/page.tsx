"use client";

import { useMemo, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import RemoveConfirmationModal, {
  type Confirmation,
} from "@/components/cart/RemoveConfirmationModal";
import type { CartItemType } from "@/components/cart/types";

import { WHATSAPP } from "@/data/config";

import {
  formatFreightPrice,
  formatStoredCep,
  useCartFreight,
  useFreightCep,
  type CartFreightPackage,
} from "@/hooks/useFreight";

import { useCart } from "@/hooks/useCart";
import { getProductByName } from "@/lib/products";
import { formatColor } from "@/utils/format";

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

  /*
   * Monta os pacotes que podem ter frete calculado.
   *
   * Pedidos personalizados ficam fora daqui porque
   * ainda não possuem necessariamente dimensões/preço
   * definitivos.
   */
  const freightPackages = useMemo<CartFreightPackage[]>(() => {
    return cart.flatMap((item) => {
      if (item.type !== "product") {
        return [];
      }

      const product = getProductByName(item.name);

      if (!product) {
        return [];
      }

      const size = product.sizes.find(
        (productSize) => productSize.label === item.size,
      );

      if (!size) {
        return [];
      }

      return [
        {
          id: item.id,
          quantity: item.quantity,
          weight: size.peso,
          width: size.largura,
          length: size.comprimento,
          height: size.altura,
        },
      ];
    });
  }, [cart]);

  const {
    total: freightTotal,
    loading: freightLoading,
    unavailable: freightUnavailable,
    hasCep,
  } = useCartFreight(freightPackages);

  const hasProductWithoutFreightData = useMemo(
    () =>
      cart.some((item) => {
        if (item.type !== "product") {
          return false;
        }

        const product = getProductByName(item.name);

        if (!product) {
          return true;
        }

        return !product.sizes.some((size) => size.label === item.size);
      }),
    [cart],
  );

  const effectiveFreightUnavailable =
    freightUnavailable || hasProductWithoutFreightData;

  function openRemoveModal(itemId: string) {
    setConfirmationModal({
      type: "remove",
      itemId,
    });
  }

  function openClearCartModal() {
    if (!cart.length) {
      return;
    }

    setConfirmationModal({
      type: "clear",
    });
  }

  function closeConfirmationModal() {
    setConfirmationModal(null);
  }

  function confirmRemoval() {
    if (!confirmationModal) {
      return;
    }

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
    if (!cart.length) {
      return;
    }

    const subtotal = cart.reduce(
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

    let freightText: string;
    let totalText: string;

    if (!hasCep) {
      freightText = "Frete: CEP não informado — calcular pelo WhatsApp.";

      totalText = hasCustomOrders
        ? `Subtotal dos itens com preço definido: ${formatFreightPrice(
            subtotal,
          )}

Frete: a calcular.`
        : `Subtotal: ${formatFreightPrice(subtotal)}

Frete: a calcular.`;
    } else if (freightLoading) {
      freightText = `Frete para ${formatStoredCep(cep)}: calculando...`;

      totalText = `Subtotal: ${formatFreightPrice(subtotal)}

${freightText}

Total: a confirmar.`;
    } else if (effectiveFreightUnavailable) {
      freightText = `Frete para ${formatStoredCep(
        cep,
      )}: indisponível no momento.`;

      totalText = `Subtotal: ${formatFreightPrice(subtotal)}

${freightText}

Total: a confirmar pelo WhatsApp.`;
    } else {
      const finalTotal = subtotal + freightTotal;

      freightText = `Frete para ${formatStoredCep(cep)}: ${formatFreightPrice(
        freightTotal,
      )}`;

      totalText = hasCustomOrders
        ? `Subtotal dos itens com preço definido: ${formatFreightPrice(
            subtotal,
          )}

${freightText}

Total parcial com frete: ${formatFreightPrice(finalTotal)}

Os itens personalizados ainda terão o valor confirmado pela Florisse.`
        : `Subtotal: ${formatFreightPrice(subtotal)}

${freightText}

Total: ${formatFreightPrice(finalTotal)}`;
    }

    const text = `Olá! 💛

Gostaria de fazer um pedido na Florisse:

${items}

──────────────
${totalText}

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
                    Os fretes <span className="font-semibold">aproximados</span>{" "}
                    exibidos abaixo estão baseados no CEP salvo{" "}
                    <strong className="text-foreground">
                      {formatStoredCep(cep)}
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Defina seu CEP no botão de localização do cabeçalho para
                    calcular os fretes{" "}
                    <span className="font-semibold">aproximados</span>
                    automaticamente.
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
              freightTotal={freightTotal}
              freightLoading={freightLoading}
              freightUnavailable={effectiveFreightUnavailable}
              hasCep={hasCep}
              onClear={openClearCartModal}
              onFinish={finishOrder}
            />
          </>
        )}
      </div>
    </div>
  );
}
