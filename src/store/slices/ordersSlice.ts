import { createSlice } from '@reduxjs/toolkit';

import { Order } from '@/types';
import { RootState } from '@/app/store';
import {
  createOrder,
  deleteOrder,
  syncAllOrders,
  syncOrder,
  updateOrder,
} from '@/store/thunks/ordersThunks';

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  completeLoading: string[];
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  completeLoading: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncAllOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          state.orders = payload;
        } else {
          state.orders = [];
        }
      })
      .addCase(syncAllOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          state.orders.push(payload);
        }
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(syncOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          const i = state.orders.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.orders.splice(i, 1, payload);
          } else {
            state.orders.push(payload);
          }
        }
      })
      .addCase(syncOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          const i = state.orders.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.orders.splice(i, 1, payload);
          } else {
            state.orders.push(payload);
          }
        }
      })
      .addCase(updateOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.pending, (state, { meta }) => {
        const i = state.completeLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.completeLoading.push(meta.arg);
        }
      })
      .addCase(deleteOrder.fulfilled, (state, { meta, payload }) => {
        const i = state.completeLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.completeLoading.splice(i, 1);
        }

        if (payload) {
          const i = state.orders.findIndex((x) => x.id === payload);

          if (i >= 0) {
            state.orders.splice(i, 1);
          }
        }
      })
      .addCase(deleteOrder.rejected, (state, { meta }) => {
        const i = state.completeLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.completeLoading.splice(i, 1);
        }
      });
  },
});

export const ordersReducer = ordersSlice.reducer;

export const selectOrders = (store: RootState) => store.ordersReducer.orders;
export const selectIsLoading = (store: RootState) =>
  store.ordersReducer.isLoading;
export const selectCompleteLoading = (store: RootState) =>
  store.ordersReducer.completeLoading;
