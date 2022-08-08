import { CarsData, ICar } from '../types/types';
import Loader from './loader';

class AppController {
  loader: Loader;

  onCarUpdate: Function;

  onButtonBlock: Function;

  onWinnerUpdate: Function;

  onModalOpen: Function;

  onModalClose: Function;

  private selectedCarId = '0';

  private carsOnPage = 7;

  private winnersOnPage = 10;

  private garagePage = 1;

  private maxGaragePage = 1;

  private winnersPage = 1;

  private maxWinnersPage = 1;

  private modalTimeDelay = 5000;

  private sortWinnersBy = 'id';

  private sortWinnersOrder = 'ASC';

  constructor() {
    this.loader = new Loader();
    this.onCarUpdate = () => {};
    this.onButtonBlock = () => {};
    this.onWinnerUpdate = () => {};
    this.onModalOpen = () => {};
    this.onModalClose = () => {};
  }

  async blockButtons(id: string, car: HTMLElement) {
    this.onButtonBlock(id, car);
  }

  async showModal(message: string) {
    this.onModalOpen(message);
    setTimeout(() => {
      this.onModalClose();
    }, this.modalTimeDelay);
  }

  async generateCars(count: number = 100) {
    const names = ['Audi', 'BMW', 'Mercedes', 'Ferrari', 'Ford', 'Dodge', 'Porsche', 'Tesla', 'Toyota', 'Subaru'];
    const model = ['S4', 'M3', 'AMG C63', 'F40', 'Focus RS', 'Charger', '911', 'Model S', 'Supra', 'Impreza WRX STI'];
    for (let i = 0; i < count; i += 1) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomModel = model[Math.floor(Math.random() * model.length)];
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.createCar(`${randomName} ${randomModel}`, randomColor);
    }
  }

  async race() {
    let isFinished = false;
    const { cars } = await this.loader.getCars(this.garagePage, this.carsOnPage);
    cars.forEach(async (value) => {
      const car = (document.querySelector(`[data-id="${value.id}"]`) as HTMLElement).children[2].children[1] as HTMLElement;
      const { result, response } = await this.startCarEngine(value.id.toString(), car);
      const time = result.distance / result.velocity;
      if (response.status === 200 && car.getAttribute('data-frame') && !isFinished) {
        isFinished = true;
        const winner = await this.getWinner(+value.id);
        this.showModal(`${value.name} was first! Time: ${+(time / 1000).toFixed(2)} seconds!`);
        if (winner.length === 0) {
          this.createWinner(+value.id, 1, +(time / 1000).toFixed(2));
        } else {
          this.updateWinner(+value.id, winner[0].wins, +(time / 1000).toFixed(2));
        }
      }
    });
  }

  async resetCars() {
    const { cars } = await this.loader.getCars(this.garagePage, this.carsOnPage);
    cars.forEach(async (value) => {
      const car = (document.querySelector(`[data-id="${value.id}"]`) as HTMLElement).children[2].children[1] as HTMLElement;
      await this.stopCarEngine(value.id.toString(), car);
    });
  }

  async getCars(): Promise<CarsData> {
    const cars = await this.loader.getCars(this.garagePage, this.carsOnPage);
    this.maxGaragePage = Math.ceil(+cars.count / this.carsOnPage) || 1;
    if (this.getGaragePage() > this.getMaxGaragePage()) {
      this.setGaragePage(this.getMaxGaragePage());
    }
    return cars;
  }

  async getCar(id: number): Promise<ICar[]> {
    const car = await this.loader.getCar(id);
    return car;
  }

  async getWinner(id: number) {
    const winner = await this.loader.getWinner(id);
    return winner;
  }

  async getWinners() {
    const winners = await this.loader.getWinners(
      this.winnersPage,
      this.winnersOnPage,
      this.sortWinnersBy,
      this.sortWinnersOrder,
    );
    this.maxWinnersPage = Math.ceil(+winners.count / this.winnersOnPage) || 1;
    if (this.getWinnersPage() > this.getMaxWinnersPage()) {
      this.setWinnersPage(this.getMaxWinnersPage());
    }
    return winners;
  }

  async createCar(name: string, color: string): Promise<void> {
    await this.loader.createCar(name, color);
    this.updateGarage();
  }

  async createWinner(id: number, wins: number, time: number) {
    await this.loader.createWinner(id, wins, +time);
    this.updateWinners();
  }

  async deleteCar(id: number): Promise<void> {
    await this.loader.deleteCar(id);
    await this.loader.deleteWinner(id);
    this.updateGarage();
    this.updateWinners();
  }

  async updateCar(id: string, name: string, color: string) {
    await this.loader.updateCar(id, name, color);
    this.updateGarage();
    this.updateWinners();
  }

  async updateWinner(id: number, wins: number, time: number) {
    const winner = await this.getWinner(id);
    await this.loader.updateWinner(id, wins + 1, Math.min(time, winner[0].time));
    this.updateWinners();
  }

  async startCarEngine(id: string, car: HTMLElement) {
    car.setAttribute('status', 'drive');
    this.blockButtons(id, car);
    const result = await this.loader.switchCarEngine(id, 'started');
    const time = result.distance / result.velocity;
    this.animation(car, time);
    const response = await this.switchEngineToDriveMode(id);
    if (response.status === 500) {
      window.cancelAnimationFrame(Number(car.getAttribute('data-frame')));
      car.removeAttribute('data-frame');
    }
    car.setAttribute('status', 'finished');
    this.blockButtons(id, car);
    return {
      result,
      response,
    };
  }

  async stopCarEngine(id: string, car: HTMLElement) {
    const result = await this.loader.switchCarEngine(id, 'stopped');
    window.cancelAnimationFrame(Number(car.getAttribute('data-frame')));
    car.removeAttribute('data-frame');
    car.setAttribute('status', 'onstart');
    this.blockButtons(id, car);
    car.style.transform = 'TranslateX(0px)';
    return result;
  }

  async switchEngineToDriveMode(id: string) {
    return this.loader.switchEngineToDriveMode(id);
  }

  async updateGarage(): Promise<void> {
    this.onCarUpdate();
  }

  async updateWinners() {
    this.onWinnerUpdate();
  }

  setSelectedCarId(value: string) {
    this.selectedCarId = value;
  }

  getSelectedCarId() {
    return this.selectedCarId;
  }

  setGaragePage(value: number) {
    if (value < 1) {
      this.garagePage = 1;
    } else if (value > this.maxGaragePage) {
      this.garagePage = this.maxGaragePage;
    } else {
      this.garagePage = value;
    }
    this.updateGarage();
  }

  setWinnersPage(value: number) {
    if (value < 1) {
      this.winnersPage = 1;
    } else if (value > this.maxWinnersPage) {
      this.winnersPage = this.maxWinnersPage;
    } else {
      this.winnersPage = value;
    }
    this.updateWinners();
  }

  getGaragePage() {
    return this.garagePage;
  }

  getWinnersPage() {
    return this.winnersPage;
  }

  getMaxGaragePage() {
    return this.maxGaragePage;
  }

  getMaxWinnersPage() {
    return this.maxWinnersPage;
  }

  setSortWinnersBy(type: string, order: string) {
    this.sortWinnersBy = type;
    this.sortWinnersOrder = order;
    this.updateWinners();
  }

  private animation(car: HTMLElement, animationTime: number) {
    let start: number | null = null;
    const distance = document.documentElement.clientWidth - 200;

    let id = 0;

    function step(timeStamp: number) {
      if (!start) {
        start = timeStamp;
      }

      const time = timeStamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `TranslateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        id = window.requestAnimationFrame(step);
      }
      car.setAttribute('data-frame', id.toString());
    }
    id = window.requestAnimationFrame(step);

    return id;
  }
}

export default AppController;
