import axios from 'axios';

import { Order, OrderBase } from '@/types';

const baseURL =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-72/';

const api = axios.create({ baseURL });

type Identifier = {
  name: string;
};

type OrderContainer = {
  [name: string]: OrderBase;
};

const readAllOrders = async (): Promise<Order[] | null> => {
  const endpoint = 'orders.json';

  const { data, status, statusText } = await api.get<OrderContainer>(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
};

const createOrder = async (dish: OrderBase) => {
  const endpoint = `orders.json`;

  const { data, status, statusText } = await api.post<Identifier>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data.name;
};

const readOrder = async (id: string): Promise<Order | null> => {
  const endpoint = `orders/${id}.json`;

  const { data, status, statusText } = await api.get<OrderBase | null>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && { ...data, id };
};

const updateOrder = async (id: string, dish: OrderBase): Promise<Order> => {
  const endpoint = `orders/${id}.json`;

  const { data, status, statusText } = await api.put<OrderBase>(endpoint, dish);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return { ...data, id };
};

const deleteOrder = async (id: string): Promise<void> => {
  const endpoint = `orders/${id}.json`;

  const { status, statusText } = await api.delete(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }
};

export default {
  readAllOrders,
  createOrder,
  readOrder,
  updateOrder,
  deleteOrder,
};
