"use client";

import type { CartItemType } from "@/components/cart/types";
import { formatFreightPrice } from "@/hooks/useFreight";

type CartSummaryProps = {
  cart: CartItemType[];
  freightTotal: number;
  freightLoading: boolean;
  freightUnavailable: boolean;
  hasCep: boolean;
  onClear: () => void;
  onFinish: () => void;
};

export default function CartSummary({
  cart,
  freightTotal,
  freightLoading,
  freightUnavailable,
  hasCep,
  onClear,
  onFinish,
}: CartSummaryProps) {
  const subtotal = cart.reduce(
    (acc, item) =>
      item.type === "product" ? acc + item.price * item.quantity : acc,
    0,
  );

  const hasCustomOrders = cart.some((item) => item.type === "custom-order");

  const canShowFinalTotal = hasCep && !freightLoading && !freightUnavailable && !hasCustomOrders;

  const finalTotal = subtotal + freightTotal;

  return (
    <div className="border-border/80 bg-card mt-8 rounded-[1.75rem] border p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">
            Resumo do pedido
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted">Subtotal</span>

              <span className="text-foreground font-medium">
                {!hasCustomOrders ? formatFreightPrice(subtotal) : "Sob consulta"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted">
                Frete <span className="font-semibold">aproximado</span>
              </span>
              {!hasCustomOrders ? (
                !hasCep ? (
                  <span className="text-muted text-right">Defina seu CEP</span>
                ) : freightLoading ? (
                  <span className="text-muted text-right">Calculando...</span>
                ) : freightUnavailable ? (
                  <span className="text-destructive text-right">
                    Indisponível
                  </span>
                ) : (
                  <span className="text-foreground font-medium">
                    {formatFreightPrice(freightTotal)}
                  </span>
                )
              ) : (
                "Sob consulta"
              )}
            </div>

            <div className="border-border/70 mt-3 border-t pt-4">
              <div className="flex items-end justify-between gap-4">
                <span className="text-muted text-sm font-medium">Total</span>

                {hasCustomOrders ? (
                  <div className="text-right">
                    <p className="text-primary font-serif text-2xl font-semibold">
                      {canShowFinalTotal
                        ? formatFreightPrice(finalTotal)
                        : "Sob consulta"}
                    </p>

                    <p className="text-muted mt-1 max-w-xs text-xs leading-relaxed">
                      Há itens personalizados que precisam de confirmação de
                      preço.
                    </p>
                  </div>
                ) : (
                  <p className="text-primary font-serif text-2xl font-semibold">
                    {canShowFinalTotal
                      ? formatFreightPrice(finalTotal)
                      : "Aguardando frete"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {hasCustomOrders && (
            <p className="text-muted mt-4 max-w-md text-xs leading-relaxed">
              Os itens personalizados serão confirmados pelo WhatsApp. O frete
              dos produtos com dimensões cadastradas já foi considerado acima.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClear}
            className="text-muted hover:bg-destructive/5 hover:text-destructive cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition"
          >
            Limpar Carrinho
          </button>

          <button
            type="button"
            onClick={onFinish}
            className="bg-primary text-primary-foreground hover:bg-primary-hover w-full cursor-pointer rounded-full px-7 py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
