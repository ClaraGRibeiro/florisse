import colorsData from "@/data/colors.json";

const colorMap = new Map(
  colorsData.map((color) => [color.name, color.hex]),
);

export function getColorHex(color: string): string[] {
  return color
    .split("-")
    .map((part) => colorMap.get(part) ?? "#000000");
}

export function getProductColors(
  product: { colors: { name: string }[] },
): Set<string> {
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
