import './garage.css';
import carImage from '../../../img/car.svg';
import AppController from '../../controller/controller';

class GaragePage {
  controller: AppController;

  constructor(controller: AppController) {
    this.controller = controller;
    this.controller.onCarUpdate = this.updateGarage.bind(this);
    this.controller.onButtonBlock = this.blockCarButtons.bind(this);
  }

  draw(): void {
    const wrapper = `<div class='garage'>
      <div class="inputs">
        <div class="create-car">
          <input class="create-car-text" type="text">
          <input class="create-car-color" type="color">
          <button class="create-car-button">Create</button>
        </div>
        <div class="update-car">
          <input class="update-car-text" type="text">
          <input class="update-car-color" type="color">
          <button class="update-car-button">Update</button>
        </div>
        <div class="control-buttons">
          <button class="race">Race</button>
          <button class="reset">Reset</button>
          <button class="generate">Generate</button>
        </div>
      </div>
      <h2 class="garage-title">Garage(0)</h2>
      <div class='cars'></div>
      <div class='garage-pagination'>
        <button class='prev' disabled>Prev</button>
        <h4 class="garage-page-number">Page 1</h4>
        <button class='next'>Next</button>
      </div>
    </div>`;
    document.querySelector('main')?.insertAdjacentHTML('beforeend', wrapper);
    document.querySelector('.garage-pagination')?.addEventListener('click', (e) => this.onPaginationClick(e));
    document.querySelector('.inputs')?.addEventListener('click', (e) => this.onInputClick(e));
  }

  async updateGarage(): Promise<void> {
    const { cars, count } = await this.controller.getCars();
    const carItems = cars.map((car) => `<div class="car${car.id === +this.controller.getSelectedCarId() ? ' selected' : ''}" data-id=${car.id}>
    <h2 class="car-name">${car.name}</h2>
    <div class="select-buttons">
      <button class="button-select">Select</button>
      <button class="button-remove">Remove</button>
    </div>
    <div class="car-lane">
      <div class="engine-buttons">
        <button class="button-start">START</button>
        <button class="button-stop" disabled>STOP</button>
      </div>
      <div class='car-image'>${(carImage as string).replace('#000000', `${car.color}`)}</div>
      <div class="lane"></div>
    </div>
  </div>`).join('');
    (document.querySelector('.cars') as Element).innerHTML = '';
    if (carItems.length === 0) {
      (document.querySelector('.cars') as Element).innerHTML = 'There are no cars in this page';
    } else {
      document.querySelector('.cars')?.insertAdjacentHTML('beforeend', carItems);
    }
    document.querySelectorAll('.car').forEach((car) => car.addEventListener('click', (e) => this.onCarButtonClick(e)));
    this.updateGarageCounter(count);
    this.updatePagination();
  }

  private onInputClick(e: Event): void {
    const target = e.target as HTMLElement;
    console.log(target);
    if (target.classList.contains('create-car-button')) {
      const nameForm = document.querySelector('.create-car-text') as HTMLInputElement;
      const colorForm = document.querySelector('.create-car-color') as HTMLInputElement;
      this.controller.createCar(nameForm.value || 'Default Car', colorForm.value);
    }
    if (target.classList.contains('update-car-button')) {
      const carId = this.controller.getSelectedCarId();
      const nameForm = document.querySelector('.update-car-text') as HTMLInputElement;
      const colorForm = document.querySelector('.update-car-color') as HTMLInputElement;
      console.log(`update '${nameForm.value} ${colorForm.value}`);
      this.controller.updateCar(carId, nameForm.value, colorForm.value);
    }
    if (target.classList.contains('generate')) {
      this.controller.generateCars();
    }
    if (target.classList.contains('race')) {
      this.controller.race();
    }
    if (target.classList.contains('reset')) {
      this.controller.resetCars();
    }
  }

