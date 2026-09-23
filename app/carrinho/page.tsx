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
   * Separa os itens do carrinho em:
   *
   * 1. Produtos normais, com preço e dimensões cadastradas.
   * 2. Pedidos personalizados, cujo preço será definido depois.
   */
  const regularItems = useMemo(
    () => cart.filter((item) => item.type === "product"),
    [cart],
  );

  const customItems = useMemo(
    () => cart.filter((item) => item.type === "custom-order"),
    [cart],
  );

  /*
   * Apenas os produtos normais participam do cálculo de frete.
   * Pedidos personalizados ficam fora porque suas dimensões/peso
   * definitivos ainda não foram definidos.
   */
  const freightPackages = useMemo<CartFreightPackage[]>(() => {
    return regularItems.flatMap((item) => {
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
  }, [regularItems]);

  const {
    total: freightTotal,
    loading: freightLoading,
    unavailable: freightUnavailable,
    hasCep,
    options: freightOptions,
    selectedServiceId,
    setSelectedServiceId,
  } = useCartFreight(freightPackages);

  /*
   * Verifica somente os produtos normais.
   *
   * Um pedido personalizado não pode causar "frete indisponível"
   * porque ele não possui dimensões definitivas cadastradas.
   */
  const hasProductWithoutFreightData = useMemo(
    () =>
      regularItems.some((item) => {
        const product = getProductByName(item.name);

        if (!product) {
          return true;
        }

        return !product.sizes.some((size) => size.label === item.size);
      }),
    [regularItems],
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

  function handleSetQuantity(item: CartItemType, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    updateQuantity(item.id, quantity);
  }

  function finishOrder() {
    if (!cart.length) {
      return;
    }

    /*
     * Apenas os produtos com preço definido entram no valor definitivo.
     */
    const regularSubtotal = regularItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const hasCustomOrders = customItems.length > 0;

    const selectedFreightOption =
      freightOptions.find((option) => option.id === selectedServiceId) ?? null;

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

        return `-> ${item.name}
• Tamanho: ${item.size}${customSize}
• Cor: ${formatColor(item.color)}
• Quantidade: ${item.quantity}
• Valor: ${value}`;
      })
      .join("\n\n");

    let freightText: string;
    let totalText: string;

    if (regularItems.length === 0) {
      /*
       * Carrinho somente com personalizados.
       */
      freightText =
        "Frete: será calculado/confirmado após a definição do pedido.";

      totalText = `Valor definitivo dos produtos: Sob consulta

${freightText}

Personalizados: Sob consulta.`;
    } else if (!hasCep) {
      freightText = "Frete: CEP não informado — calcular pelo WhatsApp.";

      totalText = `Valor dos produtos com preço definido: ${formatFreightPrice(
        regularSubtotal,
      )}

${freightText}`;

      if (hasCustomOrders) {
        totalText += `

Personalizados: Sob consulta.`;
      }
    } else if (freightLoading) {
      freightText = `Frete para ${formatStoredCep(cep)}: calculando...`;

      totalText = `Valor dos produtos com preço definido: ${formatFreightPrice(
        regularSubtotal,
      )}

${freightText}`;

      if (hasCustomOrders) {
        totalText += `

Personalizados: Sob consulta.`;
      }
    } else if (effectiveFreightUnavailable || !selectedFreightOption) {
      freightText = `Frete para ${formatStoredCep(
        cep,
      )}: indisponível no momento.`;

      totalText = `Valor dos produtos com preço definido: ${formatFreightPrice(
        regularSubtotal,
      )}

${freightText}`;

      if (hasCustomOrders) {
        totalText += `

Personalizados: Sob consulta.`;
      }

      totalText += `

Valor definitivo: a confirmar pelo WhatsApp.`;
    } else {
      const finalTotal = regularSubtotal + selectedFreightOption.price;

      freightText = `Frete (${selectedFreightOption.name}) para ${formatStoredCep(
        cep,
      )}: ${formatFreightPrice(selectedFreightOption.price)}`;

      totalText = `Valor dos produtos: ${formatFreightPrice(
        regularSubtotal,
      )}

${freightText}

Valor definitivo: ${formatFreightPrice(finalTotal)}`;

      if (hasCustomOrders) {
        totalText += `

+ Sob consulta para personalizado.`;
      }
    }

    const text = `Olá!

Gostaria de fazer um pedido na Florisse:

${items}

──────────────
${totalText}

Gostaria de confirmar a disponibilidade e combinar a entrega.`;

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
                    Os fretes{" "}
                    <span className="font-semibold">(estimativa)</span>{" "}
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
                    <span className="font-semibold">(estimativa)</span>{" "}
                    automaticamente.
                  </>
                )}
              </p>
            </div>

            {/* =========================================================
                PRODUTOS COM PREÇO DEFINIDO
            ========================================================== */}
            {regularItems.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/20 flex h-9 w-9 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">
                      {regularItems.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold">
                      Produtos
                    </h2>

                    <p className="text-muted text-xs">
                      Produtos com preço definido
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {regularItems.map((item) => {
                    const product = getProductByName(item.name) ?? null;

                    return (
                      <CartItem
                        key={item.id}
                        item={item}
                        product={product}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        onSetQuantity={handleSetQuantity}
                        onRemove={openRemoveModal}
                        onUpdate={updateItem}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* =========================================================
                PEDIDOS PERSONALIZADOS
            ========================================================== */}
            {customItems.length > 0 && (
              <section className="mt-10">
                <div className="border-primary/20 bg-primary/5 mb-5 rounded-[1.75rem] border p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <span className="text-lg">✦</span>
                    </div>

                    <div>
                      <h2 className="font-serif text-xl font-semibold">
                        Pedidos personalizados
                      </h2>

                      <p className="text-muted mt-1 text-sm leading-relaxed">
                        Estes itens foram feitos com medidas personalizadas.
                        O valor definitivo será confirmado pela Florisse antes
                        da produção.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {customItems.map((item) => {
                    const product = getProductByName(item.name) ?? null;

                    return (
                      <CartItem
                        key={item.id}
                        item={item}
                        product={product}
                        onDecrease={handleDecrease}
                        onIncrease={handleIncrease}
                        onSetQuantity={handleSetQuantity}
                        onRemove={openRemoveModal}
                        onUpdate={updateItem}
                      />
                    );
                  })}
                </div>
              </section>
            )}

            <CartSummary
              cart={cart}
              freightTotal={freightTotal}
              freightLoading={freightLoading}
              freightUnavailable={effectiveFreightUnavailable}
              hasCep={hasCep}
              freightOptions={freightOptions}
              selectedFreightServiceId={selectedServiceId}
              onSelectFreightService={setSelectedServiceId}
              onClear={openClearCartModal}
              onFinish={finishOrder}
            />
          </>
        )}
      </div>
    </div>
  );
}