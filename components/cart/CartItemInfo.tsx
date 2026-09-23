import type { CartItemType } from "@/components/cart/types";
import { formatColor } from "@/utils/format";

type CartItemInfoProps = {
  item: CartItemType;
};

export default function CartItemInfo({ item }: CartItemInfoProps) {
  const subtotal = item.price * item.quantity;

  const economy =
    item.type === "product" && item.no_discount != null
      ? (item.no_discount - item.price) * item.quantity
      : 0;

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-serif text-xl leading-tight font-semibold tracking-tight">
          {item.name}
        </h2>

        <div className="mt-3 space-y-1.5">
          <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Cor: {formatColor(item.color)}
          </p>

          <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Tamanho: {item.size}
            {item.customLength && item.customWidth && (
              <>
                {" "}
                ({item.customLength} × {item.customWidth} cm)
              </>
            )}
          </p>
        </div>

        {item.type === "custom-order" && (
          <div className="bg-primary/10 text-primary mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold">
            Pedido personalizado · valor sob consulta
          </div>
        )}

        {economy > 0 && (
          <div className="bg-primary/5 text-primary mt-3 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold">
            Economia: R$ {economy.toFixed(2).replace(".", ",")}
          </div>
        )}
      </div>

      <div className="text-right">
        {item.type === "custom-order" ? (
          <p className="text-primary font-serif text-xl font-semibold">
            Sob consulta
          </p>
        ) : (
          <>
            <p className="text-primary font-serif text-xl font-semibold">
              R$ {subtotal.toFixed(2).replace(".", ",")}
            </p>

            {item.no_discount != null && item.no_discount > item.price && (
              <p className="text-muted text-sm font-medium whitespace-nowrap line-through">
                R${" "}
                {(item.no_discount * item.quantity)
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
