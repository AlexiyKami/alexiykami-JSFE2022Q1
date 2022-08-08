import AppController from '../../controller/controller';
import carImage from '../../../img/car.svg';
import './winners.css';

class WinnersPage {
  controller: AppController;

  constructor(controller: AppController) {
    this.controller = controller;
    this.controller.onWinnerUpdate = this.updateTable.bind(this);
  }

  draw(): void {
    const wrapper = `<div class=winners>
      <h2 class="winners-title">Winners(0)</h2>
      <table class="winners-table">
        <tr class="table-sorting">
          <th class="table-number" order="0">Number</th>
          <th class="table-image">Car</th>
          <th class="table-name">Name</th>
          <th class="table-wins" order="0">Wins</th>
          <th class="table-time" order="0">Best time</th>
        </tr>
  </table>
  <div class='winners-pagination'>
        <button class='prev' disabled>Prev</button>
        <h4 class="winners-page-number">Page 1</h4>
        <button class='next'>Next</button>
      </div>
    </div>`;
    document.querySelector('main')?.insertAdjacentHTML('beforeend', wrapper);
    document.querySelector('.winners-pagination')?.addEventListener('click', (e) => this.onPaginationClick(e));
    document.querySelector('.table-sorting')?.addEventListener('click', (e) => this.onSortClick(e));
  }

  async updateTable(): Promise<void> {
    const { winners, count } = await this.controller.getWinners();
    document.querySelectorAll('.table-item').forEach((item) => item.remove());
    winners.map(async (winner) => {
      const car = await this.controller.getCar(winner.id);
      const result = `<tbody class="table-item">
      <tr>
        <td>${car[0].id}</td>
        <td>${(carImage as string).replace('#000000', `${car[0].color}`)}</td>
        <td>${car[0].name}</td>
        <td>${winner.wins}</td>
        <td>${winner.time}</td>
      </tr></tbody>`;
      document.querySelector('.winners-table')?.insertAdjacentHTML('beforeend', result);
    });
    this.updateWinnersCounter(count);
    this.updatePagination();
  }

  private onSortClick(e: Event) {
    const orders = ['ASC', 'DESC'];
    const target = e.target as HTMLElement;
    console.log();
    if (target.getAttribute('order') === '0') {
      target.setAttribute('order', '1');
    } else {
      target.setAttribute('order', '0');
    }
    const order = orders[+(target.getAttribute('order') as string)];
    if (target.classList.contains('table-number')) {
      target.innerHTML = `Number(${order})`;
      this.controller.setSortWinnersBy('id', order);
    }
    if (target.classList.contains('table-wins')) {
      target.innerHTML = `Wins(${order})`;
      this.controller.setSortWinnersBy('wins', order);
    }
    if (target.classList.contains('table-time')) {
      target.innerHTML = `Best time(${order})`;
      this.controller.setSortWinnersBy('time', order);
    }
  }

  private onPaginationClick(e: Event) {
    const target = e.target as HTMLElement;
    const page = this.controller.getWinnersPage();
    if (target.classList.contains('prev')) {
      this.controller.setWinnersPage(page - 1);
    }
    if (target.classList.contains('next')) {
      this.controller.setWinnersPage(page + 1);
    }
    console.log(`page ${this.controller.getWinnersPage()}`);
  }

  private updatePagination(): void {
    const prev = document.querySelector('.winners-pagination .prev') as HTMLButtonElement;
    const next = document.querySelector('.winners-pagination .next') as HTMLButtonElement;
    prev.disabled = false;
    next.disabled = false;
    if (this.controller.getWinnersPage() <= 1) {
      prev.disabled = true;
    }
    if (this.controller.getWinnersPage() === this.controller.getMaxWinnersPage()) {
      next.disabled = true;
    }
    (document.querySelector('.winners-page-number') as Element).innerHTML = `Page ${this.controller.getWinnersPage()} / ${this.controller.getMaxWinnersPage()}`;
  }

  private updateWinnersCounter(count: string) {
    (document.querySelector('.winners-title') as Element).innerHTML = `Winners(${count})`;
  }

  show(): void {
    document.querySelector('.winners')?.classList.remove('hide');
  }

  hide(): void {
    document.querySelector('.winners')?.classList.add('hide');
  }
}

export default WinnersPage;
