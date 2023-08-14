import { IPizza } from "../../models/Pizza";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
  
export interface IPizzasSliceState {
    items: IPizza[];
    status: Status;
}
export interface IPayload{
    payload: IPizza[];
}