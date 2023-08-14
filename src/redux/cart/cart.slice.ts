import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

import { ICartPizza } from '../../models/CartPizza';
import { ICartSliceState } from './types';

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBasket(state, { payload: item }: PayloadAction<ICartPizza>) {
      const findedItem = state.items.find(
        (o) =>
          o.id === item.id &&
          o.type === item.type &&
          o.size === item.size
      );
      if (findedItem) {
        findedItem.count += item.count;
      } else {
        state.items.push({
          ...item,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeFromBasket(state, { payload: item }: PayloadAction<ICartPizza>) {
      state.items = state.items.filter(
        ({ id, size, type }) => {
          return (
            id !== item.id ||
            size !== item.size ||
            type !== item.type
          );
        }
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeAllBasket(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, { payload: item }: PayloadAction<ICartPizza>) {
      const index = state.items.findIndex(
        ({ id, size, type }) =>
          id === item.id &&
          size === item.size &&
          type === item.type
      );
      if (index === -1) return;

      const card = state.items[index];
      card.count > 1
        ? (card.count -= 1)
        : state.items.splice(index, 1);

      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem(state, { payload: item }: PayloadAction<ICartPizza>) {
      const findedItem = state.items.find(
        ({ id, size, type }) =>
          id === item.id &&
          type === item.type &&
          size === item.size
      );
      if (findedItem) {
        findedItem.count += 1;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  removeAllBasket,
  minusItem,
  plusItem,
} = cartSlice.actions;



export default cartSlice.reducer;
