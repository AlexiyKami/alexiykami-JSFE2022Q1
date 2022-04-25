import { pets } from './pets.js';
import { openModal } from './modalMenu.js';

const cardsContainer = document.querySelector('.slider .carousel .cards');
const prevItem = document.querySelector('.item-prev');
const currItem = document.querySelector('.item-curr');
const nextItem = document.querySelector('.item-next');
const leftButton = document.querySelector('.slider .round');
const rightButton = document.querySelector('.slider .round.right');

let arrIndexes = [];

function moveLeft() {
  arrIndexes.splice(0, 0, getUniqueElement(0));
  arrIndexes.pop();
  cardsContainer.classList.add('transition-left');
}

function moveRight() {
  arrIndexes.splice(arrIndexes.length, 0, getUniqueElement(arrIndexes.length - 1));
  arrIndexes.shift();
  cardsContainer.classList.add('transition-right');
}

function getUniqueElement(index) {
  let isUnique = false;
  let result;
  while (isUnique === false) {
    isUnique = true;
    let numbers = getRandomNumbers();
    for (let number of numbers) {
      if (arrIndexes[index].includes(number)) {
        isUnique = false;
      }
    }
    result = numbers;
  }
  return result;
}

function getRandomNumbers() {
  let rand1 = 0;
  let rand2 = 0;
  let rand3 = 0;
  while (rand1 == rand2 || rand2 == rand3 || rand1 == rand3) {
    rand1 = Math.round(Math.random() * (pets.length - 1));
    rand2 = Math.round(Math.random() * (pets.length - 1));
    rand3 = Math.round(Math.random() * (pets.length - 1));
  }
    return [rand1, rand2, rand3];
}

while (arrIndexes.length < 3) {
  let numbers = getRandomNumbers();
  if (arrIndexes.length === 0) {
    arrIndexes.push(numbers);
  } else {
    let isUnique = true;
    for (let number of numbers) {
      if (arrIndexes[arrIndexes.length - 1].includes(number)) {
        isUnique = false;
      }
    }
    if (isUnique) {
      arrIndexes.push(numbers);
    }
  }
}

function renderCards() {
  prevItem.innerHTML = '';
  currItem.innerHTML = '';
  nextItem.innerHTML = '';
  for (let i = 0; i <= 2; i++) {
    for (let k = 0; k < 3; k++) {
      const card = `<div class="card" data-pet="${pets[arrIndexes[i][k]].name}">
                    <img src=${pets[arrIndexes[i][k]].img} alt="pet">
                    <h4>${pets[arrIndexes[i][k]].name}</h4>
                    <button class="button white">Learn more</button>
                    </div>`;
      if (i === 0) {
        prevItem.insertAdjacentHTML('beforeend', card);
      }
      if (i === 1) {
        currItem.insertAdjacentHTML('beforeend', card);
      }
      if (i === 2) {
        nextItem.insertAdjacentHTML('beforeend', card);
      }
    }
  }
}
renderCards();

leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);
prevItem.childNodes.forEach(card => card.addEventListener('click', openModal));
currItem.childNodes.forEach(card => card.addEventListener('click', openModal));
nextItem.childNodes.forEach(card => card.addEventListener('click', openModal));

cardsContainer.onanimationstart = () => {
  leftButton.removeEventListener('click', moveLeft);
  rightButton.removeEventListener('click', moveRight);
}

cardsContainer.onanimationend = () => {
  cardsContainer.classList.remove('transition-left');
  cardsContainer.classList.remove('transition-right');
  leftButton.addEventListener('click', moveLeft);
  rightButton.addEventListener('click', moveRight);
  renderCards();
  prevItem.childNodes.forEach(card => card.addEventListener('click', openModal));
  currItem.childNodes.forEach(card => card.addEventListener('click', openModal));
  nextItem.childNodes.forEach(card => card.addEventListener('click', openModal));
};

window.addEventListener('resize', renderCards);