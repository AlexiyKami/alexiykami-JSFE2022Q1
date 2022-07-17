import { IProduct } from './../types/types';
import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

const initialState: IProduct[] = JSON.parse(localStorage.getItem('state') as string) ? JSON.parse(localStorage.getItem('state') as string).cart : [];

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [ ...state, action.payload ];
    case REMOVE_FROM_CART:
      const restProducts = state.filter((item) => {
        return item.id !== action.payload;
      });
      return restProducts;
    default: return state;
  }
}
