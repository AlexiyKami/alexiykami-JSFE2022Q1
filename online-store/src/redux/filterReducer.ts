import { Action, FilterState } from '../types/types';
import {
  FILTER_BY_QUANTITY,
  FILTER_BY_YEAR,
  FILTER_BY_BRAND,
  FILTER_BY_COLOR,
  FILTER_BY_CAMERAS,
  FILTER_BY_POPULAR,
  RESET_FILTERS,
} from './types';
const initialState: FilterState = JSON.parse(localStorage.getItem('state') as string)
  ? JSON.parse(localStorage.getItem('state') as string).filter
  : {
      brand: [],
      color: [],
      numberOfCameras: [],
      isPopular: false,
    };

export const filterReducer = (state = initialState, action: Action<number | number[] | string>) => {
  switch (action.type) {
    case FILTER_BY_YEAR:
      return { ...state, year: [(action.payload as number[])[0], (action.payload as number[])[1]] };
    case FILTER_BY_QUANTITY:
      return { ...state, quantity: [(action.payload as number[])[0], (action.payload as number[])[1]] };
    case FILTER_BY_BRAND:
      if (state.brand.includes(action.payload as string)) {
        return { ...state, brand: state.brand.filter((value) => value !== action.payload) };
      }
      return { ...state, brand: [...state.brand, action.payload] };
    case FILTER_BY_COLOR:
      if (state.color.includes(action.payload as string)) {
        return { ...state, color: state.color.filter((value) => value !== action.payload) };
      }
      return { ...state, color: [...state.color, action.payload] };
    case FILTER_BY_CAMERAS:
      if (state.numberOfCameras.includes(action.payload as number)) {
        return { ...state, numberOfCameras: state.numberOfCameras.filter((value) => value !== action.payload) };
      }
      return { ...state, numberOfCameras: [...state.numberOfCameras, action.payload] };
    case FILTER_BY_POPULAR:
      return { ...state, isPopular: action.payload };
    case RESET_FILTERS:
      return {
        brand: [],
        color: [],
        numberOfCameras: [],
        isPopular: false,
      };
    default:
      return state;
  }
};
