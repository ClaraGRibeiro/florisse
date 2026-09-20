import { useCart } from "@/hooks/useCart";

import type { CartItemType } from "@/components/cart/types";
import { formatColor } from "@/utils/format";

type CartItemInfoProps = {
  item: CartItemType;
};

export default function CartItemInfo({ item }: CartItemInfoProps) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-serif text-xl font-semibold leading-tight tracking-tight">
          {item.name}
        </h2>

        <div className="mt-3 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Cor: {formatColor(item.color)}
          </p>

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Tamanho: {item.size}
            {item.customLength && item.customWidth && (
              <>
                {" "}({item.customLength} × {item.customWidth} cm)
              </>
            )}
          </p>
        </div>

        {item.type === "custom-order" && (
          <div className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Pedido personalizado · valor sob consulta
          </div>
        )}
      </div>

      <div className="text-right">
        {item.type === "custom-order" ? (
          <p className="font-serif text-xl font-semibold text-primary">
            Sob consulta
          </p>
        ) : (
          <>
            <p className="font-serif text-xl font-semibold text-primary">
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </p>

            {item.no_discount && (
              <p className="whitespace-nowrap text-sm font-medium text-muted line-through">
                R$ {(
                  item.no_discount * item.quantity
                ).toFixed(2).replace(".", ",")}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
