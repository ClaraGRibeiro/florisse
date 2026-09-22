"use client";

import type { CartItemType } from "@/components/cart/types";
import {
  formatFreightPrice,
  type CartFreightOption,
} from "@/hooks/useFreight";
import { FaTruck } from "react-icons/fa";

type CartSummaryProps = {
  cart: CartItemType[];
  freightTotal: number;
  freightLoading: boolean;
  freightUnavailable: boolean;
  hasCep: boolean;
  freightOptions: CartFreightOption[];
  selectedFreightServiceId: string | null;
  onSelectFreightService: (serviceId: string) => void;
  onClear: () => void;
  onFinish: () => void;
};

export default function CartSummary({
  cart,
  freightTotal,
  freightLoading,
  freightUnavailable,
  hasCep,
  freightOptions,
  selectedFreightServiceId,
  onSelectFreightService,
  onClear,
  onFinish,
}: CartSummaryProps) {
  const subtotal = cart.reduce(
    (acc, item) =>
      item.type === "product" ? acc + item.price * item.quantity : acc,
    0,
  );

  const hasCustomOrders = cart.some((item) => item.type === "custom-order");

  const canShowFinalTotal =
    hasCep &&
    !freightLoading &&
    !freightUnavailable &&
    freightTotal >= 0 &&
    !hasCustomOrders;

  const finalTotal = subtotal + freightTotal;

  return (
    <div className="border-border/80 bg-card mt-8 rounded-[1.75rem] border p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">
            Resumo do pedido
          </p>

          {hasCep && !freightLoading && freightOptions.length > 0 && (
            <div className="border-border/70 bg-background mt-5 rounded-2xl border p-4">
              <div className="flex items-center gap-2">
                <FaTruck className="text-primary shrink-0" size={14} />

                <div>
                  <p className="text-foreground text-sm font-semibold">
                    Escolha o serviço de transporte
                  </p>

                  <p className="text-muted mt-0.5 text-xs leading-relaxed">
                    O valor abaixo é calculado para todo o carrinho.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {freightOptions.map((option) => {
                  const selected = option.id === selectedFreightServiceId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onSelectFreightService(option.id)}
                      aria-pressed={selected}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                        selected
                          ? "border-primary bg-primary/5 ring-primary/20 ring-2"
                          : "border-border hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="text-foreground block text-sm font-semibold">
                          {option.name}
                        </span>

                        {option.deadline && (
                          <span className="text-muted mt-0.5 block text-xs">
                            Prazo: {option.deadline}
                          </span>
                        )}
                      </span>

                      <span className="text-foreground shrink-0 text-sm font-semibold">
                        {formatFreightPrice(option.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-muted">Subtotal</span>

              <span className="text-foreground font-medium">
                {!hasCustomOrders
                  ? formatFreightPrice(subtotal)
                  : "Sob consulta"}
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
