import {OrderItem} from "../models/orders.ts";

interface Burritos {
  key: string;
  quantity: number;
  price: number;
  total: number;
}

function getOrderTotal(items: OrderItem[]) {
  const allBurritos: Burritos[] = items.map((orderItem: OrderItem)=> {
    const { name, size, price } = orderItem.burrito;
    const key = `${name}-${size}`;
    return { key, quantity: orderItem.quantity, price, total: orderItem.quantity * price };
  });
  return allBurritos.reduce((sum, group) => sum + group.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export {
  getOrderTotal
}