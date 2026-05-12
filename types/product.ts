export interface ProductVariant {
  color: string;
  image: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  price: number;
  no_discount?: number;
}

export interface Product {
  name: string;
  slug: string;
  type: string;
  sales: number;

  variants: ProductVariant[];
  sizes: ProductSize[];
}