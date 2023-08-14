import { ICartPizza } from "../../models/CartPizza";

export interface ICartSliceState{
    items: ICartPizza[];
    totalPrice: number;
}
