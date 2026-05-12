export interface ProductVariant {
  color: string;
  image: string;
  hex: string[];
}

export interface ProductSize {
  label: string;
  price: number;
  no_discount?: number;
  sales: number;
}

export interface Product {
  total_sales: number;
  name: string;
  type: string;

  variants: ProductVariant[];
  sizes: ProductSize[];
}