import GaragePage from '../view/garage/garage';
import WinnersPage from '../view/winners/winners';
import RSLogo from '../../img/rss.svg';
import AppController from '../controller/controller';
import ModalWindow from '../view/modalWindow/modalWindow';

class App {
  garagePage: GaragePage;

  winnersPage: WinnersPage;

  modal: ModalWindow;

  controller: AppController;

  constructor() {
    this.controller = new AppController();
    this.garagePage = new GaragePage(this.controller);
    this.winnersPage = new WinnersPage(this.controller);
    this.modal = new ModalWindow(this.controller);
  }

  private createWrapper(): void {
    const wrapper = `<div class='wrapper'>
      <header>
        <div class='buttons'>
          <button class='garage-button'>Garage</button>
          <button class='winners-button'>Winners</button>
        </div>
      </header>
      <main>
          
      </main>
      <footer>
        <div class="footer-data">
          <span>2022</span>
          <a href="https://github.com/AlexiyKami" target="_blank">github</a>
        </div>
        <a class='footer-logo' href="https://rs.school/js" target="_blank">${RSLogo}</a>
      </footer>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', wrapper);
  }

  private initialDraw(): void {
    this.createWrapper();
    this.garagePage.draw();
    this.garagePage.updateGarage();
    this.winnersPage.draw();
    this.winnersPage.updateTable();
    this.winnersPage.hide();
  }

  public start(): void {
    this.initialDraw();

    document.querySelector('.garage-button')?.addEventListener('click', () => {
      this.winnersPage.hide();
      this.garagePage.show();
    });

    document.querySelector('.winners-button')?.addEventListener('click', () => {
      this.garagePage.hide();
      this.winnersPage.show();
    });
  }
}

export default App;
