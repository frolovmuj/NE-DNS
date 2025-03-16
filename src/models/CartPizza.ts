import { IPizza } from './Pizza';

export interface ICartPizza
  extends Omit<
    IPizza,
    | 'types'
    | 'sizes'
    | 'rating'
    | 'category'
    | 'description'
  > {
  count: number;
  type: string;
  size: number;
}
