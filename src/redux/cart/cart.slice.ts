import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

import { ICartPizza } from '../../models/CartPizza';
import { ICartSliceState } from './types';

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
  pushedItem: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToBasket(
      state,
      { payload: item }: PayloadAction<ICartPizza>
    ) {
      const findedItem = state.items.find(
        (o) =>
          o.id === item.id &&
          o.type === item.type &&
          o.size === item.size
      );
      const findedPushedItem = state.pushedItem?.find(
        (o) => o.id === item.id && o.size === item.size
      );

      if (findedItem) {
        findedItem.count = Math.min(
          findedItem.count + item.count,
          item.maxLimits
        );
      } else {
        state.items.push({
          ...item,
          count: Math.min(item.count, item.maxLimits),
        });
      }

      if (findedPushedItem) {
        findedPushedItem.count = Math.min(
          (findedPushedItem.count as number) + item.count,
          item.maxLimits
        );
      } else if (state.pushedItem) {
        state.pushedItem.push({
          ...item,
          count: Math.min(item.count, item.maxLimits),
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeFromBasket(
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
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeAllBasket(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(
      state,
      { payload: item }: PayloadAction<ICartPizza>
    ) {
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
    plusItem(
      state,
      { payload: item }: PayloadAction<ICartPizza>
    ) {
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
    addToPusheditem(
      state,
      {
        payload: item,
      }: PayloadAction<
        Record<
          'id' | 'size' | 'count' | 'maxLimits',
          string | number
        >
      >
    ) {
      const findedPushedItem = state.pushedItem?.find(
        (o) => o.id === item.id && o.size === item.size
      );
      if (findedPushedItem) {
        findedPushedItem.count = Math.min(
          (findedPushedItem.count as number) +
            (item.count as number),
          item.maxLimits as number
        );
      } else if (state.pushedItem) {
        state.pushedItem.push({
          id: item.id as string,
          size: item.size as number,
          count: 0,
          maxLimits: item.maxLimits as number,
        });
      }
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  removeAllBasket,
  minusItem,
  plusItem,
  addToPusheditem,
} = cartSlice.actions;

export default cartSlice.reducer;
