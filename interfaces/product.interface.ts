export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  price: number;
  gender: Genre;
  color: Color;
  sizes: Size[];
  category: Category[];
  stock: number;
}

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type Genre = 'men' | 'women' | 'unisex';
type Category = 't-shirt' | 'shirt' | 'jeans' | 'hoodie' | 'sweatpant' | 'shorts' | 'jacket';
type Color =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'black'
  | 'white'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'brown';
