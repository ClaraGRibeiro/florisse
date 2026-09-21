import { Color } from "@/types/color";
import { Product } from "@/types/product";

import ProductActions from "./ProductActions";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";

import {
  FaHeart,
  FaPalette,
  FaRulerCombined,
  FaWhatsapp,
} from "react-icons/fa";

type ProductInfoProps = {
  product: Product;
  colors: Color[];

  selectedColor: number;
  isOtherColor: boolean;
  colorSearch: string;
  selectedOtherColors: string[];

  selectedSize: number | null;
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
  const currentSize =
    selectedSize !== null ? product.sizes[selectedSize] : undefined;

  return (
    <div className="flex flex-col">
      <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
        {product.category}
      </p>

      <h1 className="text-foreground mt-3 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        {product.name}
      </h1>

      <div className="mt-6">
        {isCustomSize ? (
          <>
            <p className="text-primary font-serif text-3xl font-semibold">
              Sob consulta
            </p>

            <p className="text-muted mt-1 text-sm leading-relaxed">
              O valor será confirmado de acordo com as medidas escolhidas.
            </p>
          </>
        ) : currentSize ? (
          <div className="flex items-end gap-3">
            <span className="text-primary font-serif text-3xl font-semibold">
              R$ {currentSize.price.toFixed(2)}
            </span>

            {currentSize.no_discount && (
              <span className="text-muted pb-1 text-sm line-through">
                R$ {currentSize.no_discount}
              </span>
            )}
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <FaHeart size={15} className="text-primary shrink-0" />

          <span className="text-foreground text-sm">Feito à mão</span>
        </div>

        <div className="flex items-center gap-3">
          <FaRulerCombined size={15} className="text-primary shrink-0" />

          <span className="text-foreground text-sm">
            Tamanhos à sua escolha
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaPalette size={15} className="text-primary shrink-0" />

          <span className="text-foreground text-sm">Cores personalizáveis</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 sm:col-span-2">
            <FaWhatsapp size={16} className="text-primary shrink-0" />

            <span className="text-foreground text-sm">
              Pedido confirmado pelo WhatsApp
            </span>
          </div>
        </div>
      </div>

      <div className="bg-border my-8 h-px w-full" />

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

      <ProductActions
        canAddToCart={canAddToCart}
        added={added}
        isCustomSize={isCustomSize}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
