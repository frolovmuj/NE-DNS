import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterSliceState } from './types'
import { ISort } from '../../models/Sort';

const initialState: IFilterSliceState = {
  searchText: '',
  category: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    property: 'rating',
    order: 'desc',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, { payload: id }: PayloadAction<number>) {
      
      state.category = id;
    },
    setSearchText(state, { payload: value }: PayloadAction<string>) {
      state.searchText = value;
    },
    setSort(state, { payload: sort }: PayloadAction<ISort>) {
      state.sort = sort;
    },
    setCurrentPage(state, { payload: page }: PayloadAction<number>) {
      state.currentPage = page;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(
          action.payload.currentPage
        );
        state.category = Number(action.payload.category);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.category = 0;
        state.sort = {
          name: 'популярности',
          property: 'rating',
          order: 'desc',
        };
      }
    },
  },
});

export const {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchText,
} = filterSlice.actions;


export default filterSlice.reducer;
