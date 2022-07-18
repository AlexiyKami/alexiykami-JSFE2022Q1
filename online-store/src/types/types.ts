export interface IProduct {
  id: number,
  brand: string;
  type: string;
  name: string;
  color: string;
  year: number;
  quantity: number;
  price: number;
  imgSrc: string;
  isPopular: boolean,
}

export interface ISmartphone extends IProduct {
  numberOfCameras: number;
  RAM: string;
  memory: string;
}

export type Action<T> = {
  type: string;
  payload: T;
}