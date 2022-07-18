import { sortReducer } from './sortReducer';
import { filterReducer } from './filterReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { createStore } from 'redux';
import * as actions from './actions';
import { rootReducer } from './rootReducer';
import data from '../state/state';

const store = createStore(rootReducer);

test('should has basic keys', () => {
  const state = store.getState();
  expect(state.products).not.toBeNull();
  expect(state.cart).not.toBeNull();
  expect(state.filter).not.toBeNull();
  expect(state.sort).not.toBeNull();
});

test('should add to cart 1 time', () => {
  const state = store.getState().cart;
  const action = actions.addToCart(data.products[0]);
  const newState = cartReducer(state, action);
  expect(newState.length).toBe(1);
});

test('should add to cart 3 times', () => {
  const state = store.getState().cart;
  const action = actions.addToCart(data.products[0]);
  let newState = cartReducer(state, action);
  newState = cartReducer(newState, action);
  newState = cartReducer(newState, action);
  expect(newState.length).toBe(3);
});

test('should remove exist item from cart', () => {
  const state = store.getState().cart;
  const removeAction = actions.removeFromCart(1);
  let newState = cartReducer(state, actions.addToCart(data.products[0]));
  newState = cartReducer(newState, actions.addToCart(data.products[1]));
  newState = cartReducer(newState, actions.addToCart(data.products[2]));
  newState = cartReducer(newState, removeAction);
  expect(newState.length).toBe(2);
});

test('should not remove non-existent item from cart', () => {
  const state = store.getState().cart;
  const removeAction = actions.removeFromCart(6);
  let newState = cartReducer(state, actions.addToCart(data.products[0]));
  newState = cartReducer(newState, actions.addToCart(data.products[1]));
  newState = cartReducer(newState, actions.addToCart(data.products[2]));
  const actual = cartReducer(newState, removeAction);
  expect(actual).toEqual(newState);
});

test('should return searched items', () => {
  const state = store.getState().products;
  const searchQuery = 'xiaomi';
  const searchAction = actions.searchProducts(searchQuery);
  const newState = productReducer(state, searchAction);
  const searchedItems = state.products.filter((item) => {
    const fullName = item.brand + ' ' + item.name;
    return fullName.toLowerCase().includes(searchQuery);
  });
  expect(newState.products).toEqual(searchedItems);
});

test('should add filters by brand', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByBrand('Apple'));
  const expected: typeof state = {
    brand: ['Apple'],
    color: [],
    numberOfCameras: [],
    isPopular: false,
  };
  expect(newState).toEqual(expected);
});

test('should add filters by color', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByColor('Black'));
  const expected: typeof state = {
    brand: [],
    color: ['Black'],
    numberOfCameras: [],
    isPopular: false,
  };
  expect(newState).toEqual(expected);
});

test('should add filters by number of cameras', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByCameras(1));
  const expected: typeof state = {
    brand: [],
    color: [],
    numberOfCameras: [1],
    isPopular: false,
  };
  expect(newState).toEqual(expected);
});

test('should add filters by popularity', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByPopular(true));
  const expected: typeof state = {
    brand: [],
    color: [],
    numberOfCameras: [],
    isPopular: true,
  };
  expect(newState).toEqual(expected);
});

test('should add filters by year', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByYear([2010, 2020]));
  const expected: typeof state = {
    brand: [],
    color: [],
    numberOfCameras: [],
    isPopular: false,
    year: [2010, 2020],
  };
  expect(newState).toEqual(expected);
});

test('should add filters by quantity', () => {
  const state = store.getState().filter;
  const newState = filterReducer(state, actions.filterByQuantity([0, 35]));
  const expected: typeof state = {
    brand: [],
    color: [],
    numberOfCameras: [],
    isPopular: false,
    quantity: [0, 35],
  };
  expect(newState).toEqual(expected);
});

test('should add all filter settings', () => {
  const state = store.getState().filter;
  let newState = filterReducer(state, actions.filterByBrand('Xiaomi'));
  newState = filterReducer(newState, actions.filterByCameras(4));
  newState = filterReducer(newState, actions.filterByColor('Blue'));
  newState = filterReducer(newState, actions.filterByPopular(true));
  newState = filterReducer(newState, actions.filterByYear([2020, 2022]));
  newState = filterReducer(newState, actions.filterByQuantity([5, 55]));
  const expected: typeof state = {
    brand: ['Xiaomi'],
    color: ['Blue'],
    numberOfCameras: [4],
    isPopular: true,
    year: [2020, 2022],
    quantity: [5, 55],
  };
  expect(newState).toEqual(expected);
});

test('should add sort settings', () => {
  const state = store.getState().sort;
  let newState = sortReducer(state, actions.sortByName('A-Z'));
  newState = sortReducer(newState, actions.sortByYear('later'));
  const expected: typeof state = {
    sortByName: 'A-Z',
    sortByYear: 'later',
  };
  expect(newState).toEqual(expected);
});
