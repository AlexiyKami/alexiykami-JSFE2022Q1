import {pets} from './pets.js';

const cards = document.querySelectorAll('.card');
const header = document.querySelector('header');
const darkenedBackground = document.querySelector('.darkened-background');
let cross = null;

export function openModal(e) {
  let currentPet;
  for (let pet of pets) {
    if(pet.name === e.target.parentElement.dataset.pet) {
      currentPet = pet;
    }
  }
  const modalMenu = `<div class="modal-menu">
  <button class="round cross"><img src="../../assets/icons/cross.svg" alt="cross"></button>
  <img src=${currentPet.img} alt="pet">
  <div class="pet-info">
    <h3 class="pet-name">${currentPet.name}</h3>
    <h4 class="pet-breed">${currentPet.type} - ${currentPet.breed}</h4>
    <h5 class="pet-description">${currentPet.description}</h5>
    <ul class="pet-list">
      <li><b>Age: </b>${currentPet.age}</li>
      <li><b>Inoculations: </b>${currentPet.inoculations}</li>
      <li><b>Diseases: </b>${currentPet.diseases}</li>
      <li><b>Parasites: </b>${currentPet.parasites}</li>
    </ul>
  </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalMenu);
  darkenBackground();
  cross = document.querySelector('.round.cross');
  cross.addEventListener('click', closeModal);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  cross = null;
  header.classList.remove('darken');
  darkenedBackground.classList.remove('active');
  document.querySelector('.modal-menu').remove();
  document.body.style.overflow = 'visible';
}

function darkenBackground() {
  header.classList.toggle('darken');
  darkenedBackground.classList.toggle('active');
}

cards.forEach(card => card.addEventListener('click', openModal));
darkenedBackground.addEventListener('click', closeModal);
