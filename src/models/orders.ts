import {Burrito} from "./burrito.ts";

export interface Order {
  id: string;
  totalCost: number;
  orderItems: OrderItem[]
}

export interface OrderItem {
  id?: string;
  quantity: number;
  options?: string[];
  burrito: Burrito;
  order?: Order;
}

export interface CreateOrderInput {
  totalCost: number;
  orderItems: OrderItem[]
}