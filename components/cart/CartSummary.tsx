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
  /*
   * Somente produtos normais entram no subtotal.
   * Produtos personalizados têm preço 0 no carrinho e são
   * classificados como "custom-order".
   */
  const regularItems = cart.filter((item) => item.type === "product");

  const customItems = cart.filter((item) => item.type === "custom-order");

  const subtotal = regularItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const hasCustomOrders = customItems.length > 0;
  const hasRegularItems = regularItems.length > 0;

  const canShowFinalTotal =
    hasRegularItems &&
    hasCep &&
    !freightLoading &&
    !freightUnavailable &&
    freightTotal >= 0;

  const finalTotal = subtotal + freightTotal;

  return (
    <div className="border-border/80 bg-card mt-10 rounded-[1.75rem] border p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">
            Resumo do pedido
          </p>

          {/* =========================================================
              ESCOLHA DO FRETE
          ========================================================== */}
          {hasRegularItems &&
            hasCep &&
            !freightLoading &&
            freightOptions.length > 0 && (
              <div className="border-border/70 bg-background mt-5 rounded-2xl border p-4">
                <div className="flex items-center gap-2">
                  <FaTruck className="text-primary shrink-0" size={14} />

                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Escolha o serviço de transporte
                    </p>

                    <p className="text-muted mt-0.5 text-xs leading-relaxed">
                      O valor abaixo é calculado para os produtos com
                      dimensões definidas.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {freightOptions.map((option) => {
                    const selected =
                      option.id === selectedFreightServiceId;

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

          {/* =========================================================
              VALORES
          ========================================================== */}
          <div className="mt-5 space-y-3">
            {/* Produtos normais */}
            {hasRegularItems && (
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted">Produtos</span>

                <span className="text-foreground font-medium">
                  {formatFreightPrice(subtotal)}
                </span>
              </div>
            )}

            {/* Frete */}
            {hasRegularItems && (
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted">
                  Frete{" "}
                  <span className="font-semibold">aproximado</span>
                </span>

                {!hasCep ? (
                  <span className="text-muted text-right">
                    Defina seu CEP
                  </span>
                ) : freightLoading ? (
                  <span className="text-muted text-right">
                    Calculando...
                  </span>
                ) : freightUnavailable ? (
                  <span className="text-destructive text-right">
                    Indisponível
                  </span>
                ) : (
                  <span className="text-foreground font-medium">
                    {formatFreightPrice(freightTotal)}
                  </span>
                )}
              </div>
            )}

            {/* Separador */}
            <div className="border-border/70 mt-4 border-t pt-4">
              <div className="flex items-end justify-between gap-4">
                <span className="text-muted text-sm font-medium">
                  Valor definitivo
                </span>

                <div className="text-right">
                  {canShowFinalTotal ? (
                    <p className="text-primary font-serif text-2xl font-semibold">
                      {formatFreightPrice(finalTotal)}
                    </p>
                  ) : hasRegularItems ? (
                    <p className="text-primary font-serif text-xl font-semibold">
                      Aguardando frete
                    </p>
                  ) : (
                    <p className="text-primary font-serif text-xl font-semibold">
                      —
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                PERSONALIZADOS
            ========================================================== */}
            {hasCustomOrders && (
              <div className="border-primary/15 bg-primary/5 mt-4 rounded-2xl border px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Personalizado
                    </p>

                    <p className="text-muted mt-1 text-xs leading-relaxed">
                      O valor definitivo será confirmado pela Florisse.
                    </p>
                  </div>

                  <span className="text-primary shrink-0 text-sm font-semibold">
                    Sob consulta
                  </span>
                </div>
              </div>
            )}

            {/* =========================================================
                LEITURA RESUMIDA DO TOTAL
            ========================================================== */}
            {hasCustomOrders && canShowFinalTotal && (
              <div className="mt-3 text-right">
                <p className="text-muted text-xs leading-relaxed">
                  <span className="text-foreground font-semibold">
                    {formatFreightPrice(finalTotal)}
                  </span>{" "}
                  + sob consulta para personalizado
                </p>
              </div>
            )}
          </div>

          {hasCustomOrders && (
            <div className="border-primary/10 bg-primary/5 mt-5 rounded-2xl border px-4 py-3">
              <p className="text-muted text-xs leading-relaxed">
                <span className="text-foreground font-semibold">
                  Como funciona?
                </span>{" "}
                Os produtos normais já possuem valor definido e aparecem no
                valor definitivo acima. Os itens personalizados serão
                analisados separadamente e terão o preço confirmado pelo
                WhatsApp antes da produção.
              </p>
            </div>
          )}
        </div>

        {/* =========================================================
            AÇÕES
        ========================================================== */}
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
            Finalizar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}