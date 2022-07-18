import { SortState } from './../types/types';
import { Action } from '../types/types';
import { SORT_BY_NAME, SORT_BY_YEAR } from './types';

const initialState: SortState = JSON.parse(localStorage.getItem('state') as string)
  ? JSON.parse(localStorage.getItem('state') as string).sort
  : {
      sortByName: '0',
      sortByYear: '0',
    };

export const sortReducer = (state = initialState, action: Action<string>): SortState => {
  switch (action.type) {
    case SORT_BY_NAME:
      return { ...state, sortByName: action.payload };
    case SORT_BY_YEAR:
      return { ...state, sortByYear: action.payload };
    default:
      return state;
  }
};
