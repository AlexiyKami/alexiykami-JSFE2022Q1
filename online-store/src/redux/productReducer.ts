import { SEARCH_PRODUCTS } from './types';
import data, { Data } from './../state/state'

const initialState = data;

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      if (!action.payload) {
        return { ...state, products: initialState.products };
      }
      const searchedProducts = initialState.products.filter((item) => {
        return (
          item.name.toLowerCase().includes(action.payload) || item.brand.toLowerCase().includes(action.payload)
        );
      });
      return { ...state, products: searchedProducts };
    
    default: return state;
  }
}
