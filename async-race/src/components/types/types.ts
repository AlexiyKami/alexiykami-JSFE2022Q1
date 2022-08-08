export interface ICar {
  name: string,
  color: string,
  id: number
}

export interface IWinner {
  id: number,
  wins: number,
  time: number
}

export type CarsData = {
  cars: ICar[];
  count: string;
}

export type WinnersData = {
  winners: IWinner[];
  count: string;
}

export type CarEngineData = {
  velocity: number;
  distance: number;
}
