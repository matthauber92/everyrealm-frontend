import api from '../utils/api';
import {AxiosResponse, AxiosError} from "axios";
import {Burrito} from "../models/burrito.ts";
import {CreateOrderInput, Order} from "../models/orders.ts";

function getOrders(): Promise<AxiosResponse<Order[]>> {
  return api.get('api/orders', {
    withCredentials: true,
    headers: {
      'X-API-KEY': 'every-realm',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    }
  })
    .then((response: AxiosResponse<Order[]>) => response)
    .catch((error: AxiosError) => Promise.reject(error));
}

function getOrderById(id: string): Promise<AxiosResponse<Order>> {
  return api.get(`api/orders/${id}`, {
    withCredentials: true,
    headers: {
      'X-API-KEY': 'every-realm',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    }
  })
    .then((response: AxiosResponse<Order>) => response)
    .catch((error: AxiosError) => Promise.reject(error));
}

function createOrder(data: CreateOrderInput): Promise<AxiosResponse<Burrito[]>> {
  return api.post('api/orders', data, {
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Content-Type': 'application/json'
    }
  })
    .then((response: AxiosResponse<Burrito[]>) => response)
    .catch((error: AxiosError) => Promise.reject(error));
}

export {
  getOrders,
  createOrder,
  getOrderById
}