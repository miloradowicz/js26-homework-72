import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '@/types';
import { RootState } from '@/app/store';

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [
    {
      id: '---',
      qty: 1,
    },
  ],
};

const cartSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<string>) => {
      const i = state.cart.findIndex((x) => x.id === payload);

      if (i >= 0) {
        state.cart[i].qty++;
      } else {
        state.cart.push({ id: payload, qty: 1 });
      }
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      const i = state.cart.findIndex((x) => x.id === payload);

      if (i >= 0) {
        if (state.cart[i].qty > 1) {
          state.cart[i].qty--;
        } else {
          state.cart.splice(i, 1);
        }
      }
    },
    emptyCart: (state) => {
      state.cart = initialState.cart;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addItem, removeItem, emptyCart } = cartSlice.actions;

export const selectCart = (store: RootState) => store.cartReducer.cart;
