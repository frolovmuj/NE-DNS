import { combineReducers } from '@reduxjs/toolkit';

import pizzasReduser from './pizzas/pizzas.slice';
import filterReducer from './filter/filter.slice';
import cartReducer from './cart/cart.slice';
import favoriteSlice from './favorites/favorite.slice';

export const reducers = combineReducers({
  pizzas: pizzasReduser,
  filter: filterReducer,
  cart: cartReducer,
  favorites: favoriteSlice,
});
