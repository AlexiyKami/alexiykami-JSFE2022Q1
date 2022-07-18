export type Data = {
  products: ISmartphone[] | IProduct[];
};

export interface IProduct {
  id: number;
  brand: string;
  type: string;
  name: string;
  color: string;
  year: number;
  quantity: number;
  price: number;
  imgSrc: string;
  isPopular: boolean;
}

export interface ISmartphone extends IProduct {
  numberOfCameras: number;
  RAM: string;
  memory: string;
}

export type Action<T> = {
  type: string;
  payload: T;
};

export type ActionCreator<T> = (value: T) => Action<T>;

export type State = {
  cart: IProduct[];
  filter: FilterState;
  products: Data;
  sort: SortState;
};

export type FilterState = {
  year?: number[];
  quantity?: number[];
  brand: string[];
  color: string[];
  numberOfCameras: number[];
  isPopular: boolean;
};

export type SortState = {
  sortByName: string;
  sortByYear: string;
};
