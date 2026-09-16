import { FaCheck, FaShoppingBag } from "react-icons/fa";

type ProductActionsProps = {
  canAddToCart: boolean;
  added: boolean;
  onAddToCart: () => void;
};

export default function ProductActions({
  canAddToCart,
  added,
  onAddToCart,
}: ProductActionsProps) {
  const buttonClassName = added
    ? "bg-primary text-primary-foreground shadow-lg"
    : canAddToCart
      ? "bg-primary text-primary-foreground shadow-md hover:-translate-y-0.5 hover:shadow-lg"
      : "cursor-not-allowed bg-muted/40 text-muted";

  return (
    <div className="mt-8">
      <div className="rounded-[1.25rem] border border-border/70 bg-muted/10 px-4 py-4">
        <p className="text-sm leading-relaxed text-muted">
          Cada peça é feita à mão especialmente para você. As cores e medidas
          podem ser personalizadas conforme disponibilidade.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={!canAddToCart}
        className={`mt-4 cursor-pointer flex h-14 w-full items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition-all duration-300 ${buttonClassName}`}
      >
        {added ? (
          <>
            <FaCheck className="text-sm" />
            Adicionado ao carrinho
          </>
        ) : (
          <>
            <FaShoppingBag className="text-sm" />
            Adicionar ao carrinho
          </>
        )}
      </button>
    </div>
  );
}