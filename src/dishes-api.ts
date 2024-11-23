import axios from 'axios';

import { Dish, DishBase } from '@/types';

const baseURL =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/hw-72/';

const api = axios.create({ baseURL });

type Identifier = {
  name: string;
};

type DishContainer = {
  [name: string]: DishBase;
};

const readAllDishes = async (): Promise<Dish[] | null> => {
  const endpoint = 'dishes.json';

  const { data, status, statusText } = await api.get<DishContainer>(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
};

const createDish = async (dish: DishBase) => {
  const endpoint = `dishes.json`;

  const { data, status, statusText } = await api.post<Identifier>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data.name;
};

const readDish = async (id: string): Promise<Dish | null> => {
  const endpoint = `dishes/${id}.json`;

  const { data, status, statusText } = await api.get<DishBase | null>(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && { ...data, id };
};

const updateDish = async (id: string, dish: DishBase): Promise<Dish> => {
  const endpoint = `dishes/${id}.json`;

  const { data, status, statusText } = await api.put<DishBase>(endpoint, dish);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return { ...data, id };
};

const deleteDish = async (id: string): Promise<void> => {
  const endpoint = `dishes/${id}.json`;

  const { status, statusText } = await api.delete(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }
};

export default {
  readAllDishes,
  createDish,
  readDish,
  updateDish,
  deleteDish,
};
