'use strict';

//#70. DOM manipulation!!!

// for id in html, use #; for class in html, use .
// choose the element in the page

/* // DOM manipulation
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct Number';

console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 1;
document.querySelector('.score').textContent = 21;

document.querySelector('.guess').value = 21; // set the input value
*/

// define the number outside the function, you have to keep the num constant!
// use trunc to remove decimal 小数点
let number = Math.trunc(Math.random() * 20) + 1;
console.log(number);
// a state variable
let score = 20;
//highest score
let highestScore = 0;

const outputmsg = function (msg) {
  document.querySelector('.message').textContent = msg;
};
// function outputmsg(msg) {
//   document.querySelector('.message').textContent = msg;
// }

//get the number that inputed from the user.
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //when there is no input
  if (!guess) {
    //document.querySelector('.message').textContent = 'No Number';
    outputmsg('No Number');
  }
  //when they wins
  else if (guess === number) {
    // three equals
    //document.querySelector('.message').textContent = 'Yeah You Win!';
    outputmsg('Yeah You Win!');
    document.querySelector('.number').textContent = number;
    //change the CSS style, take note about the dash and Camel for attributes
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highestScore) {
      highestScore = score;
    }
    console.log(highestScore);
  }
  // when guess is wrong
  else if (guess != number) {
    outputmsg(guess > number ? 'Too High!' : 'Too Low!');
    score--;
    document.querySelector('.score').textContent = score;
  }

  if (score === 0)
    //document.querySelector('.message').textContent = 'You lost the game!';
    outputmsg('You lost the game!');
});

document.querySelector('.again').addEventListener('click', function () {
  // reset the number!!!
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;

  //document.querySelector('.message').textContent = 'Start guessing...';
  outputmsg('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.highscore').textContent = highestScore;
});

//refactoring the code
//don't duplicate the code
