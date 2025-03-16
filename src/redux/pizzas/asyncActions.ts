import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISearchPizzaParams } from '../filter/types';
import { IPizza } from '../../models/Pizza';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<
  IPizza[],
  ISearchPizzaParams
>(
  'pizzas/fetchPizzas',
  async ({
    currentPage,
    category,
    order,
    sort,
    search,
  }) => {
    const { data } = await axios.get<IPizza[]>(
      `https://644e76af4e86e9a4d8f969fb.mockapi.io/items?${currentPage}&limit=4&${category}&${sort}&${order}&${search}`
    );
    return data;
  }
);
