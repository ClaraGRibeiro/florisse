

 export function getGradient(
    hex: string[],
  ) {
    if (hex.length === 1) {
      return hex[0];
    }

    if (hex.length === 2) {
      return `linear-gradient(135deg, ${hex[0]} 50%, ${hex[1]} 50%)`;
    }

    return `linear-gradient(
      135deg,
      ${hex[0]} 0%,
      ${hex[0]} 33%,
      ${hex[1]} 33%,
      ${hex[1]} 66%,
      ${hex[2]} 66%,
      ${hex[2]} 100%
    )`;
  }