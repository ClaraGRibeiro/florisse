import { Product } from "@/types/product";

type ProductSizesProps = {
  product: Product;

  selectedSize: number;

  isCustomSize: boolean;

  customLength: string;
  customWidth: string;

  onSizeChange: (
    index: number,
  ) => void;

  onCustomSizeClick: () => void;

  onCustomLengthChange: (
    value: string,
  ) => void;

  onCustomWidthChange: (
    value: string,
  ) => void;
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
    product.sizes[selectedSize]?.label;

  return (
    <section className="mt-8">
      {/* Título */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Tamanho
        </p>

        <p className="mt-1 text-sm text-foreground">
          {isCustomSize
            ? "Tamanho personalizado"
            : selectedSizeLabel}
        </p>
      </div>

      {/* Opções */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        {product.sizes.map(
          (size, index) => {
            const isSelected =
              !isCustomSize &&
              selectedSize === index;

            return (
              <button
                key={`${size.label}-${index}`}
                type="button"
                onClick={() =>
                  onSizeChange(index)
                }
                aria-pressed={
                  isSelected
                }
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {size.label}
              </button>
            );
          },
        )}

        {/* Outro */}
        <button
          type="button"
          onClick={
            onCustomSizeClick
          }
          aria-pressed={
            isCustomSize
          }
          className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            isCustomSize
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
          }`}
        >
          Outro
        </button>
      </div>

      {/* Tamanho personalizado */}
      {isCustomSize && (
        <div className="mt-5 rounded-3xl border border-border/70 bg-muted/10 p-5">
          <div>
            <p className="font-serif text-lg font-semibold text-foreground">
              Escolha as medidas
            </p>

            <p className="mt-1 text-sm leading-relaxed text-muted">
              Informe o comprimento e
              a largura que você deseja
              para sua peça.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Comprimento */}
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Comprimento
              </span>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={
                    customLength
                  }
                  onChange={(event) =>
                    onCustomLengthChange(
                      event.target.value,
                    )
                  }
                  placeholder="Ex.: 150"
                  aria-label="Comprimento em centímetros"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-14 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
                  cm
                </span>
              </div>
            </label>

            {/* Largura */}
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Largura
              </span>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={
                    customWidth
                  }
                  onChange={(event) =>
                    onCustomWidthChange(
                      event.target.value,
                    )
                  }
                  placeholder="Ex.: 60"
                  aria-label="Largura em centímetros"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-14 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
                  cm
                </span>
              </div>
            </label>
          </div>

          {/* Aviso */}
          <div className="mt-5 rounded-xl bg-primary/5 px-4 py-3 text-xs leading-relaxed text-muted">
            O tamanho personalizado
            precisa ser combinado antes
            da compra. O valor exibido
            atualmente é apenas uma
            referência e o preço será
            negociado de acordo com as
            medidas escolhidas.
          </div>
        </div>
      )}
    </section>
  );
}