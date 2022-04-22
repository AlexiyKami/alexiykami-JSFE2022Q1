import {pets} from './pets.js';

const cardsContainer = document.querySelector('.slider .cards');

const leftButton = document.querySelector('.slider .round');
const rightButton = document.querySelector('.slider .round.right');

let step = 3;


function moveLeft() {
  step = document.body.offsetWidth < 768 ? 1 :
                                              document.body.offsetWidth < 1280 ? 2 : 3;
  console.log(step);
  for(let i = 0; i < step; i++) {
    cardsContainer.insertAdjacentElement('afterbegin', cardsContainer.lastElementChild);
  }
}

function moveRight() {
  step = document.body.offsetWidth < 768 ? 1 :
                                              document.body.offsetWidth < 1280 ? 2 : 3;
  for(let i = 0; i < step; i++) {
    cardsContainer.insertAdjacentElement('beforeend', cardsContainer.firstElementChild);
  }
  
}

function shuffle() {
  pets.sort((a,b) => Math.random() - 0.5);
}

shuffle();

pets.forEach(pet => {
  const card = `<div class="card" data-pet="${pet.name}">
<img src=${pet.img} alt="pet">
<h4>${pet.name}</h4>
<button class="button white">Learn more</button>
</div>`;
  cardsContainer.insertAdjacentHTML('beforeend', card);
});

leftButton.addEventListener('click',moveLeft);
rightButton.addEventListener('click', moveRight);