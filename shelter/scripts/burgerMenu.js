const burgerIcon = document.querySelector('.burger-icon');
const burgerMenu = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const darkenedBackground = document.querySelector('.darkened-background');
const header = document.querySelector('header');
const menuLinks = document.querySelectorAll('.nav ul li a');

function toggleMenu() {
  burgerIcon.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  logo.classList.toggle('disabled');
  burgerMenu.classList.contains('active') ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
  darkenBackground();
}

function closeMenu() {
  burgerIcon.classList.remove('active');
  burgerMenu.classList.remove('active');
  logo.classList.remove('disabled');
  darkenedBackground.classList.remove('active');
  document.body.style.overflow = 'visible';
}


function darkenBackground() {
  header.classList.toggle('darken');
  darkenedBackground.classList.toggle('active');
}

darkenedBackground.addEventListener('click',closeMenu);
burgerIcon.addEventListener('click', toggleMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));