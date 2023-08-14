import { ISort } from '../../models/Sort'

export interface IFilterSliceState{
    searchText: string;
    category: number;
    currentPage: number;
    sort: ISort
}

export interface ISearchPizzaParams {
    sort: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };