

export function getGradient(hex: string[]) {
  if (hex.length === 0) return "#000000";
  if (hex.length === 1) return hex[0];

  const step = 100 / hex.length;
  const stops = hex.map((color, i) =>
    `${color} ${(i * step).toFixed(2)}%, ${color} ${((i + 1) * step).toFixed(2)}%`
  );

  return `linear-gradient(135deg, ${stops.join(", ")})`;
}