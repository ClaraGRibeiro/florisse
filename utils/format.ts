export const formatPath = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export const formatColor = (color: string) =>
  color
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase(),
    )
    .join("/");