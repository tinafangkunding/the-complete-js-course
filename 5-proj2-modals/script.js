'use strict';

const btnShow = document.querySelectorAll('.show-modal');
const btnClose = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
//const modal = document.querySelector('.show-modal');

const openModal = function () {
  console.log('btn clicked');
  //document.querySelector('.hidden').style.display = 'block';
  modal.classList.remove('hidden'); // not click dot here, only for selector
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnShow.length; i++) {
  btnShow[i].addEventListener('click', openModal);
}

//abstract the function
const closeModal = function () {
  modal.classList.add('hidden'); // not click dot here, only for selector
  overlay.classList.add('hidden');
};

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);

// control the key board
// the whole document, key down, key press and key up
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
