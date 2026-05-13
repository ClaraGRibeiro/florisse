export interface Productcolors {
  color: string;
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
  category: string;

  colors: Productcolors[];
  sizes: ProductSize[];
}