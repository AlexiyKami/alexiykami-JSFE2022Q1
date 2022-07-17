import { cartReducer } from './cartReducer';
import { sortReducer } from './sortReducer';
import { filterReducer } from './filterReducer';
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  filter: filterReducer,
  sort: sortReducer,
});