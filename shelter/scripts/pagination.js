import {pets} from './pets.js';
import {openModal} from './modalMenu.js';

let bigArr = [];

let pages = 6;
let currentPage = 1;
let countOfCards = 8;

const btnLeftToEnd = document.querySelector('#left-end');
const btnLeft = document.querySelector('#left');
const btnNumber = document.querySelector('.round.active');
const btnRight = document.querySelector('#right');
const btnRightToEnd = document.querySelector('#right-end');

const cardsContainer = document.querySelector('.pets .cards');

function shuffle() {
  pets.sort((a,b) => Math.random() - 0.5);
}

function updatePage() {
  
  pages = document.body.offsetWidth < 768 ? 16 :
                                                document.body.offsetWidth < 1280 ? 8 : 6;
  countOfCards = bigArr.length/pages;
  btnNumber.textContent = currentPage;
  if (currentPage <= 1) {
    currentPage = 1;
    btnLeftToEnd.setAttribute('disabled','disabled');
    btnLeft.setAttribute('disabled','disabled');
  } else {
    btnLeftToEnd.removeAttribute('disabled');
    btnLeft.removeAttribute('disabled');
  }

  if (currentPage >= pages) {
    currentPage = pages;
    btnRightToEnd.setAttribute('disabled','disabled');
    btnRight.setAttribute('disabled','disabled');
  } else {
    btnRightToEnd.removeAttribute('disabled');
    btnRight.removeAttribute('disabled');
  }

  cardsContainer.innerHTML = '';

  for (let k = 0; k < (countOfCards); k++) {
    const index = (countOfCards*(currentPage-1))+k;
    const card = `<div class="card" data-pet="${bigArr[index].name}">
  <img src=${bigArr[index].img} alt="pet">
  <h4>${bigArr[index].name}</h4>
  <button class="button white">Learn more</button>
  </div>`;
  cardsContainer.insertAdjacentHTML('beforeend', card);
  }
  cardsContainer.childNodes.forEach(card => card.addEventListener('click', openModal));
  
}

function moveLeft() {
  currentPage--;
  updatePage();
}

function moveLeftToEnd() {
  currentPage = 1;
  updatePage();
}

function moveRight() {
  currentPage++;
  updatePage();
}

function moveRightToEnd() {
  currentPage = pages;
  updatePage();
}
//---------  anti-repeat for smaller width
pages = document.body.offsetWidth < 768 ? 16 :
                                                document.body.offsetWidth < 1280 ? 8 : 6;
countOfCards = 48/pages;
//---------
for (let i = 0; i < pages; i++) {
  shuffle();
  for (let k = 0; k < countOfCards; k++) {
    bigArr.push(pets[k]);
  }
}



updatePage();


// bigArr.forEach(pet => {
//   const card = `<div class="card" data-pet="${pet.name}">
// <img src=${pet.img} alt="pet">
// <h4>${pet.name}</h4>
// <button class="button white">Learn more</button>
// </div>`;
//   cardsContainer.insertAdjacentHTML('beforeend', card);
// });

btnLeftToEnd.addEventListener('click', moveLeftToEnd);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnRightToEnd.addEventListener('click', moveRightToEnd);

window.addEventListener('resize', updatePage);