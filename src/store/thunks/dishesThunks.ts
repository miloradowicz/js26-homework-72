import { createAsyncThunk } from '@reduxjs/toolkit';

import { Dish, DishBase } from '@/types';
import api from '@/dishes-api';

export const syncAllDishes = createAsyncThunk(
  'dishes/syncAll',
  api.readAllDishes
);

export const createDish = createAsyncThunk(
  'dishes/create',
  async (dish: DishBase) => {
    const id = await api.createDish(dish);
    return await api.readDish(id);
  }
);

export const syncDish = createAsyncThunk('dishes/sync', api.readDish);

export const updateDish = createAsyncThunk(
  'dishes/update',
  async ({
    id,
    dish,
  }: {
    id: string;
    dish: DishBase;
  }): Promise<Dish | null> => {
    void (await api.updateDish(id, dish));
    return await api.readDish(id);
  }
);

export const deleteDish = createAsyncThunk(
  'dishes/delete',
  async (id: string) => {
    void (await api.deleteDish(id));
    return (await api.readDish(id)) ? null : id;
  }
);
