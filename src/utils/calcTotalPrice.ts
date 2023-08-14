import { ICartPizza } from "../models/CartPizza";

export const calcTotalPrice = (items: ICartPizza[]) => {
  return items.reduce(
    (sum, obj) => obj.price * obj.count + sum,
    0
  );
};
