import {
  PayloadAction,
  createSlice,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit';

import { IPizzasSliceState } from './types';
import { Status } from './types';
import { IPizza } from '../../models/Pizza';

import { fetchPizzas } from './asyncActions';

const initialState: IPizzasSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, { payload: pizzas }: PayloadAction<IPizza[]>) {
      state.items = pizzas;
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<IPizzasSliceState>) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, {payload: pizzas}: PayloadAction<IPizza[]>) => {
        state.items = pizzas;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});


export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
