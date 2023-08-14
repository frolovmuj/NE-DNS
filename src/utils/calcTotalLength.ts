import { ICartPizza } from "../models/CartPizza";

export const calcTotalLength = (items: ICartPizza[]) => {
  return items.reduce((acc: number, item: ICartPizza) => acc + item.count, 0);
};
