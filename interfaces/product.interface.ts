export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  gender: Gender;
  isNewCollection: boolean;
  sizes: Size[];
  category: Category;
  stock: number;
}

export type Category = (typeof CATEGORIES)[number];
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
export type Gender = 'Hombre' | 'Mujer' | 'Unisex';
