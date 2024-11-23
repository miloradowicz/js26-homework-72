import { createSlice } from '@reduxjs/toolkit';

import { Dish } from '@/types';
import { RootState } from '@/app/store';
import {
  createDish,
  deleteDish,
  syncAllDishes,
  syncDish,
  updateDish,
} from '@/store/thunks/dishesThunks';

interface DishesState {
  dishes: Dish[];
  isLoading: boolean;
  deleteLoading: string[];
}

const initialState: DishesState = {
  dishes: [],
  isLoading: false,
  deleteLoading: [],
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncAllDishes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncAllDishes.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          state.dishes = payload;
        } else {
          state.dishes = [];
        }
      })
      .addCase(syncAllDishes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDish.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          state.dishes.push(payload);
        }
      })
      .addCase(createDish.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(syncDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncDish.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          const i = state.dishes.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.dishes.splice(i, 1, payload);
          } else {
            state.dishes.push(payload);
          }
        }
      })
      .addCase(syncDish.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateDish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDish.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        if (payload) {
          const i = state.dishes.findIndex((x) => x.id === payload.id);

          if (i >= 0) {
            state.dishes.splice(i, 1, payload);
          } else {
            state.dishes.push(payload);
          }
        }
      })
      .addCase(updateDish.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteDish.pending, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i < 0) {
          state.deleteLoading.push(meta.arg);
        }
      })
      .addCase(deleteDish.fulfilled, (state, { meta, payload }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }

        if (payload) {
          const i = state.dishes.findIndex((x) => x.id === payload);

          if (i >= 0) {
            state.dishes.splice(i, 1);
          }
        }
      })
      .addCase(deleteDish.rejected, (state, { meta }) => {
        const i = state.deleteLoading.findIndex((x) => x === meta.arg);

        if (i >= 0) {
          state.deleteLoading.splice(i, 1);
        }
      });
  },
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (store: RootState) => store.dishesReducer.dishes;
export const selectIsLoading = (store: RootState) =>
  store.dishesReducer.isLoading;
export const selectDeleteLoading = (store: RootState) =>
  store.dishesReducer.deleteLoading;
