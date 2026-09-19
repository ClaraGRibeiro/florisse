export interface Productcolors {
  name: string;
  hex: string[];
}

export interface ProductSize {
  label: string;
  price: number;
  no_discount?: number;
  sales?: number;
}

export interface Product {
  total_sales?: number;
  name: string;
  category: string;

  colors: Productcolors[];
  images: Record<string, string[]>;
  sizes: ProductSize[];
}
export type ReadyProduct = Product & {
  readyColor: string;
  readySize: string;
  readyPrice: number;
  readyQuantity: number;
};
