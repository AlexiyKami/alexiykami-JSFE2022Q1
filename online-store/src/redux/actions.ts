import { ADD_TO_CART, REMOVE_FROM_CART, SEARCH_PRODUCTS, FILTER_BY_YEAR, FILTER_BY_QUANTITY, FILTER_BY_BRAND, FILTER_BY_COLOR, FILTER_BY_CAMERAS, FILTER_BY_POPULAR, RESET_FILTERS, SORT_BY_NAME, SORT_BY_YEAR } from './types';
export function addToCart(product: object) {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}

export function removeFromCart(id: number) {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  }
}

export function searchProducts(searchQuery: string) {
  return {
    type: SEARCH_PRODUCTS,
    payload: searchQuery,
  }
}

export function filterByYear([min, max]: number[]) {
  return {
    type: FILTER_BY_YEAR,
    payload: [min, max],
  }
}

export function filterByQuantity([min, max]: number[]) {
  return {
    type: FILTER_BY_QUANTITY,
    payload: [min, max],
  }
}

export function filterByBrand(text: string) {
  return {
    type: FILTER_BY_BRAND,
    payload: text,
  }
}

export function filterByColor(text: string) {
  return {
    type: FILTER_BY_COLOR,
    payload: text,
  }
}

export function filterByCameras(text: number) {
  return {
    type: FILTER_BY_CAMERAS,
    payload: text,
  }
}

export function filterByPopular(bool : boolean) {
  return {
    type: FILTER_BY_POPULAR,
    payload: bool,
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  }
}

export function sortByName(text: string) {
  return {
    type: SORT_BY_NAME,
    payload: text,
  }
}

export function sortByYear(text: string) {
  return {
    type: SORT_BY_YEAR,
    payload: text,
  }
}