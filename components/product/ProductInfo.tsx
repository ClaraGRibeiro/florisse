import { Product } from "@/types/product";
import { Color } from "@/types/color";

import ProductActions from "./ProductActions";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";

type ProductInfoProps = {
  product: Product;
  colors: Color[];

  selectedColor: number;
  isOtherColor: boolean;
  colorSearch: string;
  selectedOtherColors: string[];

  selectedSize: number;
  isCustomSize: boolean;
  customLength: string;
  customWidth: string;

  canAddToCart: boolean;
  added: boolean;

  onColorChange: (index: number) => void;
  onToggleOtherColor: () => void;
  onColorSearchChange: (value: string) => void;
  onOtherColorToggle: (colorName: string) => void;
  onOtherColorRemove: (colorName: string) => void;

  onSizeChange: (index: number) => void;
  onCustomSizeClick: () => void;
  onCustomLengthChange: (value: string) => void;
  onCustomWidthChange: (value: string) => void;

  onAddToCart: () => void;
};

export default function ProductInfo({
  product,
  colors,

  selectedColor,
  isOtherColor,
  colorSearch,
  selectedOtherColors,

  selectedSize,
  isCustomSize,
  customLength,
  customWidth,

  canAddToCart,
  added,

  onColorChange,
  onToggleOtherColor,
  onColorSearchChange,
  onOtherColorToggle,
  onOtherColorRemove,

  onSizeChange,
  onCustomSizeClick,
  onCustomLengthChange,
  onCustomWidthChange,

  onAddToCart,
}: ProductInfoProps) {
  const currentSize = product.sizes[selectedSize];

  if (!currentSize) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Categoria */}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {product.category}
      </p>

      {/* Nome */}
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
        {product.name}
      </h1>

      {/* Preço */}
      <div className="mt-6 flex items-end gap-3">
        <span className="font-serif text-3xl font-semibold text-primary">
          R$ {currentSize.price.toFixed(2)}
        </span>

        {currentSize.no_discount && (
          <span className="pb-1 text-sm text-muted line-through">
            R$ {currentSize.no_discount}
          </span>
        )}
      </div>

      {/* Divisor */}
      <div className="my-8 h-px w-full bg-border" />

      {/* Cores */}
      <ProductColors
        product={product}
        colors={colors}
        selectedColor={selectedColor}
        isOtherColor={isOtherColor}
        search={colorSearch}
        selectedOtherColors={selectedOtherColors}
        onColorChange={onColorChange}
        onToggleOtherColor={onToggleOtherColor}
        onSearchChange={onColorSearchChange}
        onOtherColorToggle={onOtherColorToggle}
        onOtherColorRemove={onOtherColorRemove}
      />

      {/* Tamanhos */}
      <ProductSizes
        product={product}
        selectedSize={selectedSize}
        isCustomSize={isCustomSize}
        customLength={customLength}
        customWidth={customWidth}
        onSizeChange={onSizeChange}
        onCustomSizeClick={onCustomSizeClick}
        onCustomLengthChange={onCustomLengthChange}
        onCustomWidthChange={onCustomWidthChange}
      />

      {/* Ações */}
      <ProductActions
        canAddToCart={canAddToCart}
        added={added}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}