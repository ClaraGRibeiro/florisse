import { FaCheck, FaShoppingBag } from "react-icons/fa";

type ProductActionsProps = {
  canAddToCart: boolean;
  added: boolean;
  isCustomSize: boolean;
  onAddToCart: () => void;
};

export default function ProductActions({
  canAddToCart,
  added,
  isCustomSize,
  onAddToCart,
}: ProductActionsProps) {
  const buttonClassName = added
    ? "bg-primary text-primary-foreground shadow-lg"
    : canAddToCart
      ? "bg-primary text-primary-foreground shadow-md hover:-translate-y-0.5 hover:shadow-lg"
      : "cursor-not-allowed bg-muted/40 text-muted";

  return (
    <div className="mt-8">
      <div className="border-border/70 bg-muted/10 rounded-[1.25rem] border px-4 py-4">
        <p className="text-muted text-sm leading-relaxed">
          Cada peça é feita à mão especialmente para você. As cores e medidas
          podem ser personalizadas conforme disponibilidade.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={!canAddToCart}
        aria-label={
          added
            ? isCustomSize
              ? "Pedido personalizado adicionado"
              : "Produto adicionado ao carrinho"
            : isCustomSize
              ? "Adicionar pedido personalizado ao carrinho"
              : "Adicionar produto ao carrinho"
        }
        className={`mt-4 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed ${buttonClassName}`}
      >
        {added ? (
          <>
            <FaCheck className="text-sm" />

            {isCustomSize ? "Pedido adicionado" : "Adicionado ao carrinho"}
          </>
        ) : (
          <>
            <FaShoppingBag className="text-sm" />

            {isCustomSize
              ? "Adicionar pedido personalizado"
              : "Adicionar ao carrinho"}
          </>
        )}
      </button>
    </div>
  );
}