  private onPaginationClick(e: Event) {
    const target = e.target as HTMLElement;
    const page = this.controller.getGaragePage();
    if (target.classList.contains('prev')) {
      this.controller.setGaragePage(page - 1);
    }
    if (target.classList.contains('next')) {
      this.controller.setGaragePage(page + 1);
    }
    console.log(`page ${this.controller.getGaragePage()}`);
  }

  private onCarButtonClick(e: Event) {
    const target = e.target as HTMLElement;
    const carId = (e.currentTarget as HTMLElement).getAttribute('data-id') as string;
    const car = (e.currentTarget as HTMLElement).children[2].children[1] as HTMLElement;
    console.log(car);
    if (target.classList.contains('button-start')) {
      car.setAttribute('status', 'drive');
      this.controller.startCarEngine(carId, car);
      console.log('start');
    }
    if (target.classList.contains('button-stop')) {
      this.controller.stopCarEngine(carId, car);
      console.log('stop');
    }
    if (target.classList.contains('button-select')) {
      document.querySelector('.car.selected')?.classList.remove('selected');
      (e.currentTarget as HTMLElement).classList.add('selected');
      this.controller.setSelectedCarId(carId);
      console.log(`select ${this.controller.getSelectedCarId()}`);
    }
    if (target.classList.contains('button-remove')) {
      this.controller.deleteCar(+carId);
      console.log(`${carId} removed`);
    }
    this.blockCarButtons(carId, car);
  }

  private blockCarButtons(carId: string, car: HTMLElement) {
    console.log(car);
    if (car.getAttribute('status') === 'drive') {
      (document.querySelector(`.car[data-id="${carId}"] .button-select`) as HTMLButtonElement).disabled = true;
      (document.querySelector(`.car[data-id="${carId}"] .button-remove`) as HTMLButtonElement).disabled = true;
      (document.querySelector(`.car[data-id="${carId}"] .button-start`) as HTMLButtonElement).disabled = true;
      (document.querySelector(`.car[data-id="${carId}"] .button-stop`) as HTMLButtonElement).disabled = false;
    } else if (car.getAttribute('status') === 'finished') {
      (document.querySelector(`.car[data-id="${carId}"] .button-select`) as HTMLButtonElement).disabled = false;
      (document.querySelector(`.car[data-id="${carId}"] .button-remove`) as HTMLButtonElement).disabled = false;
      (document.querySelector(`.car[data-id="${carId}"] .button-stop`) as HTMLButtonElement).disabled = false;
      (document.querySelector(`.car[data-id="${carId}"] .button-start`) as HTMLButtonElement).disabled = false;
    } else if (car.getAttribute('status') === 'onstart') {
      (document.querySelector(`.car[data-id="${carId}"] .button-select`) as HTMLButtonElement).disabled = false;
      (document.querySelector(`.car[data-id="${carId}"] .button-remove`) as HTMLButtonElement).disabled = false;
      (document.querySelector(`.car[data-id="${carId}"] .button-stop`) as HTMLButtonElement).disabled = true;
      (document.querySelector(`.car[data-id="${carId}"] .button-start`) as HTMLButtonElement).disabled = false;
    }
  }

  private updateGarageCounter(count: string): void {
    (document.querySelector('.garage-title') as Element).innerHTML = `Garage(${count})`;
  }

  private updatePagination(): void {
    const prev = document.querySelector('.garage-pagination .prev') as HTMLButtonElement;
    const next = document.querySelector('.garage-pagination .next') as HTMLButtonElement;
    prev.disabled = false;
    next.disabled = false;
    if (this.controller.getGaragePage() <= 1) {
      prev.disabled = true;
    }
    if (this.controller.getGaragePage() === this.controller.getMaxGaragePage()) {
      next.disabled = true;
    }
    (document.querySelector('.garage-page-number') as Element).innerHTML = `Page ${this.controller.getGaragePage()} / ${this.controller.getMaxGaragePage()}`;
  }

  show(): void {
    document.querySelector('.garage')?.classList.remove('hide');
  }

  hide(): void {
    document.querySelector('.garage')?.classList.add('hide');
  }
}

export default GaragePage;
