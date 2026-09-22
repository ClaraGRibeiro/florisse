export interface ProductImage {
  url: string;
  alt: string;
}

export interface Productcolors {
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

  colors: Productcolors[];
  images: Record<string, ProductImage[]>;
  sizes: ProductSize[];
}

export type ReadyProduct = Product & {
  readyColor: string;
  readySize: string;
  readyPrice: number;
  readyQuantity: number;
};
