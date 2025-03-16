import { ICartPizza } from '../../models/CartPizza';

export interface ICartSliceState {
  items: ICartPizza[];
  totalPrice: number;
  pushedItem: Array<{
    id: string;
    size: number;
    count: number;
    maxLimits: number;
  }>;
}
