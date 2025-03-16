import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IFavoritesSliceState } from './types';
import { ICartPizza } from '../../models/CartPizza';

const initialState: IFavoritesSliceState = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToFavorites(
      state,
      { payload: item }: PayloadAction<ICartPizza>
    ) {
      state.items.push({
        ...item,
      });
    },
    removeFromFavorites(
      state,
      { payload: item }: PayloadAction<ICartPizza>
    ) {
      state.items = state.items.filter(
        ({ id, size, type }) => {
          return (
            id !== item.id ||
            size !== item.size ||
            type !== item.type
          );
        }
      );
    },
    removeAllFavorites(state) {
      state.items = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  removeAllFavorites,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
