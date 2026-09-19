import { Product } from "@/types/product";
import { Color } from "@/types/color";

import ProductActions from "./ProductActions";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";

import {
  FaHeart,
  FaRulerCombined,
  FaPalette,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { CITY } from "@/data/config";

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
    selectedSize !== null
      ? product.sizes[selectedSize]
      : undefined;

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
      <div className="mt-6">
        {isCustomSize ? (
          <>
            <p className="font-serif text-3xl font-semibold text-primary">
              Sob consulta
            </p>

            <p className="mt-1 text-sm leading-relaxed text-muted">
              O valor será confirmado de acordo com as medidas escolhidas.
            </p>
          </>
        ) : currentSize ? (
          <div className="flex items-end gap-3">
            <span className="font-serif text-3xl font-semibold text-primary">
              R$ {currentSize.price.toFixed(2)}
            </span>

            {currentSize.no_discount && (
              <span className="pb-1 text-sm text-muted line-through">
                R$ {currentSize.no_discount}
              </span>
            )}
          </div>
        ) : null}
      </div>

      {/* Informações da peça */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <FaHeart
            size={15}
            className="shrink-0 text-primary"
          />

          <span className="text-sm text-foreground">
            Feito à mão
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaRulerCombined
            size={15}
            className="shrink-0 text-primary"
          />

          <span className="text-sm text-foreground">
            Tamanhos à sua escolha
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaPalette
            size={15}
            className="shrink-0 text-primary"
          />

          <span className="text-sm text-foreground">
            Cores personalizáveis
          </span>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt
            size={15}
            className="shrink-0 text-primary"
          />

          <span className="text-sm text-foreground">
            Produzido em {CITY}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:col-span-2">
          <FaWhatsapp
            size={16}
            className="shrink-0 text-primary"
          />

          <span className="text-sm text-foreground">
            Pedido confirmado pelo WhatsApp
          </span>
        </div>
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
        isCustomSize={isCustomSize}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}