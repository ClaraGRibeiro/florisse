import { FaTimes } from "react-icons/fa";

import { Product } from "@/types/product";
import { Color } from "@/types/color";
import { getGradient } from "@/utils/gradient";

import ProductCustomColor from "./ProductCustomColor";

type ProductColorsProps = {
  product: Product;
  colors: Color[];

  selectedColor: number;
  isOtherColor: boolean;
  search: string;
  selectedOtherColors: string[];

  onColorChange: (index: number) => void;
  onToggleOtherColor: () => void;
  onSearchChange: (value: string) => void;
  onOtherColorToggle: (colorName: string) => void;
  onOtherColorRemove: (colorName: string) => void;
};

export default function ProductColors({
  product,
  colors,
  selectedColor,
  isOtherColor,
  search,
  selectedOtherColors,
  onColorChange,
  onToggleOtherColor,
  onSearchChange,
  onOtherColorToggle,
  onOtherColorRemove,
}: ProductColorsProps) {
  const currentColor = product.colors[selectedColor];

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Cor
          </p>

          <p className="text-foreground mt-1 text-sm">
            {isOtherColor ? "Personalize sua combinação" : currentColor?.name}
          </p>
        </div>

        {!isOtherColor && currentColor && (
          <span
            className="border-border h-7 w-7 shrink-0 rounded-full border shadow-sm"
            style={{
              background: getGradient(currentColor.hex),
            }}
            title={currentColor.name}
            aria-label={`Cor selecionada: ${currentColor.name}`}
          />
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {product.colors.map((color, index) => {
          const isSelected = !isOtherColor && selectedColor === index;

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onColorChange(index)}
              title={color.name}
              aria-label={`Selecionar cor ${color.name}`}
              aria-pressed={isSelected}
              className={`group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isSelected
                  ? "border-primary scale-110 shadow-md"
                  : "border-border hover:border-primary/50 hover:scale-105"
              }`}
            >
              <span
                className="h-8 w-8 rounded-full border border-black/5"
                style={{
                  background: getGradient(color.hex),
                }}
                aria-hidden="true"
              />

              {isSelected && (
                <span
                  className="ring-primary/20 ring-offset-background absolute inset-0 rounded-full ring-2 ring-offset-2"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onToggleOtherColor}
          aria-pressed={isOtherColor}
          className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border-2 px-4 text-sm font-medium transition-all duration-300 ${
            isOtherColor
              ? "border-primary bg-primary text-primary-foreground shadow-md"
              : "border-border bg-background text-foreground hover:border-primary/50 hover:text-primary"
          }`}
        >
          {isOtherColor ? (
            <>
              <FaTimes aria-hidden="true" className="text-xs" />
              Fechar
            </>
          ) : (
            <>
              <span aria-hidden="true" className="text-base">
                +
              </span>
              Outra
            </>
          )}
        </button>
      </div>

      {isOtherColor && (
        <ProductCustomColor
          colors={colors}
          search={search}
          selectedColors={selectedOtherColors}
          onSearchChange={onSearchChange}
          onColorToggle={onOtherColorToggle}
          onColorRemove={onOtherColorRemove}
        />
      )}
    </section>
  );
}
