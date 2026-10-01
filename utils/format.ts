export const formatPath = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

export const formatColor = (color: string) =>
  color
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("/");

export const formatCategory = (category: string) => {
  if (category.toLowerCase() === "tapetes") return "rugs";

  if (category.toLowerCase() === "bolsas") return "bags";

  if (category.toLowerCase() === "mesa posta") return "tableware";

  return null;
};
