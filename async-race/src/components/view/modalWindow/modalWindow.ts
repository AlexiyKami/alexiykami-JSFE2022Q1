import AppController from '../../controller/controller';
import './modalWindow.css';

class ModalWindow {
  controller: AppController;

  constructor(controller: AppController) {
    this.controller = controller;
    this.controller.onModalOpen = this.draw.bind(this);
    this.controller.onModalClose = this.clear.bind(this);
  }

  draw(message:string): void {
    const wrapper = `<div class='modal'>
      <div class='window'>${message}</div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', wrapper);
  }

  clear(): void {
    document.querySelector('.modal')?.remove();
  }
}

export default ModalWindow;
