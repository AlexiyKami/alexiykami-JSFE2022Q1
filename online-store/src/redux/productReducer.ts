import { SEARCH_PRODUCTS } from './types';
import data from './../state/state';
import { Action } from '../types/types';

const initialState = data;

export const productReducer = (state = initialState, action: Action<string>) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      if (!action.payload) {
        return { ...state, products: initialState.products };
      }
      return {
        ...state,
        products: initialState.products.filter((item) => {
          const fullName = item.brand + ' ' + item.name;
          return fullName.toLowerCase().includes(action.payload);
        }),
      };

    default:
      return state;
  }
};
