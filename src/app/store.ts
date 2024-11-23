import { configureStore } from '@reduxjs/toolkit';

import { dishesReducer } from '@/store/slices/dishesSlice';
import { ordersReducer } from '@/store/slices/ordersSlice';
import { cartReducer } from '@/store/slices/cartSlice';

export const store = configureStore({
  reducer: { dishesReducer, ordersReducer, cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
