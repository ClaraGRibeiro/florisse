"use client";


import type { CartItemType } from "@/components/cart/types";

type CartSummaryProps = {
  cart: CartItemType[];
  onClear: () => void;
  onFinish: () => void;
};

export default function CartSummary({
  cart,
  onClear,
  onFinish,
}: CartSummaryProps) {
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

  return (
    <div className="mt-8 rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Resumo do pedido
          </p>

          <h2 className="mt-1 font-serif text-3xl font-semibold text-primary">
            {hasCustomOrders && total === 0
              ? "Sob consulta"
              : `R$ ${total.toFixed(2).replace(".", ",")}`}
          </h2>

          {hasCustomOrders && (
            <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
              Subtotal dos itens com preço definido. Os itens personalizados serão confirmados pelo WhatsApp.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-destructive/5 hover:text-destructive"
          >
            Limpar Carrinho
          </button>

          <button
            type="button"
            onClick={onFinish}
            className="w-full cursor-pointer rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl sm:w-auto"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
