import {
  CarEngineData, IWinner, ICar, CarsData, WinnersData,
} from '../types/types';

class Loader { // load data from server
  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://127.0.0.1:3000';
  }

  async getCars(page: number = 1, limit: number = 7): Promise<CarsData> {
    const result = await fetch(`${this.baseUrl}/garage?_page=${page}&_limit=${limit}`, { method: 'GET' });
    return {
      cars: await result.json(),
      count: result.headers.get('X-Total-Count') || '0',
    };
  }

  async getWinners(page: number = 1, limit: number = 10, sort: string = 'id', order: string = 'ASC'): Promise<WinnersData> {
    const result = await fetch(`${this.baseUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, { method: 'GET' });
    return {
      winners: await result.json(),
      count: result.headers.get('X-Total-Count') || '0',
    };
  }

  async getCar(id: number): Promise<ICar[]> {
    const result = await fetch(`${this.baseUrl}/garage?id=${id}`, { method: 'GET' });
    return result.json();
  }

  async getWinner(id: number): Promise<IWinner[]> {
    const result = await fetch(`${this.baseUrl}/winners?id=${id}`, { method: 'GET' });
    return result.json();
  }

  async createCar(name: string, color: string): Promise<ICar> {
    const car = {
      name,
      color,
    };
    const requestInit = {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${this.baseUrl}/garage`, requestInit);
    return response.json();
  }

  async createWinner(id: number, wins: number, time: number): Promise<IWinner> {
    const winner = {
      id,
      wins,
      time,
    };
    const requestInit = {
      method: 'POST',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${this.baseUrl}/winners`, requestInit);
    return response.json();
  }

  async deleteCar(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/garage/${id}`, { method: 'DELETE' });
  }

  async deleteWinner(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/winners/${id}`, { method: 'DELETE' });
  }

  async updateCar(id: string, name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    const requestInit = {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await fetch(`${this.baseUrl}/garage/${id}`, requestInit);
  }

  async updateWinner(id: number, wins: number, time: number): Promise<void> {
    const winner = {
      id,
      wins,
      time,
    };
    const requestInit = {
      method: 'PUT',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await fetch(`${this.baseUrl}/winners/${id}`, requestInit);
  }

  async switchCarEngine(id: string, status: string): Promise<CarEngineData> {
    const result = await fetch(`${this.baseUrl}/engine?id=${id}&status=${status}`, { method: 'PATCH' });
    const data = await result.json();
    return data;
  }

  async switchEngineToDriveMode(id: string): Promise<Response> {
    return fetch(`${this.baseUrl}/engine?id=${id}&status=drive`, { method: 'PATCH' });
  }
}

export default Loader;
