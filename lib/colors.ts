import colorPaletteData from "@/data/color-palettes.json";
import colorsCombinationData from "@/data/colors-combination.json";
import colorsData from "@/data/colors.json";

import { Product } from "@/types/product";
import { formatCategory, formatPath } from "@/utils/format";

export interface Color {
  name: string;
  hex: string;
}

export interface Palette {
  category: string;
  colors: string[];
}

export interface ColorProduct {
  product: Product;
  color: string;
}

const colors = colorsData as Color[];
const palettes = colorPaletteData as Palette[];
const combinations = colorsCombinationData as Record<string, string[][]>;

const normalizeColor = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function getColorHex(color: string): string[] {
  const colorMap = new Map(colors.map((item) => [item.name, item.hex]));

  return color.split("-").map((part) => {
    const hex = colorMap.get(part);

    if (!hex) {
      console.warn(`Cor "${part}" não encontrada em colors.json.`);
    }

    return hex ?? "#000000";
  });
}

export function getProductColors(product: {
  colors: { name: string }[];
}): Set<string> {
  const colorSet = new Set<string>();

  product.colors.forEach((color) => {
    color.name
      .split(/[-/,+]/)
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean)
      .forEach((part) => colorSet.add(part));
  });

  return colorSet;
}

export function getColors(): Color[] {
  return colors;
}

export function getColorPalettes(): Palette[] {
  return palettes;
}

export function getColorCombinations(color: string): string[][] {
  return combinations[color] ?? [];
}

export function getProductsByColor(
  products: Product[],
  selectedColor: string,
): ColorProduct[] {
  const normalizedSelectedColor = normalizeColor(selectedColor);
  const selectedColorSlug = normalizedSelectedColor.replace(/\s+/g, "-");

  return products.flatMap((product) =>
    product.colors
      .filter((productColor) => {
        const normalizedProductColor = normalizeColor(productColor.name);

        if (normalizedProductColor === normalizedSelectedColor) {
          return true;
        }

        if (normalizedProductColor.includes(selectedColorSlug)) {
          return true;
        }

        return normalizedProductColor
          .split("-")
          .includes(normalizedSelectedColor);
      })
      .map((color) => ({
        product,
        color: color.name,
      })),
  );
}

export function getColorImage(product: Product, color: string): string {
  const productImages = product.images[color];

  if (productImages?.[0]?.url) {
    return productImages[0].url;
  }

  return `/products/${formatPath(formatCategory(product.category) ?? "null")}/${formatPath(
    product.name,
  )}/${color}.jpg`;
}

export function getProductStartingPrice(product: Product): string | null {
  const firstSize = product.sizes?.[0];

  if (!firstSize) {
    return null;
  }

  return firstSize.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getColorBySlug(slug: string): Color | undefined {
  return colors.find(
    (color) =>
      formatPath(color.name) === normalizeColor(slug).replace(/\s+/g, "-"),
  );
}
