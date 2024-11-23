import { createAsyncThunk } from '@reduxjs/toolkit';

import { Order, OrderBase } from '@/types';
import api from '@/orders-api';

export const syncAllOrders = createAsyncThunk(
  'orders/syncAll',
  api.readAllOrders
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (order: OrderBase) => {
    const id = await api.createOrder(order);
    return await api.readOrder(id);
  }
);

export const syncOrder = createAsyncThunk('orders/sync', api.readOrder);

export const updateOrder = createAsyncThunk(
  'orders/update',
  async ({
    id,
    order,
  }: {
    id: string;
    order: OrderBase;
  }): Promise<Order | null> => {
    void (await api.updateOrder(id, order));
    return await api.readOrder(id);
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (id: string) => {
    void (await api.deleteOrder(id));
    return (await api.readOrder(id)) ? null : id;
  }
);
