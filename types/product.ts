export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductColor {
  name: string;
  hex: string[];
}

export interface ProductSize {
  label: string;
  price: number;
  noDiscount?: number;
  sales?: number;
}

export interface Product {
  totalSales?: number;
  name: string;
  category: string;

  colors: ProductColor[];
  images: Record<string, ProductImage[]>;
  sizes: ProductSize[];
}

export type ReadyProduct = Product & {
  readyColor: string;
  readySize: string;
  readyPrice: number;
  readyQuantity: number;
};
