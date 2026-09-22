export interface ProductColors {
  name: string;
  hex: string[];
}

export interface ProductSize {
  label: string;
  price: number;
  no_discount?: number;
  sales?: number;
  peso: number;
  altura: number;
  comprimento: number;
  largura: number;
}

export interface Product {
  total_sales?: number;
  name: string;
  category: string;

  colors: ProductColors[];
  images: Record<string, string[]>;
  sizes: ProductSize[];
}

export type ReadyProduct = Product & {
  readyColor: string;
  readySize: string;
  readyPrice: number;
  readyPeso: number | null;
  readyQuantity: number;
};