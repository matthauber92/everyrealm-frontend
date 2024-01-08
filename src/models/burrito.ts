import {OrderItem} from "./orders.ts";

type BurritoSize = 'REGULAR' | 'MEDIUM' | 'LARGE' | 'XL';

export interface Burrito {
  id: string
  name: string
  size: BurritoSize;
  price: number;
  orderItems: OrderItem[]
}