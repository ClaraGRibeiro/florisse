"use client";

import type { CartItemType } from "@/components/cart/types";

type CartSummaryProps = {
  cart: CartItemType[];
  onClear: () => void;
  onFinish: () => void;
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CartSummary({
  cart,
  onClear,
  onFinish,
}: CartSummaryProps) {
  const regularItems = cart.filter((item) => item.type === "product");
  const customItems = cart.filter((item) => item.type === "custom-order");

  const subtotal = regularItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalEconomy = regularItems.reduce((acc, item) => {
    if (
      item.no_discount == null ||
      !Number.isFinite(item.no_discount) ||
      item.no_discount <= item.price
    ) {
      return acc;
    }

    return acc + (item.no_discount - item.price) * item.quantity;
  }, 0);

  const hasCustomOrders = customItems.length > 0;
  const hasRegularItems = regularItems.length > 0;
  const hasEconomy = totalEconomy > 0;

  return (
    <div className="border-border/80 bg-card mt-10 rounded-[1.75rem] border p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.16em] uppercase">
            Resumo do pedido
          </p>

          <div className="mt-5 space-y-4">
            {hasRegularItems && (
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted">Produtos</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            )}

            {hasEconomy && (
              <div className="bg-primary/5 border-primary/10 flex items-center justify-between gap-4 rounded-xl border p-3 text-sm">
                <span className="text-foreground font-medium">
                  Economia com kits
                </span>
                <span className="text-primary font-semibold">
                  {formatCurrency(totalEconomy)}
                </span>
              </div>
            )}

            <div className="border-border/70 mt-4 border-t pt-4">
              <div className="flex items-end justify-between gap-4">
                <span className="text-muted text-sm font-medium">
                  Valor dos produtos
                </span>

                <p className="text-primary font-serif text-2xl font-semibold">
                  {hasRegularItems ? formatCurrency(subtotal) : "Sob consulta"}
                </p>
              </div>
            </div>

            {hasCustomOrders && (
              <div className="border-primary/15 bg-primary/5 mt-4 rounded-2xl border px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-foreground text-sm font-semibold">
                      Personalizado
                    </p>
                    <p className="text-muted mt-1 text-xs leading-relaxed">
                      O valor definitivo será confirmado pela Florisse pelo
                      WhatsApp, incluindo o frete.
                    </p>
                  </div>

                  <span className="text-primary shrink-0 text-sm font-semibold">
                    Sob consulta
                  </span>
                </div>
              </div>
            )}

            <div className="border-primary/10 bg-primary/5 mt-5 rounded-2xl border px-4 py-3">
              <p className="text-muted text-xs leading-relaxed">
                <span className="text-foreground font-semibold">
                  Frete e entrega:
                </span>{" "}
                não calculamos o frete no site. Ao finalizar, a Florisse
                confirmará pelo WhatsApp o valor do frete e os detalhes da
                entrega antes da confirmação do pedido.
              </p>
            </div>
          </div>
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
            Finalizar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
