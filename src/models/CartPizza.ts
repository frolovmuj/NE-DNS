import { IPizza } from "./Pizza";

export interface ICartPizza extends Omit<IPizza,'types' | 'sizes' | 'rating' | 'category'>{
    count: number;
    type: string;
    size: number;
}