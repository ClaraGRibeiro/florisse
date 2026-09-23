import { FaTimes } from "react-icons/fa";

import { Product } from "@/types/product";

type ProductSizesProps = {
  product: Product;

  selectedSize: number | null;

  isCustomSize: boolean;

  customLength: string;
  customWidth: string;

  onSizeChange: (index: number) => void;

  onCustomSizeClick: () => void;

  onCustomLengthChange: (value: string) => void;

  onCustomWidthChange: (value: string) => void;
};

export default function ProductSizes({
  product,
  selectedSize,
  isCustomSize,
  customLength,
  customWidth,
  onSizeChange,
  onCustomSizeClick,
  onCustomLengthChange,
  onCustomWidthChange,
}: ProductSizesProps) {
  const selectedSizeLabel =
    selectedSize !== null ? product.sizes[selectedSize]?.label : undefined;

  return (
    <section className="mt-8">
      <div>
        <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
          Tamanho
        </p>

        <p className="text-foreground mt-1 text-sm">
          {isCustomSize ? "Tamanho personalizado" : selectedSizeLabel}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {product.sizes.map((size, index) => {
          const isSelected = !isCustomSize && selectedSize === index;

          const hasKit = size.label.toUpperCase().includes("KIT");

          const economy =
            size.no_discount != null
              ? size.no_discount - size.price
              : null;

          return (
            <button
              key={`${size.label}-${index}`}
              type="button"
              onClick={() => onSizeChange(index)}
              aria-pressed={isSelected}
              className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-5 py-2.5 text-left text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              <span>{size.label}</span>

              {hasKit && economy !== null && (
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold tracking-wide ${
                    isSelected
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  -10%
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onCustomSizeClick}
          aria-pressed={isCustomSize}
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            isCustomSize
              ? "border-primary bg-primary text-primary-foreground shadow-md"
              : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
          }`}
        >
          {isCustomSize ? (
            <>
              <FaTimes aria-hidden="true" className="text-xs" />
              Fechar
            </>
          ) : (
            <>
              <span aria-hidden="true" className="text-base">
                +
              </span>
              Outro
            </>
          )}
        </button>
      </div>

      {isCustomSize && (
        <div className="border-border/70 bg-muted/10 mt-5 rounded-3xl border p-5">
          <div>
            <p className="text-foreground font-serif text-lg font-semibold">
              Escolha as medidas
            </p>

            <p className="text-muted mt-1 text-sm leading-relaxed">
              Informe o comprimento e a largura que você deseja para sua peça.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-muted mb-2 block text-xs font-semibold tracking-[0.12em] uppercase">
                Comprimento
              </span>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={customLength}
                  onChange={(event) =>
                    onCustomLengthChange(event.target.value)
                  }
                  placeholder="Ex.: 150"
                  aria-label="Comprimento em centímetros"
                  className="border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border px-4 pr-14 text-sm transition-all outline-none focus:ring-2"
                />

                <span className="text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium">
                  cm
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-muted mb-2 block text-xs font-semibold tracking-[0.12em] uppercase">
                Largura
              </span>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={customWidth}
                  onChange={(event) =>
                    onCustomWidthChange(event.target.value)
                  }
                  placeholder="Ex.: 60"
                  aria-label="Largura em centímetros"
                  className="border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-primary/10 h-12 w-full rounded-xl border px-4 pr-14 text-sm transition-all outline-none focus:ring-2"
                />

                <span className="text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium">
                  cm
                </span>
              </div>
            </label>
          </div>

          <div className="bg-primary/5 text-muted mt-5 rounded-xl px-4 py-3 text-xs leading-relaxed">
            O tamanho personalizado precisa ser combinado antes da compra. O
            valor exibido atualmente é apenas uma referência e o preço será
            negociado de acordo com as medidas escolhidas.
          </div>
        </div>
      )}
    </section>
  );
}