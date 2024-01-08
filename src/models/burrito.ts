export type BurritoSize = 'REGULAR' | 'MEDIUM' | 'LARGE' | 'XL';

export interface Burrito {
  id: string
  name: string
  size: BurritoSize | string;
  price: number;
}