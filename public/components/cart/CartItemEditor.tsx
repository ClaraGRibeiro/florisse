"use client";

import { useMemo, useState } from "react";
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";

import colorsData from "@/data/colors.json";

import type { CartItemType } from "@/components/cart/types";
import type { Product } from "@/types/product";
import { formatColor } from "@/utils/format";
import { getGradient } from "@/utils/gradient";
import type { CartItemEditorValues } from "./types";

type ColorData = {
  name: string;
  hex: string;
};

type CartItemEditorProps = {
  item: CartItemType;
  product: Product;
  onClose: () => void;
  onSave: (values: CartItemEditorValues) => void | Promise<void>;
};

const colors: ColorData[] = colorsData;

export default function CartItemEditor({
  item,
  product,
  onClose,
  onSave,
}: CartItemEditorProps) {
  const registeredColorIndex = product.colors.findIndex(
    (color) => color.name === item.color,
  );

  const registeredSizeIndex = product.sizes.findIndex(
    (size) => size.label === item.size,
  );

  const [selectedColor, setSelectedColor] = useState<number | null>(
    registeredColorIndex >= 0 ? registeredColorIndex : null,
  );
  const [isOtherColor, setIsOtherColor] = useState(registeredColorIndex < 0);
  const [selectedOtherColors, setSelectedOtherColors] = useState<string[]>(
    registeredColorIndex < 0
      ? item.color
          .split("/")
          .map((color) => color.trim())
          .filter(Boolean)
      : [],
  );
  const [colorSearch, setColorSearch] = useState("");

  const [selectedSize, setSelectedSize] = useState<number | null>(
    registeredSizeIndex >= 0 ? registeredSizeIndex : null,
  );
  const [isCustomSize, setIsCustomSize] = useState(registeredSizeIndex < 0);
  const [customLength, setCustomLength] = useState(item.customLength ?? "");
  const [customWidth, setCustomWidth] = useState(item.customWidth ?? "");

  const filteredColors = useMemo(() => {
    const search = colorSearch.trim().toLowerCase();

    if (!search) return [];

    return colors.filter((color) =>
      formatColor(color.name).toLowerCase().includes(search),
    );
  }, [colorSearch]);

  function handleColorChange(index: number) {
    setSelectedColor(index);
    setIsOtherColor(false);
    setSelectedOtherColors([]);
    setColorSearch("");
  }

  function handleOtherColorClick() {
    setIsOtherColor(true);
    setSelectedColor(null);
    setColorSearch("");
  }

  function handleOtherColorChange(colorName: string) {
    setSelectedOtherColors((current) =>
      current.includes(colorName)
        ? current.filter((color) => color !== colorName)
        : [...current, colorName],
    );
    setColorSearch("");
  }

  function removeOtherColor(colorName: string) {
    setSelectedOtherColors((current) =>
      current.filter((color) => color !== colorName),
    );
  }

  function handleSizeChange(index: number) {
    setSelectedSize(index);
    setIsCustomSize(false);
    setCustomLength("");
    setCustomWidth("");
  }

  function handleCustomSizeClick() {
    setIsCustomSize(true);
    setSelectedSize(null);
  }

  function findColorImage(colorName: string, fallback: string) {
    return product.images[colorName]?.[0] ?? fallback;
  }
  async function handleSave() {
    let newColor = item.color;

    if (isOtherColor) {
      if (!selectedOtherColors.length) return;
      newColor = selectedOtherColors.join("/");
    } else if (selectedColor !== null && product.colors[selectedColor]) {
      newColor = product.colors[selectedColor].name;
    }

    let newSize = item.size;
    let newCustomLength: string | undefined;
    let newCustomWidth: string | undefined;

    if (isCustomSize) {
      if (!customLength || !customWidth) return;

      newSize = "Outro";
      newCustomLength = customLength;
      newCustomWidth = customWidth;
    } else if (selectedSize !== null && product.sizes[selectedSize]) {
      newSize = product.sizes[selectedSize].label;
    }

    let newPrice = item.price;
    let newNoDiscount = item.no_discount;

    if (isCustomSize) {
      newPrice = 0;
      newNoDiscount = undefined;
    } else if (selectedSize !== null) {
      const size = product.sizes[selectedSize];
      newPrice = size.price;
      newNoDiscount = size.no_discount;
    }

    let newImage = item.image;

    if (
      !isOtherColor &&
      selectedColor !== null &&
      product.colors[selectedColor]
    ) {
      const colorName = product.colors[selectedColor].name;
      newImage = await findColorImage(colorName, item.image);
    }

    await onSave({
      type: isCustomSize ? "custom-order" : "product",
      color: newColor,
      size: newSize,
      customLength: newCustomLength,
      customWidth: newCustomWidth,
      price: newPrice,
      no_discount: newNoDiscount,
      image: newImage,
    });
  }

  return (
    <div className="border-border/70 bg-muted/10 mt-7 rounded-3xl border p-5 sm:p-6">
      <div>
        <p className="text-muted mb-3 text-xs font-semibold tracking-[0.14em] uppercase">
          Cor da peça:
        </p>

        <div className="flex flex-wrap gap-2">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              onClick={() => handleColorChange(index)}
              className={`focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                !isOtherColor && selectedColor === index
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              <span
                className="h-5 w-5 shrink-0 rounded-full border border-white"
                style={{ background: getGradient(color.hex) }}
              />
              {formatColor(color.name)}
            </button>
          ))}

          <button
            type="button"
            onClick={handleOtherColorClick}
            className={`focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isOtherColor
                ? "border-primary bg-primary text-white shadow-md"
                : "border-border bg-background hover:border-primary/40"
            }`}
          >
            <span
              className="h-5 w-5 shrink-0 rounded-full border border-white shadow-sm"
              style={{
                background:
                  "conic-gradient(#f59e0b 0deg 72deg, #ef4444 72deg 144deg, #a855f7 144deg 216deg, #3b82f6 216deg 288deg, #22c55e 288deg 360deg)",
              }}
            />
            {selectedOtherColors.length
              ? `Outra (${selectedOtherColors.length})`
              : "Outra"}
          </button>
        </div>

        {isOtherColor && (
          <div className="relative mt-3 w-full max-w-md">
            <div className="border-border bg-background focus-within:border-primary flex items-center gap-2 rounded-2xl border px-4 py-3 transition">
              <FaSearch size={13} className="text-muted shrink-0" />

              <input
                type="text"
                value={colorSearch}
                onChange={(event) => setColorSearch(event.target.value)}
                placeholder="Digite uma cor..."
                className="placeholder:text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
              />

              {colorSearch && (
                <button
                  type="button"
                  onClick={() => setColorSearch("")}
                  aria-label="Limpar busca"
                  className="text-muted hover:text-foreground cursor-pointer transition"
                >
                  <FaTimes size={13} />
                </button>
              )}
            </div>

            {colorSearch.trim() !== "" && (
              <div className="border-border bg-background absolute top-full right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border p-2 shadow-xl">
                {filteredColors.length > 0 ? (
                  filteredColors.map((color) => {
                    const isSelected = selectedOtherColors.includes(color.name);

                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleOtherColorChange(color.name)}
                        className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                          isSelected
                            ? "bg-primary text-white"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        <span
                          className="border-border h-6 w-6 shrink-0 rounded-full border"
                          style={{ background: color.hex }}
                        />

                        <span className="flex-1">
                          {formatColor(color.name)}
                        </span>

                        {isSelected && <FaCheck size={12} />}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-muted px-3 py-3 text-sm">
                    Nenhuma cor encontrada.
                  </p>
                )}
              </div>
            )}

            {selectedOtherColors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedOtherColors.map((colorName) => {
                  const color = colors.find((item) => item.name === colorName);

                  if (!color) return null;

                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => removeOtherColor(colorName)}
                      className="bg-primary/10 text-primary hover:bg-primary/20 flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs transition"
                      title="Remover cor"
                    >
                      <span
                        className="border-border h-4 w-4 rounded-full border"
                        style={{ background: color.hex }}
                      />
                      {formatColor(colorName)}
                      <FaTimes size={9} />
                    </button>
                  );
                })}
              </div>
            )}

            <p className="text-muted mt-2 text-xs">
              A quantidade de cores pode variar conforme o modelo.
            </p>

            <div className="border-primary/15 bg-primary/5 mt-3 flex items-start gap-3 rounded-2xl border px-4 py-3.5">
              <div className="text-primary mt-0.5 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86l-8.1 14a2 2 0 001.73 2.64h16.16a2 2 0 001.73-2.64l-8.1-14a2 2 0 00-3.42 0z"
                  />
                </svg>
              </div>

              <p className="text-muted text-xs leading-relaxed">
                <span className="text-foreground font-semibold">
                  A imagem é ilustrativa.
                </span>{" "}
                A peça será produzida nas cores escolhidas.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-7">
        <p className="text-muted mb-3 text-xs font-semibold tracking-[0.14em] uppercase">
          Tamanho da peça:
        </p>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, index) => (
            <button
              key={size.label}
              type="button"
              onClick={() => handleSizeChange(index)}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${
                !isCustomSize && selectedSize === index
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              <span>{size.label}</span>
              {size.no_discount && (
                <span
                  className={
                    !isCustomSize && selectedSize === index
                      ? "text-[10px] font-bold text-white/80"
                      : "text-[10px] font-bold text-red-500"
                  }
                >
                  -10%
                </span>
              )}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCustomSizeClick}
            className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-all ${
              isCustomSize
                ? "border-primary bg-primary text-white shadow-md"
                : "border-border bg-background hover:border-primary/40"
            }`}
          >
            Outro
          </button>
        </div>

        {isCustomSize && (
          <div className="mt-3 w-full max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={`custom-length-${item.id}`}
                  className="text-muted mb-2 block text-xs font-medium"
                >
                  Comprimento
                </label>

                <div className="border-border bg-background focus-within:border-primary flex items-center rounded-2xl border px-4 py-3 transition">
                  <input
                    id={`custom-length-${item.id}`}
                    type="number"
                    min="1"
                    step="0.1"
                    value={customLength}
                    onChange={(event) => setCustomLength(event.target.value)}
                    placeholder="Ex.: 150"
                    className="placeholder:text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                  <span className="text-muted ml-2 text-xs">cm</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`custom-width-${item.id}`}
                  className="text-muted mb-2 block text-xs font-medium"
                >
                  Largura
                </label>

                <div className="border-border bg-background focus-within:border-primary flex items-center rounded-2xl border px-4 py-3 transition">
                  <input
                    id={`custom-width-${item.id}`}
                    type="number"
                    min="1"
                    step="0.1"
                    value={customWidth}
                    onChange={(event) => setCustomWidth(event.target.value)}
                    placeholder="Ex.: 200"
                    className="placeholder:text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                  <span className="text-muted ml-2 text-xs">cm</span>
                </div>
              </div>
            </div>

            <p className="text-muted mt-2 text-xs">
              O valor para tamanho personalizado será negociado.
            </p>
          </div>
        )}
      </div>

      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={
            (!isOtherColor && selectedColor === null) ||
            (isOtherColor && selectedOtherColors.length === 0) ||
            (isCustomSize && (!customLength || !customWidth)) ||
            (!isCustomSize && selectedSize === null)
          }
          className="bg-primary text-primary-foreground hover:bg-primary-hover cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
